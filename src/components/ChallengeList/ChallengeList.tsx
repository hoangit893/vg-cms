import { useEffect, useState } from "react";
import ChallengeCard from "../ChallengeCard/ChallengeCard";
import api from "../../api";
import { Button, Col, Row, Typography } from "antd";
import {
  BackwardFilled,
  CaretLeftOutlined,
  CaretRightOutlined,
  ForwardFilled,
} from "@ant-design/icons";
import { set } from "mongoose";

export default function ChallengeList() {
  const [challengeList, setChallengeList] = useState([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState({
    page: 1,
    pageSize: 4,
  });
  const fetchData = async () => {
    const response = await api.getChallengeList.invoke({
      queries: {
        ...query,
      },
    });
    console.log(response.data.total);
    setTotal(response.data.total);
    setChallengeList(response.data.challengeList);
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <div
      className="challenge-containter"
      style={{
        height: "100%",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      <Typography.Title level={3}>Most Challenges</Typography.Title>

      <Row justify="space-between" align="middle">
        <Col span={1}>
          <CaretLeftOutlined
            onClick={() => {
              setQuery({ ...query, page: query.page - 1 });
            }}
            style={{ fontSize: "25px" }}
          />
        </Col>
        {challengeList.map((challenge: any) => {
          console.log(challenge);
          return (
            <Col className="challenge-card" span={5}>
              <ChallengeCard key={challenge._id} challenge={challenge} />
            </Col>
          );
        })}
        <Col span={1}>
          <CaretRightOutlined
            disabled={query.page == Math.ceil(total / query.pageSize)}
            onClick={() => {
              console.log(query.page == Math.ceil(total / query.pageSize));
              setQuery({ ...query, page: query.page + 1 });
            }}
            style={{
              fontSize: "25px",
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
