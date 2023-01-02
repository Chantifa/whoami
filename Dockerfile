FROM python:3.8-slim-buster
FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install && npm ci && cd client && npm ci
CMD ["npm", "run", "start-all"]