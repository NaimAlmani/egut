<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\SendMailable;
use App\Mail\SendFromAdmin;
use App\Mail\SendToActivityMember;
use Validator;
use App\Email;
use App\User;
use App\Events\NewEmail;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Psr\Http\Message\RequestInterface;
use App\Activity;
use App\Rules\Captcha;

class emailsController extends Controller
{
    //
    public function create(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'email:rfc,dns',
            'captcha' => new Captcha()
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        //
        $name = $request->name;
        $email = $request->email;
        $message = $request->message;
        // send mail to guest
        $mailToGuest = new Email();
        $mailToGuest->name = $name;
        $mailToGuest->email = $email;
        $messageToGuest = "tack för att du kontaktar oss kommer vi att svara till dig så snart som möjligt !";
        $mailToGuest->message = $messageToGuest;
        $mailToGuest->income = 1;
        $mailToGuest->read = 0;
        Mail::to($request->email)->send(new SendMailable($mailToGuest));
        // send mail to admin
        $admins = User::orderBy('created_at', 'desc')->get();
        //notify admins

        $mailToAdmin = new Email();
        $mailToAdmin->name = $name;
        $mailToAdmin->email = $email;
        $mailToAdmin->message = $message;
        $mailToAdmin->subject = "contact form";
        $mailToAdmin->income = 1;
        $mailToAdmin->read = 0;
        Mail::to($admins)->send(new SendMailable($mailToAdmin));
        //save to db
        $mailToAdmin->save();
        //notify
        event(new NewEmail($mailToAdmin));
        return response()->json(Mail::failures());
    }
    //get unread emails
    public function allemails(Request $request)
    {
        $mails = Email::orderBy('created_at', 'desc')->get();
        return response()->json($mails);
    }
    //fetch inbound emails
    public function inbound(Request $request)
    {
        Log::info($request->all());
        $email  = new Email();
        $email->name = $request->From;
        $email->email = $request->sender;
        $email->subject = $request->subject;
        $email->message = $request['body-plain'];
        $email->income = 1;
        $email->read = 0;
        $email->save();
        //notify
        event(new NewEmail($email));
        Log::info('$email');
        Log::info($email);
        return response()->json(['status' => 'ok']);
    }
    public function markasread(Request $request)
    {
        $id = $request->id;
        Log::info('id');
        Log::info($id);
        $mail = Email::find($id);
        $mail->read = 1;
        $mail->save();
        return response()->json($mail);
    }
    public function send(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'email:rfc,dns',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        // get the old email
        $name = "postmaster";
        $email  = $request->email;
        $message  = $request->message;
        $subject = $request->subject;



        $sentMail = new Email();
        $sentMail->name = $name;
        $sentMail->email = $email;
        $sentMail->message = $message;
        $sentMail->subject = $subject;
        $sentMail->income = 0;
        $sentMail->read = 1;

        $sentMail->save();
        //send
        Mail::to($email)->send(new SendFromAdmin($sentMail));
        return response()->json(Mail::failures());
    }
    //

    //send to activity members
    function sendtomembers(Request $request)
    {
        //get request data (subject  , message  , activity_id)
        $activity  = Activity::find($request->activity_id);
        // get activity members who are active
        $members = $activity->members()->where('is_active', 1)->get();
        //get members emails
        $emailsArr = [];
        foreach ($members as $member) {
            if ($member->email !== '') {
                array_push($emailsArr, $member->email);
            }
        }
        //construct the email
        $sentMail = new Email();
        $sentMail->name = $activity->name;
        $sentMail->email = '';
        $sentMail->message = $request->message;
        $sentMail->subject = $request->subject;
        $sentMail->income = 0;
        $sentMail->read = 1;
        Mail::to($emailsArr)->send(new SendToActivityMember($sentMail));
        return response()->json(Mail::failures());
    }
}
