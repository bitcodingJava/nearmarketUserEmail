import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "../auth/LogoutModal";


const MainHeader = () => {
  const loginUser = useSelector((state) => state.auth.loginUser);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [logout, setLogout] = useState(false)


  const userRole = isLogin && loginUser.length > 0 ? loginUser[0].role : null;

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const logoutModalFn = () => {
    setLogout(true)
  }


  return (
    <>
      {logout && <LogoutModal setLogout={setLogout} />}
      <div className="main-header">
        <div className="nav">
          <h1 className="logo" onClick={() => {
            navigate("/main")
          }
          }>
            <span className="nm">NM</span>
            <span className="jum">.</span>
            <span className="k">K</span>
          </h1>
          <div className="gnb">
            <ul>
              <li>
                <Link k to={"/order/index"}>
                  쇼핑하기
                </Link>
              </li>
              <li>
                <Link to={"/order/api"}>
                  매장찾기
                </Link>
              </li>
              <li>
                {!isLogin ? (
                  <Link to={"/auth/login"}>로그인</Link>
                ) : (
                  <Link
                    onClick={() => {
                      // e.preventDefault();
                      // dispatch(logOutFn());
                      logoutModalFn()
                    }}
                  >
                    로그아웃
                  </Link>
                )}
              </li>
              <li>
                {!isLogin ? (
                  <Link to={"/auth/join"}>회원가입</Link>
                ) : (
                  <Link to={"/order/detail"}>{loginUser[0].userName}님</Link>
                )}
              </li>
              {isLogin && userRole === "ROLE_ADMIN" && (
                <li>
                  <Link to={`/admin`}>ADMIN</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader;