// ConfirmDeleteModal.js
import React from "react";
import "../css/cart/confirmDeleteModal.css";
const ConfirmDeleteModal = ({ item, onConfirm, onCancel }) => {
  return (
    <div className="confirm-delete-modal">
      <div className="confirm-delete-con">
        <h3>정말로 삭제하시겠습니까?</h3>
        <p>상품명: {item.title}</p>
        <button onClick={onConfirm}>확인</button>
        <button onClick={onCancel}>취소</button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
