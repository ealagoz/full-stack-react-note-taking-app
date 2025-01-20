## Backend

The backend is built with FastAPI and uses SQLite for data persistence.

### Features

- RESTful API endpoints for note management
- SQLite database with the following schema:
  - Notes table with id, title, content, and created_at fields
- CORS enabled for development
- Built-in sample notes generation

### Database Operations

- Create new notes
- Retrieve all notes
- Get single note by ID
- Update existing notes
- Delete notes
- Bulk delete functionality
- Sample notes generation

## Frontend

The frontend is built with React and Vite, providing a modern development experience.

### Features

- Hot Module Replacement (HMR)
- ESLint configuration with React specific rules
- React 18.3 support
- Modern JavaScript features (ECMAScript 2020+)

### Development Tools

- Vite for fast development and building
- ESLint for code quality
- React Refresh for fast refresh during development
- Custom ESLint configuration with:
  - React Hooks rules
  - JSX runtime support
  - React Refresh plugin

## Getting Started

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend/fastapi_backend

2. Install dependencies
pip install fastapi uvicorn pydantic sqlite3

3. Run the backend server
uvicorn main:app --reload

### Frontend Setup
1. Navigate to the frontend directory:
cd frontend/cliqs-react-app

2. Install dependencies
nmp install

3. Start the development server:
npm run dev

## API Endpoints
- GET /notes - Retrieve all notes
- GET /notes/{id} - Retrieve a specific note
- POST /notes - Create a new note
- PUT /notes/{id} - Update an existing note
- DELETE /notes/{id} - Delete a specific note
- DELETE /notes - Delete all notes

## Technologies Used
- Bacend:
-- FastAPI
-- SQLite
-- Pydantic
-- CORS middleware

- Frontend:
-- React 19.0
-- Vite
-- ESLint
-- Modern JavaScript features

## Development
The application is set up for a smooth development experience with:

- Hot Module Replacement
- Fast Refresh
- ESLint integration
- Type checking
- Modern JavaScript features
- SQLite for easy local development

## License

MIT License

This README provides a comprehensive overview of the application structure, setup instructions, and features. It can be placed in the root directory of your project.
```
