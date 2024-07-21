FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG VITE_APP_NAME
ENV VITE_APP_NAME $VITE_APP_NAME
ARG VITE_BACKEND_ENDPOINT
ENV VITE_BACKEND_ENDPOINT $VITE_BACKEND_ENDPOINT

COPY . .

RUN npm run build:prod

FROM nginx:stable-alpine

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]