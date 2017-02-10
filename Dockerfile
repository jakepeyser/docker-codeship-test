# start from base
FROM node:boron
MAINTAINER Jake Peyser <jakepeyser@gmail.com>

# copy our application code
ADD . /usr/src/app
WORKDIR /usr/src/app

RUN echo $NODE_ENV

# fetch app specific deps
RUN npm install --quiet
RUN npm run build
