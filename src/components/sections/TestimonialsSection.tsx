import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { Testimonial } from "@/types"
import testimonialStyles from "../../styles/modules/testimonial.module.css"
const testimonials: Testimonial[] = [
  {
    profilePicture: "/images/Profile1.jpg",
    name: "Alex Johnson",
    role: "Entrepreneur",
    quote: "Moment Manager has revolutionized how I organize my business and personal life. It's intuitive, powerful, and keeps me on track."
  },
  {
    profilePicture: "/images/Profile2.jpg",
    name: "Sarah Lee",
    role: "Project Manager",
    quote: "The seamless integration of to-do lists, calendar, and notes has significantly improved my team's productivity. A game-changer!"
  },
  {
    profilePicture: "/images/Profile3.jpg",
    name: "Michael Chen",
    role: "Student",
    quote: "As a busy student, Moment Manager helps me balance my studies, part-time job, and social life effortlessly. Couldn't imagine life without it!"
  }
]

const TestimonialsSection: React.FC = () => {
  return (
    <section className={testimonialStyles['testimonial-section']}>
  <h2 className={testimonialStyles['testimonial-section-heading']}>
    What Our Customers Say
  </h2>
  
  <div className={testimonialStyles['testimonial-grid']}>
    {testimonials.map((testimonial, index) => (
      <Card key={index} className={testimonialStyles['testimonial-card']}>
        <CardContent>
          <p className={testimonialStyles['testimonial-description']}>
            {testimonial.quote}
          </p>
        </CardContent>
        <CardHeader>
          <div className={testimonialStyles['testimonial-title-container']}>
            <CardTitle className={testimonialStyles['testimonial-title']}>
                <img 
                    src={testimonial.profilePicture} 
                    alt={`${testimonial.name}'s profile`}
                    className={testimonialStyles['testimonial-profile-image']}
                />
                {testimonial.name}
            </CardTitle>
          </div>
        </CardHeader>
      </Card>
    ))}
  </div>
</section>
  )
}

export default TestimonialsSection