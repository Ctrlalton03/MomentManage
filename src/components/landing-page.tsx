import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, FileText, Menu } from "lucide-react"

interface Feature {
  icon: React.ElementType
  title: string
  description: string
}

interface Testimonial {
  name: string
  role: string
  quote: string
}

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

const testimonials: Testimonial[] = [
  {
    name: "Alex Johnson",
    role: "Entrepreneur",
    quote: "Moment Manager has revolutionized how I organize my business and personal life. It's intuitive, powerful, and keeps me on track."
  },
  {
    name: "Sarah Lee",
    role: "Project Manager",
    quote: "The seamless integration of to-do lists, calendar, and notes has significantly improved my team's productivity. A game-changer!"
  },
  {
    name: "Michael Chen",
    role: "Student",
    quote: "As a busy student, Moment Manager helps me balance my studies, part-time job, and social life effortlessly. Couldn't imagine life without it!"
  }
]

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <header className="sticky top-0 z-10 bg-zinc-800 border-b border-zinc-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link className="flex items-center justify-center" to="#">
            <span className="text-2xl font-bold text-white">
              Moment Manager
            </span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link className="text-sm font-medium text-zinc-300 hover:text-white transition-colors" to="#features">
              Features
            </Link>
            <Link className="text-sm font-medium text-zinc-300 hover:text-white transition-colors" to="#testimonials">
              Testimonials
            </Link>
            <Button variant="outline" className="text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors">
              Log In
            </Button>
          </nav>
          <Button className="md:hidden" variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-white">
            Manage Your Moments with Ease
          </h1>
          <p className="max-w-[700px] text-zinc-300 text-lg md:text-xl mb-8">
            Streamline your life with Moment Manager. Create to-do lists, manage your calendar, and keep notes all in one intuitive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-lg px-8 py-3">
              Get Started
            </Button>
            <Button variant="outline" className="text-blue-400 hover:bg-blue-900/50 transition-colors text-lg px-8 py-3">
              Learn More
            </Button>
          </div>
        </section>
        <section id="features" className="py-24 md:py-32 bg-zinc-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
              Powerful Features for Effortless Organization
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="bg-zinc-700 border-zinc-600 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md hover:bg-zinc-600">
                  <CardHeader>
                    <feature.icon className="w-10 h-10 text-blue-400 mb-4" />
                    <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="testimonials" className="py-24 md:py-32 bg-zinc-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
              What Our Users Say
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-zinc-800 border-zinc-700 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md hover:bg-zinc-700">
                  <CardContent className="pt-6">
                    <p className="text-zinc-300 mb-4 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-zinc-600 mr-3"></div>
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-zinc-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 py-24 md:py-32 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Ready to Transform Your Productivity?
          </h2>
          <p className="max-w-[600px] mx-auto text-zinc-300 text-lg md:text-xl mb-8">
            Join thousands of users who have already revolutionized their daily organization with Moment Manager.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-lg px-8 py-3">
            Get Started for Free
          </Button>
        </section>
      </main>
      <footer className="bg-zinc-800 border-t border-zinc-700 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-zinc-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Moment Manager. All rights reserved.
          </p>
          <nav className="flex gap-6">
            <Link className="text-sm text-zinc-400 hover:text-white transition-colors" to="#">
              Terms of Service
            </Link>
            <Link className="text-sm text-zinc-400 hover:text-white transition-colors" to="#">
              Privacy Policy
            </Link>
            <Link className="text-sm text-zinc-400 hover:text-white transition-colors" to="#">
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage