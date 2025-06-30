"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  User,
  Upload,
  CreditCard,
  Check,
  X,
  FileText,
  Camera,
  AlertCircle,
  Save,
  ArrowRight,
  ArrowLeft,
  UserPlus,
  Phone,
  Mail,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

// Document Upload Component
function DocumentUpload({
  title,
  description,
  acceptedTypes,
  onUpload,
  uploadedFile,
  required = false,
}: {
  title: string
  description: string
  acceptedTypes: string
  onUpload: (file: File) => void
  uploadedFile?: File | null
  required?: boolean
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = (file: File) => {
    if (file) {
      onUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Label className="font-medium">{title}</Label>
        {required && (
          <Badge variant="destructive" className="text-xs">
            Required
          </Badge>
        )}
      </div>
      <p className="text-sm text-gray-600">{description}</p>

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver ? "border-emerald-500 bg-emerald-50" : "border-gray-300"
        } ${uploadedFile ? "border-green-500 bg-green-50" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {uploadedFile ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center">
              <FileText className="w-12 h-12 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-800">{uploadedFile.name}</p>
              <p className="text-sm text-green-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <div className="flex space-x-2 justify-center">
              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                Replace
              </Button>
              <Button variant="outline" size="sm" onClick={() => onUpload(null as any)}>
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-center">
              <Upload className="w-12 h-12 text-gray-400" />
            </div>
            <div>
              <p className="font-medium">Drop your file here or click to browse</p>
              <p className="text-sm text-gray-500">Accepted formats: {acceptedTypes}</p>
              <p className="text-xs text-gray-400">Maximum file size: 10MB</p>
            </div>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Camera className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={acceptedTypes}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            handleFileSelect(file)
          }
        }}
      />
    </div>
  )
}

