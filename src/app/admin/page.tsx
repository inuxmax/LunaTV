/* eslint-disable no-console */
'sử dụng ứng dụng khách';

nhập khẩu {
  hộp,
  Cơ sở dữ liệu,
  văn bản tập tin,
  Thư mụcMở,
  Bố cụcBảng điều khiển,
  Cài đặt,
  ToggleRight,
  truyền hình,
  Người dùng,
  Video,
} từ 'phản ứng sáng suốt';
nhập { Suspense, useCallback, useEffect, useState } từ 'react';
nhập { createPortal } từ 'Reac-dom';

nhập { AdminConfig, AdminConfigResult } từ '@/lib/admin.types';

nhập DataMigration từ '@/thành phần/DataMigration';
nhập PageLayout từ '@/comComponents/PageLayout';

nhập CategorySection từ '@/app/admin/comComponents/CategorySection';
nhập ConfigFile từ '@/app/admin/comComponents/ConfigFileSection';
nhập Phần tính năng từ '@/app/admin/comComponents/FeaturesSection';
nhập LiveSourceSection từ '@/app/admin/comComponents/LiveSourceSection';
nhập SiteSection từ '@/app/admin/comComponents/SiteSection';
nhập SourceSection từ '@/app/admin/comComponents/SourceSection';
nhập TVBoxSection từ '@/app/admin/comComponents/TVBoxSection';
nhập khẩu {
  AlertModal,
  hiển thịLỗi,
  hiển thịThành công,
  phong cách,
  sử dụngAlertModal,
  sử dụngLoadingState,
} từ '@/app/admin/thành phần/UIComponents';
nhập UserSection từ '@/app/admin/comComponents/UserSection';

