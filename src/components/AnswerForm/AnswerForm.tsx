import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  notification,
  Row,
  Typography,
} from "antd";
import { useEffect } from "react";

export default function AnswerForm(props: any) {
  const { answerList, setAnswerList, type, form } = props;

  const addAnswer = () => {
    if (answerList.length >= 4 && type !== "arrange") {
      notification.error({
        message: "Error",
        description: "Bạn chỉ được thêm tối đa 4 đáp án",
      });
      return;
    }
    if (type === "arrange") {
      setAnswerList([...answerList, { value: "", index: answerList.length }]);
    } else {
      setAnswerList([...answerList, { value: "", isCorrect: false }]);
    }
    // console.log(answerList);
  };

  const handleCorrectAnswer = (index: number) => {
    if (type === "single-choice") {
      let newAnswerList = [...answerList];
      newAnswerList.forEach((answer, i) => {
        if (i === index) {
          answer.isCorrect = true;
        } else {
          answer.isCorrect = false;
        }
      });
      setAnswerList(newAnswerList);
      return;
    }

    if (type === "multi-choice") {
      let newAnswerList = [...answerList];
      newAnswerList[index].isCorrect = !newAnswerList[index].isCorrect;
      setAnswerList(newAnswerList);
    }
  };

  useEffect(() => {
    answerList.forEach((answer: any, index: number) => {
      form.setFieldsValue({ [`answer-${index}`]: answer.value });
    });
  }, [answerList]);

  return (
    <>
      <Form.Item className="mt-3">
        <Button onClick={addAnswer}> Thêm đáp án</Button>
      </Form.Item>
      {type === "arrange" && (
        <Typography.Text
          style={{
            color: "red",
            fontSize: "12px",
            display: "block",
            marginBottom: "10px",
          }}
        >
          Lưu ý : Bạn chỉ cần nhập đúng vị trí của các đáp án
        </Typography.Text>
      )}

      {answerList.map((answer: any, index: number) => (
        <Row align="middle" key={index}>
          <Col span={24}>
            <Form.Item
              label={`${type != "arrange" ? "Đáp án" : "Vị trí "} ${index + 1}`}
              name={`answer-${index}`}
              initialValue={answer.value}
              rules={[
                {
                  required: true,
                  message: "Đáp án không được để trống",
                },
              ]}
            >
              <Flex gap={10} align="middle">
                <Checkbox
                  className={`${type === "arrange" ? "hidden" : ""}`}
                  checked={answer.isCorrect}
                  onChange={() => {
                    handleCorrectAnswer(index);
                  }}
                ></Checkbox>
                <Input
                  style={{ width: "90%" }}
                  placeholder="Đáp án"
                  value={answer.value || ""}
                  onChange={(e) => {
                    let newAnswerList = [...answerList];
                    newAnswerList[index].value = e.target.value;
                    setAnswerList(newAnswerList);
                  }}
                />
                <Button
                  key={index}
                  danger
                  onClick={() => {
                    let newAnswerList = [];
                    for (let i = 0; i < answerList.length; i++) {
                      if (i !== index) {
                        newAnswerList.push(answerList[i]);
                      }
                    }
                    console.log(newAnswerList);
                    console.log(answerList);
                    setAnswerList(newAnswerList);
                  }}
                >
                  <DeleteOutlined />
                </Button>
              </Flex>
            </Form.Item>
          </Col>
        </Row>
      ))}
    </>
  );
}
