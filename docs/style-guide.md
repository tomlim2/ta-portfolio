# 포트폴리오 스타일 가이드

기준일: 2026-09-26 · 대상: `tomlim2/ta-portfolio`의 TA·디자이너 포트폴리오.

현재 체크아웃의 구현을 설명하고 기존 포폴을 이식할 때 사용할 기준을 정리한다. **현재 구현**과 **새 페이지 작성 기준**을 구분한다. 디자인 홈은 `codex/design-portfolio-home` 브랜치의 미배포 작업이며, 이 문서는 운영 배포 상태를 보증하지 않는다.

## 1. 어디서 무엇을 확인하는가

| 자료 | 역할 |
|---|---|
| 이 문서 | 색상·타이포·레이아웃·인터랙션의 사용 규칙 |
| [Component Library](../component-library.html) | 실제 공통 CSS를 사용하는 시각적 예시와 동작 확인 |
| [프로젝트 작성 가이드](project-template.md) | 콘텐츠 구성, 복사·수정·검증 순서 |
| [상세 HTML 템플릿](../projects/_template.html) | 새 프로젝트의 실행 가능한 출발점. 공개 대상 아님 |
| [공통 CSS](../css/style.css), [이미지 뷰어 CSS](../css/image-viewer.css) | 브라우저에 적용되는 값의 원본 |
| [콘텐츠 맵](../map.md) | 프로젝트별 메시지·근거·관련 수정 위치 |

스타일을 변경하면 CSS/해당 HTML, 이 문서, 컴포넌트 예시를 같은 변경에서 갱신한다. 문서와 화면이 다르면 해당 선택자의 최종 CSS 및 HTML 클래스를 먼저 확인한다. `docs/plans/2026-02-15-*`는 초기 기획 기록이며 현재 사양으로 사용하지 않는다.

