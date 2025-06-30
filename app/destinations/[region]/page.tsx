"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users, Star, Camera, Plane } from "lucide-react"
import NavigationHeader from "@/navigation-header"

interface DestinationPageProps {
  params: { region: string }
}

export default function DestinationPage({ params }: DestinationPageProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const regionName = params.region.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())

  const destinations = {
    "saudi-arabia": {
      name: "Saudi Arabia",
      description: "The birthplace of Islam and home to the two holiest cities",
      image: "/placeholder.svg?height=400&width=800",
      highlights: ["Makkah", "Madinah", "Jeddah", "Riyadh"],
      bestTime: "October to March",
      duration: "7-21 days",
      packages: 15,
    },
    turkey: {
      name: "Turkey",
      description: "Where East meets West with rich Islamic heritage",
      image: "/placeholder.svg?height=400&width=800",
      highlights: ["Istanbul", "Bursa", "Konya", "Cappadocia"],
      bestTime: "April to October",
      duration: "5-14 days",
      packages: 8,
    },
    egypt: {
      name: "Egypt",
      description: "Land of ancient Islamic civilization and Al-Azhar",
      image: "/placeholder.svg?height=400&width=800",
      highlights: ["Cairo", "Alexandria", "Luxor", "Aswan"],
      bestTime: "October to April",
      duration: "7-12 days",
      packages: 6,
    },
  }

  const destination = destinations[params.region as keyof typeof destinations] || destinations["saudi-arabia"]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader />

      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">{destination.name}</h1>
            <p className="text-xl mb-6">{destination.description}</p>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Best Time: {destination.bestTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{destination.packages} Packages Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          {["overview", "packages", "attractions", "gallery"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize ${
                activeTab === tab
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-600 hover:text-emerald-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
              <p className="text-gray-600 mb-6">
                Discover the spiritual and cultural richness of {destination.name}. Our carefully curated tours offer
                authentic experiences that combine religious significance with cultural exploration.
              </p>

              <h3 className="text-xl font-semibold mb-3">Key Highlights</h3>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {destination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className="font-semibold text-emerald-800 mb-2">Travel Information</h4>
                <div className="space-y-2 text-sm text-emerald-700">
                  <div>Duration: {destination.duration}</div>
                  <div>Best Time to Visit: {destination.bestTime}</div>
                  <div>Available Packages: {destination.packages}</div>
                </div>
              </div>
            </div>

            <div>
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Plane className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <div className="font-semibold">Direct Flights</div>
                    <div className="text-sm text-gray-600">Available</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Star className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <div className="font-semibold">Rating</div>
                    <div className="text-sm text-gray-600">4.8/5</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === "packages" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((pkg) => (
              <Card key={pkg} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <img
                    src={`/placeholder.svg?height=200&width=300`}
                    alt={`Package ${pkg}`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <CardTitle className="text-lg">
                    {destination.name} Explorer Package {pkg}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span>{7 + pkg} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Group Size:</span>
                      <span>15-20 people</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-bold text-emerald-600">${1200 + pkg * 200}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "attractions" && (
          <div className="grid md:grid-cols-2 gap-6">
            {destination.highlights.map((attraction, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <img
                    src={`/placeholder.svg?height=200&width=400`}
                    alt={attraction}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    {attraction}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Discover the spiritual and historical significance of {attraction}, one of the most important
                    destinations in {destination.name}.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Historical</Badge>
                    <Badge variant="secondary">Religious</Badge>
                    <Badge variant="secondary">Cultural</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((img) => (
              <div key={img} className="relative group cursor-pointer">
                <img
                  src={`/placeholder.svg?height=200&width=200`}
                  alt={`Gallery ${img}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
