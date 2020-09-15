# express-typeorm-postgres-example

An API server example built with:

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [class-validator](https://github.com/typestack/class-validator)

## System Requirement

- node >= 12
- docker
- docker-compose
- yarn

## Quick Start

At the project root, please run the following command to start local PostgreSQL and [pgAdmin](https://www.pgadmin.org/).

```bash
docker-compose -d up

```

`postgreSQL` will be available at `localhost:5432`. `pgAdmin` will be available at `localhost:5050`.

After `docker-compose` is running successfully on the background, please run the following command at the project root to start the API server.

```
docker build --tag myapp:latest .
```

Once the build completes, run

```
docker run -p 3000:3000 myapp
```

The application is available at `localhost:3000`.

## Development

The docker image is designed for production. If you want to run the dev server to enable watch mode, please run the following command at the project root to start local server.

First, install the dependencies with yarn.

```
yarn install
```

After all the dependencies are installed, run

```
yarn start
```

to start local dev server. The application server is available at `localhost:3000`.

### Troubleshoot

If you are unable to access your VM through localhost. Please double check with the IP address that your VM is exposing and replace `localhost` with your VM IP address or its alias.

To make sure the database connection works for the application, open `.env` file at the project root, replace `POSTGRES_HOST=localhost` with `POSTGRES_HOST=[your_vm_ip_or_alias]` so the application server can connect to PostgreSQL with the correct host.

## Available Scripts

### `yarn start`

to start dev server. Dev server enables watch mode to detect your code change.

### `yarn build`

to build the project and generate bundle for production. The generated bundle file is located at `dist/bundle.prod.js`

### `yarn test`

to run Jest in watch mode. Jest will run test files and paths that matches the following pattern.

- `src/**/__tests__/**/*.(j|t)s?(x)`
- `src/**/?(*.)(spec|test|t).(j|t)s?(x)`

To generate test coverage report, please run `yarn test --coverage`.

## Project Structure

All the source files are in `/src` folder. Inside `/src`:

```
src
├── __fixtures__
├── controller
├── entity
├── exceptions
├── middlewares
├── utils
├── db.ts
├── index.ts
├── ormconfig.ts
└── routes.ts
```

`__fixtures__`: contains all mock data.

`controller`: contains all api services.

`entity`: contains all typeORM entities that manipulates database tables.

`exceptions`: contains all custom exceptions.

`middleware`: contains all Express.js middleware.

`utils`: contains all utility functions.

`db.ts`: creates database connection.

`index.ts` is the application entry point.

`ormconfig.ts` contains configuration for database connection.

`routes.ts` contains configuration for all API routes, methods, and controllers.

## Database Schema

```
+-------------+--------------+----------------------------+
|                         chef                            |
+-------------+--------------+----------------------------+
| id          | uuid         | PRIMARY KEY NOT NULL       |
| name        | text         | NOT NULL                   |
+-------------+--------------+----------------------------+
```

```
+-----------------+--------------+------------------------+
|                      restaurant                         |
+-----------------+--------------+------------------------+
| id              | uuid         | PRIMARY KEY NOT NULL   |
| name            | text         | NOT NULL               |
| rating          | integer      | NOT NULL               |
| category        | text         | NOT NULL               |
| image           | text         | NOT NULL               |
| popularity      | integer      | NOT NULL               |
| badge           | text         | NOT NULL               |
| availability    | integer      | NOT NULL               |
| locationId      | uuid         | FOREIGN KEY NOT NULL   |
| chefId          | uuid         | FOREIGN KEY NOT NULL   |
+-----------------+--------------+------------------------+
```

```
+-----------------+--------------+------------------------+
|                        location                         |
+-----------------+--------------+------------------------+
| id              | uuid         | PRIMARY KEY NOT NULL   |
| city            | text         | NOT NULL               |
| state           | text         | NOT NULL               |
| country         | text         | NOT NULL               |
| postCode        | text         | NOT NULL               |
| address         | text         | NOT NULL               |
+-----------------+--------------+------------------------+
```

`Chef` has a one-to-many relationship with `Restaurant`s so that each chef owns many restaurants. `Restaurant` has a one-to-one relationship with `Location` so that each restaurant has one location.

## APIs

### Chef

#### `GET /chefs/:id`

To get a single chef's properties and list all the restaurants that he/she owns.

**Parameters**

| parameter | Optional | Description |
| --------- | -------- | ----------- |
| id        |          | chef id     |

**Response**

Status: `200` OK

```ts
interface GetChefsResponse {
  data: {
    id: string
    name: string
    restaurants: Array<{
      id: string
      name: string
      rating: number
      category: string
      image: string
      popularity: number
      badge: string
      availability: number
      location: {
        id: string
        city: string
        state: string
        country: string
        postCode: string
        address: string
      }
    }>
  }
}
```

Status: `404` Not Found

```ts
interface NotFoundResponse {
  error: {
    status: number
    message: string
    detail: null
  }
}
```

#### `POST /chefs`

To save a single chef.

**Body**

| property | Type     | Optional  | Description |
| -------- | -------- | --------- | ----------- |
| name     | `string` | chef name |

**Response**

Status: `200` OK

```ts
interface SaveChefResponse {
  data: {
    id: string
    name: string
  }
}
```

Status: `422` Already Exists

```ts
interface AlreadyExistsResponse {
  error: {
    status: number
    message: string
    detail: null
  }
}
```

#### `POST /chefs/:id/restaurant`

To save a single restaurant owned by a chef with given id.

_It is required to create an restaurant under a existed chef. Please use_ `POST /chefs` _to create a new chef if it is not in the database yet._

**Parameters**

| parameter | Optional | Description |
| --------- | -------- | ----------- |
| id        |          | chef id     |

**Body**

| property          | Type     | Optional | Description                                                                               |
| ----------------- | -------- | -------- | ----------------------------------------------------------------------------------------- |
| name              | `string` |          | more than 10 characters and cannot contain the words ["Free", "Offer", "Book", "Website"] |
| rating            | `number` |          | integer. range between `0` and `5`                                                        |
| category          | `string` |          | can only be one of ["fine-dinning", "street-food", "casual", "ethnic", "family-style"]    |
| image             | `string` |          | url                                                                                       |
| popularity        | `number` |          | integer. range between `0` and `1000`                                                     |
| badge             | `string` |          | popularity <= 300: "awf", popularity <= 700: "meh", popularity > 700: "awesome"           |
| availability      | `number` |          | integer                                                                                   |
| location.city     | `string` |          |                                                                                           |
| location.state    | `string` |          |                                                                                           |
| location.country  | `string` |          |                                                                                           |
| location.postCode | `string` |          | must be 5 characters                                                                      |
| location.address  | `string` |          |                                                                                           |

**Response**

Status: `200` OK

```ts
interface SaveChefsResponse {
  data: {
    id: string
    name: string
    rating: number
    category: string
    image: string
    popularity: number
    badge: string
    availability: number
    location: {
      id: string
      city: string
      state: string
      country: string
      postCode: string
      address: string
    }
  }
}
```

Status: `400` Validation Error

```ts
interface ValidationErrorResponse {
  error: {
    status: number
    message: string
    detail: Array<ValidationError>
  }
}
```

_More about `ValidationError`, please see [class-validator](https://github.com/typestack/class-validator#validation-errors)_

Status: `404` Chef Not Found

```ts
interface NotFoundResponse {
  error: {
    status: number
    message: string
    detail: null
  }
}
```

### Restaurant

#### `GET /restaurants/:id`

To get a single restaurant.

**Parameters**

| parameter | Optional | Description   |
| --------- | -------- | ------------- |
| id        |          | restaurant id |

**Response**

Status: `200` OK

```ts
interface GetRestaurantResponse {
  data: {
    id: string
    name: string
    rating: number
    category: string
    image: string
    popularity: number
    badge: string
    availability: number
    location: {
      id: string
      city: string
      state: string
      country: string
      postCode: string
      address: string
    }
  }
}
```

Status: `404` Not Found

```ts
interface NotFoundResponse {
  error: {
    status: number
    message: string
    detail: null
  }
}
```

#### `PUT /restaurants/:id`

To update a single restaurant.

**Parameters**

| parameter | Optional | Description   |
| --------- | -------- | ------------- |
| id        |          | restaurant id |

**Body**

| property          | Type     | Optional | Description                                                                               |
| ----------------- | -------- | -------- | ----------------------------------------------------------------------------------------- |
| name              | `string` | true     | more than 10 characters and cannot contain the words ["Free", "Offer", "Book", "Website"] |
| rating            | `number` | true     | integer. range between `0` and `5`                                                        |
| image             | `string` | true     | url                                                                                       |
| category          | `string` | true     | can only be one of ["fine-dinning", "street-food", "casual", "ethnic", "family-style"]    |
| popularity        | `number` | true     | integer. range between `0` and `1000`                                                     |
| badge             | `string` | true     | popularity <= 300: "awf", popularity <= 700: "meh", popularity > 700: "awesome"           |
| availability      | `number` | true     |                                                                                           |
| location.city     | `string` | true     |                                                                                           |
| location.state    | `string` | true     |                                                                                           |
| location.country  | `string` | true     |                                                                                           |
| location.postCode | `string` | true     | must be 5 characters                                                                      |
| location.address  | `string` | true     |                                                                                           |

**Response**

Status: `200` OK

```ts
interface UpdateRestaurantResponse {
  data: {
    id: string
    name: string
    rating: number
    category: string
    image: string
    popularity: number
    badge: string
    availability: number
    location: {
      id: string
      city: string
      state: string
      country: string
      postCode: string
      address: string
    }
  }
}
```

Status: `400` Validation Error

```ts
interface ValidationErrorResponse {
  error: {
    status: number
    message: string
    detail: Array<ValidationError>
  }
}
```

_More about `ValidationError`, please see [class-validator](https://github.com/typestack/class-validator#validation-errors)_

Status: `404` Not Found

```ts
interface NotFoundResponse {
  error: {
    status: number
    message: string
    detail: null
  }
}
```

#### `DELETE /restaurants/:id`

To delete a single restaurant.

**Parameters**

| parameter | Optional | Description   |
| --------- | -------- | ------------- |
| id        |          | restaurant id |

**Response**

Status: `200` OK

```ts
interface DeleteRestaurantResponse {
  data: {
    id: string
    name: string
    rating: number
    category: string
    image: string
    popularity: number
    badge: string
    availability: number
    location: {
      id: string
      city: string
      state: string
      country: string
      postCode: string
      address: string
    }
  }
}
```

Status: `404` Not Found

```ts
interface NotFoundResponse {
  error: {
    status: number
    message: string
    detail: null
  }
}
```

#### `POST /restaurants/:id/booking`

To update a single restaurant.

**Parameters**

| parameter | Optional | Description   |
| --------- | -------- | ------------- |
| id        |          | restaurant id |

**Body**

| property       | Type     | Optional | Description     |
| -------------- | -------- | -------- | --------------- |
| numberOfGuests | `number` |          | must be integer |

**Response**

Status: `200` OK

```ts
interface BookRestaurantResponse {
  data: {
    id: string
    name: string
    rating: number
    category: string
    image: string
    popularity: number
    badge: string
    availability: number
    location: {
      id: string
      city: string
      state: string
      country: string
      postCode: string
      address: string
    }
  }
}
```

Status: `400` Validation Error

```ts
interface ValidationErrorResponse {
  error: {
    status: number
    message: string
    detail: Array<ValidationError>
  }
}
```

_More about `ValidationError`, please see [class-validator](https://github.com/typestack/class-validator#validation-errors)_

Status: `404` Not Found

```ts
interface NotFoundResponse {
  error: {
    status: number
    message: string
    detail: null
  }
}
```

## Using pgAdmin

pgAdmin is available for you after running `docker-compose up`. It is a interface for visualizing and managing our database. It is available at `localhost:5050`. Once you reach it in your browser, you will have to enter the default credential we specified in `/docker.env` file.

- Email: example@admin.com
- Password: example

After logging in, you will need to establish a connection to the database. First, under General tab, click on "Add New Service" and enter "chef" as the name of the connection.

Second, Go to Connection tab and put "postgres" as host and enter the database credential listed in `docker.env`

- Username: example
- Password: example

Congrats! You should be able to see the dashboard after creating the connection.

Once the application is running, you can see the tables are automatically created by TypeORM under "Schemas" in the explorer.
