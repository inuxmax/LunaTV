/* eslint-disable no-console */
'use client';

import {
  closestCenter,
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { SectionConfigProps } from '@/lib/admin.types';

import { styles, useLoadingState } from '@/app/admin/components/UIComponents';
// Kiểu dữ liệu nguồn trực tiếp
interface LiveDataSource {
  name: string;
  key: string;
  url: string;
  ua?: string;
  epg?: string;
  channelNumber?: number;
  disabled?: boolean;
  from: 'config' | 'custom';
}
const LiveSourceSection = ({
  config,
  refresh,
  showAlert,
  showError,
}: SectionConfigProps) => {
  const { isLoading, withLoading } = useLoadingState();
  const [liveSources, setLiveSources] = useState<LiveDataSource[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLiveSource, setEditingLiveSource] =
    useState<LiveDataSource | null>(null);
  const [orderChanged, setOrderChanged] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newLiveSource, setNewLiveSource] = useState<LiveDataSource>({
    name: '',
    key: '',
    url: '',
    ua: '',
    epg: '',
    disabled: false,
    from: 'custom',
  });

// cảm biến dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
khoảng cách: 5, // Kích hoạt bởi sự dịch chuyển nhẹ
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
độ trễ: 150, // Được kích hoạt sau khi nhấn lâu trong 150 mili giây，Tránh xung đột khi cuộn
        tolerance: 5,
      },
    })
  );

// khởi tạo
  useEffect(() => {
    if (config?.LiveConfig) {
      setLiveSources(config.LiveConfig);
//Đặt lại thứ tựĐã thay đổi khi nhập
      setOrderChanged(false);
    }
  }, [config]);

// Yêu cầu API chung
  const callLiveSourceApi = async (body: Record<string, any>) => {
    try {
      const resp = await fetch('/api/admin/live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
ném Lỗi mới(data.error || `Thao tác không thành công: ${resp.status}`);
      }

// Làm mới cấu hình sau khi thành công
      await refresh();
    } catch (err) {
showError(err instanceof Error? err.message: 'Thao tác thất bại', showAlert);
ném lỗi; // Ném lên trên để thuận tiện cho việc phán đoán tại vị trí gọi
    }
  };

  const handleToggleEnable = (key: string) => {
    const target = liveSources.find((s) => s.key === key);
    if (!target) return;
    const action = target.disabled ? 'enable' : 'disable';
    withLoading(`toggleLiveSource_${key}`, () =>
      callLiveSourceApi({ action, key })
    ).catch(() => {
console.error('Thao tác thất bại', action, key);
    });
  };

  const handleDelete = (key: string) => {
    withLoading(`deleteLiveSource_${key}`, () =>
      callLiveSourceApi({ action: 'delete', key })
    ).catch(() => {
console.error('Thao tác thất bại', 'xóa', key);
    });
  };

// Làm mới nguồn phát sóng trực tiếp
  const handleRefreshLiveSources = async () => {
    if (isRefreshing) return;

    await withLoading('refreshLiveSources', async () => {
      setIsRefreshing(true);
      try {
        const response = await fetch('/api/admin/live/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
ném Lỗi mới(data.error || `Làm mới không thành công: ${response.status}`);
        }

// Lấy lại cấu hình sau khi làm mới thành công
        await refresh();
        showAlert({
          type: 'success',
title: 'Làm mới thành công',
thông báo: 'Nguồn phát sóng trực tiếp đã được làm mới',
          timer: 2000,
        });
      } catch (err) {
showError(err instanceof Error? err.message: 'Làm mới không thành công', showAlert);
        throw err;
      } finally {
        setIsRefreshing(false);
      }
    });
  };

  const handleAddLiveSource = () => {
    if (!newLiveSource.name || !newLiveSource.key || !newLiveSource.url) return;
    withLoading('addLiveSource', async () => {
      await callLiveSourceApi({
        action: 'add',
        key: newLiveSource.key,
        name: newLiveSource.name,
        url: newLiveSource.url,
        ua: newLiveSource.ua,
        epg: newLiveSource.epg,
      });
      setNewLiveSource({
        name: '',
        key: '',
        url: '',
        epg: '',
        ua: '',
        disabled: false,
        from: 'custom',
      });
      setShowAddForm(false);
    }).catch(() => {
console.error('Thao tác thất bại', 'thêm', newLiveSource);
    });
  };

  const handleEditLiveSource = () => {
    if (!editingLiveSource || !editingLiveSource.name || !editingLiveSource.url)
      return;
    withLoading('editLiveSource', async () => {
      await callLiveSourceApi({
        action: 'edit',
        key: editingLiveSource.key,
        name: editingLiveSource.name,
        url: editingLiveSource.url,
        ua: editingLiveSource.ua,
        epg: editingLiveSource.epg,
      });
      setEditingLiveSource(null);
    }).catch(() => {
console.error('Thao tác thất bại', 'chỉnh sửa', editLiveSource);
    });
  };

  const handleCancelEdit = () => {
    setEditingLiveSource(null);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = liveSources.findIndex((s) => s.key === active.id);
    const newIndex = liveSources.findIndex((s) => s.key === over.id);
    setLiveSources((prev) => arrayMove(prev, oldIndex, newIndex));
    setOrderChanged(true);
  };

  const handleSaveOrder = () => {
    const order = liveSources.map((s) => s.key);
    withLoading('saveLiveSourceOrder', () =>
      callLiveSourceApi({ action: 'sort', order })
    )
      .then(() => {
        setOrderChanged(false);
      })
      .catch(() => {
console.error('Thao tác thất bại', 'sắp xếp', thứ tự);
      });
  };

