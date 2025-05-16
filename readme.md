## AcmeTrack is a MERN (MongoDB, Express.js, React, Node.js) stack application

## Project Time

![Project Time](total-time-spent-on-the-project.jpg)  
The total time spent on the project is 14 hours and 8 minutes.

## Prerequisites

- **Node.js**: Version 20 or higher (v22 recommended, as per Dockerfile)
- **MongoDB**: Required for local development without Docker (running on `localhost:27017`)
- **Docker & Docker Compose**: Required for containerized setup
- **Cloudinary Account**: For media storage and management
- **Git**: For cloning the repository (if applicable)
- **Web Browser**: For accessing online code editors

---

## Project Structure

- **Frontend**: React-based UI (`frontend` folder)
- **Backend**: Node.js + Express API (`backend` folder)
- **MongoDB**: Database service (managed via Docker or local installation)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/syedtasavour/AcmeTrack.git
cd acmetrack
```

### 2. Running with Docker (Recommended)

1. Ensure Docker and Docker Compose are installed and running.

2. In the project root (where `docker-compose.yml` is located), run:

   ```bash
   docker-compose up -d
   ```

3. Access the application:

   - **Frontend**: [http://localhost:5173](http://localhost:5173)
   - **Backend API**: [http://localhost:3002/api/v1](http://localhost:3002/api/v1)

4. To stop and remove containers:

   ```bash
   docker-compose down
   ```

   To also remove volumes (e.g., MongoDB data):

   ```bash
   docker-compose down -v
   ```

### 3. Running without Docker (Manual Setup)

#### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` folder with the following:

   ```ini
   # MongoDB connection string
   MONGODB_URI=mongodb://localhost:27017

   # Server port
   PORT=3002

   # Allowed CORS origin
   CORS_ORIGIN=http://localhost:5173

   # JWT access token secret and expiry
   ACCESS_TOKEN_SECRET=YYYZG8ssjm2ccG8s2gZWCj
   ACCESS_TOKEN_EXPIRY=15m

   # JWT refresh token secret and expiry
   REFRESH_TOKEN_SECRET=YYZG8ssjZVm2Vm2ccG8sWj
   REFRESH_TOKEN_EXPIRY=7d

   # Cloudinary configuration
   CLOUDINARY_CLOUD_NAME=`YOUR_CLOUDINARY_CLOUD_NAME`
   CLOUDINARY_API_KEY=`YOUR_CLOUDINARY_API_KEY`
   CLOUDINARY_API_SECRET=`YOUR_CLOUDINARY_API_SECRET`
   ```

4. Ensure MongoDB is running locally on `localhost:27017`.

5. Start the backend server:

   ```bash
   npm run dev
   ```

#### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` folder with:

   ```ini
   VITE_API_BASE_URL=http://localhost:3002/api/v1
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

5. Open your browser at: [http://localhost:5173](http://localhost:5173)

## Environment Variables

| Variable                | Description                                 | Example Value                  |
| ----------------------- | ------------------------------------------- | ------------------------------ |
| `MONGODB_URI`           | MongoDB connection string (include DB name) | `mongodb://localhost:27017`    |
| `PORT`                  | Backend server port                         | `3002`                         |
| `CORS_ORIGIN`           | Frontend URL allowed by CORS                | `http://localhost:5173`        |
| `ACCESS_TOKEN_SECRET`   | Secret key for signing JWT access tokens    | `YYYZG8ssjm2ccG8s2gZWCj`       |
| `ACCESS_TOKEN_EXPIRY`   | Expiry duration for access tokens           | `15m`                          |
| `REFRESH_TOKEN_SECRET`  | Secret key for signing JWT refresh tokens   | `YYZG8ssjZVm2Vm2ccG8sWj`       |
| `REFRESH_TOKEN_EXPIRY`  | Expiry duration for refresh tokens          | `7d`                           |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for media handling    | `YOUR_CLOUDINARY_CLOUD_NAME`   |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                          | `YOUR_CLOUDINARY_API_KEY`      |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret                       | `YOUR_CLOUDINARY_API_SECRET`   |
| `VITE_API_BASE_URL`     | Backend API base URL for frontend           | `http://localhost:3002/api/v1` |

