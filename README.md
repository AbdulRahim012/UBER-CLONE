# API Documentation for `/user/register` Endpoint

## **Endpoint**
`POST /user/register`

---

## **Description**
This endpoint allows a new user to register by providing their first name, last name (optional), email, and password. If the provided data is valid and the email is unique, the user is created and an authentication token is returned.

---

## **Request Body**
The request body must include the following fields:

### **Schema**

| Field                | Type   | Required | Validation                                   | Description                              |
|----------------------|--------|----------|---------------------------------------------|------------------------------------------|
| `fullname.firstname` | String | Yes      | Minimum length: 3 characters               | The user's first name                    |
| `fullname.lastname`  | String | No       | Minimum length: 3 characters (if provided) | The user's last name                     |
| `email`              | String | Yes      | Valid email format, unique                 | The user's email address                 |
| `password`           | String | Yes      | Minimum length: 6 characters               | The user's password (stored securely)    |

### **Example Request Body**
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securepassword123"
}
```

---

## **Response**
### **Success Response**
- **Status Code**: `201 Created`
- **Description**: User registration successful. Returns a JWT token and the created user object (excluding the password).

#### **Example**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null,
        "_id": "64ef92baf5468c30d1234567",
        "__v": 0
    }
}
```

### **Validation Errors**
- **Status Code**: `400 Bad Request`
- **Description**: One or more validation errors occurred in the request body.

#### **Example**
```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "First name must be at least 3 characters long",
            "param": "fullname.firstname",
            "location": "body"
        }
    ]
}
```

### **Conflict Error**
- **Status Code**: `400 Bad Request`
- **Description**: The email is already registered.

#### **Example**
```json
{
    "message": "User already exist"
}
```

---

## **Business Logic Overview**
1. **Validation**: Input fields are validated using `express-validator`.
2. **Duplicate Check**: Checks if a user with the given email already exists.
3. **Password Hashing**: The password is hashed using `bcrypt` before being stored in the database.
4. **User Creation**: Calls the `createUser` function in `user.service.js` to save the user in the database.
5. **Token Generation**: Generates a JWT token for the user.
6. **Response**: Sends the token and user data (excluding the password) in the response.

---

## **Implementation Details**
### **Controller: `registerUser`**
- Handles the business logic for user registration.
- Validates input, checks for duplicate email, hashes the password, and creates the user.
- Generates a JWT token.

### **Service: `createUser`**
- Abstracts the database interaction logic.
- Creates and saves the user object in the database.

### **Validation Middleware**
- Uses `express-validator` to ensure:
  - `email` is valid.
  - `fullname.firstname` is at least 3 characters long.
  - `password` is at least 6 characters long.

---

## **Notes**
- Ensure `JWT_SECRET` is set in the environment variables for token generation.
- Passwords are stored securely using bcrypt hashing.
- Responses do not include sensitive information like the password.

# API Documentation for `/user/login` Endpoint

## **Endpoint**
`POST /user/login`

---

## **Description**
This endpoint allows an existing user to log in by providing their email and password. If the credentials are valid, a JWT token is returned for authentication.

---

## **Request Body**
The request body must include the following fields:

### **Schema**

| Field     | Type   | Required | Validation                     | Description                        |
|-----------|--------|----------|---------------------------------|------------------------------------|
| `email`   | String | Yes      | Valid email format             | The user's registered email        |
| `password`| String | Yes      | Minimum length: 6 characters   | The user's account password        |

### **Example Request Body**
```json
{
    "email": "john.doe@example.com",
    "password": "securepassword123"
}
```

---

## **Response**
### **Success Response**
- **Status Code**: `200 OK`
- **Description**: Login successful. Returns a JWT token and basic user information.

