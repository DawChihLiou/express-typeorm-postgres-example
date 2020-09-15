FROM mhart/alpine-node:12
WORKDIR /app
COPY . .
RUN yarn --pure-lockfile && yarn cache clean
RUN yarn build
COPY /dist ./dist
EXPOSE 3000
CMD [ "node", "./dist/bundle.prod.js" ]