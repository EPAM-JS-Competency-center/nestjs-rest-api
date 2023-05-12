FROM node:18 AS build
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install --prod
COPY --from=build /usr/src/app/dist dist
EXPOSE 3000
CMD yarn start:prod
