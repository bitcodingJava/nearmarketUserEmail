import React from "react";
import MainHeader from "../components/main/MainHeader";
import { Outlet } from "react-router-dom";
import MainFooter from "../components/main/MainFooter";

const MainLayout = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
      <MainFooter />
    </>
  );
};

export default MainLayout;
