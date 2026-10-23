const MLM_PORTAL_URL = import.meta.env.VITE_MLM_PANEL_URL
    || (import.meta.env.DEV ? 'http://localhost:5174' : '');

export function getMlmPortalUrl({ register = false, referralCode = '' } = {}) {
    if (!MLM_PORTAL_URL) return null;

    const portalUrl = new URL(MLM_PORTAL_URL, window.location.origin);
    if (register) portalUrl.searchParams.set('register', 'true');
    if (referralCode) portalUrl.searchParams.set('ref', referralCode);
    return portalUrl.toString();
}
