import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }:any) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
