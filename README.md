# Pantry
[![Pantry build](https://github.com/kjhoerr/pantry/actions/workflows/build.yml/badge.svg?branch=trunk)](https://github.com/kjhoerr/pantry/actions/workflows/build.yml) [![License: BlueOak 1.0.0](https://img.shields.io/badge/License-BlueOak_1.0.0-green.svg)](https://blueoakcouncil.org/license/1.0.0)

This project uses [Quarkus](https://quarkus.io/) and [NextJS](https://nextjs.org/) in a monorepo. [GraphQL](https://graphql.org/) is used as the API, with [MongoDB](https://www.mongodb.com/) as the main store and styled with [Tailwind CSS](https://tailwindcss.com/) and components.

## Running the application in dev mode

Developing both front-end and back-end in tandem needs some connecting. The GraphQL schema is accessible while the back-end is running, typically at `localhost:8080/graphql/schema.graphql`. Pantry uses the `graphql-codegen` library to query for that endpoint and automatically generate hooks for the front-end to utilize schema changes. This can be run with the command:

```shell script
yarn codegen
```

You can run the application in dev mode that enables live coding using:
```shell script
mvn quarkus:dev
```

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

## Creating a Docker image

There are separate Dockerfiles available for different use cases in building Pantry. [`Dockerfile.multistage`](src/main/docker/Dockerfile.multistage) was created in order to build the entire application from source with Docker as the only dependency. It uses a distroless image so the image size is small. Other options are available as well (JVM, native, etc.) but require Yarn and Maven to prep the source for the image.

For instance, to build a JVM Docker image of Pantry, run:

```bash
# Use yarn to build the NextJS front-end and copy it into server resources
yarn inject
# Build the Java jar
maven package
# Build the Docker image based on the jar
docker build -t kjhoerr/pantry:jvm -f src/main/docker/Dockerfile.jvm .
```

## License

This project is licensed under [the Blue Oak Model License 1.0.0](LICENSE.md).
