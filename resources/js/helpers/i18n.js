import i18n from "@/plugins/i18n"

export function trans(key, params = {}) {
    const {t} = i18n.global;
    return t(key, params)
}
