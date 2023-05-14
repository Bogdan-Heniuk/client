import { useState } from "react";
import styles from "../styles/uploadPhoto.module.css";
import { uploadImages } from "../utils.js";

function UploadFile({ value, onChange, multiple = false }) {
  const [imageWasChanged, setImageWasChange] = useState(false);
  return (
    <div className={styles.preview_images_div}>
      <div className={styles.preview_images}>
        {value && imageWasChanged ? (
          <img
            src={window.URL.createObjectURL(new Blob(value))}
            className={styles.preview_image}
            alt=""
          ></img>
        ) : (
          <img src={value} className={styles.preview_image} alt=""></img>
        )}
      </div>
      <div className={styles.upload_image_div}>
        <label htmlFor="avatar" className={styles.custom_file_upload}>
          Завантажити файл
        </label>
      </div>
      <input
        id="avatar"
        name="avatar"
        type="file"
        multiple={multiple}
        onChange={(e) => {
          console.log(2222)
          uploadImages(e.target.files, onChange);
          setImageWasChange(true);
        }}
      />
    </div>
  );
}

export default UploadFile;
