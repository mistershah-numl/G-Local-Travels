"use client"

import { useState } from "react"
import type React from "react"
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, User, Lock, Mail, Phone, Crown, Shield, Zap, Star } from 'lucide-react'
import Link from "next/link"

export default function AdminLoginPage() {
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
    adminCode: "",
    department: "",
    password: "",
    confirmPassword: "",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Admin Login:", loginData)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Admin Register:", registerData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-yellow-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Lightning effects */}
        <div className="absolute top-10 left-10 w-1 h-20 bg-gradient-to-b from-yellow-400 to-transparent animate-lightning opacity-30"></div>
        <div className="absolute top-32 right-16 w-1 h-16 bg-gradient-to-b from-amber-400 to-transparent animate-lightning-delayed opacity-40"></div>
        <div className="absolute bottom-20 left-1/4 w-1 h-24 bg-gradient-to-b from-yellow-300 to-transparent animate-lightning opacity-35"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-yellow-400 rounded-full animate-float-admin"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-amber-500 rounded-full animate-float-admin-delayed"></div>
        <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-yellow-300 rounded-full animate-float-admin"></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-amber-400 rounded-full animate-float-admin-delayed"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8 animate-fade-in-admin">
              <div className="w-28 h-28 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:scale-110 transition-all duration-500 relative group">
                <Crown className="w-14 h-14 text-black" />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur opacity-60 animate-pulse group-hover:opacity-90 transition-opacity"></div>
                <Star className="absolute -top-3 -right-3 w-8 h-8 text-yellow-300 animate-spin-slow" />
                <Zap className="absolute -bottom-2 -left-2 w-6 h-6 text-amber-400 animate-bounce" />
              </div>
              <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Admin Portal
              </h1>
              <p className="text-gray-300">Ultimate control and management access</p>
            </div>

            {/* Login/Register Card */}
            <Card className="shadow-2xl border-0 bg-black/85 backdrop-blur-xl hover:bg-black/95 transition-all duration-500 border-2 border-yellow-500/40 relative overflow-hidden">
              {/* Card premium glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/15 to-amber-500/15 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg blur opacity-20 animate-pulse"></div>

              <CardHeader className="pb-4 relative z-10">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-800/60 rounded-xl p-1 mb-6 border-2 border-yellow-500/30">
                    <TabsTrigger
                      value="login"
                      className="rounded-lg transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black data-[state=active]:shadow-2xl data-[state=active]:shadow-yellow-500/60 text-gray-300 hover:text-white transform data-[state=active]:scale-110 data-[state=active]:rotate-1"
                    >
                      Admin Login
                    </TabsTrigger>
                    <TabsTrigger
                      value="register"
                      className="rounded-lg transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black data-[state=active]:shadow-2xl data-[state=active]:shadow-yellow-500/60 text-gray-300 hover:text-white transform data-[state=active]:scale-110 data-[state=active]:-rotate-1"
                    >
                      Register
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-6 animate-slide-in-3d-right">
                    <form onSubmit={handleLogin} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                          Admin Email
                        </Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your admin email"
                            className="pl-10 h-12 bg-gray-800/60 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 focus:ring-2 text-white placeholder:text-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/20"
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
                            className="pl-10 pr-12 h-12 bg-gray-800/60 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 focus:ring-2 text-white placeholder:text-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/20"
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
                        className="w-full h-12 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black font-bold rounded-xl shadow-2xl hover:shadow-yellow-500/60 transform hover:scale-[1.03] transition-all duration-300 relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          <Crown className="w-5 h-5 mr-2" />
                          Access Admin Dashboard
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="register" className="space-y-6 animate-slide-in-3d-left">
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
                              className="pl-10 h-12 bg-gray-800/60 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white placeholder:text-gray-400 transition-all duration-300 hover:border-yellow-500/50"
                              value={registerData.name}
                              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="adminCode" className="text-sm font-medium text-gray-200">
                            Admin Code
                          </Label>
                          <div className="relative group">
                            <Shield className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                            <Input
                              id="adminCode"
                              type="text"
                              placeholder="Admin Access Code"
                              className="pl-10 h-12 bg-gray-800/60 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white placeholder:text-gray-400 transition-all duration-300 hover:border-yellow-500/50"
                              value={registerData.adminCode}
                              onChange={(e) => setRegisterData({ ...registerData, adminCode: e.target.value })}
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
                            placeholder="admin@company.com"
                            className="pl-10 h-12 bg-gray-800/60 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white placeholder:text-gray-400 transition-all duration-300 hover:border-yellow-500/50"
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
                              className="pl-10 h-12 bg-gray-800/60 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white placeholder:text-gray-400 transition-all duration-300 hover:border-yellow-500/50"
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
                            className="w-full h-12 px-3 bg-gray-800/60 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white transition-all duration-300 hover:border-yellow-500/50"
                            value={registerData.department}
                            onChange={(e) => setRegisterData({ ...registerData, department: e.target.value })}
                            required
                          >
                            <option value="" className="bg-gray-800">
                              Select Department
                            </option>
                            <option value="executive" className="bg-gray-800">
                              Executive
                            </option>
                            <option value="operations" className="bg-gray-800">
                              Operations
                            </option>
                            <option value="finance" className="bg-gray-800">
                              Finance
                            </option>
                            <option value="it" className="bg-gray-800">
                              IT & Systems
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
                              className="pl-10 pr-12 h-12 bg-gray-800/60 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white placeholder:text-gray-400 transition-all duration-300 hover:border-yellow-500/50"
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
                              className="pl-10 pr-12 h-12 bg-gray-800/60 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white placeholder:text-gray-400 transition-all duration-300 hover:border-yellow-500/50"
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
                        className="w-full h-12 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black font-bold rounded-xl shadow-2xl hover:shadow-yellow-500/60 transform hover:scale-[1.03] transition-all duration-300 relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          <Crown className="w-5 h-5 mr-2" />
                          Register as Admin
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                  Contact System Administrator
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-admin {
          from { opacity: 0; transform: translateY(-30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes slide-in-3d-right {
          from { 
            opacity: 0; 
            transform: translateX(40px) rotateY(20deg) scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0) rotateY(0deg) scale(1); 
          }
        }
        
        @keyframes slide-in-3d-left {
          from { 
            opacity: 0; 
            transform: translateX(-40px) rotateY(-20deg) scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0) rotateY(0deg) scale(1); 
          }
        }
        
        @keyframes float-admin {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-25px) rotate(180deg) scale(1.1); }
        }
        
        @keyframes float-admin-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-35px) rotate(-180deg) scale(1.2); }
        }
        
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
        
        .animate-fade-in-admin {
          animation: fade-in-admin 1s ease-out;
        }
        
        .animate-slide-in-3d-right {
          animation: slide-in-3d-right 0.8s ease-out;
        }
        
        .animate-slide-in-3d-left {
          animation: slide-in-3d-left 0.8s ease-out;
        }
        
        .animate-float-admin {
          animation: float-admin 7s ease-in-out infinite;
        }
        
        .animate-float-admin-delayed {
          animation: float-admin-delayed 9s ease-in-out infinite;
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
