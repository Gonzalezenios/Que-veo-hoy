FROM node:12.16.1-alpine
WORKDIR /app
COPY . . 
RUN npm install 
EXPOSE  8080:8080
CMD npm start 
