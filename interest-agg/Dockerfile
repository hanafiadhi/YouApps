FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json .
RUN npm install

COPY . .

ENTRYPOINT ["npm", "run", "start:dev"]