/* eslint-disable @typescript-eslint/no-explicit-any,no-console */

import { NextRequest, NextResponse } from 'next/server';

import { getAuthInfoFromCookie } from '@/lib/auth';
import { getConfig } from '@/lib/config';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

// Các loại hoạt động được hỗ trợ
gõ Hành động = 'add' | 'disable' | 'enable' | 'delete' | 'sort';

interface BaseBody {
  action?: Action;
}

export async function POST(request: NextRequest) {
  const storageType = process.env.NEXT_PUBLIC_STORAGE_TYPE || 'localstorage';
  if (storageType === 'localstorage') {
    return NextResponse.json(
      {
        error: 'Bộ nhớ cục bộ không được hỗ trợ cho cấu hình quản trị viên',
      },
      { status: 400 }
    );
  }

  try {
    const body = (await request.json()) as BaseBody & Record<string, any>;
    const { action } = body;

    const authInfo = getAuthInfoFromCookie(request);
    if (!authInfo || !authInfo.username) {
      return NextResponse.json({ error: 'Unauthorized' }, { trạng thái: 401 });
    }
    tên người dùng const = authInfo.username;

    //Xác minh cơ bản
    const HÀNH ĐỘNG: Hành động [] = ['add', 'disable', 'enable', 'delete', 'sort'];
    if (!username || !action || !ACTIONS.includes(action)) {
      return NextResponse.json({ error: 'Lỗi định dạng tham số' }, { status: 400 });
    }

    // Lấy cấu hình và lưu trữ
    const adminConfig = await getConfig();

    //Quyền và xác minh danh tính
    if (username !== process.env.USERNAME) {
      const userEntry = adminConfig.UserConfig.Users.find(
        (u) => u.username === username
      );
      if (!userEntry || userEntry.role !== 'admin' || userEntry.banned) {
        return NextResponse.json({ error: 'Không đủ quyền' }, { status: 401 });
      }
    }

    switch (action) {
      case 'add': {
        const { name, type, query } = body as {
          name?: string;
          type?: 'movie' | 'tv';
          query?: string;
        };
        if (!name || !type || !query) {
          return NextResponse.json({ error: 'Thiếu tham số bắt buộc' }, { status: 400 });
        }
        // Kiểm tra xem đã tồn tại kết hợp truy vấn và kiểu tương tự chưa
        if (
          adminConfig.CustomCategories.some(
            (c) => c.query === query && c.type === type
          )
        ) {
          return NextResponse.json({ error: 'Danh mục này đã tồn tại' }, { status: 400 });
        }
        adminConfig.CustomCategories.push({
          name,
          type,
          query,
          from: 'custom',
          disabled: false,
        });
        break;
      }
      case 'disable': {
        const { query, type } = body as {
          query?: string;
          type?: 'movie' | 'tv';
        };
        if (!query || !type)
          return NextResponse.json(
            { error: 'Thiếu tham số truy vấn hoặc loại' },
            { status: 400 }
          );
        const entry = adminConfig.CustomCategories.find(
          (c) => c.query === query && c.type === type
        );
        if (!entry)
          return NextResponse.json({ error: 'Danh mục không tồn tại' }, { status: 404 });
        entry.disabled = true;
        break;
      }
      case 'enable': {
        const { query, type } = body as {
          query?: string;
          type?: 'movie' | 'tv';
        };
        if (!query || !type)
          return NextResponse.json(
            { error: 'Thiếu tham số truy vấn hoặc loại' },
            { status: 400 }
          );
        const entry = adminConfig.CustomCategories.find(
          (c) => c.query === query && c.type === type
        );
        if (!entry)
          return NextResponse.json({ error: 'Danh mục không tồn tại' }, { status: 404 });
        entry.disabled = false;
        break;
      }
      case 'delete': {
        const { query, type } = body as {
          query?: string;
          type?: 'movie' | 'tv';
        };
        if (!query || !type)
          return NextResponse.json(
            { error: 'Thiếu tham số truy vấn hoặc loại' },
            { status: 400 }
          );
        const idx = adminConfig.CustomCategories.findIndex(
          (c) => c.query === query && c.type === type
        );
        if (idx === -1)
          return NextResponse.json({ error: 'Danh mục không tồn tại' }, { status: 404 });
        const entry = adminConfig.CustomCategories[idx];
        if (entry.from === 'config') {
          return NextResponse.json(
            { error: 'Không thể xóa danh mục này' },
            { status: 400 }
          );
        }
        adminConfig.CustomCategories.splice(idx, 1);
        break;
      }
      case 'sort': {
        const { order } = body as { order?: string[] };
        if (!Array.isArray(order)) {
          return NextResponse.json(
            { error: 'Sắp xếp lỗi định dạng danh sách' },
            { status: 400 }
          );
        }
        const map = new Map(
          adminConfig.CustomCategories.map((c) => [`${c.query}:${c.type}`, c])
        );
        const newList: typeof adminConfig.CustomCategories = [];
        order.forEach((key) => {
          const item = map.get(key);
          nếu (mục) {
            newList.push(item);
            map.delete(key);
          }
        });
        // Giữ nguyên thứ tự ban đầu nếu không đúng thứ tự
        adminConfig.CustomCategories.forEach((item) => {
          if (map.has(`${item.query}:${item.type}`)) newList.push(item);
        });
        adminConfig.CustomCategories = newList;
        break;
      }
      default:
        return NextResponse.json({ error: 'Hoạt động không xác định' }, { status: 400 });
    }

    // tồn tại để lưu trữ
    await db.saveAdminConfig(adminConfig);

    return NextResponse.json(
      { ok: true },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error('Hoạt động quản lý danh mục không thành công:', error);
    return NextResponse.json(
      {
        error: 'Hoạt động quản lý danh mục không thành công',
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
