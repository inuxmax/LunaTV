## [5.0.9] - 2026-03-06

### Fixed

- Giải quyết vấn đề chế độ ẩn danh không ảnh hưởng đến lịch sử tìm kiếm
-[APP]Thay thế link tải
- [Nguồn phát] Lọc từ nhạy cảm
- Giới thiệu tính năng tải động trên các trang phát lại và phát sóng trực tiếp để loại bỏ các lỗi thuộc tính 'độ dài'
- [TVBOX] Sửa đổi tên trang web không làm mới

### Changed

- Nhánh ngược dòng được sửa đổi đồng bộ, điều này chủ yếu ảnh hưởng đến người dùng Redis làm nơi lưu trữ. Tốt nhất bạn nên sao lưu dữ liệu trước khi sử dụng phiên bản này để tránh những tổn thất.
-[100.1.1]Trang tìm kiếm sử dụng tính năng cuộn ảo để tối ưu hóa hiệu suất cuộn
- 【100.1.0】Tối ưu hóa cấu trúc lưu trữ dữ liệu người dùng và tăng tốc thu thập dữ liệu
- [100.1.0] Tự động di chuyển dữ liệu mới
- Tối ưu hóa menu TVBOX và lối vào APP

### Added

- [Nguồn phát] Ghi nhớ các điều kiện lọc
- Tối ưu hóa điều hướng hàng đầu trên thiết bị di động

## [5.0.8] - 2026-02-11

### Fixed

- [TVBox] Lỗi hiển thị trạng thái Switch
- [TVBox] Tối ưu truy vấn chính xác phim ngắn
- [TVBox] Douban đề xuất loại danh sách lọc dữ liệu

### Added

- [TVBox] Thích ứng với TVBOX để đồng bộ hóa các bản ghi phát lại, bộ sưu tập và lịch sử tìm kiếm
- [TVBox] Thêm chức năng quảng cáo proxy (đang phát triển, vui lòng không kích hoạt)
- [TVBox] Thêm switch đồng bộ dữ liệu
- [WEB] Đã thêm tính năng duyệt web ẩn danh. Sau khi được bật, các bản ghi sẽ không được phát đồng thời.

### Changed

- [Play source] Thêm từ khóa tìm kiếm và tối ưu hóa tương tác trang
- Tối ưu hóa menu chủ đề

## [5.0.7] - 2026-01-29

### Fixed

- [TVBox] Chuyển đổi hình nền không có hiệu lực
- [Người dùng] Sửa đổi mật khẩu không thành công

### Added

- Đã thêm danh mục [Phim ngắn]
- Đã thêm trang [Nguồn video]
- [Cấu hình chức năng] được sử dụng để định cấu hình hiển thị và ẩn các menu chức năng
- [Trang chủ] Thêm một trang tab riêng cho các bản ghi phát lại

### Changed

- [Người dùng] Tạo khóa và tạo muối
- [Phiên bản di động] Menu phía dưới tự động định vị menu hiện tại
- [Bảng quản lý] Sửa đổi bố cục

## [5.0.6] - 2026-01-27

### Fixed

- Do thay đổi địa chỉ TVBox, vui lòng cập nhật kịp thời
- [Người dùng] Thêm nút làm mới Key để tương thích với dữ liệu cũ


## [5.0.5] - 2026-01-27

### Fixed

- Tắt kết nối trực tiếp trình duyệt proxy hình ảnh, vui lòng tránh chọn tùy chọn này, nếu không áp phích có thể không được hiển thị
- [tvbox] Đã sửa lỗi dữ liệu trên trang chi tiết (cải thiện độ chính xác của tìm kiếm)

### Added

- [Người dùng] Thêm khóa ngắn, hiện chủ yếu được sử dụng cho tvbox để phân biệt những người dùng khác nhau và sẽ được sử dụng để phát lại các bản ghi và đồng bộ hóa bộ sưu tập trong tương lai
- [Cấu hình trang web] Thêm nút đăng ký mở. Sau khi được bật, người dùng có thể đăng ký tài khoản.

### Changed

- [tvbox] Chiến lược dữ liệu và hình ảnh Douban tuân theo cài đặt hệ thống
- [Người dùng] Lưu trữ mật khẩu đã thay đổi thành bản mã

## [5.0.4] - 2025-09-25

### Fixed

- Đã sửa lỗi biến môi trường sai ADMIN_USERNAME
- Đã khắc phục sự cố treo trang chủ do không có hình ảnh trong dữ liệu bangumi

## [5.0.3] - 2025-09-09

