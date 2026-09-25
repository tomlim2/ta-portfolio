# ta-portfolio

TA 포트폴리오 사이트. GitHub Pages + 커스텀 도메인 `ta.tommlimm.net`.

페이지별 핵심 메시지, 연결된 수정 위치와 로컬 근거 기록은 [map.md](map.md)를 참고한다.

## 콘텐츠 수정

- 현재 디자인 기준은 [docs/style-guide.md](docs/style-guide.md), 시각 예시는 [component-library.html](component-library.html)을 따른다. 공통 스타일을 변경하면 둘을 함께 갱신한다. 초기 `docs/plans/2026-02-15-*`는 과거 기획이다.
- 새 상세 페이지는 [docs/project-template.md](docs/project-template.md)와 `projects/_template.html`을 출발점으로 사용한다. 템플릿과 컴포넌트 문서는 공개 목록에 추가하지 않는다.
- 언어 선택은 푸터의 `언어:` / `Language:` 네이티브 드롭다운(한국어 / English)을 사용한다. 처음에는 브라우저 선호 언어에 맞는 항목을 선택하고, 직접 선택은 `portfolio.language`에 저장한다. 새 페이지는 공통 `js/i18n.js`를 유지한다.

- 공개 페이지는 `index.html`, `resume.html`, `projects/*.html`에서 편집한다.
- 한글 `data-ko`와 영문 본문을 함께 수정한다. 담당 범위, 프로젝트 상태와 수치의 측정 조건을 구분한다.
- 모든 별도 미리보기는 현재 페이지의 공통 모달을 사용한다. `css/preview-modal.css`·`js/preview-modal.js`를 먼저 로드하고 유형별 뷰어를 연결한다. 왼쪽 콘텐츠 이름·오른쪽 액션 묶음·맨 오른쪽 닫기 아이콘, 모바일 전체 화면, Esc·배경 클릭·포커스 복귀를 공통으로 유지한다. 사진·도표에는 `data-image-viewer`와 `css/image-viewer.css`·`js/image-viewer.js`, 이력서에는 `data-resume-viewer`와 resume-viewer CSS/JS를 사용한다. 새 영상·문서 미리보기도 같은 모달 안에 구현한다. 본문 영상 재생과 프로젝트·외부 서비스 탐색 링크는 각각의 원래 동작을 유지한다. 상세 규칙은 스타일 가이드의 “모든 미리보기는 모달”을 따른다.
- 이력서 HTML 수정 시 다운로드용 `assets/resume.pdf`도 재생성하고 확인한다.
- 미공개 작업은 Git에서 제외된 `tools/drafts/`에 보관한다. 인터뷰·근거 기록은 `tools/career-notes/`에 보관한다.
- 2026-09-22 사용자 요청으로 Shotloom 홈 카드를 주요 프로젝트의 네 번째(NPR → Character System → UE5 Profiling → Shotloom)에 표시하고, 승인한 `assets/images/shotloom/thumbnail-editor-v2.png`를 카드와 상세 페이지 히어로에 사용한다. AI 보정 썸네일로 표시하며 본문의 실제 개발 캡처와 구분한다. `/shotloom` 또는 `/shotloom/` 직접 진입 경로도 유지한다. 페이지·진입 경로·에셋은 `site-public.json`에 포함한다.
- 포트폴리오 사례 공개와 Shotloom 제품 출시를 구분한다. 제품은 핵심 흐름 구현·개발 서버 배포 단계였으며 정식 출시는 하지 않았다.
- 일반 수정 후 자동 배포하지 않는다. 사용자가 배포를 요청한 경우에만 릴리즈 태그를 푸시한다.

## 검증 및 배포

- `python3 scripts/build_site.py`로 `site-public.json`에 명시한 공개 파일만 `_site/`에 빌드한다.
- 링크·앵커·텍스트 검증을 통과한 뒤 데스크톱/모바일과 언어 전환을 확인한다.
- `main` 푸시는 검증만 실행한다. `vMAJOR.MINOR.PATCH` 태그 푸시가 검증 → Pages 배포 → GitHub Release 생성을 실행한다.
- 태그별 설명은 `releases/<tag>.md`에 작성할 수 있다. 변경 커밋과 배포 정보는 자동으로 추가된다.
- 자세한 명령과 설정은 `README.md`를 참고한다.

## 과거 암호화 도구

이전 지침은 `projects/originals/`와 `tools/PASSWORD.txt`를 사용한 AES-GCM 빌드를 전제로 했다. 현재 체크아웃에는 두 입력이 없으며, 기존 Git의 프로젝트 페이지도 이미 평문 HTML이다. `js/auth.js`, `js/crypto.js`, `tools/reencrypt.mjs`는 과거 도구로 남아 있다.

누락된 원본으로 `reencrypt.mjs`를 실행하면 다른 페이지를 잃을 수 있으므로 실행하지 않는다. 이 도구는 현재 배포 과정에서 사용하지 않는다. 미공개 여부는 클라이언트의 잠금 UI에 의존하지 않고 커밋과 공개 파일 목록에서 제외해 관리한다.
