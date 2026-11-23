# Checklist ảnh cần upload cho “Gửi Bon”

## Upload ở đâu?

1. Trên máy: chép ảnh gốc vào thư mục `inbox/` của dự án.
2. Đổi tên theo cột **Tên file gợi ý** bên dưới để dễ kiểm tra.
3. Mở `assets.input.txt`, thêm từng dòng theo mẫu `ảnh N: tên-file.jpg`.
4. Chạy `npm run assets`, sau đó `npm run build`.

Không upload trực tiếp vào `src/assets/photos/`; script sẽ tự nén WebP và đặt ảnh vào đó.

## Danh sách

| Xong | Tên gọi | Slot | Tên file gợi ý | Nội dung |
|---|---|---|---|---|
| [ ] | ảnh background | `bg-hero` | `bg-hero.jpg` | Ảnh nổi bật làm nền mở đầu |
| [ ] | ảnh background 2 | `bg-letter` | `bg-letter.jpg` | Nền nhẹ cho lá thư cuối |
| [ ] | ảnh og | `og-image` | `og-image.jpg` | Ảnh chia sẻ Facebook/Zalo, ngang 1200×630 |
| [x] | ảnh 1 | `ch1-01` | `anh-01.jpg` | Khoảnh khắc biết tin có con |
| [x] | ảnh 2 | `ch1-02` | `anh-02.jpg` | Ảnh siêu âm |
| [x] | ảnh 3 | `ch1-03` | `anh-03.jpg` | Bụng bầu/ba mẹ chờ Bon |
| [x] | ảnh 4 | `ch2-01` | `anh-04.jpg` | Ngày Bon chào đời |
| [x] | ảnh 5 | `ch2-02` | `anh-05.jpg` | Bàn tay/chân nhỏ |
| [x] | ảnh 6 | `ch2-03` | `anh-06.jpg` | Ba mẹ bế Bon |
| [ ] | ảnh 7–18 | `m01..m12` | `anh-07.jpg`…`anh-18.jpg` | Mỗi tháng một ảnh, tháng 1 đến tháng 12 |
| [ ] | ảnh 19 | `ch4-01` | `anh-19.jpg` | Ảnh gia đình |
| [ ] | ảnh 20 | `ch4-02` | `anh-20.jpg` | Ảnh đặt trong thư |
| [ ] | ảnh 21–30 | `album-01..10` | `anh-21.jpg`…`anh-30.jpg` | Mười ảnh album tự chọn |

## Ví dụ `assets.input.txt`

```text
ảnh background: bg-hero.jpg
ảnh background 2: bg-letter.jpg
ảnh og: og-image.jpg
ảnh 1: anh-01.jpg
ảnh 2: anh-02.jpg
ảnh 7: anh-07.jpg
ảnh 18: anh-18.jpg
ảnh 30: anh-30.jpg
```

Có thể dùng PNG, JPG, JPEG hoặc WebP. Ảnh chưa upload tiếp tục hiển thị placeholder, không làm hỏng trang.
