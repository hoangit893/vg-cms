import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Table,
  Modal,
  Form,
  Input,
  notification,
  Typography,
} from "antd";
import api from "../../api/index";
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UploadImage from "../UploadImage/UploadImage";
import Search from "antd/es/input/Search";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
export default function Topic() {
  const [idTimeout, setIdTimeout] = useState<any>(null);
  const height = window.innerHeight - 360;
  const [form] = Form.useForm();
  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>({
    name: "",
    description: "",
  });
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [formTitle, setFormTitle] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    Number(queries.get("page")) || 1
  );
  const [pageSize, setPageSize] = useState(
    Number(queries.get("pageSize")) || 10
  );

  const NotifySuccess = (message: string) => {
    notification.success({
      message: message,
    });
  };

  const NotifyError = (message: string) => {
    notification.error({
      message: message,
    });
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "Tên chủ đề",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Ảnh minh hoạ",
      key: "image",
      width: 200,
      render: (_: any, record: any) => (
        <img
          src={
            record.imageUrl
              ? record.imageUrl
              : "https://via.placeholder.com/150"
          }
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "0%",
          }}
        />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Flex vertical gap={10} justify="center">
          <Button
            style={{
              paddingBottom: "5px",
            }}
            type="default"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
          </Button>
          <Button type="primary" onClick={() => onDelete(record)} danger>
            <DeleteOutlined />
          </Button>
        </Flex>
      ),
      width: 100,
    },
  ];

  const formRules = {
    name: [
      {
        required: true,
        message: "Hãy nhập tên chủ đề",
      },
    ],
    description: [
      {
        required: true,
        message: "Hãy nhập mô tả chủ đề",
      },
    ],
  };

  const fetchData = async (queries: object) => {
    try {
      await api.getTopic
        .invoke({
          queries: {
            ...queries,
            page: currentPage,
            pageSize: pageSize,
          },
        })
        .then((response) => {
          setData(response.data.topics);
          setTotal(response.data.total);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentRecord((prev: any) => ({ ...prev, name: e.target.value }));
    console.log(currentRecord);
  };

  const onChangeDescription = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.value);
    setCurrentRecord((prev: any) => ({ ...prev, description: e.target.value }));
  };

  const handleEdit = (record: any) => {
    setFormTitle("Chỉnh sửa chủ đề");
    record.name = record.name.props.children;
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddNew = () => {
    setFormTitle("Tạo chủ đề mới");
    setCurrentRecord({
      name: "",
      description: "",
    });
    setIsModalVisible(true);
  };

  const createTopic = async () => {
    form
      .validateFields()
      .then(async () => {
        try {
          await api.createTopic.invoke({
            data: {
              topicName: currentRecord.name,
              description: currentRecord.description,
              imageUrl: currentRecord.imageUrl,
            },
          });

          NotifySuccess("Tạo chủ đề thành công");
          fetchData({});
          setIsModalVisible(false);
        } catch (error: any) {
          NotifyError(error.response.data.error);
        }
      })
      .catch(() => {
        NotifyError("Hãy điền đầy đủ thông tin chủ đề");
      });
  };

  const editTopic = async () => {
    form
      .validateFields()
      .then(async () => {
        try {
          const response = await api.updateTopic.invoke({
            params: {
              topicId: currentRecord.key,
            },
            data: {
              topicName: currentRecord.name,
              description: currentRecord.description,
              imageUrl: currentRecord.imageUrl,
            },
          });
          if (response.status === 200) {
            NotifySuccess("Cập nhật chủ đề thành công");
            fetchData({});
          }
          setIsModalVisible(false);
        } catch (error: any) {
          NotifyError(error.response.data.error);
        }
      })
      .catch(() => {
        NotifyError("Hãy điền đầy đủ thông tin chủ đề");
      });
    // Make API call to update record
  };

  const deleteTopic = async (record: any) => {
    const response = await api.deleteTopic.invoke({
      params: {
        topicId: record.key,
      },
    });
    if (response.status === 200) {
      NotifySuccess("Xoá chủ đề thành công");

      fetchData({});
      setDeleteConfirm(false);
    } else {
      NotifyError("Xoá chủ đề không thành công");
    }
  };

  const onDelete = (record: any) => {
    setCurrentRecord(record);
    setDeleteConfirm(true);
  };

  useEffect(() => {
    fetchData({});
  }, [currentPage, pageSize]);

  useEffect(() => {
    form.resetFields();
  }, [isModalVisible]);

  const processedData = data.map((item: any, index) => {
    return {
      id: index + 1,
      key: item._id,
      name: <Link to={`/challenge?topicId=${item._id}`}>{item.topicName}</Link>,
      description: item.description,
      imageUrl: item.imageUrl,
    };
  });

  return (
    <>
      <div
        className="tool__bar "
        style={{
          textAlign: "center",
        }}
      >
        <Typography.Title level={2}>Quản lí chủ đề</Typography.Title>
        <Flex gap={100} className="mb-9">
          <Search
            className="search-box"
            placeholder="Tìm kiếm chủ đề"
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onChange={async (e) => {
              if (idTimeout) {
                clearTimeout(idTimeout);
              }
              setIdTimeout(
                setTimeout(async () => {
                  fetchData({ topicName: e.target.value });
                }, 100)
              );
            }}
          />
          <Button
            onClick={handleAddNew}
            style={{
              width: "150px",
              height: "40px",
            }}
            type="primary"
            className="float-left"
          >
            Tạo chủ đề mới
          </Button>
        </Flex>
      </div>

      <Table
        scroll={{ y: height }}
        tableLayout="auto"
        size="middle"
        columns={columns}
        dataSource={processedData}
        pagination={{
          pageSize: pageSize,
          total: total,
          position: ["bottomCenter"],
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
      />

      <Modal
        title={formTitle}
        open={isModalVisible}
        onOk={formTitle === "Tạo chủ đề mới" ? createTopic : editTopic}
        onCancel={handleCancel}
        cancelText="Hủy"
        okText={formTitle === "Tạo chủ đề mới" ? "Tạo" : "Cập nhật"}
        destroyOnClose
        okButtonProps={{
          type: "primary",
        }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Tên chủ đề"
            name="name"
            rules={formRules.name}
            initialValue={currentRecord.name}
          >
            <Input placeholder="Tên chủ đề" onChange={onNameChange} />
          </Form.Item>
          <Form.Item label="Ảnh minh hoạ" name="image">
            <UploadImage
              isModalVisible={isModalVisible}
              record={currentRecord}
              imageUrl={currentRecord.imageUrl}
              setImageUrl={(url: string) => {
                setCurrentRecord((prev: any) => ({ ...prev, imageUrl: url }));
              }}
            ></UploadImage>
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            initialValue={currentRecord.description}
            rules={formRules.description}
          >
            <TextArea
              style={{
                resize: "inherit",
              }}
              placeholder="Mô tả chủ đề"
              allowClear
              onChange={onChangeDescription}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xác nhận xoá chủ đề"
        open={deleteConfirm}
        onOk={() => {
          deleteTopic(currentRecord);
        }}
        onCancel={() => {
          setDeleteConfirm(false);
        }}
        cancelText="Hủy"
        okText="Xoá"
        okButtonProps={{
          danger: true,
        }}
      >
        <p>Bạn có muốn xoá chủ đề không ?</p>
        <p
          style={{
            color: "red",
          }}
        >
          * Các thử thách thuộc chủ đề này cũng sẽ bị xoá !{" "}
        </p>
      </Modal>
    </>
  );
}
