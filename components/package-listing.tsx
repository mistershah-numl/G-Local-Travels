"use client"

import { useState, useMemo } from "react"
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
    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
      <Link href="/" className="hover:text-yellow-400 transition-colors">
        Home
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4" />
          {item.href ? (
            <Link href={item.href} className="hover:text-yellow-400 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-yellow-400 font-medium">{item.label}</span>
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
    if (percentage > 50) return "text-green-400 bg-green-900/20"
    if (percentage > 20) return "text-yellow-400 bg-yellow-900/20"
    return "text-red-400 bg-red-900/20"
  }

  return (
    <div className="w-80 p-4 bg-gray-900 text-white">
      <div className="mb-4">
        <h4 className="font-semibold text-yellow-400 mb-2">Live Availability</h4>
        <Select
          value={selectedDate.id}
          onValueChange={(value) => setSelectedDate(packageData.departureDates.find((d: any) => d.id === value))}
        >
          <SelectTrigger className="bg-gray-800 border-yellow-500/30 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-yellow-500/30">
            {packageData.departureDates.map((date: any) => (
              <SelectItem key={date.id} value={date.id} className="text-white hover:bg-yellow-500/10">
                {date.date} - {date.duration}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg border border-yellow-500/30 bg-gray-800/50">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium">Total Seats</span>
          </div>
          <Badge className={getAvailabilityColor(selectedDate.availableSeats, selectedDate.totalSeats)}>
            {selectedDate.availableSeats}/{selectedDate.totalSeats}
          </Badge>
        </div>
        <div>
          <h5 className="text-sm font-medium text-yellow-400 mb-2">Room Availability</h5>
          <div className="space-y-2">
            {Object.entries(packageData.roomTypes).map(([roomType, details]: [string, any]) => {
              const available = getRoomAvailability(roomType)
              const total = details.total
              return (
                <div
                  key={roomType}
                  className="flex items-center justify-between p-2 rounded border border-yellow-500/20 bg-gray-800/30"
                >
                  <div className="flex items-center space-x-2">
                    <Bed className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium">{details.name}</div>
                      <div className="text-xs text-gray-400">{details.description}</div>
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
        <div className="pt-3 border-t border-yellow-500/20">
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"></div>
            <span>Updated 2 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Package Card Component
function PackageCard({ packageData }: { packageData: any }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const nextDeparture = packageData.departureDates[0]
  const savings = packageData.originalPrice - packageData.price

  return (
    <Card className="overflow-hidden hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 group bg-gray-900/50 backdrop-blur-sm border-yellow-500/20 transform hover:scale-105">
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
          {savings > 0 && <Badge className="bg-green-600 text-white">Save Rs {savings.toLocaleString()}</Badge>}
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
      <CardHeader className="pb-3 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 line-clamp-2">{packageData.title}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
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
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Rs {packageData.price.toLocaleString()}
            </div>
            {packageData.originalPrice > packageData.price && (
              <div className="text-sm text-gray-500 line-through">Rs {packageData.originalPrice.toLocaleString()}</div>
            )}
            <div className="text-xs text-gray-400">per person</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 text-white">
        <div className="space-y-4">
          {/* Quick Details */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center">
              <Building className="w-4 h-4 mr-2 text-gray-400" />
              <span>{packageData.hotelRating}★ Hotels</span>
            </div>
            <div className="flex items-center">
              <Plane className="w-4 h-4 mr-2 text-gray-400" />
              <span>{packageData.flightIncluded ? "Flights Included" : "No Flights"}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <span>{packageData.cities.join(", ")}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span>{nextDeparture.date}</span>
            </div>
          </div>
          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {packageData.features.slice(0, 3).map((feature: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs border-yellow-500/30 text-yellow-400">
                {feature}
              </Badge>
            ))}
            {packageData.features.length > 3 && (
              <Badge variant="outline" className="text-xs border-yellow-500/30 text-yellow-400">
                +{packageData.features.length - 3} more
              </Badge>
            )}
          </div>
          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button
              className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600 font-semibold"
              asChild
            >
              <Link href={`/packages/${packageData.id}`}>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
            >
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
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-yellow-500/20 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-yellow-400">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onReset} className="text-yellow-400 hover:bg-yellow-500/10">
          <X className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>
      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium text-yellow-400 mb-3 block">Price Range (Rs)</Label>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
              max={50000}
              min={5000}
              step={1000}
              className="mb-3"
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>Rs {filters.priceRange[0].toLocaleString()}</span>
              <span>Rs {filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>
        <Separator className="bg-yellow-500/20" />
        {/* Departure Dates */}
        <div>
          <Label className="text-sm font-medium text-yellow-400 mb-3 block">Departure Month</Label>
          <Select
            value={filters.departureMonth}
            onValueChange={(value) => setFilters({ ...filters, departureMonth: value })}
          >
            <SelectTrigger className="bg-gray-800 border-yellow-500/30 text-white">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-yellow-500/30">
              <SelectItem value="all" className="text-white hover:bg-yellow-500/10">
                All Months
              </SelectItem>
              <SelectItem value="2025-01" className="text-white hover:bg-yellow-500/10">
                January 2025
              </SelectItem>
              <SelectItem value="2025-02" className="text-white hover:bg-yellow-500/10">
                February 2025
              </SelectItem>
              <SelectItem value="2025-03" className="text-white hover:bg-yellow-500/10">
                March 2025
              </SelectItem>
              <SelectItem value="2025-04" className="text-white hover:bg-yellow-500/10">
                April 2025
              </SelectItem>
              <SelectItem value="2025-05" className="text-white hover:bg-yellow-500/10">
                May 2025
              </SelectItem>
              <SelectItem value="2025-06" className="text-white hover:bg-yellow-500/10">
                June 2025
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className="bg-yellow-500/20" />
        {/* Hotel Rating */}
        <div>
          <Label className="text-sm font-medium text-yellow-400 mb-3 block">Hotel Rating</Label>
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
                  className="border-yellow-500/30 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                />
                <Label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer text-white">
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
        <Separator className="bg-yellow-500/20" />
        {/* Duration */}
        <div>
          <Label className="text-sm font-medium text-yellow-400 mb-3 block">Duration</Label>
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
                  className="border-yellow-500/30 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                />
                <Label htmlFor={`duration-${duration}`} className="text-sm cursor-pointer text-white">
                  {duration}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Separator className="bg-yellow-500/20" />
        {/* Flight Included */}
        <div>
          <Label className="text-sm font-medium text-yellow-400 mb-3 block">Flight Options</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="flight-included"
                checked={filters.flightIncluded}
                onCheckedChange={(checked) => setFilters({ ...filters, flightIncluded: checked })}
                className="border-yellow-500/30 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
              />
              <Label htmlFor="flight-included" className="text-sm cursor-pointer text-white">
                Flights Included
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="flight-excluded"
                checked={filters.flightExcluded}
                onCheckedChange={(checked) => setFilters({ ...filters, flightExcluded: checked })}
                className="border-yellow-500/30 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
              />
              <Label htmlFor="flight-excluded" className="text-sm cursor-pointer text-white">
                Flights Not Included
              </Label>
            </div>
          </div>
        </div>
        <Separator className="bg-yellow-500/20" />
        {/* Package Features */}
        <div>
          <Label className="text-sm font-medium text-yellow-400 mb-3 block">Package Features</Label>
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
                  className="border-yellow-500/30 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                />
                <Label htmlFor={`feature-${feature}`} className="text-sm cursor-pointer text-white">
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
export default function PackageListing({ packageType = "all" }: { packageType?: string }) {
  const [filters, setFilters] = useState({
    priceRange: [5000, 50000],
    departureMonth: "all",
    hotelRating: [],
    duration: [],
    flightIncluded: false,
    flightExcluded: false,
    features: [],
  })
  const [sortBy, setSortBy] = useState("popular")

  // Comprehensive package data
  const allPackages = [
    // Umrah Packages
    {
      id: 1,
      title: "Premium Umrah Package with 5-Star Hotels",
      price: 17000,
      originalPrice: 18400,
      duration: "14 Days",
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=250&width=400",
      hotelRating: 5,
      flightIncluded: true,
      cities: ["Makkah", "Madinah"],
      popular: true,
      earlyBird: false,
      type: "umrah",
      category: "umrah-packages",
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
      price: 11600,
      originalPrice: 13000,
      duration: "10 Days",
      rating: 4.6,
      reviews: 89,
      image: "/placeholder.svg?height=250&width=400",
      hotelRating: 4,
      flightIncluded: true,
      cities: ["Makkah", "Madinah"],
      popular: false,
      earlyBird: true,
      type: "umrah",
      category: "umrah-packages",
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
      price: 24000,
      originalPrice: 27000,
      duration: "16 Days",
      rating: 4.9,
      reviews: 67,
      image: "/placeholder.svg?height=250&width=400",
      hotelRating: 5,
      flightIncluded: true,
      cities: ["Makkah", "Madinah", "Jeddah"],
      popular: false,
      earlyBird: false,
      type: "umrah",
      category: "umrah-packages",
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
    // Hajj Packages
    {
      id: 4,
      title: "Hajj Package 2025 - Complete Pilgrimage",
      price: 37000,
      originalPrice: 40000,
      duration: "21 Days",
      rating: 4.9,
      reviews: 45,
      image: "/placeholder.svg?height=250&width=400",
      hotelRating: 5,
      flightIncluded: true,
      cities: ["Makkah", "Madinah", "Mina", "Arafat"],
      popular: true,
      earlyBird: false,
      type: "hajj",
      category: "hajj-packages",
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
    {
      id: 5,
      title: "Premium Hajj Package with Luxury Accommodation",
      price: 45000,
      originalPrice: 48000,
      duration: "25 Days",
      rating: 4.8,
      reviews: 32,
      image: "/placeholder.svg?height=250&width=400",
      hotelRating: 5,
      flightIncluded: true,
      cities: ["Makkah", "Madinah", "Mina", "Arafat", "Muzdalifah"],
      popular: false,
      earlyBird: true,
      type: "hajj",
      category: "hajj-packages",
      features: ["Luxury Hotels", "VIP Services", "All Meals", "Private Transport", "Insurance", "Personal Guide"],
      departureDates: [
        {
          id: "may-10",
          date: "10 May 2025",
          duration: "25 Days",
          availableSeats: 8,
          totalSeats: 20,
        },
      ],
      roomTypes: {
        double: { name: "Double Room", description: "2 persons per room", total: 8 },
        single: { name: "Single Room", description: "1 person per room", total: 4 },
      },
      roomAvailability: {
        "may-10": { double: 5, single: 2 },
      },
    },
    // Group Tour Packages
    {
      id: 6,
      title: "Turkey Islamic Heritage Group Tour",
      price: 15000,
      originalPrice: 16500,
      duration: "12 Days",
      rating: 4.7,
      reviews: 78,
      image: "/placeholder.svg?height=250&width=400",
      hotelRating: 4,
      flightIncluded: true,
      cities: ["Istanbul", "Bursa", "Konya"],
      popular: false,
      earlyBird: false,
      type: "group",
      category: "group",
      features: ["Guided Tours", "Meals Included", "Transport", "Historical Sites", "Cultural Experience"],
      departureDates: [
        {
          id: "mar-20",
          date: "20 Mar 2025",
          duration: "12 Days",
          availableSeats: 18,
          totalSeats: 35,
        },
      ],
      roomTypes: {
        double: { name: "Double Room", description: "2 persons per room", total: 15 },
        single: { name: "Single Room", description: "1 person per room", total: 5 },
      },
      roomAvailability: {
        "mar-20": { double: 12, single: 3 },
      },
    },
    {
      id: 7,
      title: "Egypt Islamic Civilization Group Tour",
      price: 18000,
      originalPrice: 19500,
      duration: "14 Days",
      rating: 4.6,
      reviews: 56,
      image: "/placeholder.svg?height=250&width=400",
      hotelRating: 4,
      flightIncluded: true,
      cities: ["Cairo", "Alexandria", "Luxor"],
      popular: false,
      earlyBird: true,
      type: "group",
      category: "group",
      features: ["Expert Guide", "All Meals", "Transport", "Museum Visits", "Nile Cruise"],
      departureDates: [
        {
          id: "apr-15",
          date: "15 Apr 2025",
          duration: "14 Days",
          availableSeats: 22,
          totalSeats: 40,
        },
      ],
      roomTypes: {
        double: { name: "Double Room", description: "2 persons per room", total: 18 },
        single: { name: "Single Room", description: "1 person per room", total: 4 },
      },
      roomAvailability: {
        "apr-15": { double: 15, single: 2 },
      },
    },
    // Private Tour Packages
    {
      id: 8,
      title: "Private Morocco Islamic Tour",
      price: 22000,
      originalPrice: 24000,
      duration: "10 Days",
      rating: 4.8,
      reviews: 34,
      image: "/placeholder.svg?height=250&width=400",
      hotelRating: 5,
      flightIncluded: true,
      cities: ["Casablanca", "Fez", "Marrakech"],
      popular: false,
      earlyBird: false,
      type: "private",
      category: "private",
      features: ["Private Guide", "Luxury Hotels", "All Meals", "Private Transport", "Customizable"],
      departureDates: [
        {
          id: "any-date",
          date: "Flexible Dates",
          duration: "10 Days",
          availableSeats: 10,
          totalSeats: 10,
        },
      ],
      roomTypes: {
        suite: { name: "Suite Room", description: "Luxury suite", total: 5 },
        double: { name: "Double Room", description: "2 persons per room", total: 5 },
      },
      roomAvailability: {
        "any-date": { suite: 4, double: 4 },
      },
    },
    // Family Packages
    {
      id: 9,
      title: "Family Umrah Package - Kid Friendly",
      price: 14000,
      originalPrice: 15500,
      duration: "12 Days",
      rating: 4.7,
      reviews: 92,
      image: "/placeholder.svg?height=250&width=400",
      hotelRating: 4,
      flightIncluded: true,
      cities: ["Makkah", "Madinah"],
      popular: true,
      earlyBird: false,
      type: "family",
      category: "family",
      features: ["Family Rooms", "Kid Activities", "Meals Included", "Transport", "Childcare Support"],
      departureDates: [
        {
          id: "feb-28",
          date: "28 Feb 2025",
          duration: "12 Days",
          availableSeats: 16,
          totalSeats: 30,
        },
      ],
      roomTypes: {
        family: { name: "Family Room", description: "2 adults + 2 children", total: 12 },
        connecting: { name: "Connecting Rooms", description: "2 connected rooms", total: 6 },
      },
      roomAvailability: {
        "feb-28": { family: 8, connecting: 4 },
      },
    },
    // Student Packages
    {
      id: 10,
      title: "Student Umrah Package - Special Rates",
      price: 9500,
      originalPrice: 11000,
      duration: "8 Days",
      rating: 4.5,
      reviews: 67,
      image: "/placeholder.svg?height=250&width=400",
      hotelRating: 3,
      flightIncluded: true,
      cities: ["Makkah", "Madinah"],
      popular: false,
      earlyBird: true,
      type: "student",
      category: "student",
      features: ["Student Discount", "Group Activities", "Basic Meals", "Transport", "Educational Tours"],
      departureDates: [
        {
          id: "jun-15",
          date: "15 Jun 2025",
          duration: "8 Days",
          availableSeats: 25,
          totalSeats: 50,
        },
      ],
      roomTypes: {
        quad: { name: "Quad Room", description: "4 students per room", total: 12 },
        triple: { name: "Triple Room", description: "3 students per room", total: 6 },
      },
      roomAvailability: {
        "jun-15": { quad: 10, triple: 5 },
      },
    },
  ]

  const resetFilters = () => {
    setFilters({
      priceRange: [5000, 50000],
      departureMonth: "all",
      hotelRating: [],
      duration: [],
      flightIncluded: false,
      flightExcluded: false,
      features: [],
    })
  }

  const filteredPackages = useMemo(() => {
    return allPackages.filter((pkg) => {
      // Filter by package type
      if (packageType !== "all") {
        if (packageType === "hajj-packages" && pkg.category !== "hajj-packages") return false
        if (packageType === "umrah-packages" && pkg.category !== "umrah-packages") return false
        if (packageType === "group" && pkg.category !== "group") return false
        if (packageType === "private" && pkg.category !== "private") return false
        if (packageType === "family" && pkg.category !== "family") return false
        if (packageType === "student" && pkg.category !== "student") return false
      }

      // Filter by price range
      if (pkg.price < filters.priceRange[0] || pkg.price > filters.priceRange[1]) return false

      // Filter by hotel rating
      if (filters.hotelRating.length > 0 && !filters.hotelRating.includes(pkg.hotelRating)) return false

      // Filter by flight inclusion
      if (filters.flightIncluded && !pkg.flightIncluded) return false
      if (filters.flightExcluded && pkg.flightIncluded) return false

      return true
    })
  }, [allPackages, packageType, filters])

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Packages" }]} />
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
                <h2 className="text-2xl font-bold text-white">
                  {filteredPackages.length} Package{filteredPackages.length !== 1 ? "s" : ""} Found
                </h2>
                <p className="text-gray-400">Choose from our carefully curated travel packages</p>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-gray-800 border-yellow-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-yellow-500/30">
                    <SelectItem value="popular" className="text-white hover:bg-yellow-500/10">
                      Most Popular
                    </SelectItem>
                    <SelectItem value="price-low" className="text-white hover:bg-yellow-500/10">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high" className="text-white hover:bg-yellow-500/10">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating" className="text-white hover:bg-yellow-500/10">
                      Highest Rated
                    </SelectItem>
                    <SelectItem value="duration" className="text-white hover:bg-yellow-500/10">
                      Duration
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Package Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} packageData={pkg} />
              ))}
            </div>
            {/* No Results */}
            {filteredPackages.length === 0 && (
              <div className="text-center py-16">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No packages found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your filters to see more results</p>
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent"
                >
                  Reset Filters
                </Button>
              </div>
            )}
            {/* Load More */}
            {filteredPackages.length > 0 && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent"
                >
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
