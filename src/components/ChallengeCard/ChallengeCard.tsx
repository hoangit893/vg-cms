import { Button, Card, Flex, Typography } from "antd";
import { Link } from "react-router-dom";

export default function ChallengeCard(props: any) {
  const { challenge } = props;
  return (
    <>
      <Card
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          maxWidth: "220px",
        }}
        hoverable
        cover={
          <img
            alt="challenge"
            src={
              challenge.imageUrl ??
              "https://png.pngtree.com/thumb_back/fw800/background/20230903/pngtree-a-puzzle-board-with-flags-set-up-image_13191520.jpg"
            }
            style={{ width: "100%", height: "100px", objectFit: "cover" }}
          />
        }
      >
        <Card.Meta
          title={challenge.challengeName}
          description={
            <>
              <Flex justify="space-between" vertical>
                <Typography.Text>{`Level : ${challenge.level}`}</Typography.Text>
                <Typography.Text>{`Point : ${challenge.point}`}</Typography.Text>
                <Button style={{ marginTop: "20px", width: "100%" }}>
                  <Link to={`/question?challengeId=${challenge._id}`}>
                    Chi tiết
                  </Link>
                </Button>
              </Flex>
            </>
          }
        />
      </Card>
    </>
  );
}
