<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function () { 
    Route::get('signin','SignInController')->name('signin');
    Route::post('signin','SignInController');
    Route::post('signup', 'SignUpController');
    Route::delete('signout', 'SignOutController');
    Route::get('profile', 'ProfileController');
    Route::get('profile/{id}', 'ProfileController@show');
    Route::get('profile/{id}/edit', 'ProfileController@edit');
    Route::put('profile/{id}', 'ProfileController@update');
});
Route::group(['prefix' => 'auth', 'namespace' => 'Story'], function () { 
    Route::get('storys', 'StoryController');
    Route::get('storys/all/my', 'StoryController@my');
    Route::get('storys/{id}', 'StoryController@show');
    Route::get('storys/{id}/edit', 'StoryController@edit');
    Route::put('storys/{id}', 'StoryController@update');
    Route::post('storys', 'StoryController@store');
    Route::delete('storys/{id}', 'StoryController@destroy');
    // Route::put('storys/audience/{id}', 'StoryController@audience');
    Route::post('like', 'StoryController@like');

    Route::get('comment/{id}', 'CommentController@show');
    Route::post('comment', 'CommentController@store');
});
