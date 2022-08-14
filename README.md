# Pantry Project

This project uses Quarkus, the Supersonic Subatomic Java Framework, and NextJS in a monorepo.

If you want to learn more about Quarkus, please visit its website: https://quarkus.io/ .

## Running the application in dev mode

Developing both front-end and back-end in tandem still needs some connecting at the moment. Whenever you make an API change, be sure to grab the OpenAPI spec while the server is running (`http://localhost:8080/q/openapi`) and replace the `src/conf/openapi-pantry.yaml` file. This can be done in one command:

```shell script
yarn api-update
```

You can run your application in dev mode that enables live coding using:
```shell script
yarn dev
```

This will run both the front-end and back-end watchers to update the running code when it is saved. This can be separately in two commands if preferred:
```shell script
yarn dev:fe
mvn quarkus:dev
```

> **_NOTE:_**  Quarkus now ships with a Dev UI, which is available in dev mode only at http://localhost:8080/q/dev/.

## Creating a native executable

First, generate the front-end code and inject it into the Quarkus server using:

```shell script
yarn inject
```

You can create a native executable using: 
```shell script
mvn package -Pnative
```

Or, if you don't have GraalVM installed, you can run the native executable build in a container using: 
```shell script
mvn package -Pnative -Dquarkus.native.container-build=true
```

You can then execute your native executable with: `./target/pantry-1.0.0-SNAPSHOT-runner`

If you want to learn more about building native executables, please consult https://quarkus.io/guides/maven-tooling.

## Related Guides

- SmallRye OpenAPI ([guide](https://quarkus.io/guides/openapi-swaggerui)): Document your REST APIs with OpenAPI - comes with Swagger UI
- Liquibase ([guide](https://quarkus.io/guides/liquibase)): Handle your database schema migrations with Liquibase
- SmallRye JWT ([guide](https://quarkus.io/guides/security-jwt)): Secure your applications with JSON Web Token
- Reactive PostgreSQL client ([guide](https://quarkus.io/guides/reactive-sql-clients)): Connect to the PostgreSQL database using the reactive pattern
- SmallRye Health ([guide](https://quarkus.io/guides/microprofile-health)): Monitor service health

## License

This project is licensed under [the Blue Oak Model License 1.0.0](LICENSE.md).
