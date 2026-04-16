# Company Intro — Vite + React

Scaffold giai đoạn 1, khớp layout Figma `768w light` (breakpoint tablet).

## Chạy dự án

```bash
npm install
npm run dev
```

## Cấu trúc section (theo Figma)

| # | Component    | Figma node | Mô tả |
|---|--------------|------------|-------|
| — | `Header`     | Nav 1:882 + Header 1:890 | Fixed 60px navy + logo + hamburger + search |
| 1 | `Hero`       | 1:791 | Carousel 9 slide banner/giải thưởng (768×430) |
| 2 | `About`      | 1:801 | Intro `#E8F2FF` 2-col: text + CTA, 2 image tile dọc phải |
| 3 | `BrandAnchor`| 1:835 | Plate `#F5F5F5` với logo thương hiệu lớn centered |
| 4 | `Mission`    | 1:837 | Full-bleed gradient + glyph SVG + SỨ MỆNH |
| 5 | `Vision`     | 1:843 | Full-bleed gradient + glyph SVG + TẦM NHÌN |
| 6 | `Projects`   | 1:849 | Rail 4 card accordion: 1 wide + 3 narrow (hover expand) |
| — | `Footer`     | 1:876 | Full-bleed visual + logo + social + copyright |

## Tokens (Figma-aligned)

```
--navy-700   #245692   Primary (Nav, H2, CTA)
--blue-100   #e8f2ff   About bg
--gray-100   #f5f5f5   BrandAnchor bg
--gray-200   #cccccc   Hero fallback
--gold-500   #dda969   Logo wordmark
--teal-500   #1bcdd4   Logo mark
--ink-700    #333333   Body strong
--ink-500    #555555   Body default
```

Font: **Montserrat** (preloaded `index.html`).

## Mở rộng sau

- Thay placeholder gradient bằng ảnh thật: drop vào `public/` + set `background-image`.
- Section 4/5 hiện text render overlay — Figma baked text vào PNG; giữ text riêng dễ edit/i18n.
- Projects rail: grid `has(:is-active)` → expand card hover. Mobile thu gọn title về horizontal.
