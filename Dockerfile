FROM node:12.19.1 as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn global add rimraf

RUN yarn

COPY . .

RUN yarn build

FROM node:12.19.1-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]