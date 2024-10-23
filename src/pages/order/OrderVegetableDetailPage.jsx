import React from 'react'
import OrderVegetableDetail from '../../components/order/OrderVegetableDetail'
import { useParams } from 'react-router-dom'

const OrderVegetableDetailPage = () => {

    const param =useParams()

  return (
    <>
    <OrderVegetableDetail param={param} />
    </>
  )
}

export default OrderVegetableDetailPage