import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminIndex = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className="admin-index">
        <div className="admin-index-con">
          <ul>
            <li onClick={()=>{navigate('/admin/members')}}><p>회원정보</p></li>
            <li onClick={()=>{navigate('/admin/best')}}><p>베스트코너</p></li>
            <li onClick={()=>{navigate('/admin/vegetable')}}><p>채소코너</p></li>
            <li onClick={()=>{navigate('/admin/meat')}}><p>고기코너</p></li>
            <li onClick={()=>{navigate('/admin/fruit')}}><p>과일코너</p></li>
            <li onClick={()=>{navigate('/admin/snack')}}><p>과자코너</p></li>
            <li onClick={()=>{navigate('/admin/cart')}}><p>장바구니</p></li>
            <li onClick={()=>{navigate('/admin/produtcsInsert')}}><p>상품등록</p></li>
            <li onClick={()=>{navigate('/admin/shop')}}><p>주문처 관리</p></li>
            <li onClick={()=>{navigate('/admin/payment')}}><p>결제 관리</p></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default AdminIndex