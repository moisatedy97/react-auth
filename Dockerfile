FROM nginx:stable-alpine

ADD dist /usr/share/nginx/html
ADD nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]