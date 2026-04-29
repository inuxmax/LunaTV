# LunaTV

<div align="center">
  <img src="public/logo.png" alt="LunaTV Logo" width="120">
</div>

> 🎬 **LunaTV** là một trình phát tổng hợp phim và truyền hình đa nền tảng, vượt trội. Nó được xây dựng dựa trên **Next.js 14** + **Tailwind CSS** + **TypeScript** và hỗ trợ tìm kiếm đa tài nguyên, phát lại trực tuyến, đồng bộ hóa bộ sưu tập, bản ghi phát lại và lưu trữ đám mây, cho phép bạn thưởng thức nội dung phim và truyền hình miễn phí khổng lồ mọi lúc, mọi nơi.

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-000?logo=nextdotjs)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178c6?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)
![Docker Ready](https://img.shields.io/badge/Docker-ready-blue?logo=docker)

</div>

---

## 🎩 Phiên bản sửa đổi kỳ diệu

### 📢 Tuyên bố

1. Dự án này chỉ nhằm mục đích bảo trì đơn giản, chủ yếu là sửa lỗi. Chúng tôi sẽ đặc biệt thận trọng về các tính năng mới. Điều duy nhất có thể được bổ sung chắc chắn là hỗ trợ cho tvbox.
2. Bạn có thể [phản hồi](https://github.com/laboratorys/LunaTV/issues), nhưng tôi có thể không (có thể) giải quyết vấn đề đó và tôi sẽ chỉ để mọi việc diễn ra bình thường.
3. Cố gắng giữ nó chân thực nhất có thể, cảm ơn nỗ lực của tác giả ban đầu và đứng trên vai những người khổng lồ!

### 🚀 Tổng quan về tính năng mới

- [x] Mở đăng ký
- [x] Duyệt web riêng tư
- [x] hỗ trợ hộp tv
- [x] Hỗ trợ lưu trữ sqlite
- [x] Phân loại vở kịch ngắn
- [x] Duyệt nguồn video
- [] Chơi trong khi tải xuống

### 🌿 Nhánh phiên bản

- nhánh v100: mã cuối cùng của phiên bản v100 của dự án ban đầu, sẽ không có sửa đổi nào nữa
- nhánh chính: phiên bản ổn định
- nhánh dev: phiên bản phát triển
- Phiên bản đầu tiên của phiên bản sửa đổi kỳ diệu là: 5.0.0

### 🐳 Hình ảnh Docker

1. phiên bản mới nhất mới nhất: `ghcr.io/laboratorys/lunatv:latest`
2. TAG tương ứng với phiên bản phát hành: `ghcr.io/laboratorys/lunatv:v5.0.0`
3. phiên bản phát triển dev. Phiên bản này chưa được phát hành chính thức và có thể không ổn định. Vui lòng thận trọng khi sử dụng: `ghcr.io/laboratorys/lunatv:dev`
4. Nếu các thẻ không liên tiếp thì phiên bản phát triển trung gian sẽ được sử dụng để chuyển đổi.
5. Cập nhật đồng bộ docker.io: [iicm/lunatv](https://hub.docker.com/r/iicm/lunatv/tags)

## ✨ Tính năng

- 🔍 **Tìm kiếm tổng hợp nhiều nguồn**: Một tìm kiếm ngay lập tức trả về kết quả từ tất cả các nguồn.
- 📄 **Trang chi tiết phong phú**: Hỗ trợ hiển thị thông tin đầy đủ như danh sách tập, diễn viên, năm, giới thiệu, v.v.
- ▶️ **Phát lại trực tuyến mượt mà**: Tích hợp HLS.js & ArtPlayer.
- ❤️ **Bộ sưu tập + Tiếp tục xem**: Hỗ trợ lưu trữ Kvrocks/Redis/Upstash, tiến trình đồng bộ hóa đa đầu.
- 📱 **PWA**: Bộ nhớ đệm ngoại tuyến, cài đặt vào màn hình chính/máy tính để bàn, trải nghiệm di động gốc.
- 🌗 **Bố cục đáp ứng**: Thanh bên của máy tính để bàn + điều hướng phía dưới thiết bị di động, thích ứng với nhiều kích thước màn hình khác nhau.
- 👿 **Xóa quảng cáo thông minh**: Tự động bỏ qua các quảng cáo được cắt lát trong video (thử nghiệm).

### Lưu ý: Sau khi triển khai, dự án là dự án shell trống, không có nguồn phát lại và nguồn phát sóng trực tiếp tích hợp. Nó cần phải được thu thập bởi chính bạn.

<details>
<summary>Nhấp để xem ảnh chụp màn hình dự án</summary>
<img src="public/screenshot1.png" alt="Ảnh chụp màn hình dự án" style="max-width:600px">
<img src="public/screenshot2.png" alt="Ảnh chụp màn hình dự án" style="max-width:600px">
<img src="public/screenshot3.png" alt="Ảnh chụp màn hình dự án" style="max-width:600px">
</details>

### Vui lòng không xuất bản video hoặc bài viết để quảng bá dự án này trên các tài khoản công khai Bilibili, Xiaohongshu, WeChat, Douyin, Toutiao hoặc các nền tảng xã hội khác của Trung Quốc đại lục và không ủy quyền cho bất kỳ dự án hoặc trang web "Công nghệ hàng tuần/hàng tháng" nào đưa dự án này vào.

## 🗺 Mục lục

- [Ngăn xếp công nghệ](#Ngăn xếp công nghệ)
- [Triển khai](#triển khai)
- [Triển khai bằng một cú nhấp chuột](#zeabur-Triển khai bằng một cú nhấp chuột)
- [Triển khai Docker](#Kvrocks-Khuyến nghị lưu trữ)
- [Tệp cấu hình](#tệp cấu hình)
- [Đăng ký](#đăng ký)
- [TỰ ĐỘNG CẬP NHẬT](#TỰ ĐỘNG CẬP NHẬT)
- [Biến môi trường](#biến môi trường)
- [Khách hàng](#khách hàng)
- [Sử dụng AndroidTV](#AndroidTV-USE)
- [Roadmap](#roadmap)
- [Lời nhắc về bảo mật và quyền riêng tư](#security&privacyreminder)
- [License](#license)
- [CÁC NHẬN](#CÁC NHẬN)

## Ngăn xếp công nghệ

| Phân loại | Phụ thuộc chính |
| --------- | ----------------------------------------------------------------------------------------------------- |
| Khung giao diện người dùng | [Next.js 14](https://nextjs.org/) · Bộ định tuyến ứng dụng |
| Giao diện người dùng & Phong cách | [Tailwind CSS 3](https://tailwindcss.com/) |
| Ngôn ngữ | TypeScript 4 |
| Người chơi | [ArtPlayer](https://github.com/zhw2590582/ArtPlayer) · [HLS.js](https://github.com/video-dev/hls.js/) |
| Chất lượng mã | ESLint · Đẹp hơn · Jest |
| Triển khai | Docker |

## Triển khai

Dự án này **chỉ hỗ trợ triển khai Docker hoặc các nền tảng dựa trên Docker khác**.

### bộ nhớ sqlite (phương pháp 1-tạo thư mục theo cách thủ công)

**Vì vùng chứa được chạy bằng tài khoản không phải root nên bạn cần tạo một thư mục trên máy chủ và đặt quyền**

```
sudo mkdir -p /opt/lunatv/data
sudo chown -R 1001:1001 /opt/lunatv/data
```

```yml
services:
  lunatv-core:
    image: ghcr.io/laboratorys/lunatv:latest
    container_name: lunatv-core
    restart: on-failure
    ports:
      - '3000:3000'
    environment:
      - USERNAME=admin
      - PASSWORD=admin_password
      - NEXT_PUBLIC_STORAGE_TYPE=sqlite
    volumes:
      - /opt/lunatv/data:/app/data
```

### lưu trữ sqlite (chế độ quản lý tự động ổ đĩa có tên 2)

```yml
services:
  lunatv-core:
    image: ghcr.io/laboratorys/lunatv:latest
    container_name: lunatv-core
    restart: on-failure
    ports:
      - '3000:3000'
    environment:
      - USERNAME=admin
      - PASSWORD=admin_password
      - NEXT_PUBLIC_STORAGE_TYPE=sqlite
    volumes:
      - lunatv-data:/app/data
volumes:
  lunatv-data:
```

### Kho lưu trữ Kvrocks

```yml
services:
  lunatv-core:
    image: ghcr.io/laboratorys/lunatv:latest
    container_name: lunatv-core
    restart: on-failure
    ports:
      - '3000:3000'
    environment:
      - USERNAME=admin
      - PASSWORD=admin_password
      - NEXT_PUBLIC_STORAGE_TYPE=kvrocks
      - KVROCKS_URL=redis://lunatv-kvrocks:6666
    networks:
      - lunatv-network
    depends_on:
      - lunatv-kvrocks
  lunatv-kvrocks:
    image: apache/kvrocks
    container_name: lunatv-kvrocks
    restart: unless-stopped
    volumes:
      - kvrocks-data:/var/lib/kvrocks
    networks:
      - lunatv-network
networks:
  lunatv-network:
    driver: bridge
volumes:
  kvrocks-data:
    driver: local
    driver_opts:
      type: none
      device: kvrocks-data
      o: bind
```

### Lưu trữ Redis (có nguy cơ mất dữ liệu nhất định)

```yml
services:
  lunatv-core:
    image: ghcr.io/laboratorys/lunatv:latest
    container_name: lunatv-core
    restart: on-failure
    ports:
      - '3000:3000'
    environment:
      - USERNAME=admin
      - PASSWORD=admin_password
      - NEXT_PUBLIC_STORAGE_TYPE=redis
      - REDIS_URL=redis://lunatv-redis:6379
    networks:
      - lunatv-network
    depends_on:
      - lunatv-redis
  lunatv-redis:
    image: redis:alpine
    container_name: lunatv-redis
    restart: unless-stopped
    networks:
      - lunatv-network
# Vui lòng kích hoạt tính bền vững, nếu không dữ liệu sẽ bị mất sau khi nâng cấp/khởi động lại
    volumes:
      - ./data:/data
networks:
  lunatv-network:
    driver: bridge
```

### Bộ lưu trữ phía trên

1. Đăng ký tài khoản tại [upstash](https://upstash.com/) và tạo một phiên bản Redis mới với bất kỳ tên nào.
2. Sao chép **HTTPS ENDPOINT và TOKEN** của cơ sở dữ liệu mới
3. Sử dụng docker soạn sau

```yml
services:
  lunatv-core:
    image: ghcr.io/laboratorys/lunatv:latest
    container_name: lunatv-core
    restart: on-failure
    ports:
      - '3000:3000'
    environment:
      - USERNAME=admin
      - PASSWORD=admin_password
      - NEXT_PUBLIC_STORAGE_TYPE=upstash
- UPSTASH_URL=HTTPS ENDPOINT bắt đầu bằng https ở trên
- UPSTASH_TOKEN=TOKEN ở trên
```

### Triển khai Zeabur chỉ bằng một cú nhấp chuột

Nhấp vào nút bên dưới để triển khai bằng một cú nhấp chuột và cấu hình tự động cơ sở dữ liệu LunaTV + Kvrocks:

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/8MPTQU/deploy)

**Thuận lợi**:

- ✅ Không cần cấu hình, khởi động chỉ bằng một cú nhấp chuột (tự động triển khai môi trường hoàn chỉnh)
- ✅ Tự động tăng tốc HTTPS và CDN toàn cầu
- ✅ Lưu trữ liên tục, dữ liệu sẽ không bao giờ bị mất
- ✅ Dung lượng miễn phí đủ cho mục đích sử dụng cá nhân

**⚠️Mẹo quan trọng**: Sau khi triển khai hoàn tất, bạn cần đặt tên miền truy cập (Miền) cho dịch vụ LunaTV ở Zeabur trước khi có thể truy cập trên trình duyệt. Để biết chi tiết, hãy xem các bước bên dưới [Đặt tên miền truy cập] (#5-Bắt buộc phải đặt tên miền truy cập).

### ☁️ Triển khai Zeabur (khuyên dùng)

Thanks to @SzeMeng76

Zeabur là nền tảng triển khai đám mây một cửa sử dụng hình ảnh Docker dựng sẵn để triển khai nhanh chóng mà không cần chờ bản dựng.

**Các bước triển khai:**

1. **Thêm dịch vụ KVRocks** (thêm cơ sở dữ liệu trước)

- Nhấp vào "Thêm dịch vụ"> "Hình ảnh Docker"
- Nhập tên image: `apache/kvrocks`
- Cấu hình cổng: `6666` (TCP)
- **Ghi nhớ tên dịch vụ** (thường là `apachekvrocks`)
- **Cấu hình khối lượng liên tục (quan trọng)**:
- Tìm phần “Tập” trong cài đặt dịch vụ
- Bấm vào "Thêm Tập" để thêm tập mới
- Volume ID: `kvrocks-data` (có thể tùy chỉnh, chỉ hỗ trợ chữ cái, số và dấu gạch nối)
     - Path: `/var/lib/kvrocks/db`
- Lưu cấu hình

> 💡 **Mẹo quan trọng**: Đường dẫn ổ đĩa cố định phải được đặt thành `/var/lib/kvrocks/db` (thư mục dữ liệu KVRocks), để tệp cấu hình vẫn còn trong vùng chứa, tệp cơ sở dữ liệu được duy trì và dữ liệu sẽ không bị mất sau khi khởi động lại!

2. **Thêm dịch vụ LunaTV**

- Nhấp vào "Thêm dịch vụ"> "Hình ảnh Docker"
- Nhập tên ảnh: `ghcr.io/moontechlab/lunatv:latest`
- Cấu hình cổng: `3000` (HTTP)

3. **Cấu hình các biến môi trường**

Thêm vào các biến môi trường của dịch vụ LunaTV:

   ```env
# Bắt buộc: Tài khoản quản trị viên
   USERNAME=admin
   PASSWORD=your_secure_password

#Bắt buộc: cấu hình lưu trữ
   NEXT_PUBLIC_STORAGE_TYPE=kvrocks
   KVROCKS_URL=redis://apachekvrocks:6666

# Tùy chọn: cấu hình trang web
   SITE_BASE=https://your-domain.zeabur.app
   NEXT_PUBLIC_SITE_NAME=LunaTV Enhanced
ANNOUNCEMENT=Chào mừng đến với Phiên bản nâng cao của LunaTV

# Tùy chọn: Cấu hình proxy Douban (được khuyến nghị)
   NEXT_PUBLIC_DOUBAN_PROXY_TYPE=cmliussss-cdn-tencent
   NEXT_PUBLIC_DOUBAN_IMAGE_PROXY_TYPE=cmliussss-cdn-tencent
   ```

**Để ý**:

- Sử dụng tên dịch vụ làm tên máy chủ: `redis://apachekvrocks:6666`
- Nếu tên dịch vụ khác thì thay bằng tên thật
- Cả hai dịch vụ phải nằm trong cùng một Dự án

4. **Đã hoàn tất triển khai**
- Zeabur sẽ tự động kéo image và khởi động dịch vụ
- Sau khi đợi dịch vụ sẵn sàng, bạn cần tự tay thiết lập tên miền truy cập (xem bước tiếp theo)

#### 5. Đặt tên miền truy cập (bắt buộc)

- Trên trang dịch vụ LunaTV, nhấp vào tab "Mạng" hoặc "Mạng"
- Bấm vào "Tạo miền" để tạo tên miền miễn phí do Zeabur cung cấp (chẳng hạn như `xxx.zeabur.app`)
- Hoặc liên kết một tên miền tùy chỉnh:
- Bấm vào "Add Domain" để thêm tên miền của bạn
- Làm theo lời nhắc để định cấu hình bản ghi DNS CNAME để trỏ đến địa chỉ đích do Zeabur cung cấp
- Sau khi thiết lập xong tên miền bạn có thể truy cập LunaTV thông qua tên miền

6. **Ràng buộc một tên miền tùy chỉnh (tùy chọn)**
- Nhấp vào "Tên miền" trong cài đặt dịch vụ
- Thêm tên miền tùy chỉnh của bạn
- Cấu hình bản ghi DNS CNAME để trỏ tới tên miền do Zeabur cung cấp

#### 🔄 Cập nhật hình ảnh Docker

Zeabur sẽ không tự động cập nhật khi phiên bản mới của hình ảnh Docker được phát hành. Cập nhật cần phải được kích hoạt bằng tay.

**Các bước cập nhật:**

1. **Nhập trang dịch vụ**

- Click vào dịch vụ cần cập nhật (LunaTV hoặc KVRocks)

2. **Khởi động lại dịch vụ**
- Nhấp vào trang **"Trạng thái dịch vụ"**, sau đó nhấp vào nút **"Khởi động lại phiên bản hiện tại"**
- Zeabur sẽ tự động kéo image `mới nhất` mới nhất và triển khai lại nó

> 💡 **Mẹo**:
>
> - Khi sử dụng thẻ `mới nhất`, Khởi động lại sẽ tự động lấy hình ảnh mới nhất
> - Nên sử dụng thẻ phiên bản cố định (chẳng hạn như `v5.5.6`) trong môi trường sản xuất để tránh vô tình cập nhật

## Tệp cấu hình

Sau khi triển khai hoàn tất, nó sẽ là một ứng dụng shell trống không có nguồn phát lại. Quản trị viên web cần điền tệp cấu hình vào cài đặt tệp cấu hình của nền quản lý (đăng ký sẽ được hỗ trợ trong tương lai)

Một tập tin cấu hình ví dụ như sau:

```json
{
  "cache_time": 7200,
  "api_site": {
    "dyttzy": {
      "api": "http://xxx.com/api.php/provide/vod",
"name": "Tài nguyên mẫu",
      "detail": "http://xxx.com"
    }
// ... thêm trang web
  },
  "custom_category": [
    {
"tên": "华语",
      "type": "movie",
"truy vấn": "中文"
    }
  ]
}
```

- `cache_time`: thời gian lưu trữ giao diện (giây).
- `api_site`: Bạn có thể thêm, xóa hoặc thay thế bất kỳ trang tài nguyên nào. Mô tả trường:
- `key`: mã định danh duy nhất, giữ chữ/số viết thường.
- `api`: `vod` Địa chỉ gốc API JSON do trạm tài nguyên cung cấp.
- `name`: Tên hiển thị trong giao diện người-máy.
- `detail`: (Tùy chọn) Một số trang web không thể lấy thông tin chi tiết về tập thông qua API cần cung cấp URL gốc của chi tiết trang web để thu thập thông tin.
- `custom_category`: Cấu hình danh mục tùy chỉnh, được sử dụng để thêm các danh mục phim và truyền hình được cá nhân hóa trong điều hướng. Sử dụng loại + truy vấn làm mã định danh duy nhất. Các trường sau được hỗ trợ:
- `name`: tên hiển thị danh mục (tùy chọn, nếu không được cung cấp, truy vấn sẽ được sử dụng làm tên hiển thị)
- `type`: kiểu phân loại, hỗ trợ `movie` (phim) hoặc `tv` (tv series)
- `query`: từ khóa tìm kiếm, dùng để tìm kiếm nội dung liên quan trong Douban API

Các danh mục tùy chỉnh được custom_category hỗ trợ được biết như sau:

- phim: nổi tiếng, mới nhất, cổ điển, điểm cao Douban, phim không được ưa chuộng, Trung Quốc, Âu Mỹ, Hàn Quốc, Nhật Bản, hành động, hài, tình yêu, khoa học viễn tưởng, hồi hộp, kinh dị, hàn gắn
- tv: phim truyền hình nổi tiếng, phim truyền hình Mỹ, phim truyền hình Anh, phim truyền hình Hàn Quốc, phim truyền hình Nhật Bản, phim truyền hình trong nước, phim truyền hình Hồng Kông, phim hoạt hình Nhật Bản, chương trình tạp kỹ, phim tài liệu

Bạn cũng có thể nhập "Harry Potter" và hiệu quả tương đương với tìm kiếm Douban

LunaTV hỗ trợ định dạng API Apple CMS V10 tiêu chuẩn.

## Đặt mua

Mã hóa tệp cấu hình hoàn chỉnh với base58 và cung cấp dịch vụ http là liên kết đăng ký, có thể được sử dụng trong chương trình phụ trợ/Helios của MoonTV.

## Cập nhật tự động

Vùng chứa hình ảnh có thể được cập nhật tự động với sự trợ giúp của [tháp canh](https://github.com/containrrr/watchtower)

Docker soạn UI như dockge/komodo cũng có chức năng cập nhật tự động

## Biến môi trường

| biến | mô tả | giá trị tùy chọn | giá trị mặc định |
| ----------------------------------- | ------------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| TÊN NGƯỜI DÙNG | Tài khoản quản trị trang web | Bất kỳ chuỗi nào | Không có trường mặc định, bắt buộc |
| MẬT KHẨU | Mật khẩu quản trị trang web | Bất kỳ chuỗi nào | Không có trường mặc định, bắt buộc |
| SITE_BASE | url trang web | ở dạng https://example.com | trống |
| NEXT_PUBLIC_SITE_NAME | Tên trang web | Bất kỳ chuỗi nào | LunaTV |
| THÔNG BÁO | Thông báo trang web | Chuỗi tùy ý | Trang web này chỉ cung cấp dịch vụ tìm kiếm thông tin phim và truyền hình và tất cả nội dung đều đến từ các trang web của bên thứ ba. Trang web này không lưu trữ bất kỳ tài nguyên video nào và không chịu trách nhiệm về tính chính xác, hợp pháp và đầy đủ của bất kỳ nội dung nào. |
| NEXT_PUBLIC_STORAGE_TYPE | Phương pháp lưu trữ bản ghi/bộ sưu tập phát lại | sqlte, redis, kvrocks, upstash | Không có trường mặc định, bắt buộc |
| KVROCKS_URL | url kết nối kvrocks | url kết nối | trống |
| REDIS_URL | làm lại url kết nối | url kết nối | trống |
| UPSTASH_URL | upstash url kết nối redis | url kết nối | trống |
| UPSTASH_TOKEN | mã thông báo kết nối redis upstash | mã thông báo kết nối | trống |
| NEXT_PUBLIC_SEARCH_MAX_PAGE | Số lượng trang tối đa mà giao diện tìm kiếm có thể kéo ra | 1-50 | 5 |
| NEXT_PUBLIC_DOUBAN_PROXY_TYPE | Phương thức yêu cầu nguồn dữ liệu Douban | Xem bên dưới | trực tiếp |
| NEXT_PUBLIC_DOUBAN_PROXY | URL proxy dữ liệu Douban được tùy chỉnh | tiền tố url | (trống) |
| NEXT_PUBLIC_DOUBAN_IMAGE_PROXY_TYPE | Loại proxy hình ảnh Douban | Xem bên dưới | trực tiếp |
| NEXT_PUBLIC_DOUBAN_IMAGE_PROXY | URL proxy hình ảnh Douban được tùy chỉnh | tiền tố url | (trống) |
| NEXT_PUBLIC_DISABLE_YELLOW_FILTER | Tắt tính năng lọc phim khiêu dâm | đúng/sai | sai |
| NEXT_PUBLIC_FLUID_SEARCH | Có bật đầu ra phát trực tuyến của giao diện tìm kiếm hay không | đúng/sai | đúng |

Giải thích về tùy chọn NEXT_PUBLIC_DOUBAN_PROXY_TYPE:

- trực tiếp: Máy chủ yêu cầu trực tiếp trạm nguồn Douban
- cors-proxy-zwei: Trình duyệt yêu cầu dữ liệu Douban từ proxy cors, được xây dựng bởi [Zwei](https://github.com/bestzwei)
- cmliussss-cdn-tencent: Trình duyệt yêu cầu dữ liệu từ Douban CDN, được xây dựng bởi [CMLiussss](https://github.com/cmliu) và được tăng tốc bởi Tencent Cloud CDN
- cmliussss-cdn-ali: Trình duyệt yêu cầu dữ liệu từ Douban CDN, được xây dựng bởi [CMLiussss](https://github.com/cmliu) và được tăng tốc bởi Alibaba Cloud CDN
- tùy chỉnh: proxy do người dùng xác định, được xác định bởi NEXT_PUBLIC_DOUBAN_PROXY

Giải thích về tùy chọn NEXT_PUBLIC_DOUBAN_IMAGE_PROXY_TYPE:

- direct: Trình duyệt yêu cầu trực tiếp tên miền hình ảnh mặc định do Douban gán
- máy chủ: Tác nhân máy chủ yêu cầu tên miền hình ảnh mặc định do Douban gán
- img3: Trình duyệt yêu cầu CDN chất lượng cao chính thức của Douban (Alibaba Cloud)
- cmliussss-cdn-tencent: Trình duyệt yêu cầu Douban CDN, được xây dựng bởi [CMLiussss](https://github.com/cmliu) và được tăng tốc bởi Tencent Cloud cdn
- cmliussss-cdn-ali: Trình duyệt yêu cầu Douban CDN, được xây dựng bởi [CMLiussss](https://github.com/cmliu) và được tăng tốc bởi Alibaba Cloud cdn
- tùy chỉnh: proxy do người dùng xác định, được xác định bởi NEXT_PUBLIC_DOUBAN_IMAGE_PROXY

## Khách hàng

Có thể sử dụng phiên bản v100.0.0 trở lên với [Selene](https://github.com/MoonTechLab/Selene). Trải nghiệm di động thân thiện hơn và dữ liệu được đồng bộ hóa hoàn toàn.

##Sử dụng AndroidTV

Hiện tại, bạn có thể sử dụng dự án này với [OrionTV](https://github.com/zimplexing/OrionTV) trên Android TV và có thể sử dụng trực tiếp làm chương trình phụ trợ OrionTV

Đã đạt được sự đồng bộ hóa các bản ghi phát lại và các trang web

## Lời nhắc về bảo mật và quyền riêng tư

### Vui lòng đặt mật khẩu bảo vệ và đóng đăng ký mạng công cộng

Vì sự an toàn của bạn và để tránh những rủi ro pháp lý tiềm ẩn, chúng tôi yêu cầu **rất khuyến khích đóng đăng ký mạng công cộng** trong quá trình triển khai:

### Yêu cầu triển khai

1. **Đặt biến môi trường `PASSWORD`**: Đặt mật khẩu mạnh cho phiên bản của bạn
2. **Chỉ sử dụng cho mục đích cá nhân**: Vui lòng không chia sẻ hoặc phổ biến công khai liên kết phiên bản của bạn
3. **Tuân thủ luật pháp địa phương**: Hãy đảm bảo rằng việc sử dụng của bạn tuân thủ luật pháp và quy định của địa phương

### Tuyên bố quan trọng

- Dự án này chỉ dành cho học tập và sử dụng cá nhân
- Không sử dụng các phiên bản đã triển khai cho mục đích thương mại hoặc dịch vụ công cộng
- Người dùng hoàn toàn chịu trách nhiệm về mọi vấn đề pháp lý phát sinh từ việc chia sẻ công khai
- Nhà phát triển dự án không chịu bất kỳ trách nhiệm pháp lý nào đối với hành vi sử dụng của người dùng
- Dự án này không cung cấp dịch vụ ở Trung Quốc đại lục. Nếu dự án này cung cấp dịch vụ cho Trung Quốc đại lục thì đó là hành động cá nhân. Các rủi ro và trách nhiệm pháp lý phát sinh khi sử dụng trong lĩnh vực này thuộc về hành vi cá nhân của người dùng và không liên quan gì đến dự án này và họ phải tự chịu hoàn toàn trách nhiệm. xin tuyên bố

## License

[MIT](LICENSE) © 2025 LunaTV & Contributors

## Lời cảm ơn

- [ts-nextjs-tailwind-starter](https://github.com/theodorusclarence/ts-nextjs-tailwind-starter) — Dự án ban đầu dựa trên giàn giáo này.
- [LibreTV](https://github.com/LibreSpark/LibreTV) — Hãy lấy cảm hứng từ điều này và đứng trên vai những người khổng lồ.
- [ArtPlayer](https://github.com/zhw2590582/ArtPlayer) — Cung cấp trình phát video trên web mạnh mẽ.
- [HLS.js](https://github.com/video-dev/hls.js) — Triển khai hỗ trợ phát lại phương tiện truyền phát trực tuyến HLS trong trình duyệt.
- [Zwei](https://github.com/bestzwei) — Cung cấp proxy cors để lấy dữ liệu Douban
- [CMLiussss](https://github.com/cmliu) — Cung cấp dịch vụ CDN Douban
- Cảm ơn tất cả các trang web cung cấp giao diện xem phim, truyền hình miễn phí.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=laboratorys/LunaTV&type=Date)](https://www.star-history.com/#laboratorys/LunaTV&Date)
