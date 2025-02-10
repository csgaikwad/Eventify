# Eventify
## Event Management Dashboard

A web application to manage and view events, allowing users to browse upcoming and past events.

## Features

- View upcoming and past events
- Filter events by category and date
- Event details with descriptions, time, duration, and location
- User-friendly interface with real-time updates

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **State Management:** React Hooks
- **Real-time:** WebSockets (if applicable)
- **Deployment:** Vercel, Render
Getting Started
Installation
Navigate to the project directory:
```
cd event-dashboard

Install dependencies:
npm install

Start the development server:
npm run dev

API Endpoints
GET /events - Fetch all events
POST /events - Create a new event
GET /events/:id - Fetch event details by ID
PUT /events/:id - Update event details
DELETE /events/:id - Delete an event
Environment Variables
Create a .env file and add:

MONGO_URI=your_mongodb_connection_string
PORT=8000
Contributing
Fork the repository
Create a feature branch: git checkout -b feature-name
Commit changes: git commit -m "Add feature"
Push to the branch: git push origin feature-name
Open a pull request
