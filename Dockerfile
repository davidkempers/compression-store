FROM node:argon

RUN mkdir /src

RUN npm install gulp -g

WORKDIR /src
COPY . /src

EXPOSE 3000
EXPOSE 35729

CMD npm i && npm start
