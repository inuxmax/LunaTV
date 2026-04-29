/* eslint-disable */

addEventListener('fetch', (sự kiện) => {
  sự kiện.respondWith(handleRequest(event.request));
});

hàm không đồng bộ handRequest(request) {
  thử {
    const url = URL mới(request.url);

    // Nếu truy cập vào thư mục gốc thì trả về HTML
    if (url.pathname === '/') {
      return new Response(getRootHtml(), {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    }

    // Trích xuất URL mục tiêu từ đường dẫn yêu cầu
    hãy để thực tếUrlStr = giải mãURIComponent(url.pathname.replace('/', ''));

    // Xác định xem URL được người dùng nhập có giao thức hay không
    thực tếUrlStr = đảm bảoProtocol (UrlStr thực tế, url.protocol);

    //Giữ tham số truy vấn
    thực tếUrlStr += url.search;

    //Tạo một đối tượng Headers mới, loại trừ các ký tự bắt đầu bằng 'cf-' Tiêu đề yêu cầu bắt đầu bằng '
    const newHeaders = filterHeaders(
      yêu cầu.headers,
      (tên) => !name.startsWith('cf-')
    );

    // Tạo một yêu cầu mới để truy cập URL mục tiêu
    const đã sửa đổiRequest = Yêu cầu mới (actualUrlStr, {
      tiêu đề: newHeaders,
      phương thức: request.method,
      cơ thể: request.body,
      chuyển hướng: 'manual',
    });

    // Bắt đầu một yêu cầu tới URL mục tiêu
    phản hồi const = đang chờ tìm nạp(modifiedRequest);
    let body = reply.body;

    // Xử lý chuyển hướng
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      body = phản hồi.body;
      // Tạo một đối tượng Response mới để sửa đổi tiêu đề Vị trí
      return handRedirect(response, body);
    } khác nếu (response.headers.get('Content-Type')?.includes('text/html')) {
      body = đang chờ xử lýHtmlContent(
        phản ứng,
        url.protocol,
        url.host,
        UrlStr thực tế
      );
    }

    // Tạo đối tượng phản hồi đã sửa đổi
    const đã sửa đổiResponse = Phản hồi mới (nội dung, {
      trạng thái: phản hồi.status,
      statusText: phản hồi.statusText,
      tiêu đề: phản hồi.headers,
    });

    //Thêm tiêu đề để tắt bộ nhớ đệm
    setNoCacheHeaders(modifiedResponse.headers);

    // Thêm tiêu đề CORS để cho phép truy cập nhiều tên miền
    setCorsHeaders(modifiedResponse.headers);

    trả về Đã sửa đổiPhản hồi;
  } bắt (lỗi) {
    // Nếu xảy ra lỗi khi yêu cầu địa chỉ đích, hãy trả về phản hồi kèm theo thông báo lỗi và mã trạng thái 500 (Lỗi Máy chủ)
    trả về jsonResponse(
      {
        lỗi: error.message,
      },
      500
    );
  }
}

// Đảm bảo URL có giao thức
hàm đảm bảoProtocol(url, defaultProtocol) {
  trả về url.startsWith('http://') || url.startsWith('https://')
    ? url
    : defaultProtocol + '//' + url;
}

// Xử lý chuyển hướng
hàm xử lýRedirect(phản hồi, nội dung) {
  const location = URL mới(response.headers.get('location'));
  const modifiedLocation = `/${encodeURIComponent(location.toString())}`;
  trả về Phản hồi mới (nội dung, {
    trạng thái: phản hồi.status,
    statusText: phản hồi.statusText,
    tiêu đề: {
      ...response.headers,
      Vị trí: đã sửa đổiLocation,
    },
  });
}

// Xử lý đường dẫn tương đối trong nội dung HTML
hàm không đồng bộ xử lýHtmlContent(phản hồi, giao thức, máy chủ, thực tếUrlStr) {
  const originalText = đang chờ phản hồi.text();
  const Regex = new RegExp('((href|src|action)=["\'])/(?!/)', 'g');
  hãy sửa đổiText = thay thếRelativePaths(
    văn bản gốc,
    giao thức,
    chủ nhà,
    URL mới(actualUrlStr).origin
  );

  trả lại văn bản đã sửa đổi;
}

// Thay thế đường dẫn tương đối trong nội dung HTML
hàm thay thếRelativePaths(văn bản, giao thức, máy chủ, nguồn gốc) {
  const Regex = new RegExp('((href|src|action)=["\'])/(?!/)', 'g');
  trả về văn bản.replace(regex, `$1${protocol}//${host}/${origin}/`);
}

// Trả về phản hồi ở định dạng JSON
function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

// Lọc tiêu đề yêu cầu
hàm filterHeaders(tiêu đề, filterFunc) {
  trả về Tiêu đề mới([...headers].filter(([name]) => filterFunc(name)));
}

// Đặt tiêu đề để tắt bộ nhớ đệm
hàm setNoCacheHeaders(tiêu đề) {
  tiêu đề.set('Cache-Control', 'no-store');
}

// Đặt tiêu đề CORS
hàm setCorsHeaders(tiêu đề) {
  tiêu đề.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  headers.set('Access-Control-Allow-Headers', '*');
}

// Trả về HTML của thư mục gốc
hàm getRootHtml() {
  trả về `<!DOCTYPE html>
<html lang="zh-CN">
<đầu>
  <bộ ký tự meta="UTF-8">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet">
  <title>Proxy mọi thứ</title>
  <link rel="icon" type="image/png" href="https://img.icons8.com/color/1000/kawaii-bread-1.png">
  <meta name="Description" content="Proxy mọi thứ với CF Workers.">
  <meta property="og:description" content="Proxy mọi thứ với CF Workers.">
  <meta property="og:image" content="https://img.icons8.com/color/1000/kawaii-bread-1.png">
  <meta name="robots" content="index, follow">
  <meta http-equiv="Content-Language" content="zh-CN">
  <meta name="copyright" content="Bản quyền © ymyuuu">
  <meta name="tác giả" nội dung="ymyuuu">
  <link rel="apple-touch-icon-precompose" size="120x120" href="https://img.icons8.com/color/1000/kawaii-bread-1.png">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="viewport" content="width=device-width, user-scalable=no, first-scale=1.0, max-scale=1.0, Mini-scale=1.0, user-scalable=no">
  <phong cách>
      nội dung, html {
          chiều cao: 100%;
          lề: 0;
      }
      .background {
          hình nền: url('https://imgapi.cn/bing.php');
          kích thước nền: bìa;
          vị trí nền: trung tâm;
          chiều cao: 100%;
          hiển thị: linh hoạt;
          căn chỉnh các mục: giữa;
          biện minh-nội dung: trung tâm;
      }
      .card {
          màu nền: rgba(255, 255, 255, 0.8);
          quá trình chuyển đổi: màu nền dễ dàng 0,3 giây, bóng hộp dễ dàng 0,3 giây;
      }
      .card: di chuột {
          màu nền: rgba(255, 255, 255, 1);
          bóng hộp: 0px 8px 16px rgba(0, 0, 0, 0.3);
      }
      .input-field input[type=text] {
          màu: #2c3e50;
      }
      .input-field input[type=text]:focus+label {
          màu sắc: #2c3e50 !quan trọng;
      }
      .input-field input[type=text]:focus {
          viền-dưới: 1px Solid #2c3e50 !important;
          box-shadow: 0 1px 0 0 #2c3e50 !quan trọng;
      }
  </style>
</head>
<cơ thể>
  <div class="background">
      <div class="container">
          <div lớp="hàng">
              <div class="col s12 m8 offset-m2 l6 offset-l3">
                  <div lớp="thẻ">
                      <div class="card-content">
                          <span class="card-title center-align"><i class="material-icons left">liên kết</i>Proxy Mọi thứ</span>
                          <form id="urlForm" onsubmit="redirectToProxy(event)">
                              <div class="input-field">
                                  <input type="text" id="targetUrl" placeholder="Nhập địa chỉ mục tiêu vào đây" bắt buộc>
                                  <label for="targetUrl">Địa chỉ đích</label>
                              </div>
                              <button type="submit" class="btn wave-effect Wave-light Teal darken-2 full-width">Nhảy</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <kịch bản>
      hàm redirectToProxy(sự kiện) {
          sự kiện.preventDefault();
          const targetUrl = document.getElementById('targetUrl').value.trim();
          const currentOrigin = window.location.origin;
          window.open(currentOrigin + '/' + encodeURIComponent(targetUrl), '_blank');
      }
  </script>
</body>
</html>`;
}
