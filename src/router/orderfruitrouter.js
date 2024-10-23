import { lazy, Suspense } from 'react';

const Loading = <div className="loading">Loading...</div>;
const OrderFruitPage= lazy (()=> import('../pages/order/OrderFruitPage'))
const OrderFruitDetailPage= lazy(()=>import('../pages/order/OrderFruitDetailPage'))
const CartListPage1 = lazy(()=>import('../pages/cart/CartListPage1'))

const orderfruitrouter = () => {
  return ([
    {
      path: '',
      element: <Suspense fallback={Loading}><OrderFruitPage /></Suspense>
    },
    {
      path:'detail/:id',
      element:<Suspense fallback={Loading}><OrderFruitDetailPage /></Suspense>
    },
    {
      path:'cart',
      element:<Suspense fallback={Loading}><CartListPage1 /></Suspense>
    }
    
    
  ])
}

export default orderfruitrouter
