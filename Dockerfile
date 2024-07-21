FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

ENV TZ="America/Sao_Paulo"

COPY . .

RUN npm run prisma:generate

EXPOSE 3100

CMD ["npm", "run", "start:dev"]