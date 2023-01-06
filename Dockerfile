FROM node:16.9
WORKDIR /home/whoami/server/
ENV PATH home/whoami/server/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm uninstall nodemon
RUN npm install -g nodemon --build-from-source
RUN npm uninstall bcryp
RUN npm install bcryptjs
RUN npm install prom-client
RUN npm update
RUN npm ci
CMD ["nodemon","server.js"]
COPY . .
EXPOSE 5000:5001


