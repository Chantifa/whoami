FROM node:14.17.6
RUN npm cache clean -f
WORKDIR /home/whoami/client
ENV PATH /home/whoami/client/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm i react-script
RUN npm upgrade npm
RUN npm ci
COPY . .
CMD ["npm", "run", "start"]
EXPOSE 3000



