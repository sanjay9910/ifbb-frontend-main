import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import Aff1 from "/homecrousel.png"
import Aff2 from "/homecrousel2.png"
import Aff3 from "/homecrousel3.png"
import Aff4 from "/homecrousel4.png"
import Aff5 from "/homecrousel5.png"
import Aff6 from "/homecrousel6.png"
import Aff7 from "/homecrousel7.png"
import Aff8 from "/homecrousel8.png"
import Aff9 from "/homecrousel9.png"
import Aff10 from "/homecrousel10.png"
import Aff11 from "/homecrousel11.png"

const Affilation = () => {
    const images = [
        { id: 1, src: Aff1 },
        { id: 2, src: Aff2 },
        { id: 3, src: Aff3 },
        { id: 4, src: Aff4 },
        { id: 5, src: Aff5 },
        { id: 6, src: Aff6 },
        { id: 7, src: Aff7 },
        { id: 8, src: Aff8 },
        { id: 9, src: Aff9 },
        { id: 10, src: Aff10 },
        { id: 11, src: Aff11 },
    ]

    const swiperRef = useRef(null)

    return (
        <div className='h-full w-full md:py-10 py-4 relative'>
            <h1 className='md:text-5xl sm:text-3xl text-2xl font-bold text-center roboto'>
                Affiliation And Recognition
            </h1>

            {/* Custom Arrows */}
            {/* <div className="flex justify-between items-center px-10 mt-4">
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="text-3xl p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition "
                >
                    <FiArrowLeft />
                </button>
                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="text-3xl p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                    <FiArrowRight />
                </button>
            </div> */}

            <div className="py-10 px-10">
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    spaceBetween={20}
                    slidesPerView={5}
                    breakpoints={{
                        1024: { slidesPerView: 5 },
                        768: { slidesPerView: 3 },
                        480: { slidesPerView: 2 },
                        0: { slidesPerView: 1 },
                    }}
                >
                    {images.map((img) => (
                        <SwiperSlide key={img.id}>
                            <img
                                src={img.src}
                                alt="Affiliation"
                                className="w-full h-auto object-contain"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Affilation
