FROM node:22

WORKDIR /app

COPY . .

RUN npm install -g pm2 && npm install && npm run build

EXPOSE 3000

CMD ["pm2-runtime", "pm2.config.js"]
