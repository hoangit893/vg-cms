import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Upload, { UploadProps } from "antd/es/upload/Upload";
import axios from "axios";
import { useEffect } from "react";

export default function UploadImage(props: any) {
  const { setImageUrl, isModalVisible } = props;
  const uploadImageUrl = async (file: any, onSuccess: any, onError: any) => {
    const formData = new FormData();
    formData.append("image", file);

    const imgbbAxios = axios.create({
      headers: {
        Authorization: undefined,
      },
    });

    try {
      const response = await imgbbAxios.post(
        "https://api.imgbb.com/1/upload?key=fc095d64a37191dd49441c1c5f701dd2",
        formData
      );

      setImageUrl(response.data.data.url);
      onSuccess(response.data.data.url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, [isModalVisible]);

  const prop: UploadProps = {
    maxCount: 1,
    name: "image",
    customRequest: ({ file, onSuccess, onError }) => {
      uploadImageUrl(file, onSuccess, onError);
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      size: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <>
      <Upload {...prop}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </>
  );
}
