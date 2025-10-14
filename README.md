# Blog API

A modern RESTful API built with Express.js and TypeScript for managing blog operations. Features secure authentication with JWT, role-based access control, and comprehensive error handling.

## Features

- **Authentication**: JWT-based access and refresh tokens
- **Authorization**: Role-based access control (admin, user)
- **Security**: Password hashing with bcrypt, CORS, helmet, rate limiting
- **Logging**: Winston logger for error and info tracking
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Express validator for input validation
- **Compression**: Response compression for better performance

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: Helmet, bcrypt, CORS, express-rate-limit
- **Logging**: Winston
- **Development**: Nodemon, ts-node

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd blog-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory and add the following variables:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/blog-api

# JWT
JWT_ACCESS_SECRET=your_access_token_secret_here
JWT_REFRESH_SECRET=your_refresh_token_secret_here
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Logging
LOG_LEVEL=info
```

For reference, see `.env.example` in the root directory.

## Getting Started

### Development

Start the development server with hot-reload:

```bash
npm run dev
```

The server will run on `http://localhost:5000` by default.

### Production Build

Build the TypeScript code to JavaScript:

```bash
npm run build
```

Run the production build:

```bash
npm start
```

## Project Structure

```
src/
├── @types            # Express global types
├── database          # Database connection setup
├── models/           # Mongoose schemas
├── routes/           # API routes
├── controllers/      # Route handlers
├── middleware/       # Custom middleware (auth, validation, etc.)
├── lib/              # Library (JWT, logging, config)
├── utilities/        # Utilities
├── validators/
├── services/
├── server.ts         # Entry point
└── config/           # Configuration management

dist/                 # Compiled JavaScript (generated after build)
```

## API Endpoints

### Authentication

- **Register**: `POST /api/auth/register`
  - Body: `{ email, password, firstName, lastName }`
  - Returns: Access token and refresh token

- **Login**: `POST /api/auth/login`
  - Body: `{ email, password }`
  - Returns: Access token and refresh token

- **Logout**: `POST /api/auth/logout`
  - Headers: `Authorization: Bearer <access_token>`
  - Returns: Success message

- **Get Current User**: `GET /api/users/current`
  - Headers: `Authorization: Bearer <access_token>`
  - Returns: Current user data

- **Refresh Token**: `POST /api/auth/refresh`
  - Body: `{ refreshToken }`
  - Returns: New access token

## Middleware

### Authentication (`authenticate`)

Validates the JWT access token from the `Authorization` header. Attaches `userId` and `role` to the request object.

**Usage**: Applied to protected routes.

### Authorization (`authorize`)

Checks if the authenticated user has the required role(s).

**Usage**:

```typescript
router.get('/admin-only', authenticate, authorize(['admin']), handler);
```

## Error Handling

The API returns consistent error responses:

```json
{
  "code": "ErrorCode",
  "message": "Human-readable error message"
}
```

### Status Codes

- `200` — Success
- `400` — Bad Request
- `401` — Unauthorized (authentication failed)
- `403` — Forbidden (insufficient permissions)
- `404` — Not Found
- `500` — Internal Server Error

## Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **CORS**: Cross-Origin Resource Sharing configured
- **Helmet**: HTTP header security
- **Rate Limiting**: Request rate limiting to prevent abuse
- **Input Validation**: Express validator for request validation

## Environment Variables

See `.env.example` for all available environment variables and their descriptions.

## Development Guidelines

- Use TypeScript for type safety
- Follow the existing code structure
- Add meaningful logging with Winston
- Write descriptive error messages
- Use path aliases (`@/`) for imports

## Testing

Test the API using Postman or similar tools:

1. Start the development server
2. Use the provided endpoints to test authentication and authorization flows
3. Verify error handling with invalid inputs

## Troubleshooting

**MongoDB Connection Error**

- Ensure MongoDB is running locally or check your connection string in `.env`

**Port Already in Use**

- Change the `PORT` in `.env` or kill the process using the port

**Module Not Found Errors**

- Run `npm install` to ensure all dependencies are installed
- Check that path aliases in `tsconfig.json` match your imports

## Contributing

When contributing to this project:

- Follow the existing code style
- Use Prettier for formatting: `npx prettier --write .`
- Write clear commit messages
- Test your changes before pushing

## License

This project is licensed under the Apache License 2.0. See the LICENSE file for details.

## Author

Hajjia Yasira

## Support

For issues, questions, or suggestions, please open an issue in the repository.
