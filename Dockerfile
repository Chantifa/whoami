FROM node:14.17.6
RUN npm cache clean -f
WORKDIR /home/whoami/server/
ENV PATH home/whoami/server/node_modules/.bin:$PATH
COPY package*.json .
RUN rm -rf npm-cache rm -rf npm
RUN npm install -g nodemon
RUN npm upgrade
RUN npm ci
COPY . .
CMD ["nodemon", "server.js"]
EXPOSE 5000


