FROM maven:3.6-jdk-13-alpine as maven
WORKDIR /usr/src/app
COPY ./pom.xml ./pom.xml
COPY ./src ./src

RUN mvn dependency:go-offline -B
RUN mvn package

FROM openjdk:13-alpine
WORKDIR /usr/src/app
COPY --from=maven /usr/src/app/target/consumer-1.0-SNAPSHOT.jar ./consumer.jar

CMD ["java", "-jar", "./consumer.jar"]