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