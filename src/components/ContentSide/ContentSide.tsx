import { Route, Routes, useNavigate } from "react-router-dom";
import Challenge from "../Challenge/Challenge";
import Topic from "../Topic/Topic";
import User from "../User/User";
import Question from "../Quenstion/Question";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Dashboard from "../Dashboard/Dashboard";

export default function ContentSide() {
  const navigate = useNavigate();

  // const { isAuthenticated } = useAuth();
  // useEffect(() => {
  //   console.log(isAuthenticated);
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated]);

  return (
    <>
      <Routes>
        <Route path="home" element={<Dashboard></Dashboard>}></Route>
        <Route path="topic" element={<Topic></Topic>}></Route>
        <Route path="challenge" element={<Challenge></Challenge>}></Route>
        <Route path="user" element={<User></User>}></Route>
        <Route path="question" element={<Question></Question>}></Route>
      </Routes>
    </>
  );
}
