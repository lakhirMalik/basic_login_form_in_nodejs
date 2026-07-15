# Auth App (Node.js + Express + MongoDB)

Login / Register / Forgot Password / Reset Password system.

## Folder Structure
```
project/
├── server.js
├── .env
├── package.json
├── controllers/
│   └── authController.js
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js
└── public/
    ├── login.html
    ├── register.html
    ├── forgot-password.html
    ├── reset-password.html
    └── style.css
```

## Setup Steps

1. **Make sure MongoDB is installed and running**
   - If installed as a Windows service, it should already be running.
   - Test with: `mongosh` (should connect without errors)

2. **Install dependencies**
   ```
   npm install
   ```

3. **Check your `.env` file** (already included, edit if needed)
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/authApp
   JWT_SECRET=mySuperSecretKey123
   ```

4. **Run the server**
   ```
   npm run dev
   ```
   (or `npm start` if you don't have nodemon)

5. **Open in browser**
   ```
   http://localhost:5000/login.html
   http://localhost:5000/register.html
   http://localhost:5000/forgot-password.html
   ```

## API Endpoints

| Method | Endpoint                              | Body                          |
|--------|----------------------------------------|--------------------------------|
| POST   | `/api/auth/register`                  | `{ name, email, password }`   |
| POST   | `/api/auth/login`                     | `{ email, password }`         |
| POST   | `/api/auth/forget-password`           | `{ email }`                   |
| POST   | `/api/auth/reset-password/:token`     | `{ newPassword }`             |

## How it works

1. **Register** → password is hashed with bcrypt → user saved in MongoDB.
2. **Login** → password compared with bcrypt → JWT token returned, stored in browser `localStorage`.
3. **Forgot Password** → generates a random token, saves it (with 1-hour expiry) on the user document, and returns a reset link. *(In production, this link should be emailed via nodemailer instead of shown on screen — see note in `authController.js`.)*
4. **Reset Password** → validates the token + expiry, then updates the password.


