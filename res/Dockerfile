# Use the official Node.js image as the base image 
FROM node:alpine
 
# Set the working directory in the container 
WORKDIR /usr/src/app 
 
COPY . . 

# Install app dependencies 
RUN npm install 

 
# Expose the port that the app will run on 
EXPOSE 3001
 
# Command to run the application 
# CMD ["node", "index.js"]

