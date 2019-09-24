<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Member;
use App\EMail;
use App\Notification;
use App\Activity;
use App\User;
use Validator;
use App\Mail\SendMailable;
use App\Events\NewNotification;

class membersController extends Controller
{
    //
    public function participate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'email:rfc,dns'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $name = $request->name;
        $email = $request->email;
        $tel = $request->tel;
        $activity_id = $request->activity_id;
        //check if email is exist
        $checkMember = Member::where(['email' => $email, 'activity_id' => $activity_id]);
        if ($checkMember->count() > 0) {
            return response()->json(['error' => 'email is exist'], 400);
        }
        //save to member db
        $member = new Member();
        $member->name = $name;
        $member->email = $email;
        $member->tel = $tel;
        $member->activity_id = $activity_id;
        $member->save();
        //get activity name
        $activity  = Activity::find($activity_id);
        $activity->members()->attach($member);
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
        $contactPersons = $activity->contacts()->get();
        Log::info($contactPersons);

        $mailToAdmin = new Email();
        $mailToAdmin->name = $name;
        $mailToAdmin->email = $email;
        $mailToAdmin->message = $name . " requested participation in activity " . $activity->name;
        $mailToAdmin->subject = "participation request";
        $mailToAdmin->income = 1;
        $mailToAdmin->read = 0;
        //  Mail::to($admins)->send(new SendMailable($mailToAdmin));
        //save to db
        $mailToAdmin->save();
        //notify contact person



        //notify
        $note = new Notification();
        $note->type = "participation request";
        $note->text = $name . ' wants to participate with  ' . $activity->name . '  activity';
        $note->url = "/activity//" . $activity->id;
        $note->read = 0;
        $note->save();
        // send notification
        event(new NewNotification($note));

        return response()->json(Mail::failures());
    }
}
