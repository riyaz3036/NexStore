# Step 1: Build the project using Maven and JDK 21
FROM maven:3.9.5-openjdk-21 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the source code to the container
COPY . .

# Build the application (skip tests for speed)
RUN mvn clean package -DskipTests

# Step 2: Use a lightweight JDK 21 image to run the app
FROM eclipse-temurin:21-jdk-jammy

# Set working directory in the runtime image
WORKDIR /app

# Copy the built JAR from the previous image
COPY --from=build /app/target/be-0.0.1-SNAPSHOT.jar be.jar

# Expose port 8080 (optional, for documentation)
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "be.jar"]