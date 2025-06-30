"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Edit,
  Eye,
  Trash2,
  Download,
  BookOpen,
  GraduationCap,
  CheckCircle,
  UserCheck,
  FileText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

// Course Creation/Edit Dialog
function CourseDialog({
  course,
  isOpen,
  onClose,
  mode = "create",
}: {
  course?: any
  isOpen: boolean
  onClose: () => void
  mode?: "create" | "edit"
}) {
  const [formData, setFormData] = useState({
    title: course?.title || "",
    description: course?.description || "",
    type: course?.type || "Umrah Preparation",
    date: course?.date || "",
    time: course?.time || "",
    duration: course?.duration || "",
    location: course?.location || "",
    instructor: course?.instructor || "",
    fee: course?.fee || "",
    maxCapacity: course?.maxCapacity || 50,
    features: course?.features?.join(", ") || "",
    requirements: course?.requirements || "",
    isActive: course?.isActive ?? true,
  })

  const handleSubmit = () => {
    // Handle form submission
    console.log("Course data:", formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create New Course" : "Edit Course"}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>

            <div>
              <Label htmlFor="title">Course Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Umrah Preparation Course"
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what the course covers..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="type">Course Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Umrah Preparation">Umrah Preparation</SelectItem>
                  <SelectItem value="Hajj Preparation">Hajj Preparation</SelectItem>
                  <SelectItem value="Islamic Education">Islamic Education</SelectItem>
                  <SelectItem value="Travel Guidance">Travel Guidance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="instructor">Instructor *</Label>
              <Input
                id="instructor"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                placeholder="e.g., Ustaz Ahmad Fauzi"
              />
            </div>

            <div>
              <Label htmlFor="features">Course Features</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Certificate Provided, Course Materials, Lunch Included (comma separated)"
                rows={2}
              />
            </div>
          </div>

          {/* Schedule & Logistics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Schedule & Logistics</h3>

            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="e.g., 9:00 AM - 5:00 PM"
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 8 hours"
              />
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData({ ...formData, location: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Glocal Travel HQ, Kuala Lumpur">Glocal Travel HQ, Kuala Lumpur</SelectItem>
                  <SelectItem value="Penang Branch Office">Penang Branch Office</SelectItem>
                  <SelectItem value="Johor Bahru Branch">Johor Bahru Branch</SelectItem>
                  <SelectItem value="Kota Kinabalu Branch">Kota Kinabalu Branch</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="maxCapacity">Maximum Capacity *</Label>
              <Input
                id="maxCapacity"
                type="number"
                value={formData.maxCapacity}
                onChange={(e) => setFormData({ ...formData, maxCapacity: Number(e.target.value) })}
                min="1"
                max="200"
              />
            </div>

            <div>
              <Label htmlFor="fee">Course Fee *</Label>
              <Input
                id="fee"
                value={formData.fee}
                onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                placeholder="e.g., RM 150 or Free"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Course is active and accepting registrations</Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
            {mode === "create" ? "Create Course" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Registration Details Dialog
function RegistrationDetailsDialog({
  course,
  isOpen,
  onClose,
}: {
  course: any
  isOpen: boolean
  onClose: () => void
}) {
  const [selectedTab, setSelectedTab] = useState("registrations")

  // Sample registration data
  const registrations = [
    {
      id: "REG001",
      name: "Ahmad Rahman",
      email: "ahmad.rahman@email.com",
      phone: "+60123456789",
      registrationDate: "2024-12-15",
      status: "confirmed",
      paymentStatus: "paid",
      specialRequirements: "Vegetarian meals",
    },
    {
      id: "REG002",
      name: "Siti Aminah",
      email: "siti.aminah@email.com",
      phone: "+60123456788",
      registrationDate: "2024-12-16",
      status: "confirmed",
      paymentStatus: "pending",
      specialRequirements: "None",
    },
    {
      id: "REG003",
      name: "Nurul Huda",
      email: "nurul.huda@email.com",
      phone: "+60123456787",
      registrationDate: "2024-12-17",
      status: "waitlist",
      paymentStatus: "pending",
      specialRequirements: "Wheelchair access",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "waitlist":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "refunded":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{course?.title} - Registration Details</DialogTitle>
        </DialogHeader>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="registrations" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Confirmed Registrations</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export List
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Send Reminder
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Registration ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Special Requirements</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations
                  .filter((reg) => reg.status === "confirmed")
                  .map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell className="font-medium">{registration.id}</TableCell>
                      <TableCell>{registration.name}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{registration.email}</div>
                          <div className="text-gray-500">{registration.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{registration.registrationDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(registration.status)}>{registration.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPaymentStatusColor(registration.paymentStatus)}>
                          {registration.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{registration.specialRequirements}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="waitlist" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Waitlist</h3>
              <Button variant="outline" size="sm">
                <UserCheck className="w-4 h-4 mr-2" />
                Move to Confirmed
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Special Requirements</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations
                  .filter((reg) => reg.status === "waitlist")
                  .map((registration, index) => (
                    <TableRow key={registration.id}>
                      <TableCell className="font-medium">#{index + 1}</TableCell>
                      <TableCell>{registration.name}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{registration.email}</div>
                          <div className="text-gray-500">{registration.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{registration.registrationDate}</TableCell>
                      <TableCell>{registration.specialRequirements}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            Confirm
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Registrations</p>
                      <h3 className="text-2xl font-bold text-gray-900">{course?.registeredCount || 0}</h3>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Waitlist</p>
                      <h3 className="text-2xl font-bold text-gray-900">{course?.waitlistCount || 0}</h3>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Capacity Utilization</p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {Math.round(((course?.registeredCount || 0) / (course?.maxCapacity || 1)) * 100)}%
                      </h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registration Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Registration Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  Registration timeline chart would be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Main Course Management Component
export default function CourseManagement() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterLocation, setFilterLocation] = useState("all")

  // Sample courses data
  const courses = [
    {
      id: 1,
      title: "Umrah Preparation Course - Complete Guide",
      description:
        "Comprehensive course covering all aspects of Umrah pilgrimage including rituals, duas, and practical guidance.",
      date: "2025-02-15",
      time: "9:00 AM - 5:00 PM",
      duration: "8 hours",
      location: "Glocal Travel HQ, Kuala Lumpur",
      type: "Umrah Preparation",
      instructor: "Ustaz Ahmad Fauzi",
      fee: "RM 150",
      maxCapacity: 50,
      registeredCount: 42,
      waitlistCount: 8,
      status: "active",
      isActive: true,
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
      date: "2025-02-22",
      time: "8:00 AM - 6:00 PM",
      duration: "10 hours",
      location: "Penang Branch Office",
      type: "Hajj Preparation",
      instructor: "Dr. Fatimah Zahra",
      fee: "RM 250",
      maxCapacity: 40,
      registeredCount: 35,
      waitlistCount: 5,
      status: "active",
      isActive: true,
      features: ["Certificate Provided", "Course Materials", "Meals Included", "Group Activities", "Expert Guidance"],
    },
    {
      id: 3,
      title: "Islamic Travel Etiquette & Manners",
      description: "Learn the proper etiquette and manners for Islamic travel and pilgrimage.",
      date: "2025-03-01",
      time: "2:00 PM - 6:00 PM",
      duration: "4 hours",
      location: "Glocal Travel HQ, Kuala Lumpur",
      type: "Islamic Education",
      instructor: "Ustazah Khadijah",
      fee: "RM 80",
      maxCapacity: 60,
      registeredCount: 25,
      waitlistCount: 0,
      status: "active",
      isActive: true,
      features: ["Interactive Sessions", "Course Materials", "Refreshments", "Group Discussions"],
    },
  ]

  const handleEditCourse = (course: any) => {
    setSelectedCourse(course)
    setShowEditDialog(true)
  }

  const handleViewRegistrations = (course: any) => {
    setSelectedCourse(course)
    setShowRegistrationDialog(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCapacityColor = (registered: number, max: number) => {
    const percentage = (registered / max) * 100
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 70) return "text-yellow-600"
    return "text-green-600"
  }

  const filteredCourses = courses.filter((course) => {
    if (filterStatus !== "all" && course.status !== filterStatus) return false
    if (filterLocation !== "all" && !course.location.toLowerCase().includes(filterLocation.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Create New Course
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Courses</p>
                <h3 className="text-2xl font-bold text-gray-900">{courses.length}</h3>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Courses</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {courses.filter((c) => c.status === "active").length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Registrations</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {courses.reduce((sum, course) => sum + course.registeredCount, 0)}
                </h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Waitlist Total</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {courses.reduce((sum, course) => sum + course.waitlistCount, 0)}
                </h3>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Label className="text-sm font-medium">Filter by Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label className="text-sm font-medium">Filter by Location</Label>
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger>
                  <SelectValue />
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
            <div className="flex items-end">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Details</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-gray-500">{course.type}</div>
                      <div className="text-sm font-medium text-emerald-600">{course.fee}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {course.date}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.time}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {course.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <GraduationCap className="w-4 h-4 mr-1" />
                      {course.instructor}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className={`font-medium ${getCapacityColor(course.registeredCount, course.maxCapacity)}`}>
                        {course.registeredCount}/{course.maxCapacity}
                      </div>
                      {course.waitlistCount > 0 && (
                        <div className="text-yellow-600">+{course.waitlistCount} waitlist</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewRegistrations(course)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditCourse(course)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Course Dialog */}
      <CourseDialog isOpen={showCreateDialog} onClose={() => setShowCreateDialog(false)} mode="create" />

      {/* Edit Course Dialog */}
      <CourseDialog
        course={selectedCourse}
        isOpen={showEditDialog}
        onClose={() => {
          setShowEditDialog(false)
          setSelectedCourse(null)
        }}
        mode="edit"
      />

      {/* Registration Details Dialog */}
      <RegistrationDetailsDialog
        course={selectedCourse}
        isOpen={showRegistrationDialog}
        onClose={() => {
          setShowRegistrationDialog(false)
          setSelectedCourse(null)
        }}
      />
    </div>
  )
}
