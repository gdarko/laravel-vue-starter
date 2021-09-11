import {useI18n} from "vue-i18n";

export function trans(key) {
    const {t} = useI18n();
    return t(key);
}
