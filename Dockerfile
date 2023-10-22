FROM gradle:7.6.1-jdk17 AS builder
WORKDIR /usr/src/app
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]