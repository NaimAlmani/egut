<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Validator;
use Image;

use App\Activity;
use App\Organization;
use App\Group;
use App\Category;
use App\Place;
use App\Day;
use App\ActivityTime;
use App\ActivityImage;
use App\Contact;
use App\Member;
use Carbon\Carbon;
class ActivityController extends Controller

{
    //
    public function index(Request $request)
    {
         $acts = Activity::with('groups', 'organizations')->orderBy('created_at', 'desc')->get();
         $arr = [];


          $filteredItems  = $acts->filter(function($item) {
               if ($item->is_weekly==true){
                   return $item;
            }else if(Carbon::now()->between(Carbon::parse($item->start_date),Carbon::parse($item->end_date))) {
                  return $item;
             }       
        })->values();
         return $filteredItems->toJson();
    }

      public function expiredActivities(Request $request)
    {
         $acts = Activity::with('groups', 'organizations')->orderBy('created_at', 'desc')->get();
         $filteredItems  = $acts->filter(function($item) {
            if ($item->is_weekly==false && !Carbon::now()->between(Carbon::parse($item->start_date),Carbon::parse($item->end_date))){
                return $item;
            }      
        });
       
        return $filteredItems->toJson();
    }

    /**
     * get activity by ID
     */
    public function activitybyid(Request $request)
    {
        $act = Activity::find($request->id);
        $orgs = $act->organizations()->get();
        $groups = $act->groups()->get();
        $places = $act->places()->get();
        $categories = $act->categories()->get();
        $times = $act->times()->get();
        $images = $act->images()->get();
        $contacts = $act->contacts()->get();
        $members = $act->members()->get();

        return response()->json(
            [
                'activity' => $act,
                'organizations' => $orgs,
                'groups' => $groups,
                'places' => $places,
                'categories' => $categories,
                'times' => $times,
                'images' => $images,
                'contacts' => $contacts,
                'members' => $members
            ]
        );
    }


    public function redirected(Request $request)
    {
        return response()->json('unAuthorized');
    }
    /**
     * create new activity
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'logo' => 'required|image',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $image = $request->logo;
        $isWeekly = $request->isWeekly;
       $startDateString = $request->startDate;
       $endDateString = $request->endDate;
       $startDate = Carbon::now();
       $endDate = Carbon::now();
      if ($startDateString!=null) {
    // start Date is valid
        $startDate  = Carbon::parse($startDateString);
      }
       if ($endDateString!=null) {
    // end Date is valid
        $endDate  = Carbon::parse($endDateString);
      }

        $imgName = "defaultOrgLogo.jpg";
        if ($request->logo->isValid()) {
            //save images
            $image = $request->logo;
            //deal with images
            //set the image name
            $imgName = md5(time() . uniqid()) . '.' .
                $image->getClientOriginalExtension();
            //set th images path
            $originalPath = 'images/';

            //get current image sizes
            $width = Image::make($image)->width();
            $height = Image::make($image)->height();
            //save original image
            $originalImage =  Image::make($image)->save(public_path($originalPath . $imgName));
            //save small image
        }
        //END SAVE IMAGE




        //save to db
        $activity = Activity::create(['name' => $request->name, 'description' => $request->description, 'logoPath' => $imgName, 'is_active' => $request->is_active , 'start_date'=>$startDate , 'end_date'=>$endDate , 'is_weekly'=>$isWeekly]);
        $activity->save();
        return $activity->toJson();
    }
    /**
     * update activity
     */
    public function update(Request $request)
    {
        //validate
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        //validate image
        //assign vars
        $id = $request->id;
        $name = $request->name;
        $description = $request->description;
        $is_active = $request->is_active;
        $image = $request->logo;
        $startDate = $request->startDate;
        $endDate = $request->endDate;
        //pring the row
        $activity  = Activity::find($request->id);
        //assign new values to the model
        $activity->name  = $name;
        $activity->description  = $description;
        $activity->is_active = $is_active;
      if($startDate!=null ){
            //date is valid with new value 
            $activity->start_date  = Carbon::parse($startDate);
      } 

       if($endDate!=null ){
            //date is valid with new value 
            $activity->end_date  = Carbon::parse($endDate);
      } 
        if ($request->logo->isValid()) {
            //save images
            $image = $request->logo;
            //deal with images
            //set the image name
            $imgName = md5(time() . uniqid()) . '.' .
                $image->getClientOriginalExtension();
            //set th images path
            $originalPath = 'images/';

            //get current image sizes
            $width = Image::make($image)->width();
            $height = Image::make($image)->height();
            //save original image
            $originalImage =  Image::make($image)->save(public_path($originalPath . $imgName));
            //save small image
        }
        //END SAVE IMAGE


        $activity->logoPath = $imgName;
        //saving to db
        $activity->save();
        return $activity->toJson();
    }
    /**
     * delete activity
     */
    public function delete(Request $request)
    {
        $act = Activity::find($request->id);
        $act->organizations()->detach();
        $act->categories()->detach();
        $act->groups()->detach();
        $act->places()->detach();
        $act->contacts()->detach();
        $act->members()->detach();
        $act->delete();
        return $act->toJson();
    }



