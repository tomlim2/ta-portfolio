# TA 포트폴리오 맵

이 문서는 포트폴리오를 수정할 때 **어떤 경험을 보여주려는지, 어디를 수정하고 어떤 근거를 확인해야 하는지** 찾기 위한 안내다. 상세 설명은 각 페이지와 원기록에 둔다.

내용 기준: 2026-09-16. Shotloom 사례 공개 기록은 [v1.1.0](releases/v1.1.0.md)에 있다. 현재 배포 버전은 [GitHub Releases](https://github.com/tomlim2/ta-portfolio/releases)에서 확인한다.

## 포트폴리오의 중심

**시각적 표현을 위한 기술을 탐색·검증하고, 창작자가 활용하는 도구와 제작 파이프라인으로 구현하는 테크니컬 아티스트.**

실시간 그래픽스 · 캐릭터 애니메이션 · 제작 도구를 중심으로, 다음 연결이 읽히도록 구성한다.

제작 문제 → 기술 탐색·직접 검증 → 적용 여부 판단 → 도구·제품 기능 구현 → 결과 확인·협업

새 기술이나 지원 포맷의 목록에 더해, 선택한 이유와 실제 제작에 연결한 과정을 적는다. VRM·PMX 같은 포맷은 그 과정을 보여주는 사례다.

## 시작할 파일

| 알아보려는 것 | 위치 |
|---|---|
| 첫인상, 프로젝트 카드, 소개·경력 | [index.html](index.html) |
| 채용용 경력 요약 | [resume.html](resume.html) · [다운로드 PDF](assets/resume.pdf) |
| 프로젝트별 문제·판단·구현·결과 | 아래 프로젝트 맵 |
| 개발·배포 방법 | [README.md](README.md) |
| 작업 시 지켜야 할 저장소 규칙 | [CLAUDE.md](CLAUDE.md) |
| 공개 사이트에 포함되는 파일 | [site-public.json](site-public.json) |
| 대화에서 확인한 사실과 조사 근거 | 로컬 전용 `tools/career-notes/README.md` |

## 프로젝트가 보여주는 역량

아래는 현재 페이지 내용을 바탕으로 정리한 각 사례의 역할이다. 성과 수치와 세부 조건은 해당 페이지·근거 기록에서 확인한다.

| 프로젝트 | 중심 메시지 | 연결해서 읽을 사례 |
|---|---|---|
| [Shotloom](projects/shotloom.html) | 기본 3D 작업 흐름, 자사 서비스, 사용 경험을 연결한 에디터 설계·구현 | Character System: 제작자용 도구 / Live UE Scene Bridge: 생성 서비스 연동 |
| [NPR Shading & Look Development](projects/npr-shader.html) | 셰이딩 기술을 탐색하고 조명·연출 의도에 맞춰 캐릭터 룩을 조정 | Matcap Painter: 룩 제작 도구 / UE5 Profiling: 시각적 결과와 성능 판단 |
| [Character System](projects/character-system.html) | 아트팀의 캐릭터 제작·프리셋 작성과 런타임 로딩을 연결 | NPR: 캐릭터 룩 / PMX to VRM: 외부 자산 유입 |
| [UE5 Profiling](projects/profiling.html) | GPU 병목을 진단하고 변경별 프레임 시간과 시각적 결과를 비교 | NPR: 표현 품질과 조명 조건 |
| [PMX to VRM Pipeline](projects/pmx-to-vrm.html) | 외부 캐릭터 자산을 기존 제작 파이프라인에 연결하고 변환 문제를 해결 | Character System: 런타임 활용 / MMD Player: 원본 검증 |
| [Matcap Painter](projects/matcap-painter.html) | 편집값을 바꾸면서 3D 결과를 즉시 확인하는 제작 도구 | NPR: 실제 텍스처 사용 목적 |
| [MMD Player](projects/mmd-player.html) | 원본 모델·모션 검증과 WebGPU 표현 실험 | PMX to VRM: 변환 전후 확인 |
| [Live UE Scene Bridge](projects/megamelange.html) | 자연어 씬 제어와 생성 서비스 연동을 구현·시연한 사내 R&D PoC | Shotloom: 영상 제작 흐름에 생성 기술 통합 |

위 관계는 설명을 함께 읽기 위한 연결이다. 프로젝트 사이의 코드 의존 관계를 뜻하지 않는다.

## Shotloom에서 유지할 구분

| 용어 | 이 포트폴리오에서의 의미 |
|---|---|
| Shotloom | 기본 3D 작업 흐름과 자사 서비스를 연결하는 웹 3D 에디터 |
| CINEV | 시나몬의 기존 AI 영상 생성 플로우. 도표의 이미지 입력·최종 영상 생성 영역 |
| SceneGen | 현재 도표가 설명하는 서비스 흐름. 2–4단계에 Shotloom 사용 |
| Shotloom 입력·출력 | 이미지 입력 → 장면·캐릭터·모션·카메라 편집 → 편집 결과를 반영한 씬 동영상 출력 |
| 다음 단계 | Shotloom의 씬 동영상을 CINEV의 영상 생성 단계로 전달 |

세 가지 설계 목표는 [설계 목표 섹션](projects/shotloom.html#design-goals)에 정리되어 있다.

1. 기본적인 3D 작업 플로우 보장. Blender와 수준을 비교하는 문구는 사용하지 않는다.
2. CINEV의 자사 3D 모션·에셋 서비스 연동.
3. 두 기반 위에서 손쉬운 작업 경험 제공.

담당 범위와 구현 상태는 다음처럼 유지한다.

- **본인:** 캐릭터·모션 리타게터, 에디터 프런트엔드·UX/UI, IK 제어 코어.
- **동료:** IK 코어 이후의 사용자 조작 UI. 생성 모델·백엔드는 팀의 다른 담당 영역.
- **Knitten:** 직접 사용자는 본인. 동료에게 이어진 가치는 구현 맥락·검증 기록·코드에 있다.
- **제품 상태:** 핵심 제작 흐름의 해피패스 구현·개발 서버 배포. 기본 편집 기능 보완과 대상 연출자 사용 검증은 남아 있었다.
- **사례 공개:** 포트폴리오 공개와 Shotloom 제품의 정식 출시를 구분한다.
- **이미지:** 현재 [흐름도](assets/images/shotloom/scenegen-flow-v2.png)는 ImageGen으로 만든 개념 설명이다. 실제 UI 캡처나 실제 생성 결과로 설명하지 않는다. 이전 PNG·SVG는 현재 홈 카드와 상세 페이지에서 사용하지 않는다.

## 수정할 때 함께 확인할 곳

| 변경 사항 | 연결된 수정·확인 위치 |
|---|---|
| 직무 정체성·핵심 소개 | `index.html` 소개와 경력, `resume.html` 요약, 다운로드 PDF |
| 프로젝트 이름·한 줄 소개 | 홈 카드, 해당 상세 페이지의 제목·소개, 다른 페이지에서 부르는 이름 |
| 역할·성과·수치 | 해당 상세 페이지, 관련 홈·이력서 설명, 로컬 근거 기록 |
| 이력서 | HTML 수정 후 PDF 재생성·내용과 레이아웃 확인 |
| 공통 스타일·언어 전환 | [css/style.css](css/style.css), [js/i18n.js](js/i18n.js), [js/main.js](js/main.js), [js/theme.js](js/theme.js) |
| Shotloom 썸네일·흐름도 | 홈 카드와 상세 페이지의 이미지 경로·설명, CINEV/Shotloom 영역 구분 |
| 새 공개 페이지·에셋 | `site-public.json`과 [빌드 검증](scripts/build_site.py) |
| 배포 | `releases/<tag>.md`, [릴리즈 워크플로](.github/workflows/release.yml), [릴리즈 노트 생성](scripts/release_notes.py) |

한글 `data-ko`와 영문 본문을 함께 수정한다. 생성된 `_site/`는 직접 편집하지 않는다. 자세한 빌드·검증·배포 절차는 README를 따른다. 사용자가 배포를 요청한 경우에만 릴리즈 태그를 푸시한다.

## 로컬 근거 기록 찾기

`tools/career-notes/`는 Git에서 제외된 로컬 기록이다. 공개 저장소를 새로 클론하면 들어 있지 않다. 회사 백업과 개인 노트의 상세 경로, PR 조사와 대화 기록은 이곳에서 찾는다.

| 확인할 내용 | 로컬 기록 파일 (`tools/career-notes/` 기준) |
|---|---|
| 전체 자료 조사·Shotloom 인터뷰 | `2026-09-14-15-shotloom-interview.md` |
| 리타게터 구조·근거 자료 위치 | `2026-09-15-retargeter-architecture-sources.md` |
| Knitten과 협업 범위 | `2026-09-15-knitten-review.md` |
| 전체 경력 원본에서 참조한 내용 | `2026-09-15-resume-master-review.md` |
| 이력서 반영 내용 | `2026-09-15-resume-applied.md` |
| SceneGen·CINEV·Shotloom 구분과 이미지 | `2026-09-16-scenegen-flow-image.md` |
| 세 가지 목표와 Blender 비교 삭제 | `2026-09-16-shotloom-design-priorities.md` |
| Shotloom 공개 결정·배포 확인 | `2026-09-16-shotloom-public-release.md` |

과거 기록의 ‘미공개’, ‘미적용’, 초기 문구는 당시 상태다. 같은 주제에 후속 정정이 있으면 최신 사용자 확인 내용과 실제 반영 파일을 함께 확인한다.

## 후속 보강 후보

아래는 제안이며 아직 실행·검증한 성과가 아니다. 새 수치를 채우기보다 기존 기록에서 다음 자료를 확보할 수 있는지 확인한다.

| 우선 확인할 자료 | 포트폴리오에서 설명할 판단 | 필요한 근거 |
|---|---|---|
| Shotloom 리타게팅 Before/After | 보정 방식 변경이 어떤 변형을 해결했는지 | 같은 캐릭터·모션·카메라 조건의 전후 영상 또는 캡처 |
| Shotloom 프리셋·스트립 편집 예시 | 기본 기능과 자사 서비스를 어떻게 손쉬운 작업으로 연결했는지 | 실제 편집 조작과 결과를 보여주는 짧은 데모 |
| NPR 조명 대응 사례 | 기술 적용 결과를 보고 표현 방식을 바꾼 이유 | 같은 장면에서 초기 룩·수정 룩을 비교할 자료 |

시간·성능·사용성 수치를 추가할 때는 대상, 비교 조건, 측정 방법을 함께 남긴다. 특히 Shotloom에는 정식 출시·사용자 도입·사용성 향상 수치를 임의로 붙이지 않는다.

## 맵을 갱신하는 때

새 프로젝트를 추가하거나, 역할·서비스 관계를 정정하거나, 대표 자료를 교체했을 때 관련 행을 갱신한다. 상세 인터뷰 전체를 이 파일에 복제하지 않는다.
