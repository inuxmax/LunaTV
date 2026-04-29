/* eslint-disable no-console */
'sử dụng ứng dụng khách';

nhập {ExternalLink, Globe, Link2, Save, ShieldCheck } từ 'lucide-react';
nhập { useState } từ 'Reac';

nhập {SectionConfigProps } từ '@/lib/admin.types';

nhập CustomDropdown từ '@/thành phần/CustomDropdown';

nhập ConfigToggle từ '@/app/admin/comComponents/ConfigToggle';
nhập { styles, useLoadingState } từ '@/app/admin/comComponents/UIComponents';

// Tùy chọn mặc định proxy Douban
const DOUBAN_PROXIES = [
  { value: 'direct', label: 'Kết nối trực tiếp (máy chủ yêu cầu trực tiếp Douban)' },
  { value: 'cors-proxy-zwei', nhãn: 'Cors Proxy của Zwei' },
  { value: 'cmliussss-cdn-tencent', nhãn: 'Douban CDN của CMLiussss (Tencent Cloud)' },
  { value: 'cmliussss-cdn-ali', nhãn: 'Douban CDN của CMLiussss (Đám mây Alibaba)' },
  { value: 'custom', nhãn: 'tác nhân tùy chỉnh' },
];

const DOUBAN_IMAGE_PROXIES = [
  { value: 'direct', label: 'Kết nối trực tiếp (trình duyệt yêu cầu trực tiếp Douban)', bị vô hiệu hóa: true },
  { value: 'server', label: 'Proxy máy chủ (proxy máy chủ yêu cầu Douban)' },
  { value: 'img3', label: 'CDN cao cấp chính thức của Douban (Đám mây Alibaba)' },
  { value: 'cmliussss-cdn-tencent', nhãn: 'Douban CDN của CMLiussss (Tencent Cloud)' },
  { value: 'cmliussss-cdn-ali', nhãn: 'Douban CDN của CMLiussss (Đám mây Alibaba)' },
  { value: 'custom', nhãn: 'tác nhân tùy chỉnh' },
];

