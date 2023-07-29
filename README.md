# Store Manager

Store Manager is an API for sales management, where it's possible to create, view, delete, and update products and sales. The objective was to learn the MSC (Model-Service-Controller) architecture, use the MySQL database for data management, set up API routes using Express, and perform tests with Mocha, Chai, and Sinon.

## Table of Contents

* [Technologies Used](#technologies-used)
* [Features](#features)
* [Prerequisites](#prerequisites)
* [Installation and Running the API](#installation-and-running-the-api)
* [Tests](#tests)
* [API Endpoints](#api-endpoints)
* [Acknowledgments](#acknowledgments)

## Technologies Used

The following technologies were used in the development of the Store Manager API:

- Node.js
- Express.js
- MySQL
- Docker
- Docker Compose
- Mocha (Testing framework)
- Chai (Assertion library)
- Sinon (Test spies, stubs, and mocks)

## Features

The Store Manager API provides the following features:

- Create, view, update, and delete products.
- Create, view, update, and delete sales transactions.

## Prerequisites

Before running the project, make sure you have Docker and Docker Compose installed on your system. If you don't have them installed, follow the instructions below:

- Install Docker: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
- Install Docker Compose: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

## Installation and Running the API

1. Clone the repository:
    ```bash
    git clone https://github.com/tormelo/store-manager.git
    ```
2. Navigate to the project folder:
    ```bash
    cd store-manager
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the MySQL and API containers using Docker Compose:
    ```bash
    docker-compose up -d
    ```
5. Access the store_manager container terminal by running the command:
    ```bash
    docker exec -it store_manager bash
    ```
6. Inside the container terminal run the command to populate the database:
    ```bash
    npm run restore-db
    ```
7. Inside the container terminal, start the API:
    ```bash
    npm run debug
    ```
    or
    ```bash
    npm run start
    ```
8. The API will be accessible at `http://localhost:3000`.

## Tests

To run the tests, follow these steps:

1. Access the store_manager container terminal by running the command:
    ```bash
    docker exec -it store_manager bash
    ```
2. Inside the container terminal, run the tests with the command:
    ```bash
    npm run test
    ```

The test results and coverage report will be displayed in the terminal.

## API Endpoints

### Products
- **GET /products/search?q=query**: Search for products based on the provided query.
- **GET /products**: Get a list of all products.
- **GET /products/:id**: Get the details of a specific product.
- **POST /products**: Create a new product.
- **PUT /products/:id**: Update an existing product.
- **DELETE /products/:id**: Delete a product.

### Sales
- **GET /sales**: Get a list of all sales transactions.
- **GET /sales/:id**: Get the details of a specific sale transaction.
- **POST /sales**: Create a new sales transaction.
- **PUT /sales/:id**: Update an existing sale transaction.
- **DELETE /sales/:id**: Delete a sale transaction.

## Acknowledgments

This project was developed during the Web Development course at Trybe. Special thanks to all the instructors who contributed to the learning process and helped in the development of this project.