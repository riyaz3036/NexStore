# Step 1: Build the project using Maven and JDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copy source code
COPY . .

# Build the project
RUN mvn clean package -DskipTests

# Step 2: Runtime image
FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar backend.jar

# ✅ Copy the uploads directory from the build context
COPY uploads/ /app/uploads/

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "backend.jar"]