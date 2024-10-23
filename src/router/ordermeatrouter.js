import React, { lazy, Suspense } from 'react'
import OrderMeatDetailPage from '../pages/order/OrderMeatDetailPage';

const Loading = <div className="loading">Loading...</div>;
const OrderMeatPage= lazy (()=> import('../pages/order/OrderMeatPage'))

const ordermeatrouter = () => {
  return ([
      {
        path: '',
        element: <Suspense fallback={Loading}><OrderMeatPage /></Suspense>
      },
      {
        path: 'meatdetail/:id',
        element: <Suspense fallback={Loading}><OrderMeatDetailPage /></Suspense>
      }
    ]
  )
}

export default ordermeatrouter