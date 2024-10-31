import React, { useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import heroStyles from '../../styles/modules/hero.module.css'

const HeroSection: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkIsMobile = () => {
          setIsMobile(window.innerWidth <= 768);
        };
        
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        
        return () => window.removeEventListener('resize', checkIsMobile);
      }, []);



  return (
    <section className={heroStyles['hero-section']}>
      <div className={heroStyles['hero-content']}>
        <div className={heroStyles['hero-title']}>
          Welcome to Moment Manager
        </div>
        <div className={heroStyles['hero-subtitle']}>
          Your Personal Time Management Solution
        </div>
        <p className={heroStyles['hero-description']}>
          {isMobile ? (
              "Streamline your life with Moment Manager. Create to-do lists, manage your calendar, and keep notes all in one intuitive platform. "
          ): (
              "Welcome to Moment Manager, your ultimate tool for effortlessly scheduling events and managing your calendar. Whether you're organizing a family gathering, coordinating a work project, or planning a social event, Moment Manager streamlines the process with its intuitive interface and smart features. Keep track of important dates, set reminders, and share your schedule with ease, all from one centralized platform. Embrace simplicity and stay on top of your plans with Moment Manager, where every moment counts"
          )}
        </p>
        <div className={heroStyles['hero-actions']}>
          <Button className={heroStyles['hero-button']}>
            Get Started
          </Button>
          <Button className={heroStyles['hero-button-white']}>
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection