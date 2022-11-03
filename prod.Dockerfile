# syntax=docker/dockerfile:1
# Dockerfile for harbor.sucsoft.com:30002/library/ts-demo
FROM harbor.sucsoft.com:30002/napoleon/waterloo:latest

# 官方推荐, 约定俗成的标签
LABEL maintainer="yel@sucsoft.com"
# 镜像描述, 简略描述目的、具体用途
LABEL description="前端模板项目仓库"

# 规范: 强制要求所有前端镜像的 dist 文件夹必须拷贝为此目录
COPY dist /app/share/static

ARG CICD_GIT_COMMIT
ARG BUILD_DATE

# Label 标签定义版本
LABEL com.sucsoft.label-schema.schema-version="1.0"
# 基础镜像名, 和最后一个 FROM 后的值一致
LABEL com.sucsoft.label-schema.base-image="harbor.sucsoft.com:30002/napoleon/waterloo:latest"
# 镜像编译时间, 由流水线传入
LABEL com.sucsoft.label-schema.build-date="${BUILD_DATE}"
# 本 Dockerfile 编译出的镜像, 镜像名 <Repo>/<AppName> 部分
LABEL com.sucsoft.label-schema.name="library/ts-demo"
# 镜像代码仓库地址, 可以是 Dockerfile 仓库地址（针对于 Dockerfile 和应用源代码分离的情况）, 或为应用代码仓库地址
LABEL com.sucsoft.label-schema.vcs-url="https://gitlab.sucsoft.com/web/ts-web-demo"
LABEL com.sucsoft.label-schema.vcs-ref="${CICD_GIT_COMMIT}"
