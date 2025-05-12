import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LandingPage from "./Pages/landingPage/LandingPage";
import SignUp from "./Pages/auth/SignUp.jsx";
import Login from "./Pages/auth/Login.jsx";
import Header from "./Pages/Header.jsx";
import Footer from "./Pages/Footer.jsx";
import Overview from "./Pages/dashboard/Overview.jsx";
import DashNav from "./components/dashNav.jsx";
// Component to manage layout conditionally
const Layout = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname.startsWith("/Overview");
  const userData = {
    name: "Jake Vincent",
    greetingMessage: "Good Morning",
    greetingSubtext: "Hope you feel better today.",
    avatarUrl: "https://placehold.co/32x32", // Optional: custom avatar
  };

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <DashNav userData={userData} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Overview" element={<Overview />} />
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
