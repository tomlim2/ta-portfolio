# 디자인 포트폴리오 홈 이식

2026-09-26 · 작업 브랜치: `codex/design-portfolio-home`

## 이번 단계

TA 포트폴리오 저장소에 `design/index.html`을 추가했다. 첫 화면은 TA 홈의 내비게이션, 16:9 썸네일과 중앙 정렬 캡션, About, 푸터 구성을 사용한다. CSS와 메뉴·언어·테마·이력서 미리보기 스크립트는 두 홈에서 공유한다. 디자인 홈의 이력서는 현재 공통 이력서로 연결한다.

디자인 히어로는 기존 포트폴리오의 [Vimeo 데모릴](https://vimeo.com/323372233)로 바로 시작한다. 사용자 요청으로 상단 제목·소개 문구·이메일·이력서 버튼을 제거했다. 문서 구조용 h1은 스크린리더 전용으로 남기고, 연락처와 이력서 링크는 푸터에서 제공한다. 영상은 16:9 반응형 플레이어이며 자동재생하지 않는다. 재생·전체 화면 컨트롤과 원본 링크를 제공하며, 영상 파일은 복사하거나 다시 업로드하지 않는다.

영상 아래 캡션은 제목 대신 `2020`을 표시한다. 이는 원본 홈의 데모릴 옆 연도 표기를 따른 것이며 Vimeo 업로드 날짜를 새로 확인한 값은 아니다.

- TA 홈 푸터의 **디자인 포트폴리오** → `design/index.html`
- 디자인 홈 푸터의 **TA 포트폴리오** → `../index.html`
- 두 링크는 같은 탭에서 이동하며 저장한 언어 선택이 유지된다.
- Office of Civic Innovation·Curiosity·Olivia는 로컬 상세로, 나머지 3개는 기존 사이트로 연결한다. 상세는 하나씩 이식한다.
- `site-public.json`에 새 홈과 썸네일 디렉터리를 추가했다. 현재 단계는 작업 브랜치에서 진행하며 운영 배포는 별도다.

## 원본과 카드

출처는 `tomlim2/portfolio`의 기존 디자인 포트폴리오 커밋 `f2ef48a1903765fe92f1218227a1c44107588ed5`다. 원본 홈의 프로젝트 이름·순서와 썸네일을 유지했다. 별도 저장소의 진행 중인 통합 브랜치와 미커밋 변경은 수정하지 않았다.

| 프로젝트 | 원본 썸네일 | 새 썸네일 (`assets/images/design/`) | 현재 상세 링크 |
|---|---|---|---|
| Office of Civic Innovation | `children/tbd/img_thumb.jpg` | `civic-innovation.jpg` | [로컬 상세](../projects/civic-innovation.html) |
| Curiosity | `children/concept2017/img_thumb.jpg` | `curiosity.jpg` | [로컬 상세](../projects/curiosity.html) |
| Olivia | `children/gd3/img_thumb.jpg` | `olivia.jpg` | [로컬 상세](../projects/olivia.html) |
| Personal Projects | `children/test2019/img_thumb.jpg` | `personal-projects.jpg` | https://tommlimm.net/children/test2019/index.html |
| Summer VR Project | `children/vr2019/img_thumb.png` | `summer-vr.png` | https://tommlimm.net/children/vr2019/index.html |
| Junkyard | `children/codes/img_thumb.gif` | `junkyard.gif` | https://tommlimm.net/children/codes/index.html |

이미지는 Git 원본을 그대로 가져왔다. Summer VR은 기존 영상의 포스터를 사용하고 Junkyard는 기존 GIF를 유지한다. 첫 화면의 문구는 원본 소개에 있던 브랜딩·2D/3D 모션·프로그래밍·화면 기반 작업을 바탕으로 정리했다. 과거 Varo 재직을 현재 재직으로 표현한 문장과 오래된 이력서 링크는 가져오지 않았다.

## Office of Civic Innovation 상세

2026-09-26 사용자 요청으로 `children/tbd/index.html`을 [새 상세](../projects/civic-innovation.html)에 이식했다. 원본은 위와 같은 커밋이다. 원본 영문 설명과 자료에서 확인한 리드 디자이너 역할·TBD* 맥락을 유지하고, 한국어 번역과 이미지 캡션을 추가했다. 제작 연도·성과 수치·도입 효과는 추정하지 않았다.

- 공통 상세 템플릿의 896px 본문, 제목·섹션 간격, 시스템 테마, 모바일 메뉴, 언어 선택과 이미지 확대 모달을 사용한다.
- 내용 순서: 대표 이미지 → 개요·역할 → 로고 → 로고 모션 → 컬러 → 서체 → 브랜드 가이드라인 → 응용 디자인.
- 디자인 홈의 첫 카드를 새 상세로 연결했다. 로고·내비·목록 복귀는 디자인 홈으로, 푸터의 TA 포트폴리오는 TA 홈으로 연결한다.
- `children/tbd/index.html`은 새 상세로 이동하는 호환 경로다. 기존 디자인 사이트의 파일이나 도메인 설정은 변경하지 않았다.
- 원본 정적 이미지 10개를 아래 이름으로 복사했다. 로고 모션은 macOS `avconvert --preset PresetPassthrough`로 MOV에서 MP4로 컨테이너를 변환하고 자동재생 대신 인라인 컨트롤을 제공한다. 원본은 기존 Git에 남아 있다.

| 원본 (`children/tbd/assets/img/`) | 새 파일 (`assets/images/civic-innovation/`) |
|---|---|
| `img_hero.jpg` | `hero.jpg` |
| `img_logo.png` / `img_logo_2.png` | `logo.png` / `logo-variations.png` |
| `img_color_1.svg` | `colors.svg` |
| `img_typo_1.jpg` / `img_typo_2.jpg` | `typography-1.jpg` / `typography-2.jpg` |
| `img_guideline.jpg` | `guidelines.jpg` |
| `img_application_3.jpg` / `img_application_1.jpg` / `img_application_2.jpg` | `application-3.jpg` / `application-1.jpg` / `application-2.jpg` |
| `video_logo.mov` | `logo-animation.mp4` |

검증: 공개 빌드 15페이지·391개 로컬 참조 통과. 원본 이미지 10개의 바이트 일치, 데스크톱·390px에서 레이아웃과 이미지 로드, 확대·원본 크기·Esc·포커스 복귀, 모바일 메뉴와 디자인 홈 카드 왕복, 한영 전환·선택 유지, 로고 영상 11.42초 끝까지 재생을 확인했다. 기존 URL의 쿼리·해시도 새 상세로 전달된다. 투명 컬러 SVG는 본문과 확대 모달에서 흰 배경으로 표시해 원본 글자의 가독성을 유지한다.

## Curiosity·Olivia 상세

2026-09-26 같은 원본 커밋의 `children/concept2017/index.html`과 `children/gd3/index.html`을 공통 스타일로 이식했다.

| 프로젝트 | 새 상세 | 호환 경로 | 원본 자료 |
|---|---|---|---|
| Curiosity | `projects/curiosity.html` | `children/concept2017/index.html` | 이미지·SVG 24개, 로컬 MP4 1개, Vimeo `319340933` |
| Olivia | `projects/olivia.html` | `children/gd3/index.html` | 이미지·SVG·GIF 49개(과정 자료 23개 포함), Vimeo `308813226` |

- Curiosity는 원문에 명시된 CCA Concept 2017의 키 비주얼 담당 범위와 2017년 표기를 유지했다. 콘셉트 → 시각 언어 → 컬러·서체 → 범퍼·연사 소개·SNS → 포스터 → 행사 현장 순서다. 원래 히어로였던 행사 사진은 행사 현장에 남기고, 첫 이미지에는 원본 키 비주얼을 배치했다.
- Olivia는 원문에서 확인되는 브랜드 방향·로고·모션·포스터·웹 디자인을 정리했다. 제작 연도·상용 출시·사업 성과는 추정하지 않았다. 원문의 평화 상징에 관한 이름 유래는 별도 근거가 없어 확장하지 않았다. 개요·방향 → 로고·모션 → 컬러·서체·사진 → 포스터·패턴 → 영상·웹 → 제작 과정 순서다. 원본 과정 이미지 23개는 펼쳐볼 수 있는 갤러리로 유지했다.
- 각 원본 `assets/img/`와 `assets/video/`의 참조 파일을 `assets/images/curiosity/`와 `assets/images/olivia/` 아래 같은 하위 경로로 바이트 그대로 복사했다. 미사용 원본 에셋·DS_Store·별도 웹 프로토타입은 이식하지 않았다.
- 기존 영상과 GIF를 유지했다. 로컬 영상에는 인라인 재생 컨트롤을 제공하고 Vimeo 영상에는 원본 링크를 함께 둔다. 포트폴리오 본문은 한국어/English를 제공하며, 원본 이미지 안의 영문과 영상은 재편집하지 않았다.
- 디자인 홈 카드, OCI의 다음 프로젝트 링크, 각 페이지의 목록·이전·다음 탐색을 갱신했다. 프로젝트 콘텐츠는 디자인 홈으로, 푸터의 TA 포트폴리오는 TA 홈으로 이동한다.

검증: 원본 자료 74개(이미지·SVG·GIF·MP4)의 바이트 일치와 새 페이지 참조를 확인했다. 기존 별도 작업을 제외한 커밋 대상 빌드 19페이지·581개 로컬 참조를 통과했다. 데스크톱·390px 화면에서 가로 넘침 없이 표시되며, 모바일 메뉴·한영 전환·언어 선택 유지·홈 카드 왕복·상세 이전/다음 탐색을 확인했다. Olivia의 과정 갤러리 23개 펼침, SVG 미리보기·150% 확대·Esc 닫기·포커스 복귀, Curiosity 로컬 영상 3초 끝까지 재생을 확인했다. 두 호환 URL은 쿼리와 해시를 전달한다.

Vimeo 확인 한계: Olivia의 별도 Vimeo 플레이어는 재생 시간을 확인했지만, 두 상세의 로컬 임베드는 검은 화면에 머물렀다. 원본 영상 링크를 유지했으며 실제 배포 도메인에서 임베드 재생을 다시 확인해야 한다.

## 홈 데모릴 확인 범위

2026-09-26 로컬 Codex 브라우저 점검에서 원본 사이트의 Vimeo 임베드와 별도 플레이어의 재생은 확인했다. 로컬 `127.0.0.1` 디자인 홈의 iframe은 검은 화면에 머물러 재생을 확인하지 못했다. 원인은 확정하지 않았으며, 현재 로컬·배포 환경 모두에서 임베드 재생이 검증된 상태로 취급하지 않는다. 원본 링크는 유지하고, 배포할 때 실제 도메인에서 다시 확인한다.

## 후속 이식

남은 3개 상세 페이지는 [프로젝트 작성 가이드](project-template.md)와 공통 템플릿을 이용해 개별적으로 옮긴다. 카드 링크 교체와 공개 목록 추가를 함께 진행한다. `tommlimm.net` 도메인을 통합 사이트로 옮길 때는 기존 `children/` 주소 보존 또는 리다이렉트를 먼저 준비해야 한다.
