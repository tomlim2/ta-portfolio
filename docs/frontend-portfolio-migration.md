# 프론트엔드 포트폴리오 이식

2026-09-26 사용자 요청으로 열린 Notion의 프론트엔드 포트폴리오를 기존 TA·디자이너 포트폴리오 형식으로 이식했다. 이 문서는 로컬 작업 상태이며 배포를 뜻하지 않는다.

- 원본: https://younsoo.notion.site/05f1a0048db546ad877bfd645fc181b0
- 홈: `frontend/index.html`
- 공통 CSS·내비게이션·카드·About·언어 선택·푸터·이력서/이미지 미리보기를 재사용한다.
- 홈 히어로는 TA와 같은 직무 제목·짧은 소개·이메일/이력서 행이다. 별도의 데모릴은 추가하지 않았다.
- 프로젝트 순서는 Notion 원본의 Cork NFT → Winterest → LIKE → Junkyard다.

| 프로젝트 | 경로 | 원본에서 확인한 범위 |
|---|---|---|
| Cork NFT | `projects/cork-nft.html` | Phase 1, 4주·4인 개발, Firebase 회원 관리·검색·상세·갤러리 컴포넌트, 클라이언트 쇼케이스 배포 |
| Winterest | `projects/winterest.html` | 2주·프론트 3인/백엔드 2인, 무한 스크롤·스켈레톤·핀 저장·다크 모드·AWS S3 프론트 배포 |
| LIKE | `projects/like.html` | 2주·프론트 3인/백엔드 2인, Nike 경험 재현 팀 프로젝트, 내비게이션·상품 옵션·리뷰·장바구니·주문 API 연결 |
| Junkyard | `projects/junkyard.html` | 기존 디자인 상세와 데모를 공유하고, Notion에 있던 구현 설명을 보완 |

Cork NFT의 배포는 당시 클라이언트 쇼케이스 단계로 설명한다. NFT 거래 인프라나 정식 출시 성과로 확대하지 않는다. Winterest·LIKE는 팀 프로젝트이며 플랫폼 고객사 작업으로 표현하지 않는다. 원본에 없는 정확한 연도, 성능·사업 지표는 추가하지 않는다.

## 미디어

원본 페이지에서 이미지와 GIF를 내려받아 실제 응답 형식인 WebP로 확장자를 맞췄다. 총 34개이며 14개 동작 캡처의 애니메이션을 보존한다. 상세 이미지와 동작 캡처는 데스크톱·모바일 모두 본문 너비의 1열로 배치하며, 이미지 사이 간격은 32px로 맞춘다. 원본 비율과 치수·lazy loading·공통 이미지 미리보기를 유지한다. 출처·치수·프레임 수는 [미디어 목록](frontend-assets.json)에 기록했다. 이미지와 GIF는 로컬에 보관하며 Notion 프록시에 의존하지 않는다.

외부 YouTube iframe은 로컬 인앱 브라우저에서 빈 화면으로 나타나므로, 본문 동작 캡처와 원본 영상 링크를 제공한다.

- Winterest 영상: https://www.youtube.com/watch?v=RJuzyevZDn4
- LIKE 영상: https://www.youtube.com/watch?v=RPRh9mO4mkc
- GitHub: https://github.com/tomlim2/project-winterest · https://github.com/tomlim2/project-LIKE
- Junkyard는 기존 로컬 미디어·데모를 재사용한다. 상단 디자인 내비게이션과 푸터의 프론트엔드 전환 링크를 유지하며, 본문 하단에는 별도 목록 복귀 링크를 두지 않는다.

## 외부 연결

데모·YouTube 시연·GitHub 저장소는 해당 주제 제목 바로 옆의 `link_2` 아이콘으로 연결한다. 별도 텍스트 버튼은 두지 않고 공통 ghost 아이콘 버튼·툴팁·접근 가능한 이름을 사용한다. 링크의 기존 목적지와 새 탭 동작은 유지한다.

## 포트폴리오 전환

모든 기존 메인·상세 푸터에 프론트엔드 링크를 추가했다. 프론트엔드 홈·상세는 TA와 디자이너 포트폴리오로 돌아간다. 기존 푸터의 크기·정렬·언어 버튼·이력서 동작은 공통 규칙을 따른다. 새 홈·상세·이미지는 `site-public.json`에 등록한다.

## 검증

- 릴리즈 대상 파일만 복사한 뒤 `python3 scripts/build_site.py` 실행: 35개 HTML 페이지와 내부 참조 1,051개 통과, 공개 파일 470개.
- 390px 모바일 홈·Winterest·LIKE, 1280px 데스크톱 홈·LIKE에서 가로 넘침 없음.
- 공통 모바일 메뉴, 한국어/English 전환과 페이지 이동 후 선택 유지, 이력서 미리보기 확인.
- Cork NFT 이미지 키보드 열기, 원본 1280px 확대 상한, Esc 닫기와 트리거 포커스 복귀 확인.
- 외부 영상은 원본 YouTube 링크로 제공하며 현재 재생 완료 여부는 검증하지 않았다.
