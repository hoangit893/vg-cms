import { Flex, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  ApartmentOutlined,
  AppstoreOutlined,
  BookOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  type MenuItem = Required<MenuProps>["items"][number];
  const path = window.location.pathname;

  let activeKey = path.split("/")[1];
  if (activeKey === "") {
    activeKey = "dashboard";
  }

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(
      <Link to="/">Bảng thông tin</Link>,
      "dashboard",
      <AppstoreOutlined />
    ),
    getItem(<Link to="/topic">Chủ đề</Link>, "topic", <ApartmentOutlined />),
    getItem(
      <Link to="/challenge">Thử thách</Link>,
      "challenge",
      <BookOutlined />
    ),
    getItem(<Link to="/question">Câu hỏi</Link>, "question", <BookOutlined />),
    getItem(<Link to="/user">Người chơi</Link>, "user", <UserOutlined />),
  ];

  return (
    <>
      <Flex vertical>
        <Menu
          defaultSelectedKeys={[activeKey]}
          mode="inline"
          items={items}
          // theme="dark"
        ></Menu>
      </Flex>
    </>
  );
}