    /*********************************** Activity orgs *********************************************/
    public function addorgs(Request  $request)
    {
        // validate inputs

        $activity = $request['activity'];
        $orgs = $request['orgs'];
        $act  = Activity::find($activity['id']);
        //check activity is exist
        if ($act->count() < 0) {
            return response()->json(['error' => "activity is not valid"], 401);
        } else {
            foreach ($orgs as $organization) {
                //get the org data
                $org = Organization::find($organization['id']);
                //check org is exist
                if ($org->count < 0) {
                    return response()->json(['error' => $organization . " , organization is not valid"], 401);
                }
                //check if relation is exist
                if ($act->organizations()->find($org->id)) {
                    return response()->json(['error' => $org->name . " , is exist "], 401);
                }
                //add org to activity
                $act->organizations()->attach($org->id);
            }
            //return requested  orgs
            return response()->json($orgs);
        }
    }

    /**
     * add orgs to activity
     * @param
     * {
     *  activity:{ id  , name , logoPath},
     * orgs:[org]
     *
     * }
     */
    public function deleteorg(Request  $request)
    {
        // validate inputs
        $activity = $request['activity'];
        $org = $request['org'];
        $act  = Activity::find($activity);
        //check activity is exist
        $act->organizations()->detach($org);
        return response()->json(true);
    }
    /**************************************End Activity orgs ***************************************/


    /*********************************** Activity groups *********************************************/
    public function addgroups(Request  $request)
    {
        // validate inputs
        $activity = $request['activity'];
        $groups = $request['groups'];
        $act  = Activity::find($activity['id']);
        //check activity is exist
        if ($act->count() < 0) {
            return response()->json(['error' => "activity is not valid"], 401);
        } else {
            foreach ($groups as $group) {
                //get the gr data
                $gr = Group::find($group['id']);
                //check gr is exist
                if ($gr->count < 0) {
                    return response()->json(['error' => $group . " , group is not valid"], 401);
                }
                //check if relation is exist
                if ($act->groups()->find($gr->id)) {
                    return response()->json(['error' => $gr->name . " , is exist "], 401);
                }
                //add gr to activity
                $act->groups()->attach($gr->id);
            }
            //return requested  groups
            return response()->json($groups);
        }
    }

    public function deletegroup(Request  $request)
    {
        // validate inputs
        $activity = $request['activity'];
        $group = $request['group'];
        $act  = Activity::find($activity);
        //check activity is exist
        $act->groups()->detach($group);
        return response()->json(true);
    }
    /**************************************End Activity groups ***************************************/


    /*********************************** Activity categories *********************************************/
    public function addcategories(Request  $request)
    {
        // validate inputs
        $activity = $request['activity'];
        $categories = $request['categories'];
        $act  = Activity::find($activity['id']);
        //check activity is exist
        if ($act->count() < 0) {
            return response()->json(['error' => "activity is not valid"], 401);
        } else {
            foreach ($categories as $category) {
                //get the gr data
                $cat = Category::find($category['id']);
                //check cat is exist
                if ($cat->count < 0) {
                    return response()->json(['error' => $category . " , category is not valid"], 401);
                }
                //check if relation is exist
                if ($act->categories()->find($cat->id)) {
                    return response()->json(['error' => $cat->name . " , is exist "], 401);
                }
                //add cat to activity
                $act->categories()->attach($cat->id);
            }
            //return requested  catoups
            return response()->json($categories);
        }
    }

    public function deletecategory(Request  $request)
    {
        // validate inputs
        $activity = $request['activity'];
        $category = $request['category'];
        $act  = Activity::find($activity);
        //check activity is exist
        $act->categories()->detach($category);
        return response()->json(true);
    }
    /**************************************End Activity categories ***************************************/


