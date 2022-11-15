FROM node:16

WORKDIR /app

COPY . .

RUN git submodule init
RUN git submodule update

RUN yarn

CMD [ "yarn", "start" ]