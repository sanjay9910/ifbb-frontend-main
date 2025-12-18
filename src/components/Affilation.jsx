// // src/components/Affilation.jsx
// import React, { useRef } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Autoplay } from 'swiper/modules'
// import 'swiper/css'
// import 'swiper/css/navigation'

// import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

// import Aff1 from "/homecrousel.png"
// import Aff2 from "/homecrousel2.png"
// import Aff3 from "/homecrousel3.png"
// import Aff4 from "/homecrousel4.png"
// import Aff5 from "/homecrousel5.png"
// import Aff6 from "/homecrousel6.png"
// import Aff7 from "/homecrousel7.png"
// import Aff8 from "/homecrousel8.png"
// import Aff9 from "/homecrousel9.png"
// import Aff10 from "/homecrousel10.png"
// import Aff11 from "/homecrousel11.png"

// const Affilation = () => {
//   const images = [
//     { id: 1, src: Aff1 },
//     { id: 2, src: Aff2 },
//     { id: 3, src: Aff3 },
//     { id: 4, src: Aff4 },
//     { id: 5, src: Aff5 },
//     { id: 6, src: Aff6 },
//     { id: 7, src: Aff7 },
//     { id: 8, src: Aff8 },
//     { id: 9, src: Aff9 },
//     { id: 10, src: Aff10 },
//     { id: 11, src: Aff11 },
//   ]

//   const swiperRef = useRef(null)

//   return (
//     <div className='h-full w-full md:py-10 py-4 relative'>
//       <h1 className='md:text-5xl sm:text-3xl text-2xl font-bold text-center roboto'>
//         Affiliation And Recognition
//       </h1>


//       <style>{`
//         .aff-img {
//           -webkit-user-drag: none;
//           user-drag: none;
//           -webkit-user-select: none;
//           -ms-user-select: none;
//           user-select: none;
//           pointer-events: none; /* ensures best smoothness; remove if you need clickable logos */
//           transform: translateZ(0); /* promote to its own layer */
//           image-rendering: -webkit-optimize-contrast;
//         }
//       `}</style>

//       <div className="py-10 px-4 md:px-10">
//         <Swiper
//           onSwiper={(swiper) => (swiperRef.current = swiper)}
//           modules={[Autoplay]}
//           autoplay={{
//             delay: 1, // practically continuous
//             disableOnInteraction: false,
//             pauseOnMouseEnter: false,
//           }}
//           loop={true}
//           loopedSlides={images.length} // helps seamless loop
//           spaceBetween={20}
//           slidesPerView={5}
//           speed={4200} // long smooth transition (tweak if you want faster/slower)
//           centeredSlides={false}
//           allowTouchMove={true}
//           watchSlidesProgress={true}
//           grabCursor={false}
//           // responsive breakpoints
//           breakpoints={{
//             1280: { slidesPerView: 6, spaceBetween: 28 },
//             1024: { slidesPerView: 5, spaceBetween: 24 },
//             768: { slidesPerView: 3, spaceBetween: 20 },
//             480: { slidesPerView: 2, spaceBetween: 16 },
//             0: { slidesPerView: 1, spaceBetween: 12 },
//           }}
//           // small performance flags
//           observer={true}
//           observeParents={true}
//         >
//           {images.map((img) => (
//             <SwiperSlide key={img.id} className="flex items-center justify-center">
//               <img
//                 src={img.src}
//                 alt={`Affiliation ${img.id}`}
//                 className="w-full h-28 md:h-32 lg:h-36 object-contain aff-img transition-transform duration-700 ease-out"
//                 draggable={false}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   )
// }

// export default Affilation


import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

/* ================= CONFIG ================= */
const API_URL = "https://ifbb-1.onrender.com/api/admin/affiliations";

const Affilation = () => {
  const swiperRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH AFFILIATIONS ================= */
  const fetchAffiliations = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("user-auth-token");

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      const affiliations = data?.data || [];

      const transformedImages = affiliations.map((item, index) => ({
        id: item._id || index,
        src: item.imageUrl,
        title: item.title || `Affiliation ${index + 1}`,
      }));

      setImages(transformedImages);
    } catch (err) {
      console.error(err);
      setError("Failed to load affiliations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAffiliations();
  }, []);

  return (
    <div className="h-full w-full md:py-10 py-4 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h1 className="md:text-5xl sm:text-3xl text-2xl font-bold text-center mb-2 text-gray-800">
          Affiliation And Recognition
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Our prestigious partnerships and accreditations
        </p>

        <div className="py-6 md:py-10 w-full">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center p-8 bg-red-50 rounded-lg">
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={fetchAffiliations}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : images.length > 0 ? (
            <>
              {/* Gradient Overlays for Better Visual Effect */}
              <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

              <Swiper
                ref={swiperRef}
                modules={[Autoplay]}
                autoplay={{
                  delay: 1,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                speed={4000}
                loop={true}
                loopAdditionalSlides={2}
                centeredSlides={false}
                slidesPerView="auto"
                spaceBetween={30}
                grabCursor={true}
                breakpoints={{
                  1536: { spaceBetween: 40 },
                  1280: { spaceBetween: 35 },
                  1024: { spaceBetween: 30 },
                  768: { spaceBetween: 25 },
                  640: { spaceBetween: 20 },
                  0: { spaceBetween: 15 },
                }}
                className="affiliation-slider"
              >
                {images.map((img) => (
                  <SwiperSlide
                    key={img.id}
                    className="flex items-center justify-center"
                    style={{ width: 'auto' }}
                  >
                    <div className="group relative flex items-center justify-center h-28 md:h-32 lg:h-36 px-2">
                      {/* Card Container with Shadow and Border */}
                      <div className="absolute inset-0 bg-white rounded-xl shadow-lg border border-gray-200 group-hover:shadow-xl group-hover:border-blue-100 transition-all duration-300"></div>
                      
                      {/* Logo Container */}
                      <div className="relative z-10 p-4 md:p-6">
                        <img
                          src={img.src}
                          alt={img.title}
                          className="max-h-16 md:max-h-20 lg:max-h-24 w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 filter grayscale group-hover:grayscale-0"
                          draggable={false}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/200x100/FFFFFF/6366F1?text=Logo";
                            e.target.className = "max-h-20 w-auto object-contain opacity-80";
                          }}
                        />
                        
                        {/* Tooltip on Hover */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                          {img.title}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Navigation Indicator */}
              <div className="flex justify-center items-center mt-8">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => swiperRef.current?.swiper?.slidePrev()}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Previous slide"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="h-1 w-8 bg-gray-300 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full animate-slide"
                      style={{ animationDuration: '4s' }}
                    ></div>
                  </div>
                  <button
                    onClick={() => swiperRef.current?.swiper?.slideNext()}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Next slide"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center p-12 bg-gray-50 rounded-xl">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 text-lg">No affiliations available</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-slide {
          animation: slide linear infinite;
        }
        
        /* Smooth hover effects */
        .affiliation-slider .swiper-slide {
          transition: transform 0.3s ease;
        }
        
        .affiliation-slider .swiper-slide:hover {
          transform: translateY(-5px);
        }
        
        /* Custom scrollbar for slider */
        .affiliation-slider::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Affilation;