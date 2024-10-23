import React from 'react'
import OrderMeatDetail from '../../components/order/OrderMeatDetail'
import { useParams } from 'react-router-dom'

const OrderMeatDetailPage = () => {
  const param = useParams()
  return (
    <>
      <OrderMeatDetail param={param}/>
    </>
  )
}

export default OrderMeatDetailPage