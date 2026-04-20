---
name: company-intro-ui
description: Rules + conventions cho mọi task thiết kế/code UI trong repo d:\company-intro (website giới thiệu công ty corporate VN — xây dựng, cơ điện, công nghiệp, bất động sản). Kích hoạt cho BẤT KỲ yêu cầu nào liên quan UI/UX/CSS/JSX trong repo này — không giới hạn từ khoá. Bao gồm thiết kế trang mới, sửa layout, responsive, animation, component mới, fix bug CSS, điều chỉnh fullpage slide/scroll. Trigger khi user dùng các động từ "thiết kế", "code", "build", "sửa", "fix", "làm", "chỉnh", "thêm", "bỏ", "đổi", "responsive", "tablet", "mobile", "desktop", hoặc nhắc tới bất kỳ file `.jsx`/`.css` nào trong `src/`.
---

# Company Intro UI — Working rules

## Browser / viewport (TUYỆT ĐỐI KHÔNG VI PHẠM — đọc trước mọi chrome-devtools tool call)

### 🚫 3 điều CẤM

1. **CẤM `take_screenshot` với `fullPage: true`** — dù user gõ "chụp full", "full page", "fullpage", "toàn trang", "chụp hết", "screenshot cả trang" → KHÔNG được set `fullPage: true`. Lý do: CDP `captureBeyondViewport` bypass DevTools responsive panel, đọc device metrics gốc → sai width. Thực tế: file `768×5544` từng bị báo "1440×900" — sai hoàn toàn, user catch được.

2. **CẤM `mcp__chrome-devtools__emulate`** — dù "chỉ gọi 1 lần để kiểm tra". Đã hứa rồi vi phạm nhiều lần. `emulate(0x0x0)` KHÔNG restore — set `isMobile:false, DPR:0, viewport rác`.

3. **CẤM `mcp__chrome-devtools__resize_page`** — không reliable với Windows 125% scaling + DPR.

### ✅ Tool được phép

- `mcp__chrome-devtools__take_screenshot` (chỉ viewport, KHÔNG fullPage)
- `mcp__chrome-devtools__evaluate_script` (đọc `innerWidth/innerHeight/devicePixelRatio/scrollHeight`, scroll bằng `window.scrollTo`)
- `mcp__chrome-devtools__navigate_page`, `take_snapshot`, `list_pages`, `select_page`

### 🔁 Flow bắt buộc khi user yêu cầu "chụp"

Dù user gõ gì ("chụp view", "chụp full", "screenshot", "chụp fullpage"):

```
Bước 1 — verify viewport:
  evaluate_script: () => ({
    w: innerWidth, h: innerHeight,
    dpr: devicePixelRatio,
    totalH: document.documentElement.scrollHeight
  })

Bước 2 — nếu innerWidth KHÔNG khớp size user nói họ setup:
  → STOP. Báo user. KHÔNG tự fix bằng emulate/resize.

Bước 3a — "chụp view/viewport hiện tại" (1 ảnh):
  take_screenshot (viewport, KHÔNG fullPage) → lưu.

Bước 3b — "chụp full/toàn trang/fullpage" → scroll-loop:
  mkdir -p folder user chỉ định
  for y = 0; y < totalH; y += innerHeight:
    evaluate_script: `() => { window.scrollTo(0, ${y}); return scrollY; }`
    take_screenshot (viewport, KHÔNG fullPage) → NN-scroll-${y}.png
  Báo user số ảnh + path.
```

### ⚠️ Nếu emulate-state cũ còn sót

Báo user, hỏi có muốn tự reset trong DevTools UI không. TUYỆT ĐỐI KHÔNG gọi `emulate` để "clear".

### Sanity check bắt buộc sau chụp

Ảnh lưu ra: `width !== innerWidth` → có vấn đề (có thể lỡ dùng fullPage hoặc emulate cũ còn sót). Dừng, báo user, không tiếp tục.

## Fullpage slide vs scroll

Project dùng pattern `.fullpage` với hai mode:
- `.fullpage--slide` — landscape (desktop), transform: translateY theo section index.
- `.fullpage--scroll` — portrait (mobile/tablet dọc), position: static, sections stack và body scroll thường.

Mỗi page detect orientation qua `matchMedia('(orientation: landscape)')` và đổi class. Hook dùng chung: `src/components/intro/useFullpageScroll.js` — nhận `enabled` flag để tắt listener khi ở scroll mode.

Mỗi section con phải có class `.section` để match selector `.fullpage--scroll > .section { height: auto !important; min-height: 50vh; }` (trong `src/styles/global.css`).

## CSS selector scoping (QUAN TRỌNG)

Trong file CSS colocated với component (`XxxYyy/XxxYyy.css`), **mọi rule phải chứa class riêng của component đó trong selector**. Không được dùng selector chỉ gồm class dùng chung:

- ❌ `.fullpage--scroll > .news-sec.section { ... }` — match mọi `.news-sec.section` cùng cha.
- ✅ `.fullpage--scroll > .news-featured.news-sec.section { ... }` — chỉ match NewsFeatured.

Lý do: các component news (Banner/Featured/Grid) cùng dùng base `.news-sec` + `.section`, rule từ file này sẽ leak sang file khác, gây bug khó truy (ví dụ: NewsFeatured khoá `max-height: 50vh` làm NewsGrid bị clip nội dung).

## CSS duplicate across files

Không copy CSS component vào page-level CSS. Mỗi component style chỉ sống trong file colocated của nó. Đã từng có `NewsPage.css` chứa 500 dòng `.news-featured__*` duplicate âm thầm override file gốc.

