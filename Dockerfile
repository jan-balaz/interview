FROM node:12-alpine as fe
WORKDIR /fe
COPY ./fe/ .
RUN npm install
RUN npm run-script build

FROM maven:3.6.3-jdk-8 as be
WORKDIR /be
COPY ./be/ .
COPY --from=fe /fe/build src/main/resources/static
RUN mvn clean verify

FROM openjdk:8-jdk-alpine
COPY --from=be /be/target/ecommerce-0.0.1-SNAPSHOT.jar ./app.jar
EXPOSE 8080
RUN adduser -D user
USER user
CMD [ "sh", "-c", "java -jar app.jar" ]
