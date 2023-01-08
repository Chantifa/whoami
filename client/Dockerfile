FROM node:16.9
WORKDIR /home/whoami/client
ENV PATH /home/whoami/client/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm i react-scripts
RUN npm install prom-client
RUN npm update
RUN npm ci
COPY . .
RUN npm start




