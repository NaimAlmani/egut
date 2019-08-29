<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

//notifications class
use App\Events\NewNotification;

//mail class
use App\Mail\subscriptionEmail;
// mail package
use Illuminate\Support\Facades\Mail;

//model class
use App\Subscription;
use App\Notification;
use Validator;
use Illuminate\Support\Facades\Log;

class subscriptionsController extends Controller
{
    //
    public function create(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required | email:rfc,dns',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        // check if email is exist
        $isExist = Subscription::where('email', $request->email)->count();
        Log::info($isExist);
        if ($isExist > 0) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $sub = new Subscription();
        $sub->email = $request->email;
        $sub->read = 0;
        $sub->save();

        //send email
        Mail::to($sub->email)->send(new subscriptionEmail());


        // create notification isntance
        $note = new Notification();
        $note->type = "Subscription";
        $note->text = $request->email . ' is added to subscription list';
        $note->url = '/subscription';
        $note->read = 0;
        $note->save();
        // send notification
        event(new NewNotification($note));
        return response()->json(Mail::failures());
    }
}
