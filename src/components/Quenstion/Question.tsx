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
  Typography,
} from "antd";
// import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AnswerForm from "../AnswerForm/AnswerForm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function Question() {
  const [questionList, setQuestionList] = useState([]);
  const [total, setTotal] = useState(0);
  //   const params = useParams();
  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>({
    question: "",
    questionId: "",
    type: "single-choice",
    answerList: [],
    challengeId: "",
    challengeName: "",
  });
  const [selectedChallenge, setSelectedChallenge] = useState<any>({});

  const [challengeList, setChallengeList] = useState([]);
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
  //Collums for table
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "index",
      width: 100,
    },
    {
      title: "Câu hỏi",
      dataIndex: "question",
      key: "question",
      width: "800",
    },
    {
      title: "Loại câu hỏi",
      dataIndex: "type",
      key: "type",
      width: 180,
    },
    {
      title: "Thử thách",
      dataIndex: "challengeName",
      key: "challengeName",
      width: 180,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Flex vertical gap={10}>
          <Button
            type="default"
            onClick={() => {
              handleEditButton(record);
            }}
          >
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

  //Reset Record
  const resetRecord = () => {
    setCurrentRecord({
      question: "",
      questionId: "",
      type: "single-choice",
      answerList: [],
      challengeId: "",
      challengeName: "",
    });
  };
  //Fetch data from server
  const fetchData = async () => {
    const response = await api.getQuestionList.invoke({
      queries: {
        page: currentPage,
        pageSize: pageSize,
        ...selectedChallenge,
      },
    });
    if (response.status === 200) {
      setTotal(response.data.total);
      let data = response.data.questionList;
      data = data.map((question: any, index: number) => {
        return {
          key: index + 1,
          question: question.question,
          questionId: question._id,
          type: question.type,
          answerList: question.answerList,
          challengeId: question.challengeId?._id,
          challengeName: question.challengeId?.challengeName,
        };
      });
      setQuestionList(data);
    } else {
      console.log("error");
    }
  };

  const getchallengeList = async () => {
    const response = await api.getAllChallenge.invoke({});
    if (response.status === 200) {
      let data = response.data.challengeList;
      data = data.map((challenge: any) => {
        return {
          challengeName: challenge?.challengeName,
          challengeId: challenge?._id,
        };
      });
      setChallengeList(data);
    } else {
      console.log("error");
    }
  };

  //Fetch data when page load
  useEffect(() => {
    getchallengeList();
    fetchData();
  }, [currentPage, pageSize, selectedChallenge]);

  //Handle edit button
  const handleEditButton = (record: any) => {
    setFormTitle("Cập nhật câu hỏi");
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  const editQuestion = async () => {
    console.log(currentRecord);
    form
      .validateFields()
      .then(async () => {
        try {
          await api.updateQuestion.invoke({
            params: {
              questionId: currentRecord.questionId,
            },
            data: {
              question: currentRecord.question,
              type: currentRecord.type,
              answerList: currentRecord.answerList,
              challengeId: currentRecord.challengeId,
            },
          });
          NotifySuccess("Cập nhật câu hỏi thành công");
          fetchData();
          resetRecord();
          setIsModalVisible(false);
        } catch (error) {
          NotifyError("Cập nhật câu hỏi thất bại");
          console.error("Error updating topic:", error);
        }
      })
      .catch((error) => {
        NotifyError(error.response.data.message);
      });
  };

  const handleAddButton = () => {
    setFormTitle("Thêm câu hỏi mới");
    resetRecord();
    setCurrentRecord({
      ...currentRecord,
      challengeId: selectedChallenge.challengeId,
    });
    setIsModalVisible(true);
  };

  const createQuestion = async () => {
    console.log(currentRecord);
    form
      .validateFields()
      .then(async () => {
        await api.createQuestion.invoke({
          data: currentRecord,
        });

        NotifySuccess("Thêm câu hỏi thành công");
        await fetchData();
        setIsModalVisible(false);
      })
      .catch((error) => {
        NotifyError(error.response.data.message);
      });
  };

  const deletionQuestion = async (record: any) => {
    try {
      await api.deleteQuestion.invoke({
        params: {
          questionId: record.questionId,
        },
      });

      NotifySuccess("Xoá câu hỏi thành công");
      await fetchData();
      setDeleteConfirm(false);
    } catch (error: any) {
      NotifyError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  const handleCancel = () => {
    resetRecord();
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isModalVisible) {
      form.resetFields();
    }
  }, [isModalVisible]); // Update dependency array

  const formRules = {
    question: [
      {
        required: true,
        message: "Please input your question!",
      },
    ],
    challenge: [
      {
        required: true,
        message: "Please select challenge!",
      },
    ],
    type: [
      {
        required: true,
        message: "Please select question type!",
      },
    ],
  };

  const height = window.innerHeight - 360;
  return (
    <>
      <div
        className="tool-bar "
        style={{
          textAlign: "center",
        }}
      >
        <Typography.Title level={2}>Quản lí câu hỏi</Typography.Title>

        <Flex gap={100} justify="space-between" className="mb-9">
          <Select
            placeholder="Chọn thử thách"
            style={{
              height: "40px",
              width: "400px",
            }}
            options={challengeList.map((challenge: any) => {
              return {
                value: challenge.challengeId,
                label: challenge.challengeName,
              };
            })}
            allowClear
            onChange={async (value, option: any) => {
              setSelectedChallenge({
                challengeName: option?.label,
                challengeId: value,
              });
            }}
          />
          <Button
            onClick={() => handleAddButton()}
            type="primary"
            style={{
              width: "150px",
              height: "40px",
            }}
          >
            Thêm câu hỏi mới
          </Button>
        </Flex>
      </div>

      <Table
        scroll={{ y: height }}
        size="middle"
        columns={columns}
        dataSource={questionList}
        pagination={{
          pageSize: pageSize,
          total: total,
          position: ["bottomCenter"],
          showSizeChanger: true,
          onShowSizeChange: (size) => {
            setPageSize(size);
          },
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
      ></Table>
      <Modal
        title={formTitle}
        open={isModalVisible}
        onOk={formTitle == "Thêm câu hỏi mới" ? createQuestion : editQuestion}
        onCancel={handleCancel}
        okButtonProps={{
          type: "dashed",
        }}
        destroyOnClose
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            rules={formRules.question}
            label="Câu hỏi"
            name="question"
            initialValue={currentRecord.question}
          >
            <Input
              placeholder="Câu hỏi"
              onChange={(e) => {
                setCurrentRecord({
                  ...currentRecord,
                  question: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            rules={formRules.challenge}
            label="Thử thách"
            name="challenge"
            initialValue={currentRecord.challengeId}
          >
            <Select
              placeholder="Lựa chọn thử thách"
              allowClear
              onChange={(value) => {
                setCurrentRecord({ ...currentRecord, challengeId: value });
              }}
              options={challengeList.map((challenge: any) => {
                return {
                  value: challenge.challengeId,
                  label: challenge.challengeName,
                  isSelected:
                    challenge.challengeId === currentRecord.challengeId
                      ? true
                      : false,
                };
              })}
            ></Select>
          </Form.Item>
          <Flex gap={10} justify="left">
            <Form.Item
              rules={formRules.type}
              style={{ width: "50%" }}
              label="Loại câu hỏi"
              name="type"
              initialValue={currentRecord.type}
            >
              <Select
                placeholder="Lựa chọn loại câu hỏi"
                allowClear
                onChange={(value) => {
                  if (value === "arrange") {
                    setCurrentRecord({
                      ...currentRecord,
                      answerList: [],
                      type: value,
                    });
                    return;
                  }
                  let newAnswerList = currentRecord.answerList.map(
                    (answer: any) => {
                      return {
                        value: answer.value,
                        isCorrect: false,
                      };
                    }
                  );
                  setCurrentRecord({
                    ...currentRecord,
                    answerList: newAnswerList,
                    type: value,
                  });
                }}
                options={[
                  {
                    value: "single-choice",
                    label: "Một đáp án đúng",
                    isSelected:
                      currentRecord.type === "single-choice" ? true : false,
                  },
                  {
                    value: "multi-choice",
                    label: "Nhiều đáp án đúng",
                    isSelected:
                      currentRecord.type === "multi-choice" ? true : false,
                  },
                  {
                    value: "arrange",
                    label: "Sắp xếp",
                    isSelected: currentRecord.type === "arrange" ? true : false,
                  },
                ]}
              ></Select>
            </Form.Item>
          </Flex>

          <AnswerForm
            form={form}
            type={currentRecord.type}
            settype={(type: any) => {
              setCurrentRecord({
                ...currentRecord,
                type: type,
              });
            }}
            answerList={currentRecord.answerList}
            setAnswerList={(answerList: any) => {
              setCurrentRecord({ ...currentRecord, answerList: answerList });
            }}
          ></AnswerForm>
        </Form>
      </Modal>
      <Modal
        title="Xác nhận"
        open={deleteConfirm}
        onOk={() => {
          deletionQuestion(currentRecord);
        }}
        onCancel={() => {
          setDeleteConfirm(false);
        }}
        cancelText="Huỷ"
        okText="Xác nhận xoá"
        okButtonProps={{
          danger: true,
        }}
      >
        <p>Bạn có chắn chắn muốn xoá câu hỏi này ?</p>
      </Modal>
    </>
  );
}
