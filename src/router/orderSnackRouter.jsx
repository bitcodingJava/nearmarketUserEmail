import React, { lazy, Suspense } from "react";

const Loading = <div className="loading">Loading...</div>;
const OrderSnackPage = lazy(() => import("../pages/order/OrderSnackPage"));
const OrderSnackDetail = lazy(() =>
  import("../pages/order/OrderSnackDetailPage")
);
const CartListPage = lazy(() => import("../pages/cart/CartListPage1"));

const orderSnackRouter = () => {
  return [
    {
      path: "", // 기본 경로
      element: (
        <Suspense fallback={Loading}>
          <OrderSnackPage />
        </Suspense>
      ),
    },
    {
      path: "detail/:id", // 상대 경로로 수정
      element: (
        <Suspense fallback={Loading}>
          <OrderSnackDetail />
        </Suspense>
      ),
    },
    {
      path: "cart", //  /order/snack/cart
      element: (
        <Suspense fallback={Loading}>
          <CartListPage />
        </Suspense>
      ),
    },
  ];
};

export default orderSnackRouter;
