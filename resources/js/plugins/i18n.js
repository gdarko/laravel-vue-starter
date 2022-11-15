import {createI18n} from 'vue-i18n'

const messages = window.AppConfig.locales;

let defaultLocale = window.AppConfig.defaultLocale;

const i18n = createI18n({
    locale: localStorage.locale ?? defaultLocale,
    fallbackLocale: defaultLocale,
    messages,
    legacy: false,
})

export default i18n;
