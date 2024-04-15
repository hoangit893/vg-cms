import { useEffect, useState } from "react";
import ChallengeCard from "../ChallengeCard/ChallengeCard";
import api from "../../api";
import { Col, Row, Typography } from "antd";
// import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

export default function ChallengeList() {
  const [challengeList, setChallengeList] = useState([]);
  // const [total, setTotal] = useState(0);
  // const [query, setQuery] = useState({
  //   page: 1,
  //   pageSize: 4,
  // });
  const fetchData = async () => {
    const response = await api.getMostPlayedChallenge.invoke({
      // queries: {
      //   ...query,
      // },
    });
    console.log(response.data.total);
    // setTotal(response.data.total);
    setChallengeList(response.data.mostPlayedList);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <Typography.Title level={3}>
        Thử thách được chơi nhiều nhất
      </Typography.Title>

      <Row
        justify="space-around"
        align="middle"
        style={{
          height: "90%",
        }}
      >
        {/* <Col span={1}>
          <button
            disabled={query.page == 1}
            onClick={() => {
              setQuery({ ...query, page: query.page - 1 });
            }}
          >
            <CaretLeftOutlined style={{ fontSize: "25px" }} />
          </button>
        </Col> */}
        {challengeList.map((challenge: any) => {
          console.log(challenge.challenge);
          return (
            <Col
              className="challenge-card"
              key={challenge.challenge._id}
              span={5}
            >
              <ChallengeCard challenge={challenge.challenge} />
            </Col>
          );
        })}
        {/* <Col span={1}>
          <button
            key="forward-btn"
            disabled={query.page == Math.ceil(total / query.pageSize)}
            onClick={() => {
              console.log(query.page == Math.ceil(total / query.pageSize));
              setQuery({ ...query, page: query.page + 1 });
            }}
          >
            <CaretRightOutlined
              style={{
                fontSize: "25px",
              }}
            />
          </button>
        </Col> */}
      </Row>
    </div>
  );
}
