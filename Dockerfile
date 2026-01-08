FROM node:25.2.1-alpine

WORKDIR /app

# We don't need COPY or RUN npm install yet if you want to do it manually
# Just keep the container alive
CMD ["tail", "-f", "/dev/null"]