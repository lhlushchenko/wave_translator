# Вихідний образ
FROM node:20

# Робоча директорія
WORKDIR /app

# Копіюємо файли
COPY package*.json ./

# Встановлюємо залежності (включно з bcrypt — всередині контейнера!)
RUN npm install

COPY . .

# Використання production змінних оточення
ENV NODE_ENV=production

# Збірка і запуск
RUN npm run build

CMD ["node", "dist/main.js"]
