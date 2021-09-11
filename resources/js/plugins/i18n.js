import {createI18n} from 'vue-i18n'

const messages = {
    en: {
        users: {
            status: {
                verified: 'Verified',
                not_verified: 'Not verified',
                ask_verify: 'Verify Email'
            },
            roles: {
                regular: 'Regular',
                admin: 'Admin',
            },
            labels: {
                name: 'Name',
                email: 'Email',
                role: 'Role',
                status: 'Status',
                current_password: 'Current Password',
                password: 'Password',
                new_password: 'New Password',
                confirm_password: 'Confirm Password',
                ask_upload_avatar: 'Upload Avatar',
            }
        },
        messages: {
            name: 'Message'
        },
        global: {
            pages: {
                home: 'Home',
                users: 'Users',
                register: 'Register',
                login: 'Login',
                logout: 'Logout',
                forgot_password: 'Forgot Password',
                reset_password: 'Reset Password',
            },
            phrases: {
                argh: 'Argh!',
                success: 'Success!',
                fix_errors: 'Please fix the following errors:',
                no_records: 'No records found.',
                register_account: 'Register for account',
                forgot_password: 'Forgot your password?',
                already_registered_login: 'Already done? Login.',
                inspire: 'Let\'s build something fun!'
            },
            buttons: {
                save: 'Save',
                send: 'Send',
                submit: 'Submit',
                login: 'Login',
                register: 'Register',
            }
        },
    },
    mk: {
        users: {
            status: {
                verified: 'Верифициран',
                not_verified: 'Неверифициран',
                ask_verify: 'Потврди Емаил'
            },
            roles: {
                regular: 'Регуларен',
                admin: 'Администратор',
            },
            labels: {
                name: 'Име',
                email: 'Емаил',
                role: 'Улога',
                status: 'Статус',
                current_password: 'Моментална Лозинка',
                password: 'Лозинка',
                new_password: 'Нова Лозинка',
                confirm_password: 'Потврди Лозинка',
                ask_upload_avatar: 'Промени Слика'
            }
        },
        messages: {
            name: 'Порака'
        },
        global: {
            pages: {
                home: 'Почетна',
                users: 'Корисници',
                register: 'Регистрација',
                login: 'Најава',
                logout: 'Одјава',
                forgot_password: 'Заборавена лозинка',
                reset_password: 'Промена на лозинка',
            },
            phrases: {
                argh: 'Гррр!',
                success: 'Супер!',
                fix_errors: 'Ве молиме поправете ги следниве грешки:',
                no_records: 'Не се пронајдени резултати.',
                register_account: 'Регистрирај корисничка сметка',
                forgot_password: 'Заборавена лозинка?',
                already_registered_login: 'Дали завршивте? Најавете се.',
                inspire: 'Да направиме нешто добро!'
            },
            buttons: {
                save: 'Зачувај',
                send: 'Испрати',
                submit: 'Испрати',
                login: 'Најави се',
                register: 'Регистрирај се',
            }
        }
    }
}

const i18n = createI18n({
    locale: localStorage.locale ?? 'en',
    fallbackLocale: 'en',
    messages,
    legacy: false,
})

export default i18n;
