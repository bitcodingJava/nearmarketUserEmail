import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logOutFn } from "../../slice/authSlice";
import { deleteCartAll } from "../../slice/cartSlice1";
const LogoutModal = ({ setLogout }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeFn = () => {
    setLogout(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(deleteCartAll());
    dispatch(logOutFn());
    closeFn();
    navigate("/main");
  };

  return (
    <>
      <div className="logoutmodal" onClick={closeFn}>
        <div className="logoutmodal-con" onClick={(e) => e.stopPropagation()}>
          <p>
            로그아웃 합니다.
            <br />
            메인 페이지로 이동합니다.
          </p>
          <div className="button-con">
            <button onClick={handleLogout}>확인</button>
            <button onClick={closeFn}>취소</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
