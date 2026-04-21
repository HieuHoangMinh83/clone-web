---
name: company-intro-ui
description: Conventions cho repo d:\company-intro (website corporate VN — xây dựng/cơ điện/công nghiệp/BĐS). Trigger mọi task UI/JSX/CSS trong repo này — thiết kế/sửa/fix/responsive/animation/fullpage. (Rule chrome-devtools nằm ở CLAUDE.md + skill chrome-devtools-viewport — không lặp ở đây.)
---

# Company Intro UI — Conventions

## Fullpage mode

Pattern `.fullpage` có hai mode:
- `.fullpage--slide` — landscape (desktop): transform translateY theo section index.
- `.fullpage--scroll` — portrait (mobile/tablet): static, stack scroll thường.

Detect qua `matchMedia('(orientation: landscape)')`; hook dùng chung `src/components/intro/useFullpageScroll.js` (flag `enabled` để tắt listener ở scroll mode).

Mỗi section phải có class `.section` để khớp selector global: `.fullpage--scroll > .section { height: auto !important; min-height: 50vh }`.

## CSS rules

1. **Selector luôn scope theo class component** — file CSS colocated (`Xxx/Xxx.css`) phải chứa class riêng component trong mọi selector.
   - ❌ `.fullpage--scroll > .news-sec.section { ... }` — leak sang sibling.
   - ✅ `.fullpage--scroll > .news-featured.news-sec.section { ... }`.

2. **Không duplicate CSS component vào page CSS** — mỗi component style chỉ sống trong file colocated. Duplicate âm thầm override file gốc, khó truy bug.

3. **Scroll animation dùng `@keyframes … both`, không `transition + delay`** — trong fullpage scroll, section re-enter nhiều lần; transition không replay, keyframe có.

4. **Carousel gap CSS phải khớp JS GAP constant** — `IntroHistory`, `ProjectsMilestones` tính translateX bằng hằng `GAP` trong JS. Đổi CSS gap không sync → track lệch.

5. **Card trong 100vh fullpage KHÔNG dùng `aspect-ratio`** — parent height cố định làm card media collapse về 0. Dùng `grid-template-rows: minmax(0, 1fr) auto` trên card.

6. **Bento grid cho portfolio** — tránh 3-col đối xứng. Pattern: `big(7×2) + 2 small stacked → mirror → 3 thirds`.

## Page structure — file organization

### Nguyên tắc
1. **Page file = orchestrator** — chỉ imports/hooks/routing/render composition. KHÔNG viết CSS page-level lớn.
2. **Mỗi section = 1 component folder** — `components/<domain>/.../<Component>/{Component.jsx, Component.css}`. CSS chứa base + responsive của chính nó.
3. **Shared CSS ở component cha** — `<domain>-shared.css` tại `components/<domain>/.../`, không nằm trong page folder.
4. **Data file ở domain root** — `components/<domain>/<domain>Data.js`.
5. **Helper components** dùng 1 chỗ → inline trong .jsx đó. Dùng nhiều chỗ → tách `components/<domain>/<Shared>/`.
6. **Responsive theo component** — mỗi `@media` đặt trong file CSS của component nó target, không centralize.

### Layout

**1 page/domain** (flat):
```
pages/<domain>/<PageName>/<PageName>.jsx
components/<domain>/
├── <domain>-shared.css
├── <domain>Data.js
└── <Section>/{.jsx, .css}
```

**Nhiều page/domain** (group theo page):
```
pages/<domain>/<PageA>/<PageA>.jsx
components/<domain>/
├── <domain>Data.js        (shared cả domain)
└── <PageA>/
    ├── <pagea>-shared.css
    └── <Section>/{.jsx, .css}
```

### Import depth

Component ở `components/<domain>/<PageName>/<Section>/` (depth 4 từ src):
```jsx
import X from '../../../external'          // src/shared/...
import A from '../../../../assets/...'     // src/assets/
import data from '../../<domain>Data.js'
import '../<pagename>-shared.css'
import './<Section>.css'
```

### Refactor signals

Thấy 1 trong các signal sau → refactor TRƯỚC khi thêm feature:
- Page folder có CSS > 300 dòng.
- 1 file CSS chứa > 2 namespace (`.abc-banner.*` + `.abc-why.*` + `.abc-grid.*`).
- Page JSX > 400 dòng có nhiều helper tự define.
- Nhiều page cùng domain xếp ngang cấp ở `pages/` — gom vào `pages/<domain>/`.
- Đang viết `.xxx-banner__*` trong page CSS — sai, move sang component.