---

## Libraries Used

### Backend (`backend/package.json`)

**Dependencies**:

- `bcrypt`: `^6.0.0` - Password hashing for secure authentication
- `cloudinary`: `^2.6.1` - Media storage and management
- `cookie-parser`: `^1.4.7` - Parsing cookies for authentication
- `cors`: `^2.8.5` - Enabling Cross-Origin Resource Sharing
- `dotenv`: `^16.5.0` - Loading environment variables from `.env` files
- `express`: `^5.1.0` - Web framework for building the API
- `jsonwebtoken`: `^9.0.2` - JWT-based authentication
- `mongoose`: `^8.14.3` - MongoDB object modeling and querying
- `multer`: `^1.4.5-lts.2` - Handling file uploads

**Dev Dependencies**:

- `nodemon`: `^3.1.9` - Auto-restarting the server during development

### Frontend (`frontend/package.json`)

**Dependencies**:

- `@reduxjs/toolkit`: `^2.8.2` - State management with Redux
- `@tailwindcss/vite`: `^4.1.6` - Tailwind CSS integration with Vite
- `axios`: `^1.9.0` - Making HTTP requests to the backend
- `react`: `^19.1.0` - Core React library
- `react-dom`: `^19.1.0` - React DOM for rendering
- `react-redux`: `^9.2.0` - Redux integration with React
- `react-router-dom`: `^7.6.0` - Client-side routing
- `recharts`: `^2.15.3` - Charting and data visualization
- `tailwindcss`: `^4.1.6` - Utility-first CSS framework

**Dev Dependencies**:

- `@eslint/js`: `^9.25.0` - ESLint core for linting
- `@types/react`: `^19.1.2` - TypeScript types for React
- `@types/react-dom`: `^19.1.2` - TypeScript types for React DOM
- `@vitejs/plugin-react`: `^4.4.1` - Vite plugin for React
- `eslint`: `^9.25.0` - Linting tool
- `eslint-plugin-react-hooks`: `^5.2.0` - Linting for React hooks
- `eslint-plugin-react-refresh`: `^0.4.19` - Linting for React Fast Refresh
- `globals`: `^16.0.0` - ESLint globals configuration
- `vite`: `^6.3.5` - Build tool and development server

---

## Notes

- **MongoDB**: For non-Docker setups, ensure MongoDB is running locally on port `27017`. For Docker, MongoDB is automatically configured as a service. For online editors, use a cloud database like MongoDB Atlas.
- **Production**: Update `CORS_ORIGIN`, `MONGODB_URI`, and `VITE_API_BASE_URL` for your deployed environment. Use secure, unique secrets for JWT and Cloudinary.
- **Docker**: The Docker setup mounts local code directories (`./backend` and `./frontend`) for real-time code changes during development.

---

## Troubleshooting

- **MongoDB Connection Issues**: Verify MongoDB is running and the `MONGODB_URI` is correct. For online editors, ensure your cloud MongoDB instance allows connections from your editor’s IP.
- **CORS Errors**: Check that `CORS_ORIGIN` matches the frontend URL exactly (including `http` vs `https`).
- **Cloudinary Errors**: Confirm your Cloudinary credentials are valid and not expired.

## 👤 Author

**Syed Tasavour**

- GitHub: [@syedtasavour](https://github.com/syedtasavour)
- Portfolio: [syedtasavour.me](https://syedtasavour.me)

## 📞 Contact

For any queries or support:

- Email: `help@syedtasavour.me`
- GitHub Issues: [Create an issue](https://github.com/syedtasavour/backend-VidEngine/issues)

  <div align="center">
  <sub>Built with passion (and a lot of coffee) by Syed Tasavour.</sub>
</div>
