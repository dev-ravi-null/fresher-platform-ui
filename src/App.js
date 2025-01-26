import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { Home } from './components/Home';
import FresherDetails from './components/FresherDetailed';
import Dashboard from './components/Dashboard';
import DocumentUpload from './components/DocumentUpload';
import SkillsModal from './components/SkillsModal';
import DashboardModal from './components/DashboardModal';
import DashboardCharts from './components/DashboardCharts';
import RecruiterView from './components/RecruiterView';
import ProcessingPage from './components/ProcessingPage';

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
            Commits: <DashboardModal type="Commits" />,
            Interview: <DashboardModal type="Interview" />,
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
