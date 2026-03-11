# ta-portfolio

TA 포트폴리오 사이트. GitHub Pages + 커스텀 도메인 (ta.tommlimm.net).

## NDA 암호화 워크플로우

NDA 프로젝트 3개는 AES-256-GCM으로 암호화하여 배포. 비밀번호: `cinev2026`

### 개발 중 (로컬)

평문 HTML로 작업. 수정은 `projects/originals/`에서 한다.

```bash
# originals 수정 후 → 평문 full HTML 빌드
node tools/build-dev.mjs
```

### 커밋 전 (필수)

**반드시 암호화 후 커밋.** 평문 커밋 금지.

```bash
# 암호화
node tools/reencrypt.mjs cinev2026

# 그다음 커밋
git add -A && git commit
```

### 서브페이지 6개 — CSS 수정 시 전부 반영

CSS나 스타일 클래스를 수정할 때 **6개 서브페이지 모두** 적용할 것. 4개는 originals, 2개는 직접 수정.

| 암호화 (originals → reencrypt) | 공개 (직접 수정) |
|-------------------------------|-----------------|
| `projects/originals/character-system.html` | `projects/npr-shader.html` |
| `projects/originals/megamelange.html` | `projects/matcap-painter.html` |
| `projects/originals/pmx-to-vrm.html` | `projects/mmd-player.html` |

**주의:** `projects/originals/` 수정 후 커밋 전 반드시 `node tools/reencrypt.mjs cinev2026` 실행. NPR Shader는 NDA가 아니므로 originals 수정 시 `projects/npr-shader.html`에 직접 반영해야 한다.

### 파일 구조

| 경로 | 용도 | gitignore |
|------|------|-----------|
| `projects/originals/` | 평문 원본 (편집 대상) | YES |
| `projects/*.html` | 배포용 (암호화됨 or 공개) | NO |
| `tools/` | 스크립트 + 비밀번호 | YES |

### 스크립트

| 스크립트 | 용도 |
|----------|------|
| `tools/build-dev.mjs` | originals → 평문 full HTML (로컬 개발용) |
| `tools/reencrypt.mjs <pw>` | originals → 암호화 HTML (커밋용) |
| `tools/decrypt-backup.mjs <pw>` | 암호화 HTML → originals 복원 |
| `tools/encrypt-pages.mjs <pw>` | 원본 encrypt-in-place (레거시) |
