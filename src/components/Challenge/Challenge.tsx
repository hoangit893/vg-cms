import { useEffect, useState } from "react";
import api from "../../api";
import {
  Button,
  Flex,
  Table,
  Modal,
  Form,
  Input,
  Select,
  notification,
  Row,
  Col,
} from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import UploadImage from "../UploadImage/UploadImage";
import Search from "antd/es/input/Search";
import { Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
export default function Challenge() {
  const [challengeList, setChallengeList] = useState([]);
  const [idTimeout, setIdTimeout] = useState<any>(null);
  const [total, setTotal] = useState(1);
  // const params = useParams();
  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>({
    challengeName: "",
    description: "",
    level: "easy",
    point: "",
    topicId: "",
    topicName: "",
    image: "",
  });

  const [topicList, setTopicList] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    Number(queries.get("page")) || 1
  );
  const [pageSize, setPageSize] = useState(
    Number(queries.get("pageSize")) || 10
  );

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

  //Collums for table
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "index",
      width: 100,
    },
    {
      title: "Tên thử thách",
      dataIndex: "challengeName",
      render: (_: any, record: any) => {
        return (
          <Link to={`/question/?challengeId=${record.challengeId}`}>
            {record.challengeName}
          </Link>
        );
      },
      width: 180,
    },
    {
      title: "Ảnh minh họa",
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
      title: "Mô tả thử thách",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Độ khó",
      dataIndex: "level",
      key: "level",
      width: 100,
    },
    {
      title: "Điểm",
      dataIndex: "point",
      key: "point",
      width: 80,
    },
    {
      title: "Chủ đề",
      dataIndex: "topicName",
      key: "topicName",
      width: 100,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Flex vertical gap={10}>
          <Button type="default" onClick={() => handleEditButton(record)}>
            <EditOutlined />
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setDeleteConfirm(true);
              setCurrentRecord(record);
            }}
            danger
          >
            <DeleteOutlined />
          </Button>
        </Flex>
      ),
      width: 100,
    },
  ];

  const formRules = {
    challengeName: [
      {
        required: true,
        message: "Tên thử thách không được để trống",
      },
    ],
    description: [
      {
        required: true,
        message: "Mô tả thử thách không được để trống",
      },
    ],
    level: [
      {
        required: true,
        message: "Độ khó không được để trống",
      },
    ],
    point: [
      {
        required: true,
        message: "Điểm không được để trống",
      },
      // {
      //   type: "number",
      //   min: 1,
      //   message: "Điểm phải lớn hơn 0",
      // },
    ],
    topicId: [
      {
        required: true,
        message: "Please select topic",
      },
    ],
  };

  //Reset Record
  const resetRecord = () => {
    setCurrentRecord({
      challengeName: "",
      description: "",
      level: "easy",
      point: "",
      topicId: "",
      topicName: "",
      image: "",
    });
  };

  //Fetch data from server
  const fetchData = async (search: {
    challengeName?: string;
    topicId?: string;
  }) => {
    if (search.challengeName) {
      queries.set("challengeName", search.challengeName);
    }
    if (search.topicId) {
      queries.set("topicId", search.topicId);
    }

    const response = await api.getChallengeList.invoke({
      queries: queries,
    });

    if (response.status === 200) {
      setTotal(response.data.total);
      let data = response.data.challengeList.map(
        (challenge: any, index: number) => {
          return {
            challengeName: challenge.challengeName,
            level: challenge.level,
            point: challenge.point,
            topicId: challenge.topicId._id,
            topicName: challenge.topicId.topicName,
            imageUrl: challenge.imageUrl,
            challengeId: challenge._id,
            description: challenge.description,
            key: index + 1,
          };
        }
      );
      setChallengeList(data);
    } else {
      console.log("error");
    }
  };

  const getTopicList = async () => {
    const response = await api.getAllTopic.invoke({});
    if (response.status === 200) {
      let data = response.data.topics.map((topic: any) => {
        return {
          topicName: topic.topicName,
          topicId: topic._id,
        };
      });
      setTopicList(data);
    } else {
      console.log("error");
    }
  };

  //Fetch data when page load
  useEffect(() => {
    getTopicList();
    fetchData({});
  }, [currentPage]);

  //Handle edit button
  const handleEditButton = (record: any) => {
    setFormTitle("Cập nhật thử thách");
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  const editChallenge = async () => {
    try {
      await api.updateChallenge.invoke({
        params: {
          challengeId: currentRecord.challengeId,
        },
        data: currentRecord,
      });
      notifySuccess("Cập nhật thử thách thành công");
      await fetchData({});
      setIsModalVisible(false);
    } catch (error) {
      notifyError("Cập nhật thử thách không thành công");
      console.error("Cập nhật thử thách không thành công", error);
    }
  };

  const handleAddButton = () => {
    setFormTitle("Tạo thử thách mới");
    setIsModalVisible(true);
    resetRecord();
  };

  const createChallenge = async () => {
    try {
      await api.createChallenge.invoke({
        data: currentRecord,
      });
      await fetchData({});
      notifySuccess("Tạo thử thách thành công");

      setIsModalVisible(false);
    } catch (error: any) {
      console.log(error);
      notifyError("Tạo thử thách không thành công");
    }
  };

  const deleteChallenge = async (record: any) => {
    try {
      await api.deleteChallenge.invoke({
        params: {
          challengeId: record.challengeId,
        },
      });
      await fetchData({});
      setDeleteConfirm(false);
      notifySuccess("Xoá thử thách thành công");
    } catch (error) {
      notifyError("Xoá thử thách không thành công");
      console.error("Error deleting challenge:", error);
    }
  };
  const handleCancel = () => {
    console.log(queries);
    setIsModalVisible(false);
  };

  useEffect(() => {
    form.resetFields();
  }, [isModalVisible]);

  const height = window.innerHeight - 360;

  return (
    <>
      <div
        className="tool-bar "
        style={{
          textAlign: "center",
        }}
      >
        <Typography.Title level={2}>Quản lí thử thách</Typography.Title>
        <Row className="mb-9" justify="space-between" wrap={false}>
          <Flex gap={10}>
            <Col>
              <Search
                style={{
                  maxWidth: "400px",
                }}
                className="search-box"
                placeholder="Tìm kiếm thử thách"
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                onChange={async (e) => {
                  if (idTimeout) {
                    clearTimeout(idTimeout);
                  }
                  setIdTimeout(
                    setTimeout(async () => {
                      fetchData({ challengeName: e.target.value });
                    }, 100)
                  );
                }}
              />
            </Col>

            <Select
              placeholder="Chọn chủ đề"
              style={{
                height: "40px",
                width: "200px",
              }}
              options={topicList.map((topic: any) => {
                return {
                  value: topic.topicId,
                  label: topic.topicName,
                };
              })}
              allowClear
              onChange={async (value) => {
                fetchData({ topicId: value });
              }}
            />
          </Flex>

          <Button
            style={{
              width: "150px",
              height: "40px",
            }}
            type="primary"
            className="float-left"
            onClick={() => handleAddButton()}
          >
            Tạo thử thách mới
          </Button>
        </Row>
      </div>

      <Table
        size="middle"
        scroll={{ y: height }}
        columns={columns}
        dataSource={challengeList}
        pagination={{
          pageSize: pageSize,
          total: total,
          position: ["bottomCenter"],
          showQuickJumper: true,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
      ></Table>
      <Modal
        title={formTitle}
        open={isModalVisible}
        onOk={
          formTitle === "Tạo thử thách mới" ? createChallenge : editChallenge
        }
        onCancel={handleCancel}
        okButtonProps={{
          type: "primary",
        }}
        destroyOnClose
        okText={
          formTitle === "Tạo thử thách mới"
            ? "Tạo thử thách"
            : "Cập nhật thử thách"
        }
        cancelText="Huỷ bỏ"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            rules={formRules.challengeName}
            label="Tên thử thách"
            name="challengeName"
            initialValue={currentRecord.challengeName}
          >
            <Input
              placeholder="Tên thử thách"
              onChange={(e) => {
                setCurrentRecord({
                  ...currentRecord,
                  challengeName: e.target.value,
                });
                console.log(currentRecord);
              }}
            />
          </Form.Item>
          <Form.Item
            rules={formRules.topicId}
            label="Chủ đề"
            name="topicId"
            initialValue={currentRecord.topicId}
          >
            <Select
              placeholder="Chủ đề"
              allowClear
              onChange={(value) => {
                setCurrentRecord({ ...currentRecord, topicId: value });
              }}
              options={topicList.map((topic: any) => {
                const isSelected = currentRecord.topicId == topic.topicId;
                return {
                  value: topic.topicId,
                  label: topic.topicName,
                  isSelected: isSelected ? true : false,
                };
              })}
            ></Select>
          </Form.Item>
          <Flex gap={10} justify="left">
            <Form.Item
              style={{ width: "50%" }}
              label="Đó khó"
              name="level"
              rules={formRules.level}
              initialValue={currentRecord.level ?? "easy"}
            >
              <Select
                placeholder="Độ khó"
                allowClear
                onChange={(value) => {
                  console.log(value);
                  setCurrentRecord({ ...currentRecord, level: value });
                }}
                options={[
                  {
                    value: "easy",
                    label: "Dễ",
                    isSelected: currentRecord.level === "easy" ? true : false,
                  },
                  {
                    value: "medium",
                    label: "Trung bình",
                    isSelected: currentRecord.level === "medium" ? true : false,
                  },
                  {
                    value: "hard",
                    label: "Khó",
                    isSelected: currentRecord.level === "hard" ? true : false,
                  },
                ]}
              ></Select>
            </Form.Item>
            <Form.Item
              rules={formRules.point}
              style={{ width: "50%" }}
              label="Điểm"
              name="point"
              initialValue={currentRecord.point}
            >
              <Input
                placeholder="Điểm của thử thách"
                type="number"
                onChange={(e) =>
                  setCurrentRecord({
                    ...currentRecord,
                    point: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Flex>
          <Form.Item
            label="Ảnh minh họa"
            name="image"
            initialValue={currentRecord.image}
          >
            <UploadImage
              imageUrl={currentRecord.imageUrl}
              setImageUrl={(url: string) => {
                setCurrentRecord({ ...currentRecord, imageUrl: url });
              }}
            ></UploadImage>
          </Form.Item>
          <Form.Item
            label="Mô tả thử thách"
            rules={formRules.description}
            name="description"
            initialValue={currentRecord.description}
          >
            <TextArea
              style={{
                resize: "inherit",
              }}
              placeholder="Mô tả thử thách"
              allowClear
              onChange={(e) =>
                setCurrentRecord({
                  ...currentRecord,
                  description: e.target.value,
                })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xoá thử thách"
        open={deleteConfirm}
        onOk={() => {
          deleteChallenge(currentRecord);
        }}
        okText="Xác nhận xoá"
        onCancel={() => {
          setDeleteConfirm(false);
        }}
        cancelText="Huỷ bỏ"
        okButtonProps={{
          danger: true,
        }}
      >
        <p>Bạn có chắc chắn muốn xoá thử thách này ?</p>
        <p
          style={{
            color: "red",
          }}
        >
          ** Các câu hỏi liên quan đến thử thách cũng sẽ bị xoá
        </p>
      </Modal>
    </>
  );
}
