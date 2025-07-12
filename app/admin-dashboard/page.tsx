"use client"

import { useState } from "react"
import {
  Users,
  Package,
  DollarSign,
  Crown,
  Shield,
  Star,
  Zap,
  Settings,
  Bell,
  LogOut,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Mail,
  ArrowUpRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample data
const dashboardStats = {
  totalUsers: 2847,
  totalAgents: 156,
  totalBookings: 1234,
  totalRevenue: 2450000,
  monthlyGrowth: 12.5,
  activePackages: 24,
  pendingApprovals: 8,
}

const recentUsers = [
  {
    id: 1,
    name: "Ahmad Rahman",
    email: "ahmad.rahman@email.com",
    role: "Customer",
    joinDate: "2025-01-15",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@email.com",
    role: "Agent",
    joinDate: "2025-01-14",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Muhammad Ali",
    email: "muhammad.ali@email.com",
    role: "Customer",
    joinDate: "2025-01-13",
    status: "Pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const recentBookings = [
  {
    id: 1,
    customer: "Fatimah Zahra",
    package: "Premium Umrah Package",
    amount: 17000,
    date: "2025-01-15",
    status: "Confirmed",
    agent: "Ahmad Ibrahim",
  },
  {
    id: 2,
    customer: "Mohd Rizal",
    package: "Economy Umrah Package",
    amount: 5800,
    date: "2025-01-14",
    status: "Pending",
    agent: "Siti Aminah",
  },
  {
    id: 3,
    customer: "Nurul Huda",
    package: "Hajj Package 2025",
    amount: 18500,
    date: "2025-01-13",
    status: "Processing",
    agent: "Mohd Faizal",
  },
]

const topAgents = [
  {
    id: 1,
    name: "Ahmad Ibrahim",
    email: "ahmad.ibrahim@email.com",
    sales: 245000,
    bookings: 42,
    commission: 24500,
    tier: "Gold",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Siti Aminah",
    email: "siti.aminah@email.com",
    sales: 189000,
    bookings: 35,
    commission: 18900,
    tier: "Silver",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Mohd Faizal",
    email: "mohd.faizal@email.com",
    sales: 156000,
    bookings: 28,
    commission: 15600,
    tier: "Silver",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Chart Component
function AdminChart({ data, type = "bar" }: { data: any[]; type?: "bar" | "line" }) {
  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <div className="w-full">
      <div className="flex items-end h-40 gap-2 mt-4 mb-2">
        {data.map((item, index) => (
          <div key={index} className="relative flex-1 group">
            <div
              className="w-full bg-gradient-to-t from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 transition-all rounded-t shadow-lg"
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-yellow-400 text-xs rounded px-2 py-1 whitespace-nowrap border border-yellow-500/30">
                {item.value.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        {data.map((item, index) => (
          <div key={index} className="text-center">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showAddUserDialog, setShowAddUserDialog] = useState(false)

  const monthlyData = [
    { label: "Jan", value: 180000 },
    { label: "Feb", value: 220000 },
    { label: "Mar", value: 195000 },
    { label: "Apr", value: 285000 },
    { label: "May", value: 310000 },
    { label: "Jun", value: 275000 },
  ]

  const userGrowthData = [
    { label: "Jan", value: 2100 },
    { label: "Feb", value: 2350 },
    { label: "Mar", value: 2480 },
    { label: "Apr", value: 2650 },
    { label: "May", value: 2750 },
    { label: "Jun", value: 2847 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-yellow-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Lightning effects */}
        <div className="absolute top-10 left-10 w-1 h-20 bg-gradient-to-b from-yellow-400 to-transparent animate-lightning opacity-30"></div>
        <div className="absolute top-32 right-16 w-1 h-16 bg-gradient-to-b from-amber-400 to-transparent animate-lightning-delayed opacity-40"></div>
        <div className="absolute bottom-20 left-1/4 w-1 h-24 bg-gradient-to-b from-yellow-300 to-transparent animate-lightning opacity-35"></div>
      </div>

      {/* Header */}
      <div className="bg-black/95 backdrop-blur-md border-b border-yellow-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl relative">
                <Crown className="w-8 h-8 text-black" />
                <Star className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-spin-slow" />
                <Zap className="absolute -bottom-1 -left-1 w-5 h-5 text-amber-400 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold">
                    Super Admin
                  </Badge>
                </div>
                <p className="text-gray-300">Ultimate control and management access</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent transition-all duration-300"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent transition-all duration-300"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent transition-all duration-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800/60 rounded-xl p-1 border-2 border-yellow-500/30">
            <TabsTrigger
              value="dashboard"
              className="rounded-lg transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black data-[state=active]:shadow-2xl data-[state=active]:shadow-yellow-500/60 text-gray-300 hover:text-white transform data-[state=active]:scale-110"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="rounded-lg transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black data-[state=active]:shadow-2xl data-[state=active]:shadow-yellow-500/60 text-gray-300 hover:text-white transform data-[state=active]:scale-110"
            >
              Users
            </TabsTrigger>
            <TabsTrigger
              value="agents"
              className="rounded-lg transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black data-[state=active]:shadow-2xl data-[state=active]:shadow-yellow-500/60 text-gray-300 hover:text-white transform data-[state=active]:scale-110"
            >
              Agents
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="rounded-lg transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black data-[state=active]:shadow-2xl data-[state=active]:shadow-yellow-500/60 text-gray-300 hover:text-white transform data-[state=active]:scale-110"
            >
              Bookings
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-lg transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black data-[state=active]:shadow-2xl data-[state=active]:shadow-yellow-500/60 text-gray-300 hover:text-white transform data-[state=active]:scale-110"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-black/80 backdrop-blur-xl border-2 border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-300">Total Users</p>
                      <h3 className="text-3xl font-bold text-white">{dashboardStats.totalUsers.toLocaleString()}</h3>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 font-medium">+{dashboardStats.monthlyGrowth}%</span>
                    <span className="text-gray-400 ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/80 backdrop-blur-xl border-2 border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-300">Active Agents</p>
                      <h3 className="text-3xl font-bold text-white">{dashboardStats.totalAgents}</h3>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 font-medium">+8.2%</span>
                    <span className="text-gray-400 ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/80 backdrop-blur-xl border-2 border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-300">Total Bookings</p>
                      <h3 className="text-3xl font-bold text-white">{dashboardStats.totalBookings.toLocaleString()}</h3>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 font-medium">+15.3%</span>
                    <span className="text-gray-400 ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/80 backdrop-blur-xl border-2 border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-300">Total Revenue</p>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                        RM {(dashboardStats.totalRevenue / 1000000).toFixed(1)}M
                      </h3>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50">
                      <DollarSign className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 font-medium">+22.1%</span>
                    <span className="text-gray-400 ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/80 backdrop-blur-xl border-2 border-yellow-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-amber-500/5"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-white bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                    Monthly Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <AdminChart data={monthlyData} />
                </CardContent>
              </Card>

              <Card className="bg-black/80 backdrop-blur-xl border-2 border-yellow-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-amber-500/5"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-white bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                    User Growth
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <AdminChart data={userGrowthData} />
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/80 backdrop-blur-xl border-2 border-yellow-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-amber-500/5"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-white bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                    Recent Users
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-yellow-500/20"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-yellow-500 text-black">{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-white">{user.name}</div>
                            <div className="text-sm text-gray-400">{user.email}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              user.status === "Active"
                                ? "bg-green-500/20 text-green-400 border-green-500/50"
                                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                            }
                          >
                            {user.status}
                          </Badge>
                          <div className="text-xs text-gray-500 mt-1">{user.joinDate}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/80 backdrop-blur-xl border-2 border-yellow-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-amber-500/5"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-white bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                    Top Performing Agents
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    {topAgents.map((agent, index) => (
                      <div
                        key={agent.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-yellow-500/20"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={agent.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-yellow-500 text-black">
                                {agent.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-xs font-bold text-black">
                              {index + 1}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-white">{agent.name}</div>
                            <div className="text-sm text-gray-400">RM {agent.sales.toLocaleString()} sales</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              agent.tier === "Gold"
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                                : "bg-gray-500/20 text-gray-400 border-gray-500/50"
                            }
                          >
                            {agent.tier}
                          </Badge>
                          <div className="text-xs text-gray-500 mt-1">{agent.bookings} bookings</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  User Management
                </h2>
                <p className="text-gray-400">Manage all users and their permissions</p>
              </div>
              <Button
                className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold shadow-lg hover:shadow-yellow-500/50 transition-all duration-300"
                onClick={() => setShowAddUserDialog(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>

            <Card className="bg-black/80 backdrop-blur-xl border-2 border-yellow-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-amber-500/5"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">All Users</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        className="pl-9 w-[250px] bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
                        placeholder="Search users..."
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px] bg-gray-800/50 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="customers">Customers</SelectItem>
                        <SelectItem value="agents">Agents</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <Table>
                  <TableHeader>
                    <TableRow className="border-yellow-500/20">
                      <TableHead className="text-gray-300">User</TableHead>
                      <TableHead className="text-gray-300">Role</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Join Date</TableHead>
                      <TableHead className="text-gray-300">Last Active</TableHead>
                      <TableHead className="text-right text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id} className="border-yellow-500/20 hover:bg-yellow-500/5">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-yellow-500 text-black">
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-white">{user.name}</div>
                              <div className="text-sm text-gray-400">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              user.status === "Active"
                                ? "bg-green-500/20 text-green-400 border-green-500/50"
                                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">{user.joinDate}</TableCell>
                        <TableCell className="text-gray-300">2 hours ago</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Agent Management
                </h2>
                <p className="text-gray-400">Monitor and manage all travel agents</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Agent
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topAgents.map((agent) => (
                <Card
                  key={agent.id}
                  className="bg-black/80 backdrop-blur-xl border-2 border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={agent.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-yellow-500 text-black text-lg">
                          {agent.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <Badge
                        className={
                          agent.tier === "Gold"
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                            : "bg-gray-500/20 text-gray-400 border-gray-500/50"
                        }
                      >
                        {agent.tier} Tier
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-white">{agent.name}</h3>
                      <p className="text-sm text-gray-400">{agent.email}</p>
                      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                        <div>
                          <div className="text-gray-400">Total Sales</div>
                          <div className="font-medium text-yellow-400">RM {agent.sales.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Bookings</div>
                          <div className="font-medium text-white">{agent.bookings}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Commission</div>
                          <div className="font-medium text-green-400">RM {agent.commission.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Status</div>
                          <div className="font-medium text-green-400">Active</div>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent"
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent"
                        >
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Booking Management
                </h2>
                <p className="text-gray-400">Monitor all bookings and transactions</p>
              </div>
              <div className="flex items-center space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px] bg-gray-800/50 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Bookings</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <Card className="bg-black/80 backdrop-blur-xl border-2 border-yellow-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-amber-500/5"></div>
              <CardContent className="relative z-10">
                <Table>
                  <TableHeader>
                    <TableRow className="border-yellow-500/20">
                      <TableHead className="text-gray-300">Booking ID</TableHead>
                      <TableHead className="text-gray-300">Customer</TableHead>
                      <TableHead className="text-gray-300">Package</TableHead>
                      <TableHead className="text-gray-300">Agent</TableHead>
                      <TableHead className="text-gray-300">Amount</TableHead>
                      <TableHead className="text-gray-300">Date</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-right text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking.id} className="border-yellow-500/20 hover:bg-yellow-500/5">
                        <TableCell className="font-medium text-white">
                          #{booking.id.toString().padStart(6, "0")}
                        </TableCell>
                        <TableCell className="text-white">{booking.customer}</TableCell>
                        <TableCell className="text-gray-300">{booking.package}</TableCell>
                        <TableCell className="text-gray-300">{booking.agent}</TableCell>
                        <TableCell className="font-medium text-yellow-400">
                          RM {booking.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-gray-300">{booking.date}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              booking.status === "Confirmed"
                                ? "bg-green-500/20 text-green-400 border-green-500/50"
                                : booking.status === "Pending"
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                                  : "bg-blue-500/20 text-blue-400 border-blue-500/50"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-2">
                System Settings
              </h2>
              <p className="text-gray-400">Configure system-wide settings and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/80 backdrop-blur-xl border-2 border-yellow-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-amber-500/5"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-white">General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Maintenance Mode</Label>
                      <p className="text-sm text-gray-400">Enable maintenance mode for system updates</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Email Notifications</Label>
                      <p className="text-sm text-gray-400">Send email notifications for bookings</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Auto Backup</Label>
                      <p className="text-sm text-gray-400">Automatically backup data daily</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/80 backdrop-blur-xl border-2 border-yellow-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-amber-500/5"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-white">Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-400">Require 2FA for admin accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Session Timeout</Label>
                      <p className="text-sm text-gray-400">Auto logout after inactivity</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-[100px] bg-gray-800/50 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="15">15 min</SelectItem>
                        <SelectItem value="30">30 min</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Login Attempts</Label>
                      <p className="text-sm text-gray-400">Max failed login attempts</p>
                    </div>
                    <Select defaultValue="5">
                      <SelectTrigger className="w-[100px] bg-gray-800/50 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent className="bg-black/95 backdrop-blur-xl border-2 border-yellow-500/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Add New User
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Create a new user account with appropriate permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-200">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter full name"
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-gray-200">
                Role
              </Label>
              <Select>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddUserDialog(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold">
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        @keyframes lightning {
          0%, 90%, 100% { opacity: 0; }
          5%, 10% { opacity: 1; }
        }
        
        @keyframes lightning-delayed {
          0%, 85%, 100% { opacity: 0; }
          15%, 20% { opacity: 1; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-lightning {
          animation: lightning 4s ease-in-out infinite;
        }
        
        .animate-lightning-delayed {
          animation: lightning-delayed 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  )
}
