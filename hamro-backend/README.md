# Hamro Guide Backend API

Backend REST API for Hamro Guide travel platform. Built with Node.js, Express, MongoDB, and Multer for file uploads.

## 🚀 Features

- ✅ **Hero Slides Management** - Dashboard carousel images with bilingual support
- ✅ **Programs/Tours** - CRUD operations for travel packages
- ✅ **Image Gallery** - Photo gallery with hero and thumbnail images
- ✅ **Video Management** - YouTube embed integration
- ✅ **Tag System** - Categorization for images and programs
- ✅ **File Upload** - Image upload with validation (JPG/PNG only)
- ✅ **Bilingual Support** - English and Slovenian content

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
```bash
   git clone https://github.com/shambhuthakur0707/hamroGuide.git
   cd hamroGuide
```

2. **Install dependencies**
```bash
   npm install
```

3. **Create .env file**
```bash
   cp .env.example .env
```

4. **Configure environment variables** (see `.env` section below)

5. **Start MongoDB**
   - **Windows:** `net start MongoDB`
   - **Mac:** `brew services start mongodb-community`
   - **Linux:** `sudo systemctl start mongod`

6. **Run the server**
```bash
   npm start
```

   You should see:
```
   Server running on port 5000
   MongoDB Connected -> local (hamroGuide)
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:
```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/hamro-guide
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hamroGuide

# Server Port
PORT=5000

# JWT Secret (for future authentication)
JWT_SECRET=supersecretkey123
```

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

### Hero Slides (Dashboard Carousel)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/hero-slides/create` | Create new slide (multipart/form-data) |
| GET | `/hero-slides` | Get all slides |
| GET | `/hero-slides/active` | Get active slides only |
| GET | `/hero-slides/:id` | Get single slide |
| PUT | `/hero-slides/:id` | Update slide |
| DELETE | `/hero-slides/:id` | Delete slide |

**Create Hero Slide Example:**
```javascript
// POST /api/hero-slides/create (form-data)
{
  title_en: "Practice Yoga in Paradise",
  title_sl: "Vadite jogo v raju",
  description_en: "Rejuvenate your mind...",
  description_sl: "Pomladite svoj um...",
  image: [FILE],
  order: 1,
  isActive: true
}
```

### Programs (Tour Packages)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/programs/create` | Create program (multipart/form-data) |
| GET | `/programs` | Get all programs |
| GET | `/programs/:id` | Get single program |
| PUT | `/programs/:id` | Update program |
| DELETE | `/programs/:id` | Delete program |

**Create Program Example:**
```javascript
// POST /api/programs/create (form-data)
{
  title_en: "Everest Base Camp Trek",
  title_sl: "Trek do baznega tabora Everesta",
  description_en: "<p>14-day adventure...</p>",
  description_sl: "<p>14-dnevna pustolovščina...</p>",
  banner_image: [FILE]
}
```

### Images (Gallery)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/images/upload` | Upload image (multipart/form-data) |
| GET | `/images` | Get all images |
| GET | `/images/:id` | Get single image |
| DELETE | `/images/:id` | Delete image |

**Upload Image Example:**
```javascript
// POST /api/images/upload (form-data)
{
  title_en: "Himalayan Sunset",
  title_sl: "Himalajski sončni zahod",
  description_en: "Beautiful mountain view",
  description_sl: "Čudovit razgled na gore",
  tag_id: "674e5f8a1234567890abcdef",
  hero: [FILE],
  thumbnail: [FILE]
}
```

### Videos

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/videos/create` | Create video (JSON) |
| GET | `/videos` | Get all videos |
| GET | `/videos/:id` | Get single video |
| PUT | `/videos/:id` | Update video |
| DELETE | `/videos/:id` | Delete video |

**Create Video Example:**
```json
// POST /api/videos/create (JSON)
{
  "embedUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "title_en": "Nepal Travel Guide 2024",
  "title_sl": "Vodnik po Nepalu 2024",
  "description_en": "Complete travel guide",
  "description_sl": "Popoln turistični vodnik"
}
```

### Tags (Categories)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tags/create` | Create tag (JSON) |
| GET | `/tags` | Get all tags |
| GET | `/tags/:id` | Get single tag |
| PUT | `/tags/:id` | Update tag |
| DELETE | `/tags/:id` | Delete tag |

**Create Tag Example:**
```json
// POST /api/tags/create (JSON)
{
  "name": "Adventure"
}
```

## 📁 Project Structure
```
hamro-backend/
├── src/
│   ├── models/              # MongoDB schemas
│   │   ├── HeroSlide.js
│   │   ├── Program.js
│   │   ├── Image.js
│   │   ├── Video.js
│   │   └── Tag.js
│   ├── controllers/         # Business logic
│   │   ├── heroSlideController.js
│   │   ├── programController.js
│   │   ├── imageController.js
│   │   ├── videoController.js
│   │   └── tagController.js
│   ├── routes/              # API routes
│   │   ├── heroSlideRoutes.js
│   │   ├── programRoutes.js
│   │   ├── imageRoutes.js
│   │   ├── videoRoutes.js
│   │   └── tagRoutes.js
│   ├── middleware/
│   │   └── upload.js        # Multer file upload
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   └── app.js              # Express app setup
├── uploads/                # Uploaded files
├── server.js               # Entry point
├── .env                    # Environment variables (not in git)
├── .env.example            # Example env file
├── package.json
└── README.md
```

## 🧪 Testing with Postman

1. Import the Postman collection: `Hamro-Guide-Backend.postman_collection.json`
2. Set environment variable: `base_url = http://localhost:5000`
3. Test endpoints in this order:
   - Create a tag first
   - Create a program with image
   - Upload images (need both hero and thumbnail)
   - Create videos
   - Create hero slides

## 🔒 Security Notes

⚠️ **Current Status:** API is PUBLIC (no authentication)

**For Production, you should add:**
- JWT authentication
- Admin middleware
- Rate limiting
- Input validation
- CORS configuration
- Helmet.js for security headers

## 🐛 Common Issues

### MongoDB Connection Failed
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Change PORT in .env file
PORT=5001
```

### File Upload Error
- Ensure `uploads/` folder exists in root directory
- Only JPG/PNG files are accepted
- Check file size limits in `upload.js`

## 📚 Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 🤝 Contributing

This is an internship project. For questions, contact the development team.

## 📄 License

ISC

## 👤 Author

**Shambhu Thakur**
- GitHub: [@shambhuthakur0707](https://github.com/shambhuthakur0707)

---

**Built as part of internship**