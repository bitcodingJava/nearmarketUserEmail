import React from 'react';
import OrderFruitDetail from '../../components/order/OrderFruitDetail';
import { useParams } from 'react-router-dom';

const OrderFruitDetailPage = () => {
  const param = useParams(); 
  return (
    <>
      <OrderFruitDetail param={param} />
    </>
  );
}

export default OrderFruitDetailPage;
