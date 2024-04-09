import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage/AuthPage";
import MainPage from "./pages/MainPage/MainPage";
import { ConfigProvider } from "antd";
import AuthProvider from "./context/AuthContext";
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
  let tokenAnt = defaultData;

  const navigate = useNavigate();

  return (
    <>
      <ConfigProvider
        theme={{
          token: tokenAnt,
        }}
      >
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="*" element={<MainPage />} />
          </Routes>
        </AuthProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
