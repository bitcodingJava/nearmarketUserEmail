import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUserFn } from "../../slice/authSlice";
import LoginModal from "./LoginModal";
import { API_URL } from "../../constans";

const loginData = {
  userEmail: "",
  userPw: "",
};

const Login = () => {
  const [login, setLogin] = useState(loginData);
  const [loginModal, setLoginModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);

  const loginChangeFn = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLogin({
      ...login,
      [name]: value,
    });
  };

  const loginFn = () => {
    const loginAxiosFn = async () => {
      try {
        const res = await axios.get(`${API_URL}/members`);
        const num = res.data.findIndex((el) => {
          return el.userEmail === login.userEmail && el.userPw === login.userPw;
        });

        if (num != -1) {
          dispatch(loginUserFn(res.data[num]));
          loginModalFn();
        } else {
          alert("로그인 실패! 다시 정보를 입력해주세요");
          return;
        }
      } catch (err) {
        alert(err);
      }
    };
    loginAxiosFn();
  };

  useEffect(() => {
    if (isLogin) {
      alert("로그아웃 후 이용가능합니다!!!");
      navigate("/main");
    }
  }, []);

  const loginModalFn = () => {
    setLoginModal(true);
  };

  return (
    <>
      <video autoPlay loop muted playsInline>
        <source src="/images/auth/video.mp4" type="video/mp4" />

      </video>
      {loginModal && <LoginModal setLoginModal={setLoginModal} />}
      <div className="login">
        <div className="login-con">
          <h1>로그인</h1>
          <ul>
            <li>
              <input
                type="text"
                name="userEmail"
                id="userEmail"
                placeholder="이메일"
                value={login.userEmail}
                onChange={loginChangeFn}
              />
            </li>
            <li>
              <input
                type="password"
                name="userPw"
                id="userPw"
                placeholder="비밀번호"
                value={login.userPw}
                onChange={loginChangeFn}
              />
            </li>
            <li>
              <button onClick={loginFn}>로그인</button>
              <button
                onClick={() => {
                  navigate("/auth/join");
                }}
              >
                회원가입
              </button>
              <button
                onClick={() => {
                  navigate("/main");
                }}
              >
                HOME
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Login;
