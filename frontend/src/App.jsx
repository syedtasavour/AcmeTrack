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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="health" element={<Health />} />
          <Route path="shipments" element={<Shipments />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      <Footer />
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
