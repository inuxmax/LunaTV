# ---- Giai đoạn 1: Cài đặt các phụ thuộc ----
FROM node:20-alpine AS deps
RUN apk add --no-cache git
# Kích hoạt corepack và kích hoạt pnpm (Node20 cung cấp corepack theo mặc định)
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Chỉ sao chép danh sách phụ thuộc để cải thiện việc sử dụng bộ nhớ đệm của bản dựng
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY .git ./.git
# Cài đặt tất cả các phần phụ thuộc (bao gồm cả devDependency, sẽ được cắt bớt sau)
RUN pnpm install --frozen-lockfile

# ---- Giai đoạn 2: Xây dựng dự án ----
FROM node:20-alpine AS builder
RUN apk add --no-cache git
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

#Sao chép phần phụ thuộc
COPY --from=deps /app/node_modules ./node_modules
# Sao chép toàn bộ mã nguồn
COPY . .
COPY --from=deps /app/.git ./.git

# Đồng thời đặt DOCKER_ENV một cách rõ ràng trong giai đoạn xây dựng,
ENV DOCKER_ENV=true

# Tạo bản dựng sản xuất
RUN pnpm run build

# ---- Giai đoạn 3: Tạo ảnh thời gian chạy ----
FROM node:20-alpine AS runner
RUN apk add --no-cache git libc6-compat sqlite
#Tạo người dùng không phải root
RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs

WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV DOCKER_ENV=true
ENV SQLITE_PATH=/app/data/tv.db

RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

# Sao chép đầu ra độc lập từ trình tạo
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Sao chép thư mục script từ trình tạo
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
# Sao chép start.js từ trình tạo
COPY --from=builder --chown=nextjs:nodejs /app/start.js ./start.js
# Sao chép thư mục public và .next/static từ trình tạo
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Chuyển sang người dùng không có đặc quyền
USER nextjs

EXPOSE 3000

# Sử dụng tập lệnh khởi động tùy chỉnh để tải trước cấu hình trước khi khởi động máy chủ
CMD ["node", "start.js"] 