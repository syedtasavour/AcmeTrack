import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";

import LandingPage from "./Pages/landingPage/LandingPage";
import SignUp from "./Pages/auth/SignUp.jsx";
import Login from "./Pages/auth/Login.jsx";
import Header from "./Pages/Header.jsx";
import Footer from "./Pages/Footer.jsx";
import Overview from "./Pages/dashboard/Overview.jsx";
import DashNav from "./components/dashNav.jsx";
import Health from "./Pages/dashboard/Health.jsx";
import Shipments from "./Pages/dashboard/Shipments.jsx";
import Settings from "./Pages/dashboard/Settings.jsx";
import Profile from "./Pages/dashboard/Profile.jsx";
import Logout from "./Pages/auth/Logout.jsx";

// Protectors
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";

// Dashboard layout
const DashboardLayout = () => {
  const userData = {
    name: "Jake Vincent",
    greetingMessage: "Good Morning",
    greetingSubtext: "Hope you feel better today.",
    avatarUrl: "src/assets/media/Logo(Nav).png",
  };

  return (
    <div className="dashboard-container">
      <DashNav userData={userData} />
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

// Layout with conditional header/footer
const Layout = () => {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/signup", "/dashboard"].some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Public Auth Routes */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="health" element={<Health />} />
          <Route path="shipments" element={<Shipments />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
