FROM node:22-alpine AS build
WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
ARG API_URL=https://api.cabalgataskgoriwayra.com
ENV API_URL=${API_URL}

RUN npm run build -- --configuration=production

FROM nginx:alpine AS final
# Install curl for docker healthcheck
RUN apk add --no-cache curl

# Copy custom Nginx configuration
COPY ../docker/nginx.conf /etc/nginx/nginx.conf

# Copy build artifacts to nginx public html
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
