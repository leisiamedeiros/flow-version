FROM node:14.16-alpine3.10 as build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY . .

RUN npm ci --silent
RUN npm install react-scripts@4.0.3 -g --silent

COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]