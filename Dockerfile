# start from base
FROM node:boron
MAINTAINER Jake Peyser <jakepeyser@gmail.com>

# copy our application code
ADD . /usr/src/app
WORKDIR /usr/src/app

# fetch app specific deps
ENV NODE_ENV=staging
RUN npm install --quiet
ENV NODE_ENV=production
RUN npm run build
