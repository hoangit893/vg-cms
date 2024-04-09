import React, { useContext, useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  isAuthenticated: false,
  role: "guest",
  setIsAuthenticated: (value: boolean) => {},
  setRole: (value: "admin" | "user" | "guest") => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider(props: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<"admin" | "user" | "guest">("guest");
  const value = {
    isAuthenticated,
    role,
    setIsAuthenticated,
    setRole,
  };
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.auth.invoke({});
        if (response.status === 200) {
          setIsAuthenticated(true);
          setRole(response.data.role);
        }
      } catch (error: any) {
        setIsAuthenticated(false);
        setRole("guest");
        navigate("/login");
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;
