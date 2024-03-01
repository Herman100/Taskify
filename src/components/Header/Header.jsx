import { Layout, Switch, theme } from "antd";
import { SunOutlined, MoonFilled } from "@ant-design/icons";
import { useState, useEffect } from "react"; // import useEffect
import Avatar from "./Avatar";
import Logo from "./Logo";
import MenuList from "./MenuList";
import styles from "./styles/header.module.css";
import Logout from "../UserAuth/Logout";
const { Sider } = Layout;

function Header() {
  const [toggleTheme, setToggleTheme] = useState("dark");
  const [collapsed, setCollapsed] = useState(true);

  const changeTheme = (value) => {
    setToggleTheme(value ? "dark" : "light");
  };
  return (
    <>
      <Sider
        className={styles.sider}
        theme={toggleTheme}
        // collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Logo theme={toggleTheme} collapsed={collapsed} />
        <MenuList theme={toggleTheme} />
        {/* <Avatar collapsed={collapsed} theme={toggleTheme} /> */}
        <Logout collapsed={collapsed} theme={toggleTheme} />
        <Switch
          checkedChildren={<MoonFilled className={styles.moon} />}
          unCheckedChildren={<SunOutlined />}
          defaultChecked
          onChange={changeTheme}
          className={styles.switch}
        />
      </Sider>
    </>
  );
}

export default Header;
