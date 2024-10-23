import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncPaymentFn } from "../../slice/paymentSlice";
import PaymentDetailModal from "./PaymentDetailModal";

const Paymenlietail = () => {
  const loginUser = useSelector((state) => state.auth.loginUser);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const paymentInformation = useSelector((state) => state.payment.paymentInformation);
  //   console.log(paymentInformation, "s");
  const [paymentModal, setPaymentModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPaymentFn());
  }, []);

  if (!isLogin) {
    return <div className="notLogIn"><p>로그인 되지 않았습니다.<br/> 로그인 후 다시 시도하세요.</p></div>;
  }

  const paymentModalFn = (e) => {
    setPaymentModal(true)
  }

  const closePaymentModalFn = (e) => {
    setPaymentModal(false)
  }


  return (

    <div className="paymentDetail">
      <div className="paymentDetail-con">
        <h2>내 정보</h2>
        <div className="myinfo">
          <div className="myinfo-con">
            <ul>
              {loginUser.map((el, idx) => (
                <li key={idx}>
                  <li>이메일: {el.userEmail}</li>
                  <li>이름: {el.userName}</li>
                  <li>나이: {el.age}</li>
                  <li>주소: {el.address}</li>
                  <li>핸드폰번호: {el.phoneNumber}</li>
                  <li>권한: {el.role}</li>
                </li>
              ))}
              <button onClick={paymentModalFn}>내 정보 수정</button>
            </ul>
            <div className="my-image">
              <img src="/images/payment/profile.jpg.png" alt="프로필 이미지" />
            </div>
          </div>
        </div>
        <div className="paymentlist">
          <h2>주문/배송 조회</h2>
          <div className="paymentlist-con">
            {paymentInformation && paymentInformation.length > 0 ? (
              paymentInformation
                .filter((el) => el.memberEmail === loginUser[0].userEmail)
                .map((el, idx) => (
                  <div key={idx} className="payment-section">
                    <h3 className="order-time">{el.time}</h3>
                    <ul>
                      {el.paymentResult.map((el2, idx2) => (
                        <li key={idx2} className="order-item">
                          <div>
                            <img src={el2.img} alt={el2.img} />
                          </div>
                          <div>{el2.title}</div>
                          <div>수량: {el2.count}개</div>
                        </li>
                      ))}
                    </ul>
                    <div className="order-summary">
                      <p>총 금액: {el.paymentAmount.toLocaleString()}원</p>
                      <p>거래처: {el.shopVal}</p>
                      <p>주문방법: {el.orderMethod}</p>
                      <p>배송지: {el.orderAddress}</p>
                      <p>{el.addressMessage}</p>
                    </div>
                  </div>
                ))
            ) : (
              <div className="nopayment">주문내역이 없습니다</div>
            )}
          </div>
        </div>
      </div>
      {paymentModal && <PaymentDetailModal onClose={closePaymentModalFn} />}
    </div>
  );
};

export default Paymenlietail;

