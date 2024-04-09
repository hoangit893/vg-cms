import { useContext, useEffect, useState } from "react";
import { Button, Layout, theme } from "antd";
import "./MainPage.css";
import { Header } from "antd/es/layout/layout";
import SideBar from "../../components/SideBar/SideBar";
import ContentSide from "../../components/ContentSide/ContentSide";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const { Sider, Content } = Layout;

const MainPage = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          minWidth: "99vw",
        }}
      >
        <Header>
          <HeaderComponent />
        </Header>

        <Layout>
          <Sider
            width="15%"
            style={{
              height: "100vh",
              position: "sticky",
              top: 0,
            }}
            collapsed={collapsed}
            onCollapse={(value) => {
              setCollapsed(value);
            }}
          >
            <SideBar />
            <Button
              onClick={() => setCollapsed(!collapsed)}
              style={{
                color: colorBgContainer,
              }}
            >
              hide
            </Button>
          </Sider>
          <Content>
            <div className="relative">
              <ContentSide />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainPage;
