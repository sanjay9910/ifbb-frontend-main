import React, { useEffect, useState } from "react";
import { FaStar, FaBook, FaClock } from "react-icons/fa";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api/apiUrl";

const CourseDetail = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("user-auth-token");
        const res = await axios.get(`${API_URL}/api/user/get-one-course/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourseData(res.data?.course || res.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchData();
  }, [id]);

  const toggleModule = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handlePurchase = () => {
    // Redirect to payment or purchase flow
    navigate(`/checkout/${id}`);
  };

  if (!courseData) {
    return <div className="text-center py-10">Loading course...</div>;
  }

  const {
    title,
    description,
    courseThumbnail,
    discountedPrice,
    price,
    durationToComplete,
    modules,
    ratings,
    purchasedByHowMuch,
    hasPurchased,
  } = courseData;

  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1)
      : "No ratings";

  return (
    <div className="max-w-[1400px] mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6 bg-white p-5 rounded-xl shadow-md">
        {/* Left - Course Details */}
        <div className="w-full lg:w-1/2">
          <div className="rounded-xl overflow-hidden shadow">
            <img
              src={courseThumbnail}
              alt="Course Thumbnail"
              className="w-full h-[400px] object-cover"
            />
            <div className="p-4">
              <h2 className="text-[20px] font-bold mb-2">{title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
                <div className="flex items-center gap-1 text-orange-500 font-medium">
                  <FaStar size={14} />
                  {averageRating}
                </div>
                <div className="flex items-center gap-1">
                  <FaClock size={14} />
                  {(durationToComplete / 60).toFixed(1)} hrs
                </div>
                <div className="flex items-center gap-1">
                  <FaBook size={14} />
                  {modules.length} modules
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-snug">{description}</p>
              <div className="mt-4">
                <p className="text-lg font-bold text-green-600">
                  ${discountedPrice}{" "}
                  <span className="line-through text-sm text-gray-400 ml-2">
                    ${price}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Purchased by {purchasedByHowMuch} users
                </p>

                {!hasPurchased && (
                  <button
                    onClick={handlePurchase}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Purchase Course
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right - Modules */}
        <div className="w-full lg:w-[65%] space-y-2">
          {modules.map((module, index) => (
            <div
              key={module._id}
              className="border border-gray-200 rounded-md px-4 py-3 cursor-pointer"
              onClick={() => toggleModule(index)}
            >
              <div className="flex justify-between items-center text-blue-700 text-sm">
                {module.title}
                <span>
                  {openIndex === index ? (
                    <FiChevronUp className="w-4 h-4 text-black" />
                  ) : (
                    <FiChevronDown className="w-4 h-4 text-black" />
                  )}
                </span>
              </div>

              {openIndex === index && (
                <div className="transition-all duration-300 mt-2 text-sm text-gray-700">
                  <p className="mb-2 font-medium">{module.description}</p>

                  {!hasPurchased ? (
                    (() => {
                      const link = module.assetLink;
                      const ext = link?.split(".").pop().toLowerCase();

                      if (ext === "pdf") {
                        return (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            📄 View PDF
                          </a>
                        );
                      } else if (ext === "mp4" || ext === "webm") {
                        return (
                          <video controls className="w-full rounded-md mt-2">
                            <source src={link} type={`video/${ext}`} />
                            Your browser does not support the video tag.
                          </video>
                        );
                      } else {
                        return (
                          <p className="text-red-500">
                            Unsupported file type: {ext}
                          </p>
                        );
                      }
                    })()
                  ) : (
                    <p className="text-red-500 font-semibold mt-2">
                      🔒 Please purchase this course to access this module.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;