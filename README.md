# Pet Adoption React Project

A full-stack web application for pet adoption built with React and Node.js.

## Features

- User authentication (Sign up and Login)
- Pet catalog and matching
- Pet adoption forms
- Pet care information
- Food recommendations for pets

## Tech Stack

### Frontend
- React
- React Router
- Axios
- CSS3

### Backend
- Node.js
- Express
- MySQL
- bcryptjs

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd "Pet Adoption React Project"
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Database Setup:
   - Create a MySQL database named `testdb`
   - Import the database schema from `testdb.sql`
   - Update database credentials in `backend/index.js` if needed

5. Start the backend server (port 3001):
```bash
cd backend
npm run dev
```

6. Start the frontend development server (port 3000):
```bash
cd frontend
npm start
```

## Project Structure

```
Pet Adoption React Project/
├── backend/
│   ├── index.js          # Express server and API routes
│   ├── package.json
│   └── node_modules/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   └── App.js        # Main app component
│   └── package.json
└── README.md
```

## API Endpoints

- `POST /api/users` - User signup
- `POST /api/login` - User login

## License

MIT

