import * as React from "react";
import styles from "../styles/editProfile.module.css";
import { useState, useEffect } from "react";
import DataService from "../ds";
import UploadFile from "./UploadFile";
import { createFormDataFromObject, getUser } from "../utils";
import { useInput } from "../customHooks/useInput";
import { uploadImages } from "../utils";
import filters from "../filters.json";
import { EnglishLevel } from "../common/enums";

const initialInputValues = {
  name: "",
  phoneNumber: "",
  telegram: "",
  workExperience: "",
  specialty: "",
  salaryExpectations: "",
  englishLevel: "",
  githubLink: "",
  linkedInLink: "",
  portfolioLink: "",
};

function EditProfile() {
  const [avatar, setAvatar] = useState("");
  const { inputValues, onInputChange, setDefaultValues } =
    useInput(initialInputValues);
  const [cv, setCV] = useState("");

  console.log(inputValues);
  const userData = getUser();
  const { specialties } = filters;

  async function updateProfile() {
    try {
      const formData = createFormDataFromObject({
        ...inputValues,
        avatar: avatar?.[0],
        cv: cv?.[0],
      });

      const { data: newToken } = await DataService.user.update(formData);
      localStorage.setItem("token", newToken);

      // setDefaultValues(initialInputValues);
      //   window.location.href = "/myVacancies";
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  }

  async function getProfileData() {
    try {
      const { data: userInfo } = await DataService.user.getInfo(userData._id);

      setDefaultValues({
        name: userInfo.username,
        email: userInfo.email,
        phoneNumber: userInfo.contacts?.phoneNumber,
        telegram: userInfo.contacts?.telegram,
        workExperience: userInfo.jobSpecs?.workExperience,
        specialty: userInfo.jobSpecs?.specialty,
        salaryExpectations: userInfo.jobSpecs?.salaryExpectations,
        englishLevel: userInfo.jobSpecs?.englishLevel,
        githubLink: userInfo.contacts?.githubLink,
        linkedInLink: userInfo.contacts?.linkedInLink,
        portfolioLink: userInfo.contacts?.portfolioLink,
      });

      setAvatar(userInfo.avatar);
      setCV(userInfo.cv);
    } catch (e) {
      console.log(e);
      alert(e?.response?.data?.message);
    }
  }

  useEffect(() => {
    getProfileData();
  }, []);

  console.log({ cv });
  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.page_content}>
          <h1 className={styles.page_title}>Редагування профілю</h1>
          <div className={styles.user_info}>
            <div className={styles.upload_photo}>
              <UploadFile value={avatar} onChange={setAvatar} />
            </div>

            <div className={styles.inputs}>
              <input
                name="name"
                placeholder="Ім'я"
                className={styles.input}
                value={inputValues.name || ""}
                onChange={onInputChange}
              ></input>
              <input
                name="email"
                disabled={true}
                placeholder="Email"
                className={styles.input}
                value={inputValues.email || ""}
                onChange={onInputChange}
              ></input>
              <input
                name="phoneNumber"
                placeholder="Номер телефону"
                className={styles.input}
                value={inputValues.phoneNumber || ""}
                onChange={onInputChange}
              ></input>
              <input
                name="telegram"
                placeholder="Telegram"
                className={styles.input}
                value={inputValues.telegram || ""}
                onChange={onInputChange}
              ></input>
              {userData.role === "Candidate" && (
                <>
                  <div className={styles.answer_div}>
                    <select
                      className="form-select"
                      name="specialty"
                      value={inputValues.specialty}
                      onChange={onInputChange}
                    >
                      <option value="0">(Оберіть посаду)</option>
                      <option
                        disabled
                        className={styles.select_disable_element}
                      >
                        Технічні
                      </option>

                      {specialties.technical.map((specialty) => {
                        return (
                          <option key={specialty} value={specialty}>
                            {specialty}
                          </option>
                        );
                      })}
                      <option
                        disabled
                        className={styles.select_disable_element}
                      >
                        Не технічні
                      </option>
                      {specialties.nonTechnical.map((specialty) => {
                        return (
                          <option key={specialty} value={specialty}>
                            {specialty}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className={styles.answer_div}>
                    <select
                      name="workExperience"
                      styles={{ boxSizing: "border-box" }}
                      className="form-select"
                      value={inputValues.workExperience}
                      onChange={onInputChange}
                    >
                      <option value="">Досвід роботи</option>
                      <option value="0">Без досвіду</option>
                      <option value="1">1 рік</option>
                      <option value="2">2 роки</option>
                      <option value="3">3 роки</option>
                      <option value="5">5 років</option>{" "}
                    </select>
                  </div>

                  <input
                    name="salaryExpectations"
                    placeholder="Бажана зарплатня, $"
                    className={styles.input}
                    value={inputValues.salaryExpectations || ""}
                    onChange={onInputChange}
                  ></input>
                  <div className={styles.answer_div}>
                    <select
                      name="englishLevel"
                      className="form-select"
                      value={inputValues.englishLevel}
                      onChange={onInputChange}
                    >
                      <option value="">Рівень англійської</option>;
                      {Object.values(EnglishLevel).map((level) => {
                        return (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <input
                    name="githubLink"
                    placeholder="GitHub"
                    className={styles.input}
                    value={inputValues.githubLink || ""}
                    onChange={onInputChange}
                  ></input>
                  <input
                    name="portfolioLink"
                    placeholder="Portfolio"
                    className={styles.input}
                    value={inputValues.portfolioLink || ""}
                    onChange={onInputChange}
                  ></input>
                </>
              )}
              <input
                name="linkedInLink"
                placeholder="LinkedIn"
                className={styles.input}
                value={inputValues.linkedInLink || ""}
                onChange={onInputChange}
              ></input>
              {userData.role === "Candidate" &&
                <>
                  <div className={styles.upload_image_div}>
                    <label htmlFor="cv" className={styles.custom_file_upload}>
                      Завантажити CV
                    </label>
                    <input
                      id="cv"
                      name="cv"
                      type="file"
                      onChange={(e) => uploadImages(e.target.files, setCV)}
                    />
                  </div>
                  {cv?.[0]?.name ? (
                    <span>{cv?.[0]?.name}</span>
                  ) : (
                    <a href={cv?.location}>{cv?.fileName}</a>
                  )}
                </>
              }
            </div>

            <div className={styles.button_div}>
              <button onClick={updateProfile} className={styles.main_button}>
                Зберегти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
