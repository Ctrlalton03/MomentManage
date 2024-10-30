import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, FileText } from "lucide-react"
import type { Feature } from "@/types"
import featuresStyles from '../../styles/modules/features.module.css'

const features: Feature[] = [
  {
    icon: CheckCircle,
    title: "Smart To-Do Lists",
    description: "Create, prioritize, and manage tasks with ease. Stay organized and boost your productivity."
  },
  {
    icon: Calendar,
    title: "Intuitive Calendar",
    description: "Seamlessly plan your schedule and never miss an important event or deadline."
  },
  {
    icon: FileText,
    title: "Comprehensive Notes",
    description: "Capture ideas, create detailed notes, and access them from anywhere, anytime."
  }
]

const FeaturesSection: React.FC = () => {
  return (
    <section className={featuresStyles['features-section']}>
      <div className="container mx-auto px-4">
        <h2 className={featuresStyles['features-section-heading']}>
          Powerful Features for Effortless Organization
        </h2>
        <div className={featuresStyles['features-grid']}>
          {features.map((feature, index) => (
            <Card key={index} className={featuresStyles['feature-card']}>
              <CardHeader>
                <feature.icon className={featuresStyles['feature-icon']} />
                <CardTitle className={featuresStyles['feature-title']}>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={featuresStyles['feature-description']}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection