# Use Node.js LTS (Long Term Support) as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies with Yarn
RUN yarn install --frozen-lockfile --production=false

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Remove development dependencies
RUN yarn install --frozen-lockfile --production=true

# Set environment variables
ENV NODE_ENV=production \
    PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Start the application
CMD ["yarn", "start"]