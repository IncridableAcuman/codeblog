# 1-Bosqich: Loyihani yig'ish (Build)
FROM node:20-alpine AS builder
WORKDIR /app

# Keshdan to'g'ri foydalanish uchun package fayllarni nusxalaymiz
COPY package*.json ./
RUN npm ci

# Hamma kodlarni nusxalash va build qilish
COPY . .
RUN npm run build

# 2-Bosqich: Statik fayllarni Nginx orqali tarqatish
FROM nginx:stable-alpine

# React Router (Client-side routing) brauzerni yangilaganda (F5) 404 bermasligi uchun 
# Nginx konfiguratsiyasini to'g'rilaymiz
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Builder bosqichida yig'ilgan 'dist' (yoki build) qatlamini Nginx sahifasiga ko'chiramiz
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx standart porti
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]