## Scroll animation

Animation kích hoạt khi section vào viewport phải dùng `@keyframes ... both` (không dùng `transition` + delay lớn). Trong fullpage scroll, section có thể re-enter nhiều lần; transition không replay, keyframe animation có.

## Carousel gap

IntroHistory và ProjectsMilestones dùng translateX với hằng `GAP` trong JS. Nếu đổi `gap` trong CSS phải sync với hằng JS — không thì track lệch.

## Card media in 100vh fullpage

Trong section 100vh, card dùng `aspect-ratio` sẽ collapse vì parent có chiều cao cố định. Dùng `grid-template-rows: minmax(0, 1fr) auto` trên card và bỏ `aspect-ratio`.

## Bento grid cho portfolio

Không dùng 3-col đối xứng cho gallery dự án. Pattern ưa thích: `big(7×2) + 2 small stacked → mirror → 3 thirds`.

## Page structure — cách tổ chức file khi tạo page mới

Mọi page mới đều PHẢI follow convention dưới đây. Không tạo file CSS to monolithic 1000+ dòng ở page folder.

### Quy tắc cốt lõi

1. **Page file = orchestrator only** — `src/pages/<domain>/<PageName>/<PageName>.jsx` chỉ chứa: imports, hooks, state/routing logic, render composition của các child components. KHÔNG viết CSS page-level lớn ở đây.

2. **Mỗi section = 1 component folder** — Mỗi section/khối lớn của page là 1 component riêng ở `src/components/<domain>/.../<Component>/` với cặp `{Component.jsx, Component.css}`. CSS của component chứa cả base + responsive của chính nó.

3. **Shared CSS ở folder component cha** — Base class (`.xxx-sec`, `.xxx-container`), shared keyframes, shared eyebrow/utility → 1 file `<domain>-shared.css` tại `components/<domain>/.../`. Không để shared CSS trong page folder.

4. **Data file ở domain root** — `components/<domain>/<domain>Data.js`, import qua relative path.

5. **Inline helper components** (ví dụ `Info`, `Block` bên trong JobDetailHero/Body) — giữ colocated trong cùng `.jsx` với chỗ dùng. KHÔNG tách thành file riêng nếu chỉ 1 chỗ xài.

### Decision tree: domain có mấy page?

**1 page trong domain** (flat):
```
pages/<domain>/<PageName>/<PageName>.jsx
components/<domain>/
├── <domain>-shared.css
├── <domain>Data.js
├── <Section1>/{Section1.jsx, Section1.css}
└── <Section2>/{Section2.jsx, Section2.css}
```

**Nhiều page trong domain** (group theo page):
```
pages/<domain>/
├── <PageA>/<PageA>.jsx
└── <PageB>/<PageB>.jsx

components/<domain>/
├── <domain>Data.js                    (shared cho cả 2 page)
├── <PageA>/
│   ├── <pagea>-shared.css
│   ├── <Section1>/{.jsx, .css}
│   └── <Section2>/{.jsx, .css}
└── <PageB>/
    ├── <pageb>-shared.css
    ├── <Section1>/{.jsx, .css}
    └── <Section2>/{.jsx, .css}
```

### Quy tắc chia section khi build page mới

1. Identify các khối visual lớn của page (banner, main content blocks, sidebar, CTA band, 404/empty state…).
2. Mỗi khối lớn → 1 component folder, namespace class riêng (`.abc-banner__*`, `.abc-why__*`…).
3. Nếu page có fallback state (404, empty, error) → tách riêng `<Page>Missing/` hoặc `<Page>Empty/`.
4. Helper components dùng trong nhiều section → tách ra `components/<domain>/<Shared>/…`. Nếu chỉ dùng 1 chỗ → giữ inline trong .jsx đó.
5. **Responsive rules đi cùng component** — mỗi `@media` rule đặt trong file CSS của component nó target. Không centralize responsive ở 1 file → fix bug responsive biết mở file nào ngay.

### Import convention

Component ở `components/<domain>/<PageName>/<Section>/<Section>.jsx` (depth 4 từ src):
```jsx
import something from '../../../external'           // src/shared/..., src/components/shared/...
import helper from '../../../../assets/...'          // src/assets/...
import data from '../../<domain>Data.js'            // components/<domain>/<domain>Data.js
import '../<pagename>-shared.css'                   // shared CSS của page group
import './<Section>.css'                             // own CSS
```

Page orchestrator ở `pages/<domain>/<PageName>/<PageName>.jsx`:
```jsx
import Section1 from '../../../components/<domain>/<PageName>/<Section1>/<Section1>.jsx'
import '../../../components/<domain>/<PageName>/<pagename>-shared.css'
```

### Khi nào tạo `<PageName>.css` ở page folder?

Hầu như không. Chỉ khi page có style CỰC KỲ đặc thù không thuộc bất kỳ section nào (hiếm). Default: page folder chỉ có `.jsx`. Nếu bắt đầu thấy mình viết `.xxx-banner__*` ở page CSS → đang sai, move sang component.

### Signal page đang "loạn" cần refactor

- Page folder có file CSS > 300 dòng.
- CSS file chứa rule cho > 2 namespace khác nhau (`.abc-banner.*` + `.abc-why.*` + `.abc-grid.*` trong cùng 1 file).
- Page JSX > 400 dòng với nhiều helper function tự định nghĩa.
- Nhiều page cùng domain xếp ngang cấp ở `pages/` (vd `RecruitPage` + `JobDetail`) → gom vào `pages/<domain>/`.

Khi thấy signal → refactor theo quy tắc trên TRƯỚC khi thêm feature mới.
