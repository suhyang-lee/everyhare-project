import React from "react";
import { SnippetsOutlined } from "@ant-design/icons";
import styles from "./transaction.module.scss";

const NoneProduct = () => {
  return (
    <div className={styles.none}>
      <SnippetsOutlined className={styles.icon} /> 대여 물품이 없습니다
    </div>
  );
};

export default NoneProduct;
