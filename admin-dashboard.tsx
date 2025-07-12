"use client"

import { useState } from "react"
import { Users, Package, DollarSign, TrendingUp, Calendar, Settings, Bell, Search, Filter, Download, Plus, Eye, Edit, Trash2, Crown, Star, Zap, BarChart3, PieChart, Activity, Globe, Shield, Award, Target, Briefcase } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data
const dashboardStats = {
  totalUsers: 12847,
  totalAgents: 342,
  totalBookings: 1856,
  totalRevenue: 2847500,
  monthlyGrowth: 12.5,
  activePackages: 28,
  pendingApprovals: 15,
  systemHealth: 98.5
}

const recentBookings = [
  { id: 1, customer: "Ahmad Rahman", package: "Premium Umrah", amount: 8500, status: "confirmed", date: "2025-01-20" },
  { id: 2, customer: "Siti Nurhaliza", package: "Economy Hajj", amount: 15000, status: "pending", date: "2025-01-19" },
  { id: 3, customer: "Mohd Faizal", package: "Luxury Umrah", amount: 12000, status: "confirmed", date: "2025-01-18" },
  { id: 4, customer: "Nurul Huda", package: "Family Package", amount: 25000, status: "processing", date: "2025-01-17" },
  { id: 5, customer: "Ibrahim Ali", package: "VIP Hajj", amount: 28000, status: "confirmed", date: "2025-01-16" },
]

const topAgents = [
  { id: 1, name: "Ahmad Ibrahim", sales: 125000, commission: 12500, packages: 15, avatar: "/placeholder.svg" },
  { id: 2, name: "Siti Aminah", sales: 98000, commission: 9800, packages: 12, avatar: "/placeholder.svg" },
  { id: 3, name: "Mohd Rizal", sales: 87500, commission: 8750, packages: 11, avatar: "/placeholder.svg" },
  { id: 4, name: "Fatimah Zahra", sales: 76000, commission: 7600, packages: 9, avatar: "/placeholder.svg" },
]

