ThoughtCloud
ThoughtCloud is a full-stack blog platform that allows users to share ideas, express thoughts, and interact with others through posts and comments. Built with a focus on simplicity and scalability, ThoughtCloud is designed to be responsive and engaging across devices.




Table of Contents
1.Features
2.Tech Stack
3.Project Structure
4.Installation
5.Usage
6.API Endpoints
7.Challenges
8.Future Enhancements





Features

User Authentication: Secure sign-up and login with JWT-based authentication.
State Management: Redux is used to manage application state effectively.
Post Creation and Interaction: Users can create, edit, delete posts, and interact through likes and comments.
Media Uploads: Cloudinary is integrated for handling media files, allowing users to upload and display images and videos.
Responsive Design: Optimized layout for desktop and mobile views.
Deployed on Heroku: Easily accessible and scalable deployment.






Tech Stack

Frontend: React, Redux, Axios
Backend: Node.js, Express
Database: MongoDB
Media Storage: Cloudinary
Hosting: Heroku
Project Structure
bash
Copy code
thoughtcloud/
├── client/              # Frontend React app
│   ├── public/          # Public assets (HTML, images, etc.)
│   └── src/             # React components, Redux state, and services
├── server/              # Backend Express server
│   ├── controllers/     # API logic for various routes
│   ├── models/          # Mongoose schemas for MongoDB
│   ├── routes/          # Routes definitions
│   └── utils/           # Utility functions, authentication logic
└── README.md            # Project documentation







Installation

Clone the Repository

bash
Copy code
git clone https://github.com/nikikiarie/thoughtcloud.git
cd thoughtcloud
Set Up Environment Variables

In both the client and server directories, create .env files with the following variables:

In server/.env:

bash
Copy code
MONGODB_URI=<Your MongoDB URI>
MONGOPSWD=<MongoDB Password>
JWT_SECRET=<Your JWT Secret>
PORT=<Port>
FRONT_URL=<Frontend connection>


In client/.env:

bash
Copy code
VITE_CLOUDINARY_NAME=<Your Cloudinary Cloud Name>
VITE_BACKEND=<Your backend connection>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>


Install Dependencies

bash
Copy code
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
Start the Development Servers

bash
Copy code
# In the server folder
npm start

# In the client folder
npm run dev


The backend server will run on http://localhost:5000, and the frontend will run on http://localhost:5173.






Usage

User Registration/Login: Users can sign up, log in, and create their profile.
Create and Edit Posts: Users can create text or media posts and edit or delete them as needed.
Comments and Likes: Posts support comments and likes, allowing interaction between users.
API Endpoints
Authentication

POST /api/auth/register: Register a new user.
POST /api/auth/email: Log in an existing user.
Posts

GET /api/blogs: Fetch all posts.
POST /api/blogs/create: Create a new post.
PUT /api/posts/:id: Update a specific post.
DELETE /api/posts/:id: Delete a post.
Comments

POST /api/posts/:id/comments: Add a comment to a post.
DELETE /api/posts/:id/comments/:commentId: Delete a comment.








Challenges

State Management: Managing state with Redux required careful planning to optimize performance and ensure consistent data flow across components.
Authentication Security: Implementing secure JWT-based authentication to prevent unauthorized access.
Media Storage Optimization: Balancing load times with media quality using Cloudinary.
Database Design: Ensuring scalability and efficient data retrieval with MongoDB schema design.







Future Enhancements

Testing
Enhanced Search Functionality: Allow users to search posts by keywords, hashtags, and author names.
User Profiles: Add profile customization options and bio sections for users.
Notifications: Integrate in-app notifications for interactions such as likes, comments, and follows.
Performance Improvements: Optimize query and server performance to handle higher traffic loads.
License


This project is licensed under the MIT License. See the LICENSE file for details.


