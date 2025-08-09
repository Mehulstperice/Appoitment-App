# Appointment-App
---

```markdown

A full-stack application for appointment booking. It includes a **React.js** frontend and an **Express.js + MongoDB Atlas** backend.
● Repo URL: https://github.com/Mehulstperice/Appoitment-App/

---

## 🚀 Features

- **User Authentication** (Register & Login)
- **Book Appointments**
- **View & Manage Bookings**
- **MongoDB Atlas** database connection
- **API Endpoints** for user & appointment operations
- **CORS enabled** for cross-origin requests
- **Health check endpoint** for backend status

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- TailwindCSS / Bootstrap (based on your styling)
- Fetch API for backend calls

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ORM
- dotenv for environment variables
- CORS middleware

---

## 📂 Project Structure

```

Appointment-Booking-App/
│
├── api/                  # Backend
│   ├── src/
│   │   ├── routes/       # API Routes
│   │   ├── models/       # Mongoose Models
│   │   ├── controllers/  # Request Handlers
│   │   ├── server.js     # App Entry Point
│   │   └── config/       # Database Config
│   ├── package.json
│   └── .env.example
│
└── web/                  # Frontend
├── src/
│   ├── pages/        # React Pages (Login, Register, Home)
│   ├── components/   # Reusable UI Components
│   ├── api.js        # API Helper
│   └── main.jsx
├── package.json
└── vite.config.js

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone <repo_url>
cd Clinic-Booking-App
````

---

### 2️⃣ Backend Setup

```bash
cd api
npm install
```

Create a `.env` file in `/api` with:

```
PORT=8080
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```

Run the backend:

```bash
npm run dev
```

Backend should start on `http://localhost:8080`.

Test health check:

```bash
curl http://localhost:8080/health
```

---

### 3️⃣ Frontend Setup

```bash
cd ../web
npm install
```

Create a `.env` file in `/web`:

```
VITE_API_BASE_URL=http://localhost:8080
```

Run the frontend:

```bash
npm run dev
```

Frontend should start on `http://localhost:5173`.

---

## 📌 API Endpoints

### Health Check

```
GET /health
```

### User Registration

```
POST /api/register
Content-Type: application/json
Body:
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Passw0rd!"
}
```

### User Login

```
POST /api/login
Content-Type: application/json
Body:
{
  "email": "test@example.com",
  "password": "Passw0rd!"
}
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Mehul Sharma**

