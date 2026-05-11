# 🌾 Smart Agriculture Advisory System

A production-ready full-stack web application that helps farmers get crop recommendations, weather insights, and AI-powered farming advice — all in a premium mobile-app UI.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

---

### 1. Backend Setup

```bash
cd server
npm install
```

Edit `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/smart-agri
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

```bash
npm run dev     # development (nodemon)
npm start       # production
```

---

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`  
Backend runs on `http://localhost:5000`

---

## 📁 Project Structure

```
Agri/
├── server/
│   ├── config/db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Register / Login + JWT
│   │   ├── cropController.js     # Rule-based crop recommendation
│   │   ├── weatherController.js  # Weather data (mock + API-ready)
│   │   └── chatController.js     # AI chatbot (LLM-ready)
│   ├── middleware/auth.js         # JWT protect middleware
│   ├── models/User.js             # Mongoose user schema
│   ├── routes/                    # auth, crop, weather, chat
│   ├── server.js                  # Express entry point
│   └── .env
│
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── BottomNav.jsx
    │   │   ├── Chatbot.jsx        # Floating chat widget
    │   │   └── ProtectedRoute.jsx
    │   ├── context/AuthContext.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Crop.jsx
    │   │   ├── Weather.jsx
    │   │   ├── Chatbot.jsx        # Full chatbot page
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── services/api.js        # Axios + interceptors
    │   └── App.jsx
    └── vite.config.js
```

---

## 🔌 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login, returns JWT |
| POST | `/api/crop/recommend` | ✅ | Crop recommendation |
| GET | `/api/weather/:location` | ✅ | Weather + farming advice |
| POST | `/api/chat` | ✅ | AI chatbot response |
| GET | `/api/health` | ❌ | Health check |

---

## ☁️ AWS Deployment

### Backend → AWS Elastic Beanstalk
```bash
# Install EB CLI
pip install awsebcli

cd server
eb init smart-agri-backend --platform node.js
eb create smart-agri-prod
eb setenv MONGO_URI=... JWT_SECRET=...
eb deploy
```

### Frontend → AWS S3 + CloudFront
```bash
cd client
npm run build

# Upload dist/ to S3 bucket with static website hosting
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

### Environment Variables (Production)
Set these in Elastic Beanstalk console or `.env`:
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=<strong-random-secret>
NODE_ENV=production
CLIENT_URL=https://your-cloudfront-domain.com
```

---

## 🔐 Security Features
- Passwords hashed with bcrypt (12 rounds)
- JWT tokens (7-day expiry)
- Protected API routes via middleware
- CORS configured for specific origins in production
- Environment variables for all secrets

---

## 🤖 Upgrading Chatbot to LLM

In `server/controllers/chatController.js`, replace `processMessage()` with:

```js
// AWS Bedrock (Claude)
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

// OR OpenAI
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: 'You are an expert agricultural advisor.' },
    { role: 'user', content: message }
  ]
});
return completion.choices[0].message.content;
```

---

## 🌱 Crop Recommendation Logic

Supports 5 soil types × 4 seasons = **20 unique recommendations**:

| Soil | Summer | Winter | Monsoon | Spring |
|------|--------|--------|---------|--------|
| Clay | Cotton | Wheat | Rice | Sugarcane |
| Sandy | Groundnut | Barley | Millet | Watermelon |
| Loamy | Maize | Mustard | Soybean | Tomato |
| Silt | Sunflower | Peas | Jute | Potato |
| Black | Cotton | Chickpea | Sorghum | Lentil |
