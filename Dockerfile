# start from base
FROM node:boron
MAINTAINER Jake Peyser <jakepeyser@gmail.com>

# set Node environment
ARG build_env
ENV NODE_ENV $build_env

# copy our application code
ADD . /usr/src/app
WORKDIR /usr/src/app

# fetch app specific deps
RUN npm install --quiet
RUN npm run build
