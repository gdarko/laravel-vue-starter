import i18n from "@/plugins/i18n"

export function trans(key) {
    const {t} = i18n.global;
    return t(key)
}
