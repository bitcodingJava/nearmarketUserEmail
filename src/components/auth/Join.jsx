import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import JoinModal from './JoinModal'
import { API_URL } from '../../constans'

const joinData = {
    userEmail: "",
    userPw: "",
    age: "",
    userName: "",
    address: "",
    phoneNumber: "",
    role: "ROLE_MEMBER"
}

const Join = () => {

    const [join, setJoin] = useState(joinData)
    const [isEmailCheck, setIsEmailCheck] = useState(false)
    const [isEmail, setIsEmail] = useState(false)
    const [joinModal, setJoinModal] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)
    const navigate = useNavigate()


    const joinChangeFn = (e) => {
        const name = e.target.name
        const value = e.target.value
        setJoin({
            ...join,
            [name]: value
        })
        if (name === 'userEmail') {
            setIsEmailCheck(false)
        }
    }


    const checkEmailFn = async () => {
        try {
            const res = await axios.get(`${API_URL}/members`)
            const num = res.data.findIndex(el => {
                return el.userEmail === join.userEmail
            })
            if (num != -1) {
                alert("중복된 이메일입니다! 다른 이메일로 작성해주세요")
                setIsEmail(false)
            } else {
                alert("사용 가능한 이메일입니다")
                setIsEmail(true)
            }
            setIsEmailCheck(true)
        } catch (err) {
            alert(err)
        }
    }


    useEffect(() => {
        const isValid = join.userEmail && join.userPw && join.age && join.userName && join.address && join.phoneNumber;
        setIsFormValid(isValid);
    }, [join]);



    // const joinFn =async()=>{

    //     const joinAxiosFn =async (e)=>{
    //         const res =await axios.get(`http://localhost:3001/members`)
    //         const num = res.data.findIndex(el=>{
    //             return el.userEmail === join.userEmail
    //         })
    //         if(num != -1){  
    //             alert("중복이메일 입니다! 다른 이메일로 작성해주세요")
    //             return
    //         }


    //         const joinOk = await axios.post(`http://localhost:3001/members`,join)
    //         alert("회원가입 성공! 로그인페이지로 이동합니다")
    //         navigate(`/auth/login`)
    //     }
    //     joinAxiosFn()

    // }

    const joinFn = async () => {
        if (!isEmailCheck || !isEmail) {
            alert("이메일 중복 확인을 완료해주세요")
            return
        }
        try {
            const joinOk = await axios.post(`http://localhost:3001/members`, join)


        } catch (err) {
            alert(err)
        }

    }


    const joinModalFn = () => {
        setJoinModal(true)
    }




    return (
        <>
            {joinModal && <JoinModal setJoinModal={setJoinModal} />}
            <div className="join">
                <div className="join-con">
                    <h1>회원가입</h1>
                    <ul>
                        <li>
                            <input type="text" name="userEmail" id="userEmail" placeholder='이메일'
                                value={join.userEmail}
                                onChange={joinChangeFn} />
                            <button onClick={checkEmailFn}>이메일 중복 확인</button>
                        </li>
                        <li>
                            <input type="password" name="userPw" id="userPw" placeholder='비밀번호'
                                value={join.userPw}
                                onChange={joinChangeFn} />
                        </li>
                        <li>
                            <input type="text" name="age" id="age" placeholder='나이'
                                value={join.age}
                                onChange={joinChangeFn} />
                        </li>
                        <li>
                            <input type="text" name="userName" id="userName" placeholder='이름'
                                value={join.userName}
                                onChange={joinChangeFn} />
                        </li>
                        <li>
                            <input type="text" name="address" id="address" placeholder='주소'
                                value={join.address}
                                onChange={joinChangeFn} />
                        </li>
                        <li>
                            <input type="text" name="phoneNumber" id="phoneNumber" placeholder='핸드폰번호'
                                value={join.phoneNumber}
                                onChange={joinChangeFn} />
                        </li>
                        {/* <li>
                            <select name="role" id="role" value={join.role}
                                onChange={joinChangeFn}>
                                <option value="ROLE_MEMBER">MEMBER</option>
                                <option value="ROLE_ADMIN">ADMIN</option>
                            </select>
                        </li> */}
                        <li>
                            <button onClick={joinFn} onClickCapture={joinModalFn} disabled={!isEmailCheck || !isEmail || !isFormValid}>회원가입</button>
                            <button onClick={() => {
                                navigate('/auth/login')
                            }}>로그인</button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Join