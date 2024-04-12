import { Routes, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage/AuthPage";
import MainPage from "./pages/MainPage/MainPage";
import { ConfigProvider } from "antd";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <>
      <ConfigProvider
        direction="ltr"
        theme={{
          token: {
            colorBgContainer: "#fff",
            borderRadius: 10,
          },
          components: {
            Button: {
              colorBgContainer: "#1890ff",
            },
            Input: {
              colorPrimary: "#1890ff",
            },
          },
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
