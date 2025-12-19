// import React, { useEffect, useState } from "react";
// import { FaStar, FaBook, FaClock } from "react-icons/fa";
// import { FiChevronUp, FiChevronDown } from "react-icons/fi";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { API_URL } from "../api/apiUrl";

// const CourseDetail = () => {
//   const [openIndex, setOpenIndex] = useState(null);
//   const [courseData, setCourseData] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("user-auth-token");
//         const res = await axios.get(`${API_URL}/api/user/get-one-course/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setCourseData(res.data?.course || res.data);
//       } catch (error) {
//         console.error("Error fetching course:", error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const toggleModule = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const handlePurchase = () => {
//     // Redirect to payment or purchase flow
//     navigate(`/checkout/${id}`);
//   };

//   if (!courseData) {
//     return <div className="text-center py-10">Loading course...</div>;
//   }

//   const {
//     title,
//     description,
//     courseThumbnail,
//     discountedPrice,
//     price,
//     durationToComplete,
//     modules,
//     ratings,
//     purchasedByHowMuch,
//     hasPurchased,
//   } = courseData;

//   const averageRating =
//     ratings.length > 0
//       ? (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1)
//       : "No ratings";

//   return (
//     <div className="max-w-[1400px] mx-auto p-4">
//       <div className="flex flex-col lg:flex-row gap-6 bg-white p-5 rounded-xl shadow-md">
//         {/* Left - Course Details */}
//         <div className="w-full lg:w-1/2">
//           <div className="rounded-xl overflow-hidden shadow">
//             <img
//               src={courseThumbnail}
//               alt="Course Thumbnail"
//               className="w-full h-[400px] object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-[20px] font-bold mb-2">{title}</h2>
//               <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
//                 <div className="flex items-center gap-1 text-orange-500 font-medium">
//                   <FaStar size={14} />
//                   {averageRating}
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <FaClock size={14} />
//                   {(durationToComplete / 60).toFixed(1)} hrs
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <FaBook size={14} />
//                   {modules.length} modules
//                 </div>
//               </div>
//               <p className="text-sm text-gray-500 leading-snug">{description}</p>
//               <div className="mt-4">
//                 <p className="text-lg font-bold text-green-600">
//                   ${discountedPrice}{" "}
//                   <span className="line-through text-sm text-gray-400 ml-2">
//                     ${price}
//                   </span>
//                 </p>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Purchased by {purchasedByHowMuch} users
//                 </p>

//                 {!hasPurchased && (
//                   <button
//                     onClick={handlePurchase}
//                     className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//                   >
//                     Purchase Course
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right - Modules */}
//         <div className="w-full lg:w-[65%] space-y-2">
//           {modules.map((module, index) => (
//             <div
//               key={module._id}
//               className="border border-gray-200 rounded-md px-4 py-3 cursor-pointer"
//               onClick={() => toggleModule(index)}
//             >
//               <div className="flex justify-between items-center text-blue-700 text-sm">
//                 {module.title}
//                 <span>
//                   {openIndex === index ? (
//                     <FiChevronUp className="w-4 h-4 text-black" />
//                   ) : (
//                     <FiChevronDown className="w-4 h-4 text-black" />
//                   )}
//                 </span>
//               </div>

//               {openIndex === index && (
//                 <div className="transition-all duration-300 mt-2 text-sm text-gray-700">
//                   <p className="mb-2 font-medium">{module.description}</p>

//                   {!hasPurchased ? (
//                     (() => {
//                       const link = module.assetLink;
//                       const ext = link?.split(".").pop().toLowerCase();

//                       if (ext === "pdf") {
//                         return (
//                           <a
//                             href={link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 underline"
//                           >
//                             📄 View PDF
//                           </a>
//                         );
//                       } else if (ext === "mp4" || ext === "webm") {
//                         return (
//                           <video controls className="w-full rounded-md mt-2">
//                             <source src={link} type={`video/${ext}`} />
//                             Your browser does not support the video tag.
//                           </video>
//                         );
//                       } else {
//                         return (
//                           <p className="text-red-500">
//                             Unsupported file type: {ext}
//                           </p>
//                         );
//                       }
//                     })()
//                   ) : (
//                     <p className="text-red-500 font-semibold mt-2">
//                       🔒 Please purchase this course to access this module.
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;


