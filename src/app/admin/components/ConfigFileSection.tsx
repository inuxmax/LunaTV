/* eslint-disable no-console */
'sử dụng ứng dụng khách';

nhập { FileJson, RefreshCw, Save } từ 'lucide-Reac';
nhập { useState } từ 'Reac';

nhập {SectionConfigProps } từ '@/lib/admin.types';

nhập ConfigToggle từ '@/app/admin/comComponents/ConfigToggle';
nhập CopyableInput từ '@/app/admin/comComponents/CopyableInput';

nhập { styles, useLoadingState } từ './UIComponents';

xuất hàm mặc định SiteSection({
  cấu hình,
  làm mới,
  hiển thị,
  hiển thịLỗi,
  hiển thịThành công,
}: MụcConfigProps) {
  const [configFile, setConfigFile] = useState(config?.ConfigFile || '');
  const [configSubscribe, setConfigSubscribe] = useState(
    config?.ConfigĐăng ký
  );
  const [lastCheckTime, setLastCheckTime] = useState<string>(
    config?.ConfigSubscribe.LastCheck || ''
  );
  const { isLoading, withLoading } = useLoadingState();
  const [tìm nạp, setFetching] = useState(false);

  const handChange = (key: string, value: Any) => {
    if (khóa === 'ConfigFile') {
      setConfigFile(giá trị);
    } khác {
      setConfigSubscribe((prev: Any) => ({ ...prev, [key]: value }));
    }
  };

  const handUpdateConfig = async () => {
    return withLoading(`ConfigFile`, async () => {
      thử {
        const res = đang chờ tìm nạp('/api/admin/config_file', {
          phương thức: 'BÀI',
          tiêu đề: { 'Content-Type': 'application/json' },
          nội dung: JSON.stringify({
            configFile: configFile,
            đăng kýUrl: configĐăng ký?.URL,
            autoUpdate: configSubscribe?.AutoUpdate,
            LastCheckTime: LastCheckTime || Ngày mới().toISOString(),
          }),
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

  const handFetchConfig = async () => {
    if (!configSubscribe?.URL.trim()) {
      showError('Vui lòng nhập URL đăng ký', showAlert);
      trở lại;
    }
    setFetching(true);
    thử {
      const resp = đang chờ tìm nạp('/api/admin/config_subscription/fetch', {
        phương thức: 'BÀI',
        tiêu đề: { 'Content-Type': 'application/json' },
        nội dung: JSON.stringify({ url: configSubscribe.URL.trim() }),
      });
      nếu (!resp.ok) {
        const data = đang chờ resp.json().catch(() => ({}));
        ném Lỗi mới(data.error || `Kéo không thành công: ${resp.status}`);
      }
      dữ liệu const = đang chờ resp.json();
      if (data.configContent) {
        setConfigFile(data.configContent);
        const currentTime = new Date().toISOString();
        setLastCheckTime(currentTime);
        showSuccess('Cấu hình kéo thành công', showAlert);
      }
    } bắt (e) {
      showError(e instanceof Error ? e.message : 'Kéo không thành công', showAlert);
      ném e;
    } cuối cùng {
      setFetching(false);
    }
  };

  trở lại (
    <div className='space-y-8 animate-in slide-in-from-bottom-4 thời lượng-500 pb-32'>
      <div className='lưới lưới-cols-1 lg:grid-cols-2 khoảng cách-8'>
        <div className='space-y-8'>
          {/* Định cấu hình thẻ đăng ký */}
          <div className='p-6 bg-white/50 dark:bg-gray-800/20 backdrop-blur-sm border border-gray-200/50 dark:border-white/5 rounded-3xl space-y-6'>
            <div className='flex flex-col sm:flex-row sm:items-center gap-2 mb-2'>
              <div className='flex items-center gap-2'>
                <RefreshCw className='text-emerald-500 w-5 h-5' />
                <h3 className='font-bold dark:text-white text-lg'>Định cấu hình đăng ký</h3>
              </div>

              <div className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 sm:px-3 py-1.5 rounded-full bg-gray-100/50 dark:bg-white/5 sm:bg-transparent w-fit'>
                Cập nhật lần cuối:{' '}
                {lastCheckTime
                  ? new Date(lastCheckTime).toLocaleString('zh-CN')
                  : 'Không bao giờ cập nhật'}
              </div>
            </div>

            <div className='space-y-5'>
              <div>
                <CopyableInput
                  label='URL đăng ký'
                  value={configSubscribtion?.URL || ''}
                  description='Nhập địa chỉ đăng ký của file cấu hình, yêu cầu định dạng JSON và sử dụng mã hóa Base58'
                  placeholder='https://example.com/config.txt'
                  onChange={(val) => handleChange('URL', val)}
                  readOnly={false}
                />
                <div className='pt-2'>
                  <button
                    onClick={handleFetchConfig}
                    disabled={fetching || !configSubscribtion?.URL}
                    className={`w-full px-6 py-3 rounded-lg text-sm font-medium transition-all duration-2000 ${
                      fetching ? styles.disabled : styles.success
                    }`}
                  >
                    {đang tìm nạp? (
                      <div className='flex items-center biện minh-center Gap-2'>
                        <div className='w-4 h-4 border-2 border-white border-t-transparent round-full animate-spin'></div>
                        Đang truy xuất…
                      </div>
                    ) : (
                      'Kéo cấu hình'
                    )}
                  </button>
                </div>
              </div>

              <Cấu hìnhChuyển đổi
                label='tự động cập nhật'
                description='Sau khi kích hoạt, hệ thống sẽ tự động lấy cấu hình mới nhất thường xuyên'
                đã bật={configSubscribe?.AutoUpdate || sai}
                onChange={() =>
                  handChange('AutoUpdate', !configSubscribe?.AutoUpdate)
                }
              />
            </div>
          </div>
        </div>

        {/* Bên phải: Khu vực soạn thảo JSON */}
        <div className='p-6 bg-white/50 dark:bg-gray-800/20 phông nền-blur-sm viền border-gray-200/50 dark:border-white/5 round-3xl space-y-6 flex flex-col'>
          <div className='flex items-center biện minh-giữa'>
            <div className='flex items-center Gap-2'>
              <FileJson className='text-blue-500 w-5 h-5' />
              <h3 className='font-bold dark:text-white text-lg'>
                Nội dung tập tin cấu hình
              </h3>
            </div>
            <span className='text-[10px] bg-blue-500/10 text-blue-500 px-2 py-1 chữ hoa tròn-lg font-bold'>
              Chế độ JSON
            </span>
          </div>

          <div className='nhóm flex-1 tương đối'>
            <vùng văn bản
              value={configFile || ''}
              onChange={(e) => handChange('ConfigFile', e.target.value)}
              hàng={22}
              kiểm tra chính tả={false}
              tên lớp={`${styles.input} !rounded-2xl text-[13px] leading-relaxed resize-none h-[500px] transition-all border-blue-500/10 focus:border-blue-500/30 dark:bg-black/20`}
              placeholder='Vui lòng nhập nội dung file cấu hình...'
            />
          </div>
          <p className='text-[11px] text-gray-400 italic'>
            Hỗ trợ định dạng JSON để định cấu hình nguồn video và phân loại tùy chỉnh
          </p>
        </div>
      </div>

      {/* nút lưu */}
      <div className='mt-12 mb-8 flex justify-center md:justify-end'>
        <nút
          onClick={handleUpdateConfig}
          bị vô hiệu hóa={isLoading('ConfigFile')}
          tên lớp={`flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium transition-all w-full md:w-auto ${
            isLoading('ConfigFile') ? styles.disabled : styles.success
          } `}
        >
          {isLoading('ConfigFile') ? (
            <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
          ) : (
            <Save size={16} />
          )}
          {isLoading('ConfigFile') ? 'Đang lưu...' : 'cứu'}
        </button>
      </div>
    </div>
  );
}
