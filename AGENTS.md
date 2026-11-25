# Quy trình nội dung và tài sản của “Gửi Bon”

Khi người dùng gửi danh sách `ảnh background`, `ảnh background 2`, `ảnh og`, `ảnh 1`…`ảnh 30` hoặc `nhạc`, phải ánh xạ đúng bảng dưới đây, không đoán nếu tên không khớp. Dữ liệu tĩnh nằm trong `src/data/`; nội dung truyện không được tự sửa.

| Tên | Slot |
|---|---|
| ảnh background | `bg-hero` |
| ảnh background 2 | `bg-letter` |
| ảnh og | `og-image` |
| ảnh 1–3 | `ch1-01..03` |
| ảnh 4–6 | `ch2-01..03` |
| ảnh 7–18 | `m01..m12` |
| ảnh 19–20 | `ch4-01..02` |
| ảnh 21–30 | `album-01..10` |
| nhạc | `public/audio/bg-music.mp3` |
| sfx đóng dấu | `public/audio/sfx/sfx-stamp.mp3` |
| sfx bóng nổ | `public/audio/sfx/sfx-pop.mp3` |
| sfx lấp lánh | `public/audio/sfx/sfx-ting.mp3` |
| sfx khói | `public/audio/sfx/sfx-poof.mp3` |
| sfx lá thư | `public/audio/sfx/sfx-whoosh.mp3` |

1. Ghi danh sách nguyên dạng `tên: nguồn` vào `assets.input.txt`. File cục bộ phải nằm trong `inbox/`; nguồn có thể là tên file hoặc URL.
2. Chạy `npm run assets`. Script đổi link Google Drive `/file/d/ID/view` sang URL download. Nếu Google Photos, iCloud, Facebook hoặc nguồn khác trả HTML/chặn tải, không hotlink; báo người dùng tải file về `inbox/anh-NN.jpg`.
3. Script dùng sharp: ảnh thường WebP quality 80, cạnh dài tối đa 1600px; background tối đa 1920px; OG là JPEG 1200×630. Ảnh lưu ở `src/assets/photos/`, OG ở `public/`, nhạc ở `public/audio/`.
4. Kiểm tra `src/data/assets.manifest.ts`: giữ nguyên ID, cập nhật `src`, `alt`, và caption nếu người dùng cung cấp. Slot thiếu luôn đi qua placeholder pastel trong `src/lib/assets.ts`.
5. Chạy `npm run lint && npm test && npm run build`. Báo các slot đã gắn, slot còn placeholder và tổng dung lượng; cảnh báo trên 15 MB.

Hỗ trợ thay/xóa/đổi thứ tự bằng cách cập nhật manifest có chủ đích. Khi xóa, đặt `src: ''` để placeholder tự xuất hiện. Mọi import nội bộ dùng alias `@/`; giữ quy tắc `pages → features → components → lib/hooks`, feature không import feature khác.
