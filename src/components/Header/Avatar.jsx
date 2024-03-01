import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import styles from "./styles/avatar.module.css";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 400 / 400 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const App = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button className={styles.avatar_button} type="button">
      {loading ? (
        <LoadingOutlined className={styles.avatar_icon} />
      ) : (
        <PlusOutlined className={styles.avatar_icon} />
      )}
    </button>
  );
  return (
    <>
      <Upload
        name="avatar"
        showUploadList={false}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" className={styles.image} />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};
export default App;
