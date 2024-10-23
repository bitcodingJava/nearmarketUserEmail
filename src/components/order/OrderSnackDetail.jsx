import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart1 } from "../../slice/cartSlice1";
import { useNavigate } from "react-router-dom";
import DetailModal from "./DetailModal";
import { updateViewCountInServer } from "../../slice/viewcountSlice";
import { API_URL } from "../../constans";

const orderData = {
  id: "",
  title: "",
  price: 0,
  img: "",
  description: "",
};

const OrderSnackDetail = (param) => {
  const [snackItem, setSnackItem] = useState(orderData); // 상품 데이터
  const [snackCount, setSnackCount] = useState(1); // 수량
  const [isModal, setIsModal] = useState(false); // 모달 상태
  const [cartItem, setCartItem] = useState(null); // 모달로 전달할 장바구니 아이템

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 로그인한 유저 이메일 가져오기
  const userEmail = useSelector((state) =>
    state.auth.isLogin ? state.auth.loginUser[0].userEmail : "guest"
  );

  // 상품 정보 가져오기
  useEffect(() => {
    const orderDetailFn = async () => {
      const orderId = param.param.id;
      dispatch(
        updateViewCountInServer({ productId: orderId, category: "snack" })
      ); // 조회수 업데이트
      try {
        const res = await axios.get(`${API_URL}/snackItems?id=${orderId}`);
        setSnackItem(res.data[0]);
      } catch (err) {
        alert(err);
      }
    };
    orderDetailFn();
  }, [param.param.id, dispatch]);

  // 수량 증가 함수
  const incrementCount = () => {
    setSnackCount(snackCount + 1);
  };

  // 수량 감소 함수
  const decrementCount = () => {
    if (snackCount > 1) {
      setSnackCount(snackCount - 1);
    }
  };

  const openCartModal = () => {
    const itemToCart = {
      id: snackItem.id,
      title: snackItem.title,
      price: snackItem.price,
      img: `/images/ordersnack/${snackItem.img}`,
      count: snackCount,
      category: "snack",
      userEmail,
    };
    setCartItem(itemToCart);
    setIsModal(true);
  };


  const paymentFn = () => {
    const selectedProduct = {
      id: snackItem.id,
      title: snackItem.title,
      price: snackItem.price,
      img: `/images/ordersnack/${snackItem.img}`,
      count: snackCount,
      category: "snack",
      userEmail,
    };
    dispatch(addCart1(selectedProduct))
    navigate("/order/payment")
  }


  return (
    <>
      {isModal && <DetailModal setIsModal={setIsModal} cartItem={cartItem} />}

      <div className="order-snack-detail">
        <div className="order-snack-detail-con">
          <div className="left">
            <div className="left-img">
              <img
                src={`/images/ordersnack/${snackItem.img}`}
                alt={snackItem.title}
              />
            </div>
          </div>
          <div className="right">
            <div className="right-top">
              <ul>
                <li>NM.K</li>
                <li>
                  <span>조회수 {snackItem.viewcount}</span>
                </li>
                <li>
                  <h1>{snackItem.title}</h1>
                </li>
                <li>
                  <h1>{snackItem.price}원</h1>
                </li>
                <li>
                  <h3>상품설명:</h3>
                  <p>{snackItem.description}</p>
                </li>
              </ul>
            </div>
            <div className="right-bottom">
              <div className="bottom">
                <div className="bottom-price">
                  <ul>
                    <li>{snackItem.title}</li>
                    <li>
                      <button onClick={incrementCount}> + </button>
                      <span>{snackCount}</span>
                      <button onClick={decrementCount}> - </button>
                      <p>{snackItem.price * snackCount}원</p>
                    </li>
                  </ul>
                </div>
                <div className="bottom-payment">
                  <ul>
                    <li>
                      <p>합계</p>
                      <h1>{snackItem.price * snackCount}원</h1>
                    </li>
                    <hr />
                    <li>
                      <button onClick={() => navigate(-1)}>이전페이지</button>
                      <button onClick={openCartModal}>장바구니</button>

                      <button onClick={paymentFn}>결제</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSnackDetail;
