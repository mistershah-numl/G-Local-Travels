"use client"

import { useState } from "react"
import type React from "react"
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, User, Lock, Mail, Phone, Heart, Star, MapPin, Calendar } from 'lucide-react'
import Link from "next/link"

export default function CustomerLoginPage() {
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
    address: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Customer Login:", loginData)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Customer Register:", registerData)
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/12 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/12 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-yellow-400/12 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Twinkling stars */}
        <div className="absolute top-16 left-16 w-2 h-2 bg-yellow-400 rounded-full animate-twinkle"></div>
        <div className="absolute top-32 right-24 w-1 h-1 bg-amber-500 rounded-full animate-twinkle-delayed"></div>
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-yellow-300 rounded-full animate-twinkle"></div>
        <div className="absolute bottom-24 right-32 w-2 h-2 bg-amber-400 rounded-full animate-twinkle-delayed"></div>
        <div className="absolute top-1/3 left-3/4 w-1 h-1 bg-yellow-500 rounded-full animate-twinkle"></div>

        {/* Floating hearts */}
        <div className="absolute top-20 right-20 text-yellow-400 animate-float-heart">
          <Heart className="w-4 h-4" />
        </div>
        <div className="absolute bottom-32 left-20 text-amber-500 animate-float-heart-delayed">
          <Star className="w-3 h-3" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8 animate-fade-in-customer">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:scale-110 transition-all duration-500 relative group">
                <Heart className="w-12 h-12 text-black" />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur opacity-50 animate-pulse group-hover:opacity-75 transition-opacity"></div>
                <Star className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-twinkle" />
                <Star className="absolute -bottom-1 -left-1 w-4 h-4 text-amber-400 animate-twinkle-delayed" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-300">Your spiritual journey awaits</p>
            </div>

            {/* Login/Register Card */}
            <Card className="shadow-2xl border-0 bg-black/80 backdrop-blur-xl hover:bg-black/90 transition-all duration-500 border border-yellow-500/30 relative overflow-hidden">
              {/* Card warm glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/8 to-amber-500/8 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="pb-4 relative z-10">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 rounded-xl p-1 mb-6 border border-yellow-500/20">
                    <TabsTrigger
                      value="login"
                      className="rounded-lg transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-yellow-500/50 text-gray-300 hover:text-white transform data-[state=active]:scale-105"
                    >
                      Login
                    </TabsTrigger>
                    <TabsTrigger
                      value="register"
                      className="rounded-lg transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-amber-500 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-yellow-500/50 text-gray-300 hover:text-white transform data-[state=active]:scale-105"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-6 animate-slide-in-bounce-right">
                    <form onSubmit={handleLogin} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                          Email Address
                        </Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
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
                        <span className="relative z-10 flex items-center justify-center">
                          <Heart className="w-5 h-5 mr-2" />
                          Sign In
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Button>
                    </form>

                    {/* Social Login */}
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-black text-gray-400">Or continue with</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleSocialLogin("Google")}
                          className="h-11 bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-yellow-500/50 transition-all duration-300"
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="currentColor"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          Google
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleSocialLogin("Facebook")}
                          className="h-11 bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-yellow-500/50 transition-all duration-300"
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                          Facebook
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="register" className="space-y-6 animate-slide-in-bounce-left">
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
                          <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-200">
                            Date of Birth
                          </Label>
                          <div className="relative group">
                            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                            <Input
                              id="dateOfBirth"
                              type="date"
                              className="pl-10 h-12 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/50"
                              value={registerData.dateOfBirth}
                              onChange={(e) => setRegisterData({ ...registerData, dateOfBirth: e.target.value })}
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
                            placeholder="your.email@example.com"
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
                          <Label htmlFor="address" className="text-sm font-medium text-gray-200">
                            Address
                          </Label>
                          <div className="relative group">
                            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                            <Input
                              id="address"
                              type="text"
                              placeholder="Your address"
                              className="pl-10 h-12 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-yellow-500 text-white placeholder:text-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/50"
                              value={registerData.address}
                              onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                              required
                            />
                          </div>
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
                        <span className="relative z-10 flex items-center justify-center">
                          <Heart className="w-5 h-5 mr-2" />
                          Create Account
                        </span>
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
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-customer {
          from { opacity: 0; transform: translateY(-20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes slide-in-bounce-right {
          from { 
            opacity: 0; 
            transform: translateX(30px) scale(0.9); 
          }
          50% {
            transform: translateX(-5px) scale(1.02);
          }
          to { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
        
        @keyframes slide-in-bounce-left {
          from { 
            opacity: 0; 
            transform: translateX(-30px) scale(0.9); 
          }
          50% {
            transform: translateX(5px) scale(1.02);
          }
          to { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes twinkle-delayed {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes float-heart {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(10deg); }
        }
        
        @keyframes float-heart-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-10deg); }
        }
        
        .animate-fade-in-customer {
          animation: fade-in-customer 0.8s ease-out;
        }
        
        .animate-slide-in-bounce-right {
          animation: slide-in-bounce-right 0.7s ease-out;
        }
        
        .animate-slide-in-bounce-left {
          animation: slide-in-bounce-left 0.7s ease-out;
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        
        .animate-twinkle-delayed {
          animation: twinkle-delayed 4s ease-in-out infinite;
        }
        
        .animate-float-heart {
          animation: float-heart 5s ease-in-out infinite;
        }
        
        .animate-float-heart-delayed {
          animation: float-heart-delayed 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
