import styles from "../styles/header.module.css";
import { Link } from "react-router-dom";
import { getUser } from "../utils";

function Header() {
  function logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  const userData = getUser();

  return (
    <header className={styles.header}>
      <div className={styles.inner_header}>
        <div className={styles.header_content}>
          <div className={styles.tab_div}>
            <img src="/images/logo.svg" className={styles.logo} alt=""></img>
            {userData.role === "Recruter" ? (
              <div className={styles.nav}>
                <Link to="/myVacancies" className={styles.link}>
                  <p className={styles.vacancy_tab}>Мої вакансії</p>
                </Link>
              </div>
            ) : (
              <Link to="/" className={styles.link}>
                <p className={styles.vacancy_tab}>Вакансії</p>
              </Link>
            )}
          </div>

          <div className={styles.user_div}>
            <div className={styles.dropdown}>
              <div className={styles.user_div}>
                <img
                  src={userData.avatar}
                  className={styles.user_photo}
                  alt=""
                ></img>
                <div className={styles.user_info}>
                  <div className={styles.user_fullname}>
                    <p className={styles.user_name}>{userData.username}</p>
                  </div>
                  <p className={styles.user_email}>{userData.email}</p>
                </div>
              </div>

              <div className={styles.dropdown_content}>
                <Link to="/editProfile" className={styles.link}>
                  <a>Edit profile</a>
                </Link>
                {userData.role === "Recruter" && (
                  <Link to="/companyInfo" className={styles.link}>
                    <a>Edit company</a>
                  </Link>
                )}
                <hr className={styles.line} />
                <a onClick={() => logout()}>Log out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
