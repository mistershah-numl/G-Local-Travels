"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Star } from "lucide-react"
import NavigationHeader from "@/navigation-header"
import Link from "next/link"

export default function DestinationsPage() {
  const destinations = [
    {
      id: "saudi-arabia",
      name: "Saudi Arabia",
      description: "The birthplace of Islam and home to the two holiest cities",
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Makkah", "Madinah", "Jeddah", "Riyadh"],
      bestTime: "October to March",
      packages: 15,
      rating: 4.9,
      featured: true,
    },
    {
      id: "turkey",
      name: "Turkey",
      description: "Where East meets West with rich Islamic heritage",
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Istanbul", "Bursa", "Konya", "Cappadocia"],
      bestTime: "April to October",
      packages: 8,
      rating: 4.7,
      featured: true,
    },
    {
      id: "egypt",
      name: "Egypt",
      description: "Land of ancient Islamic civilization and Al-Azhar",
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Cairo", "Alexandria", "Luxor", "Aswan"],
      bestTime: "October to April",
      packages: 6,
      rating: 4.6,
      featured: false,
    },
    {
      id: "jordan",
      name: "Jordan",
      description: "Rich Islamic history and stunning landscapes",
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Amman", "Petra", "Aqaba", "Jerash"],
      bestTime: "March to May",
      packages: 4,
      rating: 4.5,
      featured: false,
    },
    {
      id: "morocco",
      name: "Morocco",
      description: "Islamic architecture and vibrant culture",
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Casablanca", "Fez", "Marrakech", "Rabat"],
      bestTime: "April to May",
      packages: 5,
      rating: 4.4,
      featured: false,
    },
    {
      id: "malaysia",
      name: "Malaysia",
      description: "Modern Islamic nation with diverse culture",
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Kuala Lumpur", "Penang", "Malacca", "Putrajaya"],
      bestTime: "December to February",
      packages: 3,
      rating: 4.3,
      featured: false,
    },
  ]

  const featuredDestinations = destinations.filter((dest) => dest.featured)
  const otherDestinations = destinations.filter((dest) => !dest.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Explore Sacred Destinations</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover the world's most significant Islamic destinations with our expertly crafted travel experiences
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>6 Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Year-round Departures</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>41+ Packages</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Destinations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Destinations</h2>
          <p className="text-gray-600 mb-8">Our most popular spiritual travel destinations</p>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredDestinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="w-full h-64 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-emerald-600">Featured</Badge>
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{destination.name}</CardTitle>
                  <p className="text-gray-600">{destination.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Best Time:</span>
                      <span className="font-medium">{destination.bestTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available Packages:</span>
                      <span className="font-medium">{destination.packages} packages</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.slice(0, 3).map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {destination.highlights.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{destination.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Link href={`/destinations/${destination.id}`}>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Explore {destination.name}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Destinations */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Other Destinations</h2>
          <p className="text-gray-600 mb-8">More amazing places to explore</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherDestinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{destination.name}</CardTitle>
                  <p className="text-gray-600 text-sm">{destination.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Packages:</span>
                      <span className="font-medium">{destination.packages}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.slice(0, 2).map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Link href={`/destinations/${destination.id}`}>
                    <Button
                      variant="outline"
                      className="w-full bg-white text-emerald-600 border-emerald-600 hover:bg-emerald-50"
                    >
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
