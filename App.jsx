import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import SkillsPage from "./pages/SkillsPage.jsx";
import ExperiencePage from "./pages/ExperiencePage.jsx";
import CertificationsPage from "./pages/CertificationsPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import NowPage from "./pages/NowPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "skills", element: <SkillsPage /> },
        { path: "experience", element: <ExperiencePage /> },
        { path: "certifications", element: <CertificationsPage /> },
        { path: "projects", element: <ProjectsPage /> },
        { path: "now", element: <NowPage /> },
        { path: "contact", element: <ContactPage /> },
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ],
  { basename: "/Portfolio" }
);

export default function App() {
  return <RouterProvider router={router} />;
}
