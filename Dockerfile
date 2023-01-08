FROM node:16.9
WORKDIR /home/whoami/
COPY package.json .
COPY package-lock.json .
RUN npm install -g nodemon
RUN npm install prom-client
RUN npm install socket.io-prometheus-metrics
RUN npm update
RUN npm ci
COPY . .
CMD ["nodemon","server.js"]
COPY ./client/package.json ./client
COPY ./client/package-lock.json ./client
RUN cd ./client npm install prom-client
RUN cd npm install socket.io-prometheus-metrics
RUN cd ./client npm install
RUN cd ./client npm update
RUN cd ./client npm ci
COPY ./client ./client
CMD ["npm", "run", "start-client"]





