import { Button, Checkbox, Flex, Form, Input, notification } from "antd";
import { useState } from "react";

export default function AnswerForm(props: any) {
  const { answerList, setAnswerList, type } = props;

  const addAnswer = () => {
    if (answerList.length >= 4) {
      notification.error({
        message: "Error",
        description: "You can only add 4 answers",
      });
      return;
    }
    setAnswerList([...answerList, { value: "", isCorrect: false }]);
    console.log("answerList", answerList);
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
      <Form.Item>
        <Button onClick={addAnswer}> Add answer</Button>
      </Form.Item>
      {answerList.map((answer: any, index: number) => (
        <Form.Item key={index} label={`Answer ${index + 1}`}>
          <Flex gap={10}>
            <Input
              required
              style={{ width: "90%" }}
              key={index}
              placeholder="Answer"
              value={answer.value || ""}
              onChange={(e) => {
                let newAnswerList = [...answerList];
                newAnswerList[index].value = e.target.value;
                setAnswerList(newAnswerList);
              }}
            />
            <Checkbox
              checked={answer.isCorrect}
              onChange={() => {
                handleCorrectAnswer(index);
              }}
            ></Checkbox>
          </Flex>
        </Form.Item>
      ))}
    </>
  );
}
