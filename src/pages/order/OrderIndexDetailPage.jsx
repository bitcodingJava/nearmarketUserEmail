import React from 'react'
import OrderIndexDetail from '../../components/order/OrderIndexDetail'
import { useParams } from 'react-router-dom'

const OrderIndexPage = () => {
  const param = useParams()
  return (
    <>
    <OrderIndexDetail param={param}/>
    </>
  )
}

export default OrderIndexPage