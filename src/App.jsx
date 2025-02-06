import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provide";
import Applayout from "./layouts/app-layout";
import LandingPage from "./pages/landing";
import Joblisting from "./pages/job-listing";
import Onboarding from "./pages/Onboarding";
import Savedjobs from "./pages/saved-jobs";
import Myjobs from "./pages/my-jobs";
import JobePage from "./pages/job";
import Postjob from "./pages/postjob";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <Joblisting />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs/:id",
        element: (
          <ProtectedRoute>
            <JobePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <Postjob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-job",
        element: (
          <ProtectedRoute>
            <Savedjobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <Myjobs />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
