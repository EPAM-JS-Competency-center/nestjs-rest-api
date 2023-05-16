FROM node:16-alpine as build
WORKDIR /app

COPY package*.json ./
RUN npm install

WORKDIR /app
COPY . ./
RUN npm run build

FROM node:16-alpine as app
COPY --from=build /app/package*.json ./
RUN npm install --only=production
COPY --from=build /app/dist ./dist
CMD ["node", "dist/main.js"]
EXPOSE 4000
