"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Phone,
  Mail,
  Menu,
  Building,
  Clock,
  Shield,
  Award,
  Globe,
  Heart,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

export default function GlocalHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const featuredPackages = [
    {
      id: 1,
      title: "Premium Umrah Package",
      duration: "14 Days",
      price: "RM 8,500",
      originalPrice: "RM 9,200",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
      reviews: 124,
      features: ["5-Star Hotels", "Direct Flights", "Guided Tours", "Meals Included"],
      availableSeats: 12,
      nextDeparture: "15 Jan 2025",
    },
    {
      id: 2,
      title: "Economy Umrah Package",
      duration: "10 Days",
      price: "RM 5,800",
      originalPrice: "RM 6,500",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.6,
      reviews: 89,
      features: ["4-Star Hotels", "Group Flights", "Basic Tours", "Some Meals"],
      availableSeats: 8,
      nextDeparture: "22 Jan 2025",
    },
    {
      id: 3,
      title: "Hajj Package 2025",
      duration: "21 Days",
      price: "RM 18,500",
      originalPrice: "RM 20,000",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
      reviews: 67,
      features: ["Luxury Hotels", "VIP Services", "Full Board", "Private Transport"],
      availableSeats: 3,
      nextDeparture: "May 2025",
    },
  ]

  const destinations = [
    { name: "Makkah", country: "Saudi Arabia", packages: 15, image: "/placeholder.svg?height=200&width=300" },
    { name: "Madinah", country: "Saudi Arabia", packages: 12, image: "/placeholder.svg?height=200&width=300" },
    { name: "Istanbul", country: "Turkey", packages: 8, image: "/placeholder.svg?height=200&width=300" },
    { name: "Cairo", country: "Egypt", packages: 6, image: "/placeholder.svg?height=200&width=300" },
  ]

  const testimonials = [
    {
      name: "Ahmad Rahman",
      location: "Kuala Lumpur",
      rating: 5,
      comment:
        "Excellent service and well-organized trip. The team was very professional and helpful throughout our Umrah journey.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Siti Nurhaliza",
      location: "Johor Bahru",
      rating: 5,
      comment:
        "Amazing experience! Everything was perfectly arranged from flights to accommodation. Highly recommended!",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Muhammad Ali",
      location: "Penang",
      rating: 4,
      comment: "Great value for money. The guides were knowledgeable and the hotels were comfortable.",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-md shadow-2xl border-b border-yellow-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-yellow-500/50 transition-all duration-300 group-hover:scale-110">
                <Globe className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Glocal Travel
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-white hover:text-yellow-400 transition-colors relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <div className="relative group">
                <button className="px-3 py-2 text-sm font-medium text-white hover:text-yellow-400 transition-colors flex items-center relative">
                  About
                  <svg
                    className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-black/95 backdrop-blur-md border border-yellow-500/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-2">
                  <div className="py-2">
                    <Link
                      href="/ceo-speech"
                      className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                    >
                      CEO Speech
                    </Link>
                    <Link
                      href="/vision-mission"
                      className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                    >
                      Vision & Mission
                    </Link>
                    <Link
                      href="/organization"
                      className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                    >
                      Organization
                    </Link>
                    <Link
                      href="/awards"
                      className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                    >
                      Awards
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <button className="px-3 py-2 text-sm font-medium text-white hover:text-yellow-400 transition-colors flex items-center relative">
                  Packages
                  <svg
                    className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
                </button>
                <div className="absolute top-full left-0 mt-1 w-40 bg-black/95 backdrop-blur-md border border-yellow-500/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-2">
                  <div className="py-2">
                    <Link
                      href="/hajj-packages"
                      className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                    >
                      Hajj Packages
                    </Link>
                    <Link
                      href="/umrah-packages"
                      className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                    >
                      Umrah Packages
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <button className="px-3 py-2 text-sm font-medium text-white hover:text-yellow-400 transition-colors flex items-center relative">
                  Destinations
                  <svg
                    className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
                </button>
                <div className="absolute top-full left-0 mt-1 w-36 bg-black/95 backdrop-blur-md border border-yellow-500/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-2">
                  <div className="py-2">
                    <Link
                      href="/destinations/asia"
                      className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                    >
                      Asia
                    </Link>
                    <Link
                      href="/destinations/middle-east"
                      className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                    >
                      Middle East
                    </Link>
                    <Link
                      href="/destinations/europe"
                      className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                    >
                      Europe
                    </Link>
                    <Link
                      href="/destinations/africa"
                      className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                    >
                      Africa
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/agent-enrollment"
                className="px-3 py-2 text-sm font-medium text-white hover:text-yellow-400 transition-colors relative group"
              >
                Agents
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                href="/contact"
                className="px-3 py-2 text-sm font-medium text-white hover:text-yellow-400 transition-colors relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all duration-300 bg-transparent"
                asChild
              >
                <Link href="/agent-login">Agent Login</Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600 font-semibold shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="/book-now">Book Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white hover:text-yellow-400">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-black border-yellow-500/20">
                <nav className="flex flex-col space-y-4 mt-6">
                  <Link
                    href="/"
                    className="text-lg font-medium py-2 border-b border-yellow-500/20 text-white hover:text-yellow-400 transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="text-lg font-medium py-2 border-b border-yellow-500/20 text-white hover:text-yellow-400 transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/hajj-packages"
                    className="text-lg font-medium py-2 border-b border-yellow-500/20 text-white hover:text-yellow-400 transition-colors"
                  >
                    Hajj Packages
                  </Link>
                  <Link
                    href="/umrah-packages"
                    className="text-lg font-medium py-2 border-b border-yellow-500/20 text-white hover:text-yellow-400 transition-colors"
                  >
                    Umrah Packages
                  </Link>
                  <Link
                    href="/destinations"
                    className="text-lg font-medium py-2 border-b border-yellow-500/20 text-white hover:text-yellow-400 transition-colors"
                  >
                    Destinations
                  </Link>
                  <Link
                    href="/agent-enrollment"
                    className="text-lg font-medium py-2 border-b border-yellow-500/20 text-white hover:text-yellow-400 transition-colors"
                  >
                    Agent Enrollment
                  </Link>
                  <Link
                    href="/contact"
                    className="text-lg font-medium py-2 border-b border-yellow-500/20 text-white hover:text-yellow-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                  <div className="pt-4 space-y-3">
                    <Button
                      variant="outline"
                      className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent"
                      asChild
                    >
                      <Link href="/agent-login">Agent Login</Link>
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600"
                      asChild
                    >
                      <Link href="/book-now">Book Now</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 animate-fade-in-up">
              <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-spin-slow" />
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent animate-fade-in-up delay-200">
              Your Spiritual Journey Begins Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-fade-in-up delay-400">
              Experience the sacred pilgrimage of Hajj and Umrah with our expertly crafted packages
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-600">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600 font-semibold shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300"
              >
                <Calendar className="mr-2 h-5 w-5" />
                View Packages
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all duration-300 bg-transparent"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Availability Banner */}
      <section className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-b border-yellow-500/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-4 text-yellow-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"></div>
              <span className="font-medium">Live Updates:</span>
            </div>
            <span className="text-white">12 seats available for Premium Umrah Package</span>
            <Button
              size="sm"
              variant="outline"
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all duration-300 bg-transparent"
            >
              View Details
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Featured Packages
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose from our carefully curated packages designed to provide you with a memorable spiritual experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg, index) => (
              <Card
                key={pkg.id}
                className="overflow-hidden hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 bg-gray-900/50 backdrop-blur-sm border-yellow-500/20 group transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative">
                  <Image
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold shadow-lg">
                    {pkg.availableSeats} seats left
                  </Badge>
                  <Badge className="absolute top-4 right-4 bg-red-600 shadow-lg">
                    Save RM{" "}
                    {Number.parseInt(pkg.originalPrice.replace("RM ", "").replace(",", "")) -
                      Number.parseInt(pkg.price.replace("RM ", "").replace(",", ""))}
                  </Badge>
                </div>

                <CardHeader className="text-white">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{pkg.title}</CardTitle>
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                        {pkg.price}
                      </div>
                      <div className="text-sm text-gray-500 line-through">{pkg.originalPrice}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {pkg.rating} ({pkg.reviews})
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="text-white">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 mr-2 text-yellow-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Next Departure:</span>
                      <span className="font-medium text-yellow-400">{pkg.nextDeparture}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600 font-semibold shadow-lg hover:shadow-yellow-500/50 transition-all duration-300">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-full max-w-[90vw] sm:max-w-lg md:max-w-xl max-h-[80vh] overflow-y-auto p-4 sm:p-6 bg-gray-900 border-yellow-500/20 text-white">
                          <DialogHeader>
                            <DialogTitle className="text-lg sm:text-xl text-yellow-400">{pkg.title}</DialogTitle>
                            <DialogDescription className="text-sm sm:text-base text-gray-300">
                              Complete package details and booking information
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 sm:space-y-6">
                            <Image
                              src={pkg.image || "/placeholder.svg"}
                              alt={pkg.title}
                              width={600}
                              height={300}
                              className="w-full h-auto max-h-48 sm:max-h-64 object-cover rounded-lg"
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                              <div>
                                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-yellow-400">
                                  Package Includes:
                                </h4>
                                <ul className="space-y-1 sm:space-y-2">
                                  {pkg.features.map((feature, index) => (
                                    <li key={index} className="flex items-center text-xs sm:text-sm">
                                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-yellow-400" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-yellow-400">
                                  Availability:
                                </h4>
                                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                                  <div className="flex justify-between">
                                    <span>Available Seats:</span>
                                    <span className="font-medium text-yellow-400">{pkg.availableSeats}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Next Departure:</span>
                                    <span className="font-medium">{pkg.nextDeparture}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Duration:</span>
                                    <span className="font-medium">{pkg.duration}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                              <Button
                                size="sm"
                                className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600 text-sm sm:text-base font-semibold"
                              >
                                Book Now - {pkg.price}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black text-sm sm:text-base bg-transparent"
                              >
                                Download Itinerary
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all duration-300 bg-transparent"
              asChild
            >
              <Link href="/packages">
                View All Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Why Choose Glocal Travel
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We are committed to providing exceptional service and unforgettable experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Licensed & Trusted",
                desc: "Fully licensed travel agency with years of experience in pilgrimage services",
              },
              {
                icon: Users,
                title: "Expert Guides",
                desc: "Knowledgeable guides who will enhance your spiritual journey",
              },
              { icon: Building, title: "Premium Hotels", desc: "Comfortable accommodations near the holy sites" },
              {
                icon: Award,
                title: "Award Winning",
                desc: "Recognized for excellence in customer service and satisfaction",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-yellow-500/30">
                  <item.icon className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Popular Muslim Destinations
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore sacred places and experience the rich Islamic heritage around the world
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 cursor-pointer bg-gray-900/50 backdrop-blur-sm border-yellow-500/20 group transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold text-yellow-400">{destination.name}</h3>
                    <p className="text-sm opacity-90">{destination.country}</p>
                    <p className="text-sm opacity-90">{destination.packages} packages available</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                What Our Pilgrims Say
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Read testimonials from our satisfied customers who have experienced the journey of a lifetime
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 bg-gray-900/50 backdrop-blur-sm border-yellow-500/20 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="space-y-4 text-white">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.comment}"</p>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="w-12 h-12 rounded-full object-cover border-2 border-yellow-500/50"
                    />
                    <div>
                      <div className="font-semibold text-yellow-400">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-amber-600 text-black relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Begin Your Spiritual Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contact us today to book your Hajj or Umrah package and experience the journey of a lifetime
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black text-yellow-400 hover:bg-gray-900 font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call +60 12-903 4966
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-yellow-400 font-semibold transition-all duration-300 bg-transparent"
            >
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-yellow-500/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-black" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Glocal Travel
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner for Hajj and Umrah pilgrimages. Creating meaningful spiritual journeys since 2010.
              </p>
              <div className="flex space-x-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent"
                >
                  Facebook
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent"
                >
                  Instagram
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-yellow-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/hajj-packages" className="hover:text-yellow-400 transition-colors">
                    Hajj Packages
                  </Link>
                </li>
                <li>
                  <Link href="/umrah-packages" className="hover:text-yellow-400 transition-colors">
                    Umrah Packages
                  </Link>
                </li>
                <li>
                  <Link href="/destinations" className="hover:text-yellow-400 transition-colors">
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link href="/agent-enrollment" className="hover:text-yellow-400 transition-colors">
                    Become an Agent
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/visa-assistance" className="hover:text-yellow-400 transition-colors">
                    Visa Assistance
                  </Link>
                </li>
                <li>
                  <Link href="/travel-insurance" className="hover:text-yellow-400 transition-colors">
                    Travel Insurance
                  </Link>
                </li>
                <li>
                  <Link href="/group-bookings" className="hover:text-yellow-400 transition-colors">
                    Group Bookings
                  </Link>
                </li>
                <li>
                  <Link href="/umrah-courses" className="hover:text-yellow-400 transition-colors">
                    Umrah Courses
                  </Link>
                </li>
                <li>
                  <Link href="/customer-support" className="hover:text-yellow-400 transition-colors">
                    24/7 Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Contact Info</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-yellow-400" />
                  +60 12-903 4966
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-yellow-400" />
                  info@glocal.com.my
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-1 text-yellow-400" />
                  <div>
                    123 Jalan Ampang,
                    <br />
                    50450 Kuala Lumpur,
                    <br />
                    Malaysia
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-yellow-500/20" />

          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p>&copy; 2025 Glocal Travel. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-yellow-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-yellow-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-yellow-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
        
        .delay-400 {
          animation-delay: 400ms;
        }
        
        .delay-600 {
          animation-delay: 600ms;
        }
        
        .delay-1000 {
          animation-delay: 1000ms;
        }
        
        .delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </div>
  )
}
