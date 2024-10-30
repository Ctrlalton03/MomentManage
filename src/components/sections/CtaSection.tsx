import React from "react"
import { Button } from "../../components/ui/button"
import ctaStyles from "../../styles/modules/CtaSection.module.css"

const CtaSection: React.FC = () => {
  return (
    <section className={ctaStyles['cta-section']}>
      <h2 className={ctaStyles['cta-heading']}>
        Ready to Transform Your Productivity?
      </h2>
      <p className={ctaStyles['cta-description']}>
        Join thousands of users who have already revolutionized their daily organization with Moment Manager.
      </p>
      <Button className={ctaStyles['cta-button']}>
        Get Started for Free
      </Button>
    </section>
  )
}

export default CtaSection