### Added

- Thêm hỗ trợ sqlite và đặt sqlite làm mặc định
- [Tiếp tục xem] Thêm nút mở rộng/thu gọn/nút

### Changed

- [tvbox] Thêm bộ đệm giao diện, thời gian chờ, tối ưu hóa đọc cấu hình Douban, sửa đổi giao diện tìm kiếm

## [5.0.2] - 2025-09-05

### Fixed

- [Quản lý phụ trợ] Lỗi bảng điều khiển Click Tab
- Xem trang thông tin phiên bản nhấp nháy

### Added

- Hỗ trợ TvBox
- [Tiếp tục xem] Thêm nút mở rộng/thu gọn/nút

### Changed

- [Phát sóng trực tiếp] Đã thêm hỗ trợ cho các định dạng flv và mp4

## [5.0.1] - 2025-09-01

### Fixed

- Xây dựng chi nhánh chính không thành công

### Added

- Đăng nhập để thêm nút xem mật khẩu

### Changed

- Tối ưu hóa quy trình build tự động: phân biệt số phiên bản, nhánh và đơn giản hóa quy trình Release
- Tự động cập nhật Release Note khi sáp nhập

## [5.0.0] - 2025-08-28

### Fixed

- Đã sửa lỗi hiển thị số phiên bản

### Changed

- Cập nhật docker-image.yml và đẩy image để sử dụng kho hiện tại, tối ưu hóa việc đặt tên nhánh và thẻ
- Bây giờ dự án đã được đổi tên, toàn bộ trang web sẽ được đổi tên thành LunaTV
- Thêm một số logo, biểu tượng, poster


## [100.0.0] - 2025-08-26

### Added

- Đã thêm hỗ trợ cho biến môi trường SITE_BASE để giải quyết vấn đề lỗi url cơ sở trong quá trình viết lại m3u8

### Changed

- Loại bỏ logic liên quan đến ủy quyền
- Loại bỏ sự xáo trộn mã
- Loại bỏ giai điệu-cdn-sharon

## [4.3.0] - 2025-08-26

### Added

- Hỗ trợ thêm các kênh IPTV vào mục yêu thích

### Changed

- Tắt phát sóng trực tiếp flv, chỉ hỗ trợ phát sóng trực tiếp m3u8
- Giảm mức sử dụng bộ nhớ của phân đoạn ts proxy

## [4.2.1] - 2025-08-26

### Fixed

- Đã khắc phục sự cố nguồn phát sóng trực tiếp không tải được hoặc tiếp tục tải vô hạn sau khi rời khỏi trang

## [4.2.0] - 2025-08-26

### Added

- Hỗ trợ xử lý độ phân giải địa chỉ phát sóng trực tiếp flv và phát sóng trực tiếp sang mp4
- Thêm proxy cho logo đài phát sóng trực tiếp để ngăn chặn cors
- Hỗ trợ cuộn trang chuyển nhóm lựa chọn trang chơi

### Changed

-Thêm nút UI tải vào trang nền quản lý

### Fixed

- /api/proxy/m3u8 chỉ giải tuần tự hóa nội dung m3u8 để giảm mức tiêu thụ bộ nhớ và CPU

## [4.1.1] - 2025-08-25

### Changed

- Đã thêm hỗ trợ cho url url-tvg và multi-epg

### Fixed

- Đã khắc phục sự cố do logic khử chồng chéo trong quá trình làm sạch dữ liệu epg không tính đến ngày

## [4.1.0] - 2025-08-24

### Added

- Phân tích epg tích hợp và epg tùy chỉnh của m3u và thêm danh sách chương trình ngày hôm nay

### Changed

- Làm mới dữ liệu nguồn phát sóng trực tiếp đã thay đổi thành làm mới đồng thời

## [4.0.0] - 2025-08-24

### Added

- Thêm chức năng đăng ký và phát lại iptv

### Changed

- Thêm liên kết Douban vào trang tìm kiếm card màn hình thiết bị đầu cuối di động/menu chuột phải
- Đề xuất tìm kiếm theo bộ lọc khiêu dâm

## [3.2.1] - 2025-08-22

### Changed

- Đã thêm danh mục bộ lọc màu
- Điều chỉnh mức độ của hộp gợi ý tìm kiếm

## [3.2.0] - 2025-08-22

### Added

- Quản lý nguồn video hỗ trợ bật, tắt và xóa hàng loạt
- Quản lý người dùng hỗ trợ cài đặt hàng loạt nhóm người dùng
- Thêm tính năng phát lại tab mới vào menu chuột phải/nhấn và giữ của card màn hình

