const CACHE_PREFIX = "devcanvas_";
const DEFAULT_TTL = 10 * 60 * 1000; // 10 minutes

/**
 * Get cached data from localStorage
 * @param {string} key - Cache key
 * @returns {any|null} - Cached data or null if expired/missing
 */
export function getCache(key) {
    if (typeof window === "undefined") return null;

    try {
        const item = localStorage.getItem(CACHE_PREFIX + key);
        if (!item) return null;

        const { data, expiry } = JSON.parse(item);

        if (Date.now() > expiry) {
            localStorage.removeItem(CACHE_PREFIX + key);
            return null;
        }

        return data;
    } catch {
        return null;
    }
}

/**
 * Set data in cache with TTL
 * @param {string} key - Cache key
 * @param {any} data - Data to cache
 * @param {number} ttl - Time to live in ms (default: 10 minutes)
 */
export function setCache(key, data, ttl = DEFAULT_TTL) {
    if (typeof window === "undefined") return;

    try {
        const item = {
            data,
            expiry: Date.now() + ttl,
        };
        localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
    } catch {
        // Storage full or unavailable - fail silently
    }
}

/**
 * Clear all DevCanvas cache entries
 */
export function clearCache() {
    if (typeof window === "undefined") return;

    const keys = Object.keys(localStorage).filter((key) =>
        key.startsWith(CACHE_PREFIX)
    );
    keys.forEach((key) => localStorage.removeItem(key));
}

/**
 * Get cache key for a username and data type
 * @param {string} username
 * @param {string} dataType - 'user' | 'repos' | 'languages'
 */
export function getCacheKey(username, dataType) {
    return `${username.toLowerCase()}_${dataType}`;
}
