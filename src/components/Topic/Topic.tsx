import { useEffect, useState } from "react";
import { Button, Flex, Table, Modal, Form, Input, notification } from "antd";
import api from "../../api/index";
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UploadImage from "../UploadImage/UploadImage";
export default function Topic() {
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

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Image",
      key: "image",
      width: 200,
      render: (_: any, record: any) => (
        <img
          src={
            record.imageUrl
              ? record.imageUrl
              : "https://via.placeholder.com/150"
          }
          style={{ width: 100, height: 100 }}
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Flex vertical gap={10}>
          <Button type="default" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="primary" onClick={() => onDelete(record)} danger>
            Delete
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
        message: "Please input topic name",
      },
    ],
    description: [
      {
        required: true,
        message: "Please input description",
      },
    ],
  };

  const fetchData = async () => {
    try {
      await api.getTopic
        .invoke({
          queries: {
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
    setFormTitle("Edit Topic");
    record.name = record.name.props.children;
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddNew = () => {
    setFormTitle("Add New Topic");
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
          notification.success({
            message: "Create topic success",
          });
          fetchData();
          setIsModalVisible(false);
        } catch (error: any) {
          notification.error({
            message: error.response.data.error,
          });
        }
      })
      .catch(() => {
        notification.error({
          message: "Please input all fields",
        });
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
            notification.success({
              message: "Update topic success",
            });
            fetchData();
          }
          setIsModalVisible(false);
        } catch (error: any) {
          notification.error({
            message: error.response.data.message,
          });
        }
      })
      .catch(() => {
        notification.error({
          message: "Please input all fields",
        });
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
      notification.success({
        message: "Delete topic success",
      });
      fetchData();
      setDeleteConfirm(false);
    } else {
      notification.error({ message: "Delete topic failed" });
    }
  };

  const onDelete = (record: any) => {
    setCurrentRecord(record);
    setDeleteConfirm(true);
  };

  useEffect(() => {
    fetchData();
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
      <Button
        onClick={handleAddNew}
        type="dashed"
        style={{
          margin: 16,
        }}
        className="float-left"
      >
        Add new topic
      </Button>
      <Table
        tableLayout="auto"
        size="middle"
        virtual
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
        onOk={formTitle === "Add New Topic" ? createTopic : editTopic}
        onCancel={handleCancel}
        destroyOnClose
        okButtonProps={{
          type: "dashed",
        }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={formRules.name}
            initialValue={currentRecord.name}
          >
            <Input placeholder="Topic name" onChange={onNameChange} />
          </Form.Item>
          <Form.Item label="Image" name="image">
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
            label="Description"
            name="description"
            initialValue={currentRecord.description}
            rules={formRules.description}
          >
            <TextArea
              style={{
                resize: "inherit",
              }}
              placeholder="Description"
              allowClear
              onChange={onChangeDescription}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Delete"
        open={deleteConfirm}
        onOk={() => {
          deleteTopic(currentRecord);
        }}
        onCancel={() => {
          setDeleteConfirm(false);
        }}
        okText="Delete"
        okButtonProps={{
          danger: true,
        }}
      >
        <p>Are you sure you want to delete this record?</p>
      </Modal>
    </>
  );
}
