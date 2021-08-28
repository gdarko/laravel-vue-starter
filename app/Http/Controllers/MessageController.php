<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\MessageResource;
use App\Http\Requests\StoreMessageRequest;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $messages = Message::query()->orderByDesc('created_at')->paginate(6);

        return MessageResource::collection($messages);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreMessageRequest  $request
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function store(StoreMessageRequest $request)
    {
        $user    = Auth::user();
        $message = new Message(['body' => $request->body]);
        $user->messages()->save($message);

        $messages = Message::orderByDesc('created_at')->paginate(6);

        return MessageResource::collection($messages);
    }
}
