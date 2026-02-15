/**
 * AES-GCM encryption/decryption using Web Crypto API.
 * Used for protecting NDA project content on a static site.
 */

/**
 * Derive an AES-GCM key from a password using PBKDF2.
 * @param {string} password
 * @param {Uint8Array} salt - 16-byte salt
 * @returns {Promise<CryptoKey>}
 */
async function deriveKey(password, salt) {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt plaintext HTML string.
 * @param {string} plaintext - HTML content to encrypt
 * @param {string} password
 * @returns {Promise<string>} - Base64 encoded string (iv + salt + ciphertext)
 */
async function encryptContent(plaintext, password) {
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await deriveKey(password, salt);
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(plaintext)
  );
  // Combine: iv (12) + salt (16) + ciphertext
  const combined = new Uint8Array(12 + 16 + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(salt, 12);
  combined.set(new Uint8Array(encrypted), 28);
  return btoa(String.fromCharCode(...combined));
}

/**
 * Decrypt base64 encoded blob back to plaintext HTML.
 * @param {string} encryptedBase64
 * @param {string} password
 * @returns {Promise<string>} - Decrypted HTML string
 * @throws {Error} - If password is incorrect
 */
async function decryptContent(encryptedBase64, password) {
  const decoder = new TextDecoder();
  const combined = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
  const iv = combined.slice(0, 12);
  const salt = combined.slice(12, 28);
  const ciphertext = combined.slice(28);
  const key = await deriveKey(password, salt);
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  );
  return decoder.decode(decrypted);
}
