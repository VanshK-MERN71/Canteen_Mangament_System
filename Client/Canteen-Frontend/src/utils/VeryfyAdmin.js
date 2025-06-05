import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const useVerify = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/verify", {
          credentials: "include",
        });

        const data = await response.json();
        
        if (!data.user) {
          navigate("/admin/login");
        }else{
          login(data.user);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [navigate]);
};

export default useVerify;
