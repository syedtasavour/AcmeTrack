import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/users/logout`,
          {},
          { withCredentials: true }
        );

        localStorage.removeItem("loggedIn");

        navigate("/login");
      } catch (err) {
        localStorage.removeItem("loggedIn");

        navigate("/login");
      }
    };

    logout();
  }, [navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default Logout;