hàm AdminPageClient() {
  const [config, setConfig] = useState<AdminConfig | null>(null);
  const [lỗi, setError] = useState<string | null>(null);
  const { isLoading, withLoading } = useLoadingState();
  const [showResetConfigModal, setShowResetConfigModal] = useState(false);
  const [vai trò, setRole] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('');
  const { cảnh báoModal, showAlert, ẩnAlert } = useAlertModal();
  useEffect(() => {
    const đã lưuTab = localStorage.getItem('admin_active_tab');
    nếu (savedTab) {
      setActiveTab(savedTab);
    } khác {
      setActiveTab('trang web');
    }
  }, []);
  useEffect(() => {
    nếu (Tab hoạt động) {
      localStorage.setItem('admin_active_tab', activeTab);
    }
  }, [activeTab]);

  const getConfig = useCallback(async() => {
    return withLoading(`FetchConfig`, async () => {
      thử {
        const resp = đang chờ tìm nạp('/api/admin/config');
        const data = (await resp.json()) as AdminConfigResult;
        nếu (dữ liệu) {
          setConfig(data.Config);
          setRole(data.Role);
        }
      } bắt (lỗi) {
        const msg = err instanceof Lỗi? err.message: 'Không lấy được cấu hình';
        showError(tin nhắn, showAlert);
        setError(tin nhắn);
      }
    });
  }, [withLoading, showAlert]);
  useEffect(() => {
    tìm nạpConfig();
    /* eslint-disable-next-line Reac-hooks/exhaustive-deps */
  }, []);

  const handleResetConfig = () => {
    setShowResetConfigModal(true);
  };

  const handleConfirmResetConfig = async () => {
    await withLoading('resetConfig', không đồng bộ () => {
      thử {
        const phản hồi = đang chờ tìm nạp(`/api/admin/reset`);
        nếu (!response.ok) {
          ném Lỗi mới(`Đặt lại không thành công: ${response.status}`);
        }
        showThành công('重置成功，请刷新页面！', showAlert);
        await fetchConfig();
        setShowResetConfigModal(false);
      } catch (err) {
        showError(err instanceof Error ? err.message : 'Đặt lại không thành công', showAlert);
        throw err;
      }
    });
  };
  const tabs = [
    { id: 'configFile', label: 'Tệp cấu hình', icon: <FileText size={16} /> },
    { id: 'site', label: 'Cấu hình trang web', icon: <Settings size={16} /> },
    { id: 'toggles', label: 'Cấu hình chức năng', icon: <ToggleRight size={16} /> },
    { id: 'user', label: 'Quyền của người dùng', icon: <Users size={16} /> },
    { id: 'source', label: 'Cấu hình nguồn video', icon: <Video size={16} /> },
    { id: 'liveSource', label: 'Cấu hình nguồn trực tiếp', icon: <Tv size={16} /> },
    { id: 'tvbox', label: 'Cấu hình TVBox', icon: <Box size={16} /> },
    { id: 'category', label: 'Cấu hình phân loại', icon: <FolderOpen size={16} /> },
    { id: 'migration', label: 'Di chuyển bản sao lưu', icon: <Database size={16} /> },
  ];
  const SectionSkeleton = () => (
    <div className='animate-pulse space-y-8'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Mô phỏng hai thẻ cấu hình chính */}
        {[1, 2].map((i) => (
          <div
            khóa={i}
            tên lớp='p-6 bg-gray-100/50 dark:bg-gray-800/20 border border-gray-200/50 dark:border-white/5 rounded-3xl space-y-6'
          >
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full' />
              <div className='h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg' />
            </div>
            <div className='space-y-4'>
              <div className='h-16 w-full bg-gray-200/50 dark:bg-gray-700/30 rounded-2xl' />
              <div className='h-32 w-full bg-gray-200/50 dark:bg-gray-700/30 rounded-2xl' />
            </div>
          </div>
        ))}
      </div>
      {/* Mô phỏng nút lưu bên dưới */}
      <div className='mt-12 flex justify-center md:justify-end'>
        <div className='h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded-xl' />
      </div>
    </div>
  );
  if (isLoading('FetchConfig')) {
    return (
      <PageLayout activePath='/admin'>
        {/* Điều chỉnh chiều rộng vùng chứa thành max-w-7xl (1280px) hoặc chiều rộng tùy chỉnh */}
        <div className='mx-auto pb-10 px-4 sm:px-8 lg:px-12 max-w-[1440px]'>
          {/* khu vực tiêu đề */}
          <div className='pt-8 pb-4 flex items-center gap-3'>
            <div className='flex items-center gap-3'>
              <div className='p-2.5 bg-emerald-500/10 rounded-xl'>
                <LayoutDashboard className='text-emerald-500 w-7 h-7' />
              </div>
              <h1 className='text-2xl font-bold dark:text-white text-gray-900 tracking-tight'>
                管理面板
              </h1>
            </div>
            {/* Nút đặt lại */}
            <button
              onClick={handleResetConfig}
              className={`${styles.dangerSmall}`}
            >
              <span>Đặt lại cấu hình</span>
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }
  nếu (lỗi) {
    // Lỗi đã được hiển thị thông qua cửa sổ bật lên và trống được trả về trực tiếp tại đây.
    trả về giá trị rỗng;
  }
  trở lại (
    <PageLayout activePath='/admin'>
      {/* Điều chỉnh chiều rộng vùng chứa thành max-w-7xl (1280px) hoặc chiều rộng tùy chỉnh */}
      <div className='mx-auto pb-10 px-4 sm:px-8 lg:px-12 max-w-[1440px]'>
        {/* khu vực tiêu đề */}
        <div className='pt-8 pb-4 flex items-center Gap-3'>
          <div className='flex items-center Gap-3'>
            <div className='p-2.5 bg-emerald-500/10 round-xl'>
              <LayoutDashboard className='text-emerald-500 w-7 h-7' />
            </div>
            <h1 className='text-2xl font-bold dark:text-white text-gray-900 track-tight'>
              Bảng quản trị
            </h1>
          </div>
          {/* Nút đặt lại */}
          <nút
            onClick={handleResetConfig}
            tên lớp={`${styles.dangerSmall}`}
          >
            <span>Đặt lại cấu hình</span>
          </button>
        </div>

        {/*Tab trên cùng: thiết kế thích ứng với toàn bộ chiều rộng */}
        <div className='sticky top-0 z-30 bg-trong suốt phông nền-blur-md pt-2 pb-6'>
          <div className='overflow-x-auto không có thanh cuộn touch-pan-x overscroll-contain'>
            <div className='inline-flex items-center Gap-2 p-1.5 bg-gray-200/40 dark:bg-gray-800/45 border border-gray-200/50 dark:border-white/5 round-2xl min-w-max'>
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                trở lại (
                  <nút
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    tên lớp={`
                      relative flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl whitespace-nowrap
                      ${
                        isActive
                          ? 'text-emerald-600 dark:text-emerald-400 bg-white dark:bg-gray-700 shadow-[0_4px_14px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] ring-1 ring-black/5 dark:ring-white/10'
                          : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-300/40 dark:hover:bg-white/5'
                      }
                    `}
                  >
                    <span
                      className={`transition-all duration-300 ${
                        isActive
                          ? 'scale-110 opacity-100 text-emerald-500'
                          : 'opacity-60'
                      }`}
                    >
                      {tab.icon}
                    </span>
                    <span className='relative z-10'>{tab.label</span>

                    {isActive && (
                      <span className='absolute inset-0 round-xl bg-emerald-500/[0.02] dark:bg-emerald-400/[0.02] con trỏ-sự kiện-none' />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Khu vực nội dung chính */}
        <div className='min-h-[400px]'>
          {!cấu hình ? (
            <SectionSkeleton /> // Hiển thị bộ xương khi dữ liệu không được tải
          ) : (
            <div className='animate-in fade-in slide-in-from-bottom-2 thời lượng-500'>
              {activeTab === 'configFile' && (
                <Tệp cấu hình
                  cấu hình={cấu hình}
                  vai trò={vai trò}
                  làm mới={tìm nạpConfig}
                  showAlert={showAlert}
                  showError={showError}
                  showThành công={showThành công}
                />
              )}
              {activeTab === 'trang web' && (
                <Phần trang web
                  cấu hình={cấu hình}
                  vai trò={vai trò}
                  làm mới={tìm nạpConfig}
                  showAlert={showAlert}
                  showError={showError}
                  showThành công={showThành công}
                />
              )}
              {activeTab === 'chuyển đổi' && (
                <Phần tính năng
                  cấu hình={cấu hình}
                  vai trò={vai trò}
                  làm mới={tìm nạpConfig}
                  showAlert={showAlert}
                  showError={showError}
                  showThành công={showThành công}
                />
              )}
              {activeTab === 'người dùng' && (
                <Phần người dùng
                  cấu hình={cấu hình}
                  vai trò={vai trò}
                  làm mới={tìm nạpConfig}
                  showAlert={showAlert}
                  showError={showError}
                  showThành công={showThành công}
                />
              )}
              {activeTab === 'nguồn' && (
                <Phần nguồn
                  cấu hình={cấu hình}
                  vai trò={vai trò}
                  làm mới={tìm nạpConfig}
                  showAlert={showAlert}
                  showError={showError}
                  showThành công={showThành công}
                />
              )}
              {activeTab === 'liveSource' && (
                <Phần nguồn trực tiếp
                  cấu hình={cấu hình}
                  vai trò={vai trò}
                  làm mới={tìm nạpConfig}
                  showAlert={showAlert}
                  showError={showError}
                  showThành công={showThành công}
                />
              )}
              {activeTab === 'danh mục' && (
                <Phần danh mục
                  cấu hình={cấu hình}
                  vai trò={vai trò}
                  làm mới={tìm nạpConfig}
                  showAlert={showAlert}
                  showError={showError}
                  showThành công={showThành công}
                />
              )}
              {activeTab === 'tvbox' && (
                <Phần TVBox
                  cấu hình={cấu hình}
                  vai trò={vai trò}
                  làm mới={tìm nạpConfig}
                  showAlert={showAlert}
                  showError={showError}
                  showThành công={showThành công}
                />
              )}
              {activeTab === 'di chuyển' && <DataMigration />}
              {activeTab === '' && <div>Đang tải...</div>}
            </div>
          )}
        </div>
      </div>

      <AlertModal {...alertModal} onClose={hideAlert} />
      {/* Đặt lại cửa sổ bật lên xác nhận cấu hình */}
      {showResetConfigModal &&
        createPortal(
          <div
            className='đã sửa lỗi inset-0 bg-black bg-opacity-50 z-50 flex items-center biện minh-center p-4'
            onClick={() => setShowResetConfigModal(false)}
          >
            <div
              className='bg-white dark:bg-gray-800 round-lg Shadow-xl max-w-2xl w-full'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='p-6'>
                <div className='flex items-center biện minh-giữa mb-6'>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                    Xác nhận đặt lại cấu hình
                  </h3>
                  <nút
                    onClick={() => setShowResetConfigModal(false)}
                    className='text-gray-400 di chuột:text-gray-600 dark:hover:text-gray-300 màu chuyển tiếp'
                  >
                    <svg
                      className='w-6 h-6'
                      điền='không'
                      đột quỵ='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <đường dẫn
                        nétLinecap='vòng'
                        StrokeLinejoin='vòng'
                        đột quỵWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>

                <div className='mb-6'>
                  <div className='bg-vàng-50 tối:bg-vàng-900/20 viền viền-vàng-200 tối:viền-vàng-800 round-lg p-4 mb-4'>
                    <div className='flex items-center space-x-2 mb-2'>
                      <svg
                        className='w-5 h-5 văn bản-vàng-600 tối: văn bản-vàng-400'
                        điền='không'
                        đột quỵ='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <đường dẫn
                          nétLinecap='vòng'
                          StrokeLinejoin='vòng'
                          đột quỵWidth={2}
                          d='M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                      <span className='text-sm font-medium text- yellow-800 dark:text- yellow-300'>
                        ⚠️Cảnh báo vận hành nguy hiểm
                      </span>
                    </div>
                    <p className='text-sm text- yellow-700 dark:text- yellow-400'>
                      Hành động này sẽ đặt lại các lệnh cấm người dùng và cài đặt quản trị viên, nguồn video tùy chỉnh và cấu hình trang web về mặc định. Bạn có muốn tiếp tục không?
                    </p>
                  </div>
                </div>

                {/* Nút thao tác */}
                <div className='flexjustify-end space-x-3'>
                  <nút
                    onClick={() => setShowResetConfigModal(false)}
                    tên lớp={`px-6 py-2.5 text-sm font-medium ${styles.secondary}`}
                  >
                    Hủy bỏ
                  </button>
                  <nút
                    onClick={handleConfirmResetConfig}
                    bị vô hiệu hóa={isLoading('resetConfig')}
                    tên lớp={`px-6 py-2.5 text-sm font-medium ${
                      isLoading('resetConfig') ? styles.disabled : styles.danger
                    }`}
                  >
                    {isLoading('resetConfig') ? 'Đặt lại...' : 'Xác nhận đặt lại'}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </PageLayout>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={null}>
      <AdminPageClient />
    </Suspense>
  );
}
