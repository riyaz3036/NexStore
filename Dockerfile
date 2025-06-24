# Step 1: Build the project using Maven and JDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app
COPY ./server/pom.xml .
COPY ./server/src ./src
RUN mvn clean package -DskipTests

# Step 2: Runtime image
FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app
COPY --from=build /app/target/be-0.0.1-SNAPSHOT.jar be.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "be.jar"]
