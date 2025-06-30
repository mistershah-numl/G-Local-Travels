"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  DollarSign,
  Users,
  Package,
  BarChart3,
  Upload,
  Download,
  User,
  Bell,
  Settings,
  LogOut,
  Search,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Mail,
  Copy,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"

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
              className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all rounded-t"
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

// Commission Chart Component
function CommissionChart({ data }: { data: any }) {
  const total = data.reduce((sum: number, item: any) => sum + item.value, 0)
  let startPercent = 0

  return (
    <div className="w-full space-y-4">
      <div className="h-8 w-full flex rounded-full overflow-hidden">
        {data.map((item: any, index: number) => {
          const widthPercent = (item.value / total) * 100
          const currentStart = startPercent
          startPercent += widthPercent

          return (
            <div key={index} className={`h-full ${item.color} group relative`} style={{ width: `${widthPercent}%` }}>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-medium text-white">{Math.round(widthPercent)}%</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex flex-wrap gap-4">
        {data.map((item: any, index: number) => (
          <div key={index} className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
            <span className="text-sm">
              {item.label}: {item.value.toLocaleString()} MYR
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Package Card Component
function PackageCard({ packageData }: { packageData: any }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <Image
          src={packageData.image || "/placeholder.svg"}
          alt={packageData.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-emerald-600 text-white">{packageData.commission}% Commission</Badge>
        {packageData.exclusive && <Badge className="absolute top-3 left-3 bg-amber-600 text-white">Exclusive</Badge>}
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg line-clamp-1">{packageData.title}</CardTitle>
            <CardDescription>
              {packageData.duration} • {packageData.destinations.join(", ")}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-emerald-600">RM {packageData.price.toLocaleString()}</div>
            <div className="text-xs text-gray-500">per person</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="space-y-3">
          {/* Sales Progress */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Sales Progress</span>
              <span className="font-medium">
                {packageData.salesCount}/{packageData.salesTarget} sold
              </span>
            </div>
            <Progress value={(packageData.salesCount / packageData.salesTarget) * 100} className="h-2" />
          </div>

          {/* Commission Info */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Potential Commission:</span>
            <span className="font-medium text-emerald-600">
              RM {((packageData.price * packageData.commission) / 100).toLocaleString()} per sale
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href={`/agent/packages/${packageData.id}`}>View Details</Link>
            </Button>
            <Button variant="outline" size="icon">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Commission Table Component
function CommissionTable({ commissions }: { commissions: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Package</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Sale Date</TableHead>
          <TableHead>Sale Amount</TableHead>
          <TableHead>Commission</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {commissions.map((commission) => (
          <TableRow key={commission.id}>
            <TableCell className="font-medium">{commission.package}</TableCell>
            <TableCell>{commission.customer}</TableCell>
            <TableCell>{commission.date}</TableCell>
            <TableCell>RM {commission.amount.toLocaleString()}</TableCell>
            <TableCell className="font-medium text-emerald-600">
              RM {commission.commissionAmount.toLocaleString()}
            </TableCell>
            <TableCell>
              <Badge
                className={
                  commission.status === "paid"
                    ? "bg-green-100 text-green-800"
                    : commission.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                }
              >
                {commission.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                <FileText className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// Sub-Agent Card Component
function SubAgentCard({ agent }: { agent: any }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={agent.avatar || "/placeholder.svg"} />
              <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{agent.name}</div>
              <div className="text-sm text-gray-500">{agent.email}</div>
            </div>
          </div>
          <Badge className={agent.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
            {agent.active ? "Active" : "Inactive"}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            <div className="text-gray-500">Total Sales</div>
            <div className="font-medium">RM {agent.totalSales.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-500">Commission</div>
            <div className="font-medium">RM {agent.commission.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-500">Packages Sold</div>
            <div className="font-medium">{agent.packagesSold}</div>
          </div>
          <div>
            <div className="text-gray-500">Last Active</div>
            <div className="font-medium">{agent.lastActive}</div>
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <Button variant="outline" size="sm" className="flex-1">
            <Mail className="w-4 h-4 mr-1" />
            Contact
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <BarChart3 className="w-4 h-4 mr-1" />
            Performance
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Sales Proof Upload Dialog
function SalesProofDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedPackage, setSelectedPackage] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [saleAmount, setSaleAmount] = useState("")
  const [proofType, setProofType] = useState("receipt")
  const [notes, setNotes] = useState("")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Proof of Sale</DialogTitle>
          <DialogDescription>Submit documentation for your sales to process your commission.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="package">Package</Label>
            <Select value={selectedPackage} onValueChange={setSelectedPackage}>
              <SelectTrigger>
                <SelectValue placeholder="Select package" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="umr001">Premium Umrah Package</SelectItem>
                <SelectItem value="umr002">Economy Umrah Package</SelectItem>
                <SelectItem value="hajj001">Hajj Package 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer">Customer Name</Label>
            <Input
              id="customer"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Sale Amount (MYR)</Label>
            <Input
              id="amount"
              value={saleAmount}
              onChange={(e) => setSaleAmount(e.target.value)}
              placeholder="0.00"
              type="number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proofType">Proof Type</Label>
            <Select value={proofType} onValueChange={setProofType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="receipt">Payment Receipt</SelectItem>
                <SelectItem value="booking">Booking Confirmation</SelectItem>
                <SelectItem value="transfer">Bank Transfer</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="proof">Upload Proof Document</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload className="w-8 h-8 mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PDF, JPG or PNG (max. 5MB)</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional information about this sale"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Payout Request Dialog
function PayoutRequestDialog({
  isOpen,
  onClose,
  availableAmount,
}: { isOpen: boolean; onClose: () => void; availableAmount: number }) {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("bank")
  const [bankDetails, setBankDetails] = useState({
    accountName: "Ahmad Ibrahim",
    accountNumber: "1234567890",
    bankName: "Maybank",
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Request Commission Payout</DialogTitle>
          <DialogDescription>Available for payout: RM {availableAmount.toLocaleString()}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="amount">Payout Amount (MYR)</Label>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              type="number"
            />
            <p className="text-xs text-gray-500">Minimum payout amount: RM 100</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="ewallet">E-Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {paymentMethod === "bank" && (
            <div className="space-y-3 border rounded-lg p-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Bank Details</h4>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Account Name:</span>
                  <span>{bankDetails.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Account Number:</span>
                  <span>{bankDetails.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Bank:</span>
                  <span>{bankDetails.bankName}</span>
                </div>
              </div>
            </div>
          )}

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Payouts are typically processed within 3-5 business days.</AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">Request Payout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Add Sub-Agent Dialog
function AddSubAgentDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Sub-Agent</DialogTitle>
          <DialogDescription>Invite a new sub-agent to join your team.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter full name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Enter email address" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="Enter phone number" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="commission">Commission Split (%)</Label>
            <Input id="commission" type="number" placeholder="e.g. 30" />
            <p className="text-xs text-gray-500">
              This is the percentage of your commission that will be shared with this sub-agent.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="sendInvite" />
            <Label htmlFor="sendInvite">Send invitation email</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">Add Sub-Agent</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Download Leads Dialog
function DownloadLeadsDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [leadType, setLeadType] = useState("all")
  const [dateRange, setDateRange] = useState("last30")
  const [format, setFormat] = useState("excel")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Download Leads</DialogTitle>
          <DialogDescription>Export your leads data for offline analysis.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="leadType">Lead Type</Label>
            <Select value={leadType} onValueChange={setLeadType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leads</SelectItem>
                <SelectItem value="new">New Leads</SelectItem>
                <SelectItem value="contacted">Contacted Leads</SelectItem>
                <SelectItem value="qualified">Qualified Leads</SelectItem>
                <SelectItem value="converted">Converted Leads</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateRange">Date Range</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7">Last 7 Days</SelectItem>
                <SelectItem value="last30">Last 30 Days</SelectItem>
                <SelectItem value="last90">Last 90 Days</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
                <SelectItem value="allTime">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="format">Export Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="includeDetails" />
            <Label htmlFor="includeDetails">Include contact details</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="includeNotes" />
            <Label htmlFor="includeNotes">Include notes and interactions</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Main Agent Dashboard Component
export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showSalesProofDialog, setShowSalesProofDialog] = useState(false)
  const [showPayoutDialog, setShowPayoutDialog] = useState(false)
  const [showAddSubAgentDialog, setShowAddSubAgentDialog] = useState(false)
  const [showDownloadLeadsDialog, setShowDownloadLeadsDialog] = useState(false)
  
  // Sample agent data
  const agentData = {
    name: "Ahmad Ibrahim",
    email: "ahmad.ibrahim@email.com",
    phone: "+60 12-345 6789",
    agentSince: "2022",
    tier: "Gold",
    avatar: "/placeholder.svg?height=80&width=80",
    availableCommission: 12450,
    pendingCommission: 5800,
    lifetimeSales: 245000,
    salesTarget: 300000,
    salesProgress: 82,
  }
  
  // Sample packages data
  const assignedPackages = [
    {
      id: 1,
      title: "Premium Umrah Package with 5-Star Hotels",
      price: 8500,
      duration: "14 Days",
      destinations: ["Makkah", "Madinah"],
      image: "/placeholder.svg?height=200&width=400",
      commission: 10,
      salesTarget: 20,
      salesCount: 12,
      exclusive: true,
    },
    {
      id: 2,
      title: "Economy Umrah Package - Great Value",
      price: 5800,
      duration: "10 Days",
      destinations: ["Makkah", "Madinah"],
      image: "/placeholder.svg?height=200&width=400",
      commission: 8,
      salesTarget: 30,
      salesCount: 18,
      exclusive: false,
    },
    {
      id: 3,
      title: "Luxury Umrah Experience with VIP Services",
      price: 12000,
      duration: "16 Days",
      destinations: ["Makkah", "Madinah", "Jeddah"],
      image: "/placeholder.svg?height=200&width=400",
      commission: 12,
      salesTarget: 15,
      salesCount: 7,
      exclusive: true,
    },
    {
      id: 4,
      title: "Hajj Package 2025 - Complete Pilgrimage",
      price: 18500,
      duration: "21 Days",
      destinations: ["Makkah", "Madinah", "Mina", "Arafat"],
      image: "/placeholder.svg?height=200&width=400",
      commission: 15,
      salesTarget: 10,
      salesCount: 3,
      exclusive: false,
    },
  ]
  
  // Sample commissions data
  const commissions = [
    {
      id: 1,
      package: "Premium Umrah Package",
      customer: "Mohd Rizal",
      date: "2025-01-15",
      amount: 17000,
      commissionAmount: 1700,
      status: "paid",
    },
    {
      id: 2,
      package: "Economy Umrah Package",
      customer: "Nurul Huda",
      date: "2025-01-10",
      amount: 5800,
      commissionAmount: 464,
      status: "paid",
    },
    {
      id: 3,
      package: "Premium Umrah Package",
      customer: "Ismail Abdullah",
      date: "2025-01-05",
      amount: 17000,
      commissionAmount: 1700,
      status: "pending",
    },
    {
      id: 4,
      package: "Luxury Umrah Experience",
      customer: "Fatimah Zahra",
      date: "2024-12-28",
      amount: 24000,
      commissionAmount: 2880,
      status: "processing",
    },
    {
      id: 5,
      package: "Hajj Package 2025",
      customer: "Abdul Rahman",
      date: "2024-12-20",
      amount: 18500,
      commissionAmount: 2775,
      status: "paid",
    },
  ]
  
  // Sample sub-agents data
  const subAgents = [
    {
      id: 1,
      name: "Siti Aminah",
      email: "siti.aminah@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      active: true,
      totalSales: 85000,
      commission: 4250,
      packagesSold: 12,
      lastActive: "Today",
    },
    {
      id: 2,
      name: "Mohd Faizal",
      email: "mohd.faizal@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      active: true,
      totalSales: 62000,
      commission: 3100,
      packagesSold: 9,
      lastActive: "Yesterday",
    },
    {
      id: 3,
      name: "Nurul Huda",
      email: "nurul.huda@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      active: false,
      totalSales: 35000,
      commission: 1750,
      packagesSold: 5,
      lastActive: "2 weeks ago",
    },
  ]
  
  // Sample sales data for charts
  const monthlySalesData = [
    { label: "Jan", value: 25000 },
    { label: "Feb", value: 32000 },
    { label: "Mar", value: 28000 },
    { label: "Apr", value: 42000 },
    { label: "May", value: 38000 },
    { label: "Jun", value: 45000 },
  ]
  
  const commissionBreakdownData = [
    { label: "Umrah Packages", value: 8500, color: "bg-emerald-500" },
    { label: "Hajj Packages", value: 12000, color: "bg-blue-500" },
    { label: "Muslim Tours", value: 3500, color: "bg-amber-500" },
    { label: "Hotel Bookings", value: 1200, color: "bg-purple-500" },
  ]
  
  // Sample sales proofs
  const salesProofs = [
    {
      id: 1,
      package: "Premium Umrah Package",
      customer: "Mohd Rizal",
      date: "2025-01-15",
      amount: 17000,
      document: "receipt_mohd_rizal.pdf",
      status: "approved",
    },
    {
      id: 2,
      package: "Economy Umrah Package",
      customer: "Nurul Huda",
      date: "2025-01-10",
      amount: 5800,
      document: "booking_nurul_huda.pdf",
      status: "pending",
    },
    {
      id: 3,
      package: "Luxury Umrah Experience",
      customer: "Fatimah Zahra",
      date: "2024-12-28",
      amount: 24000,
      document: "transfer_fatimah_zahra.pdf",
      status: "rejected",
    },
  ]
  
  // Sample leads data
  const leadsData = {
    total: 85,
    new: 12,
    contacted: 28,
    qualified: 32,
    converted: 13,
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={agentData.avatar || "/placeholder.svg"} alt={agentData.name} />
                <AvatarFallback>
                  {agentData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-gray-900">{agentData.name}</h1>
                  <Badge className="bg-amber-100 text-amber-800">{agentData.tier} Agent</Badge>
                </div>
                <p className="text-gray-600">
                  Agent since {agentData.agentSince} • ID: AG{agentData.agentSince}1234
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="packages">Assigned Packages</TabsTrigger>
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
            <TabsTrigger value="sales">Sales Breakdown</TabsTrigger>
            <TabsTrigger value="proofs">Upload Proofs</TabsTrigger>
            <TabsTrigger value="subagents">Sub-Agents</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Available Commission</p>
                      <h3 className="text-2xl font-bold text-emerald-600">
                        RM {agentData.availableCommission.toLocaleString()}
                      </h3>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setShowPayoutDialog(true)}
                  >
                    Request Payout
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending Commission</p>
                      <h3 className="text-2xl font-bold text-blue-600">
                        RM {agentData.pendingCommission.toLocaleString()}
                      </h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <span className="text-gray-500">Processing</span>
                    <span className="font-medium">3-5 business days</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Lifetime Sales</p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        RM {agentData.lifetimeSales.toLocaleString()}
                      </h3>
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Sales Target</span>
                      <span className="font-medium">{agentData.salesProgress}%</span>
                    </div>
                    <Progress value={agentData.salesProgress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Leads</p>
                      <h3 className="text-2xl font-bold text-gray-900">{leadsData.total}</h3>
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => setShowDownloadLeadsDialog(true)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Leads
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <SalesChart data={monthlySalesData} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Commission Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <CommissionChart data={commissionBreakdownData} />
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Commission Paid</p>
                      <p className="text-sm text-gray-600">
                        RM 1,700 commission for Premium Umrah Package has been paid to your account.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Today, 10:23 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                      <Package className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">New Package Assigned</p>
                      <p className="text-sm text-gray-600">
                        You have been assigned to sell "Luxury Umrah Experience with VIP Services".
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Yesterday, 3:45 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mt-0.5">
                      <User className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">New Lead Assigned</p>
                      <p className="text-sm text-gray-600">
                        A new lead has been assigned to you: Mohd Rizal (interested in Umrah packages).
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Jan 15, 2025, 9:12 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assigned Packages Tab */}
          <TabsContent value="packages" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Assigned Packages</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input className="pl-9 w-[250px]" placeholder="Search packages..." />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Packages</SelectItem>
                    <SelectItem value="umrah">Umrah Packages</SelectItem>
                    <SelectItem value="hajj">Hajj Packages</SelectItem>
                    <SelectItem value="tour">Muslim Tours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignedPackages.map((pkg) => (
                <PackageCard key={pkg.id} packageData={pkg} />
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Package Sales Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Package</TableHead>
                      <TableHead>Sales Target</TableHead>
                      <TableHead>Current Sales</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Commission Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignedPackages.map((pkg) => (
                      <TableRow key={pkg.id}>
                        <TableCell className="font-medium">{pkg.title}</TableCell>
                        <TableCell>{pkg.salesTarget}</TableCell>
                        <TableCell>{pkg.salesCount}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={(pkg.salesCount / pkg.salesTarget) * 100} className="h-2 w-24" />
                            <span className="text-sm">{Math.round((pkg.salesCount / pkg.salesTarget) * 100)}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-emerald-100 text-emerald-800">{pkg.commission}%</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commissions Tab */}
          <TabsContent value="commissions" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Commissions Tracker</h2>
                <p className="text-gray-600">Track and manage your commission earnings</p>
              </div>
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => setShowPayoutDialog(true)}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Request Payout
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Available for Payout</p>
                      <h3 className="text-2xl font-bold text-emerald-600">
                        RM {agentData.availableCommission.toLocaleString()}
                      </h3>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending Approval</p>
                      <h3 className="text-2xl font-bold text-amber-600">
                        RM {agentData.pendingCommission.toLocaleString()}
                      </h3>
                    </div>
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Paid (2025)</p>
                      <h3 className="text-2xl font-bold text-blue-600">
                        RM 28,500
                      </h3>
                    </div>
                    <ArrowDownRight className="w-5 h-5 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Commission History</CardTitle>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <CommissionTable commissions={commissions} />
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Showing 5 of 24 transactions
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Commission Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Package Type</TableHead>
                      <TableHead>Base Rate</TableHead>
                      <TableHead>Your Rate</TableHead>
                      <TableHead>Bonus Eligibility</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Umrah Packages</TableCell>
                      <TableCell>8%</TableCell>
                      <TableCell className="font-medium text-emerald-600">10%</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Eligible</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Hajj Packages</TableCell>
                      <TableCell>12%</TableCell>
                      <TableCell className="font-medium text-emerald-600">15%</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Eligible</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Muslim Tours</TableCell>
                      <TableCell>7%</TableCell>
                      <TableCell className="font-medium text-emerald-600">7%</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-800">Needs 5 more sales</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Hotel Bookings</TableCell>
                      <TableCell>5%</TableCell>
                      <TableCell className="font-medium text-emerald-600">5%</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-800">Needs 10 more sales</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-2 text-blue-800">
                    <Percent className="w-4 h-4 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Gold Tier Bonus</p>
                      <p>You receive a 2% bonus on all Umrah and Hajj packages as a Gold tier agent.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Breakdown Tab */}
          <TabsContent value="sales" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Sales Breakdown</h2>
                <p className="text-gray-600">Analyze your sales performance</p>
              </div>
              <div className="flex items-center space-x-2">
                <Select defaultValue="thisYear">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="thisQuarter">This Quarter</SelectItem>
                    <SelectItem value="thisYear">This Year</SelectItem>
                    <SelectItem value="allTime">All Time</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Sales</p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        RM 245,000
                      </h3>
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">12% increase</span>
                    <span className="text-gray-500 ml-1">vs last year</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Packages Sold</p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        42
                      </h3>
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">8% increase</span>
                    <span className="text-gray-500 ml-1">vs last year</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        18.5%
                      </h3>
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Percent className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">2.3% increase</span>
                    <span className="text-gray-500 ml-1">vs last year</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Avg. Sale Value</p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        RM 5,833
                      </h3>
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowDownRight className="w-4 h-4 text-red-600 mr-1" />
                    <span className="text-red-600 font-medium">3% decrease</span>
                    <span className="text-gray-500 ml-1">vs last year</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Package Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <CommissionChart data={commissionBreakdownData} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Sales Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <SalesChart data={monthlySalesData} />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Packages</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Package</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Units Sold</TableHead>
                      <TableHead>Total Sales</TableHead>
                      <TableHead>Commission Earned</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Premium Umrah Package</TableCell>
                      <TableCell>RM 8,500</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>RM 102,000</TableCell>
                      <TableCell className="font-medium text-emerald-600">RM 10,200</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Economy Umrah Package</TableCell>
                      <TableCell>RM 5,800</TableCell>
                      <TableCell>18</TableCell>
                      <TableCell>RM 104,400</TableCell>
                      <TableCell className="font-medium text-emerald-600">RM 8,352</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Luxury Umrah Experience</TableCell>
                      <TableCell>RM 12,000</TableCell>
                      <TableCell>7</TableCell>
                      <TableCell>RM 84,000</TableCell>
                      <TableCell className="font-medium text-emerald-600">RM 10,080</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Hajj Package 2025</TableCell>
                      <TableCell>RM 18,500</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>RM 55,500</TableCell>
                      <TableCell className="font-medium text-emerald-600">RM 8,325</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sales by Customer Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 \
