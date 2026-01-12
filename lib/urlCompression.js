/**
 * Utility functions to compress and decompress portfolio state for URL sharing.
 * We use Base64 encoding with key minification to keep URLs short.
 */

// Minification map to reduce JSON size
const KEY_MAP = {
    // Top level
    name: 'n',
    title: 't',
    bio: 'b',
    experience: 'e',
    githubSkills: 's',
    email: 'm', // Email
    summary: 'u', // Summary/Bio

    // Experience items
    role: 'r',
    company: 'c',
    duration: 'd',
    description: 'x',

    // Skills (if array of objects)
    percentage: 'p',
};

const REVERSE_KEY_MAP = Object.fromEntries(
    Object.entries(KEY_MAP).map(([k, v]) => [v, k])
);

/**
 * Minify object keys based on map
 */
function minify(obj) {
    if (Array.isArray(obj)) return obj.map(minify);
    if (obj && typeof obj === 'object') {
        const newObj = {};
        for (const key in obj) {
            const newKey = KEY_MAP[key] || key;
            newObj[newKey] = minify(obj[key]);
        }
        return newObj;
    }
    return obj;
}

/**
 * Unminify object keys
 */
function unminify(obj) {
    if (Array.isArray(obj)) return obj.map(unminify);
    if (obj && typeof obj === 'object') {
        const newObj = {};
        for (const key in obj) {
            const newKey = REVERSE_KEY_MAP[key] || key;
            newObj[newKey] = unminify(obj[key]);
        }
        return newObj;
    }
    return obj;
}

/**
 * Encode state object to Base64 string
 */
export function encodePortfolioState(state) {
    try {
        const minified = minify(state);
        const json = JSON.stringify(minified);
        // UTF-8 safe Base64 encoding
        return btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    } catch (e) {
        console.error("Failed to encode state:", e);
        return null;
    }
}

/**
 * Decode Base64 string to state object
 */
export function decodePortfolioState(encoded) {
    try {
        if (!encoded) return null;
        // UTF-8 safe Base64 decoding
        const json = decodeURIComponent(atob(encoded).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const minified = JSON.parse(json);
        return unminify(minified);
    } catch (e) {
        console.error("Failed to decode state:", e);
        return null;
    }
}
