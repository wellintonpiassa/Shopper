FROM node:20

WORKDIR /app/api

COPY package*.json /app/api

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]