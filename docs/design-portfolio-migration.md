# 디자인 포트폴리오 홈 이식

2026-09-26 · 작업 브랜치: `codex/design-portfolio-home`

## 이번 단계

TA 포트폴리오 저장소에 `design/index.html`을 추가했다. 첫 화면은 TA 홈의 내비게이션, 16:9 썸네일과 중앙 정렬 캡션, About, 푸터 구성을 사용한다. CSS와 메뉴·언어·테마·이력서 미리보기 스크립트는 두 홈에서 공유한다. 디자인 홈의 이력서는 현재 공통 이력서로 연결한다.

디자인 히어로는 기존 포트폴리오의 [Vimeo 데모릴](https://vimeo.com/323372233)로 바로 시작한다. 사용자 요청으로 상단 제목·소개 문구·이메일·이력서 버튼을 제거했다. 문서 구조용 h1은 스크린리더 전용으로 남기고, 연락처와 이력서 링크는 푸터에서 제공한다. 영상은 16:9 반응형 플레이어이며 자동재생하지 않는다. 재생·전체 화면 컨트롤과 원본 링크를 제공하며, 영상 파일은 복사하거나 다시 업로드하지 않는다.

영상 아래 캡션은 제목 대신 `2020`을 표시한다. 이는 원본 홈의 데모릴 옆 연도 표기를 따른 것이며 Vimeo 업로드 날짜를 새로 확인한 값은 아니다.

- TA 홈 푸터의 **디자인 포트폴리오** → `design/index.html`
- 디자인 홈 푸터의 **TA 포트폴리오** → `../index.html`
- 두 링크는 같은 탭에서 이동하며 저장한 언어 선택이 유지된다.
- 디자인 프로젝트 6개 모두 로컬 상세로 연결한다. Junkyard의 외부 데모 링크 중 별도 호스팅된 Command G는 원래 주소를 유지한다.
- `site-public.json`에 새 홈과 썸네일 디렉터리를 추가했다. 현재 단계는 작업 브랜치에서 진행하며 운영 배포는 별도다.

## 원본과 카드

출처는 `tomlim2/portfolio`의 기존 디자인 포트폴리오 커밋 `f2ef48a1903765fe92f1218227a1c44107588ed5`다. 원본 홈의 프로젝트 이름·순서와 썸네일을 유지했다. 별도 저장소의 진행 중인 통합 브랜치와 미커밋 변경은 수정하지 않았다.

| 프로젝트 | 원본 썸네일 | 새 썸네일 (`assets/images/design/`) | 현재 상세 링크 |
|---|---|---|---|
| Office of Civic Innovation | `children/tbd/img_thumb.jpg` | `civic-innovation.jpg` | [로컬 상세](../projects/civic-innovation.html) |
| Curiosity | `children/concept2017/img_thumb.jpg` | `curiosity.jpg` | [로컬 상세](../projects/curiosity.html) |
| Olivia | `children/gd3/img_thumb.jpg` | `olivia.jpg` | [로컬 상세](../projects/olivia.html) |
| Personal Projects | `children/test2019/img_thumb.jpg` | `personal-projects.jpg` | [로컬 상세](../projects/personal-projects.html) |
| Summer VR Project | `children/vr2019/img_thumb.png` | `summer-vr.png` | [로컬 상세](../projects/summer-vr.html) |
| Junkyard | `children/codes/img_thumb.gif` | `junkyard.gif` | [로컬 상세](../projects/junkyard.html) |

이미지는 Git 원본을 그대로 가져왔다. Summer VR은 기존 영상의 포스터를 사용하고 Junkyard는 기존 GIF를 유지한다. 첫 화면의 문구는 원본 소개에 있던 브랜딩·2D/3D 모션·프로그래밍·화면 기반 작업을 바탕으로 정리했다. 과거 Varo 재직을 현재 재직으로 표현한 문장과 오래된 이력서 링크는 가져오지 않았다.

## Office of Civic Innovation 상세

2026-09-26 사용자 요청으로 `children/tbd/index.html`을 [새 상세](../projects/civic-innovation.html)에 이식했다. 원본은 위와 같은 커밋이다. 원본 영문 설명과 자료에서 확인한 리드 디자이너 역할·TBD* 맥락을 유지하고, 한국어 번역과 이미지 캡션을 추가했다. 제작 연도·성과 수치·도입 효과는 추정하지 않았다.

- 공통 상세 템플릿의 896px 본문, 제목·섹션 간격, 시스템 테마, 모바일 메뉴, 언어 선택과 이미지 확대 모달을 사용한다.
- 내용 순서: 대표 이미지 → 개요·역할 → 로고 → 로고 모션 → 컬러 → 서체 → 브랜드 가이드라인 → 응용 디자인.
- 디자인 홈의 첫 카드를 새 상세로 연결했다. 로고·상단 내비는 디자인 홈으로, 푸터의 TA 포트폴리오는 TA 홈으로 연결한다. 상세 하단에는 목록 복귀 링크 없이 화살표와 프로젝트명만으로 관련 작업을 연결한다.
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

## Personal Projects·Summer VR Project·Junkyard 상세

2026-09-26 사용자 요청으로 나머지 3개 상세도 같은 원본 커밋에서 이식했다. 이 작업은 기존 작업 브랜치의 로컬 변경이며 배포는 별도다.

| 프로젝트 | 새 상세 | 호환 경로 | 가져온 자료 |
|---|---|---|---|
| Personal Projects | `projects/personal-projects.html` | `children/test2019/index.html` | 이미지 8개·MP4 17개, 영상 프레임에서 추출한 포스터 17개 |
| Summer VR Project | `projects/summer-vr.html` | `children/vr2019/index.html` | 이미지 28개, Vimeo 영상 2개 |
| Junkyard | `projects/junkyard.html` | `children/codes/index.html` | 이미지·GIF 8개, 로컬 실행 데모 6개 |

- Personal Projects는 Test Series의 원래 작업 순서와 36 Days of Type 설명을 유지했다. 영상은 원본을 복사하고, AVFoundation으로 영상 첫 구간의 프레임을 JPEG 포스터로 추출했다. 2026-09-26 사용자 요청에 따라 17개 영상 모두 `autoplay muted loop playsinline`으로 음소거 자동·반복 재생한다. 수동 일시정지·소리 조절용 컨트롤과 포스터를 유지한다. 제작 연도나 완료 수치를 새로 추정하지 않았다.
- Summer VR Project는 2019년 Table, Sensory, and Stage와 2018년 CUBE를 구분한다. 원문의 Concept & Design 크레딧과 CUBE의 Sound Engineering 크레딧을 보존했다. Tom Lim의 개별 개발 범위가 원문에 세분화되어 있지 않아 단독 제작으로 확장하지 않았다. 각 영상의 원본 링크와 시퀀스 이미지 15개·12개를 유지했다.
- Junkyard는 원래 7개 작업과 기술 표기를 바탕으로 구성했다. 정적 이미지·GIF는 미리보기를 열고, 별도의 **데모 열기** 버튼은 새 탭에서 실행한다. Command G는 원본에 있던 별도 GitHub Pages 주소를 유지한다.
- 로컬 미디어 61개는 원본과 바이트가 같다. 원본 HTML에 쓰이지 않는 추가 모션·이미지, OS 메타데이터는 가져오지 않았다. 영상 포스터만 파생 자료다.

### Junkyard 실행 데모

| 작업 | 유지한 실행 경로 |
|---|---|
| Something is happening | `children/codes/assets/web/cp1pj2/index.html` |
| Undertale | `children/codes/assets/web/undertale/index.html` |
| Waving Cube | `children/codes/assets/web/wavingcube/index.html` |
| Bluecat | `children/codes/bluecat.html` |
| Alexander Calder | `children/codes/assets/web/intr2pj3/index.html` |
| Smile Factory | `children/codes/assets/web/smilefactory/index.html` |

원본의 자체 실행 파일과 의존 자료 79개를 가져왔다. 원본 데모의 시각 표현과 인터랙션은 유지하며 다음 호환 수정만 적용했다.

- `children/codes/demo-shell.css`로 목록 복귀 링크와 문서 제목을 제공하고, 누락된 인코딩·뷰포트·의미 있는 제목을 보완했다. 상세 페이지의 공통 컴포넌트를 바꾼 것은 아니다.
- Bluecat은 사용하지 않는 예전 사이트 공통 CSS·JS를 제거하고, 초기화·리사이즈 시 렌더러와 카메라의 화면 비율을 일치시켰다. OBJ·MTL·기존 Three.js 렌더링은 유지했다.
- Undertale은 함께 보관된 p5.js와 애드온을 사용한다. 클릭 후 파티클을 제거할 때 존재하지 않는 `sparkles`를 참조하던 부분을 실제 `cubes` 배열로 고치고, 클릭 시 오디오 컨텍스트 재개를 추가했다. 캔버스는 작은 화면에 맞게 축소한다.
- Calder의 반복 h1은 같은 스타일의 h2로 정리했다. 원본의 가로 스크롤 전시 경험과 Smile Factory의 고정 크기 장면은 그대로 보존했다.

### 검증 기록

- 공개 빌드 31페이지·835개 로컬 참조 통과. 원본 미디어 61개 바이트 비교 통과. 새 상세 3개를 데스크톱·390px에서 확인했으며 가로 넘침이 없었다.
- 모바일 메뉴, 한영 전환과 페이지 이동 후 선택 유지, 프로젝트 이전/다음 이동, 이미지 미리보기·원본 크기 전환·Esc 닫기·포커스 복귀를 확인했다. 세 이전 URL은 쿼리와 해시를 새 상세로 전달한다.
- Test N° 21 영상 재생, 36 Days of Type 영상 12.92초 끝까지 재생을 확인했다. 17개 영상 모두 포스터 추출 과정에서 영상 트랙과 길이를 읽었다.
- Junkyard 로컬 데모 6개의 렌더링을 확인했다. 데이터 시각화 드래그, Undertale 클릭, Calder 가로 스크롤, Smile Factory 클릭 반응과 목록 복귀를 확인했다. Command G의 별도 원본 사이트도 열린다. 예전 데모의 장면 구성과 기기별 제약까지 전면 재작성한 것은 아니다.
- VR의 두 Vimeo 원본 플레이어는 열렸지만 재생 성공은 확인하지 못했다. 로컬 상세 임베드는 기존 이식 페이지와 마찬가지로 검은 화면이 남아, 원본 링크를 함께 제공하고 배포 도메인에서 다시 확인한다.

## 후속 확인

6개 상세 이식을 완료했다. `tommlimm.net` 도메인을 통합 사이트로 옮길 때는 기존 URL의 직접 진입과 외부 임베드 재생을 배포 환경에서 다시 확인한다.
