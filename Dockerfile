# start from base
FROM node:boron
MAINTAINER Jake Peyser <jakepeyser@gmail.com>

# copy our application code
ADD . /usr/src/app
WORKDIR /usr/src/app

# install all dependencies
RUN npm install --quiet

# set Node environment
ARG build_env
ENV NODE_ENV $build_env

# build dist files in given env-mode
RUN npm run build

# remove non-prod deps if "production"
RUN if [ "$NODE_ENV" = "production" ]; then rm -rf node_modules && npm install; fi
