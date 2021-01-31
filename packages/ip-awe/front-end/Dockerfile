FROM node:15.5-alpine3.12 as frontend-build
LABEL project=platform-frontend
WORKDIR /src/app
ENV ENVIRONMEMT "production"
ENV PATH /src/app/node_modules/.bin:$PATH
ARG GITHUB_PACKAGE_TOKEN
COPY . /src/app/
RUN apk add --no-cache git
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGE_TOKEN}" >> .npmrc
RUN npm ci
RUN npm run build

FROM nginx:1.19.0-alpine
LABEL project=wip-frontend
COPY --from=frontend-build /src/app/dist /usr/share/nginx/html
COPY --from=frontend-build /src/app/default.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build /src/app/create_env_js_and_run_nginx.sh /app/create_env_js_and_run_nginx.sh
RUN chmod u+x /app/create_env_js_and_run_nginx.sh
EXPOSE 80
ENTRYPOINT ["/app/create_env_js_and_run_nginx.sh"]
