FROM node:16

WORKDIR ./app

COPY package-lock.json ./
COPY package.json ./

RUN npm ci
RUN npm run build

COPY dist ./dist

EXPOSE 3000

CMD npm run start:prod

