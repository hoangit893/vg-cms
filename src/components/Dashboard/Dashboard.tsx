import { Col, Row } from "antd";
import ChallengeList from "../ChallengeList/ChallengeList";
import RankList from "../RankList/RankList";

export default function Dashboard() {
  return (
    <div>
      <Row justify="space-around">
        <Col span={17}>
          <ChallengeList />
        </Col>
        <Col span={6}>
          <RankList />
        </Col>
      </Row>
    </div>
  );
}
