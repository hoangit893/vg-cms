import { useEffect, useState } from "react";
import { Col, DatePicker, Row } from "antd";
import api from "../../api";
import dayjs from "dayjs";
import ChallengeChart from "../ChallangeChart/ChallengeChart";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

// const handleRangeChange = (dates: any, dateStrings: [string, string]) => {
//   if (dates) {
//     const startUnix = dates[0].unix();
//     const endUnix = dates[1].unix();
//     console.log(startUnix, endUnix); // Do something with the Unix timestamps
//   }
// };

export default function Statistics() {
  const [startDate, setStartDate] = useState(
    dayjs().subtract(3, "day").format(dateFormat)
  );
  const [endDate, setEndDate] = useState(
    dayjs().add(3, "day").format(dateFormat)
  );
  const [statistics, setStatistics] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.getStatistics.invoke({
        queries: {
          startDate: dayjs(startDate, dateFormat).unix(),
          endDate: dayjs(endDate, dateFormat).unix() + 86400 - 1,
        },
      });
      setStatistics(response.data.statistics);
    };
    fetchData();
  }, [startDate, endDate]);

  return (
    <>
      <div
        className="container bg-white h-auto rounded-xl"
        style={{
          width: "100%",
          marginTop: "60px",
          padding: "30px",
          backgroundColor: "white",
        }}
      >
        <Row justify="space-around">
          <Col span={8}>
            <h1 className="text-2xl font-medium text-center">
              Lượt chơi theo ngày
            </h1>
          </Col>
          <Col span={10}>
            <RangePicker
              defaultValue={[
                dayjs(startDate, dateFormat),
                dayjs(endDate, dateFormat),
              ]}
              format={dateFormat}
              onChange={(dates, dateStrings) => {
                console.log(dates);
                setStartDate(dateStrings[0]);
                setEndDate(dateStrings[1]);
              }}
            />
          </Col>
        </Row>
        <Row
          style={{
            marginTop: "20px",
          }}
        >
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ChallengeChart statistics={statistics} />
          </Col>
        </Row>
      </div>
    </>
  );
}
