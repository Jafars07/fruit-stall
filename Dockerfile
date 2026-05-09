FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

EXPOSE 8000

CMD ["java", "-jar", "target/Fruit-Shop-0.0.1-SNAPSHOT.jar"]