### Changed

- Chỉ giữ lại nút play khi di chuột card màn hình trên phiên bản di động
- Tinh chỉnh kiểu bộ sưu tập trong giao diện người dùng trang quản lý và menu nhấp chuột phải/nhấn và giữ thẻ video

### Fixed

- Đã khắc phục sự cố phím enter trong thanh tìm kiếm tự động chọn mục được đề xuất đầu tiên

## [3.1.2] - 2025-08-22

### Fixed

-Sửa lỗi không bấm được thẻ di động

## [3.1.1] - 2025-08-21

### Fixed

- Đã khắc phục sự cố vào trang phát sau khi nhấp vào nút không phát của thẻ video khi di chuột

## [3.1.0] - 2025-08-21

### Added

- Đã thêm quản lý nhóm người dùng và hạn chế nguồn phát của nhóm người dùng
- Đã thêm kiểm tra tính hợp lệ của nguồn video trong bảng quản lý
- Đã thêm nút xóa bằng một cú nhấp chuột vào thanh tìm kiếm

### Changed

- Giảm bớt các tiêu chí đánh giá sự cố mạng bằng nhịp tim được ủy quyền
- Thống nhất cửa sổ bật lên bảng quản lý bằng createPortal
- VideoCard cho phép thiết bị đầu cuối di động phản hồi các sự kiện di chuột
- Tiêu đề bố cục trên thiết bị di động là cố định và nút tìm kiếm được chuyển sang bên phải của tiêu đề
- Tăng thời gian chờ giao diện tìm kiếm

### Fixed

- Đã khắc phục sự cố trong đó xếp hạng số nguyên được bangumi trả về không có số thập phân, khiến giao diện người dùng bị căn chỉnh sai

## [3.0.2] - 2025-08-20

### Changed

- Tối ưu hóa logic tạo mã máy

### Fixed

-Đã khắc phục sự cố url redis không hỗ trợ giao thức rediss

## [3.0.1] - 2025-08-20

### Fixed

- Đã sửa lỗi khởi tạo ủy quyền

## [3.0.0] - 2025-08-20

### Added

- Tăng cường chống trộm
- Hỗ trợ các nguồn video tùy chỉnh có sẵn của người dùng

### Changed

- Nhấp chuột phải vào card màn hình để bật lên menu thao tác

### Fixed

- Lọc kết quả tìm kiếm tập số 0

## [2.7.1] - 2025-08-17

### Fixed

- Đã khắc phục sự cố bảng phiên bản trong iOS có thể xuyên qua nền cuộn

## [2.7.0] - 2025-08-17

### Added

- Bảng điều khiển di động mới được thêm vào card màn hình để tối ưu hóa trải nghiệm thao tác trên màn hình cảm ứng.

### Changed

- Tối ưu hóa việc so khớp và hiển thị logic tiêu đề các tập phim

### Fixed

- Đã khắc phục sự cố có thể kéo nền của bảng cài đặt và bảng thay đổi mật khẩu

## [2.6.0] - 2025-08-17

### Added

- Đã thêm giao diện đầu ra phát trực tuyến tìm kiếm mới và đặt tìm kiếm phát trực tuyến làm giao diện tìm kiếm mặc định để tối ưu hóa trải nghiệm tìm kiếm
- Đã thêm bộ đệm bộ nhớ kết quả tìm kiếm trang gốc, độ chi tiết là trang gốc + từ khóa + số trang, bộ nhớ đệm trong 10 phút
- Đã thêm CDN Douban do @JohnsonRan cung cấp

### Changed

- Kết quả tìm kiếm mặc định không được sắp xếp và không còn được sắp xếp theo năm nữa.
- Khi không có kết quả trong giao diện tìm kiếm thông thường, tiêu đề bộ đệm phản hồi không còn được đặt.
- Loại bỏ phương thức cors-anywhere trong nguồn dữ liệu Douban

### Fixed

- Xuất mật khẩu quản trị trang web khi xuất dữ liệu để đảm bảo người dùng quản trị trang web ban đầu có thể đăng nhập bình thường khi di chuyển sang tài khoản mới.
- Thẻ tổng hợp tối ưu hóa việc hiển thị thông tin nguồn trên thiết bị đầu cuối di động

## [2.4.1] - 2025-08-15

### Fixed

- Thực hiện tự kiểm tra trên các tệp cấu hình đã nhập và đọc DB để ngăn việc sửa đổi TÊN NGƯỜI DÙNG gây ra trạng thái người dùng bất thường

