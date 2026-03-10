<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $items = Auth::user()->items;

        return response([
            'items' => $items
        ]);
    }
    public function criar(StoreItemRequest $request)
    {
        return response([
            'item' => Auth::user()
                    ->items()
                    ->create($request->validated())
        ]);
    }

    public function update(UpdateItemRequest $request, Item $item)
    {
        $item->update($request->validated());

        return response([
            'itemNome' => $item->nome,
        ]);
    }

    public function delete( Item $item)
    {
        $item->delete();

    }
}
