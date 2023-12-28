# Muvistack API

A simple server using Express and Typescript to deploy a RESTful API. (features to come)

## Getting Started

### Installation

After cloning the repo, install the dependencies:

```
pnpm install
```

### Local Development

To run the application locally, run the command:

```
pnpm dev
```

## Features

A list of planned and completed features relating to the architecture:

- ❌ MySQL database: using a [Planetscale](https://planetscale.com/) serverless database
- ❌ Type-safe ORM: using [DrizzleORM](https://orm.drizzle.team/)
- ❌ Authentication and authorization: using [passport](https://www.passportjs.org/)
- ❌ Validation: using data validation with [Zod](https://zod.dev/)
- ✅ Logging: using [Pino](https://github.com/pinojs/pino)
- ❌ Testing: unit and integration tests using [Jest](https://jestjs.io/)
- ❌ Error handling: centralized error handling mechanism with logging
- ❌ API documentation: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- ✅ Dependency management: with [pnpm](https://pnpm.io/)
- ✅ Environment variables: using [dotenv](https://github.com/motdotla/dotenv)
- ✅ Security: set security HTTP headers using [helmet](https://helmetjs.github.io/)
- ❌ Sanitizing: sanitize request data against XSS and query injection
- ✅ CORS: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- ❌ Docker support
- ❌ Code coverage
- ❌ Code quality
- ❌ Git hooks
- ✅ Linting: with ESLint and Prettier
- ❌ Editor config

...more API features and detailst to come
