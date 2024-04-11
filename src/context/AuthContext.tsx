import React, { useContext, useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  user: {
    username: "",
    name: "",
    avatarImg: "",
    role: "guest",
  },
  setUser: (value: any) => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider(props: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<"admin" | "user" | "guest">("guest");
  const [user, setUser] = useState<{
    username: string;
    avatarImg: string;
    role: "admin" | "user" | "guest";
    name: string;
  }>({
    username: "",
    avatarImg: "",
    role: "guest",
    name: "",
  });
  const value = {
    isAuthenticated,
    role,
    user,
    setIsAuthenticated,
    setRole,
    setUser,
  };

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.auth.invoke({});
        if (response.status === 200 && response.data.role === "admin") {
          setUser(response.data.user);
          setIsAuthenticated(true);
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
