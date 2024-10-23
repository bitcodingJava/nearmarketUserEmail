import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DetailModal from "./DetailModal";
import { useDispatch, useSelector } from "react-redux";
import { addCart1 } from "../../slice/cartSlice1";
import { updateViewCountInServer } from "../../slice/viewcountSlice";
import { API_URL } from "../../constans";

const meatData = {
  id: 0,
  title: "",
  price: 0,
  img: "",
  description: "",
};

const OrderMeatDetail = (param) => {
  const navigate = useNavigate();
  const [meatItem, setMeatItem] = useState(meatData);
  const [count, setCount] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const [cartItem, setCartItem] = useState(null);

  const dispatch = useDispatch();

  // 사용자 이메일을 가져옵니다.
  const userEmail = useSelector((state) =>
    state.auth.isLogin ? state.auth.loginUser[0].userEmail : "guest"
  );

  // 상품 정보 가져오기
  useEffect(() => {
    const orderMeatDetailFn = async () => {
      const meatId = param.param.id;
      dispatch(
        updateViewCountInServer({ productId: meatId, category: "meat" })
      );
      try {
        const res = await axios.get(`${API_URL}/meatItems?id=${meatId}`);
        setMeatItem(res.data[0]);
      } catch (error) {
        alert(error);
      }
    };
    orderMeatDetailFn();
  }, [param.param.id, dispatch]); // 의존성 배열에 param.param.id 추가

  // 수량 증가
  const incrementFn = () => setCount(count + 1);

  // 수량 감소
  const decrementFn = () => setCount(count === 1 ? 1 : count - 1);

  const openCartModal = () => {
    const itemToCart = {
      id: meatItem.id,
      title: meatItem.title,
      price: meatItem.price,
      img: `/images/meat/${meatItem.img}`,
      count,
      category: "meat",
      userEmail,
    };
    setCartItem(itemToCart); // 모달에 전달할 장바구니 아이템 저장
    setIsModal(true); // 모달 열기
  };


  const paymentFn = () => {
    const meatCart = {
      id: meatItem.id,
      title: meatItem.title,
      price: meatItem.price,
      img: `/images/meat/${meatItem.img}`,
      count,
      userEmail,
      category: "meat",
    };
    dispatch(addCart1(meatCart))
    navigate("/order/payment")
  }


  return (
    <>
      {isModal && <DetailModal setIsModal={setIsModal} cartItem={cartItem} />}

      <div className="order-meat-detail">
        <div className="order-meat-detail-con">
          <div className="left">
            <div className="left-img">
              <img src={`/images/meat/${meatItem.img}`} alt={meatItem.img} />
            </div>
          </div>
          <div className="right">
            <div className="right-top">
              <ul>
                <div className="toptop">
                  <span>NM.K</span>
                  <span>조회수 {meatItem.viewcount} 회</span>
                </div>
                <li>
                  <h1>{meatItem.title}</h1>
                </li>
                <li>{meatItem.description}</li>
                <li>
                  <h1>{meatItem.price.toLocaleString()}원</h1>
                </li>
              </ul>
            </div>
            <div className="right-bottom">
              <div className="bottom">
                <div className="bottom-price">
                  <ul>
                    <li>{meatItem.title}</li>
                    <li>
                      <button onClick={incrementFn}>+</button>
                      <span>{count}</span>
                      <button onClick={decrementFn}>-</button>
                      <p>{(meatItem.price * count).toLocaleString()}원</p>
                    </li>
                  </ul>
                </div>
                <div className="bottom-payment">
                  <ul>
                    <li>
                      <p>합계</p>
                      <h1>{(meatItem.price * count).toLocaleString()}원</h1>
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

export default OrderMeatDetail;
