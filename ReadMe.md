# Technology Stack

- **Programming Language:** TypeScript
- **Web Framework:** Express.js
- **Object Relation Model (ORM):** Prisma
- **Database:** PostgreSQL

# Models

## User Model

 `User` model with the following fields:

- `id`: A UUID generated using the `@default(uuid())` attribute.
- `name`: A string representing the user's name.
- `email`: A unique string representing the user's email.
- `password`: A string representing the user's password.
- `role`: A string with values 'admin' or 'customer'.
- `contactNo`: A string for the user's contact number.
- `address`: A string for the user's address.
- `profileImg`: A string for the user's profile image.

## Category Model

`Category` model with the following fields:

- `id`: A UUID generated using the `@default(uuid())` attribute.
- `title`: A string representing the category title.

## Book Model

 `Book` model with the following fields:

- `id`: A UUID generated using the `@default(uuid())` attribute.
- `title`: A string representing the book's title.
- `author`: A string representing the book's author.
- `price`: A floating-point number representing the book's price.
- `genre`: A string representing the book's genre.
- `publicationDate`: A string field representing the book's publication date.
- `categoryId`: A UUID representing the category to which the book belongs.

## Review And Rating Model

`ReviewAndRating` model with the following fields:

- `id`: A UUID generated using the `@default(uuid())` attribute.
- `review`: A string representing the user's review.
- `rating`: An integer representing the user's rating (1 - 5).
- `userId`: A UUID representing the user who submitted the review.
- `bookId`: A UUID representing the book being reviewed.

## Order Model

 `Order` model with the following fields:

- `id`: A UUID generated using the `@default(uuid())` attribute.
- `userId`: A UUID representing the user who placed the order.
- `orderedBooks`: A JSON field containing an array of objects, each with book ID and quantity.
- `status`: A string with values 'pending', 'shipped', or 'delivered', defaulting to 'pending'.
- `createdAt`: A DateTime field representing the order creation timestamp.

# Storing Ordered Books
## Using JSON Type
1. **Example JSON Structure:**

```json
[
   {
      "bookId": "UUID1",
      "quantity": 2
   },
   {
      "bookId": "UUID2",
      "quantity": 1
   }
]
```

### Application Routes

#### User

- Sign Up User
  - Endpoint: `api/v1/auth/signup` (POST)

- Get All Users
  - Endpoint: `api/v1/users` (GET)

- Get User by ID
  - Endpoint: `api/v1/users/6177a5b87d32123f08d2f5d4` (Single GET)
    - Include an ID that is saved in database.

- Update User
  - Endpoint: `api/v1/users/6177a5b87d32123f08d2f5d4` (PATCH)
    - Include an ID that is saved in database.

- Delete User
  - Endpoint: `api/v1/users/6177a5b87d32123f08d2f5d4` (DELETE)
    - Include an ID that is saved in database.

- Get User Profile
  - Endpoint: `api/v1/profile` (GET)

#### Category

- Create Category
  - Endpoint: `api/v1/categories/create-category` (POST)

- Get All Categories
  - Endpoint: `api/v1/categories` (GET)

- Get Category by ID
  - Endpoint: `api/v1/categories/6177a5b87d32123f08d2f5d4` (Single GET)
    - Include an ID that is saved in database.

- Update Category
  - Endpoint: `api/v1/categories/6177a5b87d32123f08d2f5d4` (PATCH)
    - Include an ID that is saved in database.

- Delete Category
  - Endpoint: `api/v1/categories/6177a5b87d32123f08d2f5d4` (DELETE)
    - Include an ID that is saved in database.

#### Books

- Create Book
  - Endpoint: `api/v1/books/create-book` (POST)

- Get All Books
  - Endpoint: `api/v1/books` (GET)

- Get Books by Category
  - Endpoint: `api/v1/books/:categoryId/category` (GET)

- Get Book by ID
  - Endpoint: `api/v1/books/:id` (GET)

- Update Book
  - Endpoint: `api/v1/books/:id` (PATCH)

- Delete Book
  - Endpoint: `api/v1/books/:id` (DELETE)

#### Orders

- Create Order
  - Endpoint: `api/v1/orders/create-order` (POST)

- Get All Orders
  - Endpoint: `api/v1/orders` (GET)

- Get Order by ID
  - Endpoint: `api/v1/orders/:orderId` (GET)

#### Test APIs: [You can test out the APIs here](https://book-catalog-backend-tau.vercel.app/)

