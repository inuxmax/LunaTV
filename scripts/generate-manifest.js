#!/usr/bin/env node
/* eslint-disable */
// Tự động tạo tệp kê khai.json dựa trên NEXT_PUBLIC_SITE_NAME

const fs = require('fs');
const path = require('path');

// Lấy thư mục gốc của dự án
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const manifestPath = path.join(publicDir, 'manifest.json');

// Lấy tên trang web từ các biến môi trường
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'LunaTV';

// mẫu tệp kê khai.json
const bảng kê khaiTemplate = {
  tên: tên trang web,
  short_name: tên trang web,
  mô tả: '影视聚合',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  background_color: '#000000',
  'apple-mobile-web-app-capable': 'yes',
  'apple-mobile-web-app-status-bar-style': 'black',
  icons: [
    {
      src: '/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/icons/icon-256x256.png',
      sizes: '256x256',
      type: 'image/png',
    },
    {
      src: '/icons/icon-384x384.png',
      sizes: '384x384',
      type: 'image/png',
    },
    {
      src: '/icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
};

thử {
  // Đảm bảo thư mục chung tồn tại
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { đệ quy: true });
  }

  //Viết bảng kê khai.json
  fs.writeFileSync(manifestPath, JSON.stringify(manifestTemplate, null, 2));
  console.log(` ✅ Đã tạo tệp kê khai.json với tên trang web: ${siteName}`);
} bắt (lỗi) {
  console.error('❌ Error generating manifest.json:', error);
  process.exit(1);
}
