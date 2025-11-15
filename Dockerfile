# Use the official Node.js 20 Alpine image as the base image for lightweight containers
FROM node:20-alpine AS base

# Stage 1: Install dependencies efficiently
FROM base AS deps
# Install libc6-compat for compatibility with certain native libraries used in Node.js applications.
# See details at:
# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat

# Set the working directory for subsequent instructions
WORKDIR /app

# Copy package management files to install dependencies based on the available lock files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Install dependencies according to the package manager detected
RUN \
  if [ -f yarn.lock ]; then \
    yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then \
    npm ci; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm i --frozen-lockfile; \
  else \
    echo "No lockfile found. Exiting..." && exit 1; \
  fi

# Stage 2: Build the Next.js application
FROM base AS builder
WORKDIR /app

# Copy the node_modules directory from the dependencies stage to avoid redundant installations
COPY --from=deps /app/node_modules ./node_modules
# Copy the entire application code into the builder context
COPY . .

# Accept build arguments for environment configuration
ARG ENV_FILE

# Load environment variables from the specified file and rename it to .env.production.local
# This file should contain production-specific settings to ensure proper configuration.
RUN if [ -f "$ENV_FILE" ] && [ "$ENV_FILE" != ".env.production.local" ]; then \
    cp "$ENV_FILE" .env.production.local; \
  fi

# Disable Next.js telemetry during build for enhanced privacy
# For more information, see: https://nextjs.org/telemetry
# Comment out the line below to enable telemetry.
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application using the appropriate package manager based on lock file presence
RUN \
  if [ -f yarn.lock ]; then \
    yarn run build; \
  elif [ -f package-lock.json ]; then \
    npm run build; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm run build; \
  else \
    echo "No lockfile found. Exiting..." && exit 1; \
  fi

# Stage 3: Create the production-ready image
FROM base AS runner
WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production
# Disable telemetry during runtime for privacy considerations.
# Comment out the line below to enable telemetry.
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user and group for enhanced security while running the application
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy static assets and public files from the builder stage to the production image
RUN \
  if [ -d "/app/public" ]; then \
    COPY --from=builder /app/public ./public; \
  else \
    echo "No public directory found. Skipping copy."; \
  fi

# Create the .next directory for prerender cache and set permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Optimize image size by leveraging Next.js output traces
# For more details, visit: https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the non-root user for security
USER nextjs

# Expose port 3000 for the application
EXPOSE 3000

# Set application environment variables
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Start the Next.js server; server.js is generated during the build process
# For more information, refer to: https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
