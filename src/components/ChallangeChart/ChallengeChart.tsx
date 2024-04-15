import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ChallengeChart(props: any) {
  const { statistics } = props;

  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={statistics}>
          <Line type="monotone" dataKey="totalPlay" stroke="#b44445" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