xuất hàm mặc định SiteSection({
  cấu hình,
  làm mới,
  hiển thịLỗi,
  hiển thị,
  hiển thịThành công,
}: MụcConfigProps) {
  const [siteConfig, setSiteConfig] = useState(config?.SiteConfig);
  const { isLoading, withLoading } = useLoadingState();

  const handUpdateConfig = async () => {
    return withLoading(`SiteConfig`, async () => {
      thử {
        const res = đang chờ tìm nạp('/api/admin/site', {
          phương thức: 'BÀI',
          tiêu đề: { 'Content-Type': 'application/json' },
          nội dung: JSON.stringify({ ...siteConfig }),
        });
        nếu (res.ok) {
          showSuccess('Lưu thành công, vui lòng tải lại trang', showAlert);
          làm mới();
        }
      } bắt (lỗi) {
        showError(err instanceof Error? err.message: 'Thao tác thất bại', showAlert);
        ném lỗi;
      }
    });
  };
  const handChange = (key: string, value: Any) => {
    setSiteConfig((prev: Any) => ({ ...prev, [key]: value }));
  };
  trở lại (
    <div className='space-y-8 animate-in slide-in-from-bottom-4 thời lượng-500 pb-32'>
      <div className='lưới lưới-cols-1 lg:grid-cols-2 khoảng cách-8'>
        <div className='space-y-8'>
          {/* Cài đặt cơ bản */}
          <div className={`${styles.roundedCard}`}>
            <div className='flex items-center Gap-2 mb-2'>
              <Globe className='text-green-500 w-5 h-5' />
              <h3 className='font-bold dark:text-white text-lg'>Cài đặt cơ bản</h3>
            </div>
            <div className='space-y-5'>
              <div>
                <label className='block text-sm font-in đậm theo dõi chữ hoa-wider text-gray-500 dark:text-gray-400 mb-2 ml-1'>
                  Tên trang web
                </nhãn>
                <đầu vào
                  className={styles.input}
                  value={siteConfig?.SiteName}
                  onChange={(e) => handChange('SiteName', e.target.value)}
                />
              </div>
              <div>
                <label className='block text-sm font-in đậm theo dõi chữ hoa-wider text-gray-500 dark:text-gray-400 mb-2 ml-1'>
                  Thông báo trang web
                </nhãn>
                <vùng văn bản
                  tên lớp={`${styles.input} !rounded-2xl h-32 resize-none transition-all`}
                  value={siteConfig?.Thông báo}
                  onChange={(e) => handChange('Thông báo', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Cài đặt Douban */}
          <div className={`${styles.roundedCard}`}>
            <div className='flex items-center Gap-2'>
              <Link2 className='text-green-500 w-5 h-5' />
              <h3 className='font-bold dark:text-white text-lg'>
                Đại lý dữ liệu Douban
              </h3>
            </div>
            <div className='lưới lưới-cols-1 md:grid-cols-2 khoảng cách-6'>
              {/* Proxy giao diện dữ liệu */}
              <div className='space-y-2'>
                <label className='block text-xs font-in đậm theo dõi chữ hoa-wider text-gray-500 dark:text-gray-400 ml-1'>
                  proxy giao diện dữ liệu
                </nhãn>
                <Thả xuống tùy chỉnh
                  tùy chọn={DOUBAN_PROXIES}
                  value={siteConfig?.DoubanProxyType || ''}
                  onChange={(val: string) =>
                    handChange('DoubanProxyType', val)
                  }
                  className='w-full'
                />
                {siteConfig?.DoubanProxyType === 'tùy chỉnh' && (
                  <đầu vào
                    placeholder='Vui lòng nhập địa chỉ proxy dữ liệu tùy chỉnh'
                    tên lớp={`${styles.input} !text-[11px] !py-1.5 animate-in fade-in zoom-in-95 duration-200`}
                    value={siteConfig.DoubanProxy || ''}
                    onChange={(e) =>
                      handChange('CustomDoubanProxy', e.target.value)
                    }
                  />
                )}
                <p className='text-[11px] text-gray-400 dark:text-gray-500 italic px-1'>
                  Chọn cách lấy dữ liệu Douban
                </p>
              </div>

              {/* Cơ quan hình ảnh Douban */}
              <div className='space-y-2'>
                <label className='block text-xs font-in đậm theo dõi chữ hoa-wider text-gray-500 dark:text-gray-400 ml-1'>
                  Hãng ảnh Douban
                </nhãn>
                <Thả xuống tùy chỉnh
                  tùy chọn={DOUBAN_IMAGE_PROXIES}
                  value={siteConfig?.DoubanImageProxyType || ''}
                  onChange={(val: string) =>
                    handChange('DoubanImageProxyType', val)
                  }
                  className='w-full'
                />
                {siteConfig?.DoubanImageProxyType === 'tùy chỉnh' && (
                  <đầu vào
                    placeholder='Vui lòng nhập địa chỉ đại lý hình ảnh tùy chỉnh'
                    tên lớp={`${styles.input} !text-[11px] !py-1.5 animate-in fade-in zoom-in-95 duration-200`}
                    value={siteConfig?.DoubanImageProxy || ''}
                    onChange={(e) =>
                      handChange('CustomDoubanImageProxy', e.target.value)
                    }
                  />
                )}
                <p className='text-[11px] text-gray-400 dark:text-gray-500 italic px-1'>
                  Chọn cách lấy ảnh Douban
                </p>
              </div>
            </div>
            <div className='pt-0 mt-1 space-y-2'>
              <div className='px-1 flex items-center Gap-2'>
                <span className='text-[10px] font-in đậm theo dõi chữ hoa-wider text-gray-400 dark:text-gray-500'>
                  Cảm ơn:
                </span>
                <div className='flex items-center Gap-3'>
                  <a
                    href='https://github.com/cmliu'
                    mục tiêu='_blank'
                    rel='noopener noreferrer'
                    className='text-[11px] text-green-600/80 di chuột:text-green-500 dark:text-green-400/80 transition-colors flex items-center Gap-1'
                  >
                    @CMLiussss <Kích thước liên kết bên ngoài={10} />
                  </a>
                  <a
                    href='https://douban.com'
                    mục tiêu='_blank'
                    rel='noopener noreferrer'
                    className='text-[11px] text-green-600/80 di chuột:text-green-500 dark:text-green-400/80 transition-colors flex items-center Gap-1'
                  >
                    Phim Douban <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* chính sách hệ thống */}
        <div className={`${styles.roundedCard}`}>
          <div className='flex items-center Gap-2 mb-2'>
            <ShieldCheck className='text-green-500 w-5 h-5' />
            <h3 className='font-bold dark:text-white text-lg'>Chính sách hệ thống</h3>
          </div>
          <div className='lưới lưới-cols-1 khoảng cách-4'>
            <div>
              <label className='block text-sm font-in đậm theo dõi chữ hoa-wider text-gray-500 dark:text-gray-400 mb-2 ml-1'>
                Số lượng trang tối đa mà giao diện tìm kiếm có thể kéo
              </nhãn>
              <đầu vào
                gõ='số'
                phút={1}
                className={styles.input}
                value={siteConfig?.SearchDownstreamMaxPage}
                onChange={(e) =>
                  handChange('SearchDownstreamMaxPage', e.target.value)
                }
              />
            </div>
            <div>
              <label className='block text-sm font-in đậm theo dõi chữ hoa-wider text-gray-500 dark:text-gray-400 mb-2 ml-1'>
                Thời gian lưu vào bộ đệm giao diện trang web (giây)
              </nhãn>
              <đầu vào
                gõ='số'
                phút={1}
                className={styles.input}
                value={siteConfig?.SiteInterfaceCacheTime}
                onChange={(e) =>
                  handChange('SiteInterfaceCacheTime', e.target.value)
                }
              />
            </div>
            <Cấu hìnhChuyển đổi
              label='Tắt bộ lọc màu vàng'
              description='Tắt tính năng lọc nội dung khiêu dâm'
              đã bật={siteConfig?.DisableYellowFilter || sai}
              onChange={() =>
                xử lýChange(
                  'Vô hiệu hóaYellowFilter',
                  !siteConfig?.DisableYellowFilter
                )
              }
            />
            <Cấu hìnhChuyển đổi
              label='Mở đăng ký'
              description='Cho phép khách mới đăng ký tài khoản của riêng họ'
              đã bật={siteConfig?.OpenRegister || sai}
              onChange={() =>
                handChange('OpenRegister', !siteConfig?.OpenRegister)
              }
            />
            <Cấu hìnhChuyển đổi
              label='Tìm kiếm trực tuyến'
              description='Sau khi bật nó lên, các kết quả tìm kiếm sẽ được hiển thị lần lượt và hiển thị theo thời gian thực'
              đã bật={siteConfig?.FluidSearch || đúng}
              onChange={() =>
                handChange('FluidSearch', !siteConfig?.FluidSearch)
              }
            />
          </div>
        </div>
      </div>

      {/* nút lưu */}
      <div className='mt-12 mb-8 flex justify-center md:justify-end'>
        <nút
          onClick={handleUpdateConfig}
          bị vô hiệu hóa={isLoading('SiteConfig')}
          tên lớp={`
      flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium transition-all
      w-full md:w-auto ${
        isLoading('SiteConfig') ? styles.disabled : styles.success
      }
    `}
        >
          {isLoading('SiteConfig') ? (
            <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
          ) : (
            <Save size={16} />
          )}
          {isLoading('SiteConfig') ? 'Đang lưu...' : 'cứu'}
        </button>
      </div>
    </div>
  );
}
