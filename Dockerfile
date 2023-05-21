# ---- Base Node ----
FROM node:19-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY docker.env .env.local

# ---- Dependencies ----
FROM base AS dependencies
RUN (npm ci || true)

# ---- Build ----
FROM dependencies AS build
COPY . .
RUN (npm run build || true)

# ---- Production ----
FROM node:19-alpine AS production
RUN apk update && apk add --no-cache curl
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
COPY --from=build /app/next.config.js ./next.config.js
COPY --from=build /app/next-i18next.config.js ./next-i18next.config.js

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
