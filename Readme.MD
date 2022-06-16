# Developer Notes
In order to execute the application, NodeJS should be installed on the system.
Note that, you might execute the following commands in order:

- npm init
- npm install

## Database
You should setup MySQL in your localhost and set the db credentials in config/db.config.js
Afterwards, you should create a new database with the name "bookstore" and set its default collation to UTF-8-general
The program will automatically create its own db tables.

## Execution:
One can execute the application via following command:
nodejs server.js

Default Port: 8080 (can be changed in server.js)

## Authentication
Authentication architecture is added only for get methods of each collection as a sample.
Other endpoints do not need any authentication.

## Sample Endpoints
You can find the full postman collection in the repository as well.
(bookstore.postman_collection.json)

- GET {localhost:port}/books
- GET {localhost:port}/book/:id
- PUT {localhost:port}/books/:id
- POST {localhost:port}/books
- DELETE {localhost:port}/book/:id

## Sample UnitTesting
Execute the following command to run unit test: npm test
Note that, unit tests are included as samples only for GET and POST endpoints.

## Author
Onur GÖKER
E-Mail: info[at]onurgoker.com