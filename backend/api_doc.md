# API Documentation

## AuthController

### Register a New User

**POST** `/register`

**Request Body:**
- `username` (string, required, unique)
- `email` (string, required, unique)
- `password` (string, required)

**Response:**
- `201 Created`
```json
{
    "id": "integer",
    "username": "string",
    "email": "string",
    "imgUrl": "string",
    "supporter": "boolean",
}
```

**Errors:**
- `400 Username is required. Please provide your username and try again`
- `400 Email is required. Please provide your email and try again`
- `400 Password is required. Please provide your password and try again`

### User Login

**POST** `/login`

**Request Body:**
- `username` (string, required)
- `password` (string, required)

**Response:**
- `200 OK`
```json
{
    "access_token": "string",
    "user": {
        "id": "integer",
        "username": "string",
        "email": "string",
        "imgUrl": "string"
    }
}
```

**Errors:**
- `400 Username is required. Please provide your username and try again`
- `400 Password is required. Please provide your password and try again`
- `401 Invalid username or password. Please try again`

### Google Sign-In

**POST** `/google-signin`

**Request Headers:**
- `google_token` (string, required)

**Response:**
- `200 OK`
```json 
{
    "access_token": "string",
    "user": {
        "id": "integer",
        "username": "string",
        "email": "string",
        "imgUrl": "string"
    }
}
```
or
- `201 Created`
```json
{
    "id": "integer",
    "username": "string",
    "email": "string",
    "imgUrl": "string",
    "supporter": "string",
}
```


**Errors:**
- `400 GOOGLE_TOKEN_REQUIRED`

## ChatController

### Chat with GPT

**POST** `/chat`

**Request Body:**
- `message` (string, required)

**Response:**
- `200 OK`
```json
{
    "message": "string"
}
```


**Errors:**
- `400 Message is required`

## SavedRecipeController

### Save a Recipe

**POST** `/save-recipe`

**Request Body:**
- `RecipeId` (integer, required)
- `title` (string, required)
- `image` (string, required)

**Response:**
- `201 Created`
```json
{
    "message": "Recipe saved successfully",
    "savedRecipe": {
        "id": "integer",
        "UserId": "integer",
        "RecipeId": "integer",
        "title": "string",
        "image": "string",
    }
}
```

**Errors:**
- `400 This recipe is already marked as favorite`

### Get Saved Recipes

**GET** `/save-recipe`

**Response:**
- `200 OK`
```json
[
    {
        "id": "integer",
        "RecipeId": "integer",
        "UserId": "integer",
        "title": "string",
        "image": "string",
    }
    ...
]
```

**Errors:**
- `401 Access denied: Please log in first`

### Delete a Saved Recipe

**DELETE** `/save-recipe/:favid`

**Response:**
- `200 OK`
```json
{
    "message": "Recipe has been deleted"
}
```

**Errors:**
- `404 Item not found. Please check the ID and try again`

## Supporter

### Update Supporter Status

**POST** `/update-supporter-status`

**Response:**
- `200 OK`
```json
{
    "message": "Your accound has been upgrade to supporter"
}
```

**Errors:**
- `404 User not found`

