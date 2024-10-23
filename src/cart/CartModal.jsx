import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartItem } from "../slice/cartSlice1";
import "../css/cart/cartModal.css";

const CartModal = ({ item, setIsModalOpen }) => {
  const [itemCount, setItemCount] = useState(item.count);
  const dispatch = useDispatch();

  useEffect(() => {
    if (item) {
      setItemCount(item.count);
    }
  }, [item]);

  const closeFn = () => {
    setIsModalOpen(false);
  };

  const incrementFn = () => {
    setItemCount(itemCount + 1);
  };

  const decrementFn = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  const addCartFn = () => {
    const updatedItem = {
      id: item.id,
      title: item.title,
      price: item.price,
      img: item.img,
      count: itemCount,
      category: item.category,
      userEmail: item.userEmail,
    };
    dispatch(updateCartItem(updatedItem));
    closeFn();
  };
  return (
    <div className="cart-modal">
      <div className="cart-modal-con">
        <div className="cart-top">
          <img src={item.img} alt={item.title} />
        </div>

        <div className="cart-title-bottom">
          <span>상품명: {item.title}</span>
          <span>가격: {item.price.toLocaleString()}원</span>
        </div>

        <div className="cart-sum">
          <div className="cart-count-wrapper">
            <button onClick={decrementFn}>-</button>
            <span className="cart-count">{itemCount}</span>
            <button onClick={incrementFn}>+</button>
          </div>

          <span className="cart-sum-price">
            총합계: {(item.price * itemCount).toLocaleString()} 원
          </span>

          <button onClick={addCartFn} className="cart-update-btn">
            장바구니 업데이트
          </button>
          <button className="cart-close" onClick={closeFn}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
