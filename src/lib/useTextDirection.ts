// import { isRtlLang } from 'rtl-detect';
import { useLocale } from 'next-intl';

export default function useTextDirection(locale?: string) {
    const defaultLocale = useLocale();
    if (!locale) locale = defaultLocale;
    return locale == "ar" ? 'rtl' : 'ltr';
}

export function isRTL(locale?: string) {
    const defaultLocale = useLocale();
    if (!locale) locale = defaultLocale;
    return locale == "ar";
}