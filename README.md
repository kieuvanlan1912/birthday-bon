# Gửi Bon

Trang kỷ niệm kể chuyện về năm đầu đời của Kiều Huy Long (Bon), từ lúc ba mẹ chờ con đến sinh nhật một tuổi.

## Chạy local

```bash
npm install
npm run dev
```

Kiểm tra trước khi phát hành:

```bash
npm run lint
npm test
npm run build
```

## Gắn ảnh và nhạc

Xem [`CHECKLIST-ANH.md`](./CHECKLIST-ANH.md). Thả file gốc vào `inbox/`, ghi danh sách vào `assets.input.txt`, rồi chạy:

```bash
npm run assets
```

Ví dụ:

```text
ảnh background: hero.jpg
ảnh 1: sieu-am.jpg
ảnh 7: thang-1.jpg
nhạc: bg-music.mp3
```

Xem bảng ánh xạ đầy đủ và quy tắc xử lý trong `AGENTS.md`. Slot chưa có ảnh tự hiển thị placeholder pastel.

## GitHub Pages

Workflow `.github/workflows/deploy.yml` build và deploy mỗi lần push lên `main`. Trong GitHub, mở **Settings → Pages → Source → GitHub Actions**. URL đích: <https://kieuvanlan1912.github.io/birthday-bon/>.

## Kiểm tra giao diện

- Font tiếng Việt: `/#/font-check`
- Hiện nhãn slot ảnh khi debug: `/?debug=1#/`
- Chế độ TV: bấm biểu tượng màn hình trên header hoặc mở `/?tv=1#/`; dùng phím mũi tên, Space hoặc Enter để chuyển chương, Escape để thoát.
