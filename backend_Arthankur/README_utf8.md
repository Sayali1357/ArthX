# Arthankur Backend

Backend for Arthankur - A platform for startups to check eligibility for various government schemes.

## Features

- User Authentication (Login/Register) for startups and investors
- Government schemes eligibility checking based on startup profile
- API endpoints for managing user profiles, schemes, and eligibility

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MongoDB (either local or Atlas)

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd backend_Arthankur/Backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```
   Or for development with auto-reload:
   ```
   npm run dev
   ```

2. Seed the database with sample government schemes:
   ```
   npm run seed
   ```

3. Test MongoDB connection:
   ```
   npm run test-connection
   ```

4. Test scheme eligibility with a sample user:
   ```
   npm run test-eligibility
   ```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user (startup or investor)
- `POST /api/users/login` - Login existing user

### User Profile
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Government Schemes
- `GET /api/government-schemes` - Get all schemes
- `GET /api/government-schemes/:id` - Get scheme by ID
- `GET /api/government-schemes/eligibility/:userId` - Check user eligibility for schemes
- `POST /api/government-schemes` - Add a new scheme (admin only)

## Government Scheme Eligibility Criteria

The eligibility check considers the following parameters:

1. Startup Stage (Idea, Prototype, Early Stage, Growth, Mature)
2. Industry Type (IT/Tech, Healthcare, Education, etc.)
3. Annual Revenue (Pre-revenue, 0-10 Lakhs, etc.)
4. Number of Employees (ranges like 1-10, 11-50, etc.)
5. Registered Location (Metro City, Tier 1/2/3 City, Rural Area)
6. Existing Government Support (Yes/No)

## Development

The backend is built using:
- Express.js - Web framework
- MongoDB/Mongoose - Database and ODM
- JWT - Authentication
- bcrypt - Password hashing
