FROM node:16.9
WORKDIR /home/whoami/c
ENV PATH /home/whoami/c/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install prom-client
RUN npm update npm
RUN npm ci
COPY . .
RUN npm start

