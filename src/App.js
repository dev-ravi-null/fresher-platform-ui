import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { Home } from './components/LandingPage/Home';
import FresherDetails from './components/StudentDashbaord/FresherDetailed';
import Dashboard from './components/StudentDashbaord/Dashboard';
import DocumentUpload from './components/StudentDashbaord/DocumentUpload';
import SkillsModal from './components/StudentDashbaord/SkillsModal';
import DashboardModal from './components/StudentDashbaord/DashboardSummary';
import DashboardCharts from './components/StudentDashbaord/DashboardCharts';
import RecruiterView from './components/Recruiter/RecruiterView';
import ProcessingPage from './components/LandingPage/ProcessingPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/fresherdetails" element={<FresherDetails />} />
        <Route path="/recruiter-view" element={<RecruiterView />} />
        <Route path="/processing-page" element={<ProcessingPage />} />
        <Route path="/dashboard" element={<Dashboard
          data={{
            Chart: <DashboardCharts />,
            ProfilePhoto: <DocumentUpload type="Photo" />,
            Resume: <DocumentUpload type="Resume" />,
            Report: <DashboardModal />,
            Skills: <SkillsModal />,
            Logout: <div></div>
          }}
        />
        }
        />
      </Routes >

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </div >
  );
};

export default App;
