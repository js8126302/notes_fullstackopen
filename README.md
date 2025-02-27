# Notes App

This is a simple Notes application built as part of the [Full Stack Open](https://fullstackopen.com/) course. The project consists of a frontend built with React and a backend using Node.js with Express, connected to a MongoDB database.

## Features
- Users can create, view, and delete notes
- Notes are stored in a MongoDB database
- Backend API built with Express.js
- Frontend built with React
- Deployed to an online server

## Technologies Used
- **Frontend:** React, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB (via MongoDB Atlas or local instance)
- **Deployment:** Render

## Setup Instructions

### Backend
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/notes-app.git
   cd notes-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and set up the required environment variables:
   ```sh
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:3001`.

### Frontend
1. Navigate to the frontend directory (if separate):
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Build the frontend:
   ```sh
   npm run build
   ```
4. Deploy the frontend build to the backend `build` directory:
   ```sh
   cp -r build ../build
   ```

## API Endpoints
- `GET /api/notes` - Fetch all notes
- `POST /api/notes` - Add a new note
- `GET /api/notes/:id` - Get a specific note
- `DELETE /api/notes/:id` - Delete a note

## Deployment
The application can be deployed to a hosting service such as Render, Fly.io, or another cloud provider.

## License
This project is open-source and available under the MIT license.

---

### Author
John - Built as part of Full Stack Open course.
For any questions, feel free to reach out!

