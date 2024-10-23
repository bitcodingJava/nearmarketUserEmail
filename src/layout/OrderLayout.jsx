import React from "react";
import OrderHeader from "../components/order/OrderHeader";
import OrderFooter from "../components/order/OrderFooter";
import { Outlet } from "react-router-dom";

const OrderLayout = () => {
  return (
    <>
      <OrderHeader />
      <Outlet />
      <OrderFooter />
    </>
  );
};

export default OrderLayout;
