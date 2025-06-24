# Step 1: Build the project using Maven and JDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copy pom.xml first for better layer caching
COPY server/pom.xml ./pom.xml

# Copy source code
COPY server/src ./src

# Build the project
RUN mvn clean package -DskipTests

# Step 2: Runtime image
FROM eclipse-temurin:21-jdk-jammy

# Copy the built JAR from the build stage
COPY --from=build /app/target/be-0.0.1-SNAPSHOT.jar be.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "be.jar"]