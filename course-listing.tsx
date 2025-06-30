"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Search,
  BookOpen,
  GraduationCap,
  AlertCircle,
  CheckCircle,
  Phone,
  MessageCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

// Live Capacity Popup
function LiveCapacityPopup({ course }: { course: any }) {
  const capacityPercentage = (course.registeredCount / course.maxCapacity) * 100
  const getCapacityColor = () => {
    if (capacityPercentage >= 90) return "text-red-600 bg-red-50 border-red-200"
    if (capacityPercentage >= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-green-600 bg-green-50 border-green-200"
  }

  return (
    <div className="w-80 p-4">
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
          Live Capacity
        </h4>
        <Badge variant="outline" className="text-xs">
          Updated 30 seconds ago
        </Badge>
      </div>

      <div className="space-y-4">
        <div className={`p-4 rounded-lg border ${getCapacityColor()}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Available Seats</span>
            <span className="text-2xl font-bold">{course.maxCapacity - course.registeredCount}</span>
          </div>
          <div className="text-sm">
            {course.registeredCount} registered / {course.maxCapacity} total capacity
          </div>
          <div className="mt-2 bg-white/50 rounded-full h-2">
            <div className="h-2 rounded-full bg-current" style={{ width: `${capacityPercentage}%` }}></div>
          </div>
        </div>

        {course.waitlistCount > 0 && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-amber-800">Waitlist</span>
              <span className="text-lg font-bold text-amber-600">{course.waitlistCount}</span>
            </div>
            <div className="text-xs text-amber-700 mt-1">People waiting for available spots</div>
          </div>
        )}

        <div className="text-xs text-gray-500 flex items-center">
          <AlertCircle className="w-3 h-3 mr-1" />
          Registration closes 24 hours before course start
        </div>
      </div>
    </div>
  )
}

// Registration Form Dialog
function RegistrationDialog({
  course,
  isOpen,
  onClose,
  userInfo,
}: {
  course: any
  isOpen: boolean
  onClose: () => void
  userInfo?: any
}) {
  const [formData, setFormData] = useState({
    firstName: userInfo?.firstName || "",
    lastName: userInfo?.lastName || "",
    email: userInfo?.email || "",
    phone: userInfo?.phone || "",
    icNumber: userInfo?.icNumber || "",
    emergencyContact: "",
    emergencyPhone: "",
    dietaryRequirements: "",
    specialNeeds: "",
    previousExperience: "none",
    howDidYouHear: "",
    agreeToTerms: false,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSubmit = () => {
    setShowConfirmation(true)
  }

  const steps = [
    { id: 1, title: "Personal Information", description: "Basic details and contact info" },
    { id: 2, title: "Emergency Contact", description: "Emergency contact and special requirements" },
    { id: 3, title: "Course Information", description: "Experience and preferences" },
    { id: 4, title: "Confirmation", description: "Review and confirm registration" },
  ]

  if (showConfirmation) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <CheckCircle className="w-6 h-6 mr-2" />
              Registration Successful!
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">You're all set!</h3>
              <p className="text-gray-600">
                Your registration for <strong>{course.title}</strong> has been confirmed.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Course:</span>
                <span className="font-medium">{course.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Date:</span>
                <span className="font-medium">{course.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Time:</span>
                <span className="font-medium">{course.time}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Location:</span>
                <span className="font-medium">{course.location}</span>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                A confirmation email with course details and preparation instructions has been sent to your email
                address.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button onClick={onClose} className="w-full bg-emerald-600 hover:bg-emerald-700">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register for {course.title}</DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.id ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.id}
              </div>
              <div className="ml-2 hidden sm:block">
                <div className="text-xs font-medium">{step.title}</div>
              </div>
              {index < steps.length - 1 && <div className="w-8 h-px bg-gray-300 mx-2 hidden sm:block"></div>}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="icNumber">IC Number *</Label>
                  <Input
                    id="icNumber"
                    value={formData.icNumber}
                    onChange={(e) => setFormData({ ...formData, icNumber: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Emergency Contact & Requirements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="dietaryRequirements">Dietary Requirements</Label>
                  <Textarea
                    id="dietaryRequirements"
                    placeholder="Please specify any dietary restrictions or allergies..."
                    value={formData.dietaryRequirements}
                    onChange={(e) => setFormData({ ...formData, dietaryRequirements: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="specialNeeds">Special Needs or Accessibility Requirements</Label>
                  <Textarea
                    id="specialNeeds"
                    placeholder="Please describe any special assistance needed..."
                    value={formData.specialNeeds}
                    onChange={(e) => setFormData({ ...formData, specialNeeds: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Course Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="previousExperience">Previous Umrah/Hajj Experience</Label>
                  <Select
                    value={formData.previousExperience}
                    onValueChange={(value) => setFormData({ ...formData, previousExperience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No previous experience</SelectItem>
                      <SelectItem value="umrah">Performed Umrah before</SelectItem>
                      <SelectItem value="hajj">Performed Hajj before</SelectItem>
                      <SelectItem value="both">Performed both Umrah and Hajj</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="howDidYouHear">How did you hear about this course?</Label>
                  <Select
                    value={formData.howDidYouHear}
                    onValueChange={(value) => setFormData({ ...formData, howDidYouHear: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Company Website</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="friend">Friend/Family Referral</SelectItem>
                      <SelectItem value="agent">Travel Agent</SelectItem>
                      <SelectItem value="mosque">Mosque/Islamic Center</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Confirm Registration</h3>
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Course Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Course:</span>
                      <span className="font-medium">{course.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">{course.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium">{course.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="font-medium">{course.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fee:</span>
                      <span className="font-medium text-emerald-600">{course.fee}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Your Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span className="font-medium">
                        {formData.firstName} {formData.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <span className="font-medium">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Emergency Contact:</span>
                      <span className="font-medium">{formData.emergencyContact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Navigation */}
        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {currentStep < 4 ? (
              <Button
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
                Confirm Registration
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Course Card Component
function CourseCard({ course, onRegister }: { course: any; onRegister: (course: any) => void }) {
  const isFullyBooked = course.registeredCount >= course.maxCapacity
  const isAlmostFull = course.registeredCount >= course.maxCapacity * 0.8
  const spotsLeft = course.maxCapacity - course.registeredCount

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <Image
          src={course.image || "/placeholder.svg?height=200&width=400"}
          alt={course.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Course Type Badge */}
        <Badge className="absolute top-3 left-3 bg-emerald-600 text-white">{course.type}</Badge>

        {/* Capacity Status */}
        <div className="absolute top-3 right-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant="secondary"
                className={`bg-white/90 backdrop-blur-sm hover:bg-white ${
                  isFullyBooked ? "text-red-600" : isAlmostFull ? "text-yellow-600" : "text-green-600"
                }`}
              >
                <Users className="w-4 h-4 mr-1" />
                {spotsLeft} left
              </Button>
            </PopoverTrigger>
            <PopoverContent side="left" className="p-0">
              <LiveCapacityPopup course={course} />
            </PopoverContent>
          </Popover>
        </div>

        {/* Fully Booked Overlay */}
        {isFullyBooked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge className="bg-red-600 text-white text-lg px-4 py-2">Fully Booked</Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg mb-2 line-clamp-2">{course.title}</CardTitle>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{course.date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>
              {course.time} ({course.duration})
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{course.location}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Course Description */}
          <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>

          {/* Course Features */}
          <div className="flex flex-wrap gap-2">
            {course.features.slice(0, 3).map((feature: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {course.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{course.features.length - 3} more
              </Badge>
            )}
          </div>

          {/* Instructor */}
          <div className="flex items-center text-sm">
            <GraduationCap className="w-4 h-4 mr-2 text-emerald-600" />
            <span>
              Instructor: <span className="font-medium">{course.instructor}</span>
            </span>
          </div>

          {/* Fee */}
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-emerald-600">{course.fee}</div>
            {course.originalFee && course.originalFee !== course.fee && (
              <div className="text-sm text-gray-500 line-through">{course.originalFee}</div>
            )}
          </div>

          {/* Registration Button */}
          <div className="pt-2">
            {isFullyBooked ? (
              <Button className="w-full" variant="outline" disabled>
                Fully Booked
              </Button>
            ) : (
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => onRegister(course)}>
                <BookOpen className="w-4 h-4 mr-2" />
                Register Now
              </Button>
            )}
          </div>

          {/* Waitlist Option */}
          {isFullyBooked && (
            <Button variant="outline" className="w-full text-sm">
              Join Waitlist
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Main Course Listing Component
export default function CourseListing() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedDate, setSelectedDate] = useState("all")
  const [showRegistration, setShowRegistration] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)

  // Sample user info (would come from auth context)
  const userInfo = {
    firstName: "Ahmad",
    lastName: "Rahman",
    email: "ahmad.rahman@email.com",
    phone: "+60123456789",
    icNumber: "123456-78-9012",
  }

  // Sample courses data
  const courses = [
    {
      id: 1,
      title: "Umrah Preparation Course - Complete Guide",
      description:
        "Comprehensive course covering all aspects of Umrah pilgrimage including rituals, duas, and practical guidance.",
      date: "15 February 2025",
      time: "9:00 AM - 5:00 PM",
      duration: "8 hours",
      location: "Glocal Travel HQ, Kuala Lumpur",
      type: "Umrah Preparation",
      instructor: "Ustaz Ahmad Fauzi",
      fee: "RM 150",
      originalFee: "RM 200",
      maxCapacity: 50,
      registeredCount: 42,
      waitlistCount: 8,
      image: "/placeholder.svg?height=200&width=400",
      features: [
        "Certificate Provided",
        "Course Materials",
        "Lunch Included",
        "Q&A Session",
        "Practical Demonstrations",
      ],
    },
    {
      id: 2,
      title: "Hajj Preparation Workshop",
      description: "Intensive workshop for Hajj pilgrims covering all rituals, logistics, and spiritual preparation.",
      date: "22 February 2025",
      time: "8:00 AM - 6:00 PM",
      duration: "10 hours",
      location: "Penang Branch Office",
      type: "Hajj Preparation",
      instructor: "Dr. Fatimah Zahra",
      fee: "RM 250",
      originalFee: "",
      maxCapacity: 40,
      registeredCount: 35,
      waitlistCount: 5,
      image: "/placeholder.svg?height=200&width=400",
      features: ["Certificate Provided", "Course Materials", "Meals Included", "Group Activities", "Expert Guidance"],
    },
    {
      id: 3,
      title: "Islamic Travel Etiquette & Manners",
      description: "Learn the proper etiquette and manners for Islamic travel and pilgrimage.",
      date: "1 March 2025",
      time: "2:00 PM - 6:00 PM",
      duration: "4 hours",
      location: "Glocal Travel HQ, Kuala Lumpur",
      type: "Islamic Education",
      instructor: "Ustazah Khadijah",
      fee: "RM 80",
      originalFee: "",
      maxCapacity: 60,
      registeredCount: 25,
      waitlistCount: 0,
      image: "/placeholder.svg?height=200&width=400",
      features: ["Interactive Sessions", "Course Materials", "Refreshments", "Group Discussions"],
    },
    {
      id: 4,
      title: "Duas and Supplications for Pilgrimage",
      description: "Learn essential duas and supplications for Umrah and Hajj with proper pronunciation.",
      date: "8 March 2025",
      time: "10:00 AM - 2:00 PM",
      duration: "4 hours",
      location: "Johor Bahru Branch",
      type: "Islamic Education",
      instructor: "Qari Muhammad Yusuf",
      fee: "RM 100",
      originalFee: "",
      maxCapacity: 30,
      registeredCount: 30,
      waitlistCount: 12,
      image: "/placeholder.svg?height=200&width=400",
      features: ["Audio Recordings", "Pronunciation Guide", "Course Materials", "Practice Sessions"],
    },
    {
      id: 5,
      title: "Women's Umrah Preparation Course",
      description: "Specialized course for women covering specific guidelines and preparations for Umrah.",
      date: "15 March 2025",
      time: "9:00 AM - 4:00 PM",
      duration: "7 hours",
      location: "Glocal Travel HQ, Kuala Lumpur",
      type: "Umrah Preparation",
      instructor: "Ustazah Aishah",
      fee: "RM 120",
      originalFee: "",
      maxCapacity: 35,
      registeredCount: 18,
      waitlistCount: 0,
      image: "/placeholder.svg?height=200&width=400",
      features: ["Women-only Session", "Certificate Provided", "Course Materials", "Lunch Included", "Practical Tips"],
    },
    {
      id: 6,
      title: "First-time Umrah Pilgrims Orientation",
      description: "Essential orientation for first-time Umrah pilgrims covering basics and expectations.",
      date: "22 March 2025",
      time: "7:00 PM - 10:00 PM",
      duration: "3 hours",
      location: "Kota Kinabalu Branch",
      type: "Umrah Preparation",
      instructor: "Ustaz Ibrahim",
      fee: "RM 60",
      originalFee: "",
      maxCapacity: 45,
      registeredCount: 12,
      waitlistCount: 0,
      image: "/placeholder.svg?height=200&width=400",
      features: ["Beginner Friendly", "Course Materials", "Refreshments", "Q&A Session"],
    },
  ]

  const handleRegister = (course: any) => {
    setSelectedCourse(course)
    setShowRegistration(true)
  }

  const filteredCourses = courses.filter((course) => {
    if (searchTerm && !course.title.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (selectedLocation !== "all" && !course.location.toLowerCase().includes(selectedLocation.toLowerCase()))
      return false
    if (selectedType !== "all" && course.type !== selectedType) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Umrah & Hajj Courses</h1>
          <p className="text-xl text-emerald-100 max-w-2xl">
            Prepare for your spiritual journey with our comprehensive courses and workshops
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Courses & Workshops" }]} />

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium">Search Courses</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by title or instructor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="kuala lumpur">Kuala Lumpur HQ</SelectItem>
                    <SelectItem value="penang">Penang Branch</SelectItem>
                    <SelectItem value="johor">Johor Bahru Branch</SelectItem>
                    <SelectItem value="kota kinabalu">Kota Kinabalu Branch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium">Course Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Umrah Preparation">Umrah Preparation</SelectItem>
                    <SelectItem value="Hajj Preparation">Hajj Preparation</SelectItem>
                    <SelectItem value="Islamic Education">Islamic Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium">Date</Label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Dates" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="february">February 2025</SelectItem>
                    <SelectItem value="march">March 2025</SelectItem>
                    <SelectItem value="april">April 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredCourses.length} Course{filteredCourses.length !== 1 ? "s" : ""} Available
            </h2>
            <p className="text-gray-600">Choose from our upcoming courses and workshops</p>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} onRegister={handleRegister} />
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedLocation("all")
                setSelectedType("all")
                setSelectedDate("all")
              }}
              variant="outline"
            >
              Reset Filters
            </Button>
          </div>
        )}

        {/* Contact Section */}
        <Card className="mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help Choosing a Course?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our education team is here to help you select the right course for your needs and answer any questions you
              may have.
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Phone className="w-4 h-4 mr-2" />
                Call Us: +60 12-903 4966
              </Button>
              <Button variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Registration Dialog */}
      {selectedCourse && (
        <RegistrationDialog
          course={selectedCourse}
          isOpen={showRegistration}
          onClose={() => {
            setShowRegistration(false)
            setSelectedCourse(null)
          }}
          userInfo={userInfo}
        />
      )}
    </div>
  )
}
