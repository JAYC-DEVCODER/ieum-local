---
name: 남도루트 (NAMDO ROUTE)   # 옛 이름 "이음로컬 / IEUM LOCAL"
logo: dist/assets/logo.png     # 정자 + 물길 + 갈대 심볼 + 붓글씨 "NAMDO ROUTE" (흰색판 logo-white.png)
source: https://jayc-devcoder.github.io/ieum-local/
analyzed: 2026-11-02
stack: 정적 HTML + CSS + 바닐라 JS (빌드 없음, GitHub Pages)
colors:
  teal: "#087E76"        # 브랜드 주색 — 버튼, 키커, 강조
  teal-hover: "#07665F"  # solid-button hover (floating-start는 #09685F — 하나로 통일 권장)
  deep: "#153F3B"        # 짙은 청록 — 텍스트 링크, 선택 상태, 마무리 섹션 배경
  ink: "#202F2C"         # 본문 글자
  muted: "#65716D"       # 보조 글자
  mist: "#F2F6F4"        # 옅은 면(카드, 샘플 박스, 닫기 버튼)
  mist-strong: "#EAF2EF" # 오디오 패널 배경
  line: "#DDE5E0"        # 구분선
  border: "#BBC9C1"      # 입력·선택지 테두리
  sand: "#B3986B"        # 정의만 되어 있고 미사용
  focus: "#D09C44"       # 포커스 링(토큰 미등록 — 등록 권장)
typography:
  sans: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
  serif: '"Nanum Myeongjo", "Batang", "Songti SC", Georgia, serif'
  body: { size: 15px, line-height: 1.65, word-break: keep-all }
  h1: { family: serif, size: "clamp(58px, 5.7vw, 86px)", weight: 500, letter-spacing: -0.06em, line-height: 1.32 }
  h2: { family: serif, size: 34px, weight: 500, letter-spacing: -1.5px, line-height: 1.6 }
  h3-card: { family: serif, size: 25px, weight: 500, letter-spacing: -1px }
  card-title: { family: sans, size: 20px, weight: 600, letter-spacing: -0.5px }
  kicker: { family: sans, size: 13px, weight: 600, color: teal }
  small: { size: 11-13px, color: muted }
radius:
  pill: 30-40px          # 버튼
  card: "22px 22px 70px 22px"   # 오른쪽 아래만 크게 — 시그니처 모양
  panel: "30px 100px 30px 30px" # 오른쪽 위만 크게
  hero: "0 0 160px 0"    # 히어로 이미지 오른쪽 아래
  closing: "100px 0 0 0" # 마무리 섹션 왼쪽 위
  dialog: 24px
  input: 10px
layout:
  container: "min(1280px, 100% - 112px)"
  breakpoints: [1600px, 1100px, 760px, 360px]
  section-gap: 105-126px (데스크톱) / 60-96px (모바일)
---

# 남도루트 디자인 시스템

> 서비스 이름은 **남도루트**다(옛 이름 "이음로컬"). 2026-11-02에 사이트 표기와 로고를 바꿨다.

순천·광양의 자연과 생활문화를 외국인 여행자에게 "그들의 언어와 이해 수준에 맞춰" 들려주는 로컬 오디오 여행 서비스의 첫 화면 시안이다. 아래 내용은 공개 사이트의 HTML·CSS·JS를 직접 읽어 정리했다.

## 1. 분위기와 원칙

- **조용하고 느린 여행.** 갯벌의 물빛을 닮은 청록(teal)과 아주 옅은 안개색(mist)만으로 화면을 구성한다. 채도 높은 색, 그림자 많은 카드, 아이콘 남발을 피한다.
- **명조 제목 + 고딕 본문.** 제목·인용구는 명조 계열(Nanum Myeongjo → Batang)로 문학적 톤을, 본문·UI는 시스템 고딕으로 읽기 쉽게 쓴다.
- **한쪽만 크게 굽은 모서리.** 카드·패널·히어로가 모두 한 모서리만 크게(70~160px) 둥글다. 물길이 휘어 흐르는 느낌을 주는 이 사이트의 시그니처다. 새 요소도 이 규칙을 따른다.
- **↗ 화살표.** 모든 행동 유도 버튼·링크 끝에 `↗`(장식, `aria-hidden`)를 붙인다. 아래 이동만 `↓`.
- **정직한 상태 표시.** 아직 없는 기능(예약·결제·정식 해설)은 "준비 중", "확정되지 않았다"고 명확히 쓴다. 과장된 마케팅 문구를 쓰지 않는다.

## 2. 색

