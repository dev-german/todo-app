FROM node:22.11-alpine
WORKDIR /app
COPY package*.json .
RUN npm i --silent
COPY . .
EXPOSE 4201
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