// Bao bì hàng có thể kéo được (dnd-kit)
  const DraggableRow = ({ liveSource }: { liveSource: LiveDataSource }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: liveSource.key });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    } as React.CSSProperties;

    return (
      <tr
        ref={setNodeRef}
        style={style}
        className='hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors select-none'
      >
        <td
          className='px-2 py-4 cursor-grab text-gray-400'
          style={{ touchAction: 'none' }}
          {...attributes}
          {...listeners}
        >
          <GripVertical size={16} />
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
          {liveSource.name}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
          {liveSource.key}
        </td>
        <td
          className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 max-w-[12rem] truncate'
          title={liveSource.url}
        >
          {liveSource.url}
        </td>
        <td
          className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 max-w-[8rem] truncate'
          title={liveSource.epg || '-'}
        >
          {liveSource.epg || '-'}
        </td>
        <td
          className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 max-w-[8rem] truncate'
          title={liveSource.ua || '-'}
        >
          {liveSource.ua || '-'}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-center'>
          {liveSource.channelNumber && liveSource.channelNumber > 0
            ? liveSource.channelNumber
            : '-'}
        </td>
        <td className='px-6 py-4 whitespace-nowrap max-w-[1rem]'>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              !liveSource.disabled
                ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
            }`}
          >
{!liveSource.disabled ? 'Đang kích hoạt' : 'Đã tắt'}
          </span>
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2'>
          <button
            onClick={() => handleToggleEnable(liveSource.key)}
            disabled={isLoading(`toggleLiveSource_${liveSource.key}`)}
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
              !liveSource.disabled
                ? styles.roundedDanger
                : styles.roundedSuccess
            } transition-colors ${
              isLoading(`toggleLiveSource_${liveSource.key}`)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
{!liveSource.disabled ? 'đã tắt' : 'đã bật'}
          </button>
          {liveSource.from !== 'config' && (
            <>
              <button
                onClick={() => setEditingLiveSource(liveSource)}
                disabled={isLoading(`editLiveSource_${liveSource.key}`)}
                className={`${styles.roundedPrimary} ${
                  isLoading(`editLiveSource_${liveSource.key}`)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
biên tập
              </button>
              <button
                onClick={() => handleDelete(liveSource.key)}
                disabled={isLoading(`deleteLiveSource_${liveSource.key}`)}
                className={`${styles.roundedSecondary} ${
                  isLoading(`deleteLiveSource_${liveSource.key}`)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
xóa bỏ
              </button>
            </>
          )}
        </td>
      </tr>
    );
  };

  if (!config) {
    return (
      <div className='text-center text-gray-500 dark:text-gray-400'>
đang tải...
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className={`${styles.roundedCard}`}>
{/* Thêm biểu mẫu nguồn trực tiếp */}
        <div className='flex items-center justify-between'>
          <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'></h4>
          <div className='flex items-center space-x-2'>
            <button
              onClick={handleRefreshLiveSources}
              disabled={isRefreshing || isLoading('refreshLiveSources')}
              className={`px-3 py-1.5 text-sm font-medium flex items-center space-x-2 ${
                isRefreshing || isLoading('refreshLiveSources')
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-white rounded-lg'
                  : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors'
              }`}
            >
              <nhịp>
                {isRefreshing || isLoading('refreshLiveSources')
                  ? 'Mới mẻ...'
                  : 'Làm mới nguồn trực tiếp'}
              </span>
            </button>
            <nút
              onClick={() => setShowAddForm(!showAddForm)}
              className={showAddForm ? styles.secondary : styles.success}
            >
              {showAddForm ? 'Hủy' : 'Thêm nguồn trực tiếp'}
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className='p-4 bg-gray-50 dark:bg-gray-900 round-lg border border-gray-200 dark:border-gray-700 space-y-4'>
            <div className='lưới lưới-cols-1 sm:grid-cols-2 khoảng cách-4'>
              <đầu vào
                gõ='văn bản'
                giữ chỗ='tên'
                value={newLiveSource.name}
                onChange={(e) =>
                  setNewLiveSource((prev) => ({
                    ...trước,
                    tên: e.target.value,
                  }))
                }
                className='px-3 py-2 viền border-gray-300 dark:border-gray-600 round-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              />
              <đầu vào
                gõ='văn bản'
                giữ chỗ='Khóa'
                value={newLiveSource.key}
                onChange={(e) =>
                  setNewLiveSource((prev) => ({ ...prev, key: e.target.value }))
                }
                className='px-3 py-2 viền border-gray-300 dark:border-gray-600 round-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              />
              <đầu vào
                gõ='văn bản'
                placeholder='địa chỉ M3U'
                value={newLiveSource.url}
                onChange={(e) =>
                  setNewLiveSource((prev) => ({ ...prev, url: e.target.value }))
                }
                className='px-3 py-2 viền border-gray-300 dark:border-gray-600 round-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              />
              <đầu vào
                gõ='văn bản'
                placeholder='Địa chỉ chương trình (tùy chọn)'
                value={newLiveSource.epg}
                onChange={(e) =>
                  setNewLiveSource((prev) => ({ ...prev, epg: e.target.value }))
                }
                className='px-3 py-2 viền border-gray-300 dark:border-gray-600 round-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              />
              <đầu vào
                gõ='văn bản'
                placeholder='UA tùy chỉnh (tùy chọn)'
                value={newLiveSource.ua}
                onChange={(e) =>
                  setNewLiveSource((prev) => ({ ...prev, ua: e.target.value }))
                }
                className='px-3 py-2 viền border-gray-300 dark:border-gray-600 round-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              />
            </div>
            <div className='flex biện minh-end'>
              <nút
                onClick={handleAddLiveSource}
                bị vô hiệu hóa={
                  !newLiveSource.name ||
                  !newLiveSource.key ||
                  !newLiveSource.url ||
                  isLoading('addLiveSource')
                }
                tên lớp={`w-full sm:w-auto px-4 py-2 ${
                  !newLiveSource.name ||
                  !newLiveSource.key ||
                  !newLiveSource.url ||
                  isLoading('addLiveSource')
                    ? styles.disabled
                    : styles.success
                }`}
              >
                {isLoading('addLiveSource') ? 'Đang thêm...' : 'Thêm'}
              </button>
            </div>
          </div>
        )}

        {/* Chỉnh sửa biểu mẫu nguồn trực tiếp */}
        {editLiveSource && (
          <div className='p-4 bg-gray-50 dark:bg-gray-900 round-lg border border-gray-200 dark:border-gray-700 space-y-4'>
            <div className='flex items-center biện minh-giữa'>
              <h5 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                Chỉnh sửa nguồn trực tiếp: {editingLiveSource.name}
              </h5>
              <nút
                onClick={handleCancelEdit}
                className='text-gray-600 dark:text-gray-400 di chuột:text-gray-800 dark:hover:text-gray-200'
              >
                ✕
              </button>
            </div>
            <div className='lưới lưới-cols-1 sm:grid-cols-2 khoảng cách-4'>
              <div>
                <label className='block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  Tên
                </nhãn>
                <đầu vào
                  gõ='văn bản'
                  value={editingLiveSource.name}
                  onChange={(e) =>
                    setEditingLiveSource((trước) =>
                      trước đó ? { ...prev, name: e.target.value } : null
                    )
                  }
                  className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 round-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                />
              </div>
              <div>
                <label className='block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  Chìa khóa (không thể chỉnh sửa)
                </nhãn>
                <đầu vào
                  gõ='văn bản'
                  value={editLiveSource.key}
                  bị vô hiệu hóa
                  className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 round-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 con trỏ không được phép'
                />
              </div>
              <div>
                <label className='block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  Địa chỉ M3U
                </nhãn>
                <đầu vào
                  gõ='văn bản'
                  value={editLiveSource.url}
                  onChange={(e) =>
                    setEditingLiveSource((trước) =>
                      trước đó ? { ...prev, url: e.target.value } : null
                    )
                  }
                  className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 round-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                />
              </div>
              <div>
                <label className='block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  Địa chỉ chương trình (tùy chọn)
                </nhãn>
                <đầu vào
                  gõ='văn bản'
                  value={editingLiveSource.epg}
                  onChange={(e) =>
                    setEditingLiveSource((trước) =>
                      trước đó ? { ...prev, epg: e.target.value } : null
                    )
                  }
                  className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 round-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                />
              </div>
              <div>
                <label className='block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  UA tùy chỉnh (tùy chọn)
                </nhãn>
                <đầu vào
                  gõ='văn bản'
                  value={editingLiveSource.ua}
                  onChange={(e) =>
                    setEditingLiveSource((trước) =>
                      trước đó ? { ...prev, ua: e.target.value } : null
                    )
                  }
                  className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 round-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                />
              </div>
            </div>
            <div className='flexjustify-end space-x-2'>
              <button onClick={handleCancelEdit} className={styles.secondary}>
                Hủy bỏ
              </button>
              <nút
                onClick={handleEditLiveSource}
                bị vô hiệu hóa={
                  !editingLiveSource.name ||
                  !editingLiveSource.url ||
                  isLoading('editLiveSource')
                }
                tên lớp={`${
                  !editingLiveSource.name ||
                  !editingLiveSource.url ||
                  isLoading('editLiveSource')
                    ? styles.disabled
                    : styles.success
                }`}
              >
                {isLoading('editLiveSource') ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        )}

        {/* Bảng nguồn trực tiếp */}
        <DndContext
          cảm biến={cảm biến}
          va chạmDetection={closestCenter}
          onDragEnd={handleDragEnd}
          autoScroll={false}
          modifiers={[restrictToVerticalAxis, limitToParentElement]}
        >
          <div
            className='border border-gray-200 dark:border-gray-700 round-lg max-h-[28rem] tràn-y-auto tràn-x-auto tương đối'
            data-table='danh sách nguồn trực tiếp'
          >
            <table className='min-w-full chia-y chia-gray-200 dark:divide-gray-700'>
              <thead className='bg-gray-50 dark:bg-gray-900 dính top-0 z-10'>
                <tr>
                  <th className='w-8' />
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 chữ hoa theo dõi-wider'>
                    Tên
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 chữ hoa theo dõi-wider'>
                    Chìa khóa
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 chữ hoa theo dõi-wider'>
                    Địa chỉ M3U
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 chữ hoa theo dõi-wider'>
                    Địa chỉ chương trình
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 chữ hoa theo dõi-wider'>
                    UA tùy chỉnh
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 chữ hoa theo dõi-wider'>
                    Số lượng kênh
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 chữ hoa theo dõi-wider'>
                    Trạng thái
                  </th>
                  <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 chữ hoa theo dõi-wider'>
                    hoạt động
                  </th>
                </tr>
              </thead>

              <Bối cảnh có thể sắp xếp
                items={liveSources.map((s) => s.key)}
                chiến lược={verticalListSortingStrategy}
              >
                <tbody className='divide-y chia-gray-200 dark:divide-gray-700'>
                  {liveSources.map((liveSource) => (
                    <Hàng có thể kéo được
                      key={liveSource.key}
                      liveSource={liveSource}
                    />
                  ))}
                </tbody>
              </Sắp xếpContext>
            </bảng>
          </div>
        </DndContext>

        {/* Nút lưu sắp xếp */}
        {orderChanged && (
          <div className='flex biện minh-end'>
            <nút
              onClick={handleSaveOrder}
              bị vô hiệu hóa={isLoading('saveLiveSourceOrder')}
              tên lớp={`px-3 py-1.5 text-sm ${
                isLoading('saveLiveSourceOrder')
                  ? styles.disabled
                  : styles.primary
              }`}
            >
              {isLoading('saveLiveSourceOrder') ? 'Đang lưu...' : 'Lưu sắp xếp'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default LiveSourceSection;
