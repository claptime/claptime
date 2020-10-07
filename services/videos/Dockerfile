FROM amazonlinux:2

ARG NVM_VERSION=0.34.0
ARG NODE_VERSION=12.0.0
ARG FFMPEG_VERSION=4.2.1

RUN yum update -y
RUN yum install -y tar gzip xz

##########
# FFMPEG #
##########
WORKDIR /root
RUN curl -o ffmpeg-git-amd64-static.tar.xz https://www.johnvansickle.com/ffmpeg/old-releases/ffmpeg-${FFMPEG_VERSION}-amd64-static.tar.xz
RUN tar -xf ffmpeg-git-amd64-static.tar.xz
RUN cp ffmpeg-${FFMPEG_VERSION}-amd64-static/ffmpeg /usr/bin
RUN cp ffmpeg-*-amd64-static/ffprobe /usr/bin

########
# NODE #
########
WORKDIR /tmp
RUN curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/v${NVM_VERSION}/install.sh" | bash
ENV NVM_DIR /root/.nvm
RUN . $NVM_DIR/nvm.sh && nvm install $NODE_VERSION
ENV NODE_PATH "$NVM_DIR/v$NODE_VERSION/lib/node_modules"
ENV PATH "$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH"

########
# CODE #
########
RUN mkdir -p /usr/local/bin/tasks
WORKDIR /usr/local/bin/tasks
COPY src/tasks/package.json .
COPY src/tasks/package-lock.json .
RUN npm ci
COPY src/tasks/uploader.js .
COPY src/tasks/importer.js .
