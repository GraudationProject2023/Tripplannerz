import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Button from "./items/Button";

export default {
  title: "LoginButton", // Story의 이름을 지정합니다.
  component: Button, // 해당 Story에서 사용할 컴포넌트를 지정합니다.
};

// 가짜 응답을 생성할 axios 인스턴스를 생성합니다..
const mock = new MockAdapter(axios);

// 가짜 응답 데이터를 정의합니다.
const successResponse = {
  status: 200,
  message: "Login successful",
  data: { username: "aaa", role: "user" },
};
const errorResponse = {
  status: 401,
  message: "Login failed. Invalid credentials.",
  data: null,
};

// POST 요청을 가로채서 가짜 응답을 반환합니다.
mock.onPost("/members/join").reply((config) => {
  const { username, password } = JSON.parse(config.data);

  // 여기에서 실제 로그인 로직을 구현하고 결과에 따라 가짜 응답을 반환합니다.
  if (username === "aaa" && password === "password") {
    return [200, successResponse];
  } else {
    return [401, errorResponse];
  }
});

// 스토리를 작성합니다.
export const Default = () => <Button onClick={handleLogin}>Login</Button>;

// 로그인 버튼의 클릭 핸들러 함수를 정의합니다.
const handleLogin = async () => {
  try {
    // 실제 로그인 요청이라고 가정합니다. axios.post를 호출합니다.
    const response = await axios.post("/members/join", {
      username: "aaa",
      password: "password",
    });

    console.log("Login Result:", response.data);
    // 서버로부터 응답을 받아 처리합니다.
  } catch (error) {
    console.error("Login Error:", error.response.data);
    // 에러를 처리합니다.
  }
};
