import React from 'react'
import { useNavigate } from 'react-router-dom'

const JoinModal = () => {


    const navigate = useNavigate()

    return (
        <>
            <div className="joinmodal">
                <div className="joinmodal-con">
                    <p>회원가입이 완료되었습니다. <br /> 로그인 페이지로 이동합니다</p>
                    <button onClick={() => {
                        navigate('/auth/login')
                    }}>확인</button>

                </div>

            </div>
        </>
    )
}

export default JoinModal