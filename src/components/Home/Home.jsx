import React from "react";
import { CheckSquareOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import styles from "./home.module.css";
import Footer from "../Footer/Footer";

function Dashboard({ theme }) {
  const { Content } = Layout;

  return (
    <div>
      <Layout className={styles.layout}>
        <Content className={styles.content} theme={theme}>
          <div>
            <h4>welcome to taskify</h4>
          </div>
          <div>
            <h1 className={styles.h1}>Time to get it Done!</h1>
          </div>
          <div>
            <CheckSquareOutlined className={styles.checked} />
            <CheckSquareOutlined className={styles.checked} />
            <CheckSquareOutlined className={styles.checked} />
          </div>
          <div>
            <p className={styles.quote}>
              “Mastery is not a function of genius or talent, it is a function
              of time and intense focus applied to a particular field of
              knowledge.” <strong>— Robert Greene</strong>
            </p>
          </div>
        </Content>
        <Footer />
      </Layout>
    </div>
  );
}

export default Dashboard;
