import React from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "./index.css";

function AppLayout() {
  return (
    <>
      <Layout id="layout">
        <Header className="header" />
        <Layout className="outlet">
          <Outlet />
        </Layout>
      </Layout>
    </>
  );
}

export default AppLayout;
