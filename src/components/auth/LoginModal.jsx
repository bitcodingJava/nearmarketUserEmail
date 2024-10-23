import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginModal = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className="loginmodal">
                <div className="loginmodal-con">
                    <p>로그인 성공! <br /> 메인페이지로 이동합니다</p>
                    <button onClick={() => {
                        navigate('/main')
                    }}>확인</button>
                </div>
            </div>
        </>
    )
}

export default LoginModal