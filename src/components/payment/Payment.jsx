import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteCartAll } from "../../slice/cartSlice1";
import PaymentGoModal from "./PaymentGoModal";
import { API_URL } from "../../constans";

import PaymentApiModal from "./PaymentApiModal";
import PaymentSelectedModal from "./PaymentSelectedModal";

const payData = {
  paymentMethod: "",
  shopVal: "",
  orderMethod: "",
  addressMessage: "",
};

const Payment = () => {
  const paymentItems = useSelector((state) => state.cart.items);
  const loginUser = useSelector((state) => state.auth.loginUser);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const [onPayment, setOnPayment] = useState(payData);
  const [paymentGo, setPaymentGo] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedModal, setSelectedModal] = useState(false)

  //주문처 추가
  const [shop, setShop] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [selectedShop, setSelectedShop] = useState(null); // 선택된 주문처 정보


  const navigate = useNavigate();
  // const dispatch = useDispatch();



  let totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  useEffect(() => {
    if (!isLogin) {
      navigate("/auth/login");
    }
    else {
      fetchShop();
    }
  }, []);





  // 선택한 주문처 모달오픈
  const openModal = () => {
    const selectedShopInfo = shop.find((shopEl) => shopEl.title === onPayment.shopVal);
    if (selectedShopInfo) {
      setSelectedShop(selectedShopInfo);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (paymentItems && paymentItems.length > 0) {
      setSelectedItems(paymentItems);
    }
  }, [paymentItems]);


  //주문처추가
  const fetchShop = async () => {
    try {
      const res1 = await axios.get(`${API_URL}/api`);
      setShop(res1.data)
    }
    catch (err) {
      alert(err)
    }
  }

  // const paymentAxiosFn = async (e) => {
  //   try {
  //     const res = await axios.post(
  //       `${API_URL}/payment`,
  //       JSON.stringify(accoutData)
  //     );
  //     const resData = res.data;
  //   } catch (err) {
  //     alert(err);
  //   }
  // };



  const paymentAxiosFn = async () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}/${String(
      today.getMonth() + 1
    ).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")} ${String(
      today.getHours()
    ).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}:${String(
      today.getSeconds()
    ).padStart(2, "0")}`;

    const accoutData = {
      paymentMethod: onPayment.paymentMethod,
      shopVal: onPayment.shopVal,
      orderMethod: onPayment.orderMethod,
      addressMessage: onPayment.addressMessage,
      memberEmail: loginUser[0].userEmail,
      orderAddress: loginUser[0].address,
      paymentResult: selectedItems,
      paymentAmount: totalPrice,
      time: formattedDate,
    };

    try {
      await axios.post(`${API_URL}/payment`, accoutData);
      // dispatch(deleteCartAll());
      navigate("/order/detail");
    } catch (err) {
      alert("결제 처리 중 오류가 발생했습니다.");
    }
  };

  const paymentMethodFn = (e) => {
    const selectedPaymentMethod = e.target.options[e.target.selectedIndex].text;
    setOnPayment({ ...onPayment, paymentMethod: selectedPaymentMethod });
  };

  const shopValFn = (e) => {
    const selectedShopVal = e.target.options[e.target.selectedIndex].text;
    setOnPayment({ ...onPayment, shopVal: selectedShopVal });
  };

  const orderMethodFn = (e) => {
    const selectedOrderMethod = e.target.options[e.target.selectedIndex].text;
    setOnPayment({ ...onPayment, orderMethod: selectedOrderMethod });
  };

  const addressMessageFn = (e) => {
    const selectedAddressMessage =
      e.target.options[e.target.selectedIndex].text;
    setOnPayment({ ...onPayment, addressMessage: selectedAddressMessage });
  };


  const paymentSubmitFn = (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      setSelectedModal(true)
    } else {
      setPaymentGo(true);
    }
  };



  const handleItemCheck = (item) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((i) => i !== item)
        : [...prevSelectedItems, item]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === paymentItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paymentItems);
    }
  };






  const isPaymentReady = onPayment.paymentMethod && onPayment.shopVal && onPayment.orderMethod




  return (
    <>
      {paymentGo && <PaymentGoModal setPaymentGo={setPaymentGo} paymentAxiosFn={paymentAxiosFn} />}
      {selectedModal && <PaymentSelectedModal onclose={() => setSelectedModal(false)} />}
      <div className="payment">
        <h1>주문/결제</h1>
        <div className="payment-con">
          <div className="address">
            <h3>배송지정보</h3>
            <table>
              <thead>
                <tr>
                  <th>배송지명</th>
                  <th>주문자 이메일</th>
                  <th>받는분</th>
                  <th>연락처</th>
                  <th>주소</th>
                </tr>
              </thead>

              <tbody>
                {loginUser &&
                  loginUser.map((el, idx) => {
                    return (
                      <tr key={idx}>
                        <td>집</td>
                        <td>{el.userEmail}</td>
                        <td>{el.userName}</td>
                        <td>{el.phoneNumber}</td>
                        <td>{el.address}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="payment-item">
            <h3>배송상품</h3>
            <button onClick={handleSelectAll}>
              {selectedItems.length === paymentItems.length ? "전체 해제" : "전체 선택"}
            </button>
            <div className="payment-item-con">
              {paymentItems && paymentItems.map((el, idx) => {
                return (
                  <div className="payment-list" key={idx}>
                    <div className="top">
                      <input type="checkbox" checked={selectedItems.includes(el)} onChange={() => handleItemCheck(el)} />
                      <img src={el.img} alt={el.img} />
                    </div>
                    <div className="bottom">
                      <span>상품명: {el.title}</span>
                      <span>가격: {el.price.toLocaleString()}원</span>
                      <span>갯수: {el.count}</span>
                      <span>
                        총금액: {(el.count * el.price).toLocaleString()}원
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="payment-select">
            <h3>결제</h3>
            <div className="payment-slt">
              <div className="payment-slt-con">
                <ul>
                  <li>
                    결제 수단
                    <select
                    name="paymentMethod"
                    id="paymentMethod"
                    onChange={paymentMethodFn}
                  >
                    <option value="">결제수단</option>
                    <option value="credit-card">신용카드</option>
                    <option value="kakaopay">카카오페이</option>
                  </select>
                  </li>
                  <li>
                    주문처
                    <div className="payment-shop">
                      <select name="shopVal" id="shopVal" onChange={shopValFn}
                        className="payment-shop-list">
                        <option value="">주문처</option>
                        {shop.map((shopEl) => (
                          <option key={shopEl.id} value={shopEl.title}>
                            {shopEl.title}
                          </option>
                        ))}
                      </select>
                      <button onClick={openModal}>지도보기</button>
                    </div>
                  </li>
                  <li>
                    주문방식
                    <select
                      name="orderMethod"
                      id="orderMethod"
                      onChange={orderMethodFn}
                    >
                      <option value="">주문방식</option>
                      <option value="pick up">직접방문</option>
                      <option value="delivery">배달</option>
                      <option value="reservation"> 예약주문</option>
                    </select>
                  </li>
                  <li>
                    배송 메시지
                    <select
                      name="addressMessage"
                      id="addressMessage"
                      onChange={addressMessageFn}
                    >
                      <option value="">선택하기</option>
                      <option value="1">그냥 문 앞에 놓아 주시면 돼요.</option>
                      <option value="2">직접 받을게요.부재시 문앞</option>
                      <option value="3">벨을 누르지 말아주세요.</option>
                      <option value="4">
                        도착 후 전화주시면 직접 받으러 갈게요.
                      </option>
                    </select>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="payment-sub">
            <div className="sum-price">
              총합계: {totalPrice.toLocaleString()} 원
            </div>
            <div className="payment-result">
              <button onClick={paymentSubmitFn} disabled={!isPaymentReady} >결제하기</button>
            </div>
          </div>
        </div>
      </div>
      {/* 모달 창 추가*/}
      {isModalOpen && selectedShop && (
        <PaymentApiModal selectedShop={selectedShop} onClose={closeModal} />)}
    </>
  );
};

export default Payment;