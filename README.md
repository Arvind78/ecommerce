# ShopNow E-commerce Application

## Description

ShopNow is a full-fledged e-commerce application built with a tech stack consisting of React.js, Redux, CSS, Bootstrap, Chakra UI, Highcharts, Node.js, Express.js, MongoDB, and other essential packages. It offers a comprehensive set of features for both users and administrators.

### Features

#### User Features:
- **User Registration and Account Verification:** Users can register their accounts and verify them via email.
- **Login and Profile Management:** Users can log in to their accounts, update profile details, and set profile images.
- **Password Reset:** Users can request a password reset via email. Tokens are sent to their email addresses for security.
- **Persistent User Data:** User data is stored and managed using Redux for seamless access across the application.
- **Shopping Cart and Checkout:** Users can add products to their shopping cart and proceed to checkout. A PayPal payment gateway is integrated for secure payments.
- **Order Tracking:** After checkout, users receive an email with order tracking details. They can also view their order history and details in their account.
- **Wishlist:** Users can add products to their wishlist for future purchase consideration.

#### Admin Features:
- **Dashboard:** Admins have access to a dashboard displaying essential business metrics using Highcharts.
- **Order Management:** Admins can view, update, and delete orders. They can also update order statuses.
- **Product Management:** Admins can add, view, update, and delete products.
- **Enquiry Management:** Admins can view all user enquiries.
- **Profile Management:** Admins can update their profile details and set profile images.
- **Password Reset:** Admins can request a password reset via email. Tokens are sent to their email addresses for security.

### Tech Stack
- **Frontend:** React.js, Redux, CSS, Bootstrap, Chakra UI, Highcharts
- **Backend:** Node.js, Express.js, MongoDB
- **Security:** XSS Protection, Helmet, bcrypt.js, JSON Web Tokens (JWT), Multer, Cloudinary, Nodemailer
- **Payment Gateway:** PayPal

## Running the Application

### Frontend
1. Extract the zip folder.
2. Navigate to the `client/shopnow` directory.
3. Install dependencies: `npm install`.
4. Run the application: `npm run dev`.
5. Access the application at `http://localhost:5173`.

### Backend
1. Extract the zip folder.
2. Navigate to the `server` directory.
3. Install dependencies: `npm install`.
4. Run the server: `npm start`.
5. Access the backend at `http://localhost:8080`.

## Developer
- **Developer:** Arvind Varma

## PayPal Payment Gateway Integration
- PayPal payment gateway is integrated into the application for secure online payments.

## Production Level Application

ShopNow is a production-level e-commerce application designed to provide a seamless shopping experience for users and efficient management tools for administrators. It offers a wide range of features, robust security measures, and a user-friendly interface to cater to the needs of both customers and businesses.
