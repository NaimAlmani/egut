<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class NewNotification
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public $email;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($note)
    {
        //
        $this->note = $note;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return ['new-notification-channel'];
    }
    public function broadcastAs()
    {
        return 'new-notification-event';
    }
}
