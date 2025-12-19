import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Course from "./pages/Course";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Certficates from "./pages/Certficates";
import News from "./pages/News";
import ContactUs from "./pages/ContactUs";
import CourseDetail from "./pages/CourseDetail";

// Auth
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

// Context
import { AuthProvider } from "./Auth/AuthContext"; // Import AuthProvider

// Toast
import { Toaster } from "sonner";

/* ================= ROUTER ================= */
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* AUTH ROUTES (NO NAVBAR) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* MAIN WEBSITE WITH NAVBAR */}
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="course" element={<Course />} />
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="certificates" element={<Certficates />} />
        <Route path="news" element={<News />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="coursedetail/:id" element={<CourseDetail />} />
      </Route>
    </Route>
  )
);

/* ================= APP ================= */
const App = () => {
  return (
    <AuthProvider> {/* Wrap entire app with AuthProvider */}
      <Toaster richColors position="top-center" />
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;