빠르게 적용하려면 [패턴 선택표](../component-library.html#choosing-patterns) → 해당 섹션의 실제 예시 → 「HTML 코드」 순서로 확인한다. 코드는 펼쳐서 복사할 수 있다. 카드 코드는 루트 `index.html`, 미디어 코드는 `projects/{slug}.html` 기준이다. `design/index.html`에서 쓸 때는 로컬 에셋·상세 링크 앞에 `../`가 필요하므로 각 코드의 경로 안내를 따른다. `[REPLACE]`, 번역, 경로, 이미지 크기는 실제 프로젝트에 맞춰 수정한다.

## 2. 화면 방향과 콘텐츠 계층

- 흰 배경, 넓은 여백, 작업 이미지와 읽기 쉬운 설명을 중심으로 구성한다.
- TA 홈은 직무·강점 소개 → 주요 프로젝트 → 제작 도구와 기술 실험 → 소개·경력·기술 → 푸터 순서다.
- 디자인 홈 `design/index.html`은 같은 카드·About·푸터 형식을 공유하고, 히어로는 소개 문구 없이 데모릴로 시작한다. 디자인 작업 6개를 표시하고 이식한 상세는 로컬 페이지로, 나머지는 기존 사이트로 연결한다. [이식 기록](design-portfolio-migration.md)을 참고한다.
- TA 주요 프로젝트의 현재 순서는 NPR → Character System → UE5 Profiling → Shotloom이다.
- 상세는 대표 미디어와 제목을 먼저 보여주고, 역할·문제·판단·구현·결과를 설명한다. 섹션 이름과 개수는 프로젝트 내용에 맞춘다.
- 숫자와 비교 이미지는 측정 조건·제작 시점·본인 담당 범위를 함께 설명한다. 기술명을 나열하는 것만으로 기여를 대신하지 않는다.
- AI 보정 썸네일, 개념도, 실제 개발 캡처를 캡션으로 구분한다. Shotloom 카드의 보정 표시와 직접 진입 경로는 유지한다.

### 내용에 따라 패턴 선택하기

| 전달할 내용 | 기본 패턴 | 선택 기준과 피할 사용 |
|---|---|---|
| 문제·접근·판단 | [일반 본문](../component-library.html#panels) | 문단 하나에 핵심 판단 하나. 긴 서술을 여러 패널에 쪼개지 않는다. |
| 작업 환경·제약·담당 범위 | [정보 패널](../component-library.html#panels) | 본문과 분리해도 이해되는 짧은 요약. 페이지 전체를 패널로 감싸지 않는다. |
| 시각 품질·변환 차이 | [이미지·비교](../component-library.html#media) | 같은 구도·입력·설정인지 밝힌다. 비교 조건이 다르면 차이를 성능 개선으로 단정하지 않는다. |
| 시간·메모리·처리량 비교 | [수치 표](../component-library.html#tables) | 환경·단위·측정 범위가 있는 결과만. 수치가 없으면 관찰한 결과를 문장으로 설명한다. |
| 조작·시간에 따른 변화 | [설명 영상](../component-library.html#media) | 핵심 동작과 볼 시점을 설명한다. 정지 화면으로 충분한 설명에 긴 영상을 강요하지 않는다. |
| 여러 작업 중 선택 | [홈 카드](../component-library.html#cards) | 작업을 식별하는 이미지와 한 문장 소개. 작은 UI 텍스트는 상세 이미지에서 보여준다. |
| 아이콘의 짧은 이름·목적 | [툴팁](../component-library.html#tooltips) | 보조 라벨만 제공. 필수 안내·오류·긴 설명은 화면에 직접 표시한다. |

같은 자료도 목적에 따라 배치가 달라진다. 도구의 **완성 화면**은 대표 이미지, **사용 순서**는 조작 영상, **구현 선택의 이유**는 문단, **검증 환경**은 짧은 패널, **측정한 전후 차이**는 표에 둔다. 모든 프로젝트에 이 다섯 가지를 억지로 채우지는 않는다.

## 3. 색상

색상은 `css/style.css`의 RGB 채널 변수와 각 HTML의 Tailwind 설정으로 연결된다. 예: `text-muted` → `rgb(var(--c-muted))`. 일반 UI에는 의미에 맞는 클래스를 사용한다.

| 변수 / Tailwind 이름 | 라이트 | 다크 | 용도 |
|---|---|---|---|
| `--c-bg` / `bg` | `#FFFFFF` | `#16161A` | 페이지 바탕 |
| `--c-surface` / `surface` | `#F5F5F7` | `#202026` | 정보 패널 |
| `--c-border` / `border` | `#E1E1E6` | `#32323A` | 구분선 |
| `--c-muted` / `muted` | `#6E6E73` | `#96969B` | 본문 설명·메타정보 |
| `--c-body` / `body` | `#28282D` | `#D2D2D7` | 기본 글자·소개 |
| `--c-heading` / `heading` | `#55555A` | `#AFAFB4` | 선택한 제목·표 레이블·호버 |
| `--c-accent` / `accent` | `#505FE6` | `#6478F0` | 본문 링크·성과 표시 |

`heading`은 라이트 모드에서 `body`보다 밝다. 이름만 보고 가장 진한 색이라고 가정하지 않는다. 대비 적합성은 배경·투명도·글자 크기의 조합으로 별도 검증하며, 토큰 이름 자체가 접근성 보증은 아니다.

**현재 구현:** 기본은 시스템의 `prefers-color-scheme`을 따른다. `js/theme.js`가 실제 테마를 html의 `data-theme="light|dark"`에 반영하고 시스템 변경도 추적한다. 컴포넌트 문서의 System / Light / Dark 컨트롤에서 방문 중 테마를 지정할 수 있다. 선택은 저장하지 않으므로 새로고침하면 System으로 돌아온다. 공개 홈·상세 푸터에는 테마 전환 버튼이 없으며 시스템 설정을 따른다. JavaScript 실행 전·비활성 시에도 CSS 미디어 쿼리가 시스템 테마를 적용한다. 명시적인 `data-theme="light"` 또는 `data-theme="dark"`는 버튼 하나나 그룹에 지정할 수 있고, 상위 테마보다 우선한다.

예외 색상은 코드 블록(`#1A1A2E` / `#B8D4A8`), AI 보정 썸네일 표시의 흰 글자·반투명 검은 바탕, 이미지 확대 뷰어의 어두운 바탕이다.

컴포넌트 문서의 기본 팔레트는 현재 미리보기 테마를 따른다. 색상칩은 `--c-*`를 사용하고 HEX 표시는 같은 변수에서 읽는다. 접힌 다크 팔레트는 별도의 `data-theme="dark"` 범위로 표시한다. 위 Markdown 표는 기준일의 수동 기록이므로 CSS 색상을 바꾸면 함께 갱신해야 한다.

## 4. 타이포그래피와 언어

- 기본 본문·한국어: **Noto Sans KR**, 실패 시 시스템 sans-serif.
- 영어의 주요 제목·카드·경력 직무·내비 링크: **Noto Rashi Hebrew**, 실패 시 serif.
- `js/i18n.js`는 한국어 모드에서 `.hero-tagline`, `.page-title`, `.card-title`, `.about-role`, `.nav-links a`를 Noto Sans KR로 바꾼다.
- 글자 크기는 현재 공통 클래스와 Tailwind 클래스에 정의되어 있다. `--t-*` CSS 변수는 구현되어 있지 않다.

아래 px 값은 루트 글자 크기 16px 기준이다.

[Typography 예시](../component-library.html#typography)의 언어 버튼으로 한·영을 전환하면, 예시 아래의 글꼴·크기·굵기·줄높이가 계산된 CSS 값으로 갱신된다. 글꼴명은 지정된 첫 번째 글꼴이며 실제 다운로드 성공이나 글리프별 대체 글꼴 사용을 보증하지 않는다. 본문은 15px, 패널 안 본문은 14px, 홈 카드 제목은 화면 너비에 따라 18–24px인 문맥 차이도 함께 확인한다.

| 역할 / 클래스 | 크기 | 굵기·행간 / 비고 |
|---|---|---|
| TA 홈 직무 `.hero-tagline` | 32px | 기본 400, 행간 1.4 |
| TA 홈 설명 `.hero-summary` | `clamp(16.8px, 2.1vw, 21.6px)` | 행간 1.75, 최대 폭 800px |
| 상세 제목 `.page-title` | 32px | 700, 행간 1.5 |
| 상세 부제 `.page-subtitle` | 15px | 설명 문장 |
| 일반 섹션 `text-xl font-bold` | 20px | 700 |
| 기본 카드 제목 `.card-title` | 16.8px | 500 |
| **홈 이미지 아래 카드 제목** | **18–24px** (`clamp`) | **500**, heading 색상; `.project-card-caption`에서 재정의 |
| 기본 카드 부제 `.card-subtitle` | 13px | 홈 캡션에서는 **14px**, muted 색상 |
| 본문 `text-sm leading-relaxed` | 15px | 행간 1.625; Tailwind 기본 `text-sm`을 확장함 |
| 패널 본문 `.bg-surface p/div` | 14px | 행간 1.7 |
| 경력 직무 / 세부 `.about-role` / `.about-detail` | 15px / 13px | 직무 500, 세부 400 |
| 레이블·캡션 `text-xs` | 12px | 보조 정보용 |
| `.section-label`, `.skill-label` | 12px | 섹션 레이블 자간 0.1em |
| 로고 `.nav-logo` / 내비 링크 | 20px / 14px | 로고 700 |
| 태그·툴팁 | 11px | 본문 대체 용도로 사용하지 않음 |

현재 `p, h1, h2, h3, td, th, summary, blockquote`에는 `text-wrap: balance`, `word-break: keep-all`이 적용된다. 홈 설명은 긴 문자열이 넘치지 않도록 `overflow-wrap: anywhere`도 사용한다.

### 언어 작성 규칙

```html
<p class="text-muted text-sm leading-relaxed" data-ko="문제와 해결 과정을 한국어로 설명합니다.">Describe the problem and the solution in English.</p>
```

영문을 본문에, 한국어를 `data-ko`에 넣는다. 처음에는 브라우저의 선호 언어에 맞는 한국어·English 항목이 선택된다. 직접 선택한 한국어·영어는 저장되어 페이지 이동·새로고침·다음 방문에도 유지된다. `data-en`은 스크립트가 원래 HTML을 저장할 때 생성한다. 이력서 HTML은 한국어 전용 별도 레이아웃이다.

스크립트는 번역 대상 요소의 `innerHTML`을 교체한다. 이미지 링크·버튼·폼·복잡한 섹션 전체에 `data-ko`를 붙이지 말고 **교체할 텍스트 요소에만** 붙인다. 특히 이미지 뷰어 링크를 번역 컨테이너 안에 넣으면 이벤트 연결을 잃을 수 있다. `alt`, `aria-label`, 문서 제목과 메타 설명은 자동 번역되지 않는다.

## 5. 레이아웃·간격·반응형

| 대상 | 현재 기준 |
|---|---|
| 홈·상단 내비·모든 포트폴리오 푸터 | `max-w-[1400px] mx-auto px-6` |
| 상세 본문 | `max-w-4xl mx-auto px-6` — 외곽 최대 896px |
| 비교 이미지 / 좁은 미디어 | 문맥에 따라 `max-w-3xl` 768px, `max-w-xl` 576px, `max-w-lg` 512px |
| 공통 좌우 여백 | `px-6` — 24px |
| 홈 카드 | `.project-grid` — 가로 24px · 세로 40px 간격, 768px부터 2열 |
| `md` 경계 | 768px; 카드 2열, 데스크톱 내비 표시 |
| 내비 높이 | `h-16` — 64px, 상단 고정 |
| TA 홈 소개 | `pt-32 pb-12` — 위 128px, 아래 48px |
| 디자인 홈 영상 히어로 | `pt-24 pb-12` — 위 96px, 아래 48px; 영상 16:9, 캡션 위 간격 12px |
| 홈 프로젝트 | HTML은 `py-16`; CSS `#projects`가 위쪽을 48px로 재정의, 아래 64px |
| 홈 About | `py-24` — 96px |
| 상세 시작·끝 | `pt-16 pb-24` — 64px / 96px |
| 상세 섹션 사이 | 보통 `mb-16` — 64px |
| 제목→본문 / 문단 사이 | `mb-4` 16px / `mb-6` 24px 중심 |
| 이미지 그룹 사이 | 보통 `mb-8` 32px 또는 `mb-10` 40px |

**새 페이지 작성 기준:** 모바일 1열을 기본으로 하고 비교가 필요한 그룹만 768px 이상에서 2열로 만든다. 표는 `.overflow-x-auto`로 감싸 표 영역에서만 스크롤되도록 한다. 긴 제목·영문·한국어·원본 비율 이미지를 390px에서 확인한다. 섹션 링크가 있으면 `scroll-mt-24`를 사용한다.

모서리는 홈 작업 카드와 큰 작업 이미지가 직각, 패널·코드 블록이 `rounded-lg`(8px), 성과 배지·툴팁이 4px다. 컴포넌트 문서의 12px 프레임은 예시를 담는 내부 문서 UI이며 사이트 카드 규칙이 아니다.

[Layout 도식](../component-library.html#layout)의 막대는 1400px을 100%로 환산한 상대 폭이다. 작은 브라우저에서도 1400/896/768px의 차이를 보여주기 위한 도식이며 실제 픽셀 크기나 현재 컨테이너 폭은 아니다. `max-w-4xl px-6`은 외곽 최대 896px, 내부 최대 848px다.

## 6. 컴포넌트 사용

### 홈 히어로 — TA / 디자인

두 홈은 1400px 컨테이너와 공통 내비를 공유하지만 첫 화면의 내용은 다르다. [Home Heroes 예시와 실제 코드](../component-library.html#home-heroes)를 참고한다.

| 홈 | 구성 | 연락처·이력서 |
|---|---|---|
| `index.html` | 직무 `h1.hero-tagline` → 설명 `.hero-summary` → `.hero-actions` | 히어로와 푸터 |
| `design/index.html` | `h1.sr-only` → Vimeo 데모릴 → 연도·원본 링크 | 푸터 |

디자인 홈에는 보이는 직무 제목·소개 문구·액션 행을 추가하지 않는다. `figure#design-reel` 안의 iframe은 `w-full aspect-video h-auto`로 16:9를 유지하며 자동재생하지 않는다. 캡션 왼쪽은 `<time datetime="2020">2020</time>`, 오른쪽은 「Vimeo에서 보기 / Watch on Vimeo」다. `2020`은 원본 포트폴리오의 연도 표기를 따른 값이며, Vimeo 업로드 날짜를 확인한 값은 아니다. iframe의 설명적인 `title`은 캡션과 별개로 유지한다.

### 홈 작업 카드

카드 전체를 상세 페이지로 연결한다. `.project-card-media`의 썸네일은 16:9, `object-fit: cover`를 유지하고, 제목과 부제는 이미지 밖 아래쪽 `.project-card-caption`에 가운데 정렬한다. 이미지와 캡션 사이는 18px, 제목과 부제 사이는 4px다. 제목의 줄높이는 1.4, 부제는 1.65이며 긴 문장은 자르지 않고 균형 있게 줄바꿈한다(`text-wrap: balance`). 배경은 페이지 색상을 사용하고 그라데이션·텍스트 그림자는 넣지 않는다. AI 보정 표시는 이미지 오른쪽 위에 유지한다. 마우스 hover는 이미지 1.04배, 0.4초 전환이며 키보드 포커스 외곽선을 제공한다. 동작 줄이기 설정에서는 확대와 전환을 생략한다.

```html
<a href="projects/project-slug.html" class="project-card">
  <div class="project-card-media">
    <img src="assets/images/project-slug/thumbnail.webp" alt="결과물을 식별할 수 있는 설명" class="project-card-img" loading="lazy" decoding="async">
  </div>
  <div class="project-card-caption">
    <h3 class="card-title" data-ko="프로젝트 제목">Project title</h3>
    <p class="card-subtitle" data-ko="역할과 핵심 내용을 한 문장으로">One line about the role and the work</p>
  </div>
</a>
```

위 경로는 루트 `index.html`의 작성 예시다. 디자인 홈에서는 이미지 경로가 `../assets/images/design/...`이며, 6개 카드 모두 `../projects/`의 로컬 상세로 연결한다. 실제 경로는 [디자인 이식 기록](design-portfolio-migration.md)의 표를 참고한다. 상세 경로를 바꾸면 카드의 링크도 함께 교체한다. 실제 파일로 바꾼 뒤 공개 목록에 넣는다. 화면 처음에 보이는 핵심 이미지는 무조건 lazy로 설정하지 않는다.

### 패널·표·코드

- 짧은 정보 묶음은 `bg-surface rounded-lg p-6`. `.bg-surface > h3`는 자동 구분선이 생긴다.
- 상세 설명은 일반 문단을 중심으로 구성하고, 모든 섹션을 패널로 둘러싸지 않는다.
- 표는 `.tbl`, 레이블 셀 `.lbl`, 값 `.val`, 우측 정렬 수치 `.val-r`, 검증된 변화량은 `.gain`을 사용한다.
- 단위, 측정 대상, 환경, 전후 조건이 있는 수치만 성과로 제시한다. 컴포넌트 예시의 수치는 가상이다.
- 코드는 `pre > code`로 감싼다. 넘치는 코드는 블록 내부에서 가로 스크롤한다.

### 링크·내비·푸터

**TA 홈**의 소개문 아래에는 **tomandlim@gmail.com / 이력서 보기** 두 개의 텍스트 전용 Ghost 링크를 둔다. `.hero-actions`는 위 간격 16px, 링크 사이 가로 간격 24px로 배치하고 좁은 화면에서는 줄바꿈한다. 링크는 공통 `.btn.btn--ghost`의 14px / 20px와 최소 높이 44px를 유지하되 좌우 패딩을 없애 소개문 시작선에 맞춘다. 이메일은 `mailto:`, 이력서는 `data-resume-viewer`로 기존 모달에 연결한다. GitHub·LinkedIn은 홈 푸터에서 제공한다. 디자인 홈은 히어로 액션을 생략하고 이메일·이력서도 푸터에서 제공한다.

본문 링크는 `text-accent hover:underline`, 내비는 `text-body hover:text-heading`을 사용한다. 외부 새 탭 링크에는 `target="_blank" rel="noopener"`를 함께 쓴다. 아이콘 링크에는 `aria-label`을 제공한다. `data-tip`은 hover·키보드 포커스 보조 설명이며 접근 가능한 이름을 대신하지 않는다.

홈 내비는 스크롤 다운 시 숨고 위로 스크롤하면 나타난다. 모바일 메뉴는 `#hamburger-btn` / `#mobile-menu`를 사용하고 링크 클릭 후 닫힌다. 메뉴 버튼의 `.mobile-menu-toggle`은 768px 이상에서 숨기는 배치 규칙이다. 일부 오래된 상세에는 모바일 메뉴가 없으므로 새 페이지는 템플릿의 메뉴를 따른다. 모든 TA·디자인 홈과 상세 페이지의 푸터는 메인과 동일한 `max-w-[1400px] mx-auto px-6` 너비와 `py-8` 여백을 사용한다. 상세 본문의 896px 너비와 독립적으로 배치하며, **왼쪽 저작권 · 가운데 tomandlim@gmail.com / 이력서 / 깃허브 / 링크드인 / 디자이너 포트폴리오 · 오른쪽 언어 선택**으로 배치한다. `.footer-layout`은 좌우 열 너비가 같은 3열 grid이며, `.footer-copyright`, `.footer-links`, `.footer-language`를 순서대로 놓는다. 가운데 목록 안의 `.footer-item`에 `.btn.btn--ghost.footer-link`를 사용한다. 푸터 텍스트·링크·언어 선택은 모두 12px / 16px이며, 조작 높이는 데스크톱 44px, 세로 배치 32px를 사용한다. 이력서는 공통 미리보기 모달, GitHub·LinkedIn은 외부 새 탭, 이메일은 `mailto:`로 연결한다. 라벨은 `data-ko`로 번역하며 링크 자체를 번역 과정에서 교체하지 않는다. 언어 선택은 보이는 라벨을 `aria-labelledby`로 연결한다.

가운데 링크 묶음은 푸터 중심에 정렬하고 링크 사이에 24px 간격과 장식 세로 구분선을 둔다. 구분선은 CSS로 그려 스크린리더가 읽지 않게 한다. `.site-footer`의 컨테이너 너비가 800px 이하이면 첫 행 저작권, 가운데 묶음 이메일·이력서·깃허브·링크드인·디자이너 포트폴리오, 마지막 행 언어 선택으로 나누어 모두 가운데 정렬한다. 이 세로 배치에서는 저작권·링크·드롭다운의 최소 높이를 모두 32px로 줄이고 내용을 세로 중앙에 둔다. 드롭다운의 세로 패딩은 4px, 행 사이 추가 간격은 0이며, 한 줄씩 표시될 때 각 행의 중심 간격은 32px로 동일하다. 모바일 푸터 링크와 언어 선택에만 이 작은 높이를 적용한다. TA 홈·상세의 마지막 링크는 디자이너 포트폴리오로, 디자인 홈·상세의 마지막 링크는 TA 포트폴리오로 같은 탭에서 연결한다. 홈은 `design/index.html` 또는 `../index.html`, 상세는 `../design/index.html` 또는 `../index.html`을 사용한다. 이메일·이력서·GitHub·LinkedIn·언어 선택은 모든 페이지에서 동일하게 제공하며 마지막 포트폴리오 링크의 목적지만 바꾼다. 링크가 한 줄에 들어가지 않으면 가운데 묶음 안에서 줄바꿈하고 언어 선택은 그 아래에 둔다. 이때 링크 간격은 16px로 줄이고 구분선을 숨기며 필요한 경우 순서대로 줄바꿈한다. 이메일 주소는 한 항목으로 유지한다. 상세에도 `data-resume-viewer`와 resume-viewer CSS·JS를 포함해 이력서를 같은 모달로 연다. 새 상세는 `projects/_template.html`의 전체 푸터를 유지한다. 디자인 상세의 로고·상단 내비·프로젝트 목록 링크는 디자인 홈으로 돌아간다.

### 언어 선택 — Language 드롭다운

`.language-switcher`는 보이는 `언어:` / `Language:` 라벨과 네이티브 `select[data-language-select]`를 사용한다. 선택지는 **한국어 / English**이며, 처음에는 시스템 언어에 맞는 항목을 자동으로 선택한다. 별도의 System 항목은 표시하지 않는다. 높이 44px, 기본 글자 14px / 20px(푸터 안에서는 12px / 16px), 투명 배경, hover accent 색상과 2px 포커스 외곽선을 사용한다. 네이티브 선택 목록으로 키보드·터치 조작을 제공하며 선택 컨트롤 자체를 번역 과정에서 교체하지 않는다.

1. 저장한 `ko` / `en` 설정이 있으면 우선 적용한다. 선택은 사이트 출처별 `localStorage`의 `portfolio.language`에 저장한다.
2. 저장한 설정이 없으면 `navigator.languages`의 순서대로 지원 언어(`ko`, `en`)를 찾는다. `ko-KR`, `en-US` 같은 지역 코드는 기본 언어로 해석하며 목록이 없으면 `navigator.language`를 사용한다. 둘 다 지원하지 않는 경우 영어를 표시한다.
3. 자동으로 감지한 언어는 저장하지 않는다. 저장한 선택이 없는 동안에는 브라우저의 `languagechange`도 반영한다. 직접 선택하면 그 값을 저장하고 시스템 언어가 바뀌어도 유지한다.
4. 페이지 이동·새로고침과 방문 재개 시 저장한 설정을 읽는다. 뒤로가기 캐시 복원은 `pageshow`, 같은 출처의 다른 탭 변경은 `storage` 이벤트로 반영한다. 저장이 차단된 환경에서도 현재 페이지의 언어 변경은 작동한다.

`html[lang]`과 모든 드롭다운은 실제 표시 언어(`ko` / `en`)로 일치한다. 자동 감지한 영어도 드롭다운에는 `English`로 표시한다. `data-language-preference`는 내부적으로 자동 감지(`system`)와 명시적 선택(`ko` / `en`)을 구분한다. 공통 `js/i18n.js`를 사용하며, 한국어 전용 이력서 본문을 자동 번역하지는 않는다.

```html
<label class="language-switcher">
  <span>Language:</span>
  <select class="language-select" data-language-select aria-label="Language">
    <option value="ko" lang="ko">한국어</option>
    <option value="en" lang="en">English</option>
  </select>
</label>
```

### 버튼 — Kind · Theme · Style

[Buttons 비교표와 복사 코드](../component-library.html#buttons)는 공통 `.btn`을 사용한다. **Text only + Outline**이 기본이며 테마는 페이지의 시스템 설정을 상속한다.

| 축 | 값 | 구현 |
|---|---|---|
| Kind | Text only (기본) | `.btn` + 텍스트 |
| Kind | Icon with text | `.btn` + Google 아이콘 span + 텍스트 span |
| Kind | Icon only | `.btn.btn--icon` + 아이콘, 목적을 나타내는 `aria-label` 필수 |
| Theme | Light / Dark | 페이지 상속. 명시적 선택은 버튼·부모의 `data-theme="light|dark"` |
| Style | Outline (기본) | `.btn`: 기본 버튼 배경·텍스트 + 1px 테두리 |
| Style | Filled | `.btn.btn--filled`: 기본 버튼 배경·텍스트, 보이는 테두리 없음 |
| Style | Ghost | `.btn.btn--ghost`: 투명 배경·테두리 + 기본 텍스트 |

모든 종류에서 최소 높이 44px, 반경 6px, 글자 14px / 줄높이 20px / weight 500을 사용한다. 아이콘 전용 버튼은 기본 44×44px이며, `.icon-group` 안에서는 32×44px로 좁힌다. 나머지는 10px 16px 패딩과 8px 내부 간격을 사용한다. 아이콘은 `icon-sm`으로 20px / weight 300을 유지한다. 긴 레이블은 줄바꿈하여 버튼 높이를 늘릴 수 있다. 아이콘과 번역할 텍스트는 별도 span으로 둔다.

| 버튼 색상 토큰 | Light | Dark | 용도 |
|---|---|---|---|
| `--c-button-bg` | `#F5F5F7` | `#202026` | Outline·Filled 기본 배경 (surface와 동일) |
| `--c-button-text` | `#28282D` | `#D2D2D7` | 모든 스타일의 글자 (body와 동일) |
| `--c-button-border` | `#8C8C91` | `#787880` | Outline 경계 |
| `--c-button-hover` | `#EBEBEF` | `#2C2C34` | Outline·Filled의 hover 배경 |
| `--c-button-active` | `#E1E1E6` | `#373741` | 누르는 동안·선택된 토글 배경 |

`:hover`에서 Outline·Filled는 배경을 강조하고, Ghost는 배경·테두리를 바꾸지 않고 텍스트와 아이콘 색상만 `accent`로 바꾼다. 아이콘은 글자색을 상속하므로 세 가지 Kind 모두 같은 규칙을 따른다. `:active`는 더 진한 배경과 테두리로 구분하되 Filled는 눌림·선택 상태에서도 테두리를 투명하게 유지한다. `:focus-visible`은 모든 스타일에서 2px accent 외곽선과 3px 간격을 제공한다. 상태는 크기·정렬을 바꾸지 않는다. 토글은 실제 상태를 `aria-pressed`로 제공한다. 비활성은 네이티브 `disabled`를 사용하며 opacity 0.4와 not-allowed 커서를 적용하고 hover·클릭·키보드 활성화를 막는다. `aria-disabled`만 붙이는 것으로 대체하지 않는다.

```html
<button type="button" class="btn">Button</button>
<button type="button" class="btn btn--filled">Button</button>
<button type="button" class="btn btn--ghost">
  <span class="material-symbols-outlined icon-sm" aria-hidden="true">download</span>
  <span data-ko="다운로드">Download</span>
</button>
<button type="button" class="btn btn--icon" aria-label="메뉴 열기">
  <span class="material-symbols-outlined icon-sm" aria-hidden="true">menu</span>
</button>
```

실제 동작은 `button`, 다른 위치로 이동하는 링크는 `a`, 펼치기는 네이티브 `details` / `summary`를 사용한다. 라이브러리의 비교 버튼은 선택한 조합을 상태 메시지로 알려주는 데모다. 모든 직접 구현한 버튼은 `.btn`을 사용하며 개별 버튼의 색상·패딩·글자 크기를 따로 지정하지 않는다. 뷰어는 어두운 배경과 일치하도록 `data-theme="dark"` 범위를 명시한다.

| 사용 위치 | 공통 클래스 |
|---|---|
| 모바일 메뉴·목차, 이력서·소셜 아이콘 링크 | `btn btn--ghost btn--icon` |
| 테마 선택 | `btn btn--ghost` |
| 언어 설정 | `language-select` 네이티브 드롭다운 |
| 코드 복사·이미지 원본 크기 | `btn` (Outline) |
| 뷰어·이전 모달 닫기 | `btn btn--ghost` |
| 이전 비밀번호 폼·확인 모달 | `btn btn--filled` |
| 문서의 펼치기 summary | `btn btn--ghost btn--disclosure` |

`.btn--disclosure`는 가로 전체 너비·왼쪽 정렬만 담당하는 배치 규칙이다. 메뉴 표시 여부·모달 너비 등 배치는 별도로 지정하되 기본 44px 조작 영역과 공통 상태 스타일을 유지한다. 아이콘만 모은 `.icon-group`은 가로 32px · 세로 44px 예외를 사용한다. 본문 텍스트 링크·프로젝트 카드와 브라우저 기본 영상 컨트롤은 각각의 네이티브 패턴을 유지한다.

### 툴팁 — 짧은 보조 라벨

[Tooltips 예시·복사 코드](../component-library.html#tooltips)는 실제 공통 CSS의 `[data-tip]::after`를 사용한다. 트리거인 버튼·링크에 `data-tip`을 넣으면 텍스트로 표시되며 HTML을 해석하지 않는다. 별도 툴팁 JavaScript는 없다.

#### 시각 규격 · 현재 구현

| 항목 | 규칙 |
|---|---|
| 배치 | 트리거 아래, 가로 중앙 정렬. `top: 100%`, `left: 50%`, `translateX(-50%)`, 아래 간격 6px |
| 글자 | 11px (`0.6875rem`, 루트 16px 기준). 글꼴·굵기·행간은 트리거 상속. 공통 `.btn`에서는 500 / 20px |
| 크기 | 상하 3px·좌우 8px 패딩. 한 줄 내용만큼 너비가 늘어남. `.btn`의 20px 행간에서는 높이 26px |
| 색상 | 글자 `--c-body`, 배경 `--c-surface`. 라이트 `#28282D` / `#F5F5F7`, 다크 `#D2D2D7` / `#202026`. 가장 가까운 테마 상속 |
| 모양 | 모서리 4px. 테두리·그림자·말풍선 화살표 없음 |
| 표시 | 트리거 `:hover` 또는 `:focus-visible`이면 opacity 1, 둘 다 아니면 0. 별도 표시 지연·자동 닫힘 시간 없음 |
| 전환 | opacity 100ms, 기본 ease. reduced-motion에서는 0ms |
| 조작·레이어 | 절대 위치라 주변 레이아웃을 밀지 않음. `pointer-events: none`, 별도 z-index 없음. 툴팁 자체는 클릭·포커스 대상이 아님 |

#### 사용·문구 규칙

- 아이콘 전용 동작·목적지의 짧은 이름에 사용한다. `Resume`, `GitHub`, `Email`처럼 대상이나 동작을 명확히 쓴다. 「여기를 클릭」처럼 목적을 설명하지 않는 문구는 피한다. 보이는 버튼 이름이 충분하면 같은 말을 툴팁으로 반복하지 않는다.
- 한 줄의 짧은 명사·동사구로 작성한다. 오류, 비활성 이유, 필수 안내, 긴 설명, 링크·버튼·이미지는 툴팁에 넣지 않는다. 이런 내용은 보이는 본문이나 별도 도움말에 둔다.
- 트리거는 네이티브 `button` 또는 `a`를 사용하고 아이콘 전용은 기본 44×44px, `.icon-group` 안에서는 32×44px 조작 영역을 사용한다. 장식 아이콘에는 `aria-hidden="true"`, 트리거에는 목적을 나타내는 `aria-label`을 제공한다. 접근 가능한 이름에 툴팁의 라벨을 포함하고, 새 탭 등 필요한 맥락을 덧붙인다. `data-tip`만으로 접근 가능한 이름을 제공했다고 간주하지 않는다.
- 같은 요소에 `title`을 함께 넣어 브라우저 기본 툴팁과 중복 표시하지 않는다. `disabled` 버튼은 키보드로 접근할 수 없으므로 설명을 툴팁에 의존하지 않는다.
- 터치 화면에서는 hover 표시를 전제로 하지 않는다. 탭은 원래 버튼·링크 동작을 실행한다. 툴팁을 읽기 위한 첫 탭을 요구하거나 중요한 정보를 툴팁에만 두지 않는다.
- `data-tip`과 `aria-label`은 현재 언어 스크립트가 자동 번역하지 않는다. 브랜드 이름 등 공통 라벨을 사용하고, 번역이 필요한 라벨은 두 속성의 언어를 함께 관리한다. 트리거 전체에 `data-ko`를 붙여 아이콘·버튼 구조를 교체하지 않는다.

#### 배치·동작의 한계

현재는 아래쪽 배치만 지원하며, 최대 너비·줄바꿈·화면 경계 감지·자동 위쪽 전환·portal이 없다. 화면 끝이나 `overflow: hidden/auto` 조상 안에서는 잘릴 수 있으므로 짧은 라벨과 충분한 여백을 확보하고 실제 화면에서 확인한다. 높은 z-index만으로 조상의 잘림을 해결할 수는 없다.

표시는 트리거의 hover·키보드 포커스에만 연결된다. Escape 닫기, 툴팁 위로 포인터를 이동했을 때의 유지, 독립된 `role="tooltip"` 요소와 `aria-describedby` 연결은 구현되어 있지 않다. 설명형 툴팁이 필요한 경우 이 CSS 라벨을 그대로 확장하지 말고 해당 동작을 갖춘 컴포넌트를 구현하거나 설명을 화면에 직접 표시한다.

```html
<!-- 저장소 루트 기준. 상세 페이지는 ../ 경로 사용.
     공통 preview-modal CSS/JS → resume-viewer CSS/JS 순서로 포함. article_person,close,download 폰트 필요. -->
<a href="resume-viewer.html" data-resume-viewer
   class="btn btn--ghost btn--icon"
   aria-label="Resume" data-tip="Resume">
  <span class="material-symbols-outlined icon-sm" aria-hidden="true">article_person</span>
</a>
```

확인 기준: Tab으로 진입하면 라벨과 포커스 외곽선이 함께 보이고, 다음 요소로 이동하면 hover가 없는 라벨은 사라진다. 라이트·다크 색상, 390px·데스크톱에서의 잘림, 원래 링크·버튼 동작을 확인한다. 툴팁이 없어도 동작 목적을 이해할 수 있어야 한다.

### 아이콘 — Material Symbols, weight 300

일반 UI 아이콘은 [Google Fonts의 Material Symbols](https://fonts.google.com/icons)에서 선택한다. **기본 weight는 300**이다. 패밀리는 **Material Symbols Outlined**, `FILL=0`, `GRAD=0`으로 통일한다. 실제 모양과 복사 코드는 [Icons 예시](../component-library.html#icons)에서 확인한다.

| 상황 | 클래스 | 크기 / Optical size | Weight |
|---|---|---|---|
| 독립 아이콘 예시 | `material-symbols-outlined` | 24px / 24 | 300 |
| 버튼·텍스트 옆 아이콘 | `material-symbols-outlined icon-sm` | 20px / 20 | 300 |

색상은 주변 글자색을 상속한다. 아이콘만 있는 버튼·링크의 조작 영역은 아이콘 크기와 별개로 기본 44×44px, `.icon-group` 안에서는 32×44px로 확보하고, 목적을 나타내는 `aria-label`을 제공한다. 장식 아이콘에는 `aria-hidden="true"`를 붙인다. 아이콘 이름은 번역하지 않으며 아이콘 span을 `data-ko` 텍스트 요소 밖에 둔다.

아이콘 폰트는 사용하는 페이지의 head에서 로드하고, 그 뒤에 공통 `css/style.css`를 로드한다. Google Fonts 요청에도 **`wght=300`을 명시**하고 `icon_names`는 실제 사용하는 이름만 알파벳순으로 나열한다. 아래 예시는 `download`, `menu`, `open_in_new`만 로드한다.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..24,300,0,0&amp;icon_names=download,menu,open_in_new&amp;display=block">

<a href="../assets/resume.pdf" download="Younsoo-Lim-Resume.pdf"
   class="inline-flex items-center gap-2 text-accent hover:underline">
  <span class="material-symbols-outlined icon-sm" aria-hidden="true">download</span>
  <span data-ko="이력서 PDF 다운로드">Download resume PDF</span>
</a>
```

공통 CSS가 `font-weight: 300` 및 `font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24`를 적용한다. `icon-sm`은 크기와 `opsz`를 20으로 변경한다. 일반 문구의 굵기를 바꾸더라도 아이콘 weight는 300을 유지한다. 요청 URL에 지정하지 않은 아이콘은 표시되지 않을 수 있으므로 새 아이콘을 추가할 때 목록도 갱신한다. 한글/영문 폰트나 기존 SVG에 `font-weight: 300`만 지정하는 것으로 대체하지 않는다.

홈·상세·내부 문서·템플릿·이미지 뷰어의 일반 UI 아이콘에 적용한다. **SNS·브랜드 아이콘은 예외**이며 GitHub·LinkedIn의 실제 SVG 로고를 사용한다. `code`·`work` 같은 일반 기호로 서비스를 대신하지 않는다. 서비스 이름은 `aria-label`과 `data-tip` 또는 보이는 텍스트로 명시한다. 이전/다음 링크는 `arrow_back` / `arrow_forward`, 새 탭 표시는 `open_in_new`를 쓴다. 본문 안의 수치·파이프라인 화살표는 문장 일부다.

아이콘만 있는 링크에는 `.btn.btn--ghost.btn--icon`을 사용한다. 기본 44×44px(아이콘 그룹은 32×44px) flex 컨테이너 안에 아이콘을 중앙 정렬하므로 텍스트 baseline 차이로 높이가 어긋나지 않는다. 본문에서 텍스트와 함께 쓰는 링크는 `.icon-label`로 중앙 정렬하고 8px 간격을 둔다.

일반 UI용 SVG도 같은 Google Outlined / weight 300 / Fill 0 / Grade 0 원본을 사용한다. `assets/icons/`에 공식 20px 원본과 라이선스를 보관하며 [출처·변환 규칙](../assets/icons/README.md)을 따른다. 이력서의 좁은 연락처 행은 이 원본을 13px로 축소해 HTML과 PDF에 함께 반영한다. 다운로드 커서는 같은 원본에 흰 원형 배경을 더한 24px SVG/PNG다. details 화살표는 `chevron_right.svg` CSS mask로 표시한다.

이미지 뷰어를 사용하는 페이지의 `icon_names`에는 스크립트에서 표시하는 `close,zoom_in,zoom_out`도 포함한다. 모바일 메뉴가 있으면 `menu,close`를 포함한다. 아이콘을 추가할 때 정적 HTML뿐 아니라 스크립트로 표시하는 상태도 확인한다.

### SNS 아이콘 — 브랜드 SVG

`assets/brands/github.svg`와 `linkedin.svg`의 실제 로고를 사용하며 [출처·관리 규칙](../assets/brands/README.md)을 기록한다. `.brand-icon`의 레이아웃 상자는 20×20px이며, 실제 SVG mask는 16×16px 안에 비율을 유지해 중앙 표시한다. 면이 많은 브랜드 로고를 작게 표시해 내부 여백이 있는 Google Outlined 아이콘과 시각적 크기를 맞춘다. `.btn.btn--ghost.btn--icon`의 클릭 영역은 기본 44×44px, `.icon-group` 안에서는 32×44px이며 중앙 정렬을 유지하고 일반 아이콘과 baseline을 섞어 정렬하지 않는다.

브랜드 로고는 `color: inherit`과 `background: currentColor`로 버튼 색상을 따른다. Ghost 버튼을 hover하면 Google 아이콘과 동일한 `--c-accent` 파란색으로 바뀌며 opacity는 1을 유지한다. 배경·테두리는 Ghost 규칙을 따른다. Google 아이콘의 weight 300 규칙은 로고에 적용하지 않는다. 이력서 연락처 행은 같은 SVG 경로를 13px로 사용하고 PDF에도 반영한다.

아이콘끼리 모인 행은 `.icon-group`으로 묶는다. 각 `.btn--icon`은 가로 32px · 세로 44px, 추가 gap은 0이며 클릭 영역을 겹치지 않는다. 소셜·툴팁 그룹 예시에 적용한다. 홈 푸터는 텍스트 링크를 사용한다. 실제 아이콘 크기는 Google 20px 상자 / SNS 16px 도형을 유지한다. 단독 아이콘·메뉴는 기본 44×44px를 사용한다. 미리보기 모달 상단은 32×32px 조작 영역과 18px 아이콘을 사용한다.

```html
<a href="https://github.com/tomlim2" target="_blank" rel="noopener"
   class="btn btn--ghost btn--icon" aria-label="GitHub" data-tip="GitHub">
  <span class="brand-icon brand-icon--github" aria-hidden="true"></span>
</a>
```

LinkedIn은 `brand-icon--linkedin`을 사용한다. SVG 파일 경로는 공통 CSS에서 관리하므로 페이지 위치에 따라 마크업 경로를 바꿀 필요가 없다.

### 커서 — 링크 · 동작 · 다운로드

[Links & Cursors 예시](../component-library.html#links-cursors)에서 실제 요소 위에 포인터를 올려 확인한다. 버튼처럼 보이는지보다 **클릭 결과**로 커서를 선택한다.

| 의미 | 대상 | 커서 |
|---|---|---|
| 이동 | 내부·외부 페이지, 앵커, 프로젝트 카드, SNS, mailto 등 `a[href]` | 브라우저 기본 손 모양 `pointer` |
| 동작 | 버튼, summary, 메뉴, 언어 전환, 모달 열기·닫기, 이미지 뷰어의 도구 버튼 | 브라우저 기본 손 모양 `pointer` |
| 이미지 미리보기 열기 | 본문의 `a[data-image-viewer]` | 브라우저 기본 손 모양 `pointer` |
| 이미지 확대 | 미리보기 안에서 원본보다 작게 표시된 래스터 이미지 또는 화면 맞춤 SVG | 브라우저 기본 `zoom-in` |
| 확대 불필요 | 화면 맞춤 상태에서 이미 원본 크기인 래스터 이미지 | 기본 화살표 `default` · 확대 버튼 숨김 |
| 이미지 축소 | 래스터 원본 크기 또는 SVG 150% 상태의 `.image-viewer.is-zoomed .image-viewer-image` | 브라우저 기본 `zoom-out` |
| 다운로드 자료 | `a[download]` 또는 `a[data-cursor="download"]` · 이력서 PDF 등 | Google `download` 모양 커서 |
| 이력서 미리보기 다운로드 | `.resume-toolbar-download[download]` · 모달과 독립 읽기 화면 | 브라우저 기본 손 모양 `pointer` |
| 비활성 | `.btn:disabled` | 기존 `not-allowed` |

다운로드 커서는 24×24px, 흰 원형 배경 안에 20×20px 아이콘을 x=2·y=2로 중앙 배치한다. **hotspot은 `12 12`**, 즉 포인터의 실제 클릭 좌표와 이미지 중심이 일치한다. 이미지 로드 실패 시 기본 손 모양으로 돌아간다. 일반 링크·동작은 커스텀 이미지 없이 기본 손 모양을 사용한다. 버튼의 화면상 아이콘도 44px 영역 중앙에 배치하지만, 이 정렬과 마우스 커서의 hotspot은 별개다.

실제 파일 저장을 요청하는 링크에는 `download`를 사용하며 다운로드 커서가 자동 적용된다. 이력서 미리보기를 여는 링크와 미리보기 상단의 PDF 다운로드 버튼은 모두 기본 손 모양을 쓴다. `.resume-toolbar-download[download]`는 다운로드 커서의 예외이며 독립 읽기 화면에도 동일하게 적용한다. `data-cursor="download"`는 실제 저장 동작에 대한 명시적 스타일 표시이며 그 자체로 파일을 저장하지 않는다. 파일명·확장자나 `target="_blank"`만으로 동작을 추측하지 않는다.

일반 동작은 네이티브 `button`을 사용한다. 링크가 JS 동작을 수행하는 예외는 `data-cursor="action"`을 지정할 수 있다. 본문의 이미지 미리보기 링크는 기본 손 모양 `pointer`를 사용한다. 줌 커서는 미리보기 안에서만 사용하며, 원본보다 작게 표시된 래스터 이미지와 화면 맞춤 SVG는 `zoom-in`, 확대한 이미지는 `zoom-out`을 사용한다. 래스터 이미지가 화면 맞춤 상태에서 이미 원본 크기라면 확대 버튼을 숨기고 이미지 클릭 확대를 막으며 기본 화살표를 사용한다. 스크립트가 없으면 원본 이미지로 이동하는 링크로 동작한다. 확대·축소에는 브라우저 기본 커서를 사용하며 별도 이미지 에셋을 쓰지 않는다. 링크·메일·자물쇠·손 흔들기 전용 이미지 커서는 현재 UI에서 사용하지 않는다.

```html
<a href="projects/shotloom.html">Shotloom</a>
<button type="button" class="btn">Open menu</button>
<a href="resume-viewer.html" data-resume-viewer>View resume</a>
<a href="assets/resume.pdf" download="Younsoo-Lim-Resume.pdf">Download PDF</a>
```

이 커서 규칙은 hover 가능한 포인터를 위한 보조 표시다. 터치·키보드에서도 이름·포커스·원래 동작으로 기능을 이해할 수 있어야 한다.

출처: [공식 Material Symbols 가이드](https://developers.google.com/fonts/docs/material_symbols). `display=block`과 사용하는 이름만 요청하는 방법도 이 가이드를 따른다.

### 이력서 — 열기와 다운로드 분리

홈의 Resume 링크에 `data-resume-viewer`를 붙이면 현재 페이지의 네이티브 `dialog`로 열린다. `css/preview-modal.css` · `js/preview-modal.js`를 먼저 포함한 뒤 `css/resume-viewer.css` · `js/resume-viewer.js`를 포함하고 Google Fonts `icon_names`에 `article_person,close,download`를 추가한다. 일반 손 모양 커서를 사용하며, JavaScript 미지원 또는 수정 키 클릭 시 `href="resume-viewer.html"`의 독립 읽기 화면을 사용할 수 있다.

상단은 **왼쪽 PDF 파일명(Younsoo-Lim-Resume.pdf) · 오른쪽 다운로드 / 닫기 아이콘**이다. 파일명 열은 `minmax(0, 1fr)`로 남는 공간을 채우고 왼쪽 정렬한다. 액션 묶음은 `auto` 너비로 오른쪽 정렬하며, 닫기를 항상 마지막에 둔다. 제목은 다운로드 링크의 `download` 속성에서 읽고 언어와 관계없이 같은 파일명을 표시한다. 직접 열기용 `resume-viewer.html`에도 같은 파일명을 유지한다. 닫기는 `button`, 다운로드는 `a[download]`이며 둘 다 `.btn.btn--ghost.btn--icon`을 사용한다. Google 아이콘은 weight 300, 접근 가능한 이름과 짧은 툴팁을 제공한다. 툴바 끝의 툴팁은 가장자리 안쪽으로 정렬해 잘림을 방지한다. 다운로드는 `download="Younsoo-Lim-Resume.pdf"`로 원본 PDF를 저장하며 기본 손 모양 커서를 사용한다.

이력서 모달은 데스크톱·모바일 모두 브라우저 화면 가로·세로의 80% 크기로 중앙에 배치한다. `width: 80%`, `height: 80dvh`, `margin: auto`를 사용하며 테두리·모서리 반경은 없다. 기존 `resume.html`을 이름 있는 iframe으로 표시하고 문서만 스크롤해 툴바를 계속 유지한다. 모달이 열리면 배경은 조작·스크롤할 수 없고 닫기 버튼에 포커스가 놓인다. Tab/Shift+Tab은 상단 버튼과 문서의 연락처 링크 사이에서 순환한다. 닫기 버튼·바깥 배경 클릭·Esc로 종료하며, iframe 안에서도 Esc를 지원한다. 닫을 때 열었던 링크로 포커스를 돌려주고 원래 페이지의 스크롤 위치를 유지한다. 독립 읽기 화면의 닫기 링크는 홈으로 이동한다.

브라우저의 PDF 플러그인에 의존하지 않으며, 모바일에서는 HTML 이력서가 화면 폭에 맞춰 재배치된다. 화면용 반응형 규칙은 `@media screen`에만 적용해 인쇄 레이아웃을 유지한다. 읽기 화면 UI의 라이트·다크 테마와 관계없이 문서의 흰 바탕과 PDF 원본의 인쇄 색상은 유지한다. 이력서 내용의 원본은 `resume.html`, 다운로드 파일은 `assets/resume.pdf`이며 읽기 화면은 내용을 복제하지 않는다.

## 7. 이미지·영상·확대 뷰어

### 모든 미리보기는 모달

**이미지·이력서·문서·영상 등 콘텐츠를 따로 열어 살펴보는 미리보기는 모두 현재 페이지의 공통 모달을 사용한다.** 새로운 미리보기 전용 페이지나 새 탭을 기본 동작으로 만들지 않는다. 실제 예시는 [Preview Modals](../component-library.html#preview-modals)에서 확인한다.

- **공통 틀:** `css/preview-modal.css`와 `js/preview-modal.js`의 `PreviewModal.create()`를 사용한다. 유형별 파일에는 콘텐츠·확대·저장·재생만 구현하며, 닫기·배경·포커스 규칙을 복제하지 않는다.
- **상단:** 콘텐츠 이름은 왼쪽, 액션 묶음은 오른쪽 정렬한다. DOM 순서도 제목 → 콘텐츠 액션 → 닫기이며 닫기는 항상 맨 오른쪽이다. 제목 열은 `minmax(0, 1fr)`, 액션 열은 `auto`, 버튼 사이 간격은 4px이다. 이미지 액션은 래스터 원본 크기 ↔ 화면 맞춤 또는 SVG 150% ↔ 화면 맞춤이며, 이력서는 PDF 다운로드다. 별도 액션이 없으면 오른쪽에 닫기만 둔다.
- **상단 크기:** 기본 높이 41px(버튼 32px + 상하 여백 각 4px + 하단 경계 1px). 제목 13px / 행간 20px / weight 500. 좌우 여백은 데스크톱 12px, 모바일 8px이며 안전 영역은 별도로 반영한다. 이미지·이력서와 직접 열기용 이력서 화면에 같은 크기를 적용한다.
- **버튼:** `btn btn--ghost btn--icon`, 상단에서만 32×32px 조작 영역과 18px 아이콘, Google Outlined weight 300. 항상 `aria-label`을 제공하며 짧은 `data-tip`은 보조 라벨이다. 뒤로가기 아이콘이나 Close 텍스트 버튼을 사용하지 않는다.
- **크기·테마:** 데스크톱·모바일 모두 화면 가로·세로의 80% 크기로 중앙 정렬한다. 너비 80%, 높이 80dvh, margin auto. 테두리·반경 0, 바깥 배경은 검정 65%. 상단 툴바는 안전 영역을 고려한다. 프레임은 페이지 테마를 따르고 원본 미디어 색상은 바꾸지 않는다.
- **읽기:** 상단을 유지하고 내용 영역만 스크롤한다. 긴 제목은 한 줄 말줄임으로 표시하되 전체 이름은 DOM과 접근 가능한 이름에 남긴다. 이미지 미리보기에는 하단 캡션을 표시하지 않는다. 설명은 본문의 캡션과 이미지 대체텍스트에 유지한다.
- **닫기:** 닫기 버튼·Esc·모달 바깥 배경 클릭. 이미지나 내부 여백 클릭으로 닫지 않는다. 열 때 닫기 버튼에 포커스를 두고 Tab/Shift+Tab을 모달 내부에서 순환시킨다. 배경 조작·스크롤을 잠그며 닫으면 원래 트리거와 읽던 위치로 돌아온다.
- **상태:** 다시 열면 이미지 확대와 문서 스크롤은 초기 상태로 시작한다. 닫을 때 미디어 소스를 정리한다. 향후 영상 모달은 재생도 중지해야 한다. 모달을 중첩해 열지 않는다.
- **경로:** `a[href]`의 원본·독립 읽기 경로는 JavaScript 미지원, 직접 URL 접근, 사용자가 수정 키로 새 탭을 요청한 경우의 폴백이다. 기본 클릭은 모달을 연다. 실제 파일 저장은 모달의 `download` 링크로 분리한다.

현재 구현 유형은 이미지와 이력서다. 본문 안에서 직접 재생하는 영상, 프로젝트 상세 페이지 이동, 외부 서비스 링크는 각각 본문 콘텐츠와 탐색 동작이다. 여기에 별도의 ‘미리보기/크게 보기’를 추가할 때에는 이 공통 모달 안에 유형별 콘텐츠를 구현한다. 외부 서비스 전체를 임의로 iframe에 넣지 않는다. 향후 영상·외부 iframe은 미디어 조작 및 키보드 이벤트를 별도로 검증한다. 현재 모달의 iframe 포커스 처리는 같은 출처의 이력서 문서를 대상으로 한다.

```html
<!-- projects/ 기준. 공통 틀을 유형별 뷰어보다 먼저 로드한다. -->
<link rel="stylesheet" href="../css/preview-modal.css">
<link rel="stylesheet" href="../css/image-viewer.css">
<script src="../js/preview-modal.js"></script>
<script src="../js/image-viewer.js"></script>
<!-- head의 Material Symbols icon_names: close,zoom_in,zoom_out -->
```


### 정적 이미지

홈 썸네일은 크롭할 수 있지만 상세의 UI 캡처·노드 그래프·비교 이미지는 `w-full h-auto`로 원본 비율을 유지한다. 캡션에는 무엇을 보여주는지, 실제 캡처인지 개념도인지, 필요한 경우 시점과 비교 조건을 적는다.

비교는 두 개의 `figure`를 `grid grid-cols-1 md:grid-cols-2 gap-6`로 감싸고 각각에 캡션을 둔다. Before/After의 구도와 표시 범위를 맞추되 의미 있는 내용은 크롭하지 않는다. 글자가 작아지면 데스크톱에서도 세로 배치를 유지하고 확대 뷰어를 제공한다. 캡션은 「개선 후」만 쓰기보다 「동일 입력·동일 설정 / 달라진 처리 / 관찰되는 차이」를 설명한다.

**새 페이지 기준:** 가능하면 실제 `width`/`height`를 넣고 아래쪽 이미지는 `loading="lazy" decoding="async"`를 사용한다. 대표 이미지는 `decoding="async"`와 필요 시 `fetchpriority="high"`를 사용한다. 기존 모든 이미지에 이 최적화가 적용된 상태는 아니다.

```html
<figure class="mb-10">
  <a href="../assets/images/project-slug/detail.png" data-image-viewer class="block" aria-label="View full-size screenshot">
    <img src="../assets/images/project-slug/detail.png" alt="화면의 핵심 정보를 설명" class="w-full h-auto" loading="lazy" decoding="async">
  </a>
  <figcaption class="text-xs text-muted mt-2 text-center" data-ko="실제 개발 화면 · 촬영 시점과 맥락">Development screenshot · Date and context</figcaption>
</figure>
```

이미지 미리보기는 공통 모달 CSS/JS 뒤에 `css/image-viewer.css`와 `js/image-viewer.js`를 포함한다. 본문 이미지를 누르면 확대하지 않은 미리보기를 연다. 화면 맞춤은 상단 툴바를 제외한 공간에서 이미지 비율을 유지하며 자르지 않는다. 오른쪽 아이콘과 이미지 클릭으로 확대/화면 맞춤을 전환한다. 이미지의 마우스 클릭·터치는 누른 지점을 기준으로 확대하고, 확대 후에도 그 부분이 같은 화면 위치에 오도록 스크롤을 맞춘다. 이미지 가장자리에서는 가능한 스크롤 범위로 제한한다. 툴바 버튼·키보드 조작은 이미지 중앙을 기준으로 확대하며, 축소하면 전체 이미지가 보이는 화면 맞춤으로 돌아간다.

- **래스터 이미지(PNG·JPEG·WebP·GIF 등):** 큰 이미지만 축소하고 작은 이미지는 원본 크기로 표시한다. 화면 맞춤 배율은 `min(1, 가용 너비/원본 너비, 가용 높이/원본 높이)`이며, 확대해도 `naturalWidth`·`naturalHeight`의 100%를 넘지 않는다. 원본이 모달 안에 들어가면 확대 버튼과 이미지 클릭 확대를 비활성화하고 기본 화살표 커서를 사용한다.
- **SVG:** 원본 크기 제한 없이 비율을 유지해 미리보기 영역에 최대한 맞춘다. 화면 맞춤 배율은 `min(가용 너비/원본 너비, 가용 높이/원본 높이)`이며, 확대 시 이 표시 크기의 150%를 사용한다. SVG는 항상 확대 기능을 제공하고 버튼 이름은 「150% 확대 / Zoom to 150%」다. 확대 후에는 「화면에 맞춤 / Fit to screen」으로 돌아간다. SVG 확장자는 URL의 경로에서 판단해 쿼리·해시가 있어도 동작하며, SVG data URL도 지원한다.

이미지 로드·뷰어 크기 변경 때 다시 계산한다. 확대 배율의 기준에는 스크롤바를 제외하기 전의 전체 이미지 영역을 사용한다. 창 크기를 바꿔도 선택한 확대/화면 맞춤 모드를 유지하며, 미리보기를 새로 열면 확대 상태를 초기화한다. 확대된 내용은 필요하면 스크롤한다. 본문 커서는 `pointer`, 미리보기 안에서 확대 가능 시 `zoom-in`, 확대 상태는 `zoom-out`이다. 제목은 현재 언어의 `data-preview-title-ko`, `data-preview-title`, 이미지 `alt` 순으로 정한다. 상세 설명은 `alt`와 본문의 캡션에 유지하며 미리보기 안에는 캡션을 복제하지 않는다. `data-image-viewer`는 정적 이미지·GIF에 사용하며 영상에는 영상 전용 콘텐츠 구현이 필요하다.

### 영상

새로 옮기는 설명 영상은 `controls playsinline preload="metadata"`를 기본으로 하고 필요하면 포스터를 제공한다. 짧은 장식 루프만 목적을 확인해 `autoplay loop muted playsinline`을 사용한다. 기존 TA 페이지에는 자동재생 루프도 있으므로 본문 영상 전체를 자동재생하는 규칙으로 해석하지 않는다.

볼 동작과 필요한 타임스탬프를 캡션이나 본문으로 적는다. 파일 제공이 필요하면 `download` 링크로 저장하게 한다. 별도 확대·미리보기는 공통 모달에 영상 콘텐츠를 구현하며, 원본 영상으로 이동하는 링크를 미리보기 버튼으로 사용하지 않는다. 음성에 중요한 설명이 있다면 자막이나 동등한 텍스트 설명을 함께 제공한다.

디자인 홈의 Vimeo 데모릴은 본문에 직접 재생하는 외부 iframe의 현재 사례다. 플레이어 코드와 캡션은 [홈 히어로 예시](../component-library.html#home-heroes), 원본과 재생 확인 범위는 [이식 기록](design-portfolio-migration.md)에 기록한다.

외부 iframe에는 설명적인 `title`, 반응형 비율, 원본을 여는 링크를 둔다. 이미지의 확대 뷰어로 동영상을 감싸지 않는다. 미디어 실패 시에도 제목·설명·대체 링크로 내용을 파악할 수 있게 한다.

## 8. 동작·접근성·현재 한계

- 페이지당 `h1` 하나, 섹션은 `h2`, 하위 항목은 `h3`로 구성한다. 장식 크기를 위해 제목 단계를 바꾸지 않는다.
- 클릭 동작은 `button`, 이동은 `a`로 구현한다. 키보드 포커스 표시를 제거하지 않는다.
- 현재 CSS는 reduced-motion에서 smooth scroll과 CSS 전환/애니메이션을 줄인다. JS 효과·자동재생 영상까지 일괄 정지하는 것은 아니다.
- 이미지 뷰어에는 키보드 조작과 포커스 복귀가 구현되어 있다. 사이트 전체 접근성 검증을 완료했다는 의미는 아니다.
- 모바일 메뉴는 `aria-expanded`를 동기화하고 툴팁은 키보드 포커스에도 표시한다. 버튼은 공통 `:focus-visible`과 네이티브 `disabled`를 사용한다. 전체 색상 조합의 대비는 실제 배경과 함께 점검한다.
- 색상 토큰과 Tailwind 설정은 공통 CSS와 페이지별 설정에 걸쳐 있다. 타이포·간격을 모두 자동 동기화하는 디자인 토큰 빌드는 없다.

## 9. 작업 후 확인

1. 공통 규칙을 바꿨다면 이 문서와 [Component Library](../component-library.html)를 함께 갱신한다.
2. 신규 페이지·에셋을 `site-public.json`에 추가하고 `python3 scripts/build_site.py`를 실행한다.
3. 390px / 데스크톱에서 긴 제목·캡션·표·이미지 비율을 확인한다.
4. 시스템 언어에 맞는 초기 선택, 한국어/English 전환·설정 유지, 모바일 메뉴, 이미지 확대·Escape·포커스 복귀, 영상 조작을 확인한다.
5. 새 프로젝트의 설명·홈 카드·이력서·근거 기록이 일치하는지 확인한다. 이력서를 수정한 경우 PDF도 갱신한다.

컴포넌트 문서와 템플릿은 `site-public.json`에서 제외되어 일반 `_site/` 미리보기에는 없다. 내부 예시를 볼 때만 저장소 루트에서 실행한다.

컴포넌트 문서는 768px 이상에서 오른쪽 고정 목차를 제공한다. 작은 화면에서는 오른쪽 상단에 Material Symbols weight 300 메뉴 아이콘 하나만 표시한다. 아이콘을 누르면 섹션 목록이 떠서 이동할 위치를 고를 수 있고, 열린 상태에서는 같은 위치의 닫기 아이콘 하나로 바뀐다. 항목을 선택하면 앵커로 이동하고 목록이 닫힌다. 바깥 영역 클릭·Escape로도 닫히며 Escape는 메뉴 아이콘으로 포커스를 돌린다. 목차 안에서는 현재 섹션을 강조한다. URL의 `#cards`, `#media` 같은 앵커로 직접 연결할 수 있고, 「맨 위로」로 문서 시작에 돌아온다. 이 목차는 내부 문서에만 적용된다.

### 문서 자체를 수정한 경우

- 문서 전용 스타일·동작은 `docs/component-library.css`와 `docs/component-library.js`에 둔다. 공개 번들에 복사되는 `css/`, `js/`에 내부 UI를 추가하지 않는다.
- 색상 HEX와 타이포의 CSS 정보는 화면에서 읽지만, 패턴 설명·복사 코드·Markdown 표는 수동 관리다. 예시 마크업을 바꾸면 같은 섹션의 코드와 설명도 검토한다.
- 새 섹션은 고유 ID를 부여하고 오른쪽 목차에 문서 순서대로 추가한다. 코드 안의 예시 ID·URL은 실행되는 페이지 요소와 구분한다.
- 390px·768px·데스크톱에서 목차 이동, 코드 펼치기·복사, 표·코드 내부 스크롤을 확인한다. 클립보드가 제한되면 코드를 선택하고 수동 복사를 안내하는지 확인한다.
- 한·영 및 라이트·다크 전환 후 팔레트와 글꼴 설명이 현재 예시와 일치하는지 확인한다. 접힌 다크 팔레트는 항상 다크 값이어야 한다.
- 아이콘 링크에는 접근 가능한 이름, 장식 아이콘에는 `aria-hidden="true"`를 둔다. 코드·목차를 포함해 키보드 포커스가 보여야 한다.
- 공개 빌드 검사는 내부 문서를 대상으로 하지 않는다. 내부 파일의 경로·앵커·중복 ID를 별도로 확인하고, `_site/`에 문서 전용 파일이 포함되지 않았는지도 확인한다.

```sh
python3 -m http.server 8781 --bind 127.0.0.1
# http://127.0.0.1:8781/component-library.html
# http://127.0.0.1:8781/projects/_template.html
```

루트 서버는 로컬 문서 확인용이다. 공개 배포는 README의 `_site/` 빌드 절차를 따른다.
