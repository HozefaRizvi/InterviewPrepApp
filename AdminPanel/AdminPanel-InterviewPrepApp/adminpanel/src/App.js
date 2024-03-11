import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Views/Authentication/SignIn';
import HomePage from './Views/Pages/HomePage';
import Sidebar from './Sidebar/SideBar';
import UserDetails from './Views/Pages/UserDetails';
import UserContributions from './Views/Pages/UserContributions';
import Support from './Views/Pages/Support';
import AllQuestions from './Views/Pages/All Questions';
import AddQuestion from './Views/Pages/AddQuestions';
import AdminTasks from './Views/Pages/AdminTasks';
import ChartActivites from './Views/Pages/ChartActivity';
import MockInterviewAnalysis from './Views/Pages/MockInterviewAnalysis';
const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route
        path="/dashboard/*"
        element={
          <div className="d-flex">
            <Sidebar />
            <div className="content d-flex flex-column p-3 flex-grow-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="user-details" element={<UserDetails />} />
                <Route path="user-contributions" element={<UserContributions />} />
                <Route path="support" element={<Support />} />
                <Route path="all-questions" element={<AllQuestions />} />
                <Route path="add-question" element={<AddQuestion />} />
                <Route path="admin-tasks" element={<AdminTasks />} />
                <Route path="chart-activites" element={<ChartActivites />} />
                <Route path="mock-analysis" element={<MockInterviewAnalysis />} />
              </Routes>
            </div>
          </div>
        }
      />
    </Routes>
  </Router>
  );
};

export default App;