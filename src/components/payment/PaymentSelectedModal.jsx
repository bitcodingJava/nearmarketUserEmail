import React from 'react'

const PaymentSelectedModal = ({ onclose }) => {
    return (
        <div className="payment-selected-modal">
            <div className="payment-selected-modal-con">
                <p>상품을 선택해주세요.</p>
                <button onClick={onclose}>확인</button>
            </div>
        </div>
    )
}

export default PaymentSelectedModal