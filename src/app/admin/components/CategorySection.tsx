/* eslint-disable no-console */
'sử dụng ứng dụng khách';
nhập khẩu {
  Trung tâm gần nhất,
  DndContext,
  cảm biến con trỏ,
  Cảm biến cảm ứng,
  sử dụngCảm biến,
  sử dụngCảm biến,
} từ '@dnd-kit/core';
nhập khẩu {
  hạn chếToParentElement,
  hạn chếToVerticalAxis,
} từ '@dnd-kit/modifiers';
nhập khẩu {
  mảngDi chuyển,
  Có thể sắp xếpContext,
  sử dụngCó thể sắp xếp,
  dọcListSortingStrategy,
} từ '@dnd-kit/sortable';
nhập { CSS } từ '@dnd-kit/utilities';
nhập { GripVertical } từ 'lucide-react';
nhập React, { useEffect, useState } từ 'Reac';

nhập {SectionConfigProps } từ '@/lib/admin.types';

nhập { styles, useLoadingState } từ '@/app/admin/comComponents/UIComponents';
// Kiểu dữ liệu phân loại tùy chỉnh
giao diện Danh mục tùy chỉnh {
  tên?: chuỗi;
  loại: 'phim' | 'TV';
  truy vấn: chuỗi;
  bị vô hiệu hóa?: boolean;
  từ: 'cấu hình' | 'phong tục';
}
const CategorySection = ({
  cấu hình,
  làm mới,
  hiển thị,
  hiển thịLỗi,
}: MụcConfigProps) => {
  const { isLoading, withLoading } = useLoadingState();
  const [danh mục, setCategories] = useState<CustomCategory[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [orderChanged, setOrderChanged] = useState(false);
  const [newCategory, setNewCategory] = useState<CustomCategory>({
    tên: '',
    loại: 'phim',
    truy vấn: '',
    bị vô hiệu hóa: sai,
    từ: 'cấu hình',
  });

  // cảm biến dnd-kit
  cảm biến const = useSensors(
    useSensor(PointerSensor, {
      ràng buộc kích hoạt: {
        khoảng cách: 5, // Kích hoạt bởi sự dịch chuyển nhẹ
      },
    }),
    useSensor(TouchSensor, {
      ràng buộc kích hoạt: {
        độ trễ: 150, // Được kích hoạt sau khi nhấn lâu trong 150 mili giây để tránh xung đột khi cuộn
        dung sai: 5,
      },
    })
  );

  // khởi tạo
  useEffect(() => {
    if (config?.CustomCategories) {
      setCategories(config.CustomCategories);
      //Đặt lại thứ tựĐã thay đổi khi nhập
      setOrderChanged(sai);
    }
  }, [cấu hình]);

  // Yêu cầu API chung
  const callCategoryApi = async (body: Record<string, Any>) => {
    thử {
      const resp = đang chờ tìm nạp('/api/admin/category', {
        phương thức: 'BÀI',
        tiêu đề: { 'Content-Type': 'application/json' },
        nội dung: JSON.stringify({ ...body }),
      });

      nếu (!resp.ok) {
        const data = đang chờ resp.json().catch(() => ({}));
        ném Lỗi mới(data.error || `Thao tác không thành công: ${resp.status}`);
      }

      // Làm mới cấu hình sau khi thành công
      đang chờ làm mới();
    } bắt (lỗi) {
      showError(err instanceof Error? err.message: 'Thao tác thất bại', showAlert);
      ném lỗi; // Ném lên trên để thuận tiện cho việc phán đoán tại vị trí gọi
    }
  };

  const handToggleEnable = (truy vấn: chuỗi, gõ: 'phim' | 'tv') => {
    const target = chuyên mục.find((c) => c.query === truy vấn && c.type === loại);
    if (! target) trả về;
    hành động const = target.disabled? 'kích hoạt' : 'vô hiệu hóa';
    withLoading(`toggleCategory_${query__${type}`, () =>
      callCategoryApi({hành động, truy vấn, loại })
    ).catch(() => {
      console.error('Thao tác thất bại', hành động, truy vấn, loại);
    });
  };

  const handDelete = (truy vấn: chuỗi, gõ: 'phim' | 'tv') => {
    withLoading(`deleteCategory_${query__${type}`, () =>
      callCategoryApi({ action: 'delete', query, type })
    ).catch(() => {
      console.error('Thao tác thất bại', 'xóa', truy vấn, loại);
    });
  };

  const handAddCategory = () => {
    if (!newCategory.name || !newCategory.query) return;
    withLoading('addCategory', async () => {
      đang chờ callCategoryApi({
        hành động: 'thêm',
        tên: newCategory.name,
        loại: newCategory.type,
        truy vấn: newCategory.query,
      });
      setNewCategory({
        tên: '',
        loại: 'phim',
        truy vấn: '',
        bị vô hiệu hóa: sai,
        từ: 'tùy chỉnh',
      });
      setShowAddForm(sai);
    }).catch(() => {
      console.error('Thao tác thất bại', 'thêm', newCategory);
    });
  };

  const handDragEnd = (sự kiện: bất kỳ) => {
    const { hoạt động, kết thúc } = sự kiện;
    if (!over || active.id === over.id) return;
    const oldIndex = chuyên mục.findIndex(
      (c) => `${c.query}:${c.type}` === active.id
    );
    const newIndex = chuyên mục.findIndex(
      (c) => `${c.query}:${c.type}` === over.id
    );
    setCategories((prev) => arrayMove(prev, oldIndex, newIndex));
    setOrderChanged(true);
  };

  const handSaveOrder = () => {
    const order = Category.map((c) => `${c.query}:${c.type}`);
    withLoading('saveCategoryOrder', () =>
      callCategoryApi({ action: 'sort', order })
    )
      .then(() => {
        setOrderChanged(sai);
      })
      .catch(() => {
        console.error('Thao tác thất bại', 'sắp xếp', thứ tự);
      });
  };

  // Bao bì hàng có thể kéo được (dnd-kit)
  const DraggableRow = ({ Category }: { Category: CustomCategory }) => {
    const { thuộc tính, trình nghe, setNodeRef, biến đổi, chuyển đổi } =
      useSortable({ id: `${category.query}:${category.type}` });

    kiểu const = {
      biến đổi: CSS.Transform.toString(biến đổi),
      chuyển tiếp,
    } dưới dạng React.CSSProperties;

    trở lại (
      <tr
        ref={setNodeRef}
        phong cách={style}
        className='hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors select-none'
      >
        <td
          className='px-2 py-4 lấy con trỏ text-gray-400'
          style={{ touchAction: 'none' }}
          {...{ ...thuộc tính, ...người nghe }}
        >
          <Kích thước GripVertical={16} />
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
          {category.name || '-'}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'>
          <nhịp
            className={`px-2 py-1 text-xs được làm tròn-đầy đủ ${
              Category.type === 'phim'
                ? 'bg-blue-100 tối:bg-blue-900/20 văn bản-blue-800 tối:text-blue-300'
                : 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300'
            }`}
          >
            {category.type === 'phim' ? 'Phim' : 'Phim truyền hình'}
          </span>
        </td>
        <td
          className='px-6 py-4 whitespace-nowwrap text-sm text-gray-900 dark:text-gray-100 max-w-[12rem] cắt ngắn'
          tiêu đề={category.query}
        >
          {category.query}
        </td>
        <td className='px-6 py-4 whitespace-nowrap max-w-[1rem]'>
          <nhịp
            className={`px-2 py-1 text-xs được làm tròn-đầy đủ ${
              !category.disabled
                ? 'bg-green-100 tối:bg-green-900/20 văn bản-xanh-800 tối:văn bản-xanh-300'
                : 'bg-red-100 tối:bg-red-900/20 văn bản-đỏ-800 tối: văn bản-đỏ-300'
            }`}
          >
            {!category.disabled ? 'Đã bật' : 'Đã tắt'}
          </span>
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2'>
          <nút
            onClick={() => handToggleEnable(category.query, Category.type)}
            bị vô hiệu hóa={isLoading(
              `toggleCategory_${category.query__${category.type}`
            )}
            className={`inline-flex items-center px-3 py-1.5 round-full text-xs font-medium ${
              !category.disabled ? styles.roundedDanger : styles.roundedSuccess
            } màu chuyển tiếp ${
              isLoading(`toggleCategory_${category.query__${category.type}`)
                ? 'không cho phép con trỏ opacity-50'
                : ''
            }`}
          >
            {!category.disabled ? 'đã tắt' : 'đã bật'}
          </button>
          {category.from !== 'config' && (
            <nút
              onClick={() => HandleDelete(category.query, Category.type)}
              bị vô hiệu hóa={isLoading(
                `deleteCategory_${category.query__${category.type}`
              )}
              className={`${styles.roundedSecondary} ${
                isLoading(`deleteCategory_${category.query__${category.type}`)
                  ? 'không cho phép con trỏ opacity-50'
                  : ''
              }`}
            >
              Xóa
            </button>
          )}
        </td>
      </tr>
    );
  };

  nếu (!config) {
    trở lại (
      <div className='text-center text-gray-500 dark:text-gray-400'>
        Đang tải...
      </div>
    );
  }

  trở lại (
    <div className='space-y-6'>
      <div className={`${styles.roundedCard}`}>
        {/* Thêm biểu mẫu phân loại */}
        <div className='flex items-center justify-between'>
          <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'></h4>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              showAddForm ? styles.secondary : styles.success
            }`}
          >
            {showAddForm ? 'Hủy' : 'Thêm danh mục'}
          </button>
        </div>

        {showAddForm && (
          <div className='p-4 bg-gray-50 dark:bg-gray-900 round-lg border border-gray-200 dark:border-gray-700 space-y-4'>
            <div className='lưới lưới-cols-1 sm:grid-cols-2 khoảng cách-4'>
              <đầu vào
                gõ='văn bản'
                placeholder='tên danh mục'
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory((prev) => ({ ...prev, name: e.target.value }))
                }
                className='px-3 py-2 viền border-gray-300 dark:border-gray-600 round-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              />
              <chọn
                value={newCategory.type}
                onChange={(e) =>
                  setNewCategory((prev) => ({
                    ...trước,
                    gõ: e.target.value dưới dạng 'phim' | 'truyền hình',
                  }))
                }
                className='px-3 py-2 viền border-gray-300 dark:border-gray-600 round-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              >
                <option value='movie'>Phim</option>
                <option value='tv'>Phim truyền hình</option>
              </select>
              <đầu vào
                gõ='văn bản'
                placeholder='từ khóa tìm kiếm'
                value={newCategory.query}
                onChange={(e) =>
                  setNewCategory((prev) => ({ ...prev, query: e.target.value }))
                }
                className='px-3 py-2 viền border-gray-300 dark:border-gray-600 round-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              />
            </div>
            <div className='flex biện minh-end'>
              <nút
                onClick={handleAddCategory}
                bị vô hiệu hóa={
                  !newCategory.name ||
                  !newCategory.query ||
                  isLoading('addCategory')
                }
                tên lớp={`w-full sm:w-auto px-4 py-2 ${
                  !newCategory.name ||
                  !newCategory.query ||
                  isLoading('addCategory')
                    ? styles.disabled
                    : styles.success
                }`}
              >
                {isLoading('addCategory') ? 'Đang thêm...' : 'Thêm'}
              </button>
            </div>
          </div>
        )}

        {/* Bảng phân loại */}
        <DndContext
          cảm biến={cảm biến}
          va chạmDetection={closestCenter}
          onDragEnd={handleDragEnd}
          autoScroll={false}
          modifiers={[restrictToVerticalAxis, limitToParentElement]}
        >
          <div className='border border-gray-200 dark:border-gray-700 round-lg max-h-[28rem] tràn-y-auto tràn-x-auto tương đối'>
            <table className='min-w-full chia-y chia-gray-200 dark:divide-gray-700'>
              <thead className='bg-gray-50 dark:bg-gray-900 dính top-0 z-10'>
                <tr>
                  <th className='w-8' />
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 chữ hoa theo dõi-wider'>
                    Tên danh mục
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 chữ hoa theo dõi-wider'>
                    loại
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 chữ hoa theo dõi-wider'>
                    Tìm kiếm từ khóa
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
                items={categories.map((c) => `${c.query}:${c.type}`)}
                strategy={verticalListSortingStrategy}
              >
                <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                  {categories.map((category) => (
                    <DraggableRow
                      key={`${category.query}:${category.type}`}
                      danh mục={danh mục}
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
              bị vô hiệu hóa={isLoading('saveCategoryOrder')}
              tên lớp={`px-3 py-1.5 text-sm ${
                isLoading('saveCategoryOrder')
                  ? styles.disabled
                  : styles.primary
              }`}
            >
              {isLoading('saveCategoryOrder') ? 'Đang lưu...' : 'Lưu sắp xếp'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CategorySection;
