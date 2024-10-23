import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart1 } from "../../slice/cartSlice1";
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

const OrderFruitDetail = (param) => {
  const navigate = useNavigate();
  const [fruitDetail, setFruitDetail] = useState(orderData);
  const [count, setCount] = useState(1);
  const [isPremium, setIsPremium] = useState(false);
  const [isOrganic, setIsOrganic] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [cartItem, setCartItem] = useState(null);

  const dispatch = useDispatch();

  // 사용자 이메일을 가져옵니다.
  const userEmail = useSelector((state) =>
    state.auth.isLogin ? state.auth.loginUser[0].userEmail : "guest"
  );
  console.log(userEmail);

  useEffect(() => {
    const fetchFruitDetail = async () => {
      const fruitId = param.param.id;
      dispatch(
        updateViewCountInServer({ productId: fruitId, category: "fruit" })
      );
      try {
        const res = await axios.get(`${API_URL}/fruitItems/${fruitId}`);
        setFruitDetail(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchFruitDetail();
  }, [param.param.id]);

  const fruitIncrementFn = () => setCount(count + 1);

  const fruitDecrementFn = () => {
    count <= 1 ? setCount(1) : setCount(count - 1);
  };

  const calculateTotalPrice = () => {
    let additionalPrice = 0;
    if (isPremium) additionalPrice += 3000 * count; // 프리미엄 옵션 추가
    if (isOrganic) additionalPrice += 2000 * count; // 유기농 옵션 추가
    return fruitDetail.price * count + additionalPrice;
  };

  const openCartModal = () => {
    if (fruitDetail) {
      const itemToCart = {
        id: fruitDetail.id,
        img: `/images/fruit/${fruitDetail.img}`,
        title: fruitDetail.title,
        price:
          fruitDetail.price + (isPremium ? 3000 : 0) + (isOrganic ? 2000 : 0),
        count,
        category: "fruit",
        userEmail,
      };
      setCartItem(itemToCart); // 모달에 전달할 장바구니 아이템 저장
      setIsModal(true); // 모달 열기
    }
  };

  const paymentFn = () => {
    const fruitCart = {
      id: fruitDetail.id,
      title: fruitDetail.title,
      price:
        fruitDetail.price + (isPremium ? 3000 : 0) + (isOrganic ? 2000 : 0),
      img: `/images/fruit/${fruitDetail.img}`,
      count,
      userEmail,
      category: "fruit"
    };
    dispatch(addCart1(fruitCart))
    navigate("/order/payment")
  }



  return (
    <div className="fruit-detail">
      {isModal && <DetailModal setIsModal={setIsModal} cartItem={cartItem} />}
      <div className="fruit-detail-con">
        <div className="fruit-detail-left">
          <div className="fruit-detail-left-img">
            <img
              src={`/images/fruit/${fruitDetail.img}`}
              alt={fruitDetail.title}
            />
          </div>
        </div>
        <div className="fruit-detail-right">
          <ul>
            <li>
              <h2>{fruitDetail.title}</h2>
            </li>
            <li>
              <span>조회수 {fruitDetail.viewcount}</span>
            </li>
            <li>{fruitDetail.description}</li>
            <li>{calculateTotalPrice().toLocaleString()}원</li>
            <li>
             <div className="pmbtn">
              <button onClick={fruitIncrementFn}>+</button>
              <span>{count}</span>
              <button onClick={fruitDecrementFn}>-</button>
              </div>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={isPremium}
                  onChange={(e) => setIsPremium(e.target.checked)}
                />
                프리미엄 {fruitDetail.title} (3,000원 추가)
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={isOrganic}
                  onChange={(e) => setIsOrganic(e.target.checked)}
                />
                유기농 {fruitDetail.title} (2,000원 추가)
              </label>
            </li>
          </ul>
          <div className="order-go">
            <button onClick={() => navigate(-1)}>이전페이지</button>
            <button onClick={openCartModal}>장바구니</button> {/* 모달 열기 */}
            <button onClick={paymentFn}>결제</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFruitDetail;
