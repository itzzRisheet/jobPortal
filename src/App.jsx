import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./compoanents/pages/Home";
import Jobs from "./compoanents/pages/Jobs";
import Recruiters from "./compoanents/pages/Recruiters";
import RecruiterDetails from "./compoanents/pages/RecruiterDetails";
import JobDetails from "./compoanents/pages/JobDetails";
import Profile from "./compoanents/pages/Profile";
import Candidate from "./compoanents/pages/Candidate";
import CandidateDetails from "./compoanents/pages/CandidateDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/jobs", element: <Jobs /> },
      { path: "/jobs/:jobID", element: <JobDetails /> },
      { path: "/recruiters", element: <Recruiters /> },
      { path: "/recruiters/:recruiterID", element: <RecruiterDetails /> },
      { path: "/profile", element: <Profile /> },
      { path: "/candidates", element: <Candidate /> },
      { path: "/candidates/:candidateID", element: <CandidateDetails /> },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
