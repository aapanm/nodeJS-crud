# Database Info

## Overview

This documentation provides an overview of the database schema defined using Prisma in the Prisma schema file provided. It describes the structure of the database tables, their relationships, and the data types used for each field.

## Prerequisites

To use this database schema, ensure that you have the following prerequisites in place:

- MySQL server installed and running on your local machine.

## Getting Started

1. Ensure that the MySQL server is running.
2. Open the Prisma schema file (`schema.prisma`) to view the defined schema.

## Database Connection

The database connection is established using the following configuration:

- **Provider**: MySQL
- **URL**: `mysql://root@localhost:3306/udp`

about the url:

- **root**: This is the username used to authenticate the connection.
- **localhost**: This is the hostname or IP address of the MySQL server.
- **3306**: This is the port number on which the MySQL server is listening.
- **udp**: This is the name of the database/schema which is set to "udp."

To connect to the database, modify the URL in the `datasource db` section of the Prisma schema file to match your MySQL server configuration.

## Schema Description

### `Parent` Table

The `Parent` table represents parent entities and contains the following fields:

- `id`: An auto-incremented integer field serving as the primary key.
- `parentId`: An integer field that must be unique.
- `firstName`: A string field representing the first name of the parent, with a maximum length of 255 characters.
- `lastName`: A string field representing the last name of the parent, with a maximum length of 255 characters.
- `street`: A string field representing the street address of the parent, with a maximum length of 100 characters.
- `city`: A string field representing the city of the parent, with a maximum length of 100 characters.
- `state`: A string field representing the state of the parent, with a maximum length of 50 characters.
- `zip`: A string field representing the zip code of the parent, with a maximum length of 50 characters.
- `createdAt`: A timestamp field indicating the creation date and time of the parent record.
- `updatedAt`: A timestamp field indicating the last update date and time of the parent record.
- `child`: A one-to-many relationship to the `Children` table, representing the children associated with the parent.

### `Children` Table

The `Children` table represents child entities and contains the following fields:

- `id`: An auto-incremented integer field serving as the primary key.
- `childId`: An integer field that must be unique.
- `firstName`: A string field representing the first name of the child, with a maximum length of 255 characters.
- `lastName`: A string field representing the last name of the child, with a maximum length of 255 characters.
- `parentIdx`: An integer field referencing the parent to which the child belongs.
- `createdAt`: A timestamp field indicating the creation date and time of the child record.
- `updatedAt`: A timestamp field indicating the last update date and time of the child record.

## Database Operations

To perform database operations using the defined schema, follow these steps:

1. Generate Prisma Client: Run `npx prisma generate` in the terminal to generate the Prisma Client, which provides a type-safe API for accessing the database.

2. Follow this link to read about the [Api Documentation](apiDoc.md)
3. [Test Documentation](../unit.xml)
