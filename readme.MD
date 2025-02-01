# Node CRUD Application using Express and MongoDB

A simple CRUD application created using Node, Express and MongoDB

## Running the Application

Start the express server using the command below and access the application using `localhost:3000/users`

`npm start`

## Available Routes

### Create a new user
Endpoint: POST  localhost:3000/users
<br>
Data: 
```json
{   "firstName": "John", 
    "lastName": "Doe",
    "age": 24
}
```

### Fetch all users
Endpoint: GET localhost:3000/users

### Fetch user by id
Endpoint: GET localhost:3000/users/{id}

### Updating the user
Endpoint: PUT  localhost:3000/users/{id}
<br>
Data: 
```json
{   "firstName": "John", 
    "lastName": "Doe",
    "age": 24
}
```

### Delete the user
Endpoint: DELETE localhost:3000/users/{id}