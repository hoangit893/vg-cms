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
      <Link to="/home">Dashboard</Link>,
      "dashboard",
      <AppstoreOutlined />
    ),
    getItem(<Link to="/topic">Topic</Link>, "topic", <ApartmentOutlined />),
    getItem(
      <Link to="/challenge">Challenge</Link>,
      "challenge",
      <BookOutlined />
    ),
    getItem(<Link to="/question">Question</Link>, "question", <BookOutlined />),
    getItem(<Link to="/user">User</Link>, "user", <UserOutlined />),
  ];

  return (
    <>
      <Flex vertical>
        <Menu
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          items={items}
          theme="dark"
        ></Menu>
      </Flex>
    </>
  );
}
