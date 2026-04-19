# CLAUDE.md — d:\company-intro

File này được load vào context mọi session làm việc trên repo. Các rule dưới đây **TUYỆT ĐỐI KHÔNG VI PHẠM** dù user gõ lệnh trực tiếp kiểu "chụp full", "screenshot fullPage", v.v.

---

## 🚫 Chrome DevTools MCP — 3 điều CẤM

User sử dụng DevTools responsive panel tự set viewport họ cần. Các tool dưới đây **đè lên setup đó và không restore đúng** — đã từng làm hỏng nhiều session.

### 1. CẤM `mcp__chrome-devtools__take_screenshot` với `fullPage: true`

Dù user gõ bất kỳ biến thể nào: "chụp full", "chụp full trang", "chụp full page", "chụp toàn trang", "chụp fullpage", "chụp hết", "screenshot cả trang", "full-page" — **KHÔNG được set `fullPage: true`**.

Lý do: CDP `Page.captureScreenshot({captureBeyondViewport: true})` bypass lớp UI của DevTools responsive panel (panel chỉ là render-overlay) và đọc **device metrics gốc**. Panel hiện 1440×900 nhưng metrics gốc là 768×1024 → fullPage chụp ra 768, content bị clip. Thực tế đã ra file `768×5544` bị báo sai "1440×900".

**Thay thế bằng scroll-loop**:
```
1. evaluate_script: () => ({
     w: innerWidth, h: innerHeight,
     dpr: devicePixelRatio,
     totalH: document.documentElement.scrollHeight
   })
2. Nếu w không khớp size user setup → STOP, báo user, không tự fix
3. mkdir -p <folder user chỉ định>
4. for (y = 0; y < totalH; y += innerHeight):
     evaluate_script: `() => { window.scrollTo(0, ${y}); return scrollY; }`
     take_screenshot  ← chỉ viewport, KHÔNG fullPage
     lưu NN-scroll-${y}.png
5. Báo user path + số ảnh
```

### 2. CẤM `mcp__chrome-devtools__emulate`

Dù "chỉ gọi 1 lần để kiểm tra" — KHÔNG. `emulate(0x0x0)` không restore, set `isMobile:false, DPR:0, viewport rác`. Chỉ user tự toggle trong DevTools UI mới reset được.

Nếu phát hiện emulate-state còn sót từ session cũ: báo user, hỏi họ tự reset, **KHÔNG** gọi `emulate` để clear (làm tệ hơn).

### 3. CẤM `mcp__chrome-devtools__resize_page`

Không reliable với Windows 125% display scaling + DPR. `resize_page(768, 1024)` từng cho CSS viewport 384 (mobile breakpoint thay vì tablet).

### ✅ Tool được phép

- `mcp__chrome-devtools__take_screenshot` — **chỉ viewport**, KHÔNG `fullPage`
- `mcp__chrome-devtools__evaluate_script` — đọc `innerWidth/innerHeight/devicePixelRatio/scrollHeight`, scroll bằng `window.scrollTo`
- `mcp__chrome-devtools__navigate_page`, `take_snapshot`, `list_pages`, `select_page`
- DOM/CSS inspection qua `evaluate_script`

### Sanity check bắt buộc sau mỗi ảnh

Nếu `image.width !== innerWidth` → có vấn đề (có thể đã lỡ dùng fullPage hoặc emulate cũ còn sót). Dừng, báo user, không tiếp tục chụp.

---

## Ghi chú thêm

Rule chi tiết conventions UI repo này (fullpage slide/scroll, CSS selector scoping, carousel gap, card aspect-ratio, bento grid) ở skill `company-intro-ui` (auto-load khi match trigger). File này chỉ chứa rule critical, always-on.
