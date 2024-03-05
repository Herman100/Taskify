import React from "react";
import { Menu } from "antd";
import {
  ScheduleOutlined,
  SpotifyOutlined,
  HomeOutlined,
  SettingOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { MdCreateNewFolder } from "react-icons/md";
import { ImOffice } from "react-icons/im";
import { MdOutlineBroadcastOnPersonal } from "react-icons/md";
import styles from "./styles/menulist.module.css";
import { Link, useNavigate } from "react-router-dom";

function MenuList({ theme }) {
  const navigate = useNavigate();
  const getItem = (label, key, icon, children) => {
    return {
      label: label,
      key: key,
      icon: icon,
      children: children,
    };
  };
  const menuItems = [
    getItem("Home", "/", <HomeOutlined />),
    getItem("Tasks", "sub1", <ScheduleOutlined />, [
      getItem("Create", "create", <MdCreateNewFolder />),
      getItem("Work", "work", <ImOffice />),
      getItem("Personal", "personal", <MdOutlineBroadcastOnPersonal />),
      getItem("Completed", "completed", <CheckOutlined />),
    ]),
    getItem("Spotify", "spotify", <SpotifyOutlined />),
    getItem("Settings", "settings", <SettingOutlined />),
  ];

  return (
    <>
      <Menu
        onClick={({ key }) => navigate(key)}
        theme={theme}
        items={menuItems}
        defaultSelectedKeys={["1"]}
        mode="inline"
        className={styles.menulist}
      />
    </>
  );
}

export default MenuList;
