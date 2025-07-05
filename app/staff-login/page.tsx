"use client"

import { useState } from "react"
import type React from "react"
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, User, Lock, Mail, Phone, Shield, Users, Sparkles } from 'lucide-react'
import Link from "next/link"

export default function StaffLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    staffId: "",
    department: "",
    password: "",
    confirmPassword: "",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Staff Login:", loginData)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Staff Register:", registerData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-amber-500 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-yellow-300 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-amber-400 rounded-full animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8 animate-fade-in">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:scale-110 transition-all duration-500 relative group">
                <Users className="w-12 h-12 text-black" />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur opacity-50 animate-pulse group-hover:opacity-75 transition-opacity"></div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-spin-slow" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Staff Portal
              </h1>
              <p className="text-gray-300">Access your staff dashboard and manage operations</p>
            </div>

            {/* Login/Register Card */}
            <Card className="shadow-2xl border-0 bg-black/80 backdrop-blur-xl hover:bg-black/90 transition-all duration-500 border border-yellow-500/30 relative overflow-hidden">
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="pb-4 relative z-10">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 rounded-xl p-1 mb-6 border border-yellow-500/20">
                    <TabsTrigger
                      value="login"
                      className="rounded-lg transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-yellow-500/50 text-gray-300 hover:text-white transform data-[state=active]:scale-105"
                    >
                      Staff Login
                    </TabsTrigger>
                    <TabsTrigger
                      value="register"
                      className="rounded-lg transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-yellow-500/50 text-gray-300 hover:text-white transform data-[state=active]:scale-105"
                    >
                      Register
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-6 animate-slide-in-right">
                    <form onSubmit={handleLogin} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                          Staff Email
                        </Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your staff email"
                            className="pl-10 h-12 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white placeholder:text-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/50"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                          Password
                        </Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-12 h-12 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white placeholder:text-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/50"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            className="rounded border-gray-600 bg-gray-800 text-yellow-500 focus:ring-yellow-500 transition-colors"
                          />
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                            Remember me
                          </span>
                        </label>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold rounded-xl shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
                      >
                        <span className="relative z-10">Access Staff Dashboard</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="register" className="space-y-6 animate-slide-in-left">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium text-gray-200">
                            Full Name
                          </Label>
                          <div className="relative group">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                            <Input
                              id="name"
                              type="text"
                              placeholder="Your full name"
                              className="pl-10 h-12 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white placeholder:text-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/50"
                              value={registerData.name}
                              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="staffId" className="text-sm font-medium text-gray-200">
                            Staff ID
                          </Label>
                          <div className="relative group">
                            <Shield className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                            <Input
                              id="staffId"
                              type="text"
                              placeholder="Staff ID"
                              className="pl-10 h-12 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white placeholder:text-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/50"
                              value={registerData.staffId}
                              onChange={(e) => setRegisterData({ ...registerData, staffId: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                          Email Address
                        </Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@company.com"
                            className="pl-10 h-12 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white placeholder:text-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/50"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium text-gray-200">
                            Phone Number
                          </Label>
                          <div className="relative group">
                            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+60 12-345 6789"
                              className="pl-10 h-12 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white placeholder:text-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/50"
                              value={registerData.phone}
                              onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="department" className="text-sm font-medium text-gray-200">
                            Department
                          </Label>
                          <select
                            id="department"
                            className="w-full h-12 px-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white transition-all duration-300 hover:border-yellow-500/50"
                            value={registerData.department}
                            onChange={(e) => setRegisterData({ ...registerData, department: e.target.value })}
                            required
                          >
                            <option value="" className="bg-gray-800">
                              Select Department
                            </option>
                            <option value="operations" className="bg-gray-800">
                              Operations
                            </option>
                            <option value="customer-service" className="bg-gray-800">
                              Customer Service
                            </option>
                            <option value="finance" className="bg-gray-800">
                              Finance
                            </option>
                            <option value="marketing" className="bg-gray-800">
                              Marketing
                            </option>
                            <option value="hr" className="bg-gray-800">
                              Human Resources
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                            Password
                          </Label>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create password"
                              className="pl-10 pr-12 h-12 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white placeholder:text-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/50"
                              value={registerData.password}
                              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-200">
                            Confirm Password
                          </Label>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm password"
                              className="pl-10 pr-12 h-12 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white placeholder:text-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/50"
                              value={registerData.confirmPassword}
                              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                            >
                              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-600 bg-gray-800 text-yellow-500 focus:ring-yellow-500 transition-colors"
                          required
                        />
                        <span className="text-sm text-gray-300">
                          I agree to the{" "}
                          <Link
                            href="/terms"
                            className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                          >
                            Terms & Conditions
                          </Link>
                        </span>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold rounded-xl shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
                      >
                        <span className="relative z-10">Register as Staff</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>

            {/* Help Section */}
            <div className="text-center mt-6">
              <p className="text-gray-300">
                Need help?{" "}
                <Link href="/contact" className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors">
                  Contact IT Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  )
}
