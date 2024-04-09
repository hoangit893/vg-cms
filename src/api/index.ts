import axios from "axios";
import { apiElement } from "./core";

export const setAccessToken = (token: string) => {
  token = `Bearer ${token}`;
  localStorage.setItem("AccessToken", token);
  console.log("token", localStorage.getItem("AccessToken"));
  axios.defaults.headers.Authorization = token;
};
export const getAccessToken = () => {
  const token = localStorage.getItem("AccessToken");
  axios.defaults.headers.Authorization = token;
  return { token };
};

const api = {
  register: apiElement("POST", "/user/create"),
  login: apiElement("POST", "/user/login"),
  getTopic: apiElement("GET", "/topic"),
  getChallengeList: apiElement("GET", "/challenge"),
  createChallenge: apiElement("POST", "/challenge/create"),
  updateChallenge: apiElement("PUT", "/challenge/update"),
  deleteChallenge: apiElement("DELETE", "/challenge/delete"),
  createTopic: apiElement("POST", "/topic/create"),
  updateTopic: apiElement("PUT", "/topic/update"),
  deleteTopic: apiElement("DELETE", "/topic/delete"),
  getQuestionList: apiElement("GET", "/question"),
  createQuestion: apiElement("POST", "/question/create"),
  updateQuestion: apiElement("PUT", "/question/update"),
  deleteQuestion: apiElement("DELETE", "/question/delete"),
  auth: apiElement("GET", "/user/auth"),
};

export default api;
