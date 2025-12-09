import React from 'react'

import Hero from '../components/Hero'
import Affilation from '../components/Affilation'
import WhyIfbb from '../components/WhyIfbb'

 
import FooterBanner from '../components/FooterBanner'
import Contact from '../components/Contact'
import AboutIfbb from '../components/AboutIfbb'

import HeroModel from "../assets/heroModel.png";
import Testimonials from '../components/home/Testimonials'
import ParallaxHero from '../components/home/ParallaxHero'
import EnrollmentCallToAction from '../components/home/EnrollmentCallToAction'

const Home = () => {
  return (
    <>
    

        <Hero title={"TRANSFORM YOUR LIFE WITH IFBB ACADEMY"}
          HeroModel={HeroModel}
        />
        <Affilation />
        <EnrollmentCallToAction />
        <AboutIfbb />
        <WhyIfbb />
        <Testimonials />
        <ParallaxHero />
        {/* <Trainers /> */}
        {/* <JoinCourse /> */}
        {/* <LevelBanner /> */}
        <Contact />
        <FooterBanner />
     


   
    </>
  )
}

export default Home