#### **Example**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null,
        "_id": "64ef92baf5468c30d1234567",
        "__v": 0
    }
}
```

### **Validation Errors**
- **Status Code**: `400 Bad Request`
- **Description**: One or more validation errors occurred in the request body.

#### **Example**
```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Password must be at least 6 characters long",
            "param": "password",
            "location": "body"
        }
    ]
}
```

### **Unauthorized Error**
- **Status Code**: `401 Unauthorized`
- **Description**: Incorrect email or password.

#### **Example**
```json
{
    "message": "Invalid email or password"
}
```

---

## **Business Logic Overview**
1. **Validation**: Input fields are validated using `express-validator`.
2. **Email Check**: Verifies that a user with the given email exists.
3. **Password Comparison**: Uses `bcrypt` to compare the hashed password in the database with the provided password.
4. **Token Generation**: Generates a JWT token for the authenticated user.
5. **Response**: Sends the token and user data (excluding the password) in the response.

---

## **Implementation Details**
### **Controller: `loginUser`**
- Handles the business logic for user login.
- Validates input, checks user existence, compares passwords, and generates a token.

### **Validation Middleware**
- Uses `express-validator` to ensure:
  - `email` is valid.
  - `password` is at least 6 characters long.

---

## **Notes**
- Ensure `JWT_SECRET` is set in the environment variables for token generation.
- Password comparison is done securely using bcrypt.
- Responses do not include sensitive information like the password.

# API Documentation for `/user/profile` Endpoint

## **Endpoint**
`GET /user/profile`

---

## **Description**
This endpoint allows an authenticated user to retrieve their profile details.

---

## **Headers**
The request must include the following header:

| Header Name   | Value       | Required | Description                             |
|---------------|-------------|----------|-----------------------------------------|
| `Authorization` | `Bearer <JWT Token>` | Yes      | JWT token generated upon login or registration |

---

## **Response**
### **Success Response**
- **Status Code**: `200 OK`
- **Description**: Returns the authenticated user's profile details.

#### **Example**
```json
{
    "_id": "64ef92baf5468c30d1234567",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
}
```

### **Unauthorized Error**
- **Status Code**: `401 Unauthorized`
- **Description**: The user is not authenticated.

#### **Example**
```json
{
    "message": "Unauthorized access"
}
```

---

## **Business Logic Overview**
1. **Authentication**: Middleware validates the JWT token and attaches the user object to `req.user`.
2. **Response**: Sends the user object as the response.

---


# API Documentation for `/user/logout` Endpoint

## **Endpoint**
`GET /user/logout`

---

## **Description**
This endpoint logs out an authenticated user by clearing their authentication token and blacklisting it to prevent future use.

---

## **Headers**
The request must include a valid authentication token.

### **Schema**

| Field              | Type   | Required | Description                      |
|--------------------|--------|----------|----------------------------------|
| `Authorization`    | String | Yes      | The JWT token of the user        |

### **Example Header**
```
Authorization: Bearer <JWT_TOKEN>
```

---

## **Response**
### **Success Response**
- **Status Code**: `200 OK`
- **Description**: Logout successful. The user's token is invalidated.

#### **Example**
```json
{
    "message": "Logged out"
}
```

### **Error Responses**
- **Status Code**: `400 Bad Request`
- **Description**: Missing or invalid token.

#### **Example**
```json
{
    "message": "Token is required for logout"
}
```

---

# Captain Registration API Documentation

This document outlines the usage and details of the `/captains/register` endpoint for registering a new captain (driver) in the system. It details the required fields, validation rules, possible responses, and status codes.

## Endpoint: `POST /captains/register`

### Description

The `POST /captains/register` endpoint allows new captains to register by providing their personal and vehicle information. It validates the provided data, creates a new captain entry in the database, and returns a **JWT token** for future authentication.

### Request Body

The request body must contain a JSON object with the following fields:

```json
{
  "fullname": {
    "firstname": "string",  // Required: First name (min 3 characters)
    "lastname": "string"    // Optional: Last name (min 3 characters)
  },
  "email": "string",         // Required: Valid email address
  "password": "string",      // Required: Password (min 6 characters)
  "vehicle": {
    "color": "string",       // Required: Vehicle color (min 3 characters)
    "plate": "string",       // Required: Vehicle plate number (min 3 characters)
    "capacity": "number",    // Required: Vehicle capacity (min 1)
    "vehicleType": "string"  // Required: Vehicle type: 'car', 'motorcycle', or 'auto'
  }
}
