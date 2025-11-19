
// Simple in-memory blacklist for JWTs

const tokenBlacklist = new Set();

/**
 * Adds a token to the blacklist
 * @param {string} token
 */
export function addToBlacklist(token) {
  tokenBlacklist.add(token);
}

/**
 * Checks whether a token is blacklisted
 * @param {string} token
 * @returns {boolean}
 */
export function isBlacklisted(token) {
  return tokenBlacklist.has(token);
}


