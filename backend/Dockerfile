FROM node:16

WORKDIR /app

COPY package*.json ./

# Instalar las dependencias
RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]
