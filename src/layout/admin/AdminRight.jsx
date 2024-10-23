import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import LogoutModal from "../../components/auth/LogoutModal";

const AdminRight = () => {
  const loginUser = useSelector((state) => state.auth.loginUser);
  const [logout, setLogout] = useState(false);

  const navigate = useNavigate();
  // const dispatch = useDispatch()

  const logoutModalFn = () => {
    setLogout(true);
  };

  return (
    <>
      {logout && <LogoutModal setLogout={setLogout} />}
      <div className="admin-right">
        <div className="admin-right-con">
          <div className="admin-right-header">
            <p>{loginUser[0].userName} 님</p>
            <ul>
              <li
                onClick={() => {
                  navigate("/order/detail");
                }}
              >
                내정보
              </li>
              <li
                onClick={() => {
                  // e.preventDefault()
                  // dispatch(logOutFn())
                  // alert('로그아웃 성공! 메인화면으로 이동합니다.')
                  // navigate('/')
                  logoutModalFn();
                }}
              >
                LOGOUT
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminRight;
