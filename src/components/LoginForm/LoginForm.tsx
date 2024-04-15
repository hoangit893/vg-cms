import { useState } from "react";

import { Button, Checkbox, Flex, Form, Input, notification } from "antd";
import api, { setAccessToken } from "../../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type FieldType = {
  username: string;
  password: string;
  remember: boolean;
};

export default function LoginForm() {
  const [credientials, setCredientials] = useState({
    username: "",
    password: "",
  });

  const { setIsAuthenticated, setUser } = useAuth();

  const nagivate = useNavigate();
  const onFinish = async () => {
    const response = await api.login.invoke({
      data: credientials,
    });
    if (response.status === 200) {
      if (response.data.role != "admin") {
        notification.error({
          message: "Bạn không có quyền truy cập vào trang này",
        });
        return;
      }
      setUser(response.data.user);
      setAccessToken(response.data.token);
      notification.success({
        message: "Đăng nhập thành công",
      });
      setIsAuthenticated(true);
      nagivate("/topic");
    } else {
      notification.error({
        message: "Đăng nhập thất bại",
      });
    }
  };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     nagivate("/topic");
  //   }
  // }, [isAuthenticated]);

  return (
    <>
      <Form
        style={{
          marginTop: "60px",
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "10px",
          width: "30%",
          height: "40%",
          maxWidth: "400px",
          maxHeight: "340px",
        }}
        name="basic"
        // labelCol={{ span: 16 }}
        // wrapperCol={{ span: 16 }}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="mx-auto bg-inherit rounded-lg shadow-md"
      >
        <Form.Item<FieldType>
          label="Tên đăng nhập"
          name="username"
          getValueFromEvent={(e) => {
            setCredientials((prev) => ({ ...prev, username: e.target.value }));
            return e.target.value;
          }}
          rules={[
            { required: true, message: "Tên đăng nhập không được để trống" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mật khẩu "
          name="password"
          getValueFromEvent={(e) => {
            setCredientials((prev) => ({ ...prev, password: e.target.value }));
            return e.target.value;
          }}
          rules={[{ required: true, message: "Mật khẩu không được để trống" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Flex justify="center">
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Flex>
      </Form>
    </>
  );
}
