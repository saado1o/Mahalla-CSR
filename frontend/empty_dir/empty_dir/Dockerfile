FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# In production, we build. In development, we use 'npm run dev' via docker-compose override or command.
# For now, let's keep it production-ready.
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
