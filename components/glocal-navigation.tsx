"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function GlocalNavigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="bg-black/95 backdrop-blur-md shadow-2xl border-b border-yellow-500/20 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-yellow-500/50 transition-all duration-300 group-hover:scale-110">
                            <Globe className="w-6 h-6 text-black" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                            Glocal Travel
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        <Link
                            href="/"
                            className="px-3 py-2 text-sm font-medium text-white hover:text-yellow-400 transition-colors relative group"
                        >
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <div className="relative group">
                            <button className="px-3 py-2 text-sm font-medium text-white hover:text-yellow-400 transition-colors flex items-center relative">
                                About
                                <svg
                                    className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
                            </button>
                            <div className="absolute top-full left-0 mt-1 w-48 bg-black/95 backdrop-blur-md border border-yellow-500/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-2">
                                <div className="py-2">
                                    <Link
                                        href="/ceo-speech"
                                        className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                                    >
                                        CEO Speech
                                    </Link>
                                    <Link
                                        href="/vision-mission"
                                        className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                                    >
                                        Vision & Mission
                                    </Link>
                                    <Link
                                        href="/organization"
                                        className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                                    >
                                        Organization
                                    </Link>
                                    <Link
                                        href="/awards"
                                        className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                                    >
                                        Awards
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                            <button className="px-3 py-2 text-sm font-medium text-white hover:text-yellow-400 transition-colors flex items-center relative">
                                Packages
                                <svg
                                    className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
                            </button>
                            <div className="absolute top-full left-0 mt-1 w-40 bg-black/95 backdrop-blur-md border border-yellow-500/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-2">
                                <div className="py-2">
                                    <Link
                                        href="/packages?type=hajj-packages"
                                        className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                                    >
                                        Hajj Packages
                                    </Link>
                                    <Link
                                        href="/packages?type=umrah-packages"
                                        className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                                    >
                                        Umrah Packages
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                            <button className="px-3 py-2 text-sm font-medium text-white hover:text-yellow-400 transition-colors flex items-center relative">
                                Destinations
                                <svg
                                    className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
                            </button>
                            <div className="absolute top-full left-0 mt-1 w-36 bg-black/95 backdrop-blur-md border border-yellow-500/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-2">
                                <div className="py-2">
                                    <Link
                                        href="/destinations/asia"
                                        className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                                    >
                                        Asia
                                    </Link>
                                    <Link
                                        href="/destinations/middle-east"
                                        className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                                    >
                                        Middle East
                                    </Link>
                                    <Link
                                        href="/destinations/europe"
                                        className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                                    >
                                        Europe
                                    </Link>
                                    <Link
                                        href="/destinations/africa"
                                        className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                                    >
                                        Africa
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Link
                            href="/agent-enrollment"
                            className="px-3 py-2 text-sm font-medium text-white hover:text-yellow-400 transition-colors relative group"
                        >
                            Agents
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link
                            href="/contact"
                            className="px-3 py-2 text-sm font-medium text-white hover:text-yellow-400 transition-colors relative group"
                        >
                            Contact
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </nav>

                    {/* Action Buttons */}
                    <div className="hidden lg:flex items-center space-x-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all duration-300 bg-transparent"
                            asChild
                        >
                            <Link href="/agent-login">Agent Login</Link>
                        </Button>
                        <Button
                            size="sm"
                            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600 font-semibold shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300"
                            asChild
                        >
                            <Link href="/book-now">Book Now</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden text-white hover:text-yellow-400">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-black border-yellow-500/20">
                            <nav className="flex flex-col space-y-4 mt-6">
                                <Link
                                    href="/"
                                    className="text-lg font-medium py-2 border-b border-yellow-500/20 text-white hover:text-yellow-400 transition-colors"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/about"
                                    className="text-lg font-medium py-2 border-b border-yellow-500/20 text-white hover:text-yellow-400 transition-colors"
                                >
                                    About Us
                                </Link>
                                <Link
                                    href="/packages?type=hajj-packages"
                                    className="text-lg font-medium py-2 border-b border-yellow-500/20 text-white hover:text-yellow-400 transition-colors"
                                >
                                    Hajj Packages
                                </Link>
                                <Link
                                    href="/packages?type=umrah-packages"
                                    className="text-lg font-medium py-2 border-b border-yellow-500/20 text-white hover:text-yellow-400 transition-colors"
                                >
                                    Umrah Packages
                                </Link>
                                <Link
                                    href="/destinations"
                                    className="text-lg font-medium py-2 border-b border-yellow-500/20 text-white hover:text-yellow-400 transition-colors"
                                >
                                    Destinations
                                </Link>
                                <Link
                                    href="/agent-enrollment"
                                    className="text-lg font-medium py-2 border-b border-yellow-500/20 text-white hover:text-yellow-400 transition-colors"
                                >
                                    Agent Enrollment
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-lg font-medium py-2 border-b border-yellow-500/20 text-white hover:text-yellow-400 transition-colors"
                                >
                                    Contact Us
                                </Link>
                                <div className="pt-4 space-y-3">
                                    <Button
                                        variant="outline"
                                        className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent"
                                        asChild
                                    >
                                        <Link href="/agent-login">Agent Login</Link>
                                    </Button>
                                    <Button
                                        className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600"
                                        asChild
                                    >
                                        <Link href="/book-now">Book Now</Link>
                                    </Button>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
