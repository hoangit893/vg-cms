import { Col, Row } from "antd";
import ChallengeList from "../ChallengeList/ChallengeList";
import RankList from "../RankList/RankList";
import Statistics from "../Statistics/Statistics";

export default function Dashboard() {
  return (
    <div>
      <Row
        style={{
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Col span={17}>
          <ChallengeList />
        </Col>
        <Col span={6}>
          <RankList />
        </Col>
      </Row>
      <Row
        style={{
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Col span={17}>
          <Statistics />
        </Col>
        <Col span={6}></Col>
      </Row>
    </div>
  );
}
