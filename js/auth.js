// AES-GCM encryption/decryption for NDA project pages

var Auth = (function () {
  var SESSION_KEY = 'ta-portfolio-auth';
  var TIMESTAMP_KEY = 'ta-portfolio-auth-ts';
  var TTL = 60 * 60 * 1000; // 1 hour

  function bufToBase64(buf) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buf)));
  }

  function base64ToBuf(b64) {
    var bin = atob(b64);
    var buf = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
    return buf;
  }

  function deriveKey(password, salt) {
    var enc = new TextEncoder();
    return crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey'])
      .then(function (keyMaterial) {
        return crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt: salt, iterations: 100000, hash: 'SHA-256' },
          keyMaterial,
          { name: 'AES-GCM', length: 256 },
          false,
          ['encrypt', 'decrypt']
        );
      });
  }

  function encrypt(plaintext, password) {
    var enc = new TextEncoder();
    var salt = crypto.getRandomValues(new Uint8Array(16));
    var iv = crypto.getRandomValues(new Uint8Array(12));
    return deriveKey(password, salt).then(function (key) {
      return crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, enc.encode(plaintext));
    }).then(function (ciphertext) {
      return JSON.stringify({
        salt: bufToBase64(salt),
        iv: bufToBase64(iv),
        data: bufToBase64(ciphertext)
      });
    });
  }

  function decrypt(encryptedJson, password) {
    var parsed = JSON.parse(encryptedJson);
    var salt = base64ToBuf(parsed.salt);
    var iv = base64ToBuf(parsed.iv);
    var data = base64ToBuf(parsed.data);
    return deriveKey(password, salt).then(function (key) {
      return crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, data);
    }).then(function (decrypted) {
      return new TextDecoder().decode(decrypted);
    });
  }

  function isAuthed() {
    var ts = localStorage.getItem(TIMESTAMP_KEY);
    if (!ts || Date.now() - Number(ts) > TTL) {
      clearAuth();
      return false;
    }
    return !!sessionStorage.getItem(SESSION_KEY);
  }

  function setAuthed(password) {
    sessionStorage.setItem(SESSION_KEY, password);
    localStorage.setItem(TIMESTAMP_KEY, String(Date.now()));
  }

  function getStoredPassword() {
    return sessionStorage.getItem(SESSION_KEY);
  }

  function clearAuth() {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(TIMESTAMP_KEY);
  }

  // Try to decrypt and render the page content
  function initProtectedPage() {
    var encEl = document.getElementById('encrypted-data');
    var contentEl = document.getElementById('protected-content');
    var gateEl = document.getElementById('auth-gate');
    var passwordInput = document.getElementById('auth-password');
    var submitBtn = document.getElementById('auth-submit');
    var errorEl = document.getElementById('auth-error');

    if (!encEl || !contentEl) return;

    var encryptedJson = encEl.textContent;

    // If already authed this session, try auto-decrypt
    if (isAuthed()) {
      decrypt(encryptedJson, getStoredPassword()).then(function (html) {
        contentEl.innerHTML = html;
        contentEl.classList.remove('hidden');
        if (gateEl) gateEl.classList.add('hidden');
      }).catch(function () {
        clearAuth();
        if (gateEl) gateEl.classList.remove('hidden');
      });
      return;
    }

    // Not authed — redirect to index with unlock param
    var currentPage = window.location.pathname;
    // Build relative URL to index
    var indexUrl = currentPage.replace(/\/projects\/.*$/, '/index.html');
    window.location.href = indexUrl + '?unlock=' + encodeURIComponent(currentPage);
    return;

    function tryDecrypt() {
      var password = passwordInput.value;
      if (!password) return;
      submitBtn.disabled = true;
      submitBtn.textContent = '...';
      decrypt(encryptedJson, password).then(function (html) {
        setAuthed(password);
        contentEl.innerHTML = html;
        contentEl.classList.remove('hidden');
        gateEl.classList.add('hidden');
      }).catch(function () {
        errorEl.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Unlock';
        passwordInput.value = '';
        passwordInput.focus();
      });
    }

    submitBtn.addEventListener('click', tryDecrypt);
    passwordInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') tryDecrypt();
    });
  }

  return {
    encrypt: encrypt,
    decrypt: decrypt,
    isAuthed: isAuthed,
    setAuthed: setAuthed,
    initProtectedPage: initProtectedPage
  };
})();

document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('encrypted-data')) {
    Auth.initProtectedPage();
  }
});
