FROM node:20-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy client package files
COPY client/package*.json ./client/

# Install all dependencies (backend + frontend)
RUN npm install && cd client && npm install

# Copy all source code
COPY . .

# Build backend (TypeScript)
RUN npm run build:server

# Build frontend (React + Vite)
RUN npm run build:client

# Expose port
EXPOSE 4000

# Start application in production mode
CMD ["npm", "start"]
