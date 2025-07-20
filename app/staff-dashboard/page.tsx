"use client"

import { useState } from "react"
import {
  Users,
  Package,
  FileText,
  BarChart3,
  Clock,
  AlertTriangle,
  Search,
  Download,
  Edit,
  Eye,
  Phone,
  Mail,
  Star,
  RefreshCw,
  Menu,
  Bell,
  Settings,
  LogOut,
  User,
  Shield,
  Briefcase,
  TrendingUp,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

// Stats Chart Component
function StatsChart({ data, title }: { data: any[]; title: string }) {
  const maxValue = Math.max(...data.map((item: any) => item.value))
  return (
    <div className="w-full">
      <h4 className="text-sm font-medium text-gray-300 mb-4">{title}</h4>
      <div className="flex items-end h-32 gap-2 mb-2">
        {data.map((item: any, index: number) => (
          <div key={index} className="relative flex-1 group">
            <div
              className="w-full bg-gradient-to-t from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 transition-all rounded-t shadow-lg"
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-yellow-400 text-xs rounded px-2 py-1 whitespace-nowrap border border-yellow-400/20">
                {item.value.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        {data.map((item: any, index: number) => (
          <div key={index} className="text-center">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

// Customer Details Dialog
function CustomerDetailsDialog({
  isOpen,
  onClose,
  customer,
}: {
  isOpen: boolean
  onClose: () => void
  customer: any
}) {
  const [notes, setNotes] = useState(customer?.notes || "")
  const [status, setStatus] = useState(customer?.status || "active")

  const handleSave = () => {
    console.log("Saving customer updates:", { id: customer?.id, notes, status })
    alert("Customer information updated successfully!")
    onClose()
  }

  if (!customer) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-black via-gray-900 to-black border border-yellow-500/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Customer Details - {customer.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="bg-black/40 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-400">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-16 h-16 border-2 border-yellow-400/20">
                  <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold">
                    {customer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-white">{customer.name}</h3>
                  <p className="text-gray-400">{customer.email}</p>
                  <p className="text-gray-400">{customer.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Member Since:</span>
                  <p className="text-white font-medium">{customer.memberSince}</p>
                </div>
                <div>
                  <span className="text-gray-400">Total Bookings:</span>
                  <p className="text-white font-medium">{customer.totalBookings}</p>
                </div>
                <div>
                  <span className="text-gray-400">Total Spent:</span>
                  <p className="text-yellow-400 font-medium">Rs {customer.totalSpent.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-400">Last Activity:</span>
                  <p className="text-white font-medium">{customer.lastActivity}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking History */}
          <Card className="bg-black/40 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-400">Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {customer.recentBookings?.map((booking: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-700/50 rounded-lg bg-black/20"
                  >
                    <div>
                      <p className="font-medium text-white">{booking.package}</p>
                      <p className="text-sm text-gray-400">
                        {booking.date} • {booking.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow-400 font-medium">Rs {booking.amount.toLocaleString()}</p>
                      <Badge
                        className={
                          booking.status === "completed"
                            ? "bg-green-500/20 text-green-400 border-green-400/20"
                            : booking.status === "confirmed"
                              ? "bg-blue-500/20 text-blue-400 border-blue-400/20"
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-400/20"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Actions */}
        <Card className="bg-black/40 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-yellow-400">Staff Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status" className="text-gray-300">
                  Customer Status
                </Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-600">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end space-x-2">
                <Button
                  variant="outline"
                  className="border-blue-400/20 hover:border-blue-400/40 hover:bg-blue-400/10 bg-transparent"
                >
                  <Phone className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-gray-300">Call Customer</span>
                </Button>
                <Button
                  variant="outline"
                  className="border-green-400/20 hover:border-green-400/40 hover:bg-green-400/10 bg-transparent"
                >
                  <Mail className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-gray-300">Send Email</span>
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="notes" className="text-gray-300">
                Staff Notes
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-black/50 border-gray-600 text-white"
                rows={4}
                placeholder="Add notes about this customer..."
              />
            </div>
          </CardContent>
        </Card>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold hover:from-yellow-500 hover:to-amber-600"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Booking Processing Dialog
function BookingProcessingDialog({
  isOpen,
  onClose,
  booking,
}: {
  isOpen: boolean
  onClose: () => void
  booking: any
}) {
  const [status, setStatus] = useState(booking?.status || "pending")
  const [notes, setNotes] = useState("")
  const [assignedAgent, setAssignedAgent] = useState(booking?.assignedAgent || "")

  const handleProcess = () => {
    console.log("Processing booking:", { id: booking?.id, status, notes, assignedAgent })
    alert(`Booking ${status} successfully!`)
    onClose()
  }

  if (!booking) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-gradient-to-br from-black via-gray-900 to-black border border-yellow-500/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Process Booking - {booking.bookingId}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Booking Details */}
          <Card className="bg-black/40 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-400">Booking Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Customer:</p>
                <p className="text-white font-medium">{booking.customerName}</p>
              </div>
              <div>
                <p className="text-gray-400">Package:</p>
                <p className="text-white font-medium">{booking.package}</p>
              </div>
              <div>
                <p className="text-gray-400">Departure Date:</p>
                <p className="text-white font-medium">{booking.departureDate}</p>
              </div>
              <div>
                <p className="text-gray-400">Total Amount:</p>
                <p className="text-yellow-400 font-medium">Rs {booking.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400">Passengers:</p>
                <p className="text-white font-medium">{booking.passengers}</p>
              </div>
              <div>
                <p className="text-gray-400">Payment Status:</p>
                <Badge
                  className={
                    booking.paymentStatus === "paid"
                      ? "bg-green-500/20 text-green-400 border-green-400/20"
                      : booking.paymentStatus === "partial"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-400/20"
                        : "bg-red-500/20 text-red-400 border-red-400/20"
                  }
                >
                  {booking.paymentStatus}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Processing Actions */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status" className="text-gray-300">
                Booking Status
              </Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-600">
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="agent" className="text-gray-300">
                Assign to Agent
              </Label>
              <Select value={assignedAgent} onValueChange={setAssignedAgent}>
                <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-600">
                  <SelectItem value="agent1">Ahmad Faiz - Gold Agent</SelectItem>
                  <SelectItem value="agent2">Siti Nurhaliza - Gold Agent</SelectItem>
                  <SelectItem value="agent3">Mohamed Rizal - Silver Agent</SelectItem>
                  <SelectItem value="agent4">Fatimah Zahra - Bronze Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="processingNotes" className="text-gray-300">
              Processing Notes
            </Label>
            <Textarea
              id="processingNotes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-black/50 border-gray-600 text-white"
              rows={3}
              placeholder="Add notes about the booking processing..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleProcess}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold hover:from-yellow-500 hover:to-amber-600"
          >
            Update Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Document Verification Dialog
function DocumentVerificationDialog({
  isOpen,
  onClose,
  document,
}: {
  isOpen: boolean
  onClose: () => void
  document: any
}) {
  const [verificationStatus, setVerificationStatus] = useState(document?.status || "pending")
  const [feedback, setFeedback] = useState("")

  const handleVerify = () => {
    console.log("Verifying document:", { id: document?.id, status: verificationStatus, feedback })
    alert(`Document ${verificationStatus} successfully!`)
    onClose()
  }

  if (!document) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-black via-gray-900 to-black border border-yellow-500/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Document Verification - {document.type}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Document Preview */}
          <Card className="bg-black/40 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-400">Document Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center border border-gray-600">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">{document.fileName}</p>
                  <p className="text-sm text-gray-500">Click to view full document</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">File Size:</span>
                  <span className="text-white">{document.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Upload Date:</span>
                  <span className="text-white">{document.uploadDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Customer:</span>
                  <span className="text-white">{document.customerName}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Actions */}
          <Card className="bg-black/40 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-400">Verification Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="verificationStatus" className="text-gray-300">
                  Verification Status
                </Label>
                <Select value={verificationStatus} onValueChange={setVerificationStatus}>
                  <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-600">
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="needs_revision">Needs Revision</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="feedback" className="text-gray-300">
                  Feedback/Comments
                </Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="bg-black/50 border-gray-600 text-white"
                  rows={4}
                  placeholder="Provide feedback for the customer..."
                />
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-white">Verification Checklist</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="readable" />
                    <Label htmlFor="readable" className="text-gray-300">
                      Document is clear and readable
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="valid" />
                    <Label htmlFor="valid" className="text-gray-300">
                      Document is valid and not expired
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="matches" />
                    <Label htmlFor="matches" className="text-gray-300">
                      Information matches booking details
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="complete" />
                    <Label htmlFor="complete" className="text-gray-300">
                      All required information is present
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleVerify}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold hover:from-yellow-500 hover:to-amber-600"
          >
            Save Verification
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Mobile Header Component
function MobileHeader({ staffData }: { staffData: any }) {
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
              <AvatarImage src={staffData.avatar || "/placeholder.svg"} alt={staffData.name} />
              <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black">
                {staffData.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-white">{staffData.name}</div>
              <div className="text-sm text-gray-400">{staffData.department}</div>
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

// Main Staff Dashboard Component
export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [showCustomerDialog, setShowCustomerDialog] = useState(false)
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [showDocumentDialog, setShowDocumentDialog] = useState(false)

  // Sample staff data
  const staffData = {
    name: "Sarah Ahmed",
    email: "sarah.ahmed@glocal.com",
    department: "Customer Service",
    staffId: "ST2024001",
    avatar: "/placeholder.svg?height=80&width=80",
  }

  // Sample dashboard stats
  const dashboardStats = {
    totalCustomers: 1247,
    pendingBookings: 23,
    documentsToReview: 15,
    todayTasks: 8,
    monthlyProcessed: 156,
    customerSatisfaction: 94.5,
  }

  // Sample chart data
  const monthlyBookingsData = [
    { label: "Jan", value: 45 },
    { label: "Feb", value: 52 },
    { label: "Mar", value: 38 },
    { label: "Apr", value: 65 },
    { label: "May", value: 58 },
    { label: "Jun", value: 72 },
  ]

  const customerStatusData = [
    { label: "Active", value: 890 },
    { label: "Inactive", value: 245 },
    { label: "VIP", value: 89 },
    { label: "Blocked", value: 23 },
  ]

  // Sample customers data
  const customers = [
    {
      id: 1,
      name: "Ahmad Rahman",
      email: "ahmad.rahman@email.com",
      phone: "+92 300-123 4567",
      status: "active",
      memberSince: "2020-03-15",
      totalBookings: 5,
      totalSpent: 2500000,
      lastActivity: "2 hours ago",
      avatar: "/placeholder.svg",
      notes: "VIP customer, prefers premium packages",
      recentBookings: [
        {
          package: "Premium Umrah Package",
          date: "2025-02-15",
          duration: "14 Days",
          amount: 1700000,
          status: "confirmed",
        },
        {
          package: "Economy Umrah Package",
          date: "2024-11-20",
          duration: "10 Days",
          amount: 580000,
          status: "completed",
        },
      ],
    },
    {
      id: 2,
      name: "Fatima Khan",
      email: "fatima.khan@email.com",
      phone: "+92 301-234 5678",
      status: "vip",
      memberSince: "2019-08-22",
      totalBookings: 8,
      totalSpent: 4200000,
      lastActivity: "1 day ago",
      avatar: "/placeholder.svg",
      notes: "Frequent traveler, family packages preferred",
      recentBookings: [
        {
          package: "Family Umrah Package",
          date: "2025-01-10",
          duration: "12 Days",
          amount: 2400000,
          status: "processing",
        },
        { package: "VIP Umrah Package", date: "2024-09-15", duration: "16 Days", amount: 1800000, status: "completed" },
      ],
    },
    {
      id: 3,
      name: "Mohamed Ali",
      email: "mohamed.ali@email.com",
      phone: "+92 302-345 6789",
      status: "active",
      memberSince: "2021-12-10",
      totalBookings: 2,
      totalSpent: 1200000,
      lastActivity: "3 days ago",
      avatar: "/placeholder.svg",
      notes: "First-time customer, needs guidance",
      recentBookings: [
        {
          package: "Standard Umrah Package",
          date: "2025-03-20",
          duration: "12 Days",
          amount: 850000,
          status: "pending",
        },
      ],
    },
  ]

  // Sample bookings data
  const pendingBookings = [
    {
      id: 1,
      bookingId: "UMR2025001",
      customerName: "Ahmad Rahman",
      package: "Premium Umrah Package",
      departureDate: "2025-02-15",
      amount: 1700000,
      passengers: 2,
      status: "pending",
      paymentStatus: "partial",
      submittedDate: "2025-01-10",
      assignedAgent: "",
    },
    {
      id: 2,
      bookingId: "UMR2025002",
      customerName: "Fatima Khan",
      package: "Family Umrah Package",
      departureDate: "2025-03-01",
      amount: 2400000,
      passengers: 4,
      status: "processing",
      paymentStatus: "paid",
      submittedDate: "2025-01-08",
      assignedAgent: "Ahmad Faiz",
    },
    {
      id: 3,
      bookingId: "UMR2025003",
      customerName: "Mohamed Ali",
      package: "Standard Umrah Package",
      departureDate: "2025-03-20",
      amount: 850000,
      passengers: 1,
      status: "pending",
      paymentStatus: "pending",
      submittedDate: "2025-01-12",
      assignedAgent: "",
    },
  ]

  // Sample documents data
  const documentsToReview = [
    {
      id: 1,
      type: "Passport",
      fileName: "passport_ahmad_rahman.pdf",
      customerName: "Ahmad Rahman",
      bookingId: "UMR2025001",
      uploadDate: "2025-01-10",
      status: "pending",
      fileSize: "2.4 MB",
    },
    {
      id: 2,
      type: "Vaccination Certificate",
      fileName: "vaccine_fatima_khan.pdf",
      customerName: "Fatima Khan",
      bookingId: "UMR2025002",
      uploadDate: "2025-01-09",
      status: "pending",
      fileSize: "1.8 MB",
    },
    {
      id: 3,
      type: "Travel Insurance",
      fileName: "insurance_mohamed_ali.pdf",
      customerName: "Mohamed Ali",
      bookingId: "UMR2025003",
      uploadDate: "2025-01-11",
      status: "needs_revision",
      fileSize: "3.1 MB",
    },
  ]

  const handleCustomerView = (customer: any) => {
    setSelectedCustomer(customer)
    setShowCustomerDialog(true)
  }

  const handleBookingProcess = (booking: any) => {
    setSelectedBooking(booking)
    setShowBookingDialog(true)
  }

  const handleDocumentReview = (document: any) => {
    setSelectedDocument(document)
    setShowDocumentDialog(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300/5 rounded-full blur-2xl animate-bounce"></div>

        {/* Floating Business Icons */}
        <div className="absolute top-20 right-20 animate-pulse">
          <Briefcase className="w-12 h-12 text-yellow-400/20" />
        </div>
        <div className="absolute top-32 left-10 animate-pulse delay-1000">
          <TrendingUp className="w-8 h-8 text-amber-400/20" />
        </div>
        <div className="absolute bottom-32 right-32 animate-pulse delay-2000">
          <Star className="w-10 h-10 text-yellow-300/20" />
        </div>
        <div className="absolute bottom-10 left-32 animate-pulse delay-3000">
          <Shield className="w-7 h-7 text-amber-300/20" />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/40 backdrop-blur-md border-b border-yellow-400/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-16 h-16 border-2 border-yellow-400/40">
                  <AvatarImage src={staffData.avatar || "/placeholder.svg"} alt={staffData.name} />
                  <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold text-lg">
                    {staffData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1">
                  <User className="w-6 h-6 text-yellow-400 animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  {staffData.name}
                </h1>
                <p className="text-gray-400">
                  {staffData.department} • ID: {staffData.staffId}
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent"
              >
                <Bell className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-gray-300">Notifications</span>
                <Badge className="ml-2 bg-red-500/20 text-red-400 border-red-400/20">3</Badge>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent"
              >
                <Settings className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-gray-300">Settings</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-red-400/20 hover:border-red-400/40 hover:bg-red-400/10 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2 text-red-400" />
                <span className="text-gray-300">Logout</span>
              </Button>
            </div>

            {/* Mobile Menu */}
            <MobileHeader staffData={staffData} />
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-black/40 backdrop-blur-md border border-yellow-400/20">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="customers"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black"
            >
              Customers
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black"
            >
              Bookings
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black"
            >
              Documents
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black"
            >
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Total Customers</p>
                      <h3 className="text-2xl font-bold text-white">
                        {dashboardStats.totalCustomers.toLocaleString()}
                      </h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 font-medium">+8.2%</span>
                    <span className="text-gray-400 ml-1">this month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Pending Bookings</p>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                        {dashboardStats.pendingBookings}
                      </h3>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-yellow-400" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <Clock className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-yellow-400 font-medium">Needs attention</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Documents to Review</p>
                      <h3 className="text-2xl font-bold text-white">{dashboardStats.documentsToReview}</h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <AlertTriangle className="w-4 h-4 text-orange-400 mr-1" />
                    <span className="text-orange-400 font-medium">Priority review</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Customer Satisfaction</p>
                      <h3 className="text-2xl font-bold text-green-400">{dashboardStats.customerSatisfaction}%</h3>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 font-medium">+2.1%</span>
                    <span className="text-gray-400 ml-1">this month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
                <CardHeader>
                  <CardTitle className="text-white">Monthly Bookings Processed</CardTitle>
                </CardHeader>
                <CardContent>
                  <StatsChart data={monthlyBookingsData} title="Bookings" />
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
                <CardHeader>
                  <CardTitle className="text-white">Customer Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <StatsChart data={customerStatusData} title="Customers" />
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold flex-col"
                    onClick={() => setActiveTab("customers")}
                  >
                    <Users className="w-6 h-6 mb-2" />
                    View Customers
                  </Button>
                  <Button
                    className="h-20 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold flex-col"
                    onClick={() => setActiveTab("bookings")}
                  >
                    <Package className="w-6 h-6 mb-2" />
                    Process Bookings
                  </Button>
                  <Button
                    className="h-20 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold flex-col"
                    onClick={() => setActiveTab("documents")}
                  >
                    <FileText className="w-6 h-6 mb-2" />
                    Review Documents
                  </Button>
                  <Button
                    className="h-20 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold flex-col"
                    onClick={() => setActiveTab("reports")}
                  >
                    <BarChart3 className="w-6 h-6 mb-2" />
                    Generate Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Customer Management
              </h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    className="pl-9 w-[250px] bg-black/50 border-yellow-400/20 text-white placeholder:text-gray-500 focus:border-yellow-400"
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px] bg-black/50 border-yellow-400/20 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 border-yellow-400/20">
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
              <CardContent className="p-0">
                <div className="rounded-lg border border-yellow-400/20 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-yellow-400/20 hover:bg-yellow-400/5">
                        <TableHead className="text-yellow-400">Customer</TableHead>
                        <TableHead className="text-yellow-400">Status</TableHead>
                        <TableHead className="text-yellow-400">Total Bookings</TableHead>
                        <TableHead className="text-yellow-400">Total Spent</TableHead>
                        <TableHead className="text-yellow-400">Last Activity</TableHead>
                        <TableHead className="text-right text-yellow-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.map((customer) => (
                        <TableRow key={customer.id} className="border-yellow-400/10 hover:bg-yellow-400/5">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="border border-yellow-400/20">
                                <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold">
                                  {customer.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-white">{customer.name}</p>
                                <p className="text-sm text-gray-400">{customer.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                customer.status === "active"
                                  ? "bg-green-500/20 text-green-400 border-green-400/20"
                                  : customer.status === "vip"
                                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-400/20"
                                    : "bg-gray-500/20 text-gray-400 border-gray-400/20"
                              }
                            >
                              {customer.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-300">{customer.totalBookings}</TableCell>
                          <TableCell className="text-yellow-400 font-medium">
                            Rs {customer.totalSpent.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-gray-300">{customer.lastActivity}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-yellow-400/10"
                                onClick={() => handleCustomerView(customer)}
                              >
                                <Eye className="w-4 h-4 text-yellow-400" />
                              </Button>
                              <Button variant="ghost" size="sm" className="hover:bg-blue-400/10">
                                <Phone className="w-4 h-4 text-blue-400" />
                              </Button>
                              <Button variant="ghost" size="sm" className="hover:bg-green-400/10">
                                <Mail className="w-4 h-4 text-green-400" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Booking Management
              </h2>
              <div className="flex items-center space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px] bg-black/50 border-yellow-400/20 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 border-yellow-400/20">
                    <SelectItem value="all">All Bookings</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-gray-300">Export</span>
                </Button>
              </div>
            </div>

            <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
              <CardContent className="p-0">
                <div className="rounded-lg border border-yellow-400/20 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-yellow-400/20 hover:bg-yellow-400/5">
                        <TableHead className="text-yellow-400">Booking ID</TableHead>
                        <TableHead className="text-yellow-400">Customer</TableHead>
                        <TableHead className="text-yellow-400">Package</TableHead>
                        <TableHead className="text-yellow-400">Amount</TableHead>
                        <TableHead className="text-yellow-400">Status</TableHead>
                        <TableHead className="text-yellow-400">Payment</TableHead>
                        <TableHead className="text-right text-yellow-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingBookings.map((booking) => (
                        <TableRow key={booking.id} className="border-yellow-400/10 hover:bg-yellow-400/5">
                          <TableCell className="font-medium text-white">{booking.bookingId}</TableCell>
                          <TableCell className="text-gray-300">{booking.customerName}</TableCell>
                          <TableCell className="text-gray-300">{booking.package}</TableCell>
                          <TableCell className="text-yellow-400 font-medium">
                            Rs {booking.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                booking.status === "confirmed"
                                  ? "bg-green-500/20 text-green-400 border-green-400/20"
                                  : booking.status === "processing"
                                    ? "bg-blue-500/20 text-blue-400 border-blue-400/20"
                                    : "bg-yellow-500/20 text-yellow-400 border-yellow-400/20"
                              }
                            >
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                booking.paymentStatus === "paid"
                                  ? "bg-green-500/20 text-green-400 border-green-400/20"
                                  : booking.paymentStatus === "partial"
                                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-400/20"
                                    : "bg-red-500/20 text-red-400 border-red-400/20"
                              }
                            >
                              {booking.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-yellow-400/10"
                                onClick={() => handleBookingProcess(booking)}
                              >
                                <Edit className="w-4 h-4 text-yellow-400" />
                              </Button>
                              <Button variant="ghost" size="sm" className="hover:bg-blue-400/10">
                                <Eye className="w-4 h-4 text-blue-400" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Document Verification
              </h2>
              <div className="flex items-center space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px] bg-black/50 border-yellow-400/20 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 border-yellow-400/20">
                    <SelectItem value="all">All Documents</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent"
                >
                  <RefreshCw className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-gray-300">Refresh</span>
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {documentsToReview.map((document) => (
                <Card
                  key={document.id}
                  className="bg-black/40 backdrop-blur-md border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-lg flex items-center justify-center border border-yellow-500/20">
                          <FileText className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{document.type}</h3>
                          <p className="text-sm text-gray-400">{document.fileName}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <span>Customer: {document.customerName}</span>
                            <span>Booking: {document.bookingId}</span>
                            <span>Size: {document.fileSize}</span>
                            <span>Uploaded: {document.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          className={
                            document.status === "approved"
                              ? "bg-green-500/20 text-green-400 border-green-400/20"
                              : document.status === "rejected"
                                ? "bg-red-500/20 text-red-400 border-red-400/20"
                                : document.status === "needs_revision"
                                  ? "bg-orange-500/20 text-orange-400 border-orange-400/20"
                                  : "bg-yellow-500/20 text-yellow-400 border-yellow-400/20"
                          }
                        >
                          {document.status.replace("_", " ")}
                        </Badge>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold hover:from-yellow-500 hover:to-amber-600"
                          onClick={() => handleDocumentReview(document)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Reports & Analytics
              </h2>
              <div className="flex items-center space-x-2">
                <Select defaultValue="thisMonth">
                  <SelectTrigger className="w-[150px] bg-black/50 border-yellow-400/20 text-white">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 border-yellow-400/20">
                    <SelectItem value="thisWeek">This Week</SelectItem>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="thisQuarter">This Quarter</SelectItem>
                    <SelectItem value="thisYear">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-gray-300">Export Report</span>
                </Button>
              </div>
            </div>

            {/* Report Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-yellow-400" />
                    Monthly Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bookings Processed:</span>
                      <span className="text-white font-medium">{dashboardStats.monthlyProcessed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Customer Satisfaction:</span>
                      <span className="text-green-400 font-medium">{dashboardStats.customerSatisfaction}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Response Time:</span>
                      <span className="text-white font-medium">2.3 hours</span>
                    </div>
                    <Progress value={85} className="h-2 bg-gray-700" />
                    <p className="text-sm text-gray-400">85% of monthly target achieved</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-400" />
                    Customer Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">New Customers:</span>
                      <span className="text-white font-medium">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Returning Customers:</span>
                      <span className="text-white font-medium">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">VIP Customers:</span>
                      <span className="text-yellow-400 font-medium">23</span>
                    </div>
                    <Progress value={65} className="h-2 bg-gray-700" />
                    <p className="text-sm text-gray-400">65% customer retention rate</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                    Revenue Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Revenue:</span>
                      <span className="text-green-400 font-medium">Rs 12.5M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg. Booking Value:</span>
                      <span className="text-white font-medium">Rs 850K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Commission Earned:</span>
                      <span className="text-yellow-400 font-medium">Rs 1.2M</span>
                    </div>
                    <Progress value={78} className="h-2 bg-gray-700" />
                    <p className="text-sm text-gray-400">78% of revenue target achieved</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Reports */}
            <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
              <CardHeader>
                <CardTitle className="text-white">Detailed Activity Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-yellow-400/20 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-yellow-400/20 hover:bg-yellow-400/5">
                        <TableHead className="text-yellow-400">Date</TableHead>
                        <TableHead className="text-yellow-400">Activity</TableHead>
                        <TableHead className="text-yellow-400">Customer</TableHead>
                        <TableHead className="text-yellow-400">Status</TableHead>
                        <TableHead className="text-yellow-400">Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-yellow-400/10 hover:bg-yellow-400/5">
                        <TableCell className="text-gray-300">2025-01-12</TableCell>
                        <TableCell className="text-white">Booking Processed</TableCell>
                        <TableCell className="text-gray-300">Ahmad Rahman</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500/20 text-green-400 border-green-400/20">Completed</Badge>
                        </TableCell>
                        <TableCell className="text-yellow-400">Rs 1,700,000</TableCell>
                      </TableRow>
                      <TableRow className="border-yellow-400/10 hover:bg-yellow-400/5">
                        <TableCell className="text-gray-300">2025-01-12</TableCell>
                        <TableCell className="text-white">Document Verified</TableCell>
                        <TableCell className="text-gray-300">Fatima Khan</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500/20 text-green-400 border-green-400/20">Approved</Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">-</TableCell>
                      </TableRow>
                      <TableRow className="border-yellow-400/10 hover:bg-yellow-400/5">
                        <TableCell className="text-gray-300">2025-01-11</TableCell>
                        <TableCell className="text-white">Customer Support</TableCell>
                        <TableCell className="text-gray-300">Mohamed Ali</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/20">Resolved</Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">-</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <CustomerDetailsDialog
        isOpen={showCustomerDialog}
        onClose={() => setShowCustomerDialog(false)}
        customer={selectedCustomer}
      />
      <BookingProcessingDialog
        isOpen={showBookingDialog}
        onClose={() => setShowBookingDialog(false)}
        booking={selectedBooking}
      />
      <DocumentVerificationDialog
        isOpen={showDocumentDialog}
        onClose={() => setShowDocumentDialog(false)}
        document={selectedDocument}
      />
    </div>
  )
}
