import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
function layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default layout;
