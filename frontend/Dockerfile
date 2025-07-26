# ---------- Stage 1: Build ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all source files
COPY . .

# Build Next.js app
RUN npm run build

# ---------- Stage 2: Production ----------
FROM node:22-alpine

WORKDIR /app

# Copy package.json and install production deps only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the built .next folder and public folder, plus any other needed files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD ["npm", "start"]