    /*********************************** Activity places *********************************************/
    public function addplaces(Request  $request)
    {
        // validate inputs
        $activity = $request['activity'];
        $places = $request['places'];
        $act  = Activity::find($activity['id']);
        //check activity is exist
        if ($act->count() < 0) {
            return response()->json(['error' => "activity is not valid"], 401);
        } else {
            foreach ($places as $place) {
                //get the gr data
                $gr = Place::find($place['id']);
                //check gr is exist
                if ($gr->count < 0) {
                    return response()->json(['error' => $place . " , place is not valid"], 401);
                }
                //check if relation is exist
                if ($act->places()->find($gr->id)) {
                    return response()->json(['error' => $gr->name . " , is exist "], 401);
                }
                //add gr to activity
                $act->places()->attach($gr->id);
            }
            //return requested  places
            return response()->json($places);
        }
    }

    public function deleteplace(Request  $request)
    {
        $activity = $request['activity'];
        $place = $request['place'];
        $act  = Activity::find($activity);
        //check activity is exist
        $act->places()->detach($place);
        return response()->json(true);
    }
    /**************************************End Activity places ***************************************/


    /**************************************activity time******************************************** */
    public function addtime(Request  $request)
    {
        // validate inputs

        //validate
        $validator = Validator::make($request->all(), [
            'activity_id' => 'required|numeric',
            'day_id' => 'required|numeric',
            'place_id' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        //asign values
        $activity_id = $request['activity_id'];
        $place_id = $request['place_id'];
        $day_id = $request['day_id'];
        $start_time = $request['start_time'];
        $end_time = $request['end_time'];
        $date = date('Y-m-d', strtotime($request['date']));
        $is_weekly = $request['is_weekly'];
        //
        $time = ActivityTime::create([
            'activity_id' => $activity_id,
            'place_id' => $place_id,
            'day_id' => $day_id,
            'start_time' => $start_time,
            'end_time' => $end_time,
            'is_weekly' => $is_weekly,
            'date' => $date
        ]);
        //check activity is exist
        return response()->json($time);
    }
    public function deletetime(Request $request)
    {
        $time = $request['time'];
        $removedTime = ActivityTime::find($time);
        $removedTime->delete();
        return response()->json(true);
    }
    //get ALL DAYS
    public function alldays(Request $request)
    {
        $allDays = Day::orderBy('created_at')->get();
        return response()->json($allDays);
    }
    /****************************************end time**************************************************** */
    /****************************************start images **************************************************** */
    public function addimage(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'activity_id' => 'required',
            'path' => 'required|image',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        //save images
        $image = $request->path;
        //deal with images
        //set the image name
        $imgName = md5(time() . uniqid()) . '.' .
            $image->getClientOriginalExtension();
        //set th images path

        $originalPath = 'images/';

        //get current image sizes
        $width = Image::make($image)->width();
        $height = Image::make($image)->height();
        //save original image
        $originalImage =  Image::make($image)->save(public_path($originalPath . $imgName));
        //save small image
        $smallWidth = $width;
        $smallHeight = $height;
        //save to db
        $img = ActivityImage::create([
            'activity_id' => $request->activity_id,
            'title'             => $request->title,
            'description'       => $request->description,
            'path'              => $imgName,
            'width'            => $smallWidth,
            'height'           => $smallHeight
        ]);

        $img->save();
        return $img->toJson();
    }
    // delete Image
    public function deleteimage(Request $request)
    {
        $img = $request['id'];
        $removedImage = ActivityImage::find($img);
        $removedImage->delete();
        return response()->json(true);
    }
    /******************************* activity contacts**************************************** */
    public function addcontact(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'activity_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        };
        $imgName = "contactImage.jpg";
        if ($request->image != 'null') {
            //save images
            $image = $request->image;
            //deal with images
            //set the image name
            $imgName = md5(time() . uniqid()) . '.' .
                $image->getClientOriginalExtension();
            //set th images path
            $smallPath = 'images/small/';
            $originalPath = 'images/';

            //get current image sizes
            $width = Image::make($image)->width();
            $height = Image::make($image)->height();
            //save original image
            $originalImage =  Image::make($image)->resize($width, $height)->save(public_path($originalPath . $imgName));
            //save small image
            $smallWidth = $width;
            $smallHeight = $height;
            switch (true) {
                case $width <= 300:
                    $smallWidth = $width / 2;
                    $smallHeight = $height / 2;
                    break;
                case $width >= 1000:
                    $smallWidth = $width / 4;
                    $smallHeight = $height / 4;
                default:
                    $smallWidth = $width / 3;
                    $smallHeight = $height / 3;
            }
            $smallImage =  Image::make($image)->resize($smallWidth, $smallHeight)->save(public_path($smallPath . $imgName));
        }
        //save to db
        $contact = Contact::create([
            'name'              => $request->name,
            'tel'               => $request->tel,
            'email'             => $request->email,
            'image'             => $imgName,
        ]);
        $contact->save();
        // add cotnact to activity
        $activity = Activity::find($request->activity_id);
        $activity->contacts()->attach($contact->id);

        return $contact->toJson();
    }

    public function deletecontact(Request $request)
    {
        $contact = $request['contact'];
        $activity = $request['activity'];

        $Activity = Activity::find($activity);
        $Activity->contacts()->detach();
        return response()->json(true);
    }
    public function allcontacts(Request $request)
    {
        $contacts = Contact::orderBy('created_at', 'desc')->get();
        return response()->json($contacts);
    }
    public function addexistcontacts(Request $request)
    {
        $activity = $request['activity'];
        $contacts = $request['contacts'];
        $act  = Activity::find($activity['id']);
        //check activity is exist
        if ($act->count() < 0) {
            return response()->json(['error' => "activity is not valid"], 401);
        } else {
            foreach ($contacts as $contact) {
                //get the gr data
                $cont = Contact::find($contact['id']);
                //check cont is exist
                if ($cont->count < 0) {
                    return response()->json(['error' => $contact . " , contact is not valid"], 401);
                }
                //check if relation is exist
                if ($act->contacts()->find($cont->id)) {
                    return response()->json(['error' => $cont->name . " , is exist "], 401);
                }
                //add cont to activity
                $act->contacts()->attach($cont->id);
            }
            //return requested  catoups
            return response()->json($contacts);
        }
    }
    /********************end contacts **************************** */
    /********************start members**************************** */
    public function addmember(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'activity_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        };
        //save to db
        $member = Member::create([
            'name'              => $request->name,
            'tel'               => $request->tel,
            'email'             => $request->email,
            'is_active'         => $request->is_active,
        ]);
        $member->save();
        // add cotnact to activity
        $activity = Activity::find($request->activity_id);
        $activity->members()->attach($member->id);

        return $member->toJson();
    }

    public function deletemember(Request $request)
    {
        $member = $request['member'];
        $activity = $request['activity'];

        $Activity = Activity::find($activity);
        $Activity->members()->detach($member);
        return response()->json(true);
    }
    public function allmembers(Request $request)
    {
        $members = Member::orderBy('created_at', 'desc')->get();
        return response()->json($members);
    }
    //activate  and deactivate member in activity
    public function activatemember(Request $request)
    {
        $member = $request['member'];
        $activity = $request['activity'];
        $isActive = $request['is_active'];
        $active = 0;
        if ($isActive == true) {
            $active = 1;
        }
        $act  = Activity::find($activity);
        $mem  = Member::find($member);
        $act->members()->updateExistingPivot($mem, array('is_active' => $active), false);
        return response()->json($act);
    }
    public function activateactivity(Request $request)
    {
        $activityID = $request['id'];
        $isAct = 0;
        if ($request['is_active'] == true) {
            $isAct = 1;
        }

        $activity = Activity::find($activityID);
        $activity->is_active = $isAct;
        $activity->save();
        return response()->json($activity);
    }
    // public Area


    public function activeactivities(Request $request)
    {
        $acts = Activity::with('groups', 'organizations', 'categories', 'Times')->where('is_active', 1)->orderBy('created_at', 'desc')->get();

           $filteredItems  = $acts->filter(function($item) {
               if ($item->is_weekly==true){
                   return $item;
            }else if(Carbon::now()->between(Carbon::parse($item->start_date),Carbon::parse($item->end_date))) {
                  return $item;
             }       
        })->values();

        $days = Day::orderBy('created_at', 'desc')->get();
        $categories = Category::with('activities')->orderBy('created_at', 'desc')->get();
        $groups = Group::with('activities')->orderBy('created_at', 'desc')->get();
        //get activities times
        return response()->json(['activities' => $filteredItems, 'days' => $days, 'categories' => $categories, 'groups' => $groups]);
    }

  
}
