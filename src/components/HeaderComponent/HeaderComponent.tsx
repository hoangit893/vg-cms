import { Avatar, Dropdown, Flex, Menu, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function HeaderComponent() {
  const { setIsAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("AccessToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="/profile">Profile</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="/settings">Settings</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Flex justify="space-between" className="text-black ">
        <Flex vertical={false} className="right__side" gap={20} align="center">
          <Typography
            style={{
              color: "black",
              fontSize: "1.4rem",
            }}
          >{`Hello, ${user.name}`}</Typography>
        </Flex>
        <Flex vertical={false} className="right__side" gap={20} align="center">
          <Avatar size="large" src={user.avatarImg}></Avatar>
          <Flex vertical gap={0} justify="flex-start">
            <Typography.Text
              style={{
                color: "black",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              {user.name}
            </Typography.Text>

            <Typography.Text
              style={{
                color: "black",
                fontSize: "0.8rem",
                fontWeight: "normal",
              }}
            >
              {user.role}
            </Typography.Text>
          </Flex>
          <Dropdown overlay={menu} trigger={["hover"]}>
            <DownOutlined />
          </Dropdown>
        </Flex>
      </Flex>
    </>
  );
}
