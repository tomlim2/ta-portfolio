// Re-encrypt from originals/ backup files (section-level encryption)
// Usage: node tools/reencrypt.mjs <password>

import { readFileSync, writeFileSync } from 'fs';
import { webcrypto } from 'crypto';

const { subtle } = webcrypto;

const PASSWORD = process.argv[2];
if (!PASSWORD) {
  console.error('Usage: node tools/reencrypt.mjs <password>');
  process.exit(1);
}

const PAGES = [
  { original: 'projects/originals/character-system.html', output: 'projects/character-system.html', title: 'Character System' },
  { original: 'projects/originals/npr-shader.html', output: 'projects/npr-shader.html', title: 'NPR Shader System' },
  { original: 'projects/originals/pmx-to-vrm.html', output: 'projects/pmx-to-vrm.html', title: 'PMX to VRM Pipeline' },
  { original: 'projects/originals/megamelange.html', output: 'projects/megamelange.html', title: 'MegaMelange MCP' },
];

function bufToBase64(buf) {
  return Buffer.from(buf).toString('base64');
}

async function deriveKey(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
}

async function encrypt(plaintext, password) {
  const enc = new TextEncoder();
  const salt = webcrypto.getRandomValues(new Uint8Array(16));
  const iv = webcrypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const ciphertext = await subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plaintext));
  return JSON.stringify({
    salt: bufToBase64(salt),
    iv: bufToBase64(iv),
    data: bufToBase64(ciphertext),
  });
}

async function processContent(content, password) {
  const marker = /<!-- ENCRYPTED -->([\s\S]*?)<!-- \/ENCRYPTED -->/g;
  let result = '';
  let lastIndex = 0;
  let match;
  let count = 0;

  while ((match = marker.exec(content)) !== null) {
    result += content.slice(lastIndex, match.index);
    const encryptedJson = await encrypt(match[1], password);
    result += `<div class="encrypted-block">
  <div class="encrypted-placeholder"><svg viewBox="0 -960 960 960"><path d="M252.31-100q-29.92 0-51.12-21.19Q180-142.39 180-172.31v-375.38q0-29.92 21.19-51.12Q222.39-620 252.31-620H300v-80q0-74.92 52.54-127.46Q405.08-880 480-880q74.92 0 127.46 52.54Q660-774.92 660-700v80h47.69q29.92 0 51.12 21.19Q780-577.61 780-547.69v375.38q0 29.92-21.19 51.12Q737.61-100 707.69-100H252.31Zm0-60h455.38q5.39 0 8.85-3.46t3.46-8.85v-375.38q0-5.39-3.46-8.85t-8.85-3.46H252.31q-5.39 0-8.85 3.46t-3.46 8.85v375.38q0 5.39 3.46 8.85t8.85 3.46Zm277.27-150.42Q550-330.85 550-360t-20.42-49.58Q509.15-430 480-430t-49.58 20.42Q410-389.15 410-360t20.42 49.58Q450.85-290 480-290t49.58-20.42ZM360-620h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg></div>
  <script type="application/json" class="encrypted-payload">${encryptedJson}<\/script>
</div>`;
    lastIndex = match.index + match[0].length;
    count++;
  }
  result += content.slice(lastIndex);
  return { html: result, count };
}

function buildPage(title, content) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — 임연수</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@700;900&family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            bg: '#080808',
            surface: '#111113',
            border: '#2a2b2f',
            muted: '#a8adb6',
            sub: '#b0b4ba',
            accent: '#7c8aff',
          },
          fontSize: {
            sm: '1.05rem',
          },
          fontFamily: {
            sans: ['Noto Sans KR', 'system-ui', 'sans-serif'],
          },
        },
      },
    }
  <\/script>
  <link rel="icon" href="../favicon.gif" type="image/gif">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body class="bg-bg text-[#dcdfe3]">

  <nav class="fixed top-0 w-full z-50 bg-bg/80 backdrop-blur-md">
    <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
      <a href="../index.html" class="flex items-center"><img src="../logo-invert.svg" alt="TOMLIM" class="h-[2rem]"></a>
      <div class="hidden md:flex gap-8 text-sm text-sub">
        <a href="../index.html#projects" class="hover:text-white transition">Projects</a>
        <a href="../index.html#about" class="hover:text-white transition">About</a>
      </div>
    </div>
  </nav>

  <main class="max-w-4xl mx-auto px-6 pt-28 pb-24">
${content}
  </main>

  <!-- Section decrypt modal -->
  <div id="section-pw-modal" class="hidden fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div class="w-full max-w-sm mx-6 bg-surface border border-border rounded-lg p-6">
      <div class="flex items-center justify-center w-12 h-12 rounded-full bg-bg border border-border mb-6 mx-auto">
        <svg class="w-5 h-5 text-muted" fill="currentColor" viewBox="0 -960 960 960">
          <path d="M252.31-100q-29.92 0-51.12-21.19Q180-142.39 180-172.31v-375.38q0-29.92 21.19-51.12Q222.39-620 252.31-620H300v-80q0-74.92 52.54-127.46Q405.08-880 480-880q74.92 0 127.46 52.54Q660-774.92 660-700v80h47.69q29.92 0 51.12 21.19Q780-577.61 780-547.69v375.38q0 29.92-21.19 51.12Q737.61-100 707.69-100H252.31Zm0-60h455.38q5.39 0 8.85-3.46t3.46-8.85v-375.38q0-5.39-3.46-8.85t-8.85-3.46H252.31q-5.39 0-8.85 3.46t-3.46 8.85v375.38q0 5.39 3.46 8.85t8.85 3.46Zm277.27-150.42Q550-330.85 550-360t-20.42-49.58Q509.15-430 480-430t-49.58 20.42Q410-389.15 410-360t20.42 49.58Q450.85-290 480-290t49.58-20.42ZM360-620h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/>
        </svg>
      </div>
      <p class="text-center text-muted text-sm mb-6">NDA 프로젝트입니다.<br>비밀번호를 입력하면 잠긴 콘텐츠를 볼 수 있습니다.</p>
      <input id="section-pw-input" type="password" placeholder="Password" autocomplete="off"
        class="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder-muted focus:outline-none focus:border-accent transition mb-3">
      <p id="section-pw-error" class="hidden text-red-400 text-xs mb-3 text-center">비밀번호가 틀렸습니다</p>
      <button id="section-pw-submit"
        class="w-full px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition">Unlock</button>
      <button id="section-pw-close" class="block w-full mt-3 text-muted text-sm hover:text-white transition">닫기</button>
    </div>
  </div>

  <footer class="border-t border-border py-8 text-center text-muted text-xs">
    <p>&copy; 2026 Younsoo Lim. All rights reserved.</p>
  </footer>

  <script src="../js/auth.js"><\/script>
  <script src="../js/main.js"><\/script>
</body>
</html>`;
}

async function main() {
  for (const page of PAGES) {
    const content = readFileSync(page.original, 'utf-8');
    const { html, count } = await processContent(content, PASSWORD);
    const fullHtml = buildPage(page.title, html);
    writeFileSync(page.output, fullHtml, 'utf-8');
    console.log(`Encrypted: ${page.output} (${count} sections)`);
  }
  console.log('\nDone.');
}

main();
