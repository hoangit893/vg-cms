import { useEffect, useState } from "react";
import { Layout, Typography } from "antd";
import "./MainPage.css";
import { Header } from "antd/es/layout/layout";
import SideBar from "../../components/SideBar/SideBar";
import ContentSide from "../../components/ContentSide/ContentSide";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import {
  LeftSquareOutlined,
  MacCommandOutlined,
  RightSquareOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
const { Sider, Content } = Layout;

const MainPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  const siderStyle: React.CSSProperties = {
    color: "#b44445",
    textAlign: "center",
  };

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          minWidth: "99vw",
        }}
      >
        <Sider
          theme="light"
          width="15%"
          style={{
            height: "100vh",
            position: "sticky",
            top: 0,
            textAlign: "center",
          }}
          collapsed={collapsed}
          onCollapse={(value) => {
            setCollapsed(value);
          }}
        >
          <Typography.Title
            style={{
              color: "#b44445",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <MacCommandOutlined />
          </Typography.Title>
          <div className="side__bar mt-12">
            <SideBar />
          </div>
          <div
            className="collapse-bt text-2xl sticky"
            style={{
              bottom: 30,
              position: "absolute",
              width: "100%",
            }}
          >
            {collapsed ? (
              <RightSquareOutlined
                style={siderStyle}
                onClick={() => setCollapsed(!collapsed)}
              />
            ) : (
              <LeftSquareOutlined
                style={siderStyle}
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
          </div>
        </Sider>
        <Layout>
          <Header className="m-5 mb-0 bg-transparent">
            <HeaderComponent />
          </Header>
          <Content className="bg-E5E5E5">
            <div className="relative mx-7 my-2">
              <ContentSide />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainPage;
