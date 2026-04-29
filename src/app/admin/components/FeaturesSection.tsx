/* eslint-disable no-console */
'sử dụng ứng dụng khách';
nhập { Lưu } từ 'lucide-Reac';
nhập { useState } từ 'Reac';

nhập {SectionConfigProps } từ '@/lib/admin.types';

nhập ConfigToggle từ '@/app/admin/comComponents/ConfigToggle';
nhập { styles, useLoadingState } từ '@/app/admin/comComponents/UIComponents';

giao diện Tính năngConfig {
  douban: boolean;
  shortDrama: boolean;
  nguồn: boolean;
  trực tiếp: boolean;
}
xuất hàm mặc định FeaturesSection({
  cấu hình,
  làm mới,
  hiển thị,
  hiển thịLỗi,
  hiển thịThành công,
}: MụcConfigProps) {
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>({
    douban: config?.FeaturesConfig?.douban ?? đúng,
    shortDrama: config?.FeaturesConfig?.shortDrama ?? đúng,
    nguồn: config?.FeaturesConfig?.source ?? sai,
    trực tiếp: config?.FeaturesConfig?.live ?? sai,
  });
  const { isLoading, withLoading } = useLoadingState();
  const handUpdateConfig = async () => {
    return withLoading(`TvboxConfig`, async () => {
      thử {
        const resp = đang chờ tìm nạp('/api/admin/features', {
          phương thức: 'BÀI',
          tiêu đề: { 'Content-Type': 'application/json' },
          nội dung: JSON.stringify({ ...featuresConfig }),
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

  const handChange = (key: string, value: Any) => {
    setFeaturesConfig((prev: Any) => ({ ...prev, [key]: value }));
  };

  trở lại (
    <div className='space-y-8 animate-in slide-in-from-bottom-4 thời lượng-500 pb-32'>
      <div className='lưới lưới-cols-1'>
        <div className={`${styles.roundedCard}`}>
          <div className='lưới lưới-cols-1 khoảng cách-4'>
            <Cấu hìnhChuyển đổi
              label='Douban'
              description='Đóng sẽ ảnh hưởng đến dữ liệu menu và trang chủ'
              đã bật={featuresConfig.douban}
              onChange={() => handChange('douban', !featuresConfig.douban)}
            />
            <Cấu hìnhChuyển đổi
              label='Phim ngắn'
              description='Menu tiểu phẩm sẽ không được hiển thị sau khi đóng'
              đã bật={featuresConfig.shortDrama}
              onChange={() =>
                handChange('shortDrama', !featuresConfig.shortDrama)
              }
            />
            <Cấu hìnhChuyển đổi
              label='phát sóng trực tiếp'
              description='Menu phát sóng trực tiếp sẽ không được hiển thị sau khi đóng'
              đã bật={featuresConfig.live}
              onChange={() => handChange('live', !featuresConfig.live)}
            />
            <Cấu hìnhChuyển đổi
              label='nguồn phát'
              description='Menu nguồn phát lại sẽ không được hiển thị sau khi đóng'
              đã bật={featuresConfig.source}
              onChange={() => handChange('source', !featuresConfig.source)}
            />
          </div>
        </div>
      </div>

      {/* nút lưu */}
      <div className='mt-12 mb-8 flex justify-center md:justify-end'>
        <button
          onClick={handleUpdateConfig}
          disabled={isLoading('TvboxConfig')}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium transition-all w-full md:w-auto ${
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
