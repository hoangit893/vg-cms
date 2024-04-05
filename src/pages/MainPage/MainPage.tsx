import { useState } from "react";
import { Button, Layout, theme } from "antd";
import "./MainPage.css";
import { Header } from "antd/es/layout/layout";
import SideBar from "../../components/SideBar/SideBar";

import ContentSide from "../../components/ContentSide/ContentSide";
const { Sider, Content } = Layout;

const MainPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          minWidth: "99vw",
        }}
      >
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
        <Layout>
          <Header></Header>
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
