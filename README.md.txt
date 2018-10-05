
There are two parts to this code:
1. server side code using RESTful webservices with H2 database.
a. server side code resides in Todo/src/main/java
b. to start the server side code using springboot app: go to Todo folder in cmd prompt & execute the below command:
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8080

2. UI code using angular
a. UI side code resides in src/main/resources/static
b. to start the UI side code using angular cli: go to Todo/src/main/resources/static folder in cmd prompt & execute the below command:
ng serve --open



