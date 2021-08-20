# syntax=docker/dockerfile:1

# Set the base image to node:12-alpine
FROM node:12-alpine

# copy the application to folder /app
WORKDIR /whoami
COPY . /whoami/

# Prepare the container for building React
RUN npm install
RUN npm install react-scripts@3.0.1 -g

COPY . .

ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]