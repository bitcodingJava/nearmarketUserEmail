import React from 'react';

const ConfirmModal = ({ message, onConfirm, onCancel, confirmOnly = false }) => {
  return (
    <div className="confirm-modal">
      <div className="confirm-modal-con">
        <p>{message}</p>
        <div className="btn-con">
          <button onClick={onConfirm} className="confirm-btn">확인</button>
           {/* confirmOnly가 true면 취소 버튼 숨김 / 기본값 false 취소 버튼 보임 */}
          {!confirmOnly && <button onClick={onCancel} className="cancel-btn">취소</button>}
          
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

