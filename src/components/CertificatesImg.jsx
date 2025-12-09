import React from 'react'

import Basic1 from '../assets/basicC1.png'
import Basic2 from '../assets/basicC2.png'
import Basic3 from '../assets/basicC3.png'

import Advanced1 from '../assets/advancedc1.png'
import Advanced2 from '../assets/advancedc2.png'
import Advanced3 from '../assets/advancedc3.png'

import Master1 from '../assets/masterc1.png'
import Master2 from '../assets/masterc2.png'
import Master3 from '../assets/masterc3.png'

import CertificatesInfo from './CertificatesInfo'
 

const CertificatesImg = () => {
 

    const Certificates = [
        {
            title: "Personal Fitness and Trainer Specialist",
            images: [
                Basic1, Basic2, Basic3,
            ]
        },
        {
            title: "Advanced Body Building & Fitness Certification",
            images: [
                Advanced1, Advanced2, Advanced3,
            ]
        },
        {
            title: "Master in Body Building & Fitness Method Certification",
            images: [
                Master1, Master2, Master3,
            ]
        },
    ]

    return (
        <div className='h-full w-full  py-10 max-w-7xl mx-auto px-8 '>
            {Certificates.map((c, index) => (
                <div key={index} className=' py-4'>

                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold text-center roboto '>{c.title}</h1>


                    <div className=" flex max-md:flex-col items-center justify-center  gap-4  my-4">
                        {c.images.map((img, index) => (
                            <div key={index} className=' '>
                                <img src={img} alt="Affiliation And Recognition" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <CertificatesInfo />


        </div>)
}

export default CertificatesImg
