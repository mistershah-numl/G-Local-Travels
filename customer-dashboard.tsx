"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Plane,
  Building,
  Download,
  Upload,
  Edit,
  Eye,
  CheckCircle,
  AlertCircle,
  FileText,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Star,
  Phone,
  MessageCircle,
  Bed,
  Shield,
  Plus,
  RefreshCw,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

// Floating elements for background animation
function FloatingElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-amber-400/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-yellow-500/5 to-amber-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>
  )
}

// Package Selection Dialog
function PackageSelectionDialog({
  isOpen,
  onClose,
  onSelectPackage,
}: {
  isOpen: boolean
  onClose: () => void
  onSelectPackage: (pkg: any) => void
}) {
  const [selectedPackage, setSelectedPackage] = useState<any>(null)

  const packages = [
    {
      id: 1,
      name: "Economy Umrah Package",
      duration: "10 Days",
      price: 580000,
      image: "/placeholder.svg?height=200&width=300",
      features: ["3★ Hotels", "Group Transportation", "Basic Meals", "Ziyarat Tours"],
      description: "Perfect for first-time pilgrims seeking an affordable spiritual journey",
    },
    {
      id: 2,
      name: "Standard Umrah Package",
      duration: "12 Days",
      price: 850000,
      image: "/placeholder.svg?height=200&width=300",
      features: ["4★ Hotels", "Private Transportation", "All Meals", "Extended Ziyarat", "Laundry Service"],
      description: "Balanced comfort and spirituality with enhanced amenities",
    },
    {
      id: 3,
      name: "Premium Umrah Package",
      duration: "14 Days",
      price: 1500000,
      image: "/placeholder.svg?height=200&width=300",
      features: ["5★ Hotels", "VIP Transportation", "Premium Meals", "Private Guide", "Spa Services"],
      description: "Luxury pilgrimage experience with premium accommodations",
    },
    {
      id: 4,
      name: "VIP Umrah Package",
      duration: "16 Days",
      price: 2500000,
      image: "/placeholder.svg?height=200&width=300",
      features: ["5★ Luxury Hotels", "Private Jet", "Personal Butler", "Exclusive Access", "Custom Itinerary"],
      description: "Ultimate luxury pilgrimage with personalized services",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-black via-gray-900 to-black border border-yellow-500/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Select Your Umrah Package
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`cursor-pointer transition-all duration-300 bg-black/40 border-2 hover:border-yellow-500/50 ${selectedPackage?.id === pkg.id
                ? "border-yellow-500 shadow-lg shadow-yellow-500/20"
                : "border-gray-700/50"
                }`}
              onClick={() => setSelectedPackage(pkg)}
            >
              <div className="relative">
                <Image
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold">
                  {pkg.duration}
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                      Rs {pkg.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">per person</div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">{pkg.description}</p>

                <div className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-yellow-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={() => selectedPackage && onSelectPackage(selectedPackage)}
            disabled={!selectedPackage}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold hover:from-yellow-500 hover:to-amber-600"
          >
            Continue with Selected Package
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Booking Form Dialog
function BookingFormDialog({
  isOpen,
  onClose,
  selectedPackage,
}: {
  isOpen: boolean
  onClose: () => void
  selectedPackage: any
}) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    passportNumber: "",
    passportExpiry: "",
    nationality: "",

    // Travel Details
    departureDate: "",
    passengers: 1,
    roomType: "double",
    specialRequests: "",

    // Emergency Contact
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",

    // Additional Services
    travelInsurance: false,
    airportTransfer: false,
    extraLuggage: false,
    wheelchairAssistance: false,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // Here you would typically submit to your backend
    console.log("Booking submitted:", { package: selectedPackage, details: formData })
    alert("Booking submitted successfully! You will receive a confirmation email shortly.")
    onClose()
    setStep(1)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName" className="text-gray-300">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="bg-black/40 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-black/40 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-gray-300">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="bg-black/40 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth" className="text-gray-300">
                  Date of Birth *
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="bg-black/40 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="passportNumber" className="text-gray-300">
                  Passport Number *
                </Label>
                <Input
                  id="passportNumber"
                  value={formData.passportNumber}
                  onChange={(e) => handleInputChange("passportNumber", e.target.value)}
                  className="bg-black/40 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="passportExpiry" className="text-gray-300">
                  Passport Expiry *
                </Label>
                <Input
                  id="passportExpiry"
                  type="date"
                  value={formData.passportExpiry}
                  onChange={(e) => handleInputChange("passportExpiry", e.target.value)}
                  className="bg-black/40 border-gray-600 text-white"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="nationality" className="text-gray-300">
                Nationality *
              </Label>
              <Select value={formData.nationality} onValueChange={(value) => handleInputChange("nationality", value)}>
                <SelectTrigger className="bg-black/40 border-gray-600 text-white">
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-600">
                  <SelectItem value="pakistani">Pakistani</SelectItem>
                  <SelectItem value="indian">Indian</SelectItem>
                  <SelectItem value="bangladeshi">Bangladeshi</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Travel Preferences</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="departureDate" className="text-gray-300">
                  Preferred Departure Date *
                </Label>
                <Input
                  id="departureDate"
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => handleInputChange("departureDate", e.target.value)}
                  className="bg-black/40 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="passengers" className="text-gray-300">
                  Number of Passengers *
                </Label>
                <Select
                  value={formData.passengers.toString()}
                  onValueChange={(value) => handleInputChange("passengers", Number.parseInt(value))}
                >
                  <SelectTrigger className="bg-black/40 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-600">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Person" : "People"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-gray-300 mb-3 block">Room Type Preference</Label>
              <RadioGroup value={formData.roomType} onValueChange={(value) => handleInputChange("roomType", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single" id="single" />
                  <Label htmlFor="single" className="text-gray-300">
                    Single Room (+Rs 80000)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="double" id="double" />
                  <Label htmlFor="double" className="text-gray-300">
                    Double Room (Standard)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="triple" id="triple" />
                  <Label htmlFor="triple" className="text-gray-300">
                    Triple Room (-Rs 30000)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="quad" id="quad" />
                  <Label htmlFor="quad" className="text-gray-300">
                    Quad Room (-Rs 50000)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="specialRequests" className="text-gray-300">
                Special Requests
              </Label>
              <Textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                className="bg-black/40 border-gray-600 text-white"
                rows={3}
                placeholder="Any dietary requirements, accessibility needs, or special requests..."
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Emergency Contact & Additional Services</h3>

            <div className="space-y-4">
              <h4 className="text-lg font-medium text-yellow-400">Emergency Contact Information</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyName" className="text-gray-300">
                    Contact Name *
                  </Label>
                  <Input
                    id="emergencyName"
                    value={formData.emergencyName}
                    onChange={(e) => handleInputChange("emergencyName", e.target.value)}
                    className="bg-black/40 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone" className="text-gray-300">
                    Contact Phone *
                  </Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    className="bg-black/40 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="emergencyRelation" className="text-gray-300">
                  Relationship *
                </Label>
                <Select
                  value={formData.emergencyRelation}
                  onValueChange={(value) => handleInputChange("emergencyRelation", value)}
                >
                  <SelectTrigger className="bg-black/40 border-gray-600 text-white">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-600">
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium text-yellow-400">Additional Services</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="travelInsurance"
                    checked={formData.travelInsurance}
                    onCheckedChange={(checked) => handleInputChange("travelInsurance", checked)}
                  />
                  <Label htmlFor="travelInsurance" className="text-gray-300">
                    Travel Insurance (+Rs 15000)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="airportTransfer"
                    checked={formData.airportTransfer}
                    onCheckedChange={(checked) => handleInputChange("airportTransfer", checked)}
                  />
                  <Label htmlFor="airportTransfer" className="text-gray-300">
                    Airport Transfer (+Rs 8000)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="extraLuggage"
                    checked={formData.extraLuggage}
                    onCheckedChange={(checked) => handleInputChange("extraLuggage", checked)}
                  />
                  <Label htmlFor="extraLuggage" className="text-gray-300">
                    Extra Luggage Allowance (+Rs 20000)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wheelchairAssistance"
                    checked={formData.wheelchairAssistance}
                    onCheckedChange={(checked) => handleInputChange("wheelchairAssistance", checked)}
                  />
                  <Label htmlFor="wheelchairAssistance" className="text-gray-300">
                    Wheelchair Assistance (Free)
                  </Label>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        const calculateTotal = () => {
          let total = selectedPackage?.price || 0
          if (formData.roomType === "single") total += 80000
          if (formData.roomType === "triple") total -= 30000
          if (formData.roomType === "quad") total -= 50000
          if (formData.travelInsurance) total += 15000
          if (formData.airportTransfer) total += 8000
          if (formData.extraLuggage) total += 20000
          return total * formData.passengers
        }

        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Booking Summary</h3>

            <Card className="bg-black/40 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-400">Package Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Package:</span>
                  <span className="text-white font-medium">{selectedPackage?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Duration:</span>
                  <span className="text-white">{selectedPackage?.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Passengers:</span>
                  <span className="text-white">{formData.passengers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Room Type:</span>
                  <span className="text-white capitalize">{formData.roomType} Room</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Departure Date:</span>
                  <span className="text-white">{formData.departureDate}</span>
                </div>
                <Separator className="bg-gray-600" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-yellow-400">Total Amount:</span>
                  <span className="text-yellow-400">Rs {calculateTotal().toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Alert className="bg-yellow-500/10 border-yellow-500/20">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <AlertDescription className="text-yellow-200">
                A deposit of Rs 200000 per person is required to confirm your booking. The remaining balance will be due
                30 days before departure.
              </AlertDescription>
            </Alert>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-black via-gray-900 to-black border border-yellow-500/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Book Your Umrah Journey - Step {step} of 4
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
          <div
            className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            {step === 1 ? "Cancel" : "Previous"}
          </Button>

          <Button
            onClick={() => (step < 4 ? setStep(step + 1) : handleSubmit())}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold hover:from-yellow-500 hover:to-amber-600"
          >
            {step === 4 ? "Confirm Booking" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Document Upload Component
function DocumentUploadSection({ bookingId }: { bookingId: string }) {
  const [uploadedDocs, setUploadedDocs] = useState([
    {
      id: 1,
      name: "Passport Scan",
      fileName: "passport_ahmad_rahman.pdf",
      uploadDate: "2024-12-15",
      status: "approved",
      required: true,
    },
    {
      id: 2,
      name: "Passport Photo",
      fileName: "photo_ahmad_rahman.jpg",
      uploadDate: "2024-12-15",
      status: "approved",
      required: true,
    },
    {
      id: 3,
      name: "Vaccination Certificate",
      fileName: "",
      uploadDate: "",
      status: "pending",
      required: true,
    },
    {
      id: 4,
      name: "Travel Insurance",
      fileName: "insurance_policy.pdf",
      uploadDate: "2024-12-16",
      status: "review",
      required: false,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "review":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "review":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "pending":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-4">
      {uploadedDocs.map((doc) => (
        <Card key={doc.id} className="bg-black/20 border-gray-700/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(doc.status)}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">{doc.name}</span>
                    {doc.required && (
                      <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                        Required
                      </Badge>
                    )}
                  </div>
                  {doc.fileName && (
                    <div className="text-sm text-gray-400">
                      {doc.fileName} • Uploaded {doc.uploadDate}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                <div className="flex space-x-2">
                  {doc.fileName ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Upload className="w-4 h-4 mr-1" />
                        Replace
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600"
                    >
                      <Upload className="w-4 h-4 mr-1" />
                      Upload
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Live Seat Confirmation Component
function LiveSeatConfirmation({ booking }: { booking: any }) {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  const getSeatStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-400 bg-green-500/10"
      case "waitlist":
        return "text-yellow-400 bg-yellow-500/10"
      case "pending":
        return "text-blue-400 bg-blue-500/10"
      default:
        return "text-gray-400 bg-gray-500/10"
    }
  }

  return (
    <Card className="bg-black/20 border-gray-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-white">
            <Users className="w-5 h-5 mr-2 text-yellow-400" />
            Live Seat Status
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium text-yellow-400">Flight Seats</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg border border-gray-700/50 bg-black/20">
                <div className="flex items-center space-x-2">
                  <Plane className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Outbound Flight</span>
                </div>
                <Badge className={getSeatStatusColor(booking.flightSeats.outbound.status)}>
                  {booking.flightSeats.outbound.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-gray-700/50 bg-black/20">
                <div className="flex items-center space-x-2">
                  <Plane className="w-4 h-4 text-gray-400 rotate-180" />
                  <span className="text-sm text-gray-300">Return Flight</span>
                </div>
                <Badge className={getSeatStatusColor(booking.flightSeats.return.status)}>
                  {booking.flightSeats.return.status}
                </Badge>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-yellow-400">Hotel Rooms</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg border border-gray-700/50 bg-black/20">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Madinah Hotel</span>
                </div>
                <Badge className={getSeatStatusColor(booking.hotelRooms.madinah.status)}>
                  {booking.hotelRooms.madinah.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-gray-700/50 bg-black/20">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Makkah Hotel</span>
                </div>
                <Badge className={getSeatStatusColor(booking.hotelRooms.makkah.status)}>
                  {booking.hotelRooms.makkah.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-center space-x-2 text-blue-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Last updated: 2 minutes ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Trip Card Component
function TripCard({ trip }: { trip: any }) {
  const [showEditDialog, setShowEditDialog] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getDaysUntilTrip = (departureDate: string) => {
    const today = new Date()
    const departure = new Date(departureDate)
    const diffTime = departure.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysUntil = getDaysUntilTrip(trip.departureDate)

  return (
    <Card className="overflow-hidden hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 bg-black/40 border-gray-700/50">
      <div className="relative">
        <Image
          src={trip.image || "/placeholder.svg"}
          alt={trip.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <Badge className={`absolute top-3 right-3 ${getStatusColor(trip.status)}`}>{trip.status}</Badge>
        {daysUntil > 0 && daysUntil <= 30 && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold">
            {daysUntil} days to go
          </Badge>
        )}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-white">{trip.title}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-400 mt-2">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {trip.departureDate}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {trip.duration}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {trip.passengers} passengers
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Rs {trip.totalAmount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Booking #{trip.bookingId}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress Bar for Upcoming Trips */}
          {trip.status === "confirmed" && daysUntil > 0 && (
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Trip Progress</span>
                <span>{Math.max(0, 100 - (daysUntil / 90) * 100).toFixed(0)}% Complete</span>
              </div>
              <Progress value={Math.max(0, 100 - (daysUntil / 90) * 100)} className="h-2" />
            </div>
          )}

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center text-gray-300">
              <Plane className="w-4 h-4 mr-2 text-gray-400" />
              <span>{trip.airline}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Building className="w-4 h-4 mr-2 text-gray-400" />
              <span>{trip.hotelRating}★ Hotels</span>
            </div>
            <div className="flex items-center text-gray-300">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <span>{trip.destinations.join(", ")}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Bed className="w-4 h-4 mr-2 text-gray-400" />
              <span>{trip.roomType}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEditDialog(true)}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <Download className="w-4 h-4 mr-1" />
              Documents
            </Button>
            {trip.status === "confirmed" && (
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Support
              </Button>
            )}
          </div>

          {/* Payment Status */}
          {trip.paymentStatus !== "paid" && (
            <Alert className="bg-yellow-500/10 border-yellow-500/20">
              <CreditCard className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-yellow-200">
                {trip.paymentStatus === "deposit" ? (
                  <>
                    Deposit paid. Remaining balance of Rs {trip.remainingAmount.toLocaleString()} due by{" "}
                    {trip.balanceDueDate}.
                  </>
                ) : (
                  <>Payment pending. Please complete your payment to confirm your booking.</>
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Mobile Header Component
function MobileHeader({ customerData }: { customerData: any }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="md:hidden border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
        >
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-gradient-to-br from-black via-gray-900 to-black border-l border-gray-700"
      >
        <div className="flex flex-col space-y-4 mt-8">
          <div className="flex items-center space-x-3 pb-4 border-b border-gray-700">
            <Avatar className="w-12 h-12">
              <AvatarImage src={customerData.avatar || "/placeholder.svg"} alt={customerData.name} />
              <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black">
                {customerData.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-white">{customerData.name}</div>
              <div className="text-sm text-gray-400">{customerData.email}</div>
            </div>
          </div>

          <Button
            variant="outline"
            className="justify-start border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          <Button
            variant="outline"
            className="justify-start border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Separator className="bg-gray-700" />
          <Button
            variant="outline"
            className="justify-start border-red-600 text-red-400 hover:bg-red-900/20 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Mobile Tab Selector
function MobileTabSelector({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const tabs = [
    { value: "upcoming", label: "Upcoming Trips" },
    { value: "documents", label: "Documents" },
    { value: "downloads", label: "Downloads" },
    { value: "bookings", label: "My Bookings" },
    { value: "live-status", label: "Live Status" },
  ]

  return (
    <div className="md:hidden">
      <Select value={activeTab} onValueChange={setActiveTab}>
        <SelectTrigger className="w-full bg-black/40 border-gray-600 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-gray-600">
          {tabs.map((tab) => (
            <SelectItem key={tab.value} value={tab.value} className="text-white">
              {tab.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

// Main Customer Dashboard Component
export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [showPackageDialog, setShowPackageDialog] = useState(false)
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<any>(null)

  // Sample customer data
  const customerData = {
    name: "Ahmad Rahman",
    email: "ahmad.rahman@email.com",
    phone: "+92 300-123 4567",
    memberSince: "2020",
    totalTrips: 5,
    avatar: "/placeholder.svg?height=80&width=80",
  }

  // Sample trips data
  const upcomingTrips = [
    {
      bookingId: "UMR2025001",
      title: "Premium Umrah Package",
      departureDate: "2025-02-15",
      duration: "14 Days",
      passengers: 2,
      totalAmount: 1700000,
      remainingAmount: 1190000,
      balanceDueDate: "2025-01-15",
      status: "confirmed",
      paymentStatus: "deposit",
      airline: "Malaysia Airlines",
      hotelRating: 5,
      destinations: ["Makkah", "Madinah"],
      roomType: "Double Room",
      image: "/placeholder.svg?height=200&width=400",
      emergencyContact: "Siti Rahman - +92 301-7891234",
      dietaryRequirements: "Halal meals only",
      specialRequests: "Wheelchair assistance required",
      roomPreference: "double",
      flightSeats: {
        outbound: { status: "confirmed", seatNumber: "12A, 12B" },
        return: { status: "confirmed", seatNumber: "15C, 15D" },
      },
      hotelRooms: {
        madinah: { status: "confirmed", roomNumber: "1205" },
        makkah: { status: "confirmed", roomNumber: "2108" },
      },
    },
    {
      bookingId: "UMR2025002",
      title: "Economy Umrah Package",
      departureDate: "2025-04-10",
      duration: "10 Days",
      passengers: 1,
      totalAmount: 580000,
      remainingAmount: 0,
      balanceDueDate: "",
      status: "confirmed",
      paymentStatus: "paid",
      airline: "AirAsia X",
      hotelRating: 4,
      destinations: ["Makkah", "Madinah"],
      roomType: "Quad Room",
      image: "/placeholder.svg?height=200&width=400",
      emergencyContact: "Ahmad Ali - +92 302-5678901",
      dietaryRequirements: "No special requirements",
      specialRequests: "Ground floor room preferred",
      roomPreference: "quad",
      flightSeats: {
        outbound: { status: "waitlist", seatNumber: "TBA" },
        return: { status: "pending", seatNumber: "TBA" },
      },
      hotelRooms: {
        madinah: { status: "confirmed", roomNumber: "TBA" },
        makkah: { status: "pending", roomNumber: "TBA" },
      },
    },
  ]

  const pastTrips = [
    {
      bookingId: "UMR2024001",
      title: "Standard Umrah Package",
      departureDate: "2024-11-20",
      duration: "12 Days",
      passengers: 2,
      totalAmount: 1500000,
      status: "completed",
      paymentStatus: "paid",
      airline: "Malaysia Airlines",
      hotelRating: 4,
      destinations: ["Makkah", "Madinah"],
      roomType: "Triple Room",
      image: "/placeholder.svg?height=200&width=400",
      rating: 5,
      review: "Excellent service and well-organized trip!",
    },
  ]

  const downloadableDocuments = [
    {
      id: 1,
      name: "Booking Confirmation",
      type: "PDF",
      bookingId: "UMR2025001",
      date: "2024-12-10",
      icon: FileText,
    },
    {
      id: 2,
      name: "Payment Receipt",
      type: "PDF",
      bookingId: "UMR2025001",
      date: "2024-12-10",
      icon: CreditCard,
    },
    {
      id: 3,
      name: "Travel Itinerary",
      type: "PDF",
      bookingId: "UMR2025001",
      date: "2024-12-15",
      icon: Calendar,
    },
    {
      id: 4,
      name: "Hotel Vouchers",
      type: "PDF",
      bookingId: "UMR2025001",
      date: "2024-12-15",
      icon: Building,
    },
    {
      id: 5,
      name: "Travel Insurance",
      type: "PDF",
      bookingId: "UMR2025001",
      date: "2024-12-16",
      icon: Shield,
    },
  ]

  const handlePackageSelect = (pkg: any) => {
    setSelectedPackage(pkg)
    setShowPackageDialog(false)
    setShowBookingDialog(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative">
      <FloatingElements />

      {/* Header */}
      <div className="bg-black/60 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12 md:w-16 md:h-16">
                <AvatarImage src={customerData.avatar || "/placeholder.svg"} alt={customerData.name} />
                <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold">
                  {customerData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg md:text-2xl font-bold text-white">Welcome back, {customerData.name}!</h1>
                <p className="text-sm md:text-base text-gray-400">
                  Member since {customerData.memberSince} • {customerData.totalTrips} trips completed
                </p>
              </div>
            </div>

            {/* Desktop Header Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>

            {/* Mobile Header Menu */}
            <MobileHeader customerData={customerData} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Desktop Tab List */}
          <TabsList className="hidden md:grid w-full grid-cols-5 bg-black/40 border border-gray-700/50">
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black"
            >
              Upcoming Trips
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black"
            >
              Documents
            </TabsTrigger>
            <TabsTrigger
              value="downloads"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black"
            >
              Downloads
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black"
            >
              My Bookings
            </TabsTrigger>
            <TabsTrigger
              value="live-status"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black"
            >
              Live Status
            </TabsTrigger>
          </TabsList>

          {/* Mobile Tab Selector */}
          <MobileTabSelector activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Upcoming Trips Tab */}
          <TabsContent value="upcoming" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-white">Upcoming Trips</h2>
              <Button
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold hover:from-yellow-500 hover:to-amber-600"
                onClick={() => setShowPackageDialog(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Book New Trip
              </Button>
            </div>
            {upcomingTrips.length > 0 ? (
              <div className="grid lg:grid-cols-2 gap-6">
                {upcomingTrips.map((trip) => (
                  <TripCard key={trip.bookingId} trip={trip} />
                ))}
              </div>
            ) : (
              <Card className="p-8 md:p-12 text-center bg-black/40 border-gray-700/50">
                <Calendar className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">No Upcoming Trips</h3>
                <p className="text-gray-400 mb-6 text-sm md:text-base">
                  You don't have any upcoming trips. Start planning your next spiritual journey!
                </p>
                <Button
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold hover:from-yellow-500 hover:to-amber-600"
                  onClick={() => setShowPackageDialog(true)}
                >
                  Browse Packages
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-white">Upload Documents</h2>
              <Alert className="max-w-md bg-yellow-500/10 border-yellow-500/20">
                <AlertCircle className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-yellow-200 text-sm">
                  Upload required documents for your upcoming trips to ensure smooth processing.
                </AlertDescription>
              </Alert>
            </div>
            {upcomingTrips.map((trip) => (
              <Card key={trip.bookingId} className="bg-black/40 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <span className="text-white text-lg md:text-xl">
                      {trip.title} - {trip.bookingId}
                    </span>
                    <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold w-fit">
                      Departure: {trip.departureDate}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DocumentUploadSection bookingId={trip.bookingId} />
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Downloads Tab */}
          <TabsContent value="downloads" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-white">Download Documents</h2>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 w-fit bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {downloadableDocuments.map((doc) => (
                <Card
                  key={doc.id}
                  className="hover:shadow-md hover:shadow-yellow-500/10 transition-all duration-300 cursor-pointer bg-black/40 border-gray-700/50"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-lg flex items-center justify-center border border-yellow-500/20">
                        <doc.icon className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{doc.name}</h3>
                        <p className="text-sm text-gray-400">Booking: {doc.bookingId}</p>
                        <p className="text-xs text-gray-500">Generated: {doc.date}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-white">All Bookings</h2>
            <div className="space-y-8">
              {/* Upcoming Bookings */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Upcoming Bookings</h3>
                <div className="grid lg:grid-cols-2 gap-6">
                  {upcomingTrips.map((trip) => (
                    <TripCard key={trip.bookingId} trip={trip} />
                  ))}
                </div>
              </div>

              {/* Past Bookings */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Past Bookings</h3>
                <div className="grid lg:grid-cols-2 gap-6">
                  {pastTrips.map((trip) => (
                    <Card key={trip.bookingId} className="overflow-hidden bg-black/40 border-gray-700/50">
                      <div className="relative">
                        <Image
                          src={trip.image || "/placeholder.svg"}
                          alt={trip.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover opacity-75"
                        />
                        <Badge className="absolute top-3 right-3 bg-gray-600/80 text-white">Completed</Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg text-white">{trip.title}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{trip.departureDate}</span>
                          <span>{trip.duration}</span>
                          <span>Booking #{trip.bookingId}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {trip.rating && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[...Array(trip.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-sm text-gray-400">Your Rating</span>
                            </div>
                            <p className="text-sm text-gray-300 italic">"{trip.review}"</p>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Documents
                          </Button>
                          {!trip.rating && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                            >
                              <Star className="w-4 h-4 mr-1" />
                              Rate Trip
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Live Status Tab */}
          <TabsContent value="live-status" className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-white">Live Seat Confirmation</h2>
            {upcomingTrips.map((trip) => (
              <div key={trip.bookingId} className="space-y-4">
                <Card className="bg-black/40 border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <span className="text-white text-lg md:text-xl">
                        {trip.title} - {trip.bookingId}
                      </span>
                      <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold w-fit">
                        Departure: {trip.departureDate}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LiveSeatConfirmation booking={trip} />
                  </CardContent>
                </Card>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Quick Actions Floating Buttons */}
      <div className="fixed bottom-6 right-6 space-y-3 z-50">
        <Button className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600 shadow-lg shadow-yellow-500/20">
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
        </Button>
        <Button className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/20">
          <Phone className="w-5 h-5 md:w-6 md:h-6" />
        </Button>
      </div>

      {/* Package Selection Dialog */}
      <PackageSelectionDialog
        isOpen={showPackageDialog}
        onClose={() => setShowPackageDialog(false)}
        onSelectPackage={handlePackageSelect}
      />

      {/* Booking Form Dialog */}
      <BookingFormDialog
        isOpen={showBookingDialog}
        onClose={() => {
          setShowBookingDialog(false)
          setSelectedPackage(null)
        }}
        selectedPackage={selectedPackage}
      />
    </div>
  )
}
