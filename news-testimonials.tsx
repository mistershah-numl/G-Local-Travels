"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote, Calendar, MapPin, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Testimonial type definition
type Testimonial = {
  id: number
  name: string
  location: string
  image: string
  rating: number
  date: string
  packageName: string
  comment: string
  tripType: string
}

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [direction, setDirection] = useState(0)

  // Sample testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Ahmad Rahman",
      location: "Kuala Lumpur",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "January 2025",
      packageName: "Premium Umrah Package",
      comment:
        "Alhamdulillah, our Umrah journey with Glocal Travel was exceptional. The accommodations were excellent, and the guides were knowledgeable and patient. Everything was well-organized from start to finish. I highly recommend their services to anyone planning their pilgrimage.",
      tripType: "Umrah",
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      location: "Johor Bahru",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "December 2024",
      packageName: "Family Umrah Package",
      comment:
        "Traveling with my entire family for Umrah was made so easy thanks to Glocal Travel. The staff was attentive to our needs, especially with our elderly parents and young children. The hotels were conveniently located near the holy sites, making our journey comfortable and spiritually fulfilling.",
      tripType: "Umrah",
    },
    {
      id: 3,
      name: "Muhammad Ali",
      location: "Penang",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4,
      date: "November 2024",
      packageName: "Istanbul & Umrah Package",
      comment:
        "The combined Istanbul and Umrah package was a perfect blend of cultural exploration and spiritual journey. The transition between destinations was seamless, and the guides in both locations were excellent. I particularly appreciated the historical context provided during our visits to Islamic sites in Istanbul.",
      tripType: "Combined Tour",
    },
    {
      id: 4,
      name: "Fatimah Abdullah",
      location: "Kota Kinabalu",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "October 2024",
      packageName: "Hajj Package 2024",
      comment:
        "Alhamdulillah for the opportunity to perform Hajj with Glocal Travel. Despite the challenges of the large crowds, their team managed everything professionally. The pre-departure training sessions were invaluable in preparing us mentally and spiritually. May Allah accept our Hajj and bless Glocal Travel for their excellent service.",
      tripType: "Hajj",
    },
    {
      id: 5,
      name: "Hassan Ibrahim",
      location: "Kuching",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "September 2024",
      packageName: "Egypt & Umrah Package",
      comment:
        "The Egypt and Umrah combined package exceeded my expectations. The historical sites in Egypt were fascinating, and the transition to our spiritual journey in Makkah and Madinah was perfectly timed. The accommodations in both countries were excellent, and the guides were knowledgeable and friendly.",
      tripType: "Combined Tour",
    },
  ]

  // Handle next/previous navigation
  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoplay) {
      interval = setInterval(() => {
        setDirection(1)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoplay, testimonials.length])

  // Variants for animation
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  // Get testimonials for display (current, previous, next)
  const currentTestimonial = testimonials[currentIndex]
  const nextIndex = (currentIndex + 1) % testimonials.length
  const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length

  return (
    <div className="relative py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Pilgrims Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Read testimonials from our satisfied customers who have experienced the journey of a lifetime
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-20 h-20 text-emerald-200 opacity-50">
            <Quote size={80} />
          </div>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 text-emerald-200 opacity-50 transform rotate-180">
            <Quote size={80} />
          </div>

          {/* Main carousel */}
          <div className="relative overflow-hidden rounded-xl bg-white shadow-lg p-6 md:p-10 min-h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 p-6 md:p-10"
              >
                <div className="grid md:grid-cols-3 gap-8 h-full">
                  {/* Customer image and info */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-32 h-32 mb-4">
                      <Image
                        src={currentTestimonial.image || "/placeholder.svg"}
                        alt={currentTestimonial.name}
                        fill
                        className="rounded-full object-cover border-4 border-emerald-100"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                        <div className="flex items-center bg-emerald-50 rounded-full px-2 py-1">
                          {[...Array(currentTestimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{currentTestimonial.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{currentTestimonial.location}</span>
                    </div>
                    <Badge variant="outline" className="mb-2">
                      {currentTestimonial.tripType}
                    </Badge>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {currentTestimonial.date}
                    </div>
                  </div>

                  {/* Testimonial content */}
                  <div className="md:col-span-2 flex flex-col justify-center">
                    <div className="mb-4">
                      <Badge variant="secondary" className="mb-2">
                        {currentTestimonial.packageName}
                      </Badge>
                    </div>
                    <p className="text-gray-600 italic text-lg leading-relaxed mb-6">"{currentTestimonial.comment}"</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation controls */}
            <div className="absolute bottom-6 right-6 flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={handlePrevious}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => setAutoplay(!autoplay)}
                aria-label={autoplay ? "Pause autoplay" : "Start autoplay"}
              >
                {autoplay ? (
                  <span className="h-3 w-3 bg-emerald-600 rounded-sm" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={handleNext}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Testimonial indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-emerald-600 w-6" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Preview cards (visible on larger screens) */}
          <div className="hidden lg:flex justify-between mt-8 space-x-4">
            <Card
              className="w-64 cursor-pointer opacity-70 hover:opacity-100 transition-all transform hover:-translate-y-1"
              onClick={() => {
                setDirection(-1)
                setCurrentIndex(prevIndex)
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Image
                    src={testimonials[prevIndex].image || "/placeholder.svg"}
                    alt={testimonials[prevIndex].name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium text-sm">{testimonials[prevIndex].name}</p>
                    <div className="flex">
                      {[...Array(testimonials[prevIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-3">"{testimonials[prevIndex].comment}"</p>
              </CardContent>
            </Card>

            <Card
              className="w-64 cursor-pointer opacity-70 hover:opacity-100 transition-all transform hover:-translate-y-1"
              onClick={() => {
                setDirection(1)
                setCurrentIndex(nextIndex)
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Image
                    src={testimonials[nextIndex].image || "/placeholder.svg"}
                    alt={testimonials[nextIndex].name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium text-sm">{testimonials[nextIndex].name}</p>
                    <div className="flex">
                      {[...Array(testimonials[nextIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-3">"{testimonials[nextIndex].comment}"</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Have you traveled with us? Share your experience!</p>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <User className="mr-2 h-4 w-4" />
            Submit Your Testimonial
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TestimonialsCarousel
