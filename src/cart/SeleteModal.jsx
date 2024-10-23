import React from "react";
import "../css/cart/selectDeleteModal.css";

const SelectDeleteModal = ({ items, onConfirm, onCancel }) => (
  <div className="select-delete-modal">
    <div className="select-delete-con">
      <h3>선택된 상품 목록를 삭제하시겠습니까?</h3>
      {items.length > 0 ? (
        <ul>
          {items.map((item, idx) => (
            <li key={item.id}>
              {idx + 1}. {item.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>선택된 상품이 없습니다.</p>
      )}
      <div className="modal-buttons">
        <button onClick={onConfirm}>확인</button>
        <button onClick={onCancel}>취소</button>
      </div>
    </div>
  </div>
);

export default SelectDeleteModal;
