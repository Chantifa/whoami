FROM node:14.17.6
WORKDIR /home/whoami/client
ENV PATH /home/whoami/client/node_modules/.bin:$PATH
RUN rm -rf npm-cache rm -rf npm
RUN npm cache clean --force
COPY package*.json .
RUN npm install && npm cache clean --force
RUN npm upgrade npm
RUN npm ci
COPY . .
CMD ["npm", "run", "start"]
EXPOSE 3000



