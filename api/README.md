# Task Scheduler API build with Express JS, TypeORM, Postgress

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm run start` command


## **`Authentification`**
We use JsonWebToken to authentificate. Token are stored in "`authorization`" property.  
| method | request | encode-type | input name | description | condition |
|--------|---------|-------------|------------|-------------|-----------|
| POST | api/auth/login | x-www-form-urlencoded | mail , password | to login | right mail and password, otherwise error |
| POST | api/auth/logout | | | Logout | Must be  logged in |


## **`CRUD Task `**
| Method | Request | Encode-type | Input name | Description | Condition |
|--------|---------|-------------|------------|-------------|-----------|
| GET | api/task/ |  |  | To get all task | | 
| POST | api/task/ |  |  | To create a task | | 
| GET | api/task/:id | | | To get task name by its id | |
| PUT | api/task/:id | | | Modify Task |  |
| DELETE | api/task/:id | | | To delete task with de id on params | id is an id of an existant task, otherwise get an error message |