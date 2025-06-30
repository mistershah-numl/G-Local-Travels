"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Calendar,
  MapPin,
  Star,
  Phone,
  Mail,
  Menu,
  Building,
  Clock,
  Globe,
  Heart,
  CheckCircle,
  ArrowRight,
  Play,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  UserPlus,
  Plane,
  Bell,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function GlocalHomepageFlow() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showContactPopup, setShowContactPopup] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Show contact popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContactPopup(true)
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

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
      popular: true,
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
      popular: false,
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
      popular: false,
    },
  ]

  const testimonials = [
    {
      name: "Ahmad Rahman",
      location: "Kuala Lumpur",
      rating: 5,
      comment:
        "Excellent service and well-organized trip. The team was very professional and helpful throughout our Umrah journey. The hotels were amazing and the guides were knowledgeable.",
      image: "/placeholder.svg?height=80&width=80",
      package: "Premium Umrah Package",
    },
    {
      name: "Siti Nurhaliza",
      location: "Johor Bahru",
      rating: 5,
      comment:
        "Amazing experience! Everything was perfectly arranged from flights to accommodation. The spiritual guidance provided was invaluable. Highly recommended!",
      image: "/placeholder.svg?height=80&width=80",
      package: "Economy Umrah Package",
    },
    {
      name: "Muhammad Ali",
      location: "Penang",
      rating: 4,
      comment:
        "Great value for money. The guides were knowledgeable and the hotels were comfortable. The entire journey was smooth and well-coordinated.",
      image: "/placeholder.svg?height=80&width=80",
      package: "Hajj Package 2024",
    },
    {
      name: "Fatimah Abdullah",
      location: "Selangor",
      rating: 5,
      comment:
        "Life-changing experience! The team took care of everything. From visa processing to accommodation, everything was handled professionally.",
      image: "/placeholder.svg?height=80&width=80",
      package: "Premium Umrah Package",
    },
  ]

  const upcomingEvents = [
    {
      title: "Umrah Preparation Course - KL",
      date: "25 Jan 2025",
      time: "2:00 PM - 6:00 PM",
      location: "Glocal HQ, Kuala Lumpur",
      seats: 15,
      price: "Free",
      type: "Course",
    },
    {
      title: "Hajj Information Session",
      date: "2 Feb 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Johor Branch",
      seats: 25,
      price: "Free",
      type: "Info Session",
    },
    {
      title: "Virtual Umrah Course",
      date: "8 Feb 2025",
      time: "8:00 PM - 10:00 PM",
      location: "Online (Zoom)",
      seats: 50,
      price: "RM 50",
      type: "Online Course",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Glocal Travel</span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className="px-4 py-2 text-sm font-medium hover:text-emerald-600">
                      HOME
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>ABOUT US</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <Link
                        href="/ceo-speech"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent"
                      >
                        <div className="text-sm font-medium leading-none">CEO Speech</div>
                      </Link>
                      <Link
                        href="/vision-mission"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent"
                      >
                        <div className="text-sm font-medium leading-none">Vision And Mission</div>
                      </Link>
                      <Link
                        href="/organization"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent"
                      >
                        <div className="text-sm font-medium leading-none">Organization Structure</div>
                      </Link>
                      <Link
                        href="/latest-project"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent"
                      >
                        <div className="text-sm font-medium leading-none">Latest Project</div>
                      </Link>
                      <Link
                        href="/collaboration"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent"
                      >
                        <div className="text-sm font-medium leading-none">Latest Collaboration</div>
                      </Link>
                      <Link
                        href="/awards"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent"
                      >
                        <div className="text-sm font-medium leading-none">Awards</div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/hajj-packages" className="px-4 py-2 text-sm font-medium hover:text-emerald-600">
                      HAJJ PACKAGES
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>UMRAH PACKAGES</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[300px]">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <Link
                          key={num}
                          href={`/umrah-packages-${num}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent"
                        >
                          <div className="text-sm font-medium leading-none">Umrah Package {num}</div>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>MUSLIM DESTINATION</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[300px]">
                      <Link
                        href="/destinations/asia"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent"
                      >
                        <div className="text-sm font-medium leading-none">Asia</div>
                      </Link>
                      <Link
                        href="/destinations/central-asia"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent"
                      >
                        <div className="text-sm font-medium leading-none">Central Asia</div>
                      </Link>
                      <Link
                        href="/destinations/middle-east"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent"
                      >
                        <div className="text-sm font-medium leading-none">Middle East</div>
                      </Link>
                      <Link
                        href="/destinations/europe"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent"
                      >
                        <div className="text-sm font-medium leading-none">Europe</div>
                      </Link>
                      <Link
                        href="/destinations/africa"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent"
                      >
                        <div className="text-sm font-medium leading-none">Africa</div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/agent-enrollment" className="px-4 py-2 text-sm font-medium hover:text-emerald-600">
                      AGENT ENROLLMENT
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>NEWS</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[200px]">
                      <Link
                        href="/testimonials"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent"
                      >
                        <div className="text-sm font-medium leading-none">Testimonials</div>
                      </Link>
                      <Link
                        href="/gallery"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent"
                      >
                        <div className="text-sm font-medium leading-none">Picture Gallery</div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/contact" className="px-4 py-2 text-sm font-medium hover:text-emerald-600">
                      CONTACT US
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/agent-login">Agent Login</Link>
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/packages">Explore Packages</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  <Link href="/" className="text-lg font-medium">
                    HOME
                  </Link>
                  <Link href="/about" className="text-lg font-medium">
                    ABOUT US
                  </Link>
                  <Link href="/hajj-packages" className="text-lg font-medium">
                    HAJJ PACKAGES
                  </Link>
                  <Link href="/umrah-packages" className="text-lg font-medium">
                    UMRAH PACKAGES
                  </Link>
                  <Link href="/destinations" className="text-lg font-medium">
                    MUSLIM DESTINATION
                  </Link>
                  <Link href="/agent-enrollment" className="text-lg font-medium">
                    AGENT ENROLLMENT
                  </Link>
                  <Link href="/news" className="text-lg font-medium">
                    NEWS
                  </Link>
                  <Link href="/contact" className="text-lg font-medium">
                    CONTACT US
                  </Link>
                  <Separator />
                  <Button variant="outline" asChild>
                    <Link href="/agent-login">Agent Login</Link>
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                    <Link href="/packages">Explore Packages</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Your Sacred Journey
              <br />
              <span className="text-emerald-200">Begins Here</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100 max-w-3xl mx-auto">
              Experience the spiritual transformation of Hajj and Umrah with our expertly crafted packages. Trusted by
              thousands of pilgrims since 2010.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-4">
                <Plane className="mr-2 h-6 w-6" />
                Explore Umrah Packages
              </Button>
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-4">
                <Building className="mr-2 h-6 w-6" />
                View Hajj Packages
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-200">15+</div>
                <div className="text-sm text-emerald-100">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-200">5000+</div>
                <div className="text-sm text-emerald-100">Happy Pilgrims</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-200">50+</div>
                <div className="text-sm text-emerald-100">Package Options</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-200">24/7</div>
                <div className="text-sm text-emerald-100">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Availability Banner */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-4 text-amber-800">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <Bell className="w-4 h-4" />
              <span className="font-medium">Live Updates:</span>
            </div>
            <span className="hidden sm:inline">12 seats available for Premium Umrah Package departing Jan 15</span>
            <span className="sm:hidden">12 seats left - Premium Umrah</span>
            <Button size="sm" variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100">
              View Details
            </Button>
          </div>
        </div>
      </section>

      {/* CEO Speech Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="CEO"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Button
                    size="lg"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    <Play className="mr-2 h-6 w-6" />
                    Watch Message
                  </Button>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Message from Our CEO</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    "For over 15 years, we have been honored to guide thousands of pilgrims on their sacred journey. Our
                    commitment to excellence and spiritual guidance remains unwavering as we continue to serve the
                    Muslim community with dedication and care."
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="font-semibold text-gray-900">Dato' Ahmad Rahman</div>
                    <div className="text-gray-600">Chief Executive Officer</div>
                  </div>
                  <Button variant="outline" className="w-fit">
                    Read Full Message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision & Mission Teaser */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Vision & Mission</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Guided by Islamic principles, we strive to make the sacred pilgrimage accessible and meaningful for all
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading Islamic travel company in Southeast Asia, providing exceptional pilgrimage experiences
                that strengthen faith and create lasting spiritual connections.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To facilitate meaningful spiritual journeys through comprehensive pilgrimage services, expert guidance,
                and unwavering commitment to customer satisfaction and Islamic values.
              </p>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/vision-mission">
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Packages</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our most sought-after packages designed for different preferences and budgets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <Image
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  {pkg.popular && <Badge className="absolute top-4 left-4 bg-red-600 text-white">Most Popular</Badge>}
                  <Badge className="absolute top-4 right-4 bg-emerald-600">{pkg.availableSeats} seats left</Badge>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-2xl font-bold text-emerald-600">{pkg.price}</div>
                          <div className="text-sm text-gray-500 line-through">{pkg.originalPrice}</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{pkg.rating}</span>
                          </div>
                          <div className="text-sm text-gray-500">({pkg.reviews} reviews)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{pkg.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {pkg.nextDeparture}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {pkg.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" asChild>
                        <Link href={`/packages/${pkg.id}`}>Book Now</Link>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/packages">
                View All Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Pilgrims Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from our satisfied customers who have completed their spiritual journey with us
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 relative">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-xl text-gray-600 italic mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].comment}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <Image
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    width={80}
                    height={80}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-lg">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-500">{testimonials[currentTestimonial].location}</div>
                    <div className="text-sm text-emerald-600">{testimonials[currentTestimonial].package}</div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={nextTestimonial}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Card>

            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-emerald-600" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Access</h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Get started with our most popular services and join our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Agent Enrollment */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-colors">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl">Become an Agent</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-emerald-100 mb-6">
                  Join our network of trusted agents and earn attractive commissions while helping others fulfill their
                  spiritual journey.
                </p>
                <Button className="bg-white text-emerald-600 hover:bg-gray-100 w-full" asChild>
                  <Link href="/agent-enrollment">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Umrah Courses */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-colors">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl">Umrah Courses</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-emerald-100 mb-6">
                  Prepare for your spiritual journey with our comprehensive Umrah preparation courses available at HQ
                  and branches.
                </p>
                <Button className="bg-white text-emerald-600 hover:bg-gray-100 w-full" asChild>
                  <Link href="/umrah-courses">
                    View Courses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Popular Packages */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-colors">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl">Popular Packages</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-emerald-100 mb-6">
                  Discover our most popular Umrah and Hajj packages with exclusive deals and early bird discounts.
                </p>
                <Button className="bg-white text-emerald-600 hover:bg-gray-100 w-full" asChild>
                  <Link href="/popular-packages">
                    Explore Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our preparation courses and information sessions to enhance your pilgrimage experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant={event.type === "Online Course" ? "secondary" : "default"}>{event.type}</Badge>
                    <div className="text-right">
                      <div className="font-bold text-emerald-600">{event.price}</div>
                      <div className="text-sm text-gray-500">{event.seats} seats</div>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Register Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/events">
                View All Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Popup */}
      <Dialog open={showContactPopup} onOpenChange={setShowContactPopup}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-emerald-600" />
              Get in Touch
            </DialogTitle>
            <DialogDescription>
              Have questions about our packages? We're here to help you plan your spiritual journey.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="https://wa.me/60129034966">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="mailto:info@glocal.com.my">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Link>
              </Button>
            </div>
            <div className="space-y-3">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" />
              <Textarea placeholder="Your Message" rows={3} />
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Send Message</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Glocal Travel</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner for Hajj and Umrah pilgrimages. Creating meaningful spiritual journeys since 2010.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-800">
                  Facebook
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-800">
                  Instagram
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/hajj-packages" className="hover:text-white">
                    Hajj Packages
                  </Link>
                </li>
                <li>
                  <Link href="/umrah-packages" className="hover:text-white">
                    Umrah Packages
                  </Link>
                </li>
                <li>
                  <Link href="/destinations" className="hover:text-white">
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link href="/agent-enrollment" className="hover:text-white">
                    Become an Agent
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/visa-assistance" className="hover:text-white">
                    Visa Assistance
                  </Link>
                </li>
                <li>
                  <Link href="/travel-insurance" className="hover:text-white">
                    Travel Insurance
                  </Link>
                </li>
                <li>
                  <Link href="/group-bookings" className="hover:text-white">
                    Group Bookings
                  </Link>
                </li>
                <li>
                  <Link href="/umrah-courses" className="hover:text-white">
                    Umrah Courses
                  </Link>
                </li>
                <li>
                  <Link href="/customer-support" className="hover:text-white">
                    24/7 Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3" />
                  +60 12-903 4966
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3" />
                  info@glocal.com.my
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-1" />
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

          <Separator className="my-8 bg-gray-700" />

          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p>&copy; 2025 Glocal Travel. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-white">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
