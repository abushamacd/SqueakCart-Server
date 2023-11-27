<hr>
<hr>

# Squeak Cart - [🔗](https://squeakcart-server.onrender.com/)

<hr>

## Description:

This is an e-commerce website backend which I build in javascript language using NodeJS and ExpressJs. Here I follow modular pattern because modular pattern easy to debug and use MongoDB for database, JWT for secutiry purpose, cloudinary for media management, zod for data validation and winston for log and many more.

## Main Features:

- User can registration and login using email and password.
- Role based api access.
- Admin can add product, product colors, categories, product bands.
- Products get by filter and search condition.
- Admin can write daily blog and create blog categories.
- Customer can give review and feedback about the product
- Blog reader can comment the on blog and have option like/dislike the blog post.

---

## Table of Contents

1. [Installation](#installation)
1. [Dependencies](#dependencies)
1. [Usage](#usage)
1. [Endpoints & Request Example](#endpoints--request-example)
1. [License](#license)
1. [Authors](#authors)
1. [Links](#links)

---

> Note: All underscore sentence will be replace my your credentials

## Installation

Pre-requirements

> Must be install node js, npm and nodemon in your operation system.

```bash
# Clone the repository
https://github.com/abushamacd/SqueakCart-Server.git

# Navigate to the project directory
cd SqueakCart-Server

# Install dependencies
npm install
```

## Dependencies

Create .env named file in your project root folder and copy the below code

```bash
DB_URI=your_mongo_db_connection_string
PORT=4000
MAIL_ID="your_gmail_address"
MAIL_PASS="same_gmail_app_password"
CLOUD_NAME="your_cloudinary_cloud_name"
API_KEY="your_cloudinary_api_key"
API_SECRET="your_cloudinary_api_secret"
BCRYPT_SOLT_ROUND=10
CLIENT_URL=your_front_end_site_link || http://localhost:3000
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=365d
JWT_REFRESH_SECRET='your_jwt_refresh_token_secret'
JWT_SECRET='your_jwt_token_secret'
STRIPE_SECRET_KEY=your_stripe_key
```

## Usage

To run this project, run the following command.

```bash
# Start the server
npm dev
```

## Endpoints & Request Example

### User's & Authentication's

<hr><hr>

### _Sign up_

- /api/v1/user (POST)

Request body

```bash
{
    "firstname": "user_first_name",
    "lastname": "user_last_name",
    "email": "user_email",
    "phone": "user_phone_number",
    "password": "user_password"
}
```

<hr>

### _Sign in_

- /api/v1/auth/login (POST)

Request body

```bash
{
    "email": "user_email",
    "password": "user_password"
}
```

<hr>

### _Get new access token_

- /api/v1/auth/refresh-token (POST)

Send refresh token by cookies

<hr>

### _Change password_

- /api/v1/auth/change-password (POST)

Send access token in headers by the authorization field

Request body

```bash
{
    "oldPassword": "old_password",
    "newPassword": "new_password"
}
```

<hr>

### _Make admin_

- /api/v1/auth/set-role/:id (PATCH)

Send access token in headers by the authorization field. :id is replace by user_id

<hr>

### _Block/unblock the user_

- /api/v1/auth/set-restriction/:id (PATCH)

Send access token in headers by the authorization field. :id is replace by user_id

<hr>

### _Get the reset password link_

- /api/v1/auth/forget-password (POST)

Send access token in headers by the authorization field.

Request body

```bash
{
    "email": "user_email",
}
```

<hr>

### _Set the new password_

- /api/v1/auth//reset-password/:token (PATCH)

:token is replace by email token which is send from forget-password endpoints

Request body

```bash
{
    "password": "new_password"
}
```

<hr>

### _Get all users_

- /api/v1/user (GET)

Request body:

<hr>

### _Get single user_

- /api/v1/user/:id (GET)

Request Params: :id is replace by user_id

Request body:

<hr>

### _Update single user_

- /api/v1/user/:id (PATCH)

Request Params: :id is replace by user_id

Request body:

```bash
{
    "firstname": "your_first_name"
}
```

<hr>

### _Delete single user_

- /api/v1/user/:id (DELETE)

Request Params: :id is replace by user_id

<hr>

### _Add product user wishlist_

- /api/v1/user/wishlist (PATCH)

Send access token in headers by the authorization field.

Request body:

```bash
{
    "productId": "product_id"
}
```

<hr>

### _Add product user wishlist_

- /api/v1/user/wishlist (PATCH)

Send access token in headers by the authorization field.

<hr>

### _Get user profile_

- /api/v1/user/profile (PATCH)

Send access token in headers by the authorization field.

<hr>

### Product Category's

<hr><hr>

### _Create product category_

- /api/v1/proCat (POST)

Send access token in headers by the authorization field.

Request body:

```bash
{
    "title": "category_name"
}
```

<hr>

### _Get all product category_

- /api/v1/proCat (GET)

Send access token in headers by the authorization field.

<hr>

### _Get single product category_

- /api/v1/proCat/:id (GET)

Send access token in headers by the authorization field.

Request Params: :id is replace by category_id

<hr>

### _Update single product category_

- /api/v1/proCat/:id (PATCH)

Send access token in headers by the authorization field.

Request Params: :id is replace by category_id

Request body:

```bash
{
    "title": "new_title"
}
```

<hr>

### _Delete single product category_

- /api/v1/proCat/:id (DELETE)

Send access token in headers by the authorization field.

Request Params: :id is replace by category_id

<hr>

### Product Brand's

<hr><hr>

### _Create product brand_

- /api/v1/brand (POST)

Send access token in headers by the authorization field.

Request body:

```bash
{
    "title": "brand_name"
}
```

<hr>

### _Get all product brand_

- /api/v1/brand (GET)

Send access token in headers by the authorization field.

<hr>

### _Get single product brand_

- /api/v1/brand/:id (GET)

Send access token in headers by the authorization field.

Request Params: :id is replace by brand_id

<hr>

### _Update single product brand_

- /api/v1/brand/:id (PATCH)

Send access token in headers by the authorization field.

Request Params: :id is replace by brand_id

Request body:

```bash
{
    "title": "new_title"
}
```

<hr>

### _Delete single product brand_

- /api/v1/brand/:id (DELETE)

Send access token in headers by the authorization field.

Request Params: :id is replace by brand_id

<hr>

### Product Color's

<hr><hr>

### _Create product color_

- /api/v1/color (POST)

Send access token in headers by the authorization field.

Request body:

```bash
{
    "title": "white",
    "code": "#fff"
}
```

<hr>

### _Get all product color_

- /api/v1/color (GET)

Send access token in headers by the authorization field.

<hr>

### _Get single product color_

- /api/v1/color/:id (GET)

Send access token in headers by the authorization field.

Request Params: :id is replace by color_id

<hr>

### _Update single product color_

- /api/v1/color/:id (PATCH)

Send access token in headers by the authorization field.

Request Params: :id is replace by color_id

Request body:

```bash
{
    "title": "new_title",
     "code": "new_code"
}
```

<hr>

### _Delete single product color_

- /api/v1/color/:id (DELETE)

Send access token in headers by the authorization field.

Request Params: :id is replace by color_id

<hr>

### Product's

<hr><hr>

### _Create product_

- /api/v1/product (POST)

Send access token in headers by the authorization field.

Request body:

```bash
{
    "title": "Product_Title",
    "description": "Product_Description",
    "price": 9.99,
    "category": [
        "Product_category_id"
    ],
    "quantity": 10,
    "images": [
        {
            "public_id": "cloudinary_media_public_id",
            "url": "cloudinary_media_url"
        },
        {
            "public_id": "cloudinary_media_public_id",
            "url": "cloudinary_media_url"
        }
    ],
    "color": [
        "Product_color_id"
    ],
    "tag": [
        "tag1"
    ],
    "brand": [
        "Product_brand_id"
    ],
    "sold": 5,
    "view": 100,
    "status": "available"
}
```

<hr>

### _Get all product_

- /api/v1/product (GET)

Send access token in headers by the authorization field.

You can filter by category, color, status, brand, minPrice, maxPrice, sortBy, sortOrder field and search on title by searchTerm field also have to pagination oprion by page, limit field

Request params like this:

```bash
?searchTerm=apple&category=64c24081e6458ed3fbab164e&status=available&color=64c246c0e6458ed3fbab19b5&minPrice=11&maxPrice=100&sortBy=price&sortOrder=1&page=2&limit=5
```

<hr>

### _Get single product_

- /api/v1/product/:id (GET)

Send access token in headers by the authorization field.

Request Params: :id is replace by product_id

<hr>

### _Update single product_

- /api/v1/product/:id (PATCH)

Send access token in headers by the authorization field.

Request Params: :id is replace by product_id

Request body:

```bash
{
    "quantity": 33
}
```

<hr>

### _Delete single product_

- /api/v1/product/:id (DELETE)

Send access token in headers by the authorization field.

Request Params: :id is replace by product_id

<hr>

### Product Coupon's

<hr><hr>

### _Create product coupon_

- /api/v1/coupon (POST)

Send access token in headers by the authorization field.

Request body:

```bash
{
    "title": "Eid Offer",
    "date": "2023-07-03",
    "discount": 10
}
```

<hr>

### _Get all product coupon_

- /api/v1/coupon (GET)

Send access token in headers by the authorization field.

<hr>

### _Get single product coupon_

- /api/v1/coupon/:id (GET)

Send access token in headers by the authorization field.

Request Params: :id is replace by coupon_id

<hr>

### _Update single product coupon_

- /api/v1/coupon/:id (PATCH)

Send access token in headers by the authorization field.

Request Params: :id is replace by coupon_id

Request body:

```bash
{
    "date": "2023-09-03",
    "discount": 15
}
```

<hr>

### _Delete single product coupon_

- /api/v1/coupon/:id (DELETE)

Send access token in headers by the authorization field.

Request Params: :id is replace by coupon_id

<hr>

### Cart's

<hr><hr>

### _Add to cart_

- /api/v1/cart (POST)

Send access token in headers by the authorization field.

Request body:

```bash
{
    "productId": "product_id",
    "count": 2,
    "color": "color_id",
    "price": product_price
}
```

<hr>

### _Get user's cart_

- /api/v1/cart (GET)

Send access token in headers by the authorization field.

<hr>

### _Clear user's cart_

- /api/v1/cart (DELETE)

Send access token in headers by the authorization field.

<hr>

### _Remove single product from cart_

- /api/v1/cart/:id (PATCH)

Send access token in headers by the authorization field.

Request Params: :id is replace by product_id

<hr>

### _Handle quentity of a product_

- /api/v1/cart/cartQuantity/:id (PATCH)

Send access token in headers by the authorization field.

Request Params: :id is replace by product_id

Request body:

```bash
{
    "color": "product_color_id",
    "status": "decrease"
}
```

<hr>

### Blog Category's

<hr><hr>

### _Create blog category_

- /api/v1/blogCat (POST)

Send access token in headers by the authorization field.

Request body:

```bash
{
    "title": "category_name"
}
```

<hr>

### _Get all blog category_

- /api/v1/blogCat (GET)

Send access token in headers by the authorization field.

<hr>

### _Get single blog category_

- /api/v1/blogCat/:id (GET)

Send access token in headers by the authorization field.

Request Params: :id is replace by category_id

<hr>

### _Update single blog category_

- /api/v1/blogCat/:id (PATCH)

Send access token in headers by the authorization field.

Request Params: :id is replace by category_id

Request body:

```bash
{
    "title": "new_title"
}
```

<hr>

### _Delete single blog category_

- /api/v1/blogCat/:id (DELETE)

Send access token in headers by the authorization field.

Request Params: :id is replace by category_id

<hr>

### Blog's

<hr><hr>

### _Create blog_

- /api/v1/blog (POST)

Send access token in headers by the authorization field.

Request body:

```bash
{
    "title": "My First Blog Post2",
    "description": "This is my first blog post using Zod schema.",
    "visibility": "public",
    "date": "2023-07-03",
    "category": ["blog_category_id", "blog_category_id"]
}
```

<hr>

### _Get all blog_

- /api/v1/blog (GET)

Send access token in headers by the authorization field.

<hr>

### _Get single blog_

- /api/v1/blog/:id (GET)

Send access token in headers by the authorization field.

Request Params: :id is replace by blog_id

<hr>

### _Update single blog_

- /api/v1/blog/:id (PATCH)

Send access token in headers by the authorization field.

Request Params: :id is replace by blog_id

Request body:

```bash
{
    "title": "new_title"
}
```

<hr>

### _Delete single blog category_

- /api/v1/blog/:id (DELETE)

Send access token in headers by the authorization field.

Request Params: :id is replace by category_id

<hr>

### contact's

<hr><hr>

### _Create contact_

- /api/v1/contact (POST)

Send access token in headers by the authorization field.

Request body:

```bash
{
  "name": "user_name",
  "email": "user_email",
  "mobile": "user_phone number",
  "comment": "user_message",
  "status": "Submitted"
}
```

<hr>

### _Get all contact_

- /api/v1/contact (GET)

Send access token in headers by the authorization field.

<hr>

### _Get single contact_

- /api/v1/contact/:id (GET)

Send access token in headers by the authorization field.

Request Params: :id is replace by category_id

<hr>

### _Update single contact_

- /api/v1/contact/:id (PATCH)

Send access token in headers by the authorization field.

Request Params: :id is replace by category_id

Request body:

```bash
{
     "status": "Contacted"
}
```

<hr>

### _Delete single contact_

- /api/v1/contact/:id (DELETE)

Send access token in headers by the authorization field.

Request Params: :id is replace by category_id

<hr>

## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Authors

- [Abu Shama](https://www.github.com/abushamacd)

## Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://imshama.com)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abushamacd)
