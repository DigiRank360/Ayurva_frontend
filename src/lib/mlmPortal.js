const MLM_PORTAL_URL = import.meta.env.DEV
    ? 'http://localhost:5174'
    : (import.meta.env.VITE_MLM_PANEL_URL || '');

export function getMlmPortalUrl({ register = false, referralCode = '' } = {}) {
    if (!MLM_PORTAL_URL) return null;

    const portalUrl = new URL(MLM_PORTAL_URL, window.location.origin);
    if (register) portalUrl.searchParams.set('register', 'true');
    if (referralCode) portalUrl.searchParams.set('ref', referralCode);
    return portalUrl.toString();
}

export function getAffiliatePortalUrl() {
    if (!MLM_PORTAL_URL) return null;
    return new URL('/affiliate', MLM_PORTAL_URL).toString();
}
