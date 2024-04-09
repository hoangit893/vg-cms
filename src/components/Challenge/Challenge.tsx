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
} from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import UploadImage from "../UploadImage/UploadImage";

export default function Challenge() {
  const [challengeList, setChallengeList] = useState([]);
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

  //Collums for table
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "index",
      width: 100,
    },
    {
      title: "Name",
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
      title: "Level",
      dataIndex: "level",
      key: "level",
      width: 50,
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
      width: 50,
    },
    {
      title: "Topic",
      dataIndex: "topicName",
      key: "topicName",
      width: 100,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Flex vertical gap={10}>
          <Button type="default" onClick={() => handleEditButton(record)}>
            Edit
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setDeleteConfirm(true);
              setCurrentRecord(record);
            }}
            danger
          >
            Delete
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
        message: "Please input challenge name",
      },
    ],
    description: [
      {
        required: true,
        message: "Please input description",
      },
    ],
    level: [
      {
        required: true,
        message: "Please select level",
      },
    ],
    point: [
      {
        required: true,
        message: "Please input point",
      },
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
  const fetchData = async () => {
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
    const response = await api.getTopic.invoke({});
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
    fetchData();
  }, [currentPage]);

  //Handle edit button
  const handleEditButton = (record: any) => {
    setFormTitle("Edit Challenge");
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
      notification.success({
        message: "Update challenge success",
      });
      await fetchData();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  const handleAddButton = () => {
    setFormTitle("Add New Challenge");
    setIsModalVisible(true);
    resetRecord();
  };

  const createChallenge = async () => {
    try {
      await api.createChallenge.invoke({
        data: currentRecord,
      });
      await fetchData();
      notification.success({
        message: "Create challenge success",
      });

      setIsModalVisible(false);
    } catch (error: any) {
      console.log(error);
      notification.error({
        message: error.response.data.error,
      });
    }
  };

  const deleteChallenge = async (record: any) => {
    try {
      await api.deleteChallenge.invoke({
        params: {
          challengeId: record.challengeId,
        },
      });
      await fetchData();
      setDeleteConfirm(false);
      notification.success({
        message: "Delete challenge success",
      });
    } catch (error) {
      console.error("Error deleting challenge:", error);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    form.resetFields();
  }, [isModalVisible]);

  return (
    <>
      <Button
        onClick={() => handleAddButton()}
        type="dashed"
        style={{
          margin: 16,
        }}
        className="float-left"
      >
        Add new challenge
      </Button>
      <Table
        size="middle"
        virtual
        columns={columns}
        dataSource={challengeList}
        pagination={{
          pageSize: pageSize,
          total: total,
          position: ["bottomCenter"],
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
          formTitle === "Add New Challenge" ? createChallenge : editChallenge
        }
        onCancel={handleCancel}
        okButtonProps={{
          type: "dashed",
        }}
        destroyOnClose
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            rules={formRules.challengeName}
            label="Name"
            name="challengeName"
            initialValue={currentRecord.challengeName}
          >
            <Input
              placeholder="Challenge name"
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
            rules={formRules.description}
            label="Topic"
            name="topicId"
            initialValue={currentRecord.topicId}
          >
            <Select
              placeholder="Select topic"
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
              label="Level"
              name="level"
              rules={formRules.level}
              initialValue={currentRecord.level}
            >
              <Select
                placeholder="Select level"
                allowClear
                onChange={(value) => {
                  console.log(value);
                  setCurrentRecord({ ...currentRecord, level: value });
                }}
                options={[
                  {
                    value: "easy",
                    label: "Easy",
                    isSelected: currentRecord.level === "easy" ? true : false,
                  },
                  {
                    value: "medium",
                    label: "Medium",
                    isSelected: currentRecord.level === "medium" ? true : false,
                  },
                  {
                    value: "hard",
                    label: "Hard",
                    isSelected: currentRecord.level === "hard" ? true : false,
                  },
                ]}
              ></Select>
            </Form.Item>
            <Form.Item
              style={{ width: "50%" }}
              label="Point"
              name="point"
              rules={formRules.point}
              initialValue={currentRecord.point}
            >
              <Input
                placeholder="Point"
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
            label="Image"
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
            label="Description"
            name="description"
            initialValue={currentRecord.description}
          >
            <TextArea
              style={{
                resize: "inherit",
              }}
              placeholder="Description"
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
        title="Delete"
        open={deleteConfirm}
        onOk={() => {
          deleteChallenge(currentRecord);
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
