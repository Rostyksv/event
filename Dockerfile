# Use the latest Ubuntu base image
FROM ubuntu:latest

# Set the working directory
WORKDIR /app

# Install Node.js and npm
RUN apt-get update && apt-get install -y \
    nodejs \
    npm

# Copy the front-end and back-end folders into the container
COPY front-end /app/front-end
COPY back-end /app/back-end

# Install front-end dependencies
RUN cd /app/front-end && npm install

# Install back-end dependencies
RUN cd /app/back-end && npm install

# Expose the necessary ports for front-end and back-end
EXPOSE 3000 3001 8080

CMD cd /app/front-end && npm install && npm start & cd /app/back-end && npm install && npm start

