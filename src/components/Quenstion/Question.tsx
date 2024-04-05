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
  List,
  Grid,
} from "antd";
// import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AnswerForm from "../AnswerForm/AnswerForm";

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

  const [challengeList, setChallengeList] = useState([]);
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
      title: "Question",
      dataIndex: "question",
      key: "question",
      width: "800",
    },
    {
      title: "Question Type",
      dataIndex: "type",
      key: "type",
      width: 180,
    },
    {
      title: "Challenge",
      dataIndex: "challengeName",
      key: "challengeName",
      width: 180,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Flex vertical gap={10}>
          <Button
            type="default"
            onClick={() => {
              handleEditButton(record);
            }}
          >
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
    console.log(queries);
    const response = await api.getQuestionList.invoke({
      queries: queries,
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
    const response = await api.getChallengeList.invoke({});
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
  }, [currentPage]);

  //Handle edit button
  const handleEditButton = (record: any) => {
    setFormTitle("Edit question");
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  const editQuestion = async () => {
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
          notification.success({
            message: "Update challenge success",
          });
          fetchData();
          resetRecord();
          setIsModalVisible(false);
        } catch (error) {
          console.error("Error updating topic:", error);
        }
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const handleAddButton = () => {
    setFormTitle("Add New Question");
    resetRecord();
    setIsModalVisible(true);
  };

  const createQuestion = async () => {
    form
      .validateFields()
      .then(async () => {
        try {
          await api.createQuestion.invoke({
            data: currentRecord,
          });
          await fetchData();
          setIsModalVisible(false);
        } catch (error: any) {
          notification.error({
            message: error.response.data.message,
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const deletionQuestion = async (record: any) => {
    try {
      await api.deleteQuestion.invoke({
        params: {
          questionId: record.questionId,
        },
      });
      notification.success({
        message: "Delete question success",
      });
      await fetchData();
      setDeleteConfirm(false);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
  const handleCancel = () => {
    resetRecord();
    setIsModalVisible(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      question: currentRecord.question,
      challenge: currentRecord.challengeId,
      type: currentRecord.type,
    });
  }, [isModalVisible, currentRecord, form]); // Update dependency array

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
        Add new question
      </Button>
      <Table
        size="middle"
        virtual
        columns={columns}
        dataSource={questionList}
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
        onOk={formTitle === "Add New Question" ? createQuestion : editQuestion}
        onCancel={handleCancel}
        okButtonProps={{
          type: "dashed",
        }}
        destroyOnClose
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            rules={formRules.question}
            label="Question"
            name="question"
            initialValue={currentRecord.question}
          >
            <Input
              placeholder="Question"
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
            label="Challenge"
            name="challenge"
            initialValue={currentRecord.challengeId}
          >
            <Select
              placeholder="Select challenge"
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
              label="Question Type"
              name="type"
              initialValue={currentRecord.type}
            >
              <Select
                placeholder="Select type"
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
                    label: "Single Answer",
                    isSelected:
                      currentRecord.type === "single-choice" ? true : false,
                  },
                  {
                    value: "multi-choice",
                    label: "Multiple Answer",
                    isSelected:
                      currentRecord.type === "multi-choice" ? true : false,
                  },
                  {
                    value: "arrange",
                    label: "Arrange",
                    isSelected: currentRecord.type === "arrange" ? true : false,
                  },
                ]}
              ></Select>
            </Form.Item>
          </Flex>
          {currentRecord.type === "single-choice" ||
          currentRecord.type === "multi-choice" ? (
            <AnswerForm
              type={currentRecord.type}
              settype={(type: any) => {
                setCurrentRecord({
                  ...currentRecord,
                  type: type,
                });
              }}
              answerList={currentRecord.answerList}
              setAnswerList={(answerList: any) => {
                console.log(currentRecord.type);
                setCurrentRecord({ ...currentRecord, answerList: answerList });
              }}
            ></AnswerForm>
          ) : (
            <>
              <Typography.Text>Answer : </Typography.Text>
              <Flex justify="space-between">
                {currentRecord.answerList.map((key: any) => {
                  return (
                    <span
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "5px",
                      }}
                    >
                      {key.value}
                    </span>
                  );
                })}
              </Flex>
            </>
          )}
        </Form>
      </Modal>
      <Modal
        title="Delete"
        open={deleteConfirm}
        onOk={() => {
          deletionQuestion(currentRecord);
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
