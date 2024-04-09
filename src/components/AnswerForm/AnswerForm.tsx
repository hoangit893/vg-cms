import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  notification,
  Row,
  Typography,
} from "antd";

export default function AnswerForm(props: any) {
  const { answerList, setAnswerList, type } = props;

  const addAnswer = () => {
    if (answerList.length >= 4 && type !== "arrange") {
      notification.error({
        message: "Error",
        description: "You can only add 4 answers",
      });
      return;
    }
    if (type === "arrange") {
      setAnswerList([...answerList, { value: "", index: answerList.length }]);
    } else {
      setAnswerList([...answerList, { value: "", isCorrect: false }]);
    }
    console.log(answerList);
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

  return (
    <>
      {type === "arrange" && (
        <Typography.Text className="mb-4">
          Note : Input correct order
          <br />
        </Typography.Text>
      )}
      <Form.Item>
        <Button onClick={addAnswer}> Add answer</Button>
      </Form.Item>
      {answerList.map((answer: any, index: number) => (
        <Row align="middle" key={index}>
          <Col span={20}>
            <Form.Item
              label={`${type != "arrange" ? "Answer" : "Position "} ${
                index + 1
              }`}
              name={`answer-${index}`}
              initialValue={answer.value}
              rules={[
                {
                  required: true,
                  message: "Please input your answer!",
                },
              ]}
            >
              <Input
                style={{ width: "90%" }}
                placeholder="Answer"
                value={answer.value || ""}
                onChange={(e) => {
                  let newAnswerList = [...answerList];
                  newAnswerList[index].value = e.target.value;
                  setAnswerList(newAnswerList);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Checkbox
              className={`${type === "arrange" ? "hidden" : ""}`}
              checked={answer.isCorrect}
              onChange={() => {
                handleCorrectAnswer(index);
              }}
            ></Checkbox>
          </Col>
        </Row>
      ))}
    </>
  );
}
