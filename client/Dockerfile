FROM node:18-alpine as builder
WORKDIR /frontend
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]