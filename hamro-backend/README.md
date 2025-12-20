# Hamro Guide Backend API

Backend REST API for the Hamro Guide travel platform. Built with Node.js, Express, MongoDB, and Multer for file uploads.

## Features

- Hero Slides management with bilingual support  
- Programs/Tours CRUD operations with lightweight and detailed endpoints  
- Image gallery with hero and thumbnail uploads  
- Video management with YouTube embed integration  
- Tag system for categorization  
- File upload with validation (JPG/PNG only)  
- Bilingual content support (English and Slovenian)

## Prerequisites

- Node.js v18 or higher  
- MongoDB (local or Atlas)  
- npm or yarn  

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shambhuthakur0707/hamroGuide.git
   cd hamroGuide

2.Install dependencies:
npm install

3.Create .env file:
cp .env.example .env

4.Configure environment variables.
Start MongoDB service.

5.Run the server:
npm start

Expected output:

Server running on port 5000
MongoDB Connected -> local (hamroGuide)
Environment Variables
Example .env file:

MONGO_URI=mongodb://localhost:27017/hamro-guide
PORT=5000
JWT_SECRET=supersecretkey123

API Endpoints

Base URL: http://localhost:5000/api

Hero Slides

POST /hero-slides/create – Create slide
GET /hero-slides – Get all slides
GET /hero-slides/active – Get active slides
GET /hero-slides/:id – Get single slide
PUT /hero-slides/:id – Update slide
DELETE /hero-slides/:id – Delete slide

Programs

POST /programs/create – Create program
GET /programs – Get all programs (lightweight list)
GET /programs/:id – Get single program (basic info)
GET /programs/:id/details – Get program details (full info with images, videos, tags, reviews, average rating)
PUT /programs/:id – Update program
DELETE /programs/:id – Delete program

Images
POST /images/upload – Upload image
GET /images – Get all images
GET /images/:id – Get single image
DELETE /images/:id – Delete image

Videos
POST /videos/create – Create video
GET /videos – Get all videos
GET /videos/:id – Get single video
PUT /videos/:id – Update video
DELETE /videos/:id – Delete video

Tags
POST /tags/create – Create tag
GET /tags – Get all tags
GET /tags/:id – Get single tag
PUT /tags/:id – Update tag
DELETE /tags/:id – Delete tag

Project Structure

hamro-backend/
├── src/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── app.js
├── uploads/
├── server.js
├── .env
├── .env.example
├── package.json
└── README.md

Testing
Use Postman or similar tools. Suggested order:
Create a tag
Create a program with image
Upload images
Create videos
Create hero slides

Security Notes

Currently public (no authentication). For production, add:

JWT authentication

Admin middleware

Rate limiting

Input validation

CORS configuration

Security headers (Helmet.js)

Technologies

Node.js
Express.js
MongoDB with Mongoose
Multer for file uploads
CORS
dotenv

Author
Shambhu Thakur
GitHub: @shambhuthakur0707

