# Use the official Node.js 22 image as the base image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package.json ./

# Install dependencies
RUN npm install
EXPOSE 3002

# Copy the rest of the application files to the container
COPY . .

# Specify the command to run the application
CMD ["npm","start"]