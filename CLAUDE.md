# ta-portfolio

TA 포트폴리오 사이트. GitHub Pages + 커스텀 도메인 `ta.tommlimm.net`.

## 콘텐츠 수정

- 공개 페이지는 `index.html`, `resume.html`, `projects/*.html`에서 편집한다.
- 한글 `data-ko`와 영문 본문을 함께 수정한다. 담당 범위, 프로젝트 상태와 수치의 측정 조건을 구분한다.
- 이력서 HTML 수정 시 다운로드용 `assets/resume.pdf`도 재생성하고 확인한다.
- 미공개 작업은 Git에서 제외된 `tools/drafts/`에 보관한다. 인터뷰·근거 기록은 `tools/career-notes/`에 보관한다.
- 현재 Shotloom 상세 사례와 이미지는 공개 보류 상태다. 공개 요청 전에는 커밋하거나 배포 목록에 추가하지 않는다. 기존 홈·이력서 경력 설명은 유지한다.

## 검증 및 배포

- `python3 scripts/build_site.py`로 `site-public.json`에 명시한 공개 파일만 `_site/`에 빌드한다.
- 링크·앵커·텍스트 검증을 통과한 뒤 데스크톱/모바일과 언어 전환을 확인한다.
- `main` 푸시는 검증만 실행한다. `vMAJOR.MINOR.PATCH` 태그 푸시가 검증 → Pages 배포 → GitHub Release 생성을 실행한다.
- 태그별 설명은 `releases/<tag>.md`에 작성할 수 있다. 변경 커밋과 배포 정보는 자동으로 추가된다.
- 자세한 명령과 설정은 `README.md`를 참고한다.

## 과거 암호화 도구

이전 지침은 `projects/originals/`와 `tools/PASSWORD.txt`를 사용한 AES-GCM 빌드를 전제로 했다. 현재 체크아웃에는 두 입력이 없으며, 기존 Git의 프로젝트 페이지도 이미 평문 HTML이다. `js/auth.js`, `js/crypto.js`, `tools/reencrypt.mjs`는 과거 도구로 남아 있다.

누락된 원본으로 `reencrypt.mjs`를 실행하면 다른 페이지를 잃을 수 있으므로 실행하지 않는다. 이 도구는 현재 배포 과정에서 사용하지 않는다. 미공개 여부는 클라이언트의 잠금 UI에 의존하지 않고 커밋과 공개 파일 목록에서 제외해 관리한다.
