"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  Star,
  Calendar,
  Clock,
  Users,
  Plane,
  Building,
  MapPin,
  Eye,
  Heart,
  X,
  Bed,
  AlertCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

// Breadcrumb Component
function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link href="/" className="hover:text-emerald-600">
        Home
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4" />
          {item.href ? (
            <Link href={item.href} className="hover:text-emerald-600">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

// Live Availability Popup Component
function LiveAvailabilityPopup({ packageData }: { packageData: any }) {
  const [selectedDate, setSelectedDate] = useState(packageData.departureDates[0])

  const getRoomAvailability = (roomType: string) => {
    const availability = packageData.roomAvailability[selectedDate.id]?.[roomType] || 0
    return availability
  }

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100
    if (percentage > 50) return "text-green-600 bg-green-50"
    if (percentage > 20) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <div className="w-80 p-4">
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">Live Availability</h4>
        <Select
          value={selectedDate.id}
          onValueChange={(value) => setSelectedDate(packageData.departureDates.find((d: any) => d.id === value))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {packageData.departureDates.map((date: any) => (
              <SelectItem key={date.id} value={date.id}>
                {date.date} - {date.duration}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">Total Seats</span>
          </div>
          <Badge className={getAvailabilityColor(selectedDate.availableSeats, selectedDate.totalSeats)}>
            {selectedDate.availableSeats}/{selectedDate.totalSeats}
          </Badge>
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-900 mb-2">Room Availability</h5>
          <div className="space-y-2">
            {Object.entries(packageData.roomTypes).map(([roomType, details]: [string, any]) => {
              const available = getRoomAvailability(roomType)
              const total = details.total
              return (
                <div key={roomType} className="flex items-center justify-between p-2 rounded border">
                  <div className="flex items-center space-x-2">
                    <Bed className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">{details.name}</div>
                      <div className="text-xs text-gray-500">{details.description}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className={getAvailabilityColor(available, total)}>
                    {available}/{total}
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>

        <div className="pt-3 border-t">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Updated 2 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Package Card Component
function PackageCard({ packageData, type }: { packageData: any; type: "hajj" | "umrah" }) {
  const [isFavorite, setIsFavorite] = useState(false)

  const nextDeparture = packageData.departureDates[0]
  const savings = packageData.originalPrice - packageData.price

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <Image
          src={packageData.image || "/placeholder.svg"}
          alt={packageData.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {packageData.popular && <Badge className="bg-red-600 text-white">Most Popular</Badge>}
          {packageData.earlyBird && <Badge className="bg-blue-600 text-white">Early Bird</Badge>}
          {savings > 0 && <Badge className="bg-green-600 text-white">Save RM {savings.toLocaleString()}</Badge>}
        </div>

        {/* Availability Status */}
        <div className="absolute top-3 right-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900"
              >
                <Users className="w-4 h-4 mr-1" />
                {nextDeparture.availableSeats} left
              </Button>
            </PopoverTrigger>
            <PopoverContent side="left" className="p-0">
              <LiveAvailabilityPopup packageData={packageData} />
            </PopoverContent>
          </Popover>
        </div>

        {/* Favorite Button */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </Button>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 line-clamp-2">{packageData.title}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {packageData.duration}
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                {packageData.rating} ({packageData.reviews})
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-600">RM {packageData.price.toLocaleString()}</div>
            {packageData.originalPrice > packageData.price && (
              <div className="text-sm text-gray-500 line-through">RM {packageData.originalPrice.toLocaleString()}</div>
            )}
            <div className="text-xs text-gray-500">per person</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Quick Details */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center">
              <Building className="w-4 h-4 mr-2 text-gray-500" />
              <span>{packageData.hotelRating}★ Hotels</span>
            </div>
            <div className="flex items-center">
              <Plane className="w-4 h-4 mr-2 text-gray-500" />
              <span>{packageData.flightIncluded ? "Flights Included" : "No Flights"}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gray-500" />
              <span>{packageData.cities.join(", ")}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
              <span>{nextDeparture.date}</span>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {packageData.features.slice(0, 3).map((feature: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {packageData.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{packageData.features.length - 3} more
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href={`/${type}-packages/${packageData.id}`}>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              Compare
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Filters Component
function PackageFilters({ filters, setFilters, onReset }: { filters: any; setFilters: any; onReset: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <X className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium text-gray-900 mb-3 block">Price Range (RM)</Label>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
              max={25000}
              min={3000}
              step={500}
              className="mb-3"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>RM {filters.priceRange[0].toLocaleString()}</span>
              <span>RM {filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Departure Dates */}
        <div>
          <Label className="text-sm font-medium text-gray-900 mb-3 block">Departure Month</Label>
          <Select
            value={filters.departureMonth}
            onValueChange={(value) => setFilters({ ...filters, departureMonth: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              <SelectItem value="2025-01">January 2025</SelectItem>
              <SelectItem value="2025-02">February 2025</SelectItem>
              <SelectItem value="2025-03">March 2025</SelectItem>
              <SelectItem value="2025-04">April 2025</SelectItem>
              <SelectItem value="2025-05">May 2025</SelectItem>
              <SelectItem value="2025-06">June 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Hotel Rating */}
        <div>
          <Label className="text-sm font-medium text-gray-900 mb-3 block">Hotel Rating</Label>
          <div className="space-y-2">
            {[5, 4, 3].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.hotelRating.includes(rating)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFilters({ ...filters, hotelRating: [...filters.hotelRating, rating] })
                    } else {
                      setFilters({ ...filters, hotelRating: filters.hotelRating.filter((r: number) => r !== rating) })
                    }
                  }}
                />
                <Label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer">
                  <div className="flex">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm">
                    {rating} Star{rating > 1 ? "s" : ""}
                  </span>
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Duration */}
        <div>
          <Label className="text-sm font-medium text-gray-900 mb-3 block">Duration</Label>
          <div className="space-y-2">
            {["7-10 days", "11-14 days", "15-18 days", "19+ days"].map((duration) => (
              <div key={duration} className="flex items-center space-x-2">
                <Checkbox
                  id={`duration-${duration}`}
                  checked={filters.duration.includes(duration)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFilters({ ...filters, duration: [...filters.duration, duration] })
                    } else {
                      setFilters({ ...filters, duration: filters.duration.filter((d: string) => d !== duration) })
                    }
                  }}
                />
                <Label htmlFor={`duration-${duration}`} className="text-sm cursor-pointer">
                  {duration}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Flight Included */}
        <div>
          <Label className="text-sm font-medium text-gray-900 mb-3 block">Flight Options</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="flight-included"
                checked={filters.flightIncluded}
                onCheckedChange={(checked) => setFilters({ ...filters, flightIncluded: checked })}
              />
              <Label htmlFor="flight-included" className="text-sm cursor-pointer">
                Flights Included
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="flight-excluded"
                checked={filters.flightExcluded}
                onCheckedChange={(checked) => setFilters({ ...filters, flightExcluded: checked })}
              />
              <Label htmlFor="flight-excluded" className="text-sm cursor-pointer">
                Flights Not Included
              </Label>
            </div>
          </div>
        </div>

        <Separator />

        {/* Package Features */}
        <div>
          <Label className="text-sm font-medium text-gray-900 mb-3 block">Package Features</Label>
          <div className="space-y-2">
            {["Guided Tours", "Meals Included", "Transport", "Visa Assistance", "Insurance"].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`feature-${feature}`}
                  checked={filters.features.includes(feature)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFilters({ ...filters, features: [...filters.features, feature] })
                    } else {
                      setFilters({ ...filters, features: filters.features.filter((f: string) => f !== feature) })
                    }
                  }}
                />
                <Label htmlFor={`feature-${feature}`} className="text-sm cursor-pointer">
                  {feature}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Package Listing Component
export default function PackageListing({ type = "umrah" }: { type?: "hajj" | "umrah" }) {
  const [filters, setFilters] = useState({
    priceRange: [3000, 25000],
    departureMonth: "all",
    hotelRating: [],
    duration: [],
    flightIncluded: false,
    flightExcluded: false,
    features: [],
  })

  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState("grid")

  // Sample package data
  const packages = [
    {
      id: 1,
      title: "Premium Umrah Package with 5-Star Hotels",
      price: 8500,
      originalPrice: 9200,
      duration: "14 Days",
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=250&width=400",
      hotelRating: 5,
      flightIncluded: true,
      cities: ["Makkah", "Madinah"],
      popular: true,
      earlyBird: false,
      features: ["Guided Tours", "Meals Included", "Transport", "Visa Assistance", "Insurance", "24/7 Support"],
      departureDates: [
        {
          id: "jan-15",
          date: "15 Jan 2025",
          duration: "14 Days",
          availableSeats: 12,
          totalSeats: 40,
        },
        {
          id: "feb-05",
          date: "5 Feb 2025",
          duration: "14 Days",
          availableSeats: 25,
          totalSeats: 40,
        },
      ],
      roomTypes: {
        quad: { name: "Quad Room", description: "4 persons per room", total: 10 },
        triple: { name: "Triple Room", description: "3 persons per room", total: 8 },
        double: { name: "Double Room", description: "2 persons per room", total: 6 },
      },
      roomAvailability: {
        "jan-15": { quad: 3, triple: 2, double: 1 },
        "feb-05": { quad: 7, triple: 5, double: 4 },
      },
    },
    {
      id: 2,
      title: "Economy Umrah Package - Great Value",
      price: 5800,
      originalPrice: 6500,
      duration: "10 Days",
      rating: 4.6,
      reviews: 89,
      image: "/placeholder.svg?height=250&width=400",
      hotelRating: 4,
      flightIncluded: true,
      cities: ["Makkah", "Madinah"],
      popular: false,
      earlyBird: true,
      features: ["Basic Tours", "Some Meals", "Transport", "Visa Assistance"],
      departureDates: [
        {
          id: "jan-22",
          date: "22 Jan 2025",
          duration: "10 Days",
          availableSeats: 8,
          totalSeats: 35,
        },
      ],
      roomTypes: {
        quad: { name: "Quad Room", description: "4 persons per room", total: 8 },
        triple: { name: "Triple Room", description: "3 persons per room", total: 6 },
      },
      roomAvailability: {
        "jan-22": { quad: 2, triple: 1 },
      },
    },
    {
      id: 3,
      title: "Luxury Umrah Experience with VIP Services",
      price: 12000,
      originalPrice: 13500,
      duration: "16 Days",
      rating: 4.9,
      reviews: 67,
      image: "/placeholder.svg?height=250&width=400",
      hotelRating: 5,
      flightIncluded: true,
      cities: ["Makkah", "Madinah", "Jeddah"],
      popular: false,
      earlyBird: false,
      features: ["VIP Tours", "All Meals", "Private Transport", "Visa Assistance", "Insurance", "Concierge"],
      departureDates: [
        {
          id: "feb-12",
          date: "12 Feb 2025",
          duration: "16 Days",
          availableSeats: 15,
          totalSeats: 25,
        },
      ],
      roomTypes: {
        double: { name: "Double Room", description: "2 persons per room", total: 10 },
        single: { name: "Single Room", description: "1 person per room", total: 5 },
      },
      roomAvailability: {
        "feb-12": { double: 8, single: 3 },
      },
    },
    {
      id: 4,
      title: "Hajj Package 2025 - Complete Pilgrimage",
      price: 18500,
      originalPrice: 20000,
      duration: "21 Days",
      rating: 4.9,
      reviews: 45,
      image: "/placeholder.svg?height=250&width=400",
      hotelRating: 5,
      flightIncluded: true,
      cities: ["Makkah", "Madinah", "Mina", "Arafat"],
      popular: true,
      earlyBird: false,
      features: ["Complete Hajj", "All Meals", "Transport", "Visa Assistance", "Insurance", "Religious Guide"],
      departureDates: [
        {
          id: "may-15",
          date: "15 May 2025",
          duration: "21 Days",
          availableSeats: 3,
          totalSeats: 30,
        },
      ],
      roomTypes: {
        quad: { name: "Quad Room", description: "4 persons per room", total: 7 },
        triple: { name: "Triple Room", description: "3 persons per room", total: 6 },
      },
      roomAvailability: {
        "may-15": { quad: 1, triple: 0 },
      },
    },
  ]

  const resetFilters = () => {
    setFilters({
      priceRange: [3000, 25000],
      departureMonth: "all",
      hotelRating: [],
      duration: [],
      flightIncluded: false,
      flightExcluded: false,
      features: [],
    })
  }

  const filteredPackages = packages.filter((pkg) => {
    // Filter by type
    if (type === "hajj" && !pkg.title.toLowerCase().includes("hajj")) return false
    if (type === "umrah" && pkg.title.toLowerCase().includes("hajj")) return false

    // Filter by price range
    if (pkg.price < filters.priceRange[0] || pkg.price > filters.priceRange[1]) return false

    // Filter by hotel rating
    if (filters.hotelRating.length > 0 && !filters.hotelRating.includes(pkg.hotelRating)) return false

    // Filter by flight inclusion
    if (filters.flightIncluded && !pkg.flightIncluded) return false
    if (filters.flightExcluded && pkg.flightIncluded) return false

    return true
  })

  const pageTitle = type === "hajj" ? "Hajj Packages" : "Umrah Packages"
  const pageSubtitle =
    type === "hajj"
      ? "Complete Hajj pilgrimage packages for the sacred journey of a lifetime"
      : "Comprehensive Umrah packages designed for your spiritual journey"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{pageTitle}</h1>
          <p className="text-xl text-emerald-100 max-w-2xl">{pageSubtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: pageTitle }]} />

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <PackageFilters filters={filters} setFilters={setFilters} onReset={resetFilters} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredPackages.length} Package{filteredPackages.length !== 1 ? "s" : ""} Found
                </h2>
                <p className="text-gray-600">Choose from our carefully curated {type} packages</p>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Package Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} packageData={pkg} type={type} />
              ))}
            </div>

            {/* No Results */}
            {filteredPackages.length === 0 && (
              <div className="text-center py-16">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No packages found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
                <Button onClick={resetFilters} variant="outline">
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Load More */}
            {filteredPackages.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Packages
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
