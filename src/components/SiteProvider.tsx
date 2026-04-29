'use client';

import { createContext, ReactNode, useContext } from 'react';

const SiteContext = createContext<{ siteName: string; announcement?: string }>({
  // 默认值
  siteName: 'MoonTV',
  announcement:
    'Trang web này chỉ cung cấp dịch vụ tìm kiếm thông tin phim. Mọi nội dung đến từ bên thứ ba. Chúng tôi không lưu trữ tài nguyên video và không chịu trách nhiệm về độ chính xác, hợp pháp hoặc đầy đủ của nội dung.',
});

export const useSite = () => useContext(SiteContext);

export function SiteProvider({
  children,
  siteName,
  announcement,
}: {
  children: ReactNode;
  siteName: string;
  announcement?: string;
}) {
  return (
    <SiteContext.Provider value={{ siteName, announcement }}>
      {children}
    </SiteContext.Provider>
  );
}
