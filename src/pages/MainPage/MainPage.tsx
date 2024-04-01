import { useState } from "react";
import { Button, Layout, Menu, theme } from "antd";
import "./MainPage.css";
import { Header } from "antd/es/layout/layout";
import SideBar from "../../components/SideBar/SideBar";

import ContentSide from "../../components/ContentSide/ContentSide";
const { Sider, Content } = Layout;

const MainPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
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
            {/* <Routes>
              <Route path="/" element={<User></User>}></Route>
              <Route path="topic" element={<Topic></Topic>}></Route>
              <Route path="user" element={<User></User>}></Route>
              <Route path="challenge" element={<Challenge></Challenge>}></Route>
            </Routes> */}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainPage;
