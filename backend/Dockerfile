FROM node:23-alpine
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies with Yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Install production dependencies with immutable cache
RUN yarn install --immutable --immutable-cache

# Set environment variables
ENV NODE_ENV=production \
    PORT=7000

# Expose the port the app runs on
EXPOSE 7000

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Start the application
CMD ["yarn", "start"]