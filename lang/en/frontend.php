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

    "users" => [
        "status" => [
            "verified" => "Verified",
            "not_verified" => "Not verified",
            "ask_verify" => "Verify Email"
        ],
        "roles" => [
            "regular" => "Regular",
            "admin" => "Admin"
        ],
        "labels" => [
            "id" => "ID",
            "id_pound" => "#",
            "first_name" => "First name",
            "last_name" => "Last name",
            "middle_name" => "Middle name",
            "name" => "Name",
            "avatar" => "Avatar",
            "email" => "Email",
            "role" => "Role",
            "roles" => "Roles",
            "status" => "Status",
            "current_password" => "Current Password",
            "password" => "Password",
            "new_password" => "New Password",
            "confirm_password" => "Confirm Password",
            "ask_upload_avatar" => "Upload Avatar",
            "new_record" => "New User",
            "edit_record" => "Edit User",
            "general_settings" => "General Settings",
            "password_settings" => "Password Settings",
            "avatar_settings" => "Avatar Settings",
        ]
    ],
    "messages" => [
        "name" => "Message"
    ],
    "global" => [
        "pages" => [
            "home" => "Dashboard",
            "users" => "Users",
            "users_create" => "New User",
            "users_edit" => "Edit User",
            "profile" => "Profile",
            "register" => "Register",
            "login" => "Login",
            "logout" => "Logout",
            "forgot_password" => "Forgot Password",
            "reset_password" => "Reset Password"
        ],
        "phrases" => [
            'clear_filters' => 'Clear all',
            "loading" => "Loading...",
            "sign_out" => "Sign Out",
            'all_records' => 'All Records',
            "argh" => "Argh!",
            "success" => "Success!",
            "fix_errors" => "Please fix the following errors:",
            "no_records" => "No records found.",
            'login_desc' => 'If you are already a member, easily log in.',
            'login_not_verified' => 'Please verify your email in order to be able to log in.',
            'register_desc' => 'If you don\'t have an account, register.',
            'reset_password_desc' => 'Fill the form to reset your password.',
            'login_ask' => 'Already have an account?',
            'register_ask' => 'Don\'t have an account?',
            'forgot_password_desc' => 'If you forgot your password, reset it below.',
            "forgot_password_ask" => "Forgot your password?",
            'forgot_password_login' => 'Got your password? Log in.',
            "already_registered_login" => "Already done? Login.",
            "inspire" => "Let's build something fun!",
            "copyright" => sprintf("Copyright &copy; %s. %s. All Rights Reserved.", date('Y'), env('APP_NAME')),
            'record_created' => 'Record created successfully.',
            'record_not_created' => 'Unable to create record.',
            'record_updated' => 'Record updated successfully.',
            'record_not_updated' => 'Unable to update record.',
            'file_uploaded' => 'File uploaded successfully',
            'file_not_uploaded' => 'Unable to upload file',
            'password_updated' => 'Password updated successfully',
            'password_not_updated' => 'Unable to update password',
            'profile_updated' => 'Profile updated successfully',
            'profile_not_updated' => 'Unable to update password',
            'not_found_title' => '404',
            'not_found_text' => 'The page you\'re looking for is not here.',
            'not_found_back' => 'Go back',
            'input_files_select' => 'Drop files here or click to upload | Drop file here or click to upload',
            'input_files_selected' => '{count} file selected | {count} files selected',
            'email_verified' => 'Email verified successfully!',
            "member_since" => "Member since: {date}",
            "verification_sent" => "Email verification link sent.",
        ],
        "buttons" => [
            'add_new' => 'Add New',
            'filters' => 'Filters',
            "save" => "Save",
            "send" => "Send",
            "submit" => "Submit",
            "login" => "Login",
            "register" => "Register",
            "search" => "Search",
            "new_record" => "New Record",
            'documentation' => "Documentation",
            "back" => "Back",
            "upload" => "Upload",
            "update" => "Update",
            "change_avatar" => "Change Avatar",
        ],
        "actions" => [
            "name" => "Actions",
            "edit" => "Edit",
            "delete" => "Delete"
        ],
        "alerts" => [
            "success" => "Success!",
            "warning" => "Warning!",
            "danger" => "Error!",
            "confirm" => "Confirm!",
            "confirm_action_message" => "Are you sure you want to perform this action?",
        ]
    ]
];
