"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
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

  const handleFileUpload = (docId: number, file: File) => {
    setUploadedDocs((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              fileName: file.name,
              uploadDate: new Date().toISOString().split("T")[0],
              status: "review",
            }
          : doc,
      ),
    )
  }

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
        <Card key={doc.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(doc.status)}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{doc.name}</span>
                    {doc.required && <Badge variant="outline">Required</Badge>}
                  </div>
                  {doc.fileName && (
                    <div className="text-sm text-gray-600">
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
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-1" />
                        Replace
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
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
        return "text-green-600 bg-green-50"
      case "waitlist":
        return "text-yellow-600 bg-yellow-50"
      case "pending":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Live Seat Status
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 mr-1 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium">Flight Seats</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <Plane className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Outbound Flight</span>
                </div>
                <Badge className={getSeatStatusColor(booking.flightSeats.outbound.status)}>
                  {booking.flightSeats.outbound.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <Plane className="w-4 h-4 text-gray-500 rotate-180" />
                  <span className="text-sm">Return Flight</span>
                </div>
                <Badge className={getSeatStatusColor(booking.flightSeats.return.status)}>
                  {booking.flightSeats.return.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Hotel Rooms</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Madinah Hotel</span>
                </div>
                <Badge className={getSeatStatusColor(booking.hotelRooms.madinah.status)}>
                  {booking.hotelRooms.madinah.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Makkah Hotel</span>
                </div>
                <Badge className={getSeatStatusColor(booking.hotelRooms.makkah.status)}>
                  {booking.hotelRooms.makkah.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 text-blue-800">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Last updated: 2 minutes ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Booking Edit Dialog
function BookingEditDialog({ booking, isOpen, onClose }: { booking: any; isOpen: boolean; onClose: () => void }) {
  const [editData, setEditData] = useState({
    emergencyContact: booking.emergencyContact,
    dietaryRequirements: booking.dietaryRequirements,
    specialRequests: booking.specialRequests,
    roomPreference: booking.roomPreference,
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Booking Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={editData.emergencyContact}
                onChange={(e) => setEditData({ ...editData, emergencyContact: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="roomPreference">Room Preference</Label>
              <Select
                value={editData.roomPreference}
                onValueChange={(value) => setEditData({ ...editData, roomPreference: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quad">Quad Room</SelectItem>
                  <SelectItem value="triple">Triple Room</SelectItem>
                  <SelectItem value="double">Double Room</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="dietary">Dietary Requirements</Label>
            <Textarea
              id="dietary"
              value={editData.dietaryRequirements}
              onChange={(e) => setEditData({ ...editData, dietaryRequirements: e.target.value })}
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="special">Special Requests</Label>
            <Textarea
              id="special"
              value={editData.specialRequests}
              onChange={(e) => setEditData({ ...editData, specialRequests: e.target.value })}
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Trip Card Component
function TripCard({ trip }: { trip: any }) {
  const [showEditDialog, setShowEditDialog] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
          <Badge className="absolute top-3 left-3 bg-blue-600 text-white">{daysUntil} days to go</Badge>
        )}
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{trip.title}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
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
            <div className="text-lg font-bold text-emerald-600">RM {trip.totalAmount.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Booking #{trip.bookingId}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Progress Bar for Upcoming Trips */}
          {trip.status === "confirmed" && daysUntil > 0 && (
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Trip Progress</span>
                <span>{Math.max(0, 100 - (daysUntil / 90) * 100).toFixed(0)}% Complete</span>
              </div>
              <Progress value={Math.max(0, 100 - (daysUntil / 90) * 100)} className="h-2" />
            </div>
          )}

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center">
              <Plane className="w-4 h-4 mr-2 text-gray-500" />
              <span>{trip.airline}</span>
            </div>
            <div className="flex items-center">
              <Building className="w-4 h-4 mr-2 text-gray-500" />
              <span>{trip.hotelRating}★ Hotels</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gray-500" />
              <span>{trip.destinations.join(", ")}</span>
            </div>
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-2 text-gray-500" />
              <span>{trip.roomType}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/bookings/${trip.bookingId}`}>
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowEditDialog(true)}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Documents
            </Button>
            {trip.status === "confirmed" && (
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-1" />
                Support
              </Button>
            )}
          </div>

          {/* Payment Status */}
          {trip.paymentStatus !== "paid" && (
            <Alert>
              <CreditCard className="h-4 w-4" />
              <AlertDescription>
                {trip.paymentStatus === "deposit" ? (
                  <>
                    Deposit paid. Remaining balance of RM {trip.remainingAmount.toLocaleString()} due by{" "}
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

      <BookingEditDialog booking={trip} isOpen={showEditDialog} onClose={() => setShowEditDialog(false)} />
    </Card>
  )
}

// Main Customer Dashboard Component
export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("upcoming")

  // Sample customer data
  const customerData = {
    name: "Ahmad Rahman",
    email: "ahmad.rahman@email.com",
    phone: "+60 12-345 6789",
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
      totalAmount: 17000,
      remainingAmount: 11900,
      balanceDueDate: "2025-01-15",
      status: "confirmed",
      paymentStatus: "deposit",
      airline: "Malaysia Airlines",
      hotelRating: 5,
      destinations: ["Makkah", "Madinah"],
      roomType: "Double Room",
      image: "/placeholder.svg?height=200&width=400",
      emergencyContact: "Siti Rahman - +60 12-987 6543",
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
      totalAmount: 5800,
      remainingAmount: 0,
      balanceDueDate: "",
      status: "confirmed",
      paymentStatus: "paid",
      airline: "AirAsia X",
      hotelRating: 4,
      destinations: ["Makkah", "Madinah"],
      roomType: "Quad Room",
      image: "/placeholder.svg?height=200&width=400",
      emergencyContact: "Ahmad Ali - +60 13-456 7890",
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
      totalAmount: 15000,
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={customerData.avatar || "/placeholder.svg"} alt={customerData.name} />
                <AvatarFallback>
                  {customerData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {customerData.name}!</h1>
                <p className="text-gray-600">
                  Member since {customerData.memberSince} • {customerData.totalTrips} trips completed
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="downloads">Downloads</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="live-status">Live Status</TabsTrigger>
          </TabsList>

          {/* Upcoming Trips Tab */}
          <TabsContent value="upcoming" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Trips</h2>
              <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/packages">
                  <Plus className="w-4 h-4 mr-2" />
                  Book New Trip
                </Link>
              </Button>
            </div>

            {upcomingTrips.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {upcomingTrips.map((trip) => (
                  <TripCard key={trip.bookingId} trip={trip} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Upcoming Trips</h3>
                <p className="text-gray-600 mb-6">
                  You don't have any upcoming trips. Start planning your next spiritual journey!
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                  <Link href="/packages">Browse Packages</Link>
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Upload Documents</h2>
              <Alert className="max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Upload required documents for your upcoming trips to ensure smooth processing.
                </AlertDescription>
              </Alert>
            </div>

            {upcomingTrips.map((trip) => (
              <Card key={trip.bookingId}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>
                      {trip.title} - {trip.bookingId}
                    </span>
                    <Badge className="bg-emerald-100 text-emerald-800">Departure: {trip.departureDate}</Badge>
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
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Download Documents</h2>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {downloadableDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <doc.icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{doc.name}</h3>
                        <p className="text-sm text-gray-600">Booking: {doc.bookingId}</p>
                        <p className="text-xs text-gray-500">Generated: {doc.date}</p>
                      </div>
                      <Button variant="outline" size="sm">
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
            <h2 className="text-2xl font-bold text-gray-900">All Bookings</h2>

            <div className="space-y-8">
              {/* Upcoming Bookings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Bookings</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {upcomingTrips.map((trip) => (
                    <TripCard key={trip.bookingId} trip={trip} />
                  ))}
                </div>
              </div>

              {/* Past Bookings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Past Bookings</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {pastTrips.map((trip) => (
                    <Card key={trip.bookingId} className="overflow-hidden">
                      <div className="relative">
                        <Image
                          src={trip.image || "/placeholder.svg"}
                          alt={trip.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover opacity-75"
                        />
                        <Badge className="absolute top-3 right-3 bg-gray-600 text-white">Completed</Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{trip.title}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
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
                              <span className="text-sm text-gray-600">Your Rating</span>
                            </div>
                            <p className="text-sm text-gray-600 italic">"{trip.review}"</p>
                          </div>
                        )}
                        <div className="flex space-x-2 mt-4">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Documents
                          </Button>
                          {!trip.rating && (
                            <Button variant="outline" size="sm">
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
            <h2 className="text-2xl font-bold text-gray-900">Live Seat Confirmation</h2>

            {upcomingTrips.map((trip) => (
              <div key={trip.bookingId} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>
                        {trip.title} - {trip.bookingId}
                      </span>
                      <Badge className="bg-emerald-100 text-emerald-800">Departure: {trip.departureDate}</Badge>
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

      {/* Quick Actions Floating Button */}
      <div className="fixed bottom-6 right-6 space-y-3">
        <Button className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg">
          <MessageCircle className="w-6 h-6" />
        </Button>
        <Button className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg">
          <Phone className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
