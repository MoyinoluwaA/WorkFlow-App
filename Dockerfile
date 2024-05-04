# hadolint ignore=DL3029
FROM --platform=linux/amd64 node:20 AS base

#Add environmental variables
ARG GOOGLE_ID
ARG GOOGLE_SECRET
ARG GITHUB_ID
ARG GITHUB_SECRET
ARG MONGODB_URI
ARG NEXTAUTH_SECRET

ENV GOOGLE_ID $GOOGLE_ID
ENV GOOGLE_SECRET $GOOGLE_SECRET
ENV GITHUB_ID $GITHUB_ID
ENV GITHUB_SECRET $GITHUB_SECRET
ENV MONGODB_URI $MONGODB_URI
ENV NEXTAUTH_SECRET $NEXTAUTH_SECRET

# Stage 1: Build the NextJs app
FROM base AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app
FROM base AS runtime
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
EXPOSE 3000
USER node
CMD ["npm", "start"]
