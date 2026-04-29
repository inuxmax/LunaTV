/* eslint-disable no-console */
'sử dụng ứng dụng khách';
nhập { Lưu } từ 'lucide-Reac';
nhập { useEffect, useState } từ 'react';

nhập {SectionConfigProps } từ '@/lib/admin.types';
nhập { getAuthInfoFromBrowserCookie } từ '@/lib/auth';

nhập CustomDropdown từ '@/thành phần/CustomDropdown';

nhập ConfigToggle từ '@/app/admin/comComponents/ConfigToggle';
nhập CopyableInput từ '@/app/admin/comComponents/CopyableInput';
nhập { styles, useLoadingState } từ '@/app/admin/comComponents/UIComponents';

giao diện TvBoxConfig {
  bị vô hiệu hóa: boolean;
  đồng bộ hóa: boolean;
  proxyFilterAds: boolean;
  hết hạnGiây: số;
}

xuất hàm mặc định TVBoxSection({
  cấu hình,
  làm mới,
  hiển thị,
  hiển thịLỗi,
  hiển thịThành công,
}: MụcConfigProps) {
  const [tvboxConfig, setTvboxConfig] = useState<TvBoxConfig>({
    bị vô hiệu hóa: config?.TvBoxConfig?.disabled ?? đúng,
    đồng bộ hóa: config?.TvBoxConfig?.sync ?? sai,
    proxyFilterAds: config?.TvBoxConfig?.proxyFilterAds ?? sai,
    hết hạn giây: config?.TvBoxConfig?.expireSeconds ?? 12*60*60,
  });
  const { isLoading, withLoading } = useLoadingState();
  const initCacheTime = tvboxConfig.expireSeconds;
  const [cacheTimeValue, setCacheTimeValue] = useState<number>(() => {
    if (initialCacheTime% 2592000 === 0) trả về initCacheTime/2592000; // tháng
    if (initialCacheTime% 604800 === 0) trả về initCacheTime/604800; // ngày trong tuần
    if (initialCacheTime% 86400 === 0) trả về initCacheTime/86400; // ngày
    if (initialCacheTime % 3600 === 0) trả về initCacheTime / 3600; // giờ
    trả về initCacheTime/60; // phút (mặc định)
  });

  const [cacheTimeUnit, setCacheTimeUnit] = useState<string>(() => {
    if (initialCacheTime % 2592000 === 0) trả về 'tháng';
    if (initialCacheTime % 604800 === 0) trả về 'tuần';
    if (initialCacheTime% 86400 === 0) trả về 'ngày';
    if (initialCacheTime % 3600 === 0) trả về 'giờ';
    trả về 'phút'; // mặc định
  });
  const handUpdateConfig = async () => {
    return withLoading(`TvboxConfig`, async () => {
      thử {
        const resp = đang chờ tìm nạp('/api/admin/tvbox', {
          phương thức: 'BÀI',
          tiêu đề: { 'Content-Type': 'application/json' },
          nội dung: JSON.stringify({ ...tvboxConfig }),
        });
        nếu (!resp.ok) {
          const data = đang chờ resp.json().catch(() => ({}));
          ném Lỗi mới(data.error || `Lưu không thành công: ${resp.status}`);
        }
        nếu (resp.ok) {
          showSuccess('Lưu thành công, vui lòng tải lại trang', showAlert);
          làm mới();
        }
      } bắt (lỗi) {
        showError(err instanceof Error? err.message: 'Lưu không thành công', showAlert);
        ném lỗi;
      }
    });
  };
  const CalculateSeconds = (val: number, unit: string) => {
    hệ số const: Bản ghi<chuỗi, số> = {
      phút: 60,
      giờ: 3600,
      ngày: 86400,
      tuần: 604800,
      tháng: 2592000,
    };
    trả về val * (factors[unit] || 1);
  };
  const handChange = (key: string, value: Any) => {
    setTvboxConfig((prev: Any) => ({ ...prev, [key]: value }));
  };
  const getTvBoxApiUrl = () => {
    const currentUsername = getAuthInfoFromBrowserCookie()?.username || vô giá trị;
    const userMatch = config?.UserConfig.Users.find(
      (u: bất kỳ) => u.tên người dùng === tên người dùng hiện tại
    );
    const userKey = userMatch ? userMatch.key : '';
    return `${window.location.protocol}//${window.location.host}/api/tvbox?k=${userKey}`;
  };
  useEffect(() => {
    đặt giây: số;
    chuyển đổi (cacheTimeUnit) {
      trường hợp 'phút':
        giây = cacheTimeValue * 60;
        phá vỡ;
      trường hợp 'giờ':
        giây = cacheTimeValue * 3600;
        phá vỡ;
      trường hợp 'ngày':
        giây = cacheTimeValue * 86400;
        phá vỡ;
      trường hợp 'tuần':
        giây = cacheTimeValue * 604800;
        phá vỡ;
      trường hợp 'tháng':
        giây = cacheTimeValue * 2592000;
        phá vỡ;
      mặc định:
        giây = cacheTimeValue;
    }
    setTvboxConfig((prev) => ({
      ...trước,
      hết hạnGiây: giây,
    }));
  }, [cacheTimeValue, cacheTimeUnit]);
  trở lại (
    <div className='space-y-8 animate-in slide-in-from-bottom-4 thời lượng-500 pb-32'>
      <div className='lưới lưới-cols-1'>
        {/* chính sách hệ thống */}
        <div className={`${styles.roundedCard}`}>
          <div className='lưới lưới-cols-1 khoảng cách-4'>
            <Cấu hìnhChuyển đổi
              label='Mở TvBox'
              description='Vì giao diện cấu hình không thể được xác thực sau khi được bật, vui lòng không tiết lộ địa chỉ giao diện của bạn cho người lạ. '
              đã bật={!tvboxConfig.disabled}
              onChange={() => handChange('disabled', !tvboxConfig.disabled)}
            />
          </div>
          <div className='lưới lưới-cols-1 khoảng cách-4'>
            <Cấu hìnhChuyển đổi
              label='đồng bộ hóa dữ liệu'
              description='Sau khi bật, nó có thể đồng bộ hóa các bản ghi phát lại, bộ sưu tập và lịch sử tìm kiếm với phiên bản TVBox được sửa đổi kỳ diệu trong Lab'
              đã bật={tvboxConfig.sync}
              onChange={() => handChange('sync', !tvboxConfig.sync)}
            />
          </div>
          <div className='lưới lưới-cols-1 khoảng cách-4'>
            <Cấu hìnhChuyển đổi
              label='Tác nhân M3U8 loại bỏ quảng cáo (thử nghiệm)'
              description='Proxy địa chỉ M3U8 của nguồn phát lại để triển khai lọc quảng cáo'
              đã bật={tvboxConfig.proxyFilterAds}
              onChange={() =>
                handChange('proxyFilterAds', !tvboxConfig.proxyFilterAds)
              }
            />
          </div>

          <div>
            <label className='block text-sm font-in đậm theo dõi chữ hoa-wider text-gray-500 dark:text-gray-400 mb-2 ml-1'>
              Thời hạn hiệu lực của bộ đệm
            </nhãn>
            <div className='flex khoảng cách-2'>
              <đầu vào
                gõ='số'
                phút={0}
                tên lớp={`!w-1/2 ${styles.input}`}
                value={cacheTimeValue}
                onChange={(e) => {
                  const newVal = Số(e.target.value);
                  setCacheTimeValue(newVal);
                  xử lýChange(
                    'hết hạn giây',
                    tính toán Giây(newVal, cacheTimeUnit)
                  );
                }}
              />
              {/* Hộp thả xuống đơn vị thời gian */}
              <Thả xuống tùy chỉnh
                tùy chọn={[
                  { giá trị: 'phút', nhãn: 'phút' },
                  { value: 'giờ', nhãn: 'giờ' },
                  { value: 'ngày', nhãn: 'bầu trời' },
                  { value: 'tuần', nhãn: 'tuần' },
                  { giá trị: 'tháng', nhãn: 'tháng' },
                ]}
                value={cacheTimeUnit}
                onChange={(newUnit: string) => {
                  setCacheTimeUnit(newUnit);
                  xử lýChange(
                    'hết hạn giây',
                    tính toánGiây(cacheTimeValue, newUnit)
                  );
                }}
              />
            </div>

            <p className='text-[11px] text-gray-400 dark:text-gray-500 italic px-1'>
              Đặt thành 0 để tắt bộ nhớ đệm
            </p>
          </div>
          {/* Giao diện cấu hình */}
          <Đầu vào có thể sao chép
            label='giao diện cấu hình'
            value={getTvBoxApiUrl()}
            description='Hãy điền liên kết này vào thanh địa chỉ cấu hình của TVBox'
            readOnly={true}
          />
        </div>
      </div>

      {/* nút lưu */}
      <div className='mt-12 mb-8 flex justify-center md:justify-end'>
        <nút
          onClick={handleUpdateConfig}
          bị vô hiệu hóa={isLoading('TvboxConfig')}
          tên lớp={`flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium transition-all w-full md:w-auto ${
            isLoading('TvboxConfig') ? styles.disabled : styles.success
          } `}
        >
          {isLoading('TvboxConfig') ? (
            <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
          ) : (
            <Save size={16} />
          )}
          {isLoading('TvboxConfig') ? 'Đang lưu...' : 'cứu'}
        </button>
      </div>
    </div>
  );
}
