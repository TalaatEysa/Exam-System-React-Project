<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Question;
use App\Policies\QuestionPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        Question::class => QuestionPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        //
        // Gate::define('view_question', function ($user) {
        //     return $user->user_type === 'Admin';
        // });

        // Gate::define('create_question', function () {
        //     return Auth::user()->user_type === 'Admin';
        // });

        // Gate::define('update_question', function () {
        //     return Auth::user()->user_type === 'Admin';
        // });

        // Gate::define('delete_question', function () {
        //     return Auth::user()->user_type === 'Admin';
        // });
    }
}
