FROM node:22

WORKDIR /src

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3002

CMD ["npm", "start"]
