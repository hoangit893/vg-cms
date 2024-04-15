import { Routes, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage/AuthPage";
import MainPage from "./pages/MainPage/MainPage";
import { notification } from "antd";
import AuthProvider from "./context/AuthContext";
import AntdConfigProvider from "./context/AntdConfigProvider";

notification.config({
  placement: "topRight",
  maxCount: 2,
  duration: 3,
});

function App() {
  return (
    <>
      <AntdConfigProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="*" element={<MainPage />} />
          </Routes>
        </AuthProvider>
      </AntdConfigProvider>
    </>
  );
}

export default App;
