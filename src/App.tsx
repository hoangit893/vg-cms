import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage/AuthPage";
import MainPage from "./pages/MainPage/MainPage";
import Topic from "./components/Topic/Topic";
import { ConfigProvider } from "antd";
type ThemeData = {
  borderRadius: number;
  colorPrimary: string;
  Button?: {
    colorPrimary: string;
    algorithm?: boolean;
  };
};

const defaultData: ThemeData = {
  borderRadius: 6,
  colorPrimary: "#1677ff",
  Button: {
    colorPrimary: "#00B96B",
  },
};

function App() {
  const AuthContext = createContext(null);
  const [tokenAnt, setTokenAnt] = useState(defaultData);

  return (
    <>
      <ConfigProvider
        theme={{
          token: tokenAnt,
        }}
      >
        <AuthContext.Provider value={null}>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="*" element={<MainPage />} />
          </Routes>
        </AuthContext.Provider>
      </ConfigProvider>
    </>
  );
}

export default App;
