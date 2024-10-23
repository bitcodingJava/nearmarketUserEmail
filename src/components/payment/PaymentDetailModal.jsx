import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncAuthMemberFn, logOutFn } from '../../slice/authSlice'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../constans'

const PaymentDetailModal = ({ onClose }) => {

    const loginUser = useSelector((state) => state.auth.loginUser)
    const isLogin = useSelector((state) => state.auth.isLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userEmail, setUserEmail] = useState(loginUser[0].userEmail);
    const [userPw, setUserPw] = useState(loginUser[0].userPw);
    const [age, setAge] = useState(loginUser[0].age);
    const [userName, setUserName] = useState(loginUser[0].userName);
    const [address, setAddress] = useState(loginUser[0].address);
    const [phoneNumber, setPhoneNumber] = useState(loginUser[0].phoneNumber);
    const [role, setRole] = useState(loginUser[0].role);

    const userUpdate = async () => {
        try {
            if (userEmail === "") {
                alert("이메일을 입력해 주세요")
                return
            }
            if (userPw === "") {
                alert("비밀번호를 입력해 주세요")
                return
            }
            if (age === "") {
                alert("나이를 입력해 주세요")
                return
            }
            if (userName === "") {
                alert("이름을 입력해 주세요")
                return
            }
            if (address === "") {
                alert("주소를 입력해 주세요")
                return
            }
            if (phoneNumber === "") {
                alert("전화번호를 입력해 주세요")
                return
            }

            await axios.put(`${API_URL}/members/${loginUser[0].id}`, {
                userEmail,
                userPw,
                age,
                userName,
                address,
                phoneNumber,
                role
            })
            alert("내정보 수정 완료!")
            onClose()
            dispatch(asyncAuthMemberFn())


        } catch (err) {
            alert(err)
        }
    }


    const userDelete = async () => {
        const isConfirmed = window.confirm("정말 탈퇴하시겠습니까? 탈퇴하면 모든 정보가 사라집니다")
        if (isConfirmed) {
            try {
                await axios.delete(`${API_URL}/members/${loginUser[0].id}`)
                alert('회원 탈퇴 되었습니다')
                onClose()
                dispatch(asyncAuthMemberFn())
                dispatch(logOutFn())
                navigate("/")
            } catch (err) {
                alert(err)
            }
        } else {
            alert('삭제가 취소되었습니다')
        }
    }



    return (
        <>
            <div className="payment-detail-modal">
                <div className="payment-detail-modal-con">
                    <h3>내 정보 설정</h3>
                    <label>이메일</label>
                    <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <label>비밀번호</label>
                    <input
                        type="text"
                        value={userPw}
                        onChange={(e) => setUserPw(e.target.value)}
                    />
                    <label>나이</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <label>이름</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <label>주소</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <label>전화번호</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <label>권한</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="ROLE_MEMBER">ROLE_MEMBER</option>
                        <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                    </select>
                    <div className="buttons">
                        <button onClick={userUpdate}>수정</button>
                        <button onClick={userDelete}>회원 탈퇴</button>
                    </div>
                    <button className="close" onClick={onClose}>X</button>
                </div>
            </div>

        </>
    )
}

export default PaymentDetailModal