# syntax=docker/dockerfile:1
FROM node:16.14.0-buster-slim as builder

RUN sed -i 's#deb.debian.org#mirrors.huaweicloud.com#g' /etc/apt/sources.list \
    && sed -i 's#security.debian.org#mirrors.huaweicloud.com#g' /etc/apt/sources.list \
    && apt update -y \
    && apt install -y --fix-missing --no-install-recommends python3 python3-pip make gcc g++ \
    && apt autoclean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /var/cache/apt/*

# 1. 设置 npm 和 yarn 的缓存目录, 开发时进行挂载, 可以和其他项目共用缓存
# 2. 安装 Vue
RUN npm config set cache /root/.npm \
    && yarn config set cache-folder /root/.yarn-cache \
    && yarn global add @vue/cli && rm -rf /root/.yarn-cache/*

# 定义编译目录环境变量
ENV BUILD_DIR /build
# 自动创建并切换到工作目录
WORKDIR ${BUILD_DIR}
# 声明挂载目录, 代码应挂载到此处（必选）
VOLUME ${BUILD_DIR}
# 声明缓存挂载目录, 可以将系统（WSL/Linux/MacOS）中默认的缓存路径挂载到容器中, 共用缓存（可选）
VOLUME /root/.npm
VOLUME /root/.yarn-cache

# 声明容器内监听端口, 方便暴露到容器外部
# 本例中为 `yarn run serve` 脚本（实际执行 `vue-cli-service serve`）的默认监听端口
# 其他工具请自行修改, 或者运行其他工具时将监听端口设置为 8080
EXPOSE 8080

# docker-entrypoint.sh 添加可执行权限
COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["yarn", "run", "serve"]
