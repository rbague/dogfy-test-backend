FROM node:22.16.0-alpine3.21 AS dev-stage

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

EXPOSE 3000
COPY . ./

# serve app
FROM dev-stage AS production-stage
ENV NODE_ENV=production
RUN npm run build
