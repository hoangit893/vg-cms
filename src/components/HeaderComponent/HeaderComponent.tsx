import { Dropdown, Flex, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function HeaderComponent() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("AccessToken");
    setIsAuthenticated(false);
    navigate("/");
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
      <Flex justify="space-between">
        <h1 className="text-left text-white text-3xl mt-4">
          <Link to="/">ADMIN</Link>
        </h1>
        <Dropdown overlay={menu} trigger={["hover"]}>
          <UserOutlined className="text-white text-3xl mt-4 ml-4" />
        </Dropdown>
      </Flex>
    </>
  );
}
