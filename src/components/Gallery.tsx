import React, { useEffect, useState, useCallback } from "react";

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1558611848-73f7eb4001d5?auto=format&fit=crop&w=1600&q=80",
    alt: "Bodybuilder posing - muscular fitness model",
    caption: "Power pose — strength & discipline",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1546484959-f6f8f0b5d5f6?auto=format&fit=crop&w=1600&q=80",
    alt: "Weightlifting fitness model",
    caption: "Heavy lifts, correct form",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80",
    alt: "Athletic man stretching",
    caption: "Dynamic stretching",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1517960413843-0aee4a6a63f0?auto=format&fit=crop&w=1600&q=80",
    alt: "Bodybuilder bench press",
    caption: "Chest day — focused",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1526403224749-8f8a6b8f0f0f?auto=format&fit=crop&w=1600&q=80",
    alt: "Fitness model outdoor workout",
    caption: "Outdoor grind",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80",
    alt: "Gym training closeup",
    caption: "Intensity closeup",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&w=1600&q=80",
    alt: "Fit bodybuilder posing side",
    caption: "Defined silhouette",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1600&q=80",
    alt: "Strong fitness athlete",
    caption: "Strength & focus",
  },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});
  const active = images[activeIndex];

  const preload = useCallback((idx) => {
    const img = new Image();
    img.src = images[(idx + 1) % images.length].src;
    const img2 = new Image();
    img2.src = images[(idx - 1 + images.length) % images.length].src;
  }, []);

  useEffect(() => {
    setLoading(true);
    const img = new Image();
    img.src = active.src;
    img.onload = () => {
      setLoading(false);
      preload(activeIndex);
    };
  }, [activeIndex, active.src, preload]);

  useEffect(() => {
    function onKey(e) {
      if (!isModalOpen) return;
      if (e.key === "Escape") {
        setIsModalOpen(false);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((i) => (i + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((i) => (i - 1 + images.length) % images.length);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen]);

  const openModal = (idx) => {
    setActiveIndex(idx);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header with modern gradient */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
            FITNESS GALLERY
          </h1>
          <p className="text-lg text-gray-300 font-light tracking-wide">
            Strength • Discipline • Transformation
          </p>
        </div>

        {/* Featured Image Card with Glass Effect */}
        <div className="mb-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <button
                className="w-full focus:outline-none"
                onClick={() => setIsModalOpen(true)}
                aria-label={`Open active image: ${active.alt}`}
              >
                <div className="relative aspect-[16/9] bg-slate-900">
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={active.src}
                    alt={active.alt}
                    loading="eager"
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      loading ? "opacity-0 scale-105" : "opacity-100 scale-100"
                    }`}
                  />
                  
                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-transparent to-pink-500/0 group-hover:from-orange-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
                  
                  {/* Caption with Glass Effect */}
                  <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md border border-white/20 text-white rounded-xl px-5 py-3 shadow-xl">
                    <p className="text-lg font-bold">{active.caption}</p>
                  </div>
                  
                  {/* Counter Badge */}
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-4 py-2 text-sm font-bold shadow-lg">
                    {activeIndex + 1} / {images.length}
                  </div>
                  
                  {/* Expand Icon */}
                  <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <button
            onClick={goPrev}
            className="group relative px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            aria-label="Previous"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              PREV
            </span>
          </button>
          
          <button
            onClick={goNext}
            className="group relative px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            aria-label="Next"
          >
            <span className="flex items-center gap-2">
              NEXT
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <div
                key={img.id}
                className="group relative"
              >
                <div className={`absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl blur transition-all duration-300 ${
                  isSelected ? "opacity-75" : "opacity-0 group-hover:opacity-50"
                }`}></div>
                
                <button
                  onClick={() => setActiveIndex(idx)}
                  onDoubleClick={() => openModal(idx)}
                  className={`relative w-full rounded-2xl overflow-hidden transform transition-all duration-300 focus:outline-none ${
                    isSelected ? "scale-105 ring-4 ring-orange-500" : "hover:scale-105"
                  }`}
                  aria-pressed={isSelected}
                  title={`${img.alt} — click to select, double-click to open`}
                >
                  <div className="relative aspect-square bg-slate-900">
                    {!imageLoaded[img.id] && (
                      <div className="absolute inset-0 animate-pulse bg-slate-800"></div>
                    )}
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      onLoad={() => setImageLoaded(prev => ({...prev, [img.id]: true}))}
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm font-semibold">{img.caption}</p>
                    </div>
                    
                    {/* Selected Badge */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                        ACTIVE
                      </div>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={closeModal}
        >
          <div
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-14 right-0 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full p-3 shadow-xl transition-all duration-300 border border-white/20"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full p-4 shadow-xl transition-all duration-300 border border-white/20"
              aria-label="Previous image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full p-4 shadow-xl transition-all duration-300 border border-white/20"
              aria-label="Next image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Container */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <div className="flex items-center justify-center p-8">
                <img
                  src={active.src}
                  alt={active.alt}
                  loading="eager"
                  className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl"
                />
              </div>
              
              {/* Caption Section */}
              <div className="px-8 pb-8 text-center bg-gradient-to-t from-black/40 to-transparent">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-2">
                  {active.caption}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{active.alt}</p>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2">
                  <span className="text-white font-bold">{activeIndex + 1}</span>
                  <span className="text-gray-400">of</span>
                  <span className="text-white font-bold">{images.length}</span>
                </div>
              </div>
            </div>
            
            {/* Keyboard Hints */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-4 text-xs text-gray-400">
              <span className="bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 rounded">← → Navigate</span>
              <span className="bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 rounded">ESC Close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}