## [2.4.0] - 2025-08-15

### Added

- Hỗ trợ lưu trữ kvrocks (lưu trữ kv liên tục)

### Fixed

- Đã sửa lỗi sắp xếp kết quả tìm kiếm không ổn định
- Cập nhật cấu hình quản trị viên của bộ nhớ cache khi nhập dữ liệu

## [2.3.0] - 2025-08-15

### Added

-Hỗ trợ quản trị viên web nhập và xuất toàn bộ dữ liệu trang web

### Changed

- Chỉ quản trị viên web mới được phép vận hành các tập tin cấu hình
- Tinh chỉnh kiểu di động của bảng lọc kết quả tìm kiếm

## [2.2.1] - 2025-08-14

### Fixed

- Đã khắc phục sự cố bảng điều khiển không theo trang cuộn khi mở bảng lọc.

## [2.2.0] - 2025-08-14

### Added

- Kết quả tìm kiếm hỗ trợ lọc theo nguồn phát, tiêu đề và năm, đồng thời hỗ trợ sắp xếp theo năm
- Card video trên giao diện tìm kiếm hiển thị thông tin năm, còn card tổng hợp hiển thị nguồn phát

### Fixed

- Đã khắc phục sự cố /api/search/resources trả về sản phẩm trống
- Đã khắc phục sự cố các phiên bản upstash không thể chỉnh sửa danh mục tùy chỉnh

## [2.1.0] - 2025-08-13

### Added

-Hỗ trợ lấy file cấu hình thông qua đăng ký

### Changed

- Tinh chỉnh một số copywriting và giao diện người dùng
- Xóa một số mã vô dụng

## [2.0.1] - 2025-08-13

### Changed

- Kiểm tra phiên bản và yêu cầu thay đổi Github

### Fixed

- Tinh chỉnh kiểu bảng quản trị

## [2.0.0] - 2025-08-13

### Added

- Hỗ trợ cấu hình trực tuyến và chỉnh sửa file cấu hình
- Liên kết thời gian thực của hộp tìm kiếm trên trang tìm kiếm
- Loại bỏ hỗ trợ cho chế độ lưu trữ cục bộ

### Changed

- Đã thay đổi nút xóa bản ghi phát thành biểu tượng thùng rác để loại bỏ sự mơ hồ

### Fixed

- Giới hạn độ dài tối đa của bảng cài đặt để ngăn nó vượt quá khung nhìn

## [1.1.1] - 2025-08-12

### Changed
- Sửa địa chỉ proxy cors do zwei cung cấp
- Loại bỏ mã lỗi thời

### Fixed
- [Vận hành và bảo trì] Ngày phát hành quy trình làm việc của Docker sử dụng ngày của Quận Dongba

## [1.1.0] - 2025-08-12

### Added
- Chức năng phát sóng chương trình mới hàng ngày, chiếu các bộ phim truyền hình phát sóng chương trình mới hàng ngày

### Fixed
-Đã khắc phục sự cố CHANGELOG từ xa không thể trích xuất nội dung đã thay đổi

## [1.0.5] - 2025-08-12

### Changed
- Triển khai quy trình phát hành tự động dựa trên thẻ Git

## [1.0.4] - 2025-08-11

### Added
- Tối ưu hóa quy trình quản lý phiên bản để đạt được sửa đổi một điểm

### Changed
- Số phiên bản hiện được trích xuất tự động từ CHANGELOG, loại bỏ nhu cầu duy trì VERSION.txt theo cách thủ công

## [1.0.3] - 2025-08-11

### Changed

- Nâng cấp trình phát Artplayer lên phiên bản 5.2.5

## [1.0.2] - 2025-08-11

### Changed

- Cơ chế so sánh số phiên bản quay về so sánh số và chỉ khi phiên bản mới nhất lớn hơn phiên bản cục bộ thì mới được coi là đã cập nhật.
- [Vận hành và bảo trì] Tự động thay thế số phiên bản trong version.ts bằng số phiên bản trong VERSION.txt

## [1.0.1] - 2025-08-11

### Fixed

- Đã sửa chức năng kiểm tra phiên bản, miễn là nó không phù hợp với số phiên bản mới nhất sẽ được coi là bản cập nhật.

## [1.0.0] - 2025-08-10

### Added

- Cơ chế đánh số phiên bản dựa trên Semantic Versioning
- Bảng thông tin phiên bản, hiển thị nhật ký thay đổi cục bộ và nhật ký cập nhật từ xa