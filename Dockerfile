FROM node:alpine AS build-env
ADD . /app
WORKDIR /app
RUN yarn install && yarn build

FROM gcr.io/distroless/nodejs
COPY --from=build-env /app/dist /
CMD ["app.js"]