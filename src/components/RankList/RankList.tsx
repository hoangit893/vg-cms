import { Typography } from "antd";

export default function RankList(props: any) {
  let rankList = [
    {
      name: "Nguyen Van A",
      point: 1000,
    },
    {
      name: "Nguyen Van B",
      point: 900,
    },
    {
      name: "Nguyen Van C",
      point: 800,
    },
    {
      name: "Nguyen Van D",
      point: 700,
    },
    {
      name: "Nguyen Van E",
      point: 600,
    },
  ];
  return (
    <>
      <div
        className="rank-list"
        style={{
          padding: "20px",
          backgroundColor: "white",
          height: "100%",
          borderRadius: "10px",
        }}
      >
        <Typography.Title level={3}>Rank List</Typography.Title>
        <div
          className="rank-item"
          key={39489348}
          style={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#F5F5F5",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          <span>#Rank</span>
          <span>Name</span>
          <span>Point</span>
        </div>
        {rankList.map((item, index) => {
          return (
            <div
              className="rank-item"
              style={{
                display: "flex",
                justifyContent: "space-around",
                backgroundColor: "#F5F5F5",
                padding: "10px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              <span>1</span>
              <span>Nguyen Van A</span>
              <span>1000</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
