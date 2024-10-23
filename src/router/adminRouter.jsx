import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
const Loading = <div className="loading">Loading...</div>
const AdminIndexPage = lazy(()=> import('../pages/admin/AdminIndexPage'))
const AdminMemberPage = lazy(()=> import('../pages/admin/AdminMemberPage'))
const AdminProductsInsertPage = lazy(()=> import('../pages/admin/AdminProductsInsertPage'))
const AdminVegetablePage = lazy(()=> import('../pages/admin/AdminVegetablePage'))
const AdminMeatPage = lazy(()=> import('../pages/admin/AdminMeatPage'))
const AdminFruitPage = lazy(()=> import('../pages/admin/AdminFruitPage'))
const AdminSnackPage = lazy(()=> import('../pages/admin/AdminSnackPage'))
const AdminCartPage = lazy(()=> import('../pages/admin/AdminCartPage'))
const AdminShopPage = lazy(()=> import('../pages/admin/AdminShopPage'))
const AdminPaymentPage = lazy(()=> import('../pages/admin/AdminPaymentPage'))
const AdminBestPage = lazy(()=> import('../pages/admin/AdminBestPage'))


const adminRouter = () => {
  return (
    [
      {
        path: '',
        element: <Navigate replace to='index' />
      },
      {
        path: 'index',
        element: <Suspense fallback={Loading}><AdminIndexPage /></Suspense>
      },
      {
        path:'best',
        element: <Suspense fallback={Loading}><AdminBestPage /></Suspense>
      },
      {
        path: 'members',
        element: <Suspense fallback={Loading}><AdminMemberPage /></Suspense>
      },
      {
        path: 'vegetable',
        element: <Suspense fallback={Loading}><AdminVegetablePage /></Suspense>
      },
      {
        path: 'meat',
        element: <Suspense fallback={Loading}><AdminMeatPage /></Suspense>
      },
      {
        path: 'fruit',
        element: <Suspense fallback={Loading}><AdminFruitPage /></Suspense>
      },
      {
        path: 'snack',
        element: <Suspense fallback={Loading}><AdminSnackPage /></Suspense>
      },
      {
        path: 'produtcsInsert',
        element: <Suspense fallback={Loading}><AdminProductsInsertPage /></Suspense>
      },
      {
        path: 'cart',
        element: <Suspense fallback={Loading}><AdminCartPage /></Suspense>
      },
      {
        path: 'shop',
        element: <Suspense fallback={Loading}><AdminShopPage /></Suspense>
      },
      {
        path: 'payment',
        element: <Suspense fallback={Loading}><AdminPaymentPage /></Suspense>
      }
    ]
  )
}

export default adminRouter