import React from 'react';
import { createBrowserRouter,createRoutesFromElements,Route, Routes,RouterProvider } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Home from "./pages/Home.jsx"
import Course from './pages/Course.jsx';
import About from "./pages/About.jsx";
import Gallery from './pages/Gallery.jsx';
import Certficates from './pages/Certficates.jsx';
import News from './pages/News.jsx';
import ContactUs from './pages/ContactUs';
import CourseDetail from './pages/CourseDetail.jsx';
import Login from './Auth/Login.jsx';
import Signup from './Auth/Signup.jsx';
import { Toaster } from 'sonner';
const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup'element={<Signup/>}/>
    <Route path='/' element={<Navbar/>}>
    
    
      <Route index element={<Home/>}/>
      <Route path='/course' element={<Course/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/gallery'element={<Gallery/>}/>
      <Route path='/certificates' element={<Certficates/>}/>
      <Route path='/news' element={<News/>}/>
      <Route path='/contact'element={<ContactUs/>}/>
      <Route path='/coursedetail/:id'element={<CourseDetail/>}/>


    </Route>
  </Route>
))
const App = () => {
  return (
    <>
    <Toaster richColors />
<RouterProvider router={router}/>
    </>
  );
};

export default App;