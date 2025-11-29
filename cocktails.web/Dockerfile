FROM node:23.5.0 AS builder
WORKDIR /app

ARG GH_PKG_READ_TOKEN
ENV GH_PKG_READ_TOKEN=${GH_PKG_READ_TOKEN}

ARG ENV
ENV VITE_NODE_ENV=${ENV}

COPY . .
RUN yarn install
RUN yarn run build:prod

FROM nginx:1.27.3-alpine

COPY nginx-default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
RUN mkdir -p /usr/share/nginx/html/public

EXPOSE 80
EXPOSE 443

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
RUN sed -i -e 's/\r$//' env.sh
COPY .env .
COPY .env.loc .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh .env && nginx -g \"daemon off;\""]