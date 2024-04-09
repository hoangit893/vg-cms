import { useContext, useEffect } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import AuthContext, { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/topic");
    }
  }, []);

  return (
    <>
      <div className="auth__form container mx-auto">
        <LoginForm />
      </div>
    </>
  );
}
