FROM ubuntu:latest

WORKDIR /app

RUN apt-get update && apt-get install -y \
    nodejs \
    npm

COPY front-end /app/front-end
COPY back-end /app/back-end

RUN cd /app/front-end && npm install

RUN cd /app/back-end && npm install

ENV REACT_APP_API_URL=http://localhost:3001

EXPOSE 3000 3001 8080

CMD cd /app/front-end && npm install && npm start & cd /app/back-end && npm install && npm start

