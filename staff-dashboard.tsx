"use client"

import { useState } from "react"
import {
  Package,
  Upload,
  Download,
  User,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
  Eye,
  RefreshCw,
  Trash2,
  DollarSign,
  FileCheck,
  CalendarClock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sales Chart Component
function SalesChart({ data }: { data: any }) {
  // This is a simplified chart representation
  const maxValue = Math.max(...data.map((item: any) => item.value))

  return (
    <div className="w-full">
      <div className="flex items-end h-40 gap-2 mt-4 mb-2">
        {data.map((item: any, index: number) => (
          <div key={index} className="relative flex-1 group">
            <div
              className="w-full bg-blue-500 hover:bg-blue-600 transition-all rounded-t"
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                {item.value.toLocaleString()} MYR
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        {data.map((item: any, index: number) => (
          <div key={index} className="text-center">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

// Package Availability Manager Component
function PackageAvailabilityManager() {
  const [selectedPackage, setSelectedPackage] = useState("all")
  const [selectedDate, setSelectedDate] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [currentPackage, setCurrentPackage] = useState<any>(null)

  // Sample packages data
  const packages = [
    {
      id: "UMR2025001",
      title: "Premium Umrah Package",
      departureDate: "2025-02-15",
      returnDate: "2025-03-01",
      totalSeats: 40,
      availableSeats: 12,
      bookedSeats: 28,
      waitlistSeats: 5,
      flightDetails: {
        outbound: {
          flight: "MH8201",
          totalSeats: 40,
          bookedSeats: 28,
          availableSeats: 12,
        },
        return: {
          flight: "MH8202",
          totalSeats: 40,
          bookedSeats: 28,
          availableSeats: 12,
        },
      },
      hotelDetails: {
        madinah: {
          hotel: "Pullman Zamzam Madinah",
          roomTypes: {
            quad: { total: 10, booked: 7, available: 3 },
            triple: { total: 8, booked: 6, available: 2 },
            double: { total: 6, booked: 5, available: 1 },
          },
        },
        makkah: {
          hotel: "Fairmont Makkah Clock Royal Tower",
          roomTypes: {
            quad: { total: 10, booked: 7, available: 3 },
            triple: { total: 8, booked: 6, available: 2 },
            double: { total: 6, booked: 5, available: 1 },
          },
        },
      },
    },
    {
      id: "UMR2025002",
      title: "Economy Umrah Package",
      departureDate: "2025-04-10",
      returnDate: "2025-04-20",
      totalSeats: 35,
      availableSeats: 8,
      bookedSeats: 27,
      waitlistSeats: 3,
      flightDetails: {
        outbound: {
          flight: "MH8203",
          totalSeats: 35,
          bookedSeats: 27,
          availableSeats: 8,
        },
        return: {
          flight: "MH8204",
          totalSeats: 35,
          bookedSeats: 27,
          availableSeats: 8,
        },
      },
      hotelDetails: {
        madinah: {
          hotel: "Al Eiman Royal Hotel",
          roomTypes: {
            quad: { total: 8, booked: 6, available: 2 },
            triple: { total: 6, booked: 5, available: 1 },
          },
        },
        makkah: {
          hotel: "Makkah Millennium Hotel",
          roomTypes: {
            quad: { total: 8, booked: 6, available: 2 },
            triple: { total: 6, booked: 5, available: 1 },
          },
        },
      },
    },
    {
      id: "HJJ2025001",
      title: "Hajj Package 2025",
      departureDate: "2025-05-15",
      returnDate: "2025-06-05",
      totalSeats: 30,
      availableSeats: 3,
      bookedSeats: 27,
      waitlistSeats: 8,
      flightDetails: {
        outbound: {
          flight: "MH8205",
          totalSeats: 30,
          bookedSeats: 27,
          availableSeats: 3,
        },
        return: {
          flight: "MH8206",
          totalSeats: 30,
          bookedSeats: 27,
          availableSeats: 3,
        },
      },
      hotelDetails: {
        madinah: {
          hotel: "Anwar Al Madinah Mövenpick Hotel",
          roomTypes: {
            quad: { total: 7, booked: 6, available: 1 },
            triple: { total: 6, booked: 6, available: 0 },
          },
        },
        makkah: {
          hotel: "Swissôtel Al Maqam Makkah",
          roomTypes: {
            quad: { total: 7, booked: 6, available: 1 },
            triple: { total: 6, booked: 6, available: 0 },
          },
        },
      },
    },
  ]

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  const handleEditPackage = (pkg: any) => {
    setCurrentPackage(pkg)
    setShowEditDialog(true)
  }

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100
    if (percentage > 30) return "text-green-600 bg-green-50"
    if (percentage > 10) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Package Availability Manager</h2>
        <div className="flex items-center space-x-2">
          <Select value={selectedPackage} onValueChange={setSelectedPackage}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select package" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Packages</SelectItem>
              <SelectItem value="umrah">Umrah Packages</SelectItem>
              <SelectItem value="hajj">Hajj Packages</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select departure date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="feb2025">February 2025</SelectItem>
              <SelectItem value="apr2025">April 2025</SelectItem>
              <SelectItem value="may2025">May 2025</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {packages.map((pkg) => (
        <Card key={pkg.id} className="overflow-hidden">
          <CardHeader className="bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  {pkg.title}
                </CardTitle>
                <CardDescription>
                  ID: {pkg.id} • {pkg.departureDate} to {pkg.returnDate}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={getAvailabilityColor(pkg.availableSeats, pkg.totalSeats)}>
                  {pkg.availableSeats}/{pkg.totalSeats} seats available
                </Badge>
                <Button variant="outline" size="sm" onClick={() => handleEditPackage(pkg)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Flight Availability */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Flight Availability</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">Outbound Flight</h4>
                          <p className="text-sm text-gray-500">{pkg.flightDetails.outbound.flight}</p>
                        </div>
                        <Badge
                          className={getAvailabilityColor(
                            pkg.flightDetails.outbound.availableSeats,
                            pkg.flightDetails.outbound.totalSeats,
                          )}
                        >
                          {pkg.flightDetails.outbound.availableSeats}/{pkg.flightDetails.outbound.totalSeats} seats
                        </Badge>
                      </div>
                      <Progress
                        value={(pkg.flightDetails.outbound.bookedSeats / pkg.flightDetails.outbound.totalSeats) * 100}
                        className="h-2"
                      />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">Return Flight</h4>
                          <p className="text-sm text-gray-500">{pkg.flightDetails.return.flight}</p>
                        </div>
                        <Badge
                          className={getAvailabilityColor(
                            pkg.flightDetails.return.availableSeats,
                            pkg.flightDetails.return.totalSeats,
                          )}
                        >
                          {pkg.flightDetails.return.availableSeats}/{pkg.flightDetails.return.totalSeats} seats
                        </Badge>
                      </div>
                      <Progress
                        value={(pkg.flightDetails.return.bookedSeats / pkg.flightDetails.return.totalSeats) * 100}
                        className="h-2"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Hotel Availability */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Hotel Availability</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Madinah Hotel */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{pkg.hotelDetails.madinah.hotel}</CardTitle>
                      <CardDescription>Madinah</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Room Type</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Booked</TableHead>
                            <TableHead>Available</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Object.entries(pkg.hotelDetails.madinah.roomTypes).map(([type, data]: [string, any]) => (
                            <TableRow key={type}>
                              <TableCell className="font-medium capitalize">{type}</TableCell>
                              <TableCell>{data.total}</TableCell>
                              <TableCell>{data.booked}</TableCell>
                              <TableCell>
                                <Badge className={getAvailabilityColor(data.available, data.total)}>
                                  {data.available}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Makkah Hotel */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{pkg.hotelDetails.makkah.hotel}</CardTitle>
                      <CardDescription>Makkah</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Room Type</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Booked</TableHead>
                            <TableHead>Available</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Object.entries(pkg.hotelDetails.makkah.roomTypes).map(([type, data]: [string, any]) => (
                            <TableRow key={type}>
                              <TableCell className="font-medium capitalize">{type}</TableCell>
                              <TableCell>{data.total}</TableCell>
                              <TableCell>{data.booked}</TableCell>
                              <TableCell>
                                <Badge className={getAvailabilityColor(data.available, data.total)}>
                                  {data.available}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Waitlist Information */}
              {pkg.waitlistSeats > 0 && (
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    There are currently <strong>{pkg.waitlistSeats} customers</strong> on the waitlist for this package.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Edit Package Availability Dialog */}
      {currentPackage && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Edit Package Availability</DialogTitle>
              <DialogDescription>
                Update seat and room availability for {currentPackage.title} ({currentPackage.id})
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Flight Availability Editor */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Flight Availability</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label>Outbound Flight ({currentPackage.flightDetails.outbound.flight})</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm">Total Seats</Label>
                        <Input type="number" defaultValue={currentPackage.flightDetails.outbound.totalSeats} />
                      </div>
                      <div>
                        <Label className="text-sm">Booked Seats</Label>
                        <Input type="number" defaultValue={currentPackage.flightDetails.outbound.bookedSeats} />
                      </div>
                      <div>
                        <Label className="text-sm">Available Seats</Label>
                        <Input
                          type="number"
                          defaultValue={currentPackage.flightDetails.outbound.availableSeats}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label>Return Flight ({currentPackage.flightDetails.return.flight})</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm">Total Seats</Label>
                        <Input type="number" defaultValue={currentPackage.flightDetails.return.totalSeats} />
                      </div>
                      <div>
                        <Label className="text-sm">Booked Seats</Label>
                        <Input type="number" defaultValue={currentPackage.flightDetails.return.bookedSeats} />
                      </div>
                      <div>
                        <Label className="text-sm">Available Seats</Label>
                        <Input
                          type="number"
                          defaultValue={currentPackage.flightDetails.return.availableSeats}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hotel Availability Editor */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Hotel Availability</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Madinah Hotel */}
                  <div className="space-y-3">
                    <Label>{currentPackage.hotelDetails.madinah.hotel} (Madinah)</Label>
                    <div className="space-y-4">
                      {Object.entries(currentPackage.hotelDetails.madinah.roomTypes).map(
                        ([type, data]: [string, any]) => (
                          <div key={type} className="border p-3 rounded-md">
                            <Label className="capitalize mb-2 block">{type} Rooms</Label>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <Label className="text-sm">Total</Label>
                                <Input type="number" defaultValue={data.total} />
                              </div>
                              <div>
                                <Label className="text-sm">Booked</Label>
                                <Input type="number" defaultValue={data.booked} />
                              </div>
                              <div>
                                <Label className="text-sm">Available</Label>
                                <Input type="number" defaultValue={data.available} disabled />
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Makkah Hotel */}
                  <div className="space-y-3">
                    <Label>{currentPackage.hotelDetails.makkah.hotel} (Makkah)</Label>
                    <div className="space-y-4">
                      {Object.entries(currentPackage.hotelDetails.makkah.roomTypes).map(
                        ([type, data]: [string, any]) => (
                          <div key={type} className="border p-3 rounded-md">
                            <Label className="capitalize mb-2 block">{type} Rooms</Label>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <Label className="text-sm">Total</Label>
                                <Input type="number" defaultValue={data.total} />
                              </div>
                              <div>
                                <Label className="text-sm">Booked</Label>
                                <Input type="number" defaultValue={data.booked} />
                              </div>
                              <div>
                                <Label className="text-sm">Available</Label>
                                <Input type="number" defaultValue={data.available} disabled />
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Waitlist Management */}
              <div className="space-y-3">
                <Label>Waitlist Management</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Current Waitlist</Label>
                    <Input type="number" defaultValue={currentPackage.waitlistSeats} />
                  </div>
                  <div>
                    <Label className="text-sm">Waitlist Capacity</Label>
                    <Input type="number" defaultValue={20} />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Payment Status Component
function PaymentStatusManager() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPackage, setSelectedPackage] = useState("all")
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [currentBooking, setCurrentBooking] = useState<any>(null)

  // Sample bookings data
  const bookings = [
    {
      id: "BK25001",
      customer: "Ahmad Rahman",
      package: "Premium Umrah Package",
      packageId: "UMR2025001",
      departureDate: "2025-02-15",
      totalAmount: 17000,
      paidAmount: 17000,
      remainingAmount: 0,
      paymentStatus: "paid",
      paymentHistory: [
        { date: "2024-12-10", amount: 5100, method: "Bank Transfer", reference: "INV25001-DEP" },
        { date: "2025-01-15", amount: 11900, method: "Credit Card", reference: "INV25001-FULL" },
      ],
    },
    {
      id: "BK25002",
      customer: "Nurul Huda",
      package: "Economy Umrah Package",
      packageId: "UMR2025002",
      departureDate: "2025-04-10",
      totalAmount: 5800,
      paidAmount: 1740,
      remainingAmount: 4060,
      paymentStatus: "partial",
      paymentDueDate: "2025-03-10",
      paymentHistory: [{ date: "2025-01-10", amount: 1740, method: "Credit Card", reference: "INV25002-DEP" }],
    },
    {
      id: "BK25003",
      customer: "Ismail Abdullah",
      package: "Premium Umrah Package",
      packageId: "UMR2025001",
      departureDate: "2025-02-15",
      totalAmount: 17000,
      paidAmount: 5100,
      remainingAmount: 11900,
      paymentStatus: "partial",
      paymentDueDate: "2025-01-15",
      paymentHistory: [{ date: "2024-12-05", amount: 5100, method: "Bank Transfer", reference: "INV25003-DEP" }],
    },
    {
      id: "BK25004",
      customer: "Fatimah Zahra",
      package: "Luxury Umrah Experience",
      packageId: "UMR2025003",
      departureDate: "2025-03-12",
      totalAmount: 24000,
      paidAmount: 0,
      remainingAmount: 24000,
      paymentStatus: "unpaid",
      paymentDueDate: "2025-01-12",
      paymentHistory: [],
    },
    {
      id: "BK25005",
      customer: "Abdul Rahman",
      package: "Hajj Package 2025",
      packageId: "HJJ2025001",
      departureDate: "2025-05-15",
      totalAmount: 18500,
      paidAmount: 18500,
      remainingAmount: 0,
      paymentStatus: "paid",
      paymentHistory: [
        { date: "2024-11-20", amount: 5550, method: "Bank Transfer", reference: "INV25005-DEP" },
        { date: "2024-12-20", amount: 12950, method: "Bank Transfer", reference: "INV25005-FULL" },
      ],
    },
  ]

  const handleViewPayment = (booking: any) => {
    setCurrentBooking(booking)
    setShowPaymentDialog(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "partial":
        return "bg-yellow-100 text-yellow-800"
      case "unpaid":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    if (selectedStatus !== "all" && booking.paymentStatus !== selectedStatus) return false
    if (selectedPackage !== "all" && !booking.packageId.includes(selectedPackage)) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Payment Status Manager</h2>
        <div className="flex items-center space-x-2">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Payment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="partial">Partial Payment</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPackage} onValueChange={setSelectedPackage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select package" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Packages</SelectItem>
              <SelectItem value="UMR">Umrah Packages</SelectItem>
              <SelectItem value="HJJ">Hajj Packages</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Departure</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.customer}</TableCell>
                  <TableCell>{booking.package}</TableCell>
                  <TableCell>{booking.departureDate}</TableCell>
                  <TableCell>RM {booking.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>RM {booking.paidAmount.toLocaleString()}</TableCell>
                  <TableCell>RM {booking.remainingAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(booking.paymentStatus)}>
                      {booking.paymentStatus === "paid"
                        ? "Paid"
                        : booking.paymentStatus === "partial"
                          ? "Partial"
                          : "Unpaid"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewPayment(booking)}>
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Details Dialog */}
      {currentBooking && (
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>
                Booking ID: {currentBooking.id} - {currentBooking.customer}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Payment Summary */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500">Total Amount</div>
                    <div className="text-2xl font-bold">RM {currentBooking.totalAmount.toLocaleString()}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500">Paid Amount</div>
                    <div className="text-2xl font-bold text-green-600">
                      RM {currentBooking.paidAmount.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500">Remaining Amount</div>
                    <div className="text-2xl font-bold text-red-600">
                      RM {currentBooking.remainingAmount.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Payment Status */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Payment Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(currentBooking.paymentStatus)}>
                        {currentBooking.paymentStatus === "paid"
                          ? "Fully Paid"
                          : currentBooking.paymentStatus === "partial"
                            ? "Partially Paid"
                            : "Unpaid"}
                      </Badge>
                      {currentBooking.paymentStatus !== "paid" && currentBooking.paymentDueDate && (
                        <span className="text-sm text-gray-500">
                          Payment due by: <span className="font-medium">{currentBooking.paymentDueDate}</span>
                        </span>
                      )}
                    </div>
                    <Select defaultValue={currentBooking.paymentStatus}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Fully Paid</SelectItem>
                        <SelectItem value="partial">Partially Paid</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Payment History */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentBooking.paymentHistory.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Payment Method</TableHead>
                          <TableHead>Reference</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentBooking.paymentHistory.map((payment: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>RM {payment.amount.toLocaleString()}</TableCell>
                            <TableCell>{payment.method}</TableCell>
                            <TableCell>{payment.reference}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <FileText className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-6 text-gray-500">No payment records found</div>
                  )}
                </CardContent>
              </Card>

              {/* Add Payment */}
              {currentBooking.paymentStatus !== "paid" && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Record New Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Amount (MYR)</Label>
                        <Input type="number" placeholder="0.00" defaultValue={currentBooking.remainingAmount} />
                      </div>
                      <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <Select defaultValue="card">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="card">Credit/Debit Card</SelectItem>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="cheque">Cheque</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Payment Date</Label>
                        <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                      </div>
                      <div className="space-y-2">
                        <Label>Reference Number</Label>
                        <Input placeholder="e.g. Transaction ID, Receipt Number" />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label>Notes</Label>
                        <Textarea placeholder="Any additional information about this payment" />
                      </div>
                    </div>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Record Payment</Button>
                  </CardContent>
                </Card>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                Close
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Sales Collection Report Component
function SalesCollectionReport() {
  const [reportType, setReportType] = useState("branch")
  const [dateRange, setDateRange] = useState("thisMonth")
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [selectedAgent, setSelectedAgent] = useState("all")

  // Sample sales data
  const branchSalesData = [
    { label: "Kuala Lumpur", value: 425000 },
    { label: "Penang", value: 320000 },
    { label: "Johor Bahru", value: 280000 },
    { label: "Kota Kinabalu", value: 175000 },
    { label: "Kuching", value: 150000 },
    { label: "Ipoh", value: 120000 },
  ]

  const agentSalesData = [
    { label: "Ahmad", value: 125000 },
    { label: "Siti", value: 98000 },
    { label: "Raj", value: 85000 },
    { label: "Li Wei", value: 76000 },
    { label: "Nurul", value: 65000 },
    { label: "Ismail", value: 52000 },
  ]

  // Sample detailed sales data
  const branchSalesDetails = [
    {
      branch: "Kuala Lumpur",
      totalSales: 425000,
      bookings: 48,
      packages: {
        umrah: { count: 32, amount: 285000 },
        hajj: { count: 8, amount: 140000 },
        tours: { count: 8, amount: 0 },
      },
      topAgents: [
        { name: "Ahmad Ibrahim", sales: 125000 },
        { name: "Siti Aminah", sales: 98000 },
        { name: "Raj Kumar", sales: 85000 },
      ],
    },
    {
      branch: "Penang",
      totalSales: 320000,
      bookings: 36,
      packages: {
        umrah: { count: 24, amount: 210000 },
        hajj: { count: 6, amount: 110000 },
        tours: { count: 6, amount: 0 },
      },
      topAgents: [
        { name: "Li Wei", sales: 76000 },
        { name: "Nurul Huda", sales: 65000 },
        { name: "Ismail Abdullah", sales: 52000 },
      ],
    },
  ]

  const agentSalesDetails = [
    {
      agent: "Ahmad Ibrahim",
      branch: "Kuala Lumpur",
      totalSales: 125000,
      bookings: 14,
      packages: {
        umrah: { count: 10, amount: 85000 },
        hajj: { count: 2, amount: 40000 },
        tours: { count: 2, amount: 0 },
      },
      topCustomers: [
        { name: "Abdul Rahman", amount: 18500 },
        { name: "Fatimah Zahra", amount: 24000 },
        { name: "Mohd Rizal", amount: 17000 },
      ],
    },
    {
      agent: "Siti Aminah",
      branch: "Kuala Lumpur",
      totalSales: 98000,
      bookings: 11,
      packages: {
        umrah: { count: 8, amount: 68000 },
        hajj: { count: 1, amount: 30000 },
        tours: { count: 2, amount: 0 },
      },
      topCustomers: [
        { name: "Nurul Huda", amount: 5800 },
        { name: "Ismail Abdullah", amount: 17000 },
        { name: "Ahmad Rahman", amount: 17000 },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Sales Collection Report</h2>
        <div className="flex items-center space-x-2">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="branch">Branch-wise</SelectItem>
              <SelectItem value="agent">Agent-wise</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Report Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Label className="text-sm">{reportType === "branch" ? "Filter by Branch" : "Filter by Agent"}</Label>
              {reportType === "branch" ? (
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="kl">Kuala Lumpur</SelectItem>
                    <SelectItem value="penang">Penang</SelectItem>
                    <SelectItem value="jb">Johor Bahru</SelectItem>
                    <SelectItem value="kk">Kota Kinabalu</SelectItem>
                    <SelectItem value="kuching">Kuching</SelectItem>
                    <SelectItem value="ipoh">Ipoh</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agents</SelectItem>
                    <SelectItem value="ahmad">Ahmad Ibrahim</SelectItem>
                    <SelectItem value="siti">Siti Aminah</SelectItem>
                    <SelectItem value="raj">Raj Kumar</SelectItem>
                    <SelectItem value="liwei">Li Wei</SelectItem>
                    <SelectItem value="nurul">Nurul Huda</SelectItem>
                    <SelectItem value="ismail">Ismail Abdullah</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            {dateRange === "custom" && (
              <>
                <div className="flex-1">
                  <Label className="text-sm">Start Date</Label>
                  <Input type="date" />
                </div>
                <div className="flex-1">
                  <Label className="text-sm">End Date</Label>
                  <Input type="date" />
                </div>
              </>
            )}
            <div className="flex items-end">
              <Button className="bg-blue-600 hover:bg-blue-700">Generate Report</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sales Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  RM {reportType === "branch" ? "1,470,000" : "501,000"}
                </h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                <h3 className="text-2xl font-bold text-gray-900">{reportType === "branch" ? "168" : "56"}</h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Sale Value</p>
                <h3 className="text-2xl font-bold text-gray-900">RM {reportType === "branch" ? "8,750" : "8,946"}</h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CalendarClock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{reportType === "branch" ? "Sales by Branch" : "Sales by Agent"}</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart data={reportType === "branch" ? branchSalesData : agentSalesData} />
        </CardContent>
      </Card>

      {/* Detailed Reports */}
      <div className="space-y-6">
        {(reportType === "branch" ? branchSalesDetails : agentSalesDetails).map((item) => (
          <Card key={reportType === "branch" ? item.branch : item.agent}>
            <CardHeader>
              <CardTitle>
                {reportType === "branch" ? item.branch : item.agent}
                {reportType === "agent" && (
                  <span className="text-sm font-normal text-gray-500 ml-2">({item.branch})</span>
                )}
              </CardTitle>
              <CardDescription>
                {item.bookings} bookings • RM {item.totalSales.toLocaleString()} total sales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Package Breakdown */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Package Breakdown</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Package Type</TableHead>
                        <TableHead>Count</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Umrah Packages</TableCell>
                        <TableCell>{item.packages.umrah.count}</TableCell>
                        <TableCell>RM {item.packages.umrah.amount.toLocaleString()}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Hajj Packages</TableCell>
                        <TableCell>{item.packages.hajj.count}</TableCell>
                        <TableCell>RM {item.packages.hajj.amount.toLocaleString()}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Muslim Tours</TableCell>
                        <TableCell>{item.packages.tours.count}</TableCell>
                        <TableCell>RM {item.packages.tours.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Top Performers */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">
                    {reportType === "branch" ? "Top Agents" : "Top Customers"}
                  </h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Sales Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(reportType === "branch" ? item.topAgents : item.topCustomers).map((performer, index) => (
                        <TableRow key={index}>
                          <TableCell>{performer.name}</TableCell>
                          <TableCell className="text-right">
                            RM {(reportType === "branch" ? performer.sales : performer.amount).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Upload Confirmations Component
function UploadConfirmations() {
  const [selectedBooking, setSelectedBooking] = useState("")
  const [documentType, setDocumentType] = useState("flight")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [currentBooking, setCurrentBooking] = useState<any>(null)

  // Sample bookings data
  const bookings = [
    {
      id: "BK25001",
      customer: "Ahmad Rahman",
      package: "Premium Umrah Package",
      departureDate: "2025-02-15",
      documents: [
        { type: "flight", name: "Flight Confirmation", status: "uploaded", date: "2024-12-20" },
        { type: "hotel", name: "Hotel Voucher - Madinah", status: "uploaded", date: "2024-12-20" },
        { type: "hotel", name: "Hotel Voucher - Makkah", status: "uploaded", date: "2024-12-20" },
        { type: "visa", name: "Visa Approval", status: "pending", date: "" },
        { type: "insurance", name: "Travel Insurance", status: "uploaded", date: "2024-12-21" },
      ],
    },
    {
      id: "BK25002",
      customer: "Nurul Huda",
      package: "Economy Umrah Package",
      departureDate: "2025-04-10",
      documents: [
        { type: "flight", name: "Flight Confirmation", status: "pending", date: "" },
        { type: "hotel", name: "Hotel Voucher - Madinah", status: "pending", date: "" },
        { type: "hotel", name: "Hotel Voucher - Makkah", status: "pending", date: "" },
        { type: "visa", name: "Visa Approval", status: "pending", date: "" },
        { type: "insurance", name: "Travel Insurance", status: "pending", date: "" },
      ],
    },
    {
      id: "BK25003",
      customer: "Ismail Abdullah",
      package: "Premium Umrah Package",
      departureDate: "2025-02-15",
      documents: [
        { type: "flight", name: "Flight Confirmation", status: "uploaded", date: "2024-12-18" },
        { type: "hotel", name: "Hotel Voucher - Madinah", status: "uploaded", date: "2024-12-18" },
        { type: "hotel", name: "Hotel Voucher - Makkah", status: "pending", date: "" },
        { type: "visa", name: "Visa Approval", status: "pending", date: "" },
        { type: "insurance", name: "Travel Insurance", status: "uploaded", date: "2024-12-19" },
      ],
    },
  ]

  const handleUpload = (booking: any) => {
    setCurrentBooking(booking)
    setShowUploadDialog(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "uploaded":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "uploaded":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Upload Confirmations</h2>
        <div className="flex items-center space-x-2">
          <Select value={selectedBooking} onValueChange={setSelectedBooking}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by booking" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Bookings</SelectItem>
              {bookings.map((booking) => (
                <SelectItem key={booking.id} value={booking.id}>
                  {booking.id} - {booking.customer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flight">Flight Confirmations</SelectItem>
              <SelectItem value="hotel">Hotel Vouchers</SelectItem>
              <SelectItem value="visa">Visa Documents</SelectItem>
              <SelectItem value="insurance">Insurance Policies</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {bookings
        .filter((booking) => !selectedBooking || booking.id === selectedBooking)
        .map((booking) => (
          <Card key={booking.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    {booking.customer}
                  </CardTitle>
                  <CardDescription>
                    {booking.id} • {booking.package} • Departure: {booking.departureDate}
                  </CardDescription>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleUpload(booking)}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Documents
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {booking.documents
                    .filter((doc) => !documentType || doc.type === documentType)
                    .map((doc, index) => (
                      <TableRow key={index}>
                        <TableCell className="capitalize">{doc.type}</TableCell>
                        <TableCell>{doc.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(doc.status)}
                            <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                          </div>
                        </TableCell>
                        <TableCell>{doc.date || "-"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            {doc.status === "uploaded" ? (
                              <>
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Download className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                              </>
                            ) : (
                              <Button variant="outline" size="sm">
                                <Upload className="w-4 h-4 mr-1" />
                                Upload
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                \
