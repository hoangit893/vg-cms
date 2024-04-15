import { Button, Flex, Form, Input, notification, Typography } from "antd";
import { useEffect, useState } from "react";
import api from "../../api";
import UploadImage from "../UploadImage/UploadImage";
import "./Profile.css";
export default function Profile() {
  const [form] = Form.useForm();
  const [user, setUser] = useState<{
    name: string;
    username: string;
    email: string;
    avatarImg: string;
    bio: string;
  }>({
    name: "",
    username: "",
    email: "",
    avatarImg: "",
    bio: "",
  });

  const notifyError = (message: string) => {
    notification.error({
      message: message,
    });
  };

  const notifySuccess = (message: string) => {
    notification.success({
      message: message,
    });
  };

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      await api.updateProfile.invoke({
        data: {
          name: values.name,
          username: values.username,
          email: values.email,
          avatarImg: user.avatarImg,
          bio: values.bio,
          password: values.password,
        },
      });
      notifySuccess("Cập nhật thông tin thành công");
      window.location.reload();
    } catch (error: any) {
      notifyError("Cập nhật thông tin thất bại");
      // console.log(error);
    }
  };

  const getUser = async () => {
    const response = await api.getProfile.invoke({});
    const users = response.data.user;
    setUser({
      name: users.name,
      username: users.username,
      email: users.email,
      avatarImg: users.avatarImg,
      bio: users.bio,
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);

  return (
    <>
      <div
        className="profile-page"
        style={{
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography.Title level={2}>Thông tin cá nhân</Typography.Title>
        <Form
          className="profile-form"
          form={form}
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          onFinish={onFinish}
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{
            marginTop: "60px",
            padding: "30px",
            backgroundColor: "white",
            borderRadius: "10px",
            width: "50%",
          }}
        >
          <Form.Item
            label="Họ tên"
            name="name"
            rules={[{ whitespace: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ whitespace: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item label="Ảnh đại diện">
            <UploadImage
              imageUrl={user.avatarImg}
              setImageUrl={(imageUrl: string) => {
                setUser({ ...user, avatarImg: imageUrl });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Email không hợp lệ",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Mật khẩu" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Giới thiệu" name="bio">
            <Input.TextArea />
          </Form.Item>
          <Flex justify="center">
            <Button
              type="primary"
              htmlType="submit"
              onClick={(e) => {
                e.preventDefault();
                form.submit();
              }}
            >
              Submit
            </Button>
          </Flex>
        </Form>
      </div>
    </>
  );
}
