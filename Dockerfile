FROM gradle:7.6.1-jdk17 AS builder
WORKDIR /usr/src/app
COPY gradlew ./
COPY gradle gradle
COPY build.gradle ./
COPY settings.gradle ./
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew bootJar

FROM openjdk:17
COPY --from=builder /usr/src/app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]