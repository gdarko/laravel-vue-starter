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
            "verified" => "Потврден",
            "not_verified" => "Не е потврден",
            "ask_verify" => "Потврди Е-пошта"
        ],
        "roles" => [
            "regular" => "Регуларен",
            "admin" => "Администратор"
        ],
        "labels" => [
            "id" => "Ред. Бр",
            "id_pound" => "#",
            "first_name" => "Име",
            "last_name" => "Презиме",
            "middle_name" => "Прекар",
            "name" => "Име",
            "avatar" => "Аватар",
            "email" => "Е-Пошта",
            "role" => "Улога",
            "roles" => "Улоги",
            "status" => "Статус",
            "current_password" => "Моментална лозинка",
            "password" => "Лозинка",
            "new_password" => "Нова лозинка",
            "confirm_password" => "Потврди лозинка",
            "ask_upload_avatar" => "Прикачи аватар",
            "new_record" => "Нов корисник",
            "edit_record" => "Ажурирај корисник",
            "general_settings" => "Генерални Поставки",
            "password_settings" => "Лозинка",
            "avatar_settings" => "Аватар",
        ]
    ],
    "messages" => [
        "name" => "Порака"
    ],
    "global" => [
        "pages" => [
            "home" => "Почетна",
            "users" => "Корисници",
            "users_create" => "Нов корисник",
            "users_edit" => "Ажурирање корисник",
            "profile" => "Профил",
            "register" => "Регистрација",
            "login" => "Најава",
            "logout" => "Одјава",
            "forgot_password" => "Заборавена лозинка",
            "reset_password" => "Промена на лозинка"
        ],
        "phrases" => [
            'clear_filters' => 'Избриши сите',
            "loading" => "Вчитување...",
            "sign_out" => "Одјава",
            'all_records' => 'Сите ставки',
            "argh" => "Аргх!",
            "success" => "Успешно!",
            "fix_errors" => "Ве молиме поправете ги следниве грешки:",
            "no_records" => "Не се пронајдени ставки.",
            'login_desc' => 'Ако имате корисничка сметка, најавете се.',
            'login_not_verified' => 'Ве молиме потврдете ја вашата е-пошта за да се најавите.',
            'register_desc' => 'Ако немате корисничка сметка, регистрирајте се.',
            'reset_password_desc' => 'Пополнете ја формата за да промените лозинка.',
            'login_ask' => 'Имате корисничка сметка?',
            'register_ask' => 'Немате корисничка сметка?',
            'forgot_password_desc' => 'Ако ја заборавивте вашата лозинка, ресетирајте ја подолу.',
            "forgot_password_ask" => "Ја заборавивте вашата лозинка?",
            'forgot_password_login' => 'Добивте нова лозинка? Најавете се.',
            "already_registered_login" => "Веќе сте регистрирани? Најавете се.",
            "inspire" => "Ајде да направиме нешто добро!",
            "copyright" => sprintf("Авторски права &copy; %s. %s. Сите права се задржани.", date('Y'), env('APP_NAME')),
            'record_created' => 'Ставката е креирана успешно.',
            'record_not_created' => 'Настана грешка при креирање на ставка.',
            'record_updated' => 'Ставката е ажурирана успешно.',
            'record_not_updated' => 'Настана грешка при ажурирање на ставка.',
            'file_uploaded' => 'Датотеката е прикачена успешно.',
            'file_not_uploaded' => 'Настана грешка при прикачување на датотека.',
            'password_updated' => 'Лозинката е ажурирана успешно.',
            'password_not_updated' => 'Настана грешка при ажурирање на лозинката.',
            'profile_updated' => 'Корисничкиот профил е ажуриран успешно.',
            'profile_not_updated' => 'Настана грешка при ажурирање на корисничкиот профил.',
            'not_found_title' => '404',
            'not_found_text' => 'Страната што ја баравте не е пронајдена или не постои.',
            'not_found_back' => 'Назад',
            'input_files_select' => 'Повлечете датотеки тука или кликнете за да прикачите. | Повлечете датотека тука или кликнете за да прикачите.',
            'input_files_selected' => '{count} датоека селектирана | {count} датотеки селектирани',
            'email_verified' => 'Е-поштата е успешно потврдена!',
            "member_since" => "Член од: {date}",
            "verification_sent" => "Испратен линк за потврда на е-пошта.",
        ],
        "buttons" => [
            'add_new' => 'Додади нов',
            'filters' => 'Филтри',
            "save" => "Зачувај",
            "send" => "Испрати",
            "submit" => "Испрати",
            "login" => "Најави се",
            "register" => "Регистрирај се",
            "search" => "Пребарувај",
            "new_record" => "Нова ставка",
            'documentation' => "Документација",
            "back" => "Назад",
            "upload" => "Прикачи",
            "update" => "Ажурирај",
            "change_avatar" => "Промени аватар",
        ],
        "actions" => [
            "name" => "Акции",
            "edit" => "Ажурирај",
            "delete" => "Избриши"
        ],
        "alerts" => [
            "success" => "Успешно!",
            "warning" => "Предупредување!",
            "danger" => "Грешка!",
            "confirm" => "Потврда!",
            "confirm_action_message" => "Дали сте сигурни дека сакате да ја извршите оваа акција?",
        ]
    ]
];
