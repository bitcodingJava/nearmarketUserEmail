import { lazy, Suspense } from "react";

const Loading = <div className="loading">Loading...</div>;
const OrderVegetablePage = lazy(()=> import('../pages/order/OrderVegetablePage'))
const OrderVegetableDetailPage= lazy(()=>import('../pages/order/OrderVegetableDetailPage'))

const ordervegetablerouter = () => {
  return [
      {
        path: '',
        element: <Suspense fallback={Loading}><OrderVegetablePage /></Suspense>
      },
      {
        path:'detail/:id',
        element:<Suspense fallback={Loading}><OrderVegetableDetailPage /></Suspense>
      }

    ]
  
}

export default ordervegetablerouter