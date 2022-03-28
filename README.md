
# Nodejs Expressjs SQL MVC WEB API

A REST API Developed with Node.js, Express, and PostgreSQL.

## Getting started

This API Is written in JavaScript ES6. which is Very useful in building  RESTful web APIs for your front-end platforms like Android, iOS or JavaScript frameworks (Angular, Reactjs, etc).

This project will run on **NodeJs** using **PostgreSQL** as database with **Sequelize** as the **ORM**. I am using **JWT** for handling authentications and **JOI** for Validating inputs from the user before they are sent to the server and **Bcrypt** for hashing passwords stored in the database. 
This Project is open for suggestions, Bug reports and pull requests.


## Features

- Basic Authentication (Register/Login with hashed password)
- Email helper ready just import and use.
- JWT Tokens, make requests with a token after login with `auth-token` header with value `yourToken` where `yourToken` will be returned in Login response as a header value of `auth-token`.
- `Role Based Authorization` on **Login**.
- Validations added with `JOI`.
- Included API collection for Postman.
- configured `.babel` to make the code compatible with `ES6`.

## Software Requirements

- Node.js **8+**
- Postgres

## How to install

### Using Git (recommended)

1.  Clone the project from github.

```bash
git clone https://github.com/itisWasp/my-portfolio-API.git
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
yarn install
```

### Setting up environments


1.  Create a new file  `.env` at the root of your project and configure your environment variables accordingly.
   
2.  The file `.env` is already ignored in `.gitignore`, so you never commit your credentials.
3.  The Admin is created by default when the DB is started you can check in `/src/database/config/config.js` for the ADMIN credentials.

## Project structure

```sh
├── src    
    ├── app.js
    ├── index.js
    ├── controllers
    │   ├── Controller.js
    │   └── Controller.js
    ├── models
    │   ├── model.js
    │   └── model.js
    ├── routes
    │   ├── route.js
    │   ├── route.js
    │   └── route.js
    ├── middlewares
    │   ├── middleware.js
    │   ├── middleware.js
    │   ├── middleware.js
    ├── helpers
    │   ├── helpers.js
    │   ├── helpers.js
    │   ├── helpers.js
    │   └── helpers.js
├── test
    │   ├── testConfig.js
    │   ├── testConfig.js
    │   └── testConfig.js
├── package.json
├── package-lock.json            
```

## How to run

### Running API server locally

```bash
yarn dev
```

You will know server is running by checking the output of the command `yarn dev`

```bash
Successfully compiled 20 files with Babel (1232ms).
[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node dist/index.js`
Server Started on Port 5000
Connected to Db
```

**Note:** `we are using nodemon to restart our server in case of any changes` in the project.
You can test the routes by using the [documentation](https://web-api-mvc.herokuapp.com/api/docs/) or by putting the routes in Post man and check for responses and error messages.

### Creating new models

If you need to add more models to the project just create a new file in `/models/` and use them in the controllers.

### Creating new routes

If you need to add more routes to the project just create a new file in `/routes/`.

### Creating new controllers

If you need to add more controllers to the project just create a new file in `/controllers/` and use them in the routes.


## Bugs or improvements

Every project needs improvements, Feel free to report any bugs or improvements. Pull requests are always welcome.

## License

This project is open-sourced software licensed under the MIT License. See the LICENSE file for more information.
