import { ConfigProvider, notification } from "antd";
import React from "react";

notification.config({
  placement: "bottomRight",
  maxCount: 1,
});

export default function AntdConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      direction="ltr"
      // locale
      // components
      // csp

      theme={{
        token: {
          colorBgContainer: "#fff",
          colorPrimary: "#b44445",
          borderRadius: 10,
        },
        components: {
          Button: {
            colorPrimary: "#b44445",
            colorBgContainer: "#fff",
            primaryColor: "#fff",
          },
          Layout: {
            colorBgContainer: "#fff",
            colorPrimary: "#b44445",
          },
          Typography: {},
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
