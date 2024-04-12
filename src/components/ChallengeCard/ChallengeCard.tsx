import { Button, Card, Flex, Typography } from "antd";

export default function ChallengeCard(props: any) {
  const { challenge } = props;
  return (
    <>
      <Card
        style={{ width: "100%", height: "100%", position: "relative" }}
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
                  Thử thách
                </Button>
              </Flex>
            </>
          }
        />
      </Card>
    </>
  );
}
