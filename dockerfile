# FROM node:12.18.1

# ENV NODE_ENV=production

# WORKDIR /app

# COPY ["package.json", "package-lock.json*", "./"]

# RUN npm install --production

# COPY . .

# CMD [ "node", "./src/bot.js" ]

# Install the app dependencies in a full UBI Node docker image
FROM registry.access.redhat.com/ubi8/nodejs-14:latest

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy the dependencies into a Slim Node docker image
FROM registry.access.redhat.com/ubi8/nodejs-14-minimal:latest
  
# Install app dependencies
COPY --from=0 /opt/app-root/src/node_modules /opt/app-root/src/node_modules
COPY . /opt/app-root/src

ENV NODE_ENV production

CMD ["npm", "start"]