import React, { useEffect, useState } from "react";
import { FaStar, FaBook, FaClock, FaLock, FaUnlock, FaSpinner } from "react-icons/fa";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api/apiUrl";

const CourseDetail = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPurchaseLoading, setIsPurchaseLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paymentSuccess = searchParams.get('payment_success');
    const sessionId = searchParams.get('session_id');

    if (paymentSuccess === 'true' || sessionId) {
      window.history.replaceState({}, document.title, window.location.pathname);
      alert("Payment successful! Course is now unlocked.");
      fetchCourseData();
    }
  }, [location]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("user-auth-token");
      const userEmail = localStorage.getItem("user-email");
      
      if (!token) {
        const res = await axios.get(`${API_URL}/api/user/get-one-course/${id}`);
        setCourseData(res.data?.course || res.data);
        return;
      }

      const res = await axios.get(`${API_URL}/api/user/get-one-course/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourseData(res.data?.course || res.data);
    } catch (error) {
      console.error("Error fetching course:", error);
      
      if (error.response?.status === 401) {
        try {
          const res = await axios.get(`${API_URL}/api/user/get-one-course/${id}`);
          setCourseData(res.data?.course || res.data);
        } catch (err) {
          console.error("Error fetching public course data:", err);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  const toggleModule = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handlePurchase = async () => {
    try {
      const token = localStorage.getItem("user-auth-token");
      const userEmail = localStorage.getItem("user-email");
      
      if (!token) {
        navigate('/login', { 
          state: { 
            from: location.pathname,
            message: "Please login to purchase this course"
          } 
        });
        return;
      }

      if (!userEmail || userEmail === 'user@example.com') {
        alert("Please login again to get your email");
        navigate('/login');
        return;
      }

      setIsPurchaseLoading(true);

      const response = await axios.post(
        `${API_URL}/api/payments/create-checkout-session`,
        {
          courseId: id,
          userEmail: userEmail
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else {
        alert("Payment failed: No checkout URL received");
        setIsPurchaseLoading(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
      setIsPurchaseLoading(false);
      
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-16 text-gray-500 text-lg font-medium">Loading course...</div>;
  }

  if (!courseData) {
    return <div className="text-center py-16 text-gray-500 text-lg font-medium">Course not found</div>;
  }

  const {
    title,
    description,
    courseThumbnail,
    discountedPrice,
    price,
    durationToComplete,
    modules = [],
    ratings = [],
    purchasedByHowMuch = 0,
    hasPurchased = false,
  } = courseData;

  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1)
      : "No ratings";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Course Details */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="relative overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 h-[400px]">
                <img
                  src={courseThumbnail}
                  alt="Course Thumbnail"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800";
                  }}
                />
              </div>
              
              <div className="p-7 space-y-5">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{title}</h2>
                
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-orange-50 px-3 py-2.5 rounded-lg border border-orange-100">
                    <FaStar className="text-orange-500" size={16} />
                    <span className="font-semibold text-orange-600">{averageRating}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-2.5 rounded-lg border border-blue-100">
                    <FaClock className="text-blue-500" size={16} />
                    <span className="font-semibold text-blue-600">{(durationToComplete / 60).toFixed(1)} hrs</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-50 px-3 py-2.5 rounded-lg border border-purple-100">
                    <FaBook className="text-purple-500" size={16} />
                    <span className="font-semibold text-purple-600">{modules.length} modules</span>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed text-base">{description}</p>
                
                <div className="border-t border-gray-200 pt-5 space-y-3">
                  <div className="space-y-2">
                    <p className="text-3xl font-bold text-green-600">
                      ${discountedPrice}
                    </p>
                    {price && (
                      <p className="text-sm text-gray-500 line-through">
                        ${price}
                      </p>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-700 font-medium">
                    ✅ Purchased by <span className="text-gray-900 font-bold">{purchasedByHowMuch}</span> users
                  </p>
                </div>

                {!hasPurchased ? (
                  <button
                    onClick={handlePurchase}
                    disabled={isPurchaseLoading}
                    className={`w-full mt-6 px-6 py-3 font-semibold rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
                      isPurchaseLoading
                        ? 'bg-gray-500 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105'
                    }`}
                  >
                    {isPurchaseLoading ? (
                      <>
                        <FaSpinner className="animate-spin" size={20} />
                        <span className="text-base">Processing Payment...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg">🛒</span>
                        <span className="text-base">Purchase Course Now</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg">
                    <div className="flex items-center gap-3 text-green-700">
                      <FaUnlock size={20} className="text-green-600" />
                      <div>
                        <p className="font-bold text-lg">Course Unlocked</p>
                        <p className="text-sm text-green-600">Full access to all content</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right - Modules */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl p-7 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaBook className="text-blue-600" size={20} />
                Course Modules
              </h3>
              
              <div className="space-y-3">
                {modules.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <FaBook size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No modules available yet</p>
                  </div>
                ) : (
                  modules.map((module, index) => (
                    <div
                      key={module._id || index}
                      className="border-2 border-gray-200 rounded-xl px-5 py-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
                      onClick={() => toggleModule(index)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1 rounded-lg min-w-10 text-center">
                            {index + 1}
                          </span>
                          <span className="font-semibold text-gray-900">{module.title}</span>
                          {!hasPurchased && (
                            <FaLock className="text-amber-500 ml-auto mr-2" size={14} />
                          )}
                        </div>
                        <span className="text-gray-500">
                          {openIndex === index ? (
                            <FiChevronUp className="w-5 h-5 text-blue-600" />
                          ) : (
                            <FiChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </span>
                      </div>

                      {openIndex === index && (
                        <div className="transition-all duration-300 mt-4 pt-4 border-t border-gray-200 space-y-3">
                          <p className="font-medium text-gray-700">{module.description || "No description available"}</p>

                          {hasPurchased ? (
                            (() => {
                              const link = module.assetLink;
                              if (!link) {
                                return <p className="text-gray-500 italic">No content available for this module.</p>;
                              }
                              
                              const ext = link?.split(".").pop()?.toLowerCase();

                              if (ext === "pdf") {
                                return (
                                  <div className="space-y-3">
                                    <a
                                      href={link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-block text-blue-600 font-semibold hover:text-blue-800 hover:underline transition"
                                    >
                                      📄 View PDF Document
                                    </a>
                                    <iframe 
                                      src={link} 
                                      className="w-full h-80 rounded-lg border-2 border-gray-200 shadow-sm"
                                      title="PDF Document"
                                    />
                                  </div>
                                );
                              } else if (ext === "mp4" || ext === "webm" || ext === "ogg") {
                                return (
                                  <div className="space-y-3">
                                    <video controls className="w-full rounded-lg border-2 border-gray-200 shadow-sm">
                                      <source src={link} type={`video/${ext}`} />
                                      Your browser does not support the video tag.
                                    </video>
                                    <a
                                      href={link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-block text-blue-600 font-semibold hover:text-blue-800 hover:underline transition"
                                    >
                                      🎬 Open in new tab
                                    </a>
                                  </div>
                                );
                              } else if (["jpg", "jpeg", "png", "gif"].includes(ext)) {
                                return (
                                  <div>
                                    <img 
                                      src={link} 
                                      alt={module.title} 
                                      className="w-full rounded-lg border-2 border-gray-200 hover:shadow-lg transition shadow-sm"
                                      onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/800x450?text=Image+Not+Available";
                                      }}
                                    />
                                  </div>
                                );
                              } else {
                                return (
                                  <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-blue-600 font-semibold hover:text-blue-800 hover:underline transition"
                                  >
                                    📎 Download Resource (.{ext})
                                  </a>
                                );
                              }
                            })()
                          ) : (
                            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg">
                              <p className="text-amber-900 font-semibold flex items-center gap-2">
                                <FaLock size={16} />
                                🔒 Purchase course to unlock this module
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;