FROM openjdk:17-jdk-alpine AS builder
WORKDIR /backend
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew bootJar

FROM openjdk:17-jdk-alpine
COPY --from=builder /backend/build/libs/*.jar app.jar
<<<<<<< HEAD
=======

EXPOSE 8080
>>>>>>> 5314b45 (backend Dockerfile fixed)
ENTRYPOINT ["java", "-Dspring.profiles.active=docker","-jar","app.jar"]