import { useEffect } from 'react';

const DEFAULT_TITLE = 'AyuvaPro | Ayurvedic Wellness Products & Combos';

const upsertMeta = (selector, create, value) => {
    let el = document.head.querySelector(selector);
    if (!el) {
        el = create();
        document.head.appendChild(el);
    }
    el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', value);
};

// Sets per-page title, description, canonical and social tags.
export default function useSeo({ title, description, path }) {
    useEffect(() => {
        document.title = title;

        const meta = (attr, name) => () => {
            const el = document.createElement('meta');
            el.setAttribute(attr, name);
            return el;
        };

        if (description) {
            upsertMeta('meta[name="description"]', meta('name', 'description'), description);
            upsertMeta('meta[property="og:description"]', meta('property', 'og:description'), description);
        }
        upsertMeta('meta[property="og:title"]', meta('property', 'og:title'), title);
        upsertMeta('meta[property="og:type"]', meta('property', 'og:type'), 'website');

        if (path !== undefined) {
            const href = `${window.location.origin}${path}`;
            upsertMeta('link[rel="canonical"]', () => {
                const el = document.createElement('link');
                el.setAttribute('rel', 'canonical');
                return el;
            }, href);
        }

        return () => {
            document.title = DEFAULT_TITLE;
        };
    }, [title, description, path]);
}
