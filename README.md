<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

This is a microservice based on the [NestJS](https://github.com/nestjs/nest) framework using TypeScript. This project is designed to be the foundation for future microservices, providing a solid structure and initial configurations.

## Project Setup

To install the project dependencies, run:

```bash
$ npm install
```

## Compile and Run the Project

To start the project, you can use the following commands:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run Tests

To run the tests, use the following commands:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out some resources that may be useful when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, visit our [Discord channel](https://discord.gg/G7Qnnhy).
- For more hands-on experience, check out our [official courses](https://courses.nestjs.com/).
- View your application's graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- If you need help with your project (part-time or full-time), check out our [enterprise support](https://enterprise.nestjs.com).
- To stay updated on releases, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- If you are looking for a job or have a job to offer, check out our [job board](https://jobs.nestjs.com).


# Prisma Setup and Installation

## 1. Installing Prisma

To start using Prisma in your project, you first need to install it as a development dependency. This can be done by running the following commands in your terminal:

```bash
npm install prisma --save-dev
```

This will install the Prisma CLI, which is the tool you will use to interact with Prisma.

## 2. Initializing Prisma

Once Prisma is installed, you need to initialize it in your project. This is done with the following command:

```bash
npx prisma init
```

This command will create a new folder called `prisma` in your project, which will contain two important files:

- **schema.prisma**: This file is where you define your data model and the database connection.
- **.env**: This file is used to store environment variables, such as your database credentials.

## 3. Configuring the Database Connection

Open the `schema.prisma` file and configure the connection to your database. By default, Prisma is set up to use PostgreSQL, but if you are using SQLite, you need to change the configuration as follows:

```prisma
datasource db {
  provider = "sqlite" // Change to "sqlite" if you are using SQLite
  url      = env("DATABASE_URL") // The connection URL will be taken from the environment variable
}

generator client {
  provider = "prisma-client-js" // Prisma client generator
}
```

## 4. Configuring the Environment Variable

Now, open the `.env` file and adjust the `DATABASE_URL` variable to point to your SQLite database. It should look like this:

```env
DATABASE_URL="file:./dev.db" // Path to the SQLite database file
```

SQLite uses simple files, so you don't need to configure a host or port; just point it to a local file.

## 5. Creating Tables in the Database

To create tables in your database, you need to define your models in the `schema.prisma` file. For example, to create a `User` model, you can add the following:

```prisma
model User {
  id       Int     @default(autoincrement()) @id // Unique ID that auto-increments
  email    String  @unique // Unique email address
  name     String? // User's name (optional)
  posts    Post[] // Relationship with the Post model
}
```

## 6. Migrations

Once you have defined your models, you can create a migration to apply these changes to the database. Run the following command:

```bash
npx prisma migrate dev --name init
```

This command creates an initial migration. If in the future you decide to add a new field, such as `lastname`, you can modify your model and run:

```prisma
model User {
  id       Int     @default(autoincrement()) @id
  email    String  @unique
  name     String?
  posts    Post[]
  lastname String // New field added
}
```

Then, run the migration again:

```bash
npx prisma migrate dev --name add_new_var_lastname
```

## 7. Generating the Prisma Client

After performing the migrations, make sure to generate the Prisma client so that you can interact with your database from your application:

```bash
npx prisma generate
```

## 8. Synchronizing the Database

If you want to synchronize your Prisma schema with the database without creating a migration, you can use the following command:

```bash
npx prisma db push
```

This command will apply the changes directly to the database.

## Conclusion

By following these steps, you will have correctly set up Prisma in your project and will be ready to start interacting with your database efficiently. Prisma provides a powerful and safe way to manage your data in Node.js and TypeScript applications.