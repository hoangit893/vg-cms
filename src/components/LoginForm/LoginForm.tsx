import React, { useState } from "react";

import {
  Button,
  Checkbox,
  Form,
  type FormProps,
  Input,
  notification,
} from "antd";
import api, { setAccessToken } from "../../api";
import { useNavigate } from "react-router-dom";

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

  const nagivate = useNavigate();

  const onFinish = async (values: FieldType) => {
    const response = await api.login.invoke({
      data: credientials,
    });
    if (response.status === 200) {
      setAccessToken(response.data.token);
      notification.success({
        message: "Login success",
      });
      nagivate("/topic");
    } else {
      notification.error({
        message: "Login failed",
      });
    }
  };

  return (
    <>
      <Form
        name="basic"
        // labelCol={{ span: 16 }}
        // wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="mx-auto bg-inherit rounded-lg shadow-md"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          getValueFromEvent={(e) => {
            setCredientials((prev) => ({ ...prev, username: e.target.value }));
            return e.target.value;
          }}
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          getValueFromEvent={(e) => {
            setCredientials((prev) => ({ ...prev, password: e.target.value }));
            return e.target.value;
          }}
          rules={[{ required: true, message: "Please input your password!" }]}
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
