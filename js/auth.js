// AES-GCM encryption/decryption for NDA project pages (section-level)

var Auth = (function () {
  var SESSION_KEY = 'ta-portfolio-auth';
  var TIMESTAMP_KEY = 'ta-portfolio-auth-ts';
  var TTL = 60 * 60 * 1000; // 1 hour

  function bufToBase64(buf) {
    var bytes = new Uint8Array(buf);
    var binary = '';
    var chunkSize = 8192;
    for (var i = 0; i < bytes.length; i += chunkSize) {
      var chunk = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
      for (var j = 0; j < chunk.length; j++) {
        binary += String.fromCharCode(chunk[j]);
      }
    }
    return btoa(binary);
  }

  function base64ToBuf(b64) {
    var bin = atob(b64);
    var buf = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
    return buf;
  }

  function getKey(password, salt, usage) {
    var enc = new TextEncoder();
    return crypto.subtle.importKey(
      'raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']
    ).then(function (keyMaterial) {
      return crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt: salt, iterations: 100000, hash: 'SHA-256' },
        keyMaterial,
        256
      );
    }).then(function (bits) {
      return crypto.subtle.importKey(
        'raw', bits, { name: 'AES-GCM' }, false, usage
      );
    });
  }

  function encrypt(plaintext, password) {
    var enc = new TextEncoder();
    var salt = crypto.getRandomValues(new Uint8Array(16));
    var iv = crypto.getRandomValues(new Uint8Array(12));
    return getKey(password, salt, ['encrypt']).then(function (key) {
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
    return getKey(password, salt, ['decrypt']).then(function (key) {
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
    var firstPayload = blocks.length ? blocks[0].querySelector('.encrypted-payload') : null;
    if (!firstPayload) return Promise.resolve(false);

    // Test first block, then decrypt all
    return decrypt(firstPayload.textContent.trim(), password).then(function () {
      blocks.forEach(function (block) {
        var payload = block.querySelector('.encrypted-payload');
        if (!payload) return;
        decrypt(payload.textContent.trim(), password).then(function (html) {
          block.outerHTML = html;
        }).catch(function (err) {
          console.error('[Auth] block decrypt failed:', err);
        });
      });
      return true;
    }).catch(function (err) {
      console.error('[Auth] auto-decrypt failed, clearing session:', err);
      clearAuth();
      return false;
    });
  }

  // Section-level decryption for subpages
  function initSectionDecrypt() {
    if (!window.crypto || !window.crypto.subtle) {
      console.error('[Auth] Web Crypto API not available (HTTPS required)');
      return;
    }

    var blocks = document.querySelectorAll('.encrypted-block');
    if (!blocks.length) return;

    // If already authed, try auto-decrypt; if it fails, fall through to click handlers
    if (isAuthed()) {
      decryptAllBlocks(getStoredPassword()).then(function (ok) {
        if (!ok) setupClickHandlers();
      });
      return;
    }

    setupClickHandlers();
  }

  function setupClickHandlers() {
    var modal = document.getElementById('section-pw-modal');
    var pwInput = document.getElementById('section-pw-input');
    var pwSubmit = document.getElementById('section-pw-submit');
    var pwError = document.getElementById('section-pw-error');

    if (!modal) return;

    var blocks = document.querySelectorAll('.encrypted-block');
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

    var closeBtn = document.getElementById('section-pw-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        modal.classList.add('hidden');
      });
    }

    function showError(msg) {
      pwError.textContent = msg;
      pwError.classList.remove('hidden');
      pwSubmit.disabled = false;
      pwSubmit.textContent = 'Unlock';
      pwInput.value = '';
      pwInput.focus();
    }

    function tryUnlock() {
      var password = pwInput.value;
      if (!password) return;
      pwSubmit.disabled = true;
      pwSubmit.textContent = '...';

      try {
        var firstPayload = document.querySelector('.encrypted-block .encrypted-payload');
        if (!firstPayload) { showError('No encrypted block found'); return; }

        var payloadText = firstPayload.textContent.trim();
        decrypt(payloadText, password).then(function () {
          setAuthed(password);
          modal.classList.add('hidden');
          decryptAllBlocks(password);
        }).catch(function (err) {
          console.error('[Auth] decrypt failed:', err);
          showError(String(err));
        });
      } catch (e) {
        console.error('[Auth] tryUnlock error:', e);
        showError(String(e));
      }
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
