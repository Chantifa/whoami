FROM python:3.8-slim-buster
FROM node:alpine
WORKDIR /app
COPY ./ ./
RUN npm install
CMD ["npm", "run", "--openssl-legacy-provider", "start-all"]