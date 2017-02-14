# start from base
FROM node:boron

# copy entire app to working repo
WORKDIR /usr/src/app
COPY . /usr/src/app

EXPOSE 3030

CMD ["npm", "start"]
