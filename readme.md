
<div align="center">
  <img src="https://res.cloudinary.com/dqj0xgq4v/image/upload/v1698236482/blog/default-user.png" width="80" alt="AcmeTrack logo" />
  <h1>AcmeTrack</h1>
  <h3>Health & Medication Tracking, Reimagined</h3>
  <p><em>Because your health journey deserves more than sticky notes and guesswork.</em></p>
</div>

---

## What is AcmeTrack?

AcmeTrack is your all-in-one health and medication tracking platform. Log your daily vitals, track your prescriptions, and never miss a shipment—whether you’re managing a chronic condition or just want to stay on top of your health story.

**Built with the MERN stack (MongoDB, Express.js, React, Node.js).**

---

## Why AcmeTrack?

- **Track your health, your way:** Log weight, heart rate, blood pressure, symptoms, and more.
- **Medication management:** See your medication history, upcoming refills, and shipment tracking—all in one dashboard.
- **Visual insights:** Beautiful charts and summaries help you spot trends and take action.
- **Secure & private:** Your data, encrypted and protected.

---

## 🚀 Get Started in 2 Minutes

### 1. Clone & Enter the Project
```bash
git clone https://github.com/syedtasavour/AcmeTrack.git
cd AcmeTrack
```

### 2. The Fast Way: Docker (Recommended)
Make sure Docker & Docker Compose are installed, then:
```bash
docker-compose up -d
```
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3002/api/v1](http://localhost:3002/api/v1)

To stop:
```bash
docker-compose down
# (add -v to clear MongoDB data)
```

### 3. The Manual Way (No Docker)
#### Backend
```bash
cd backend
npm install
# Create .env (see below)
npm run dev
```
#### Frontend
```bash
cd frontend
npm install
# Create .env (see below)

```
Open [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Environment Variables

**Backend (.env in /backend):**
```
MONGODB_URI=mongodb://localhost:27017
PORT=3002
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloud_key
CLOUDINARY_API_SECRET=your_cloud_secret
```
**Frontend (.env in /frontend):**
```
VITE_API_BASE_URL=http://localhost:3002/api/v1
```

---

## 📚 Documentation

Want the full story? [Read the full documentation →](Documentation.md)

---

## 🧩 Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS, Vite, Recharts
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Cloudinary, Multer

---

## Troubleshooting

- **MongoDB issues?** Make sure it’s running on `localhost:27017` (or use Docker).
- **CORS errors?** Double-check `CORS_ORIGIN` and `VITE_API_BASE_URL`.
- **Cloudinary errors?** Check your credentials.

---

## Author & Contact

**Syed Tasavour**
- GitHub: [@syedtasavour](https://github.com/syedtasavour)
- Portfolio: [syedtasavour.me](https://syedtasavour.me)
- Email: help@syedtasavour.me

<div align="center">
  <sub>Built with passion (and a lot of coffee) by Syed Tasavour.</sub>
</div>

