FROM node:15.5.0
LABEL project=notifications-be
ARG RDS_CA_FILE_PATH
ENV RDS_CA_FILE_PATH $RDS_CA_FILE_PATH
RUN apt install bash curl
WORKDIR /src/app
RUN rm -rf .cache node_modules
ADD . .
RUN mkdir -p ./src/app/rds-secrets
RUN echo "" > .env
RUN curl $RDS_CA_FILE_PATH -o /src/app/src/rds-secrets/rds-combined-ca-bundle.pem
RUN npm ci
RUN npm run test
RUN chmod +x start-server.sh
ENTRYPOINT ["/src/app/start-server.sh"]
