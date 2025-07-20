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
  Briefcase,
  Star,
  Zap,
  TrendingUp,
  Menu,
  ChevronDown,
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sales Chart Component
function SalesChart({ data }: { data: any }) {
  const maxValue = Math.max(...data.map((item: any) => item.value))
  return (
    <div className="w-full">
      <div className="flex items-end h-32 md:h-40 gap-1 md:gap-2 mt-4 mb-2">
        {data.map((item: any, index: number) => (
          <div key={index} className="relative flex-1 group">
            <div
              className="w-full bg-gradient-to-t from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 transition-all rounded-t shadow-lg"
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-yellow-400 text-xs rounded px-2 py-1 whitespace-nowrap border border-yellow-400/20">
                RM {item.value.toLocaleString()}
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

// Commission Chart Component
function CommissionChart({ data }: { data: any }) {
  const total = data.reduce((sum: number, item: any) => sum + item.value, 0)
  let startPercent = 0
  return (
    <div className="w-full space-y-4">
      <div className="h-6 md:h-8 w-full flex rounded-full overflow-hidden border border-yellow-400/20">
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
      <div className="flex flex-wrap gap-2 md:gap-4">
        {data.map((item: any, index: number) => (
          <div key={index} className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
            <span className="text-xs md:text-sm text-gray-300">
              {item.label}: RM {item.value.toLocaleString()}
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
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-black/40 backdrop-blur-md border-yellow-400/20 hover:border-yellow-400/40">
      <div className="relative">
        <Image
          src={packageData.image || "/placeholder.svg"}
          alt={packageData.title}
          width={400}
          height={200}
          className="w-full h-32 md:h-48 object-cover"
        />
        <Badge className="absolute top-2 md:top-3 right-2 md:right-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold text-xs">
          {packageData.commission}% Commission
        </Badge>
        {packageData.exclusive && (
          <Badge className="absolute top-2 md:top-3 left-2 md:left-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-semibold text-xs">
            Exclusive
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2 p-3 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm md:text-lg line-clamp-2 text-white">{packageData.title}</CardTitle>
            <CardDescription className="text-gray-400 text-xs md:text-sm">
              {packageData.duration} • {packageData.destinations.join(", ")}
            </CardDescription>
          </div>
          <div className="text-right ml-2">
            <div className="text-sm md:text-lg font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              RM {packageData.price.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400">per person</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4 p-3 md:p-6 pt-0">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs md:text-sm mb-1">
              <span className="text-gray-300">Sales Progress</span>
              <span className="font-medium text-yellow-400">
                {packageData.salesCount}/{packageData.salesTarget} sold
              </span>
            </div>
            <Progress value={(packageData.salesCount / packageData.salesTarget) * 100} className="h-2 bg-gray-700" />
          </div>
          <div className="flex items-center justify-between text-xs md:text-sm">
            <span className="text-gray-400">Potential Commission:</span>
            <span className="font-medium text-yellow-400">
              RM {((packageData.price * packageData.commission) / 100).toLocaleString()} per sale
            </span>
          </div>
          <div className="flex space-x-2 pt-2">
            <Button
              className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-semibold text-xs md:text-sm"
              asChild
            >
              <Link href={`/agent/packages/${packageData.id}`}>View Details</Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent shrink-0"
            >
              <Copy className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
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
    <div className="rounded-lg border border-yellow-400/20 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-yellow-400/20 hover:bg-yellow-400/5">
              <TableHead className="text-yellow-400 whitespace-nowrap">Package</TableHead>
              <TableHead className="text-yellow-400 whitespace-nowrap">Customer</TableHead>
              <TableHead className="text-yellow-400 whitespace-nowrap">Sale Date</TableHead>
              <TableHead className="text-yellow-400 whitespace-nowrap">Sale Amount</TableHead>
              <TableHead className="text-yellow-400 whitespace-nowrap">Commission</TableHead>
              <TableHead className="text-yellow-400 whitespace-nowrap">Status</TableHead>
              <TableHead className="text-right text-yellow-400 whitespace-nowrap">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commissions.map((commission) => (
              <TableRow key={commission.id} className="border-yellow-400/10 hover:bg-yellow-400/5">
                <TableCell className="font-medium text-white whitespace-nowrap">{commission.package}</TableCell>
                <TableCell className="text-gray-300 whitespace-nowrap">{commission.customer}</TableCell>
                <TableCell className="text-gray-300 whitespace-nowrap">{commission.date}</TableCell>
                <TableCell className="text-gray-300 whitespace-nowrap">
                  Rs {commission.amount.toLocaleString()}
                </TableCell>
                <TableCell className="font-medium text-yellow-400 whitespace-nowrap">
                  Rs {commission.commissionAmount.toLocaleString()}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge
                    className={
                      commission.status === "paid"
                        ? "bg-green-500/20 text-green-400 border-green-400/20"
                        : commission.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-400/20"
                          : "bg-blue-500/20 text-blue-400 border-blue-400/20"
                    }
                  >
                    {commission.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="hover:bg-yellow-400/10">
                    <FileText className="w-4 h-4 text-yellow-400" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

// Sub-Agent Card Component
function SubAgentCard({ agent }: { agent: any }) {
  return (
    <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
      <CardContent className="p-3 md:p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="border-2 border-yellow-400/20 w-8 h-8 md:w-10 md:h-10">
              <AvatarImage src={agent.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold text-xs">
                {agent.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-white text-sm md:text-base truncate">{agent.name}</div>
              <div className="text-xs md:text-sm text-gray-400 truncate">{agent.email}</div>
            </div>
          </div>
          <Badge
            className={
              agent.active
                ? "bg-green-500/20 text-green-400 border-green-400/20 text-xs"
                : "bg-gray-500/20 text-gray-400 border-gray-400/20 text-xs"
            }
          >
            {agent.active ? "Active" : "Inactive"}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 md:gap-4 mb-3 text-xs md:text-sm">
          <div>
            <div className="text-gray-400">Total Sales</div>
            <div className="font-medium text-yellow-400">Rs {agent.totalSales.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-400">Commission</div>
            <div className="font-medium text-yellow-400">Rs {agent.commission.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-400">Packages Sold</div>
            <div className="font-medium text-white">{agent.packagesSold}</div>
          </div>
          <div>
            <div className="text-gray-400">Last Active</div>
            <div className="font-medium text-white">{agent.lastActive}</div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent text-xs"
          >
            <Mail className="w-3 h-3 md:w-4 md:h-4 mr-1 text-yellow-400" />
            <span className="text-gray-300">Contact</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent text-xs"
          >
            <BarChart3 className="w-3 h-3 md:w-4 md:h-4 mr-1 text-yellow-400" />
            <span className="text-gray-300">Performance</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Mobile Menu Component
function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent"
        >
          <Menu className="w-5 h-5 text-yellow-400" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-black/95 backdrop-blur-md border-yellow-400/20">
        <SheetHeader>
          <SheetTitle className="text-white">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-6">
          <Button
            variant="outline"
            className="justify-start border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent"
          >
            <Bell className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-gray-300">Notifications</span>
          </Button>
          <Button
            variant="outline"
            className="justify-start border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent"
          >
            <Settings className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-gray-300">Settings</span>
          </Button>
          <Button
            variant="outline"
            className="justify-start border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-gray-300">Logout</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Mobile Tab Selector Component
function MobileTabSelector({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const tabs = [
    { value: "dashboard", label: "Dashboard" },
    { value: "packages", label: "Packages" },
    { value: "commissions", label: "Commissions" },
    { value: "sales", label: "Sales" },
    { value: "proofs", label: "Proofs" },
    { value: "subagents", label: "Sub-Agents" },
  ]

  const activeTabLabel = tabs.find((tab) => tab.value === activeTab)?.label || "Dashboard"

  return (
    <div className="md:hidden mb-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-black/40 backdrop-blur-md"
          >
            <span className="text-white">{activeTabLabel}</span>
            <ChevronDown className="w-4 h-4 text-yellow-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full bg-black/95 border-yellow-400/20">
          {tabs.map((tab) => (
            <DropdownMenuItem
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`cursor-pointer ${activeTab === tab.value
                ? "bg-gradient-to-r from-yellow-400/20 to-amber-500/20 text-yellow-400"
                : "text-gray-300 hover:bg-yellow-400/10"
                }`}
            >
              {tab.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
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
      <DialogContent className="max-w-md mx-4 bg-black/95 backdrop-blur-md border-yellow-400/20">
        <DialogHeader>
          <DialogTitle className="text-white">Upload Proof of Sale</DialogTitle>
          <DialogDescription className="text-gray-400">
            Submit documentation for your sales to process your commission.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="package" className="text-gray-300">
              Package
            </Label>
            <Select value={selectedPackage} onValueChange={setSelectedPackage}>
              <SelectTrigger className="bg-black/50 border-yellow-400/20 text-white">
                <SelectValue placeholder="Select package" />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-yellow-400/20">
                <SelectItem value="umr001">Premium Umrah Package</SelectItem>
                <SelectItem value="umr002">Economy Umrah Package</SelectItem>
                <SelectItem value="hajj001">Hajj Package 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer" className="text-gray-300">
              Customer Name
            </Label>
            <Input
              id="customer"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              className="bg-black/50 border-yellow-400/20 text-white placeholder:text-gray-500 focus:border-yellow-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-300">
              Sale Amount (MYR)
            </Label>
            <Input
              id="amount"
              value={saleAmount}
              onChange={(e) => setSaleAmount(e.target.value)}
              placeholder="0.00"
              type="number"
              className="bg-black/50 border-yellow-400/20 text-white placeholder:text-gray-500 focus:border-yellow-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proofType" className="text-gray-300">
              Proof Type
            </Label>
            <Select value={proofType} onValueChange={setProofType}>
              <SelectTrigger className="bg-black/50 border-yellow-400/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-yellow-400/20">
                <SelectItem value="receipt">Payment Receipt</SelectItem>
                <SelectItem value="booking">Booking Confirmation</SelectItem>
                <SelectItem value="transfer">Bank Transfer</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="proof" className="text-gray-300">
              Upload Proof Document
            </Label>
            <div className="border-2 border-dashed border-yellow-400/20 rounded-lg p-4 md:p-6 text-center cursor-pointer hover:border-yellow-400/40 hover:bg-yellow-400/5 transition-colors">
              <Upload className="w-6 h-6 md:w-8 md:h-8 mx-auto text-yellow-400" />
              <p className="mt-2 text-sm text-gray-300">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PDF, JPG or PNG (max. 5MB)</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-gray-300">
              Additional Notes
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional information about this sale"
              rows={3}
              className="bg-black/50 border-yellow-400/20 text-white placeholder:text-gray-500 focus:border-yellow-400"
            />
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent w-full sm:w-auto"
          >
            <span className="text-gray-300">Cancel</span>
          </Button>
          <Button className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-semibold w-full sm:w-auto">
            Submit
          </Button>
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
      <DialogContent className="max-w-md mx-4 bg-black/95 backdrop-blur-md border-yellow-400/20">
        <DialogHeader>
          <DialogTitle className="text-white">Request Commission Payout</DialogTitle>
          <DialogDescription className="text-gray-400">
            Available for payout: RM {availableAmount.toLocaleString()}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-300">
              Payout Amount (MYR)
            </Label>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              type="number"
              className="bg-black/50 border-yellow-400/20 text-white placeholder:text-gray-500 focus:border-yellow-400"
            />
            <p className="text-xs text-gray-500">Minimum payout amount: RM 100</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentMethod" className="text-gray-300">
              Payment Method
            </Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="bg-black/50 border-yellow-400/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-yellow-400/20">
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="ewallet">E-Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {paymentMethod === "bank" && (
            <div className="space-y-3 border border-yellow-400/20 rounded-lg p-3 bg-black/20">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-white">Bank Details</h4>
                <Button variant="ghost" size="sm" className="hover:bg-yellow-400/10">
                  <span className="text-yellow-400">Edit</span>
                </Button>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Account Name:</span>
                  <span className="text-white">{bankDetails.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Account Number:</span>
                  <span className="text-white">{bankDetails.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Bank:</span>
                  <span className="text-white">{bankDetails.bankName}</span>
                </div>
              </div>
            </div>
          )}
          <Alert className="border-yellow-400/20 bg-yellow-400/5">
            <AlertCircle className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-gray-300">
              Payouts are typically processed within 3-5 business days.
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent w-full sm:w-auto"
          >
            <span className="text-gray-300">Cancel</span>
          </Button>
          <Button className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-semibold w-full sm:w-auto">
            Request Payout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Add Sub-Agent Dialog
function AddSubAgentDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 bg-black/95 backdrop-blur-md border-yellow-400/20">
        <DialogHeader>
          <DialogTitle className="text-white">Add Sub-Agent</DialogTitle>
          <DialogDescription className="text-gray-400">Invite a new sub-agent to join your team.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Enter full name"
              className="bg-black/50 border-yellow-400/20 text-white placeholder:text-gray-500 focus:border-yellow-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              className="bg-black/50 border-yellow-400/20 text-white placeholder:text-gray-500 focus:border-yellow-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-300">
              Phone Number
            </Label>
            <Input
              id="phone"
              placeholder="Enter phone number"
              className="bg-black/50 border-yellow-400/20 text-white placeholder:text-gray-500 focus:border-yellow-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="commission" className="text-gray-300">
              Commission Split (%)
            </Label>
            <Input
              id="commission"
              type="number"
              placeholder="e.g. 30"
              className="bg-black/50 border-yellow-400/20 text-white placeholder:text-gray-500 focus:border-yellow-400"
            />
            <p className="text-xs text-gray-500">
              This is the percentage of your commission that will be shared with this sub-agent.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="sendInvite" />
            <Label htmlFor="sendInvite" className="text-gray-300">
              Send invitation email
            </Label>
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent w-full sm:w-auto"
          >
            <span className="text-gray-300">Cancel</span>
          </Button>
          <Button className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-semibold w-full sm:w-auto">
            Add Sub-Agent
          </Button>
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
      <DialogContent className="max-w-md mx-4 bg-black/95 backdrop-blur-md border-yellow-400/20">
        <DialogHeader>
          <DialogTitle className="text-white">Download Leads</DialogTitle>
          <DialogDescription className="text-gray-400">Export your leads data for offline analysis.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="leadType" className="text-gray-300">
              Lead Type
            </Label>
            <Select value={leadType} onValueChange={setLeadType}>
              <SelectTrigger className="bg-black/50 border-yellow-400/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-yellow-400/20">
                <SelectItem value="all">All Leads</SelectItem>
                <SelectItem value="new">New Leads</SelectItem>
                <SelectItem value="contacted">Contacted Leads</SelectItem>
                <SelectItem value="qualified">Qualified Leads</SelectItem>
                <SelectItem value="converted">Converted Leads</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateRange" className="text-gray-300">
              Date Range
            </Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="bg-black/50 border-yellow-400/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-yellow-400/20">
                <SelectItem value="last7">Last 7 Days</SelectItem>
                <SelectItem value="last30">Last 30 Days</SelectItem>
                <SelectItem value="last90">Last 90 Days</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
                <SelectItem value="allTime">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="format" className="text-gray-300">
              Export Format
            </Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger className="bg-black/50 border-yellow-400/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-yellow-400/20">
                <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="includeDetails" />
            <Label htmlFor="includeDetails" className="text-gray-300">
              Include contact details
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="includeNotes" />
            <Label htmlFor="includeNotes" className="text-gray-300">
              Include notes and interactions
            </Label>
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent w-full sm:w-auto"
          >
            <span className="text-gray-300">Cancel</span>
          </Button>
          <Button className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-semibold w-full sm:w-auto">
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
    { label: "Umrah Packages", value: 8500, color: "bg-gradient-to-r from-yellow-400 to-amber-500" },
    { label: "Hajj Packages", value: 12000, color: "bg-gradient-to-r from-blue-400 to-blue-600" },
    { label: "Muslim Tours", value: 3500, color: "bg-gradient-to-r from-amber-400 to-orange-500" },
    { label: "Hotel Bookings", value: 1200, color: "bg-gradient-to-r from-purple-400 to-purple-600" },
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 md:w-64 md:h-64 bg-yellow-300/5 rounded-full blur-2xl animate-bounce"></div>

        {/* Floating Business Icons */}
        <div className="absolute top-20 right-20 animate-float hidden md:block">
          <Briefcase className="w-8 h-8 text-yellow-400/20" />
        </div>
        <div className="absolute top-40 left-20 animate-float delay-1000 hidden md:block">
          <TrendingUp className="w-6 h-6 text-amber-400/20" />
        </div>
        <div className="absolute bottom-40 right-40 animate-float delay-2000 hidden md:block">
          <Star className="w-7 h-7 text-yellow-300/20" />
        </div>
        <div className="absolute bottom-20 left-40 animate-float delay-3000 hidden md:block">
          <Zap className="w-5 h-5 text-amber-300/20" />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/40 backdrop-blur-md border-b border-yellow-400/20">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
              <div className="relative">
                <Avatar className="w-12 h-12 md:w-16 md:h-16 border-2 border-yellow-400/40">
                  <AvatarImage src={agentData.avatar || "/placeholder.svg"} alt={agentData.name} />
                  <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold text-sm md:text-lg">
                    {agentData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1">
                  <Briefcase className="w-4 h-4 md:w-6 md:h-6 text-yellow-400 animate-pulse" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent truncate">
                    {agentData.name}
                  </h1>
                  <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold text-xs">
                    {agentData.tier} Agent
                  </Badge>
                </div>
                <p className="text-gray-400 text-xs md:text-sm truncate">
                  Agent since {agentData.agentSince} • ID: AG{agentData.agentSince}1234
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
                className="border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-gray-300">Logout</span>
              </Button>
            </div>

            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-4 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
          {/* Mobile Tab Selector */}
          <MobileTabSelector activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Desktop Tab List */}
          <TabsList className="hidden md:grid w-full grid-cols-6 bg-black/40 backdrop-blur-md border border-yellow-400/20">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="packages"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black"
            >
              Packages
            </TabsTrigger>
            <TabsTrigger
              value="commissions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black"
            >
              Commissions
            </TabsTrigger>
            <TabsTrigger
              value="sales"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black"
            >
              Sales
            </TabsTrigger>
            <TabsTrigger
              value="proofs"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black"
            >
              Proofs
            </TabsTrigger>
            <TabsTrigger
              value="subagents"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black"
            >
              Sub-Agents
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-4 md:space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm font-medium text-gray-400">Available Commission</p>
                      <h3 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                        RM {agentData.availableCommission.toLocaleString()}
                      </h3>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                    </div>
                  </div>
                  <Button
                    className="w-full mt-3 md:mt-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-semibold text-xs md:text-sm"
                    onClick={() => setShowPayoutDialog(true)}
                  >
                    Request Payout
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm font-medium text-gray-400">Pending Commission</p>
                      <h3 className="text-lg md:text-2xl font-bold text-blue-400">
                        RM {agentData.pendingCommission.toLocaleString()}
                      </h3>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-400/20 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 md:mt-4 text-xs md:text-sm">
                    <span className="text-gray-400">Processing</span>
                    <span className="font-medium text-white">3-5 business days</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm font-medium text-gray-400">Lifetime Sales</p>
                      <h3 className="text-lg md:text-2xl font-bold text-white">
                        RM {agentData.lifetimeSales.toLocaleString()}
                      </h3>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-400/20 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                    </div>
                  </div>
                  <div className="mt-3 md:mt-4">
                    <div className="flex justify-between text-xs md:text-sm mb-1">
                      <span className="text-gray-400">Sales Target</span>
                      <span className="font-medium text-yellow-400">{agentData.salesProgress}%</span>
                    </div>
                    <Progress value={agentData.salesProgress} className="h-2 bg-gray-700" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm font-medium text-gray-400">Total Leads</p>
                      <h3 className="text-lg md:text-2xl font-bold text-white">{leadsData.total}</h3>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-400/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-3 md:mt-4 border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent text-xs md:text-sm"
                    onClick={() => setShowDownloadLeadsDialog(true)}
                  >
                    <Download className="w-3 h-3 md:w-4 md:h-4 mr-2 text-yellow-400" />
                    <span className="text-gray-300">Download Leads</span>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-white text-lg md:text-xl">Monthly Sales Performance</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <SalesChart data={monthlySalesData} />
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-white text-lg md:text-xl">Commission Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <CommissionChart data={commissionBreakdownData} />
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-white text-lg md:text-xl">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5 border border-green-400/20 shrink-0">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white text-sm md:text-base">Commission Paid</p>
                      <p className="text-xs md:text-sm text-gray-400">
                        RM 1,700 commission for Premium Umrah Package has been paid to your account.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Today, 10:23 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5 border border-blue-400/20 shrink-0">
                      <Package className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white text-sm md:text-base">New Package Assigned</p>
                      <p className="text-xs md:text-sm text-gray-400">
                        You have been assigned to sell "Luxury Umrah Experience with VIP Services".
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Yesterday, 3:45 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-amber-500/20 rounded-full flex items-center justify-center mt-0.5 border border-amber-400/20 shrink-0">
                      <User className="w-3 h-3 md:w-4 md:h-4 text-amber-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white text-sm md:text-base">New Lead Assigned</p>
                      <p className="text-xs md:text-sm text-gray-400">
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
          <TabsContent value="packages" className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Assigned Packages
              </h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    className="pl-9 w-full sm:w-[250px] bg-black/50 border-yellow-400/20 text-white placeholder:text-gray-500 focus:border-yellow-400"
                    placeholder="Search packages..."
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px] bg-black/50 border-yellow-400/20 text-white">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 border-yellow-400/20">
                    <SelectItem value="all">All Packages</SelectItem>
                    <SelectItem value="umrah">Umrah Packages</SelectItem>
                    <SelectItem value="hajj">Hajj Packages</SelectItem>
                    <SelectItem value="tour">Muslim Tours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {assignedPackages.map((pkg) => (
                <PackageCard key={pkg.id} packageData={pkg} />
              ))}
            </div>

            <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-white text-lg md:text-xl">Package Sales Performance</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="rounded-lg border border-yellow-400/20 overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-yellow-400/20 hover:bg-yellow-400/5">
                          <TableHead className="text-yellow-400 whitespace-nowrap">Package</TableHead>
                          <TableHead className="text-yellow-400 whitespace-nowrap">Sales Target</TableHead>
                          <TableHead className="text-yellow-400 whitespace-nowrap">Current Sales</TableHead>
                          <TableHead className="text-yellow-400 whitespace-nowrap">Progress</TableHead>
                          <TableHead className="text-yellow-400 whitespace-nowrap">Commission Rate</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {assignedPackages.map((pkg) => (
                          <TableRow key={pkg.id} className="border-yellow-400/10 hover:bg-yellow-400/5">
                            <TableCell className="font-medium text-white whitespace-nowrap">{pkg.title}</TableCell>
                            <TableCell className="text-gray-300 whitespace-nowrap">{pkg.salesTarget}</TableCell>
                            <TableCell className="text-gray-300 whitespace-nowrap">{pkg.salesCount}</TableCell>
                            <TableCell className="whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <Progress
                                  value={(pkg.salesCount / pkg.salesTarget) * 100}
                                  className="h-2 w-16 md:w-24 bg-gray-700"
                                />
                                <span className="text-xs md:text-sm text-yellow-400">
                                  {Math.round((pkg.salesCount / pkg.salesTarget) * 100)}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              <Badge className="bg-gradient-to-r from-yellow-400/20 to-amber-500/20 text-yellow-400 border-yellow-400/20">
                                {pkg.commission}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commissions Tab */}
          <TabsContent value="commissions" className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Commissions Tracker
                </h2>
                <p className="text-gray-400 text-sm md:text-base">Track and manage your commission earnings</p>
              </div>
              <Button
                className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-semibold text-sm md:text-base"
                onClick={() => setShowPayoutDialog(true)}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Request Payout
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm font-medium text-gray-400">Available for Payout</p>
                      <h3 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                        Rs {agentData.availableCommission.toLocaleString()}
                      </h3>
                    </div>
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm font-medium text-gray-400">Pending Approval</p>
                      <h3 className="text-lg md:text-2xl font-bold text-amber-400">
                        Rs {agentData.pendingCommission.toLocaleString()}
                      </h3>
                    </div>
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm font-medium text-gray-400">Total Paid (2025)</p>
                      <h3 className="text-lg md:text-2xl font-bold text-blue-400">Rs 28,500</h3>
                    </div>
                    <ArrowDownRight className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 space-y-2 sm:space-y-0">
                <CardTitle className="text-white text-lg md:text-xl">Commission History</CardTitle>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px] bg-black/50 border-yellow-400/20 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 border-yellow-400/20">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <CommissionTable commissions={commissions} />
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between border-t border-yellow-400/20 pt-4 p-4 md:p-6 space-y-2 sm:space-y-0">
                <div className="text-xs md:text-sm text-gray-400">Showing 5 of 24 transactions</div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="border-yellow-400/20 text-gray-500 bg-transparent"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/10 bg-transparent"
                  >
                    <span className="text-gray-300">Next</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-white text-lg md:text-xl">Commission Rates</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="rounded-lg border border-yellow-400/20 overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-yellow-400/20 hover:bg-yellow-400/5">
                          <TableHead className="text-yellow-400 whitespace-nowrap">Package Type</TableHead>
                          <TableHead className="text-yellow-400 whitespace-nowrap">Base Rate</TableHead>
                          <TableHead className="text-yellow-400 whitespace-nowrap">Your Rate</TableHead>
                          <TableHead className="text-yellow-400 whitespace-nowrap">Bonus Eligibility</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="border-yellow-400/10 hover:bg-yellow-400/5">
                          <TableCell className="font-medium text-white whitespace-nowrap">Umrah Packages</TableCell>
                          <TableCell className="text-gray-300 whitespace-nowrap">8%</TableCell>
                          <TableCell className="font-medium text-yellow-400 whitespace-nowrap">10%</TableCell>
                          <TableCell className="whitespace-nowrap">
                            <Badge className="bg-green-500/20 text-green-400 border-green-400/20">Eligible</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-yellow-400/10 hover:bg-yellow-400/5">
                          <TableCell className="font-medium text-white whitespace-nowrap">Hajj Packages</TableCell>
                          <TableCell className="text-gray-300 whitespace-nowrap">12%</TableCell>
                          <TableCell className="font-medium text-yellow-400 whitespace-nowrap">15%</TableCell>
                          <TableCell className="whitespace-nowrap">
                            <Badge className="bg-green-500/20 text-green-400 border-green-400/20">Eligible</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-yellow-400/10 hover:bg-yellow-400/5">
                          <TableCell className="font-medium text-white whitespace-nowrap">Muslim Tours</TableCell>
                          <TableCell className="text-gray-300 whitespace-nowrap">7%</TableCell>
                          <TableCell className="font-medium text-yellow-400 whitespace-nowrap">7%</TableCell>
                          <TableCell className="whitespace-nowrap">
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/20">
                              Needs 5 more sales
                            </Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-yellow-400/10 hover:bg-yellow-400/5">
                          <TableCell className="font-medium text-white whitespace-nowrap">Hotel Bookings</TableCell>
                          <TableCell className="text-gray-300 whitespace-nowrap">5%</TableCell>
                          <TableCell className="font-medium text-yellow-400 whitespace-nowrap">5%</TableCell>
                          <TableCell className="whitespace-nowrap">
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/20">
                              Needs 10 more sales
                            </Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-400/20">
                  <div className="flex items-start space-x-2 text-blue-400">
                    <Percent className="w-4 h-4 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Gold Tier Bonus</p>
                      <p className="text-gray-300">
                        You receive a 2% bonus on all Umrah and Hajj packages as a Gold tier agent.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Breakdown Tab */}
          <TabsContent value="sales" className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Sales Breakdown
                </h2>
                <p className="text-gray-400 text-sm md:text-base">Analyze your sales performance</p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <Select defaultValue="thisYear">
                  <SelectTrigger className="w-full sm:w-[180px] bg-black/50 border-yellow-400/20 text-white">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 border-yellow-400/20">
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="thisQuarter">This Quarter</SelectItem>
                    <SelectItem value="thisYear">This Year</SelectItem>
                    <SelectItem value="allTime">All Time</SelectItem>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm font-medium text-gray-400">Total Sales</p>
                      <h3 className="text-lg md:text-2xl font-bold text-white">RM 245,000</h3>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-400/20 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex items-center mt-3 md:mt-4 text-xs md:text-sm">
                    <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-green-400 mr-1" />
                    <span className="text-green-400 font-medium">12% increase</span>
                    <span className="text-gray-400 ml-1">vs last year</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm font-medium text-gray-400">Packages Sold</p>
                      <h3 className="text-lg md:text-2xl font-bold text-white">42</h3>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-400/20 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex items-center mt-3 md:mt-4 text-xs md:text-sm">
                    <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-green-400 mr-1" />
                    <span className="text-green-400 font-medium">8% increase</span>
                    <span className="text-gray-400 ml-1">vs last year</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm font-medium text-gray-400">Conversion Rate</p>
                      <h3 className="text-lg md:text-2xl font-bold text-white">18.5%</h3>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-400/20 rounded-full flex items-center justify-center">
                      <Percent className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex items-center mt-3 md:mt-4 text-xs md:text-sm">
                    <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-green-400 mr-1" />
                    <span className="text-green-400 font-medium">2.3% increase</span>
                    <span className="text-gray-400 ml-1">vs last year</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm font-medium text-gray-400">Avg. Sale Value</p>
                      <h3 className="text-lg md:text-2xl font-bold text-white">RM 5,833</h3>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-400/20 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex items-center mt-3 md:mt-4 text-xs md:text-sm">
                    <ArrowDownRight className="w-3 h-3 md:w-4 md:h-4 text-red-400 mr-1" />
                    <span className="text-red-400 font-medium">3% decrease</span>
                    <span className="text-gray-400 ml-1">vs last year</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-white text-lg md:text-xl">Sales by Package Type</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <CommissionChart data={commissionBreakdownData} />
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-white text-lg md:text-xl">Monthly Sales Trend</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <SalesChart data={monthlySalesData} />
                </CardContent>
              </Card>
            </div>

            <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-white text-lg md:text-xl">Top Selling Packages</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="rounded-lg border border-yellow-400/20 overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-yellow-400/20 hover:bg-yellow-400/5">
                          <TableHead className="text-yellow-400 whitespace-nowrap">Package</TableHead>
                          <TableHead className="text-yellow-400 whitespace-nowrap">Price</TableHead>
                          <TableHead className="text-yellow-400 whitespace-nowrap">Units Sold</TableHead>
                          <TableHead className="text-yellow-400 whitespace-nowrap">Total Sales</TableHead>
                          <TableHead className="text-yellow-400 whitespace-nowrap">Commission Earned</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="border-yellow-400/10 hover:bg-yellow-400/5">
                          <TableCell className="font-medium text-white whitespace-nowrap">
                            Premium Umrah Package
                          </TableCell>
                          <TableCell className="text-gray-300 whitespace-nowrap">RM 8,500</TableCell>
                          <TableCell className="text-gray-300 whitespace-nowrap">12</TableCell>
                          <TableCell className="text-gray-300 whitespace-nowrap">RM 102,000</TableCell>
                          <TableCell className="font-medium text-yellow-400 whitespace-nowrap">RM 10,200</TableCell>
                        </TableRow>
                        <TableRow className="border-yellow-400/10 hover:bg-yellow-400/5">
                          <TableCell className="font-medium text-white whitespace-nowrap">
                            Economy Umrah Package
                          </TableCell>
                          <TableCell className="text-gray-300 whitespace-nowrap">RM 5,800</TableCell>
                          <TableCell className="text-gray-300 whitespace-nowrap">18</TableCell>
                          <TableCell className="text-gray-300 whitespace-nowrap">RM 104,400</TableCell>
                          <TableCell className="font-medium text-yellow-400 whitespace-nowrap">RM 8,352</TableCell>
                        </TableRow>
                        <TableRow className="border-yellow-400/10 hover:bg-yellow-400/5">
                          <TableCell className="font-medium text-white whitespace-nowrap">
                            Luxury Umrah Experience
                          </TableCell>
                          <TableCell className="text-gray-300 whitespace-nowrap">RM 12,000</TableCell>
                          <TableCell className="text-gray-300 whitespace-nowrap">7</TableCell>
                          <TableCell className="text-gray-300 whitespace-nowrap">RM 84,000</TableCell>
                          <TableCell className="font-medium text-yellow-400 whitespace-nowrap">RM 10,080</TableCell>
                        </TableRow>
                        <TableRow className="border-yellow-400/10 hover:bg-yellow-400/5">
                          <TableCell className="font-medium text-white whitespace-nowrap">Hajj Package 2025</TableCell>
                          <TableCell className="text-gray-300 whitespace-nowrap">RM 18,500</TableCell>
                          <TableCell className="text-gray-300 whitespace-nowrap">3</TableCell>
                          <TableCell className="text-gray-300 whitespace-nowrap">RM 55,500</TableCell>
                          <TableCell className="font-medium text-yellow-400 whitespace-nowrap">RM 8,325</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Proofs Tab */}
          <TabsContent value="proofs" className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Sales Proof Management
                </h2>
                <p className="text-gray-400 text-sm md:text-base">Upload and manage your sales documentation</p>
              </div>
              <Button
                className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-semibold text-sm md:text-base"
                onClick={() => setShowSalesProofDialog(true)}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload New Proof
              </Button>
            </div>

            <Card className="bg-black/40 backdrop-blur-md border-yellow-400/20">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-white text-lg md:text-xl">Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="space-y-4">
                  {[
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
                  ].map((proof) => (
                    <div
                      key={proof.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border border-yellow-400/20 rounded-lg bg-black/20 space-y-2 sm:space-y-0"
                    >
                      <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-white text-sm md:text-base truncate">{proof.package}</p>
                          <p className="text-xs md:text-sm text-gray-400">
                            Customer: {proof.customer} • RM {proof.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {proof.date} • {proof.document}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={
                          proof.status === "approved"
                            ? "bg-green-500/20 text-green-400 border-green-400/20"
                            : proof.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400 border-yellow-400/20"
                              : "bg-red-500/20 text-red-400 border-red-400/20"
                        }
                      >
                        {proof.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sub-Agents Tab */}
          <TabsContent value="subagents" className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Sub-Agent Management
                </h2>
                <p className="text-gray-400 text-sm md:text-base">Manage your team of sub-agents</p>
              </div>
              <Button
                className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-semibold text-sm md:text-base"
                onClick={() => setShowAddSubAgentDialog(true)}
              >
                <User className="w-4 h-4 mr-2" />
                Add Sub-Agent
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {subAgents.map((agent) => (
                <SubAgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <SalesProofDialog isOpen={showSalesProofDialog} onClose={() => setShowSalesProofDialog(false)} />
      <PayoutRequestDialog
        isOpen={showPayoutDialog}
        onClose={() => setShowPayoutDialog(false)}
        availableAmount={agentData.availableCommission}
      />
      <AddSubAgentDialog isOpen={showAddSubAgentDialog} onClose={() => setShowAddSubAgentDialog(false)} />
      <DownloadLeadsDialog isOpen={showDownloadLeadsDialog} onClose={() => setShowDownloadLeadsDialog(false)} />
    </div>
  )
}
