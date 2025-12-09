import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import CourseCard from '../components/common/CourseCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../api/apiUrl';

const Course = () => {
    const navigate = useNavigate();
    const [allCourses, setAllCourses] = useState([]);

    const handleGetId = (id) => {
        navigate(`/coursedetail/${id}`);
    };

    const fetchAllCourses = async () => {
        try {
            const token = await localStorage.getItem("user-auth-token")
            const res = await axios.get(`${API_URL}/api/user/get-all-courses`, {
                headers:{
                "Authorization": `Bearer ${token}`
                }
            });

            setAllCourses(res.data || []);
        } catch (error) {
            console.log('Failed to fetch courses', error);
        }
    };

    useEffect(() => {
        fetchAllCourses();
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <div
                style={{
                    backgroundImage: "url('/course.png')",
                    height: '30vh',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="flex items-center flex-col justify-center h-full text-white text-center px-4">
                    <h1 className="sm:text-xl">
                        Most people fail at building muscle because they don’t have a plan. They’re winging workouts, eating wrong, and burning out fast.
                    </h1>
                    <h1 className="sm:text-3xl text-2xl font-bold sm:my-4 my-2">
                        This course fixes all that
                    </h1>
                    <h1 className="sm:text-xl">
                        You’ll get a complete, science-backed system that takes you from beginner to beast, with zero confusion.
                    </h1>
                </div>
            </div>

            {/* Courses Section */}
            <div className="p-6">
                <h1 className="text-3xl font-bold text-center mb-10">
                    The Ultimate Bodybuilding Course
                </h1>
                <div className="flex flex-wrap justify-center gap-12">
                    {allCourses.length > 0 ? (
                        allCourses.map((course, index) => (
                            <CourseCard
                                key={index}
                                {...course}
                                handleGetId={handleGetId}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 text-lg">No courses available at the moment.</p>
                    )}
                </div>
            </div>

            {/* Contact Section */}
            <div className="flex flex-col md:flex-row items-stretch justify-center w-full bg-white mt-20">
                <div className="w-full md:w-1/2">
                    <img
                        src="/contactimagecourse.png"
                        alt="Fitness Models"
                        className="w-full h-full md:h-auto object-cover md:aspect-video"
                    />
                </div>

                <div className="w-full md:w-1/2 bg-gray-900 text-white p-8 space-y-6 flex flex-col justify-center">
                    <h2 className="text-xl font-semibold">
                        📅 Have Questions? We're Here to Help!
                    </h2>
                    <p className="text-gray-300 text-sm">
                        Not sure if this course is right for you? Need help with enrollment or payments?
                    </p>
                    <p className="font-bold text-lg">Reach out — we'd love to hear from you!</p>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-xl">
                            📞
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Phone:</p>
                            <p className="text-lg font-semibold text-white">
                                (00) 875 784 568
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-xl">
                            ✉️
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Email:</p>
                            <p className="text-lg font-semibold text-white">
                                info@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;