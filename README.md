## Test Credentials

Use the following credentials to test the application:

| Email | Password | Role |
|-------|----------|------|
| anash@gmail.com | 123 | Admin |
| manager@gmail.com | 123 | Manager |
| employee@gmail.com | 123 | Employee |

## Live Link

(https://node-pr-role-auth.vercel.app/login) *(Add your deployed URL here)*

# Role-Based Authentication System

A secure role-based authentication system built with **Node.js**, **Express**, **MongoDB**, **JWT (JSON Web Tokens)**, and **Fetch API**. This application demonstrates user authentication, authorization, and role management with different user roles (Admin, Manager, Employee).

## Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Different access levels for Admin, Manager, and Employee roles
- **Fetch API Integration**: Client-side data fetching for seamless API communication
- **Password Encryption**: Bcrypt for secure password hashing
- **Cookie Management**: Secure token storage using HTTP cookies
- **CRUD Operations**: Create, Read, Update, Delete functionality for user management
- **Dashboard**: Role-specific dashboard views

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, Bcrypt
- **Frontend**: EJS Templating, Fetch API
- **Styling**: Bootstrap



## Project Description

### What is Role-Based Authentication?

Role-Based Authentication is a security approach where users are assigned specific roles (Admin, Manager, Employee), and access to different features is controlled based on these roles. This application demonstrates:

- **Login System**: Users authenticate with email and password
- **JWT Tokens**: Secure tokens are generated upon successful login and stored in cookies
- **Protected Routes**: Middleware protects routes and validates JWT tokens
- **Role-Based Views**: Different pages and features are displayed based on user roles
- **Dashboard Management**: Users can view, add, edit, and delete data based on their role permissions

### How It Works

1. User logs in with email and password
2. Backend verifies credentials and generates a JWT token
3. Token is stored in cookies for session management
4. Frontend uses Fetch API to communicate with backend
5. Protected routes check token validity and user role
6. Different UI elements are rendered based on user permissions

## Installation

1. Clone the repository:
```bash
git clone https://github.com/anashali01/Node_PR_RoleAuth.git
cd Node_PR_RoleAuth
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```
PORT=3000
MONGODB_URL=mongodb://localhost:27017/roleauth
API_URL=http://localhost:3000/
```

4. Start the server:
```bash
npm start
```

Or use nodemon for development:
```bash
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:3000/login
```

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `GET /api/logout` - User logout

### User Management (Protected)
- `POST /api/` - Create new user
- `GET /api/` - Get all users
- `GET /api/:id` - Get user by ID
- `PATCH /api/:id` - Update user
- `DELETE /api/:id` - Delete user

## Directory Structure

```
├── controllers/
│   ├── dashboardCtl.js       # Dashboard controller
│   └── userCtrl.js           # User controller
├── models/
│   └── user.model.js         # User schema
├── routes/
│   ├── index.js              # Main router
│   ├── dashboardRouter.js    # Dashboard routes
│   └── user.route.js         # User API routes
├── middlewares/
│   └── dashboardAuth.js      # Authentication middleware
├── config/
│   ├── db.js                 # Database connection
│   ├── axios.js              # Axios instance
│   └── dotenv.js             # Environment configuration
├── views/
│   ├── index.ejs             # Home page
│   └── pages/                # EJS templates
├── public/                   # Static assets
└── index.js                  # Entry point
```

## Security Features

- **Password Hashing**: Bcrypt with salt rounds for secure password storage
- **JWT Tokens**: Tokens are signed and verified for authenticity
- **Protected Routes**: Middleware ensures only authenticated users access protected pages
- **Cookie-Based Sessions**: Tokens stored securely in HTTP-only cookies
- **Role Verification**: Routes check user role before granting access

## Author

Created by **Anash Ali** - [GitHub Profile](https://github.com/anashali01)

## License

MIT License - Feel free to use this project for educational and commercial purposes.

## Support

For issues or questions, please open an issue on the GitHub repository or contact the author.
