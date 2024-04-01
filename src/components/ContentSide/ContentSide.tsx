import { Route, Routes } from "react-router-dom";
import Challenge from "../Challenge/Challenge";
import Topic from "../Topic/Topic";
import User from "../User/User";
import Question from "../Quenstion/Question";

export default function ContentSide() {
  return (
    <>
      <Routes>
        <Route path="topic" element={<Topic></Topic>}></Route>
        <Route path="challenge" element={<Challenge></Challenge>}></Route>
        <Route path="user" element={<User></User>}></Route>
        <Route path="question" element={<Question></Question>}></Route>
      </Routes>
    </>
  );
}
