// AES-GCM encryption/decryption for NDA project pages (section-level)

var Auth = (function () {
  var SESSION_KEY = 'ta-portfolio-auth';
  var TIMESTAMP_KEY = 'ta-portfolio-auth-ts';
  var TTL = 60 * 60 * 1000; // 1 hour

  function bufToBase64(buf) {
    var bytes = new Uint8Array(buf);
    var str = '';
    for (var i = 0; i < bytes.length; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return btoa(str);
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

  function decryptAllBlocks(password) {
    var blocks = document.querySelectorAll('.encrypted-block');
    blocks.forEach(function (block) {
      var payload = block.querySelector('.encrypted-payload');
      if (!payload) return;
      decrypt(payload.textContent, password).then(function (html) {
        block.outerHTML = html;
      }).catch(function () {
        // leave placeholder on failure
      });
    });
  }

  // Section-level decryption for subpages
  function initSectionDecrypt() {
    var blocks = document.querySelectorAll('.encrypted-block');
    if (!blocks.length) return;

    // If already authed, auto-decrypt all blocks
    if (isAuthed()) {
      decryptAllBlocks(getStoredPassword());
      return;
    }

    // Not authed — clicking placeholder opens modal
    var modal = document.getElementById('section-pw-modal');
    var pwInput = document.getElementById('section-pw-input');
    var pwSubmit = document.getElementById('section-pw-submit');
    var pwError = document.getElementById('section-pw-error');

    if (!modal) return;

    blocks.forEach(function (block) {
      var placeholder = block.querySelector('.encrypted-placeholder');
      if (placeholder) {
        placeholder.addEventListener('click', function () {
          modal.classList.remove('hidden');
          pwInput.value = '';
          pwError.classList.add('hidden');
          pwSubmit.disabled = false;
          pwSubmit.textContent = 'Unlock';
          setTimeout(function () { pwInput.focus(); }, 100);
        });
      }
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.add('hidden');
    });

    function tryUnlock() {
      var password = pwInput.value;
      if (!password) return;
      pwSubmit.disabled = true;
      pwSubmit.textContent = '...';

      // Verify password against first encrypted block
      var firstPayload = document.querySelector('.encrypted-block .encrypted-payload');
      if (!firstPayload) return;

      decrypt(firstPayload.textContent, password).then(function () {
        // Password correct — store and decrypt all
        setAuthed(password);
        modal.classList.add('hidden');
        decryptAllBlocks(password);
      }).catch(function () {
        pwError.classList.remove('hidden');
        pwSubmit.disabled = false;
        pwSubmit.textContent = 'Unlock';
        pwInput.value = '';
        pwInput.focus();
      });
    }

    pwSubmit.addEventListener('click', tryUnlock);
    pwInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') tryUnlock();
    });
  }

  return {
    encrypt: encrypt,
    decrypt: decrypt,
    isAuthed: isAuthed,
    setAuthed: setAuthed,
    initSectionDecrypt: initSectionDecrypt
  };
})();

document.addEventListener('DOMContentLoaded', function () {
  Auth.initSectionDecrypt();
});
