import { Route, Routes } from "react-router-dom";
import Challenge from "../Challenge/Challenge";
import Topic from "../Topic/Topic";
import User from "../User/User";
import Question from "../Quenstion/Question";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";

export default function ContentSide() {
  return (
    <>
      <Routes>
        <Route path="profile" element={<Profile />}></Route>
        <Route path="/" element={<Dashboard></Dashboard>}></Route>
        <Route path="topic" element={<Topic></Topic>}></Route>
        <Route path="challenge" element={<Challenge></Challenge>}></Route>
        <Route path="user" element={<User></User>}></Route>
        <Route path="question" element={<Question></Question>}></Route>
      </Routes>
    </>
  );
}
