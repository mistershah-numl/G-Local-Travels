"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  Star,
  Clock,
  Users,
  Plane,
  Building,
  MapPin,
  Utensils,
  CheckCircle,
  Heart,
  Share2,
  Download,
  Phone,
  MessageCircle,
  Bed,
  Plus,
  Minus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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

// Live Availability Floating Popup
function LiveAvailabilityPopup({ packageData, selectedDate }: { packageData: any; selectedDate: any }) {
  const getRoomAvailability = (roomType: string) => {
    return packageData.roomAvailability[selectedDate.id]?.[roomType] || 0
  }

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100
    if (percentage > 50) return "text-green-600 bg-green-50 border-green-200"
    if (percentage > 20) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 shadow-lg border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
              Live Availability
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Updated 1 min ago
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border bg-gray-50">
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
                    <div
                      key={roomType}
                      className={`flex items-center justify-between p-2 rounded border ${getAvailabilityColor(
                        available,
                        total,
                      )}`}
                    >
                      <div className="flex items-center space-x-2">
                        <Bed className="w-4 h-4" />
                        <span className="text-sm font-medium">{details.name}</span>
                      </div>
                      <span className="text-sm font-bold">
                        {available}/{total}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Room/Seat Selection Popup
function RoomSeatSelectionPopup({
  packageData,
  selectedDate,
  isOpen,
  onClose,
  onConfirm,
}: {
  packageData: any
  selectedDate: any
  isOpen: boolean
  onClose: () => void
  onConfirm: (selection: any) => void
}) {
  const [selectedRooms, setSelectedRooms] = useState<{ [key: string]: number }>({})
  const [totalGuests, setTotalGuests] = useState(1)

  const getRoomAvailability = (roomType: string) => {
    return packageData.roomAvailability[selectedDate.id]?.[roomType] || 0
  }

  const updateRoomSelection = (roomType: string, count: number) => {
    setSelectedRooms((prev) => ({ ...prev, [roomType]: Math.max(0, count) }))
  }

  const getTotalSelectedRooms = () => {
    return Object.values(selectedRooms).reduce((sum: number, count: number) => sum + count, 0)
  }

  const getTotalPrice = () => {
    let total = 0
    Object.entries(selectedRooms).forEach(([roomType, count]) => {
      const roomDetails = packageData.roomTypes[roomType]
      total += count * roomDetails.pricePerRoom
    })
    return total
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Rooms & Seats</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Departure Date Info */}
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-emerald-800">Selected Departure</h4>
                  <p className="text-emerald-600">
                    {selectedDate.date} - {selectedDate.duration}
                  </p>
                </div>
                <Badge className="bg-emerald-600 text-white">{selectedDate.availableSeats} seats available</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Room Selection */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Choose Your Rooms</h4>
            <div className="space-y-4">
              {Object.entries(packageData.roomTypes).map(([roomType, details]: [string, any]) => {
                const available = getRoomAvailability(roomType)
                const selected = selectedRooms[roomType] || 0

                return (
                  <Card key={roomType} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Bed className="w-5 h-5 text-gray-500" />
                            <h5 className="font-semibold">{details.name}</h5>
                            <Badge variant="outline">{available} available</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{details.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Max {details.maxOccupancy} guests</span>
                            <span>RM {details.pricePerRoom.toLocaleString()} per room</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateRoomSelection(roomType, selected - 1)}
                            disabled={selected === 0}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{selected}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateRoomSelection(roomType, selected + 1)}
                            disabled={selected >= available}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Guest Information */}
          <div>
            <Label htmlFor="total-guests" className="text-sm font-medium">
              Total Number of Guests
            </Label>
            <Input
              id="total-guests"
              type="number"
              value={totalGuests}
              onChange={(e) => setTotalGuests(Number(e.target.value))}
              min="1"
              max="20"
              className="mt-1"
            />
          </div>

          {/* Summary */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Selection Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Rooms Selected:</span>
                  <span className="font-medium">{getTotalSelectedRooms()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Guests:</span>
                  <span className="font-medium">{totalGuests}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Additional Room Cost:</span>
                  <span className="text-emerald-600">RM {getTotalPrice().toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={() => onConfirm({ rooms: selectedRooms, guests: totalGuests, additionalCost: getTotalPrice() })}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              disabled={getTotalSelectedRooms() === 0}
            >
              Confirm Selection
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Booking Wizard Popup
function BookingWizardPopup({
  packageData,
  selectedDate,
  roomSelection,
  isOpen,
  onClose,
}: {
  packageData: any
  selectedDate: any
  roomSelection: any
  isOpen: boolean
  onClose: () => void
}) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      passportNumber: "",
      dateOfBirth: "",
    },
    travelPreferences: {
      dietaryRequirements: "",
      specialRequests: "",
      emergencyContact: "",
    },
    paymentOption: "deposit",
  })

  const totalPrice = packageData.price + (roomSelection?.additionalCost || 0)
  const depositAmount = totalPrice * 0.3

  const steps = [
    { id: 1, title: "Personal Information", description: "Basic details and passport info" },
    { id: 2, title: "Travel Preferences", description: "Special requirements and preferences" },
    { id: 3, title: "Payment Options", description: "Choose your payment method" },
    { id: 4, title: "Confirmation", description: "Review and confirm your booking" },
  ]

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Your Package</DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.id ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.id}
              </div>
              <div className="ml-3 hidden sm:block">
                <div className="text-sm font-medium">{step.title}</div>
                <div className="text-xs text-gray-500">{step.description}</div>
              </div>
              {index < steps.length - 1 && <div className="w-12 h-px bg-gray-300 mx-4 hidden sm:block"></div>}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.personalInfo.firstName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, firstName: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.personalInfo.lastName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, lastName: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, email: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.personalInfo.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, phone: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="passport">Passport Number *</Label>
                  <Input
                    id="passport"
                    value={formData.personalInfo.passportNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, passportNumber: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, dateOfBirth: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Travel Preferences</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="dietary">Dietary Requirements</Label>
                  <Textarea
                    id="dietary"
                    placeholder="Please specify any dietary restrictions or preferences..."
                    value={formData.travelPreferences.dietaryRequirements}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        travelPreferences: { ...formData.travelPreferences, dietaryRequirements: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="special">Special Requests</Label>
                  <Textarea
                    id="special"
                    placeholder="Any special requests or accessibility needs..."
                    value={formData.travelPreferences.specialRequests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        travelPreferences: { ...formData.travelPreferences, specialRequests: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input
                    id="emergency"
                    placeholder="Emergency contact name and phone number"
                    value={formData.travelPreferences.emergencyContact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        travelPreferences: { ...formData.travelPreferences, emergencyContact: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Payment Options</h3>
              <RadioGroup
                value={formData.paymentOption}
                onValueChange={(value) => setFormData({ ...formData, paymentOption: value })}
              >
                <div className="space-y-4">
                  <Card className="p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="deposit" id="deposit" />
                      <Label htmlFor="deposit" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">Pay Deposit (30%)</div>
                            <div className="text-sm text-gray-500">Pay remaining amount later</div>
                          </div>
                          <div className="text-lg font-bold text-emerald-600">RM {depositAmount.toLocaleString()}</div>
                        </div>
                      </Label>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full" id="full" />
                      <Label htmlFor="full" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">Pay Full Amount</div>
                            <div className="text-sm text-gray-500">Complete payment now</div>
                          </div>
                          <div className="text-lg font-bold text-emerald-600">RM {totalPrice.toLocaleString()}</div>
                        </div>
                      </Label>
                    </div>
                  </Card>
                </div>
              </RadioGroup>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Booking Confirmation</h3>
              <Card className="p-6 bg-gray-50">
                <h4 className="font-semibold mb-4">Booking Summary</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Package:</span>
                    <span className="font-medium">{packageData.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Departure Date:</span>
                    <span className="font-medium">{selectedDate.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{selectedDate.duration}</span>
                  </div>
                  {roomSelection && (
                    <div className="flex justify-between">
                      <span>Additional Rooms:</span>
                      <span className="font-medium">RM {roomSelection.additionalCost.toLocaleString()}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Amount:</span>
                    <span className="text-emerald-600">RM {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Amount:</span>
                    <span className="font-medium text-emerald-600">
                      RM {(formData.paymentOption === "deposit" ? depositAmount : totalPrice).toLocaleString()}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            Previous
          </Button>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {currentStep < 4 ? (
              <Button onClick={nextStep} className="bg-emerald-600 hover:bg-emerald-700">
                Next
              </Button>
            ) : (
              <Button className="bg-emerald-600 hover:bg-emerald-700">Confirm Booking</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Main Package Detail Component
export default function PackageDetailPage() {
  const [selectedDate, setSelectedDate] = useState("jan-15")
  const [showRoomSelection, setShowRoomSelection] = useState(false)
  const [showBookingWizard, setShowBookingWizard] = useState(false)
  const [roomSelection, setRoomSelection] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)

  // Sample package data
  const packageData = {
    id: 1,
    title: "Premium Umrah Package with 5-Star Hotels",
    subtitle: "Experience the ultimate spiritual journey with luxury accommodations and comprehensive services",
    price: 8500,
    originalPrice: 9200,
    rating: 4.8,
    reviews: 124,
    duration: "14 Days",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    highlights: [
      "5-Star hotels near Haram",
      "Direct flights with Malaysia Airlines",
      "Expert religious guides",
      "All meals included",
      "Visa processing assistance",
      "24/7 customer support",
      "Group size limited to 40 pilgrims",
      "Zam Zam water included",
    ],
    itinerary: [
      {
        day: 1,
        title: "Departure from Kuala Lumpur",
        description: "Departure from KLIA, arrival in Jeddah, transfer to Madinah",
        activities: ["Check-in at KLIA", "Flight to Jeddah", "Transfer to Madinah hotel", "Rest and orientation"],
        meals: ["In-flight meals"],
        accommodation: "5-Star Hotel in Madinah",
      },
      {
        day: 2,
        title: "Madinah - First Day",
        description: "Visit to Masjid Nabawi and historical sites",
        activities: [
          "Fajr prayer at Masjid Nabawi",
          "Visit to Raudhah",
          "Ziyarah to historical sites",
          "Shopping at local markets",
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "5-Star Hotel in Madinah",
      },
      {
        day: 3,
        title: "Madinah - Second Day",
        description: "Continue spiritual activities in Madinah",
        activities: [
          "Morning prayers at Masjid Nabawi",
          "Visit to Quba Mosque",
          "Mount Uhud visit",
          "Free time for personal worship",
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "5-Star Hotel in Madinah",
      },
      // Add more days as needed
    ],
    hotels: {
      madinah: {
        name: "Pullman Zamzam Madinah",
        rating: 5,
        distance: "50m from Masjid Nabawi",
        amenities: ["Free WiFi", "Restaurant", "Fitness Center", "Room Service", "Air Conditioning"],
        images: ["/placeholder.svg?height=300&width=400"],
        description: "Luxury hotel with direct view of Masjid Nabawi",
      },
      makkah: {
        name: "Fairmont Makkah Clock Royal Tower",
        rating: 5,
        distance: "Connected to Masjid al-Haram",
        amenities: ["Free WiFi", "Multiple Restaurants", "Spa", "Shopping Mall", "24/7 Room Service"],
        images: ["/placeholder.svg?height=300&width=400"],
        description: "Premium accommodation with direct access to the Holy Mosque",
      },
    },
    flights: {
      outbound: {
        airline: "Malaysia Airlines",
        departure: "KLIA - 23:45",
        arrival: "Jeddah - 05:30+1",
        duration: "9h 45m",
        aircraft: "Airbus A350",
        class: "Economy",
      },
      return: {
        airline: "Malaysia Airlines",
        departure: "Jeddah - 08:15",
        arrival: "KLIA - 21:30",
        duration: "9h 15m",
        aircraft: "Airbus A350",
        class: "Economy",
      },
    },
    pricingOptions: [
      {
        type: "Quad Room",
        description: "4 persons per room",
        price: 8500,
        savings: 700,
        popular: true,
      },
      {
        type: "Triple Room",
        description: "3 persons per room",
        price: 9200,
        savings: 300,
        popular: false,
      },
      {
        type: "Double Room",
        description: "2 persons per room",
        price: 10500,
        savings: 0,
        popular: false,
      },
    ],
    departureDates: [
      {
        id: "jan-15",
        date: "15 January 2025",
        duration: "14 Days",
        availableSeats: 12,
        totalSeats: 40,
        price: 8500,
      },
      {
        id: "feb-05",
        date: "5 February 2025",
        duration: "14 Days",
        availableSeats: 25,
        totalSeats: 40,
        price: 8500,
      },
      {
        id: "mar-12",
        date: "12 March 2025",
        duration: "14 Days",
        availableSeats: 35,
        totalSeats: 40,
        price: 8800,
      },
    ],
    roomTypes: {
      quad: {
        name: "Quad Room",
        description: "4 persons per room",
        maxOccupancy: 4,
        pricePerRoom: 0,
        total: 10,
      },
      triple: {
        name: "Triple Room",
        description: "3 persons per room",
        maxOccupancy: 3,
        pricePerRoom: 700,
        total: 8,
      },
      double: {
        name: "Double Room",
        description: "2 persons per room",
        maxOccupancy: 2,
        pricePerRoom: 2000,
        total: 6,
      },
    },
    roomAvailability: {
      "jan-15": { quad: 3, triple: 2, double: 1 },
      "feb-05": { quad: 7, triple: 5, double: 4 },
      "mar-12": { quad: 9, triple: 7, double: 5 },
    },
  }

  const selectedDateData = packageData.departureDates.find((date) => date.id === selectedDate)

  const handleRoomSelectionConfirm = (selection: any) => {
    setRoomSelection(selection)
    setShowRoomSelection(false)
    setShowBookingWizard(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-emerald-600 to-emerald-800 overflow-hidden">
        <Image
          src={packageData.images[0] || "/placeholder.svg"}
          alt={packageData.title}
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{packageData.title}</h1>
            <p className="text-xl text-emerald-100 mb-6">{packageData.subtitle}</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{packageData.rating}</span>
                <span className="text-emerald-200 ml-1">({packageData.reviews} reviews)</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-1" />
                <span>{packageData.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Umrah Packages", href: "/umrah-packages" }, { label: packageData.title }]} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="hotels">Hotels & Flights</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Image Gallery */}
                <div className="grid grid-cols-2 gap-4">
                  {packageData.images.slice(0, 4).map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Package image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Package Highlights */}
                <Card>
                  <CardHeader>
                    <CardTitle>Package Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {packageData.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>About This Package</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      Experience the spiritual journey of a lifetime with our Premium Umrah Package. This carefully
                      crafted package includes luxury 5-star accommodations, direct flights, expert guidance, and
                      comprehensive services to ensure your pilgrimage is both comfortable and spiritually fulfilling.
                      Our experienced team will be with you every step of the way, from departure to return, ensuring
                      all your needs are met while you focus on your spiritual journey.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Itinerary Tab */}
              <TabsContent value="itinerary" className="space-y-4">
                {packageData.itinerary.map((day) => (
                  <Card key={day.day}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Badge className="mr-3">Day {day.day}</Badge>
                        {day.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{day.description}</p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            Activities
                          </h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            {day.activities.map((activity, index) => (
                              <li key={index}>• {activity}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Utensils className="w-4 h-4 mr-2" />
                            Meals
                          </h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            {day.meals.map((meal, index) => (
                              <li key={index}>• {meal}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Building className="w-4 h-4 mr-2" />
                            Accommodation
                          </h4>
                          <p className="text-sm text-gray-600">{day.accommodation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Hotels & Flights Tab */}
              <TabsContent value="hotels" className="space-y-6">
                {/* Hotels */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Accommodation</h3>
                  <div className="space-y-4">
                    {Object.entries(packageData.hotels).map(([city, hotel]: [string, any]) => (
                      <Card key={city}>
                        <div className="grid md:grid-cols-3 gap-0">
                          <div className="relative">
                            <Image
                              src={hotel.images[0] || "/placeholder.svg"}
                              alt={hotel.name}
                              width={300}
                              height={200}
                              className="w-full h-48 object-cover"
                            />
                            <Badge className="absolute top-3 left-3 bg-emerald-600">{hotel.rating} Star</Badge>
                          </div>
                          <div className="md:col-span-2 p-6">
                            <h4 className="text-lg font-semibold mb-2">{hotel.name}</h4>
                            <p className="text-emerald-600 mb-2 flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {hotel.distance}
                            </p>
                            <p className="text-gray-600 mb-4">{hotel.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {hotel.amenities.map((amenity: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Flights */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Flight Details</h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Plane className="w-5 h-5 mr-2" />
                          Outbound Flight
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">Airline</div>
                            <div className="font-medium">{packageData.flights.outbound.airline}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Departure</div>
                            <div className="font-medium">{packageData.flights.outbound.departure}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Arrival</div>
                            <div className="font-medium">{packageData.flights.outbound.arrival}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Duration</div>
                            <div className="font-medium">{packageData.flights.outbound.duration}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Plane className="w-5 h-5 mr-2 rotate-180" />
                          Return Flight
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">Airline</div>
                            <div className="font-medium">{packageData.flights.return.airline}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Departure</div>
                            <div className="font-medium">{packageData.flights.return.departure}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Arrival</div>
                            <div className="font-medium">{packageData.flights.return.arrival}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Duration</div>
                            <div className="font-medium">{packageData.flights.return.duration}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Pricing Tab */}
              <TabsContent value="pricing" className="space-y-4">
                {packageData.pricingOptions.map((option, index) => (
                  <Card key={index} className={`${option.popular ? "border-emerald-500 border-2" : ""}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold">{option.type}</h4>
                            {option.popular && <Badge className="bg-emerald-600">Most Popular</Badge>}
                          </div>
                          <p className="text-gray-600 mb-2">{option.description}</p>
                          {option.savings > 0 && (
                            <p className="text-sm text-green-600">Save RM {option.savings.toLocaleString()}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-emerald-600">RM {option.price.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">per person</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Pricing Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-emerald-600">RM {packageData.price.toLocaleString()}</div>
                      {packageData.originalPrice > packageData.price && (
                        <div className="text-lg text-gray-500 line-through">
                          RM {packageData.originalPrice.toLocaleString()}
                        </div>
                      )}
                      <div className="text-sm text-gray-500">per person</div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setIsFavorite(!isFavorite)}>
                      <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Departure Date Selection */}
                  <div>
                    <Label className="text-sm font-medium">Select Departure Date</Label>
                    <Select value={selectedDate} onValueChange={setSelectedDate}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {packageData.departureDates.map((date) => (
                          <SelectItem key={date.id} value={date.id}>
                            <div className="flex items-center justify-between w-full">
                              <span>{date.date}</span>
                              <Badge variant="outline" className="ml-2">
                                {date.availableSeats} seats
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Availability Info */}
                  {selectedDateData && (
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-emerald-800">Available Seats:</span>
                        <span className="font-medium text-emerald-600">
                          {selectedDateData.availableSeats}/{selectedDateData.totalSeats}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-6"
                      onClick={() => setShowRoomSelection(true)}
                    >
                      Book Now
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setShowRoomSelection(true)}>
                      <Bed className="w-4 h-4 mr-2" />
                      Select Rooms
                    </Button>
                  </div>

                  {/* Contact Options */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Us
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                  </div>

                  {/* Additional Actions */}
                  <div className="flex space-x-3 pt-3 border-t">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Brochure
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Need Help Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Our travel experts are here to help you plan your perfect pilgrimage.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-emerald-600" />
                      <span>+60 12-903 4966</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2 text-emerald-600" />
                      <span>WhatsApp Support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Live Availability */}
      {selectedDateData && <LiveAvailabilityPopup packageData={packageData} selectedDate={selectedDateData} />}

      {/* Room Selection Popup */}
      <RoomSeatSelectionPopup
        packageData={packageData}
        selectedDate={selectedDateData}
        isOpen={showRoomSelection}
        onClose={() => setShowRoomSelection(false)}
        onConfirm={handleRoomSelectionConfirm}
      />

      {/* Booking Wizard Popup */}
      <BookingWizardPopup
        packageData={packageData}
        selectedDate={selectedDateData}
        roomSelection={roomSelection}
        isOpen={showBookingWizard}
        onClose={() => setShowBookingWizard(false)}
      />
    </div>
  )
}
