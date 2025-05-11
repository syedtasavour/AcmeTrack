import "./App.css"; // Import the CSS file for styling
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/landingPage/LandingPage"; // Import the LandingPage component
import SignUp from "./Pages/auth/SignUp.jsx"; // Import the SignUp component
import Login from "./Pages/auth/Login.jsx";
import Header from "./Pages/Header.jsx";
import Footer from "./Pages/Footer.jsx";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
