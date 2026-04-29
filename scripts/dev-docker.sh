#!/bin/bash
# 本地构建并启动 Docker 镜像 + Redis
# 用法: ./scripts/dev-docker.sh [up|down|rebuild|logs]

set -e

COMPOSE_FILE="docker-compose.dev.yml"

case "${1:-up}" in
  up)
    echo "🚀 Xây dựng và bắt đầu dịch vụ..."
    docker compose -f "$COMPOSE_FILE" up -d --build
    echo ""
    echo " ✅Dịch vụ đã được kích hoạt"
    echo "Ứng dụng: http://localhost:3000"
    echo "   Redis: localhost:6379"
    echo ""
    echo "Tài khoản mặc định: admin/admin123"
    echo "Xem nhật ký: nhật ký ./scripts/dev-docker.sh"
    echo "Dừng dịch vụ: ./scripts/dev-docker.sh down"
    ;;
  down)
    echo "🛑 Dừng và xóa dịch vụ..."
    docker compose -f "$COMPOSE_FILE" down
    echo " ✅ Đã dừng"
    ;;
  rebuild)
    echo "🔄 Xây dựng lại và bắt đầu..."
    docker compose -f "$COMPOSE_FILE" down
    docker compose -f "$COMPOSE_FILE" up -d --build --force-recreate
    echo " ✅ Được xây dựng lại và ra mắt"
    ;;
  logs)
    docker compose -f "$COMPOSE_FILE" logs -f
    ;;
  *)
    echo "Cách sử dụng: $0 [lên|xuống|xây dựng lại|log]"
    exit 1
    ;;
esac
