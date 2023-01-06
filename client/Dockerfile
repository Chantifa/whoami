FROM node:16.9
WORKDIR /home/whoami/client
ENV PATH /home/whoami/client/node_modules/.bin:$PATH
RUN rm -rf npm-cache rm -rf npm
RUN npm cache clean --force
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install prom-client
RUN npm upgrade npm
RUN npm rebuild node-sass
RUN npm ci
CMD ["npm", "run", "start"]
COPY . .
EXPOSE 3000:3001



