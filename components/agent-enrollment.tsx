"use client"

import type React from "react"

import { useState } from "react"
import {
  User,
  Users,
  Building,
  FileText,
  Upload,
  Download,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Plus,
  Send,
  Shield,
  RefreshCw,
  Award,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Agent Enrollment Management Component
export default function AgentEnrollmentManagement() {
  const [selectedStatus, setSelectedStatus] = useState("pending")
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false)
  const [showApplicationDialog, setShowApplicationDialog] = useState(false)
  const [currentApplication, setCurrentApplication] = useState<any>(null)

  // Sample applications data
  const applications = [
    {
      id: "APP2025001",
      applicantName: "Ahmad Zulkifli",
      email: "ahmad.zulkifli@email.com",
      phone: "+60 12-345 6789",
      applicationDate: "2025-01-18",
      status: "pending",
      completionPercentage: 100,
      hasBusinessRegistration: true,
      companyName: "Zulkifli Travel Services",
      expectedMonthlySales: "50000-100000",
      documents: {
        identityCard: "uploaded",
        passport: "uploaded",
        businessRegistration: "uploaded",
        bankStatement: "uploaded",
        resume: "uploaded",
        certificates: "not_uploaded",
        references: "uploaded",
      },
      verificationStatus: {
        identity: "verified",
        business: "pending",
        references: "pending",
        background: "not_started",
      },
      notes: "",
    },
    {
      id: "APP2025002",
      applicantName: "Siti Nurhaliza",
      email: "siti.nurhaliza@email.com",
      phone: "+60 13-987 6543",
      applicationDate: "2025-01-17",
      status: "under_review",
      completionPercentage: 100,
      hasBusinessRegistration: false,
      companyName: "",
      expectedMonthlySales: "25000-50000",
      documents: {
        identityCard: "uploaded",
        passport: "uploaded",
        businessRegistration: "not_applicable",
        bankStatement: "uploaded",
        resume: "uploaded",
        certificates: "uploaded",
        references: "uploaded",
      },
      verificationStatus: {
        identity: "verified",
        business: "not_applicable",
        references: "verified",
        background: "in_progress",
      },
      notes: "Strong sales background in retail. References verified successfully.",
    },
    {
      id: "APP2025003",
      applicantName: "Mohd Farid",
      email: "mohd.farid@email.com",
      phone: "+60 12-555 7777",
      applicationDate: "2025-01-15",
      status: "approved",
      completionPercentage: 100,
      hasBusinessRegistration: true,
      companyName: "Farid Tours & Travel",
      expectedMonthlySales: "100000-250000",
      documents: {
        identityCard: "uploaded",
        passport: "uploaded",
        businessRegistration: "uploaded",
        bankStatement: "uploaded",
        resume: "uploaded",
        certificates: "uploaded",
        references: "uploaded",
      },
      verificationStatus: {
        identity: "verified",
        business: "verified",
        references: "verified",
        background: "completed",
      },
      approvedBy: "Admin",
      approvedDate: "2025-01-18",
      notes: "Excellent background in travel industry. All verifications passed.",
    },
    {
      id: "APP2025004",
      applicantName: "Nurul Aina",
      email: "nurul.aina@email.com",
      phone: "+60 14-222 3333",
      applicationDate: "2025-01-14",
      status: "rejected",
      completionPercentage: 85,
      hasBusinessRegistration: false,
      companyName: "",
      expectedMonthlySales: "10000-25000",
      documents: {
        identityCard: "uploaded",
        passport: "not_uploaded",
        businessRegistration: "not_applicable",
        bankStatement: "not_uploaded",
        resume: "uploaded",
        certificates: "not_uploaded",
        references: "not_uploaded",
      },
      verificationStatus: {
        identity: "verified",
        business: "not_applicable",
        references: "failed",
        background: "not_started",
      },
      rejectedBy: "Admin",
      rejectedDate: "2025-01-16",
      rejectionReason: "Incomplete documentation and failed reference verification.",
      notes: "Missing critical documents. References could not be contacted.",
    },
  ]

  const handleViewApplication = (application: any) => {
    setCurrentApplication(application)
    setShowApplicationDialog(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gold-600 text-gold-50"
      case "under_review":
        return "bg-blue-600 text-blue-50"
      case "approved":
        return "bg-green-600 text-green-50"
      case "rejected":
        return "bg-red-600 text-red-50"
      default:
        return "bg-gray-600 text-gray-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "under_review":
        return <Eye className="w-4 h-4" />
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case "verified":
      case "completed":
        return "bg-green-600 text-green-50"
      case "pending":
      case "in_progress":
        return "bg-gold-600 text-gold-50"
      case "failed":
        return "bg-red-600 text-red-50"
      case "not_started":
        return "bg-gray-600 text-gray-50"
      case "not_applicable":
        return "bg-blue-600 text-blue-50"
      default:
        return "bg-gray-600 text-gray-50"
    }
  }

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "uploaded":
        return "bg-green-600 text-green-50"
      case "not_uploaded":
        return "bg-red-600 text-red-50"
      case "not_applicable":
        return "bg-blue-600 text-blue-50"
      default:
        return "bg-gray-600 text-gray-50"
    }
  }

  const filteredApplications = applications.filter((app) => selectedStatus === "all" || app.status === selectedStatus)

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-black via-gray-900 to-black text-gold-100 min-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gold-500">Agent Enrollment Management</h2>
        <div className="flex items-center space-x-2">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px] bg-black border-gold-700 text-gold-100">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gold-700 text-gold-100">
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-500" />
            <Input
              className="pl-9 w-[250px] bg-black border-gold-700 text-gold-100 placeholder:text-gold-300"
              placeholder="Search applications..."
            />
          </div>
          <Button
            className="bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-black font-semibold"
            onClick={() => setShowEnrollmentForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Application
          </Button>
        </div>
      </div>

      {/* Application Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-gold-700 shadow-2xl shadow-gold-500/20 transform hover:scale-105 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gold-300">Pending Review</p>
                <h3 className="text-2xl font-bold text-gold-500">
                  {applications.filter((a) => a.status === "pending").length}
                </h3>
              </div>
              <Clock className="w-8 h-8 text-gold-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-gold-700 shadow-2xl shadow-gold-500/20 transform hover:scale-105 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gold-300">Under Review</p>
                <h3 className="text-2xl font-bold text-blue-500">
                  {applications.filter((a) => a.status === "under_review").length}
                </h3>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-gold-700 shadow-2xl shadow-gold-500/20 transform hover:scale-105 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gold-300">Approved</p>
                <h3 className="text-2xl font-bold text-green-500">
                  {applications.filter((a) => a.status === "approved").length}
                </h3>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-gold-700 shadow-2xl shadow-gold-500/20 transform hover:scale-105 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gold-300">Rejected</p>
                <h3 className="text-2xl font-bold text-red-500">
                  {applications.filter((a) => a.status === "rejected").length}
                </h3>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Table */}
      <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-gold-700 shadow-2xl shadow-gold-500/20">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gold-700">
                <TableHead className="text-gold-300">Application ID</TableHead>
                <TableHead className="text-gold-300">Applicant</TableHead>
                <TableHead className="text-gold-300">Application Date</TableHead>
                <TableHead className="text-gold-300">Completion</TableHead>
                <TableHead className="text-gold-300">Business Type</TableHead>
                <TableHead className="text-gold-300">Status</TableHead>
                <TableHead className="text-right text-gold-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id} className="border-gold-800 hover:bg-gold-900/10">
                  <TableCell className="font-medium text-gold-100">{application.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gold-100">{application.applicantName}</div>
                      <div className="text-sm text-gold-300">{application.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gold-300">{application.applicationDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress
                        value={application.completionPercentage}
                        className="h-2 w-16 bg-gold-900"
                        indicatorClassName="bg-gold-500"
                      />
                      <span className="text-sm text-gold-100">{application.completionPercentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {application.hasBusinessRegistration ? (
                      <div>
                        <div className="font-medium text-sm text-gold-100">{application.companyName}</div>
                        <Badge className="bg-gold-600 text-black text-xs">Registered Business</Badge>
                      </div>
                    ) : (
                      <Badge className="bg-gray-600 text-gray-50 text-xs">Individual</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(application.status)}
                      <Badge className={getStatusColor(application.status)}>
                        {application.status.replace("_", " ").charAt(0).toUpperCase() +
                          application.status.replace("_", " ").slice(1)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gold-300 hover:bg-gold-900/20 hover:text-gold-100"
                      onClick={() => handleViewApplication(application)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Agent Enrollment Form Dialog */}
      <AgentEnrollmentForm isOpen={showEnrollmentForm} onClose={() => setShowEnrollmentForm(false)} />

      {/* Application Review Dialog */}
      {currentApplication && (
        <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 border-gold-700 text-gold-100">
            <DialogHeader>
              <DialogTitle className="text-gold-500">
                Application Review - {currentApplication.applicantName}
              </DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gold-900/20 border-gold-700">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-gold-600 data-[state=active]:text-black text-gold-100"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="data-[state=active]:bg-gold-600 data-[state=active]:text-black text-gold-100"
                >
                  Documents
                </TabsTrigger>
                <TabsTrigger
                  value="verification"
                  className="data-[state=active]:bg-gold-600 data-[state=active]:text-black text-gold-100"
                >
                  Verification
                </TabsTrigger>
                <TabsTrigger
                  value="actions"
                  className="data-[state=active]:bg-gold-600 data-[state=active]:text-black text-gold-100"
                >
                  Actions
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-black border-gold-700 text-gold-100">
                    <CardHeader>
                      <CardTitle className="text-lg text-gold-500">Applicant Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gold-300">Name:</span>
                        <span className="font-medium">{currentApplication.applicantName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gold-300">Email:</span>
                        <span className="font-medium">{currentApplication.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gold-300">Phone:</span>
                        <span className="font-medium">{currentApplication.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gold-300">Application Date:</span>
                        <span className="font-medium">{currentApplication.applicationDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gold-300">Expected Monthly Sales:</span>
                        <span className="font-medium">
                          Rs {currentApplication.expectedMonthlySales.replace("-", " - ")}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-black border-gold-700 text-gold-100">
                    <CardHeader>
                      <CardTitle className="text-lg text-gold-500">Business Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gold-300">Business Registration:</span>
                        <Badge
                          className={
                            currentApplication.hasBusinessRegistration
                              ? "bg-gold-600 text-black"
                              : "bg-gray-600 text-gray-50"
                          }
                        >
                          {currentApplication.hasBusinessRegistration ? "Yes" : "No"}
                        </Badge>
                      </div>
                      {currentApplication.hasBusinessRegistration && (
                        <div className="flex justify-between">
                          <span className="text-gold-300">Company Name:</span>
                          <span className="font-medium">{currentApplication.companyName}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gold-300">Application Status:</span>
                        <Badge className={getStatusColor(currentApplication.status)}>
                          {currentApplication.status.replace("_", " ").charAt(0).toUpperCase() +
                            currentApplication.status.replace("_", " ").slice(1)}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gold-300">Completion:</span>
                        <span className="font-medium">{currentApplication.completionPercentage}%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                {currentApplication.notes && (
                  <Card className="bg-black border-gold-700 text-gold-100">
                    <CardHeader>
                      <CardTitle className="text-lg text-gold-500">Admin Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gold-100">{currentApplication.notes}</p>
                    </CardContent>
                  </Card>
                )}
                {currentApplication.status === "approved" && (
                  <Card className="border-green-600 bg-green-900/20 text-green-100">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <div>
                          <p className="font-medium">Application Approved</p>
                          <p className="text-sm">
                            Approved by {currentApplication.approvedBy} on {currentApplication.approvedDate}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {currentApplication.status === "rejected" && (
                  <Card className="border-red-600 bg-red-900/20 text-red-100">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-5 h-5" />
                        <div>
                          <p className="font-medium">Application Rejected</p>
                          <p className="text-sm">
                            Rejected by {currentApplication.rejectedBy} on {currentApplication.rejectedDate}
                          </p>
                          <p className="text-sm mt-1">
                            <strong>Reason:</strong> {currentApplication.rejectionReason}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="documents" className="space-y-4 mt-4">
                <Card className="bg-black border-gold-700 text-gold-100">
                  <CardHeader>
                    <CardTitle className="text-lg text-gold-500">Document Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(currentApplication.documents).map(([docType, status]) => (
                        <div
                          key={docType}
                          className="flex items-center justify-between p-3 border border-gold-800 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-gold-300" />
                            <span className="capitalize">{docType.replace(/([A-Z])/g, " $1").trim()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getDocumentStatusColor(status as string)}>
                              {(status as string).replace("_", " ").charAt(0).toUpperCase() +
                                (status as string).replace("_", " ").slice(1)}
                            </Badge>
                            {status === "uploaded" && (
                              <div className="flex space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gold-300 hover:bg-gold-900/20 hover:text-gold-100"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gold-300 hover:bg-gold-900/20 hover:text-gold-100"
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="verification" className="space-y-4 mt-4">
                <Card className="bg-black border-gold-700 text-gold-100">
                  <CardHeader>
                    <CardTitle className="text-lg text-gold-500">Verification Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(currentApplication.verificationStatus).map(([verificationType, status]) => (
                        <div
                          key={verificationType}
                          className="flex items-center justify-between p-4 border border-gold-800 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <Shield className="w-5 h-5 text-gold-300" />
                            <div>
                              <span className="font-medium capitalize">
                                {verificationType.replace(/([A-Z])/g, " $1").trim()} Verification
                              </span>
                              <p className="text-sm text-gold-300">
                                {verificationType === "identity" && "IC and passport verification"}
                                {verificationType === "business" && "Business registration verification"}
                                {verificationType === "references" && "Professional references check"}
                                {verificationType === "background" && "Background and credit check"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getVerificationStatusColor(status as string)}>
                              {(status as string).replace("_", " ").charAt(0).toUpperCase() +
                                (status as string).replace("_", " ").slice(1)}
                            </Badge>
                            {(status === "pending" || status === "in_progress") && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gold-600 text-gold-100 hover:bg-gold-900/20 hover:text-gold-500 bg-transparent"
                              >
                                Start Verification
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="actions" className="space-y-4 mt-4">
                {currentApplication.status === "pending" || currentApplication.status === "under_review" ? (
                  <Card className="bg-black border-gold-700 text-gold-100">
                    <CardHeader>
                      <CardTitle className="text-lg text-gold-500">Application Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-gold-300">Admin Notes</Label>
                        <Textarea
                          placeholder="Add notes about this application review..."
                          defaultValue={currentApplication.notes}
                          className="bg-black border-gold-700 text-gold-100 placeholder:text-gold-300"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <Button className="bg-green-600 hover:bg-green-700 text-white flex-1">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve Application
                        </Button>
                        <Button variant="destructive" className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject Application
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-gold-600 text-gold-100 hover:bg-gold-900/20 hover:text-gold-500 bg-transparent"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Request Additional Information
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-black border-gold-700 text-gold-100">
                    <CardHeader>
                      <CardTitle className="text-lg text-gold-500">Post-Decision Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {currentApplication.status === "approved" && (
                        <div className="space-y-3">
                          <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black">
                            <Send className="w-4 h-4 mr-2" />
                            Send Welcome Email & Credentials
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-gold-600 text-gold-100 hover:bg-gold-900/20 hover:text-gold-500 bg-transparent"
                          >
                            <Award className="w-4 h-4 mr-2" />
                            Assign Training Materials
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-gold-600 text-gold-100 hover:bg-gold-900/20 hover:text-gold-500 bg-transparent"
                          >
                            <Users className="w-4 h-4 mr-2" />
                            Create Agent Profile
                          </Button>
                        </div>
                      )}
                      {currentApplication.status === "rejected" && (
                        <div className="space-y-3">
                          <Button
                            variant="outline"
                            className="w-full border-gold-600 text-gold-100 hover:bg-gold-900/20 hover:text-gold-500 bg-transparent"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Send Rejection Email
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-gold-600 text-gold-100 hover:bg-gold-900/20 hover:text-gold-500 bg-transparent"
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Allow Reapplication
                          </Button>
                        </div>
                      )}
                      <Button
                        variant="outline"
                        className="w-full border-gold-600 text-gold-100 hover:bg-gold-900/20 hover:text-gold-500 bg-transparent"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Application Report
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button
                variant="outline"
                className="border-gold-600 text-gold-100 hover:bg-gold-900/20 hover:text-gold-500 bg-transparent"
                onClick={() => setShowApplicationDialog(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Agent Enrollment Form Component
function AgentEnrollmentForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})

  // Form Data State
  const [formData, setFormData] = useState({
    personalInfo: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      alternatePhone: "",
      icNumber: "",
      dateOfBirth: "",
      nationality: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelation: "",
    },
    businessInfo: {
      hasBusinessRegistration: false,
      companyName: "",
      businessRegistrationNumber: "",
      businessType: "",
      businessAddress: "",
      businessCity: "",
      businessState: "",
      businessPostalCode: "",
      yearsInBusiness: "",
      previousTravelExperience: "",
      salesExperience: "",
      targetMarket: "",
      expectedMonthlySales: "",
      referralSource: "",
    },
    documents: {
      identityCard: null as File | null,
      passport: null as File | null,
      businessRegistration: null as File | null,
      bankStatement: null as File | null,
      resume: null as File | null,
      certificates: null as File | null,
      references: null as File | null,
    },
    references: [
      {
        name: "",
        company: "",
        position: "",
        phone: "",
        email: "",
        relationship: "",
        yearsKnown: "",
      },
      {
        name: "",
        company: "",
        position: "",
        phone: "",
        email: "",
        relationship: "",
        yearsKnown: "",
      },
    ],
    agreements: {
      agreeTerms: false,
      agreePrivacy: false,
      agreeCommission: false,
      agreeTraining: false,
    },
  })

  const steps = [
    { id: 1, title: "Personal Information", icon: User },
    { id: 2, title: "Business Information", icon: Building },
    { id: 3, title: "Document Upload", icon: Upload },
    { id: 4, title: "References", icon: Users },
    { id: 5, title: "Terms & Agreements", icon: FileText },
  ]

  // Validation Functions
  const validateStep1 = () => {
    const errors: { [key: string]: string } = {}
    const { personalInfo } = formData
    if (!personalInfo.firstName.trim()) errors.firstName = "First name is required"
    if (!personalInfo.lastName.trim()) errors.lastName = "Last name is required"
    if (!personalInfo.email.trim()) errors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) errors.email = "Invalid email format"
    if (!personalInfo.phone.trim()) errors.phone = "Phone number is required"
    if (!personalInfo.icNumber.trim()) errors.icNumber = "IC/Passport number is required"
    if (!personalInfo.dateOfBirth) errors.dateOfBirth = "Date of birth is required"
    if (!personalInfo.address.trim()) errors.address = "Address is required"
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateStep2 = () => {
    const errors: { [key: string]: string } = {}
    const { businessInfo } = formData
    if (businessInfo.hasBusinessRegistration) {
      if (!businessInfo.companyName.trim()) errors.companyName = "Company name is required"
      if (!businessInfo.businessRegistrationNumber.trim())
        errors.businessRegistrationNumber = "Business registration number is required"
    }
    if (!businessInfo.salesExperience.trim()) errors.salesExperience = "Sales experience is required"
    if (!businessInfo.targetMarket.trim()) errors.targetMarket = "Target market is required"
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateStep3 = () => {
    const errors: { [key: string]: string } = {}
    const { documents } = formData
    if (!documents.identityCard) errors.identityCard = "Identity card is required"
    if (!documents.passport) errors.passport = "Passport is required"
    if (!documents.bankStatement) errors.bankStatement = "Bank statement is required"
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateStep4 = () => {
    const errors: { [key: string]: string } = {}
    const { references } = formData
    references.forEach((ref, index) => {
      if (!ref.name.trim()) errors[`reference${index}Name`] = `Reference ${index + 1} name is required`
      if (!ref.phone.trim()) errors[`reference${index}Phone`] = `Reference ${index + 1} phone is required`
      if (!ref.email.trim()) errors[`reference${index}Email`] = `Reference ${index + 1} email is required`
    })
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateStep5 = () => {
    const errors: { [key: string]: string } = {}
    const { agreements } = formData
    if (!agreements.agreeTerms) errors.agreeTerms = "You must agree to terms and conditions"
    if (!agreements.agreePrivacy) errors.agreePrivacy = "You must agree to privacy policy"
    if (!agreements.agreeCommission) errors.agreeCommission = "You must agree to commission structure"
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Navigation Functions
  const nextStep = () => {
    let isValid = true
    if (currentStep === 1) isValid = validateStep1()
    if (currentStep === 2) isValid = validateStep2()
    if (currentStep === 3) isValid = validateStep3()
    if (currentStep === 4) isValid = validateStep4()
    if (currentStep === 5) isValid = validateStep5()

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 5))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const updateFormData = (section: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const updateReference = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.map((ref, i) => (i === index ? { ...ref, [field]: value } : ref)),
    }))
  }

  const handleDocumentUpload = (docType: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: file,
      },
    }))
  }

  const getStepProgress = () => {
    return (currentStep / 5) * 100
  }

  const handleSubmit = () => {
    if (validateStep5()) {
      // Submit the form
      console.log("Form submitted:", formData)
      onClose()
      // Show success message or redirect
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 border-gold-700 text-gold-100">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-gold-500">
            <span>Agent Enrollment Application</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-gold-300 hover:bg-gold-900/20 hover:text-gold-100"
              onClick={onClose}
            >
              ×
            </Button>
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gold-300">
            <span>Step {currentStep} of 5</span>
            <span>{Math.round(getStepProgress())}% Complete</span>
          </div>
          <Progress value={getStepProgress()} className="h-2 bg-gold-900" indicatorClassName="bg-gold-500" />
        </div>

        {/* Step Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step.id ? "bg-gold-600 text-black" : "bg-gold-900/20 text-gold-300"
                    }`}
                >
                  {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : step.id}
                </div>
                <span className={`text-sm ${currentStep >= step.id ? "text-gold-500 font-medium" : "text-gold-300"}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gold-500">Personal Information</h3>
              <Card className="bg-black border-gold-700 text-gold-100">
                <CardHeader>
                  <CardTitle className="text-gold-500">Basic Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="title" className="text-gold-300">
                        Title *
                      </Label>
                      <Select
                        value={formData.personalInfo.title}
                        onValueChange={(value) => updateFormData("personalInfo", "title", value)}
                      >
                        <SelectTrigger className="bg-black border-gold-700 text-gold-100">
                          <SelectValue placeholder="Select title" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-gold-700 text-gold-100">
                          <SelectItem value="mr">Mr.</SelectItem>
                          <SelectItem value="mrs">Mrs.</SelectItem>
                          <SelectItem value="ms">Ms.</SelectItem>
                          <SelectItem value="dr">Dr.</SelectItem>
                          <SelectItem value="dato">Dato'</SelectItem>
                          <SelectItem value="datin">Datin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="firstName" className="text-gold-300">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.personalInfo.firstName}
                        onChange={(e) => updateFormData("personalInfo", "firstName", e.target.value)}
                        className={`bg-black border-gold-700 text-gold-100 placeholder:text-gold-300 ${validationErrors.firstName ? "border-red-500" : ""}`}
                      />
                      {validationErrors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gold-300">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.personalInfo.lastName}
                        onChange={(e) => updateFormData("personalInfo", "lastName", e.target.value)}
                        className={`bg-black border-gold-700 text-gold-100 placeholder:text-gold-300 ${validationErrors.lastName ? "border-red-500" : ""}`}
                      />
                      {validationErrors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-gold-300">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.personalInfo.email}
                        onChange={(e) => updateFormData("personalInfo", "email", e.target.value)}
                        className={`bg-black border-gold-700 text-gold-100 placeholder:text-gold-300 ${validationErrors.email ? "border-red-500" : ""}`}
                      />
                      {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gold-300">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        value={formData.personalInfo.phone}
                        onChange={(e) => updateFormData("personalInfo", "phone", e.target.value)}
                        className={`bg-black border-gold-700 text-gold-100 placeholder:text-gold-300 ${validationErrors.phone ? "border-red-500" : ""}`}
                      />
                      {validationErrors.phone && <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="alternatePhone" className="text-gold-300">
                        Alternate Phone
                      </Label>
                      <Input
                        id="alternatePhone"
                        value={formData.personalInfo.alternatePhone}
                        onChange={(e) => updateFormData("personalInfo", "alternatePhone", e.target.value)}
                        className="bg-black border-gold-700 text-gold-100 placeholder:text-gold-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="icNumber" className="text-gold-300">
                        IC/Passport Number *
                      </Label>
                      <Input
                        id="icNumber"
                        value={formData.personalInfo.icNumber}
                        onChange={(e) => updateFormData("personalInfo", "icNumber", e.target.value)}
                        className={`bg-black border-gold-700 text-gold-100 placeholder:text-gold-300 ${validationErrors.icNumber ? "border-red-500" : ""}`}
                      />
                      {validationErrors.icNumber && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.icNumber}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth" className="text-gold-300">
                        Date of Birth *
                      </Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.personalInfo.dateOfBirth}
                        onChange={(e) => updateFormData("personalInfo", "dateOfBirth", e.target.value)}
                        className={`bg-black border-gold-700 text-gold-100 placeholder:text-gold-300 ${validationErrors.dateOfBirth ? "border-red-500" : ""}`}
                      />
                      {validationErrors.dateOfBirth && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.dateOfBirth}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="nationality" className="text-gold-300">
                      Nationality *
                    </Label>
                    <Select
                      value={formData.personalInfo.nationality}
                      onValueChange={(value) => updateFormData("personalInfo", "nationality", value)}
                    >
                      <SelectTrigger className="bg-black border-gold-700 text-gold-100">
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gold-700 text-gold-100">
                        <SelectItem value="malaysian">Malaysian</SelectItem>
                        <SelectItem value="singaporean">Singaporean</SelectItem>
                        <SelectItem value="indonesian">Indonesian</SelectItem>
                        <SelectItem value="brunei">Brunei</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-black border-gold-700 text-gold-100">
                <CardHeader>
                  <CardTitle className="text-gold-500">Address Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-gold-300">
                      Street Address *
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.personalInfo.address}
                      onChange={(e) => updateFormData("personalInfo", "address", e.target.value)}
                      className={`bg-black border-gold-700 text-gold-100 placeholder:text-gold-300 ${validationErrors.address ? "border-red-500" : ""}`}
                      rows={2}
                    />
                    {validationErrors.address && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.address}</p>
                    )}
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-gold-300">
                        City
                      </Label>
                      <Input
                        id="city"
                        value={formData.personalInfo.city}
                        onChange={(e) => updateFormData("personalInfo", "city", e.target.value)}
                        className="bg-black border-gold-700 text-gold-100 placeholder:text-gold-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-gold-300">
                        State
                      </Label>
                      <Select
                        value={formData.personalInfo.state}
                        onValueChange={(value) => updateFormData("personalInfo", "state", value)}
                      >
                        <SelectTrigger className="bg-black border-gold-700 text-gold-100">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-gold-700 text-gold-100">
                          <SelectItem value="johor">Johor</SelectItem>
                          <SelectItem value="kedah">Kedah</SelectItem>
                          <SelectItem value="kelantan">Kelantan</SelectItem>
                          <SelectItem value="kuala-lumpur">Kuala Lumpur</SelectItem>
                          <SelectItem value="labuan">Labuan</SelectItem>
                          <SelectItem value="melaka">Melaka</SelectItem>
                          <SelectItem value="negeri-sembilan">Negeri Sembilan</SelectItem>
                          <SelectItem value="pahang">Pahang</SelectItem>
                          <SelectItem value="penang">Penang</SelectItem>
                          <SelectItem value="perak">Perak</SelectItem>
                          <SelectItem value="perlis">Perlis</SelectItem>
                          <SelectItem value="putrajaya">Putrajaya</SelectItem>
                          <SelectItem value="sabah">Sabah</SelectItem>
                          <SelectItem value="sarawak">Sarawak</SelectItem>
                          <SelectItem value="selangor">Selangor</SelectItem>
                          <SelectItem value="terengganu">Terengganu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="postalCode" className="text-gold-300">
                        Postal Code
                      </Label>
                      <Input
                        id="postalCode"
                        value={formData.personalInfo.postalCode}
                        onChange={(e) => updateFormData("personalInfo", "postalCode", e.target.value)}
                        className="bg-black border-gold-700 text-gold-100 placeholder:text-gold-300"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-black border-gold-700 text-gold-100">
                <CardHeader>
                  <CardTitle className="text-gold-500">Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="emergencyContactName" className="text-gold-300">
                        Contact Name
                      </Label>
                      <Input
                        id="emergencyContactName"
                        value={formData.personalInfo.emergencyContactName}
                        onChange={(e) => updateFormData("personalInfo", "emergencyContactName", e.target.value)}
                        className="bg-black border-gold-700 text-gold-100 placeholder:text-gold-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyContactPhone" className="text-gold-300">
                        Contact Phone
                      </Label>
                      <Input
                        id="emergencyContactPhone"
                        value={formData.personalInfo.emergencyContactPhone}
                        onChange={(e) => updateFormData("personalInfo", "emergencyContactPhone", e.target.value)}
                        className="bg-black border-gold-700 text-gold-100 placeholder:text-gold-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyContactRelation" className="text-gold-300">
                        Relationship
                      </Label>
                      <Select
                        value={formData.personalInfo.emergencyContactRelation}
                        onValueChange={(value) => updateFormData("personalInfo", "emergencyContactRelation", value)}
                      >
                        <SelectTrigger className="bg-black border-gold-700 text-gold-100">
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-gold-700 text-gold-100">
                          <SelectItem value="spouse">Spouse</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="child">Child</SelectItem>
                          <SelectItem value="friend">Friend</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Business Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gold-500">Business Information</h3>
              <Card className="bg-black border-gold-700 text-gold-100">
                <CardHeader>
                  <CardTitle className="text-gold-500">Business Registration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasBusinessRegistration"
                      checked={formData.businessInfo.hasBusinessRegistration}
                      onCheckedChange={(checked) => updateFormData("businessInfo", "hasBusinessRegistration", checked)}
                      className="border-gold-600 data-[state=checked]:bg-gold-600 data-[state=checked]:text-black"
                    />
                    <Label htmlFor="hasBusinessRegistration" className="text-gold-300">
                      I have a registered business
                    </Label>
                  </div>
                  {formData.businessInfo.hasBusinessRegistration && (
                    <div className="space-y-4 border-l-4 border-gold-500 pl-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="companyName" className="text-gold-300">
                            Company Name *
                          </Label>
                          <Input
                            id="companyName"
                            value={formData.businessInfo.companyName}
                            onChange={(e) => updateFormData("businessInfo", "companyName", e.target.value)}
                            className={`bg-black border-gold-700 text-gold-100 placeholder:text-gold-300 ${validationErrors.companyName ? "border-red-500" : ""}`}
                          />
                          {validationErrors.companyName && (
                            <p className="text-red-500 text-xs mt-1">{validationErrors.companyName}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="businessRegistrationNumber" className="text-gold-300">
                            Business Registration Number *
                          </Label>
                          <Input
                            id="businessRegistrationNumber"
                            value={formData.businessInfo.businessRegistrationNumber}
                            onChange={(e) =>
                              updateFormData("businessInfo", "businessRegistrationNumber", e.target.value)
                            }
                            className={`bg-black border-gold-700 text-gold-100 placeholder:text-gold-300 ${validationErrors.businessRegistrationNumber ? "border-red-500" : ""}`}
                          />
                          {validationErrors.businessRegistrationNumber && (
                            <p className="text-red-500 text-xs mt-1">{validationErrors.businessRegistrationNumber}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="businessType" className="text-gold-300">
                          Business Type
                        </Label>
                        <Select
                          value={formData.businessInfo.businessType}
                          onValueChange={(value) => updateFormData("businessInfo", "businessType", value)}
                        >
                          <SelectTrigger className="bg-black border-gold-700 text-gold-100">
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-gold-700 text-gold-100">
                            <SelectItem value="sdn-bhd">Sdn Bhd</SelectItem>
                            <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="llp">Limited Liability Partnership (LLP)</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="businessAddress" className="text-gold-300">
                          Business Address
                        </Label>
                        <Textarea
                          id="businessAddress"
                          value={formData.businessInfo.businessAddress}
                          onChange={(e) => updateFormData("businessInfo", "businessAddress", e.target.value)}
                          rows={2}
                          className="bg-black border-gold-700 text-gold-100 placeholder:text-gold-300"
                        />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="businessCity" className="text-gold-300">
                            City
                          </Label>
                          <Input
                            id="businessCity"
                            value={formData.businessInfo.businessCity}
                            onChange={(e) => updateFormData("businessInfo", "businessCity", e.target.value)}
                            className="bg-black border-gold-700 text-gold-100 placeholder:text-gold-300"
                          />
                        </div>
                        <div>
                          <Label htmlFor="businessState" className="text-gold-300">
                            State
                          </Label>
                          <Select
                            value={formData.businessInfo.businessState}
                            onValueChange={(value) => updateFormData("businessInfo", "businessState", value)}
                          >
                            <SelectTrigger className="bg-black border-gold-700 text-gold-100">
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-gold-700 text-gold-100">
                              <SelectItem value="johor">Johor</SelectItem>
                              <SelectItem value="kedah">Kedah</SelectItem>
                              <SelectItem value="kelantan">Kelantan</SelectItem>
                              <SelectItem value="kuala-lumpur">Kuala Lumpur</SelectItem>
                              <SelectItem value="selangor">Selangor</SelectItem>
                              {/* Add other states */}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="businessPostalCode" className="text-gold-300">
                            Postal Code
                          </Label>
                          <Input
                            id="businessPostalCode"
                            value={formData.businessInfo.businessPostalCode}
                            onChange={(e) => updateFormData("businessInfo", "businessPostalCode", e.target.value)}
                            className="bg-black border-gold-700 text-gold-100 placeholder:text-gold-300"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="yearsInBusiness" className="text-gold-300">
                          Years in Business
                        </Label>
                        <Select
                          value={formData.businessInfo.yearsInBusiness}
                          onValueChange={(value) => updateFormData("businessInfo", "yearsInBusiness", value)}
                        >
                          <SelectTrigger className="bg-black border-gold-700 text-gold-100">
                            <SelectValue placeholder="Select years" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-gold-700 text-gold-100">
                            <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                            <SelectItem value="1-2">1-2 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="6-10">6-10 years</SelectItem>
                            <SelectItem value="more-than-10">More than 10 years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className="bg-black border-gold-700 text-gold-100">
                <CardHeader>
                  <CardTitle className="text-gold-500">Experience & Background</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="previousTravelExperience" className="text-gold-300">
                      Previous Travel Industry Experience
                    </Label>
                    <Textarea
                      id="previousTravelExperience"
                      value={formData.businessInfo.previousTravelExperience}
                      onChange={(e) => updateFormData("businessInfo", "previousTravelExperience", e.target.value)}
                      placeholder="Describe your experience in the travel industry..."
                      rows={3}
                      className="bg-black border-gold-700 text-gold-100 placeholder:text-gold-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="salesExperience" className="text-gold-300">
                      Sales Experience *
                    </Label>
                    <Textarea
                      id="salesExperience"
                      value={formData.businessInfo.salesExperience}
                      onChange={(e) => updateFormData("businessInfo", "salesExperience", e.target.value)}
                      placeholder="Describe your sales experience and achievements..."
                      rows={3}
                      className={`bg-black border-gold-700 text-gold-100 placeholder:text-gold-300 ${validationErrors.salesExperience ? "border-red-500" : ""}`}
                    />
                    {validationErrors.salesExperience && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.salesExperience}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="targetMarket" className="text-gold-300">
                      Target Market *
                    </Label>
                    <Textarea
                      id="targetMarket"
                      value={formData.businessInfo.targetMarket}
                      onChange={(e) => updateFormData("businessInfo", "targetMarket", e.target.value)}
                      placeholder="Describe your target customer base and marketing approach..."
                      rows={3}
                      className={`bg-black border-gold-700 text-gold-100 placeholder:text-gold-300 ${validationErrors.targetMarket ? "border-red-500" : ""}`}
                    />
                    {validationErrors.targetMarket && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.targetMarket}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="expectedMonthlySales" className="text-gold-300">
                      Expected Monthly Sales (MYR)
                    </Label>
                    <Select
                      value={formData.businessInfo.expectedMonthlySales}
                      onValueChange={(value) => updateFormData("businessInfo", "expectedMonthlySales", value)}
                    >
                      <SelectTrigger className="bg-black border-gold-700 text-gold-100">
                        <SelectValue placeholder="Select expected monthly sales" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gold-700 text-gold-100">
                        <SelectItem value="10000-25000">Rs 10,000 - Rs 25,000</SelectItem>
                        <SelectItem value="25000-50000">Rs 25,000 - Rs 50,000</SelectItem>
                        <SelectItem value="50000-100000">Rs 50,000 - Rs 100,000</SelectItem>
                        <SelectItem value="100000-250000">Rs 100,000 - Rs 250,000</SelectItem>
                        <SelectItem value="250000+">Rs 250,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="referralSource" className="text-gold-300">
                      How did you hear about us?
                    </Label>
                    <Select
                      value={formData.businessInfo.referralSource}
                      onValueChange={(value) => updateFormData("businessInfo", "referralSource", value)}
                    >
                      <SelectTrigger className="bg-black border-gold-700 text-gold-100">
                        <SelectValue placeholder="Select referral source" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gold-700 text-gold-100">
                        <SelectItem value="existing-agent">Existing Agent</SelectItem>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="advertisement">Advertisement</SelectItem>
                        <SelectItem value="word-of-mouth">Word of Mouth</SelectItem>
                        <SelectItem value="trade-show">Trade Show/Event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Document Upload */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gold-500">Document Upload</h3>
              <Alert className="bg-gold-900/20 border-gold-700 text-gold-100">
                <AlertCircle className="h-4 w-4 text-gold-500" />
                <AlertDescription>
                  Please upload clear, high-quality scans or photos of your documents. All required documents must be
                  provided for application processing.
                </AlertDescription>
              </Alert>
              <div className="grid md:grid-cols-2 gap-6">
                <DocumentUpload
                  title="Identity Card (IC)"
                  description="Upload a clear scan of your Malaysian IC (front and back)"
                  acceptedTypes=".pdf,.jpg,.jpeg,.png"
                  onUpload={(file) => handleDocumentUpload("identityCard", file)}
                  uploadedFile={formData.documents.identityCard}
                  required
                  error={validationErrors.identityCard}
                />
                <DocumentUpload
                  title="Passport"
                  description="Upload a clear scan of your passport's main page"
                  acceptedTypes=".pdf,.jpg,.jpeg,.png"
                  onUpload={(file) => handleDocumentUpload("passport", file)}
                  uploadedFile={formData.documents.passport}
                  required
                  error={validationErrors.passport}
                />
                <DocumentUpload
                  title="Business Registration"
                  description="Upload your business registration certificate (if applicable)"
                  acceptedTypes=".pdf,.jpg,.jpeg,.png"
                  onUpload={(file) => handleDocumentUpload("businessRegistration", file)}
                  uploadedFile={formData.documents.businessRegistration}
                  error={validationErrors.businessRegistration}
                />
                <DocumentUpload
                  title="Bank Statement"
                  description="Upload your latest 3-month bank statement"
                  acceptedTypes=".pdf,.jpg,.jpeg,.png"
                  onUpload={(file) => handleDocumentUpload("bankStatement", file)}
                  uploadedFile={formData.documents.bankStatement}
                  required
                  error={validationErrors.bankStatement}
                />
                <DocumentUpload
                  title="Resume/CV"
                  description="Upload your current resume or curriculum vitae"
                  acceptedTypes=".pdf,.doc,.docx"
                  onUpload={(file) => handleDocumentUpload("resume", file)}
                  uploadedFile={formData.documents.resume}
                  error={validationErrors.resume}
                />
                <DocumentUpload
                  title="Certificates"
                  description="Upload any relevant certificates or qualifications"
                  acceptedTypes=".pdf,.jpg,.jpeg,.png"
                  onUpload={(file) => handleDocumentUpload("certificates", file)}
                  uploadedFile={formData.documents.certificates}
                  error={validationErrors.certificates}
                />
                <DocumentUpload
                  title="References"
                  description="Upload reference letters or contact list (optional)"
                  acceptedTypes=".pdf,.doc,.docx,.txt"
                  onUpload={(file) => handleDocumentUpload("references", file)}
                  uploadedFile={formData.documents.references}
                  error={validationErrors.references}
                />
              </div>
            </div>
          )}

          {/* Step 4: References */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gold-500">References</h3>
              <Alert className="bg-gold-900/20 border-gold-700 text-gold-100">
                <AlertCircle className="h-4 w-4 text-gold-500" />
                <AlertDescription>Please provide details for at least two professional references.</AlertDescription>
              </Alert>
              {formData.references.map((ref, index) => (
                <Card key={index} className="bg-black border-gold-700 text-gold-100">
                  <CardHeader>
                    <CardTitle className="text-gold-500">Reference {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`ref${index}-name`} className="text-gold-300">
                          Name *
                        </Label>
                        <Input
                          id={`ref${index}-name`}
                          value={ref.name}
                          onChange={(e) => updateReference(index, "name", e.target.value)}
                          className={`bg-black border-gold-700 text-gold-100 placeholder:text-gold-300 ${validationErrors[`reference${index}Name`] ? "border-red-500" : ""}`}
                        />
                        {validationErrors[`reference${index}Name`] && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors[`reference${index}Name`]}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor={`ref${index}-company`} className="text-gold-300">
                          Company
                        </Label>
                        <Input
                          id={`ref${index}-company`}
                          value={ref.company}
                          onChange={(e) => updateReference(index, "company", e.target.value)}
                          className="bg-black border-gold-700 text-gold-100 placeholder:text-gold-300"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`ref${index}-position`} className="text-gold-300">
                          Position
                        </Label>
                        <Input
                          id={`ref${index}-position`}
                          value={ref.position}
                          onChange={(e) => updateReference(index, "position", e.target.value)}
                          className="bg-black border-gold-700 text-gold-100 placeholder:text-gold-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`ref${index}-phone`} className="text-gold-300">
                          Phone *
                        </Label>
                        <Input
                          id={`ref${index}-phone`}
                          value={ref.phone}
                          onChange={(e) => updateReference(index, "phone", e.target.value)}
                          className={`bg-black border-gold-700 text-gold-100 placeholder:text-gold-300 ${validationErrors[`reference${index}Phone`] ? "border-red-500" : ""}`}
                        />
                        {validationErrors[`reference${index}Phone`] && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors[`reference${index}Phone`]}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`ref${index}-email`} className="text-gold-300">
                          Email *
                        </Label>
                        <Input
                          id={`ref${index}-email`}
                          type="email"
                          value={ref.email}
                          onChange={(e) => updateReference(index, "email", e.target.value)}
                          className={`bg-black border-gold-700 text-gold-100 placeholder:text-gold-300 ${validationErrors[`reference${index}Email`] ? "border-red-500" : ""}`}
                        />
                        {validationErrors[`reference${index}Email`] && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors[`reference${index}Email`]}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor={`ref${index}-relationship`} className="text-gold-300">
                          Relationship
                        </Label>
                        <Input
                          id={`ref${index}-relationship`}
                          value={ref.relationship}
                          onChange={(e) => updateReference(index, "relationship", e.target.value)}
                          className="bg-black border-gold-700 text-gold-100 placeholder:text-gold-300"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`ref${index}-yearsKnown`} className="text-gold-300">
                        Years Known
                      </Label>
                      <Input
                        id={`ref${index}-yearsKnown`}
                        value={ref.yearsKnown}
                        onChange={(e) => updateReference(index, "yearsKnown", e.target.value)}
                        className="bg-black border-gold-700 text-gold-100 placeholder:text-gold-300"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Step 5: Terms & Agreements */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gold-500">Terms & Agreements</h3>
              <Card className="bg-black border-gold-700 text-gold-100">
                <CardHeader>
                  <CardTitle className="text-gold-500">Important Agreements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreements.agreeTerms}
                      onCheckedChange={(checked) => updateFormData("agreements", "agreeTerms", checked)}
                      className="border-gold-600 data-[state=checked]:bg-gold-600 data-[state=checked]:text-black mt-1"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="agreeTerms" className="text-gold-300">
                        I agree to the{" "}
                        <a href="#" className="text-gold-500 hover:underline">
                          Terms and Conditions
                        </a>{" "}
                        of the Agent Partnership Program. *
                      </Label>
                      {validationErrors.agreeTerms && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.agreeTerms}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreePrivacy"
                      checked={formData.agreements.agreePrivacy}
                      onCheckedChange={(checked) => updateFormData("agreements", "agreePrivacy", checked)}
                      className="border-gold-600 data-[state=checked]:bg-gold-600 data-[state=checked]:text-black mt-1"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="agreePrivacy" className="text-gold-300">
                        I acknowledge and agree to the{" "}
                        <a href="#" className="text-gold-500 hover:underline">
                          Privacy Policy
                        </a>{" "}
                        regarding data collection and usage. *
                      </Label>
                      {validationErrors.agreePrivacy && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.agreePrivacy}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeCommission"
                      checked={formData.agreements.agreeCommission}
                      onCheckedChange={(checked) => updateFormData("agreements", "agreeCommission", checked)}
                      className="border-gold-600 data-[state=checked]:bg-gold-600 data-[state=checked]:text-black mt-1"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="agreeCommission" className="text-gold-300">
                        I understand and agree to the proposed commission structure and payment terms. *
                      </Label>
                      {validationErrors.agreeCommission && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.agreeCommission}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeTraining"
                      checked={formData.agreements.agreeTraining}
                      onCheckedChange={(checked) => updateFormData("agreements", "agreeTraining", checked)}
                      className="border-gold-600 data-[state=checked]:bg-gold-600 data-[state=checked]:text-black mt-1"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="agreeTraining" className="text-gold-300">
                        I commit to completing all mandatory training modules as required by the program.
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-gold-600 text-gold-100 hover:bg-gold-900/20 hover:text-gold-500 bg-transparent"
          >
            Previous
          </Button>
          {currentStep < steps.length ? (
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-black font-semibold"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-black font-semibold"
            >
              Submit Application
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Document Upload Component
function DocumentUpload({
  title,
  description,
  acceptedTypes,
  onUpload,
  uploadedFile,
  required,
  error,
}: {
  title: string
  description: string
  acceptedTypes: string
  onUpload: (file: File | null) => void
  uploadedFile: File | null
  required?: boolean
  error?: string
}) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    onUpload(file)
  }

  const handleRemoveFile = () => {
    onUpload(null)
  }

  return (
    <Card className={`bg-black border-gold-700 text-gold-100 ${error ? "border-red-500" : ""}`}>
      <CardHeader>
        <CardTitle className="text-lg text-gold-500">
          {title} {required && <span className="text-red-500">*</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gold-300">{description}</p>
        <div className="flex items-center space-x-2">
          <Label htmlFor={`file-upload-${title.replace(/\s/g, "-")}`} className="cursor-pointer">
            <Button
              asChild
              variant="outline"
              className="border-gold-600 text-gold-100 hover:bg-gold-900/20 hover:text-gold-500 bg-transparent"
            >
              <span>
                <Upload className="w-4 h-4 mr-2" /> Choose File
              </span>
            </Button>
          </Label>
          <Input
            id={`file-upload-${title.replace(/\s/g, "-")}`}
            type="file"
            accept={acceptedTypes}
            onChange={handleFileChange}
            className="hidden"
          />
          {uploadedFile ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{uploadedFile.name}</span>
              <Button variant="ghost" size="sm" onClick={handleRemoveFile} className="text-red-500 hover:bg-red-900/20">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <span className="text-sm text-gold-300">No file chosen</span>
          )}
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </CardContent>
    </Card>
  )
}
