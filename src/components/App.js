import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobBoard from "./JobBoard";
import Registration from "./Registration";
import Layout from "./Layout";
import Authorization from "./Authorization";
import RecrutiersJobList from "./RecrutiersJobs";
import CreateVacancy from "./CreateVacancy";
import Vacancy from "./Vacancy";
import AuthorizedComponent from "./AuthorizedComponent";
import CompanyInfo from "./CompanyInfo";
import EditProfile from "./EditProfile";
import UpdateVacancy from "./updateVacancy";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer autoClose={1000} />
      <Routes>
        <Route path="/signup" element={<Registration />} />
        <Route path="/login" element={<Authorization />} />
        <Route
          path="/"
          element={
            <AuthorizedComponent
              component={
                <Layout>
                  <JobBoard />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/companyInfo"
          element={
            <AuthorizedComponent
              component={
                <Layout>
                  <CompanyInfo />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/editProfile"
          element={
            <AuthorizedComponent
              component={
                <Layout>
                  <EditProfile />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/myVacancies"
          element={
            <AuthorizedComponent
              component={
                <Layout>
                  <RecrutiersJobList />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/createVacancy"
          element={
            <AuthorizedComponent
              component={
                <Layout>
                  <CreateVacancy />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/vacancy/:vacancyId/update"
          element={
            <AuthorizedComponent
              component={
                <Layout>
                  <UpdateVacancy />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/vacancy/:vacancyId"
          element={
            <AuthorizedComponent
              component={
                <Layout>
                  <Vacancy />
                </Layout>
              }
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
