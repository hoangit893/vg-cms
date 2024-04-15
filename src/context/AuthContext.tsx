import React, { useContext, useEffect, useRef, useState } from "react";
import api from "../api";

const AuthContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {
    console.log(value);
  },
  user: {
    username: "",
    name: "",
    avatarImg: "",
    role: "guest",
  },
  setUser: (value: any) => {
    console.log(value);
  },
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

  const authenticatingRef = useRef(true);
  // const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      authenticatingRef.current = true;
      try {
        const response = await api.auth.invoke({});
        if (response.status === 200 && response.data.role === "admin") {
          setUser(response.data.user);
          setIsAuthenticated(true);
          // navigate(location.pathname);
        }
      } catch (error: any) {
        setIsAuthenticated(false);
        setRole("guest");
      } finally {
        authenticatingRef.current = false;
      }
    })();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !authenticatingRef.current) {
      console.log("abc");
      // navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;
