# Build image 
FROM node:16-alpine as build_image
WORKDIR /app

# Install app dependencies
FROM build_image as dependencies
COPY --chown=node:node package*.json ./
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force  

# Copy files/Build
FROM dependencies as build
WORKDIR /app
COPY --chown=node:node . .
RUN npm run build && rm -rf src/
USER node

# Production image
FROM node:16-alpine as production
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

ENV PORT=8080
EXPOSE 8080
CMD [ "node", "dist/main.js" ]