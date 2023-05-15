import * as React from "react";
import styles from "../styles/companyInfo.module.css";
import { useState, useEffect } from "react";
import DataService from "../ds";
import UploadFile from "./UploadFile";
import { createFormDataFromObject, getUser } from "../utils";
import { useInput } from "../customHooks/useInput";
import { toast } from "react-toastify";

const initialInputValues = {
  name: "",
  description: "",
  douLink: "",
  siteLink: "",
};

function CompanyInfo() {
  const [avatar, setAvatar] = useState("");
  const { inputValues, onInputChange, setDefaultValues } =
    useInput(initialInputValues);

  async function updateCompany() {
    try {
      const formData = createFormDataFromObject({
        ...inputValues,
        avatar: avatar?.[0],
      });

      await DataService.company.update(formData);

      toast.success("Дані оновлено!", {
        position: toast.POSITION.TOP_CENTER,
      });

    } catch (e) {
      toast.error("Упс! Щось пішло не так...", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function fetchCompanyInfo() {
    try {
      const { data } = await DataService.company.get();
      setDefaultValues(data);
      setAvatar(data.avatar);
    } catch (e) {
      toast.error("Упс! Щось пішло не так...", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.page_content}>
          <h1 className={styles.page_title}>
            Заповніть профіль, щоб публікувати вакансії.
          </h1>
          <div className={styles.company_info}>
            <div className={styles.inputs}>
              <input
                name="name"
                placeholder="Назва компанії"
                className={styles.input}
                value={inputValues.name}
                onChange={onInputChange}
              ></input>
              <input
                name="siteLink"
                placeholder="Посилання на сайт компанії"
                className={styles.input}
                value={inputValues.siteLink}
                onChange={onInputChange}
              ></input>
              <input
                name="douLink"
                placeholder="Посилання на Dou"
                className={styles.input}
                value={inputValues.douLink}
                onChange={onInputChange}
              ></input>
            </div>
            <UploadFile value={avatar} onChange={setAvatar} />
          </div>

          <button
            className={styles.main_button}
            onClick={() => updateCompany()}
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfo;
