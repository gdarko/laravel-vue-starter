<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Front-end application translations
    |--------------------------------------------------------------------------
    |
    | The following language lines are used for the front-end application.
    |
    */

    "users"    => [
        "status" => [
            "verified"     => "Verified",
            "not_verified" => "Not verified",
            "ask_verify"   => "Verify Email"
        ],
        "roles"  => [
            "regular" => "Regular",
            "admin"   => "Admin"
        ],
        "labels" => [
            "name"              => "Name",
            "email"             => "Email",
            "role"              => "Role",
            "status"            => "Status",
            "current_password"  => "Current Password",
            "password"          => "Password",
            "new_password"      => "New Password",
            "confirm_password"  => "Confirm Password",
            "ask_upload_avatar" => "Upload Avatar"
        ]
    ],
    "messages" => [
        "name" => "Message"
    ],
    "global"   => [
        "pages"   => [
            "home"            => "Dashboard",
            "users"           => "Users",
            "profile"         => "Profile",
            "register"        => "Register",
            "login"           => "Login",
            "logout"          => "Logout",
            "forgot_password" => "Forgot Password",
            "reset_password"  => "Reset Password"
        ],
        "phrases" => [
            "sign_out"                 => "Sign Out",
            'all_records'              => 'All Records',
            'add_new'                  => 'Add New',
            "argh"                     => "Argh!",
            "success"                  => "Success!",
            "fix_errors"               => "Please fix the following errors:",
            "no_records"               => "No records found.",
            'login_desc'               => 'If you are already a member, easily log in.',
            'register_desc'            => 'If you don\'t have an account, register.',
            'reset_password_desc'      => 'Fill the form to reset your password.',
            'login_ask'                => 'Already have an account?',
            'register_ask'             => 'Don\'t have an account?',
            'forgot_password_desc'     => 'If you forgot your password, reset it below.',
            "forgot_password_ask"      => "Forgot your password?",
            'forgot_password_login'    => 'Got your password? Log in.',
            "already_registered_login" => "Already done? Login.",
            "inspire"                  => "Let's build something fun!",
            "copyright"                => sprintf("Copyright &copy; %s. %s. All Rights Reserved.", date('Y'), env('APP_NAME')),
        ],
        "buttons" => [
            "save"          => "Save",
            "send"          => "Send",
            "submit"        => "Submit",
            "login"         => "Login",
            "register"      => "Register",
            "new_record"    => "New Record",
            'documentation' => "Documentation"
        ]
    ]
];
