import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCartAll } from '../../slice/cartSlice1'


const PaymentGoModal = ({ setPaymentGo, paymentAxiosFn }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const closeFn = () => {
        setPaymentGo(false)
    }


    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            await paymentAxiosFn();
            dispatch(deleteCartAll())
            closeFn()
            navigate("/order/detail")
        } catch (err) {
            alert(err)
        }
    }

    return (
        <>
            <div className="payment-go-modal" onClick={closeFn}>
                <div className="payment-go-modal-con" onClick={(e) => e.stopPropagation()}>
                    <p>결제하시겠습니까? </p>
                    <div className="button-con">
                        <button onClick={handlePayment}>확인</button>
                        <button onClick={closeFn}>취소</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentGoModal