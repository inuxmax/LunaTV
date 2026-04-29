/* eslint-disable no-console */
'use client';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Hệ thống phong cách thống nhất
xuất kiểu const = {
  // Nút thao tác chính (màu xanh) - được sử dụng để cấu hình, cài đặt, xác nhận, v.v.
  chính:
    'px-3 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors',
  // Nút thao tác thành công (màu xanh lá cây) - dùng để thêm, bật, lưu, v.v.
  thành công:
    'px-3 py-1.5 text-sm font-medium bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-lg transition-colors',
  // Nút hành động nguy hiểm (màu đỏ) - dùng để xóa, vô hiệu hóa, đặt lại, v.v.
  nguy hiểm:
    'px-3 py-1.5 text-sm font-medium bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg transition-colors',
  // Nút hành động phụ (màu xám) - dùng để hủy, đóng, v.v.
  thứ cấp:
    'px-3 py-1.5 text-sm font-medium bg-gray-600 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-700 text-white rounded-lg transition-colors',
  // Nút hành động cảnh báo (màu vàng) - được sử dụng để vô hiệu hóa hàng loạt, v.v.
  cảnh báo:
    'px-3 py-1.5 text-sm font-medium bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white rounded-lg transition-colors',
  // Nút chính có kích thước nhỏ
  chínhNhỏ:
    'px-2 py-1 text-xs font-medium bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md transition-colors',
  // Nút thành công kích thước nhỏ
  thành côngNhỏ:
    'px-2 py-1 text-xs font-medium bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-md transition-colors',
  // nút nguy hiểm nhỏ
  nguy hiểmNhỏ:
    'px-2 py-1 text-xs font-medium bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-md transition-colors',
  // Nút phụ kích thước nhỏ
  thứ cấpNhỏ:
    'px-2 py-1 text-xs font-medium bg-gray-600 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-700 text-white rounded-md transition-colors',
  // Nút cảnh báo kích thước nhỏ
  cảnh báoNhỏ:
    'px-2 py-1 text-xs font-medium bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white rounded-md transition-colors',
  // Nút tròn nhỏ (để thao tác với bảng)
  làm trònPrimary:
    'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/40 dark:hover:bg-blue-900/60 dark:text-blue-200 transition-colors',
  roundedSuccess:
    'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/40 dark:hover:bg-green-900/60 dark:text-green-200 transition-colors',
  roundedDanger:
    'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60 dark:text-red-200 transition-colors',
  roundedSecondary:
    'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700/40 dark:hover:bg-gray-700/60 dark:text-gray-200 transition-colors',
  roundedWarning:
    'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/40 dark:hover:bg-yellow-900/60 dark:text-yellow-200 transition-colors',
  roundedPurple:
    'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/40 dark:hover:bg-purple-900/60 dark:text-purple-200 transition-colors',
  // trạng thái vô hiệu hóa
  bị vô hiệu hóa:
    'px-3 py-1.5 text-sm font-medium bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-white rounded-lg transition-colors',
  disabledSmall:
    'px-2 py-1 text-xs font-medium bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-white rounded-md transition-colors',
  // Chuyển đổi kiểu nút
  bật tắt: 'bg-green-600 dark:bg-green-600',
  toggleOff: 'bg-gray-200 dark:bg-gray-700',
  toggleThumb: 'bg-white',
  toggleThumbOn: 'translate-x-6',
  toggleThumbOff: 'translate-x-1',
  // Kiểu nút hành động nhanh
  hành động nhanh:
    'px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors',
  input:
    'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent',
  roundedCard:
    'relative z-40 p-6 bg-white/50 dark:bg-gray-800/20 backdrop-blur-sm border border-gray-200/50 dark:border-white/5 rounded-3xl space-y-6',
};

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'warning';
  tiêu đề: chuỗi;
  tin nhắn?: chuỗi;
  hẹn giờ?: số;
  showConfirm?: boolean;
}

//Thành phần cảnh báo toàn cầu
xuất const AlertModal = ({
  đang mở,
  trênĐóng,
  loại,
  tiêu đề,
  tin nhắn,
  hẹn giờ,
  hiển thịXác nhận = sai,
}: AlertModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    nếu (isOpen) {
      setIsVisible(true);
      nếu (bộ đếm thời gian) {
        setTimeout(() => {
          onClose();
        }, bộ đếm thời gian);
      }
    } khác {
      setIsVisible(false);
    }
  }, [isOpen, hẹn giờ, onClose]);

  if (!isOpen) trả về null;

  const getIcon = () => {
    công tắc (loại) {
      trường hợp 'success':
        return <CheckCircle className='w-8 h-8 text-green-500' />;
      case 'error':
        return <AlertCircle className='w-8 h-8 text-red-500' />;
      case 'warning':
        return <AlertTriangle className='w-8 h-8 text-yellow-500' />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  return createPortal(
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full border ${getBgColor()} transition-all duration-200 ${
          isVisible ? 'scale-100' : 'scale-95'
        }`}
      >
        <div className='p-6 text-center'>
          <div className='flex justify-center mb-4'>{getIcon()}</div>

          <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2'>
            {title}
          </h3>

          {message && (
            <p className='text-gray-600 dark:text-gray-400 mb-4'>{tin nhắn</p>
          )}

          {showConfirm && (
            <nút
              onClick={onClose}
              className={`px-4 py-2 text-sm font-medium ${styles.primary}`}
            >
              được rồi
            </button>
          )}
        </div>
      </div>
    </div>,
    tài liệu.body
  );
};
// Quản lý trạng thái cửa sổ bật lên
xuất const useAlertModal = () => {
  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    kiểu: 'success' | 'error' | 'warning';
    title: string;
    message?: string;
    timer?: number;
    showConfirm?: boolean;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
  });

  const showAlert = (config: Omit<typeof alertModal, 'isOpen'>) => {
    setAlertModal({ ...config, isOpen: true });
  };

  const HideAlert = () => {
    setAlertModal((prev) => ({ ...prev, isOpen: false }));
  };

  return { cảnh báoModal, showAlert, ẩnAlert };
};

// Phương thức bật lên thống nhất (phải được xác định trước lần sử dụng đầu tiên)
xuất const showError = (
  tin nhắn: chuỗi,
  showAlert?: (cấu hình: bất kỳ) => void
) => {
  nếu (showAlert) {
    showAlert({type: 'error', title: 'sai lầm', message, showConfirm: true });
  } else {
    console.error(message);
  }
};

export const showSuccess = (
  message: string,
  showAlert?: (config: any) => void
) => {
  if (showAlert) {
    showAlert({ type: 'success', title: 'thành công', message, timer: 2000 });
  } else {
    console.log(message);
  }
};

// Hệ thống quản lý trạng thái tải phổ quát
interface LoadingState {
  [key: string]: boolean;
}

export const useLoadingState = () => {
  const [loadingStates, setLoadingStates] = useState<LoadingState>({});

  const setLoading = (key: string, loading: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [key]: loading }));
  };

  const isLoading = (key: string) => loadingStates[key] || false;

  const withLoading = async (
    key: string,
    operation: () => Promise<any>
  ): Promise<any> => {
    setLoading(key, true);
    try {
      const result = await operation();
      return result;
    } finally {
      setLoading(key, false);
    }
  };

  return { loadingStates, setLoading, isLoading, withLoading };
};
