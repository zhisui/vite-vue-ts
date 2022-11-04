#!/usr/bin/env bash

set -e

RED='\033[0;31m'
ORANGE='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m'    # No Color

function Fatal() {
    echo -e "${RED}${1}${NC}"
    exit 1
}

function Error() {
    echo -e "${RED}${1}${NC}"
}

function Warn() {
    echo -e "${ORANGE}${1}${NC}"
}

function Note() {
    echo -e "${GREEN}${1}${NC}"
}

function Info() {
    echo "${1}"
}

if [ "$(find ${BUILD_DIR} -prune -empty)" = ${BUILD_DIR} ]; then
  # 用户未开发调试时未挂载源码到 ${BUILD_DIR} 路径, 中止容器运行
  Error "${BUILD_DIR} is empty, you must mount source code to this folder for debug"
  exit 1
else
  # 用户已挂载源码, 安装依赖, 优先从本地缓存读取
  res=$(find ${BUILD_DIR} -prune -empty)
  yarn install
fi

# 将传递给此脚本的所有参数视为一条命令并执行
exec "$@"
