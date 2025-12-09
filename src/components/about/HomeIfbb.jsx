import React from 'react'
import AboutImg from "/about2.png"

const HomeIfbb = () => {

    const about = [{
        title: "About IFFB Academy",
        desc: "IFBB Australia is the official Australian branch of the International Federation of Bodybuilding and Fitness. It oversees bodybuilding and fitness competitions across the country and promotes professional standards in training and coaching. IFBB Australia also offers internationally recognized certifications for personal trainers and fitness professionals, making it a trusted name in the Australian fitness industry."
    }, {
        title: "Our Mission",
       
        desc: "To educate and empower individual with a deep understanding of fitness and bodybuilding principles while adhering to global standards of excellence and professionalism."
    }]
    return (
        <div className='max-w-6xl mx-auto roboto flex max-md:flex-col-reverse items-center justify-between   lg:gap-10 gap-6 px-8 md:py-10 py-6'>

            <div className='w-full md:w-1/2 flex flex-col gap-10'>
                {about.map((a, index) => (
                    <div key={index} className='max-w-lg flex flex-col gap-6' >
                        <h2 className='text-zinc-900 font-bold md:text-3xl text-2xl'>{a.title}</h2>
                        <p className='text-zinc-600 md:text-lg font-normal'>{a.desc} </p>
                    </div>
                ))}



            </div>

            <div className='w-full md:w-1/2 flex items-center justify-center'>
                <div className="md:h-[600px] h-full md:max-w-[400px] w-full overflow-hidden rounded-2xl">
                    <img src={AboutImg} alt="" className='h-full w-full object-cover' />
                </div>

            </div>
        </div>
    )
}

export default HomeIfbb
