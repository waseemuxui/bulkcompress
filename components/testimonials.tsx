import { User } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  avatar?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Photographer",
    content:
      "BulkCompress has been a game-changer for my photography business. I can quickly compress large batches of images without losing quality. Highly recommended!",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Web Developer",
    content:
      "As a web developer, I need to optimize images and assets constantly. BulkCompress saves me hours of work every week with its batch processing capabilities.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Manager",
    content:
      "Our marketing team uses BulkCompress daily to optimize content for our website and social media. The interface is intuitive and the results are excellent.",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Content Creator",
    content:
      "I've tried many compression tools, but BulkCompress offers the best balance of quality and file size reduction. It's now an essential part of my workflow.",
  },
]

export function Testimonials() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Trusted by Professionals</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            See what our users are saying about BulkCompress.com
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-sm">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
