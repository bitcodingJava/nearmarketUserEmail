import React from "react";
import { useDispatch } from "react-redux";
import { addCart1 } from "../../slice/cartSlice1";
import { useNavigate } from "react-router-dom";

const DetailModal = ({ setIsModal, cartItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModal(false);
  };

  const moveToCart = () => {
    if (cartItem) {
      dispatch(addCart1(cartItem));
    }
    navigate("/order/cart");
    closeModal();
  };

  const continueShopping = () => {
    if (cartItem) {
      dispatch(addCart1(cartItem));
    }
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-con">
        <div className="modal-top">
          <span>알림</span>
          <span className="close" onClick={closeModal}>
            Ⅹ
          </span>
        </div>
        <div className="modal-body">
          <p>장바구니에 추가했습니다.</p>
          <ul>
            <li onClick={continueShopping}>계속 쇼핑하기</li>
            <li onClick={moveToCart}>장바구니로 이동하기</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
