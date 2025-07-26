# ---------- Stage 1: Build ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Install exact dependencies for reproducibility
COPY package*.json ./
RUN npm ci

# Copy source and build the project
COPY . .
RUN npm run build


# ---------- Stage 2: Production ----------
FROM node:22-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy only the built output (no dev files, no source)
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
