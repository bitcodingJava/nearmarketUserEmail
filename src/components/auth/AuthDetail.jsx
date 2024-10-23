import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const AuthDetail = () => {

    
    const loginUser =useSelector((state)=>state.auth.loginUser)
    const isLogin =useSelector((state)=>state.auth.isLogin)

     

    const navigate=useNavigate()

    useEffect(()=>{

    },[loginUser])

    if(!isLogin){
        return <div>로그인 되지 않았습니다. 로그인 후 다시 시도하세요.</div>
    }

  



  return (
    <div className="authDetail">
    <div className="authDetail-con">
        <h1>내 정보</h1>
        <ul>
            {loginUser.map((el, idx) => (
                <li key={idx}>
                    <div>이메일: {el.userEmail}</div>
                    <div>이름: {el.userName}</div>
                    <div>나이: {el.age}</div>
                    <div>주소: {el.address}</div>
                    <div>핸드폰번호: {el.phoneNumber}</div>
                    <div>권한: {el.role}</div>
                </li>
            ))}
        </ul>
        <button>내 정보 수정</button>
        <button onClick={()=>{
            navigate('/')
        }}>HOME</button>
    </div>
</div>
  )
}

export default AuthDetail