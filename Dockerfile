FROM node:16.9
WORKDIR /home/whoami/server/
ENV PATH home/whoami/server/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm install -g nodemon
RUN npm install prom-client
RUN npm update
RUN npm ci
COPY . .
CMD ["nodemon","server.js"]



