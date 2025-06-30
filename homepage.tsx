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
  const [selectedPackage, setSelectedPackage] = useState(null)

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
                <Link href="/book-now">Book Now</Link>
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
                    <Link href="/book-now">Book Now</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Your Spiritual Journey Begins Here</h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100">
              Experience the sacred pilgrimage of Hajj and Umrah with our expertly crafted packages
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                <Calendar className="mr-2 h-5 w-5" />
                View Packages
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Availability Banner */}
      <section className="bg-amber-50 border-b border-amber-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-4 text-amber-800">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Live Updates:</span>
            </div>
            <span>12 seats available for Premium Umrah Package</span>
            <Button size="sm" variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100">
              View Details
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Packages</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated packages designed to provide you with a memorable spiritual experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-emerald-600">{pkg.availableSeats} seats left</Badge>
                  <Badge className="absolute top-4 right-4 bg-red-600">
                    Save RM{" "}
                    {Number.parseInt(pkg.originalPrice.replace("RM ", "").replace(",", "")) -
                      Number.parseInt(pkg.price.replace("RM ", "").replace(",", ""))}
                  </Badge>
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{pkg.title}</CardTitle>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-600">{pkg.price}</div>
                      <div className="text-sm text-gray-500 line-through">{pkg.originalPrice}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
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

                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Next Departure:</span>
                      <span className="font-medium">{pkg.nextDeparture}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{pkg.title}</DialogTitle>
                            <DialogDescription>Complete package details and booking information</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            <Image
                              src={pkg.image || "/placeholder.svg"}
                              alt={pkg.title}
                              width={600}
                              height={300}
                              className="w-full h-64 object-cover rounded-lg"
                            />

                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-3">Package Includes:</h4>
                                <ul className="space-y-2">
                                  {pkg.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                      <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-3">Availability:</h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span>Available Seats:</span>
                                    <span className="font-medium text-emerald-600">{pkg.availableSeats}</span>
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

                            <div className="flex space-x-4">
                              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                                Book Now - {pkg.price}
                              </Button>
                              <Button variant="outline" className="flex-1">
                                Download Itinerary
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

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

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Glocal Travel</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We are committed to providing exceptional service and unforgettable experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Licensed & Trusted</h3>
              <p className="text-gray-600">
                Fully licensed travel agency with years of experience in pilgrimage services
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guides</h3>
              <p className="text-gray-600">Knowledgeable guides who will enhance your spiritual journey</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Hotels</h3>
              <p className="text-gray-600">Comfortable accommodations near the holy sites</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Award Winning</h3>
              <p className="text-gray-600">Recognized for excellence in customer service and satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Muslim Destinations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore sacred places and experience the rich Islamic heritage around the world
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Pilgrims Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Read testimonials from our satisfied customers who have experienced the journey of a lifetime
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Begin Your Spiritual Journey?</h2>
          <p className="text-xl mb-8 text-emerald-100 max-w-2xl mx-auto">
            Contact us today to book your Hajj or Umrah package and experience the journey of a lifetime
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
              <Phone className="mr-2 h-5 w-5" />
              Call +60 12-903 4966
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-emerald-600"
            >
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </Button>
          </div>
        </div>
      </section>

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
