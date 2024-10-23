import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div className="loadung">Loading...</div>;
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const JoinPage = lazy(() => import("../pages/auth/JoinPage"));
// const AuthDetailPage = lazy(()=> import('../pages/auth/AuthDetailPage'))

const authrouter = () => {
  return [
    {
      path: "",
      element: <Navigate replace to="login" />,
    },
    {
      path: "login",
      element: (
        <Suspense fallback={Loading}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: "join",
      element: (
        <Suspense fallback={Loading}>
          <JoinPage />
        </Suspense>
      ),
    },
  ];
};

export default authrouter;
