FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copy package files
COPY package.json package-lock.json* ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Create uploads directory
RUN mkdir -p /app/uploads

EXPOSE 8002

# Use tsconfig-paths to resolve path aliases at runtime
# Note: dist/app.js (not .ts) since TypeScript compiles to JavaScript
CMD ["node", "-r", "tsconfig-paths/register", "dist/app.js"]
