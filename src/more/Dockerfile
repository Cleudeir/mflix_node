FROM node:16.3.0-alpine
WORKDIR /home
COPY . .
RUN npm install -g --quite npm@8.13.2 
RUN npm install --location=global nodemon
RUN npm install
USER node 
EXPOSE 3000
RUN npm run dev
