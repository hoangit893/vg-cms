import { List, Typography } from "antd";
import { useEffect, useState } from "react";
import api from "../../api";

export default function RankList() {
  const [rankList, setRankList] = useState<
    [
      {
        _id: string;
        name: string;
        totalPoint: number;
      }
    ]
  >([
    {
      _id: "",
      name: "",
      totalPoint: 0,
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.getRankList.invoke({});
      setRankList(response.data.rankList);
    };
    fetchData();
  }, []);
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
        <Typography.Title level={3}>Bảng xếp hạng</Typography.Title>
        <div
          className="rank-item"
          key={39489348}
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            backgroundColor: "#F5F5F5",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: "50%",
            }}
          >
            Người chơi
          </span>
          <span>Hạng</span>
        </div>
        <List>
          {rankList.map((item, index) => (
            <List.Item
              key={item._id}
              style={{
                padding: "0.5rem",
                borderRadius: "10px",
                backgroundColor: "#fff",
              }}
            >
              <List.Item.Meta
                title={item?.name}
                description={`Điểm số: ${item.totalPoint}`}
              />
              <div>{index + 1}</div>
            </List.Item>
          ))}
        </List>
      </div>
    </>
  );
}
