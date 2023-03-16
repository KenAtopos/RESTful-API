# RESTful-API

This project provides a simple RESTful API for managing articles in a wiki-like platform. The API allows users to create, read, update, and delete articles. The project is built using Node.js, Express, MongoDB, and Mongoose.

## Prerequisites
Before you begin, ensure you have the following installed on your system:

- Node.js and npm
- MongoDB

## Installation
1. Clone the repository to your local machine.
    ```
    git clone https://github.com/KenAtopos/wiki-api.git
    ```
2. Change into the project directory.
    ```
    cd wiki-api
    ```

3. Install the required dependencies.
    ```
    npm install
    ```

4. Start the MongoDB service (if it's not already running).
    ```
    sudo service mongod start
    ```
5. Start the server.
    ```
    node app.js
    ```
The server should now be running at `http://localhost:3000`.

## API Endpoints
`/articles`
- GET: Retrieve all articles.
- POST: Create a new article.
- DELETE: Delete all articles.

`/articles/:articleTitle`
- GET: Retrieve an article by its title.
- PUT: Replace an existing article with a new one.
- PATCH: Update an article's title and/or content.
- DELETE: Delete an article by its title.