| 토큰 | 값 | 쓰임 |
|---|---|---|
| `--teal` | `#087E76` | 주 버튼, 떠 있는 원형 버튼, 섹션 키커, 파형, `theme-color` |
| `--deep` | `#153F3B` | 텍스트 링크, 선택된 라디오, 모바일 메뉴, 마무리 섹션 배경 |
| `--ink` | `#202F2C` | 본문 |
| `--muted` | `#65716D` | 설명·캡션·보조 문장 |
| `--mist` | `#F2F6F4` | 스토리 카드, 샘플 박스, 안내 박스, 닫기 버튼 |
| (하드코딩) | `#EAF2EF` | 오디오 패널 배경 |
| `--line` | `#DDE5E0` | 아코디언·티켓 구분선 |
| (하드코딩) | `#BBC9C1` | select·라디오 테두리 |
| (하드코딩) | `#D09C44` | 포커스 링 (3px, offset 5px) |
| `--sand` | `#B3986B` | 정의만 있고 미사용 — 보조 강조색 후보 |

- 히어로 위 글자는 흰색. 이미지 위에는 `linear-gradient(180deg, #081f2a80 → #06171988)` 어둠막을 깐다.
- 다이얼로그 배경막: `#0a2829a6` + `blur(5px)`.
- 그림자는 청록 기운이 섞인 아주 옅은 값만 쓴다(`0 18px 60px #214d3b18`, `0 8px 26px #123b3426`).

## 3. 글자

- 본문 15px / 줄간 1.65 / `word-break: keep-all`(한국어 어절 단위 줄바꿈 필수).
- 제목 계층: H1 58~86px(clamp) → H2 34px(모바일 29px) → 카드 제목 20px → 키커 13px → 캡션 11~12px.
- 제목에는 음수 자간(-0.06em, -1.5px)을 준다. `text-wrap: balance` 적용.
- 줄바꿈은 `<br>`로 직접 다듬는다. 넓은 화면에서만 필요한 줄바꿈은 `<br class="wide-only">`(760px 이하에서 숨김).
- ⚠ Nanum Myeongjo 웹폰트를 불러오지 않는다. 대부분 기기에서 Batang/Georgia로 떨어지므로, 명조를 확실히 보이려면 Google Fonts 등으로 불러와야 한다.

## 4. 간격과 레이아웃

- 컨테이너 `.section-wrap`: `min(1280px, 100% - 112px)` → 1100px 이하 `100% - 72px` → 760px 이하 `100% - 40px`.
- 섹션 위아래 여백은 넉넉하게(데스크톱 105~126px, 모바일 60~96px).
- 2단 그리드(소개·가이드: `1.15fr 1fr`, `1fr 1.1fr`, 간격 70px), 3단 카드 그리드(간격 28px). 760px 이하에서 모두 1단.

## 5. 컴포넌트

| 컴포넌트 | 클래스 | 핵심 스타일 |
|---|---|---|
| 헤더 | `.header` | 히어로 위에 absolute로 겹침, 높이 106px(모바일 84px), 흰 글자, 아래 반투명 선 |
| 브랜드 | `.brand` | `logo-white.png` 이미지, 높이 44px(760px 이하 34px, 360px 이하 30px) (9장 참고) |
| 히어로 | `.hero` | 화면 높이(최대 900px), 사진 + 어둠막, 가운데 정렬 카피, 오른쪽 아래 160px 곡선 |
| 떠 있는 시작 버튼 | `.floating-start` | 150px 청록 원, 히어로 경계에 반쯤 걸침(bottom -54px), 헤드폰 아이콘 |
| 외곽선 버튼 | `.outline-button` | 흰 1px 테두리 pill, 높이 55px, hover 시 흰 배경 + deep 글자 |
| 채운 버튼 | `.solid-button` | teal pill, 높이 50px, hover `#07665F` |
| 텍스트 링크 | `.text-link` | deep 13px 굵게, 아래 1px 선, 끝에 ↗ |
| 섹션 키커 | `.section-kicker` | teal 13px, H2 위 한 줄 |
| 여행 카드 | `.journey-card` | `<button>`, 사진 높이 275px, 왼쪽 위 태그 칩, 오른쪽 아래 흰 원형 ↗, hover 시 사진 1.04배 |
| 스토리 카드 | `.story-card` | mist 배경, 선 그림 SVG, 명조 H3 |
| 오디오 패널 | `.audio-panel` | `#EAF2EF` 배경, 왼쪽 문구 + 오른쪽 6° 기운 "오디오 티켓" 일러스트와 동심원 |
| 아코디언 | `.guide-items details` | 네이티브 `<details>`, 열리면 ＋가 45° 회전 |
| 마무리 띠 | `.closing` | deep 배경, 왼쪽 위 100px 곡선, 명조 27px 문장 |
| 다이얼로그 | `dialog` | 네이티브 `<dialog>`, 최대 540px, 반경 24px, 바깥 클릭으로 닫힘 |
| 친숙도 선택 | `.level-option` | 라디오를 숨기고 3칸 세그먼트로 표시, 선택 시 deep 배경 |