const packagePerformance = [
  { name: "Premium Umrah", bookings: 145, revenue: 1232500, growth: 15.2 },
  { name: "Economy Hajj", bookings: 89, revenue: 1335000, growth: 8.7 },
  { name: "Luxury Experience", bookings: 67, revenue: 804000, growth: 22.1 },
  { name: "Family Package", bookings: 123, revenue: 3075000, growth: 18.9 },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></div>
        <Crown className="absolute top-1/4 left-1/3 w-6 h-6 text-amber-400 animate-pulse" />
        <Star className="absolute bottom-1/4 right-1/4 w-4 h-4 text-yellow-300 animate-spin" />
        <Zap className="absolute top-1/3 right-1/5 w-5 h-5 text-amber-500 animate-bounce" />
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-amber-500/30 shadow-2xl shadow-amber-500/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-white/70">Welcome back, Administrator</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="bg-black/50 border-amber-500/30 text-white hover:bg-amber-600/20">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
                <Badge className="ml-2 bg-amber-600 text-black">3</Badge>
              </Button>
              <Button variant="outline" size="sm" className="bg-black/50 border-amber-500/30 text-white hover:bg-amber-600/20">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-gradient-to-r from-gray-900 to-black border border-amber-500/30">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-yellow-500 data-[state=active]:text-black text-white/70"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-yellow-500 data-[state=active]:text-black text-white/70"
            >
              Users
            </TabsTrigger>
            <TabsTrigger
              value="agents"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-yellow-500 data-[state=active]:text-black text-white/70"
            >
              Agents
            </TabsTrigger>
            <TabsTrigger
              value="packages"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-yellow-500 data-[state=active]:text-black text-white/70"
            >
              Packages
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-yellow-500 data-[state=active]:text-black text-white/70"
            >
              Bookings
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-yellow-500 data-[state=active]:text-black text-white/70"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-amber-500/30 shadow-2xl shadow-amber-500/20 transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">Total Users</p>
                      <h3 className="text-3xl font-bold text-white">{dashboardStats.totalUsers.toLocaleString()}</h3>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 font-medium">+{dashboardStats.monthlyGrowth}%</span>
                    <span className="text-white/60 ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-amber-500/30 shadow-2xl shadow-amber-500/20 transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">Active Agents</p>
                      <h3 className="text-3xl font-bold text-white">{dashboardStats.totalAgents}</h3>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-full flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 font-medium">+8.2%</span>
                    <span className="text-white/60 ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-amber-500/30 shadow-2xl shadow-amber-500/20 transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">Total Bookings</p>
                      <h3 className="text-3xl font-bold text-white">{dashboardStats.totalBookings.toLocaleString()}</h3>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 font-medium">+15.7%</span>
                    <span className="text-white/60 ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-amber-500/30 shadow-2xl shadow-amber-500/20 transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">Total Revenue</p>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                        RM {(dashboardStats.totalRevenue / 1000000).toFixed(1)}M
                      </h3>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 font-medium">+22.3%</span>
                    <span className="text-white/60 ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Bookings */}
              <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-amber-500/30 shadow-2xl shadow-amber-500/20">
                <CardHeader className="border-b border-amber-500/20">
                  <CardTitle className="text-xl bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                    Recent Bookings
                  </CardTitle>
                  <CardDescription className="text-white/70">Latest customer bookings</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentBookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-amber-500/10">
                        <div>
                          <p className="font-medium text-white">{booking.customer}</p>
                          <p className="text-sm text-white/60">{booking.package}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-amber-400">RM {booking.amount.toLocaleString()}</p>
                          <Badge
                            className={
                              booking.status === 'confirmed' ? 'bg-green-900/50 text-green-300 border-green-500/30' :
                                booking.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300 border-yellow-500/30' :
                                  'bg-blue-900/50 text-blue-300 border-blue-500/30'
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

              {/* Top Performing Agents */}
              <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-amber-500/30 shadow-2xl shadow-amber-500/20">
                <CardHeader className="border-b border-amber-500/20">
                  <CardTitle className="text-xl bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                    Top Performing Agents
                  </CardTitle>
                  <CardDescription className="text-white/70">Highest earning agents this month</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {topAgents.map((agent, index) => (
                      <div key={agent.id} className="flex items-center space-x-4 p-3 bg-black/30 rounded-lg border border-amber-500/10">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={agent.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-gradient-to-r from-amber-600 to-yellow-500 text-black">
                                {agent.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {index === 0 && <Crown className="absolute -top-2 -right-2 w-4 h-4 text-amber-400" />}
                          </div>
                          <div>
                            <p className="font-medium text-white">{agent.name}</p>
                            <p className="text-sm text-white/60">{agent.packages} packages sold</p>
                          </div>
                        </div>
                        <div className="ml-auto text-right">
                          <p className="font-bold text-amber-400">RM {agent.sales.toLocaleString()}</p>
                          <p className="text-sm text-white/60">RM {agent.commission.toLocaleString()} commission</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Package Performance */}
            <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-amber-500/30 shadow-2xl shadow-amber-500/20">
              <CardHeader className="border-b border-amber-500/20">
                <CardTitle className="text-xl bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  Package Performance
                </CardTitle>
                <CardDescription className="text-white/70">Revenue and booking statistics by package</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-amber-500/20">
                      <TableHead className="text-white/80">Package Name</TableHead>
                      <TableHead className="text-white/80">Bookings</TableHead>
                      <TableHead className="text-white/80">Revenue</TableHead>
                      <TableHead className="text-white/80">Growth</TableHead>
                      <TableHead className="text-white/80">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packagePerformance.map((pkg, index) => (
                      <TableRow key={index} className="border-amber-500/10">
                        <TableCell className="font-medium text-white">{pkg.name}</TableCell>
                        <TableCell className="text-white/80">{pkg.bookings}</TableCell>
                        <TableCell className="font-bold text-amber-400">RM {pkg.revenue.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                            <span className="text-green-400 font-medium">+{pkg.growth}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="bg-black/50 border-amber-500/30 text-white hover:bg-amber-600/20">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="bg-black/50 border-amber-500/30 text-white hover:bg-amber-600/20">
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

            {/* System Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-amber-500/30 shadow-2xl shadow-amber-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">System Health</p>
                      <h3 className="text-2xl font-bold text-green-400">{dashboardStats.systemHealth}%</h3>
                    </div>
                    <Activity className="w-8 h-8 text-green-400" />
                  </div>
                  <Progress value={dashboardStats.systemHealth} className="mt-4" />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-amber-500/30 shadow-2xl shadow-amber-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">Pending Approvals</p>
                      <h3 className="text-2xl font-bold text-amber-400">{dashboardStats.pendingApprovals}</h3>
                    </div>
                    <Shield className="w-8 h-8 text-amber-400" />
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-black font-bold">
                    Review Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-amber-500/30 shadow-2xl shadow-amber-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">Active Packages</p>
                      <h3 className="text-2xl font-bold text-blue-400">{dashboardStats.activePackages}</h3>
                    </div>
                    <Package className="w-8 h-8 text-blue-400" />
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-black/50 border-amber-500/30 text-white hover:bg-amber-600/20">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Package
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other tabs would be implemented similarly with the same theme */}
          <TabsContent value="users" className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-4">
                User Management
              </h3>
              <p className="text-white/70">User management interface coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-4">
                Agent Management
              </h3>
              <p className="text-white/70">Agent management interface coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="packages" className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-4">
                Package Management
              </h3>
              <p className="text-white/70">Package management interface coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-4">
                Booking Management
              </h3>
              <p className="text-white/70">Booking management interface coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-4">
                Advanced Analytics
              </h3>
              <p className="text-white/70">Analytics dashboard coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
