import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage/AuthPage";
import MainPage from "./pages/MainPage/MainPage";
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
  let tokenAnt = defaultData;

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
