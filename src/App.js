import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { Home } from './components/Home';
import FresherDetails from './components/FresherDetails';
import Dashboard from './components/Dashboard';
import DocumentUpload from './components/DocumentUpload';
import SkillsModal from './components/SkillsModal';
import DashboardModal from './components/DashboardModal';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/fresherdetails" element={<FresherDetails />} />
        <Route path="/dashboard" element={ <Dashboard
              data={{
                ProfilePhoto: <DocumentUpload />,
                Resume:  <DocumentUpload />,
                Commits: <DashboardModal />,
                Interview: <div>Interview Content</div>,
                Skills: <SkillsModal />
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