// Payment Method Component
function PaymentMethodCard({
  method,
  selected,
  onSelect,
}: {
  method: any
  selected: boolean
  onSelect: () => void
}) {
  return (
    <Card
      className={`cursor-pointer transition-all ${
        selected ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <RadioGroupItem value={method.id} checked={selected} />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <method.icon className="w-5 h-5" />
              <span className="font-medium">{method.name}</span>
              {method.popular && <Badge className="bg-emerald-600 text-white text-xs">Popular</Badge>}
            </div>
            <p className="text-sm text-gray-600 mt-1">{method.description}</p>
            {method.processingFee && (
              <p className="text-xs text-gray-500 mt-1">Processing fee: {method.processingFee}</p>
            )}
          </div>
          <div className="text-right">
            <div className="font-bold text-emerald-600">{method.amount}</div>
            {method.originalAmount && <div className="text-sm text-gray-500 line-through">{method.originalAmount}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Main Booking Wizard Component
export default function BookingWizard({
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

if (!packageData || !selectedDate) return null;
  const [currentStep, setCurrentStep] = useState(1)
  const [showAgentRegistration, setShowAgentRegistration] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})
  const [savedDraft, setSavedDraft] = useState(false)

  // Form Data State
  const [formData, setFormData] = useState({
    customerInfo: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      passportNumber: "",
      passportExpiry: "",
      dateOfBirth: "",
      nationality: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      dietaryRequirements: "",
      medicalConditions: "",
      specialRequests: "",
    },
    documents: {
      passport: null as File | null,
      photo: null as File | null,
      certificate: null as File | null,
      receipt: null as File | null,
    },
    payment: {
      method: "deposit",
      paymentType: "credit-card",
      agreeTerms: false,
      agreePrivacy: false,
    },
    agentRegistration: {
      wantToRegister: false,
      companyName: "",
      businessRegistration: "",
      referralCode: "",
    },
  })

  const totalPrice = packageData.price + (roomSelection?.additionalCost || 0)
  const depositAmount = totalPrice * 0.3

  const paymentMethods = [
    {
      id: "deposit",
      name: "Pay Deposit (30%)",
      description: "Pay 30% now, remaining amount 30 days before departure",
      amount: `RM ${depositAmount.toLocaleString()}`,
      originalAmount: `RM ${totalPrice.toLocaleString()}`,
      icon: CreditCard,
      popular: true,
    },
    {
      id: "full",
      name: "Pay Full Amount",
      description: "Complete payment now with 5% discount",
      amount: `RM ${(totalPrice * 0.95).toLocaleString()}`,
      originalAmount: `RM ${totalPrice.toLocaleString()}`,
      icon: CreditCard,
      popular: false,
    },
  ]

  const paymentTypes = [
    {
      id: "credit-card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      icon: CreditCard,
      processingFee: "2.5%",
    },
    {
      id: "fpx",
      name: "Online Banking (FPX)",
      description: "Direct bank transfer",
      icon: CreditCard,
      processingFee: "Free",
    },
    {
      id: "ewallet",
      name: "E-Wallet",
      description: "GrabPay, Touch 'n Go, Boost",
      icon: Phone,
      processingFee: "1.5%",
    },
  ]

  // Validation Functions
  const validateStep1 = () => {
    const errors: { [key: string]: string } = {}
    const { customerInfo } = formData

    if (!customerInfo.firstName.trim()) errors.firstName = "First name is required"
    if (!customerInfo.lastName.trim()) errors.lastName = "Last name is required"
    if (!customerInfo.email.trim()) errors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) errors.email = "Invalid email format"
    if (!customerInfo.phone.trim()) errors.phone = "Phone number is required"
    if (!customerInfo.passportNumber.trim()) errors.passportNumber = "Passport number is required"
    if (!customerInfo.dateOfBirth) errors.dateOfBirth = "Date of birth is required"
    if (!customerInfo.nationality.trim()) errors.nationality = "Nationality is required"
    if (!customerInfo.address.trim()) errors.address = "Address is required"

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateStep2 = () => {
    const errors: { [key: string]: string } = {}
    const { documents } = formData

    if (!documents.passport) errors.passport = "Passport scan is required"
    if (!documents.photo) errors.photo = "Passport photo is required"

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateStep3 = () => {
    const errors: { [key: string]: string } = {}
    const { payment } = formData

    if (!payment.agreeTerms) errors.agreeTerms = "You must agree to terms and conditions"
    if (!payment.agreePrivacy) errors.agreePrivacy = "You must agree to privacy policy"

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Navigation Functions
  const nextStep = () => {
    let isValid = true

    if (currentStep === 1) isValid = validateStep1()
    if (currentStep === 2) isValid = validateStep2()
    if (currentStep === 3) isValid = validateStep3()

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const skipToPayment = () => {
    setCurrentStep(3)
  }

  const saveAndAmendLater = () => {
    // Save form data to localStorage or send to server
    localStorage.setItem("bookingDraft", JSON.stringify(formData))
    setSavedDraft(true)
    setTimeout(() => setSavedDraft(false), 3000)
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

  const handleDocumentUpload = (docType: string, file: File) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: file,
      },
    }))
  }

  const getStepProgress = () => {
    return (currentStep / 3) * 100
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Complete Your Booking</span>
            <div className="flex items-center space-x-2">
              {savedDraft && (
                <Badge className="bg-green-600 text-white">
                  <Save className="w-3 h-3 mr-1" />
                  Draft Saved
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Step {currentStep} of 3</span>
            <span>{Math.round(getStepProgress())}% Complete</span>
          </div>
          <Progress value={getStepProgress()} className="h-2" />
        </div>

        {/* Step Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {[
              { id: 1, title: "Customer Info", icon: User },
              { id: 2, title: "Documents", icon: Upload },
              { id: 3, title: "Payment", icon: CreditCard },
            ].map((step) => (
              <div key={step.id} className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span
                  className={`text-sm ${currentStep >= step.id ? "text-emerald-600 font-medium" : "text-gray-500"}`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={saveAndAmendLater}>
              <Save className="w-4 h-4 mr-1" />
              Save Draft
            </Button>
            {currentStep < 3 && (
              <Button variant="outline" size="sm" onClick={skipToPayment}>
                <ArrowRight className="w-4 h-4 mr-1" />
                Skip to Payment
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Customer Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Customer Information</h3>
                  <Button variant="outline" size="sm" onClick={() => setShowAgentRegistration(!showAgentRegistration)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register as Agent
                  </Button>
                </div>

                {/* Agent Registration Option */}
                {showAgentRegistration && (
                  <Card className="border-emerald-200 bg-emerald-50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <UserPlus className="w-5 h-5 mr-2" />
                        Agent Registration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="wantToRegister"
                          checked={formData.agentRegistration.wantToRegister}
                          onCheckedChange={(checked) => updateFormData("agentRegistration", "wantToRegister", checked)}
                        />
                        <Label htmlFor="wantToRegister">I want to register as an agent</Label>
                      </div>

                      {formData.agentRegistration.wantToRegister && (
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input
                              id="companyName"
                              value={formData.agentRegistration.companyName}
                              onChange={(e) => updateFormData("agentRegistration", "companyName", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="businessRegistration">Business Registration No.</Label>
                            <Input
                              id="businessRegistration"
                              value={formData.agentRegistration.businessRegistration}
                              onChange={(e) =>
                                updateFormData("agentRegistration", "businessRegistration", e.target.value)
                              }
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                            <Input
                              id="referralCode"
                              value={formData.agentRegistration.referralCode}
                              onChange={(e) => updateFormData("agentRegistration", "referralCode", e.target.value)}
                              placeholder="Enter referral code if you have one"
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Select
                          value={formData.customerInfo.title}
                          onValueChange={(value) => updateFormData("customerInfo", "title", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select title" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mr">Mr.</SelectItem>
                            <SelectItem value="mrs">Mrs.</SelectItem>
                            <SelectItem value="ms">Ms.</SelectItem>
                            <SelectItem value="dr">Dr.</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.customerInfo.firstName}
                          onChange={(e) => updateFormData("customerInfo", "firstName", e.target.value)}
                          className={validationErrors.firstName ? "border-red-500" : ""}
                        />
                        {validationErrors.firstName && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.customerInfo.lastName}
                          onChange={(e) => updateFormData("customerInfo", "lastName", e.target.value)}
                          className={validationErrors.lastName ? "border-red-500" : ""}
                        />
                        {validationErrors.lastName && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.customerInfo.email}
                          onChange={(e) => updateFormData("customerInfo", "email", e.target.value)}
                          className={validationErrors.email ? "border-red-500" : ""}
                        />
                        {validationErrors.email && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.customerInfo.phone}
                          onChange={(e) => updateFormData("customerInfo", "phone", e.target.value)}
                          className={validationErrors.phone ? "border-red-500" : ""}
                        />
                        {validationErrors.phone && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="passportNumber">Passport Number *</Label>
                        <Input
                          id="passportNumber"
                          value={formData.customerInfo.passportNumber}
                          onChange={(e) => updateFormData("customerInfo", "passportNumber", e.target.value)}
                          className={validationErrors.passportNumber ? "border-red-500" : ""}
                        />
                        {validationErrors.passportNumber && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.passportNumber}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="passportExpiry">Passport Expiry *</Label>
                        <Input
                          id="passportExpiry"
                          type="date"
                          value={formData.customerInfo.passportExpiry}
                          onChange={(e) => updateFormData("customerInfo", "passportExpiry", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.customerInfo.dateOfBirth}
                          onChange={(e) => updateFormData("customerInfo", "dateOfBirth", e.target.value)}
                          className={validationErrors.dateOfBirth ? "border-red-500" : ""}
                        />
                        {validationErrors.dateOfBirth && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.dateOfBirth}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="nationality">Nationality *</Label>
                      <Select
                        value={formData.customerInfo.nationality}
                        onValueChange={(value) => updateFormData("customerInfo", "nationality", value)}
                      >
                        <SelectTrigger className={validationErrors.nationality ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="malaysian">Malaysian</SelectItem>
                          <SelectItem value="singaporean">Singaporean</SelectItem>
                          <SelectItem value="indonesian">Indonesian</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {validationErrors.nationality && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.nationality}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Address Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Address Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Textarea
                        id="address"
                        value={formData.customerInfo.address}
                        onChange={(e) => updateFormData("customerInfo", "address", e.target.value)}
                        className={validationErrors.address ? "border-red-500" : ""}
                        rows={2}
                      />
                      {validationErrors.address && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.address}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.customerInfo.city}
                          onChange={(e) => updateFormData("customerInfo", "city", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.customerInfo.state}
                          onChange={(e) => updateFormData("customerInfo", "state", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={formData.customerInfo.postalCode}
                          onChange={(e) => updateFormData("customerInfo", "postalCode", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contact & Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contact & Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                        <Input
                          id="emergencyContactName"
                          value={formData.customerInfo.emergencyContactName}
                          onChange={(e) => updateFormData("customerInfo", "emergencyContactName", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                        <Input
                          id="emergencyContactPhone"
                          value={formData.customerInfo.emergencyContactPhone}
                          onChange={(e) => updateFormData("customerInfo", "emergencyContactPhone", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="dietaryRequirements">Dietary Requirements</Label>
                      <Textarea
                        id="dietaryRequirements"
                        value={formData.customerInfo.dietaryRequirements}
                        onChange={(e) => updateFormData("customerInfo", "dietaryRequirements", e.target.value)}
                        placeholder="Please specify any dietary restrictions or preferences..."
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="medicalConditions">Medical Conditions</Label>
                      <Textarea
                        id="medicalConditions"
                        value={formData.customerInfo.medicalConditions}
                        onChange={(e) => updateFormData("customerInfo", "medicalConditions", e.target.value)}
                        placeholder="Please specify any medical conditions we should be aware of..."
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea
                        id="specialRequests"
                        value={formData.customerInfo.specialRequests}
                        onChange={(e) => updateFormData("customerInfo", "specialRequests", e.target.value)}
                        placeholder="Any special requests or accessibility needs..."
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Document Upload */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Document Upload</h3>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please upload clear, high-quality scans or photos of your documents. All documents must be valid and
                    clearly readable.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-6">
                  <DocumentUpload
                    title="Passport Scan"
                    description="Upload a clear scan of your passport's main page"
                    acceptedTypes=".pdf,.jpg,.jpeg,.png"
                    onUpload={(file) => handleDocumentUpload("passport", file)}
                    uploadedFile={formData.documents.passport}
                    required
                  />

                  <DocumentUpload
                    title="Passport Photo"
                    description="Upload a recent passport-sized photograph"
                    acceptedTypes=".jpg,.jpeg,.png"
                    onUpload={(file) => handleDocumentUpload("photo", file)}
                    uploadedFile={formData.documents.photo}
                    required
                  />

                  <DocumentUpload
                    title="Vaccination Certificate"
                    description="Upload your vaccination certificate (if required)"
                    acceptedTypes=".pdf,.jpg,.jpeg,.png"
                    onUpload={(file) => handleDocumentUpload("certificate", file)}
                    uploadedFile={formData.documents.certificate}
                  />

                  <DocumentUpload
                    title="Payment Receipt"
                    description="Upload any previous payment receipts (if applicable)"
                    acceptedTypes=".pdf,.jpg,.jpeg,.png"
                    onUpload={(file) => handleDocumentUpload("receipt", file)}
                    uploadedFile={formData.documents.receipt}
                  />
                </div>

                {(validationErrors.passport || validationErrors.photo) && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>Please upload all required documents to continue.</AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Payment Options</h3>

                {/* Payment Method Selection */}
                <div>
                  <Label className="text-base font-medium mb-4 block">Choose Payment Method</Label>
                  <RadioGroup
                    value={formData.payment.method}
                    onValueChange={(value) => updateFormData("payment", "method", value)}
                  >
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <PaymentMethodCard
                          key={method.id}
                          method={method}
                          selected={formData.payment.method === method.id}
                          onSelect={() => updateFormData("payment", "method", method.id)}
                        />
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment Type Selection */}
                <div>
                  <Label className="text-base font-medium mb-4 block">Payment Gateway</Label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {paymentTypes.map((type) => (
                      <Card
                        key={type.id}
                        className={`cursor-pointer transition-all ${
                          formData.payment.paymentType === type.id
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => updateFormData("payment", "paymentType", type.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <type.icon className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                          <div className="font-medium text-sm">{type.name}</div>
                          <div className="text-xs text-gray-600 mt-1">{type.description}</div>
                          <div className="text-xs text-emerald-600 mt-1">{type.processingFee}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.payment.agreeTerms}
                        onCheckedChange={(checked) => updateFormData("payment", "agreeTerms", checked)}
                        className={validationErrors.agreeTerms ? "border-red-500" : ""}
                      />
                      <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                        I agree to the{" "}
                        <a href="#" className="text-emerald-600 hover:underline">
                          Terms and Conditions
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-emerald-600 hover:underline">
                          Booking Policy
                        </a>
                      </Label>
                    </div>
                    {validationErrors.agreeTerms && (
                      <p className="text-red-500 text-xs">{validationErrors.agreeTerms}</p>
                    )}

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreePrivacy"
                        checked={formData.payment.agreePrivacy}
                        onCheckedChange={(checked) => updateFormData("payment", "agreePrivacy", checked)}
                        className={validationErrors.agreePrivacy ? "border-red-500" : ""}
                      />
                      <Label htmlFor="agreePrivacy" className="text-sm leading-relaxed">
                        I agree to the{" "}
                        <a href="#" className="text-emerald-600 hover:underline">
                          Privacy Policy
                        </a>{" "}
                        and consent to the processing of my personal data
                      </Label>
                    </div>
                    {validationErrors.agreePrivacy && (
                      <p className="text-red-500 text-xs">{validationErrors.agreePrivacy}</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {/* Package Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-2">{packageData.title}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Departure:</span>
                        <span>{selectedDate.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{selectedDate.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Package Price:</span>
                        <span>RM {packageData.price.toLocaleString()}</span>
                      </div>
                      {roomSelection && roomSelection.additionalCost > 0 && (
                        <div className="flex justify-between">
                          <span>Room Upgrade:</span>
                          <span>RM {roomSelection.additionalCost.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between font-medium">
                      <span>Total Amount:</span>
                      <span>RM {totalPrice.toLocaleString()}</span>
                    </div>
                    {formData.payment.method === "deposit" && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Deposit (30%):</span>
                        <span>RM {depositAmount.toLocaleString()}</span>
                      </div>
                    )}
                    {formData.payment.method === "full" && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>With 5% Discount:</span>
                        <span>RM {(totalPrice * 0.95).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Our booking specialists are here to assist you.</p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call +60 12-903 4966
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center pt-6 border-t">
          <div className="flex space-x-3">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {currentStep < 3 ? (
              <Button onClick={nextStep} className="bg-emerald-600 hover:bg-emerald-700">
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button className="bg-emerald-600 hover:bg-emerald-700 px-8">
                <CreditCard className="w-4 h-4 mr-2" />
                Proceed to Payment
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
