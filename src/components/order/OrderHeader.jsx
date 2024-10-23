import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutModal from "../auth/LogoutModal";

const OrderHeader = () => {
  const [isGnbVisible, setGnbVisible] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.length;
  const [logout, setLogout] = useState(false);

  const loginUser = useSelector((state) => state.auth.loginUser);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const userRole = isLogin && loginUser.length > 0 ? loginUser[0].role : null;

  const navigate = useNavigate();
  const location = useLocation();

  const toggleGnb = () => {
    setGnbVisible((prev) => !prev);
  };

  // GNB 열림 상태에 따른 스크롤 제어
  useEffect(() => {
    if (window.innerWidth <= 1030) {
      if (isGnbVisible) {
        document.body.style.overflow = "hidden"; // GNB가 열리면 스크롤 비활성화
      } else {
        document.body.style.overflow = "auto"; // GNB가 닫히면 스크롤 활성화
      }
    }

    return () => {
      document.body.style.overflow = "auto"; // 컴포넌트가 언마운트될 때 스크롤을 복원
    };
  }, [isGnbVisible]);

  const handleLinkClick = () => {
    if (window.innerWidth < 1030) {
      setGnbVisible(false); // GNB 숨기기
    }
  };

  const handleClickOutside = (e) => {
    // GNB 외부 클릭 시 GNB 숨기기
    const gnbElement = document.querySelector(".gnb");
    const buttonElement = document.querySelector(".button");
    if (window.innerWidth <= 1030) {
      if (
        gnbElement &&
        !gnbElement.contains(e.target) &&
        !buttonElement.contains(e.target)
      ) {
        setGnbVisible(false);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1030) {
        setGnbVisible(true); // 너비가 1030px 이상일 때 GNB 보이기
      }
      if (window.innerWidth <= 1030) {
        setGnbVisible(false); // 너비가 1030px 이상일 때 GNB 보이기
      }
    };

    handleResize(); // 초기 렌더링 시 호출
    window.addEventListener("resize", handleResize); // 이벤트 리스너 추가
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize); // 이벤트 리스너 정리
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const logoutModalFn = () => {
    setLogout(true);
  };

  return (
    <>
      {logout && <LogoutModal setLogout={setLogout} />}
      <div className="order-header">
        <div className="order-header-nav">
          <h1 className="logo" onClick={() => navigate("/main")}>
            <span className="nm">NM</span>
            <span className="jum">.</span>
            <span className="k">K</span>
          </h1>
          <div className={`gnb ${isGnbVisible ? "visible" : ""}`}>
            <ul>
              <li>
                <Link to={"/order/cart"} onClick={handleLinkClick}>
                  <img src="/images/orderheader/Ordercart.png" alt="cart" />
                  {cartItemCount > 0 && (
                    <span className="cart-badge">{cartItemCount}</span>
                  )}
                </Link>
              </li>
              <li
                style={{
                  backgroundColor:
                    location.pathname === "/order/index" ? "lightgray" : "",
                  borderRadius: "8px",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              >
                <Link to={"/order/index"} onClick={handleLinkClick}>
                  <img
                    src="/images/orderheader/best.png"
                    alt="vegetable"
                  />
                  추천
                </Link>
              </li>
              <li
                style={{
                  backgroundColor:
                    location.pathname === "/order/vegetable" ? "lightgray" : "",
                  borderRadius: "8px",
                  padding: "5px",
                  boxSizing: "border-box",
                }}
              >
                <Link to={"/order/vegetable"} onClick={handleLinkClick}>
                  <img
                    src="/images/orderheader/vegetable.png"
                    alt="vegetable"
                  />
                  채소
                </Link>
              </li>
              <li
                style={{
                  backgroundColor:
                    location.pathname === "/order/meat" ? "lightgray" : "",
                  borderRadius: "8px",
                  padding: "5px",
                  boxSizing: "border-box",
                }}
              >
                <Link to={"/order/meat"} onClick={handleLinkClick}>
                  <img src="/images/orderheader/meat.png" alt="meat" />
                  고기
                </Link>
              </li>
              <li
                style={{
                  backgroundColor:
                    location.pathname === "/order/fruit" ? "lightgray" : "",
                  borderRadius: "8px",
                  padding: "5px",
                  boxSizing: "border-box",
                }}
              >
                <Link to={"/order/fruit"} onClick={handleLinkClick}>
                  <img src="/images/orderheader/fruit.png" alt="fruit" />
                  과일
                </Link>
              </li>
              <li
                style={{
                  backgroundColor:
                    location.pathname === "/order/snack" ? "lightgray" : "",
                  borderRadius: "8px",
                  padding: "5px",
                  boxSizing: "border-box",
                }}
              >
                <Link to={"/order/snack"} onClick={handleLinkClick}>
                  <img src="/images/orderheader/snack.png" alt="snack" />
                  과자
                </Link>
              </li>

              <li>
                {!isLogin ? (
                  <Link to={"/auth/login"}>로그인</Link>
                ) : (
                  <Link onClick={logoutModalFn}>로그아웃</Link>
                )}
              </li>
              <li>
                {!isLogin ? (
                  <Link to={"/auth/join"}>회원가입</Link>
                ) : (
                  <Link to={"/order/detail"} onClick={handleLinkClick}>
                    {loginUser[0].userName}님
                  </Link>
                )}
              </li>
              {isLogin && userRole === "ROLE_ADMIN" && (
                <li>
                  <Link to={`/admin`}>ADMIN</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="button" onClick={toggleGnb}>
            =
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHeader;