## 6. 상호작용

- **맞춤 해설 다이얼로그**: `[data-start]` 버튼 어디서나 열림. 언어(en/ja/zh/ko) × 한국 문화 친숙도(처음/조금/익숙) = 12개 예시 문장. 브라우저 `speechSynthesis`로 읽어 주며(속도 0.9), 지원하지 않으면 텍스트로 안내.
- **테마 다이얼로그**: `[data-theme="nature|culture|humanities"]` 카드에서 열림. "맞춤 해설 체험하기"로 오디오 다이얼로그에 이어짐.
- **모바일 메뉴**: `aria-expanded` 토글, Esc·링크 클릭 시 닫힘.
- 움직임은 사진 확대(0.35s)와 부드러운 스크롤뿐. `prefers-reduced-motion`이면 모두 끔.

## 7. 접근성 기준 (현재 지켜지고 있는 것)

- 본문 바로가기 링크, `lang="ko"`, 예시 문장마다 `lang` 전환.
- 모든 포커스 가능한 요소에 3px 금색 포커스 링.
- 장식 아이콘·화살표는 `aria-hidden="true"`, 상태 문구는 `role="status"`.
- 이미지에 구체적인 대체 텍스트와 `width`/`height`, 첫 화면 이미지는 `preload` + `fetchpriority="high"`, 나머지는 `loading="lazy"`.

## 8. 발견한 불일치 (정리 후보)

1. ~~서비스 이름이 섞여 있다~~ → 2026-11-02 남도루트로 통일함.
2. hover 색이 `#09685F`(떠 있는 버튼)와 `#07665F`(채운 버튼) 두 가지다.
3. `#EAF2EF`, `#BBC9C1`, `#D09C44`, `#DCE8E1` 등이 토큰 없이 하드코딩되어 있다.
4. `--sand`는 정의만 있고 쓰이지 않는다.
5. `.hero-shade` 그라디언트가 파일 끝에서 한 번 더 덮어써진다.
6. `.story-card h3`, `.closing p` 글꼴 목록에 Nanum Myeongjo가 빠져 있어 제목 글꼴 목록과 다르다.
7. 명조 웹폰트를 불러오지 않는다(3장 참고).

## 9. 로고 (NAMDO ROUTE)

새 로고는 가로형이다.

- **심볼(왼쪽)**: 처마가 휘어 올라간 한옥 정자, 그 아래에서 S자로 굽이쳐 흐르는 물길, 오른쪽에 솟은 갈대 두세 줄기. 모두 청록 한 색의 면으로 그렸다. 순천만(물길·갈대)과 남도의 옛 건축(정자)을 한데 묶은 그림이다.
- **글자(오른쪽)**: 붓으로 쓴 듯한 굵은 대문자 `NAMDO ROUTE`. 거의 검정에 가까운 짙은 청록이다.
- **색**(원본에서 측정): 심볼 `#016E80` — 사이트 `--teal`(#087E76)보다 푸르다. 글자 `#193032` — `--ink`(#202F2C)에 가깝다.
- **어울림**: 물길 곡선은 사이트의 "한쪽만 크게 굽은 모서리" 규칙과 같은 성격이다. 다만 붓글씨 글자는 기존의 조용한 명조·고딕 톤보다 힘이 세다. 그러니 로고 글자체를 제목이나 본문에 퍼뜨리지 말고 로고 안에서만 쓴다.

### 쓰는 법

| 자리 | 배경 | 필요한 판 |
|---|---|---|
| 헤더(히어로 사진 위) | 어두운 사진 | **흰색 단색 판** — 원본(청록·짙은 글자)은 사진 위에서 안 보인다 |
| 마무리 띠 `.closing` | `--deep` | 흰색 단색 판 |
| 푸터 | 흰색 | 원본 그대로 |
| 다이얼로그 상단 | 흰색 | 작은 크기라면 심볼만 쓰거나 "남도루트" 글자 유지 |
| 파비콘·앱 아이콘 | — | 심볼만 잘라 정사각형으로 |

- 원본은 투명 배경 PNG(2179×722)다. 지금은 높이 160px로 줄인 PNG를 쓴다. 더 선명하게 하려면 SVG로 다시 그린다.
- 헤더 높이 106px(모바일 84px) 안에서 로고 높이는 40~48px(모바일 32~36px)를 권한다. 가로가 길어 모바일에서는 메뉴 버튼과 부딪히지 않는지 확인한다.
- 최소 여백: 심볼 정자 지붕 높이만큼 사방을 비운다.
- `<img>`에는 `alt="남도루트"`를 넣고, 링크의 `aria-label`도 "남도루트 홈"으로 바꾼다.
