"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import PackageListing from "@/components/package-listing"
import GlocalNavigation from "@/components/glocal-navigation"


export default function PackagesPage() {
  const searchParams = useSearchParams()
  const [packageType, setPackageType] = useState<string>("all")

  useEffect(() => {
    const type = searchParams.get("type")
    if (type) {
      setPackageType(type)
    } else {
      setPackageType("all")
    }
  }, [searchParams])

  const getPageTitle = () => {
    switch (packageType) {
      case "hajj-packages":
        return "Hajj Packages"
      case "umrah-packages":
        return "Umrah Packages"
      case "group":
        return "Group Tour Packages"
      case "private":
        return "Private Tour Packages"
      case "family":
        return "Family Packages"
      case "student":
        return "Student Tour Packages"
      default:
        return "All Travel Packages"
    }
  }

  const getPageSubtitle = () => {
    switch (packageType) {
      case "hajj-packages":
        return "Complete Hajj pilgrimage packages for the sacred journey of a lifetime"
      case "umrah-packages":
        return "Comprehensive Umrah packages designed for your spiritual journey"
      case "group":
        return "Join our expertly guided group tours for an enriching travel experience"
      case "private":
        return "Customized private tours tailored to your preferences and schedule"
      case "family":
        return "Family-friendly packages designed for travelers of all ages"
      case "student":
        return "Special packages with discounted rates for students and educational groups"
      default:
        return "Discover our complete range of spiritual and cultural travel experiences"
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <GlocalNavigation />

      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{getPageTitle()}</h1>
          <p className="text-xl opacity-90 max-w-2xl">{getPageSubtitle()}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <PackageListing packageType={packageType} />
      </div>
    </div>
  )
}
