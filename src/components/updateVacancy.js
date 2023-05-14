import styles from "../styles/createVacancy.module.css";
import filters from "../filters.json";
import DataService from "../ds";
import { useInput } from "../customHooks/useInput";
import RichEditorExample from "./Editor";
import { useRef, useState } from "react";
import { convertToRaw, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ContentState } from "draft-js";

const initialInputValues = {
  name: "",
  shortDescription: "",
  detailedDescription: "",
  min: "",
  max: "",
  specialty: "",
  experience: "",
  salaryRange: "",
};

function UpdateVacancy() {
  const { inputValues, onInputChange, setDefaultValues } =
    useInput(initialInputValues);

  const [description, setDescription] = useState();
  const { vacancyId } = useParams();

  const ref = useRef();
  const { specialties } = filters;

  async function update() {
    try {
      await DataService.vacancy.update(vacancyId, {
        name: inputValues.name,
        shortDescription: inputValues.shortDescription,
        detailedDescription: draftToHtml(
          convertToRaw(ref?.current?.state.editorState.getCurrentContent())
        ),
        salaryRange: {
          min: inputValues.min ? +inputValues.min : null,
          max: inputValues.max ? +inputValues.max : null,
        },
        specialty: inputValues.specialty,
        experience: +inputValues.experience,
      });

      //   setDefaultValues(initialInputValues);
      //   window.location.href = "/myVacancies";
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  }

  async function fetchVacancyInfo() {
    try {
      const { data } = await DataService.vacancy.getById(vacancyId);
      setDefaultValues({
        name: data.name,
        shortDescription: data.shortDescription,
        detailedDescription: data.detailedDescription,
        min: data.salaryRange.min,
        max: data.salaryRange.max,
        specialty: data.specialty,
        experience: data.experience,
      });

      const blocksFromHTML = convertFromHTML(data.detailedDescription);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML?.contentBlocks,
        blocksFromHTML?.entityMap
      );

      setDescription(state);
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  }

  useEffect(() => {
    fetchVacancyInfo();
  }, []);

  console.log(description);

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.page_title_div}>
          <h1 className={styles.page_title}>Редагування вакансії</h1>
        </div>

        <div className={styles.questions_div}>
          <p>Хто вам потрібен?</p>
          <div className={styles.answer_div}>
            <input
              className={styles.input}
              name="name"
              value={inputValues.name}
              onChange={onInputChange}
            ></input>
            <p className={styles.hint}>
              Наприклад: Java-лід на банківський проект
            </p>
          </div>
          <p>Короткий опис</p>
          <div className={styles.answer_div}>
            <textarea
              className={styles.input}
              name="shortDescription"
              value={inputValues.shortDescription}
              onChange={onInputChange}
            ></textarea>
            <p className={styles.hint}>
              Зацікавте кандидата. Джин використовує цей опис у розсилках та на
              сайті, щоб привернути увагу кандидата.
            </p>
          </div>
          <p>Детальний опис</p>
          <div className={styles.answer_div}>
            {description && (
              <RichEditorExample ref={ref} initialState={description} />
            )}
            <p className={styles.hint}>
              Вимоги, обов'язки, проект, команда, умови праці, компенсаційний
              пакет.
            </p>
          </div>
          <p>Спеціалізація</p>
          <div className={styles.answer_div}>
            <select
              className="form-select"
              aria-label="Default select example"
              name="specialty"
              value={inputValues.specialty}
              onChange={onInputChange}
            >
              <option value="0">(Оберіть посаду)</option>
              <option disabled className={styles.select_disable_element}>
                Технічні
              </option>

              {specialties.technical.map((specialty) => {
                return (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                );
              })}
              <option disabled className={styles.select_disable_element}>
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
          <p>Зарплатна вилка (у місяць), $</p>
          <div className={styles.answer_div_salary}>
            <div className={styles.salary_div}>
              <p>Від</p>
              <input
                className={styles.input_salary}
                name="min"
                value={inputValues.min}
                onChange={onInputChange}
              ></input>
            </div>

            <div className={styles.salary_div}>
              <p>До</p>
              <input
                className={styles.input_salary}
                name="max"
                value={inputValues.max}
                onChange={onInputChange}
              ></input>
            </div>
          </div>
          <p>Досвід роботи, мінімум</p>
          <div className={styles.answer_div}>
            <select
              className="form-select"
              aria-label="Default select example"
              name="experience"
              value={inputValues.experience}
              onChange={onInputChange}
            >
              <option value="0">Без досвіду</option>
              <option value="1">1 рік</option>
              <option value="2">2 роки</option>
              <option value="3">3 роки</option>
              <option value="5">5 років</option>
            </select>
          </div>
        </div>
        <button className={styles.main_button} onClick={() => update()}>
          Опублікувати вакансію
        </button>
      </div>
    </div>
  );
}

export default UpdateVacancy;
