"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Tag,
  X,
  Download,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Photo type definition
type Photo = {
  id: number
  title: string
  description: string
  image: string
  location: string
  date: string
  year: number
  tripType: string
  tags: string[]
  featured: boolean
}

export function PictureGallery() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [yearFilter, setYearFilter] = useState<string>("all")
  const [tripTypeFilter, setTripTypeFilter] = useState<string>("all")
  const [currentView, setCurrentView] = useState<"grid" | "masonry">("grid")
  const [isLoading, setIsLoading] = useState(true)

  // Sample photo data
  const samplePhotos: Photo[] = [
    {
      id: 1,
      title: "Kaaba at Sunset",
      description: "Beautiful view of the Kaaba during sunset prayers",
      image: "/placeholder.svg?height=600&width=800",
      location: "Makkah, Saudi Arabia",
      date: "January 15, 2025",
      year: 2025,
      tripType: "Umrah",
      tags: ["Makkah", "Kaaba", "Sunset", "Prayer"],
      featured: true,
    },
    {
      id: 2,
      title: "Group Photo at Masjid Nabawi",
      description: "Our pilgrimage group at the Prophet's Mosque",
      image: "/placeholder.svg?height=800&width=1200",
      location: "Madinah, Saudi Arabia",
      date: "January 18, 2025",
      year: 2025,
      tripType: "Umrah",
      tags: ["Madinah", "Masjid Nabawi", "Group", "Pilgrims"],
      featured: false,
    },
    {
      id: 3,
      title: "Mount Uhud Visit",
      description: "Educational tour to the historic Mount Uhud",
      image: "/placeholder.svg?height=600&width=800",
      location: "Madinah, Saudi Arabia",
      date: "January 20, 2025",
      year: 2025,
      tripType: "Umrah",
      tags: ["Madinah", "Mount Uhud", "History", "Education"],
      featured: false,
    },
    {
      id: 4,
      title: "Blue Mosque",
      description: "Visit to the magnificent Sultan Ahmed Mosque",
      image: "/placeholder.svg?height=800&width=600",
      location: "Istanbul, Turkey",
      date: "March 5, 2024",
      year: 2024,
      tripType: "Combined Tour",
      tags: ["Istanbul", "Blue Mosque", "Architecture", "History"],
      featured: true,
    },
    {
      id: 5,
      title: "Hajj Group Departure",
      description: "Our Hajj pilgrims departing from KLIA",
      image: "/placeholder.svg?height=800&width=1200",
      location: "Kuala Lumpur, Malaysia",
      date: "June 10, 2024",
      year: 2024,
      tripType: "Hajj",
      tags: ["Departure", "KLIA", "Group", "Preparation"],
      featured: false,
    },
    {
      id: 6,
      title: "Arafat Day",
      description: "Pilgrims gathering at Mount Arafat during Hajj",
      image: "/placeholder.svg?height=1200&width=800",
      location: "Makkah, Saudi Arabia",
      date: "June 15, 2024",
      year: 2024,
      tripType: "Hajj",
      tags: ["Hajj", "Arafat", "Pilgrimage", "Spiritual"],
      featured: true,
    },
    {
      id: 7,
      title: "Al-Azhar Mosque",
      description: "Visit to the historic Al-Azhar Mosque and University",
      image: "/placeholder.svg?height=800&width=1200",
      location: "Cairo, Egypt",
      date: "September 8, 2023",
      year: 2023,
      tripType: "Combined Tour",
      tags: ["Egypt", "Cairo", "Al-Azhar", "Education"],
      featured: false,
    },
    {
      id: 8,
      title: "Desert Safari",
      description: "Group enjoying desert safari in Dubai",
      image: "/placeholder.svg?height=800&width=1200",
      location: "Dubai, UAE",
      date: "November 12, 2023",
      year: 2023,
      tripType: "Combined Tour",
      tags: ["Dubai", "Desert", "Safari", "Adventure"],
      featured: false,
    },
    {
      id: 9,
      title: "Umrah Preparation Workshop",
      description: "Pre-departure workshop for Umrah pilgrims",
      image: "/placeholder.svg?height=800&width=1200",
      location: "Kuala Lumpur, Malaysia",
      date: "December 5, 2023",
      year: 2023,
      tripType: "Workshop",
      tags: ["Workshop", "Education", "Preparation", "Training"],
      featured: false,
    },
    {
      id: 10,
      title: "Tawaf Around Kaaba",
      description: "Pilgrims performing Tawaf around the Kaaba",
      image: "/placeholder.svg?height=1200&width=800",
      location: "Makkah, Saudi Arabia",
      date: "January 10, 2023",
      year: 2023,
      tripType: "Umrah",
      tags: ["Makkah", "Kaaba", "Tawaf", "Pilgrimage"],
      featured: true,
    },
    {
      id: 11,
      title: "Hagia Sophia Visit",
      description: "Tour group at the historic Hagia Sophia",
      image: "/placeholder.svg?height=800&width=1200",
      location: "Istanbul, Turkey",
      date: "April 15, 2022",
      year: 2022,
      tripType: "Combined Tour",
      tags: ["Istanbul", "Hagia Sophia", "History", "Architecture"],
      featured: false,
    },
    {
      id: 12,
      title: "Pyramids of Giza",
      description: "Group tour at the ancient Pyramids of Giza",
      image: "/placeholder.svg?height=800&width=1200",
      location: "Giza, Egypt",
      date: "October 20, 2022",
      year: 2022,
      tripType: "Combined Tour",
      tags: ["Egypt", "Pyramids", "History", "Wonder"],
      featured: true,
    },
  ]

  // Initialize photos
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setPhotos(samplePhotos)
      setFilteredPhotos(samplePhotos)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Apply filters
  useEffect(() => {
    let result = [...photos]

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (photo) =>
          photo.title.toLowerCase().includes(query) ||
          photo.description.toLowerCase().includes(query) ||
          photo.location.toLowerCase().includes(query) ||
          photo.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply year filter
    if (yearFilter !== "all") {
      result = result.filter((photo) => photo.year === Number.parseInt(yearFilter))
    }

    // Apply trip type filter
    if (tripTypeFilter !== "all") {
      result = result.filter((photo) => photo.tripType === tripTypeFilter)
    }

    setFilteredPhotos(result)
  }, [searchQuery, yearFilter, tripTypeFilter, photos])

  // Get unique years and trip types for filters
  const years = [...new Set(photos.map((photo) => photo.year))].sort((a, b) => b - a)
  const tripTypes = [...new Set(photos.map((photo) => photo.tripType))]

  // Handle lightbox navigation
  const navigatePhoto = (direction: number) => {
    if (!selectedPhoto) return

    const currentIndex = filteredPhotos.findIndex((photo) => photo.id === selectedPhoto.id)
    const newIndex = (currentIndex + direction + filteredPhotos.length) % filteredPhotos.length
    setSelectedPhoto(filteredPhotos[newIndex])
  }

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("")
    setYearFilter("all")
    setTripTypeFilter("all")
  }

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Picture Gallery</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore moments from our pilgrimages and tours around the world
          </p>
        </div>

        {/* Filters and search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search photos by title, location, or tags..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500" />
                <span className="text-sm text-gray-500">Filters:</span>
              </div>

              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={tripTypeFilter} onValueChange={setTripTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Trip Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Trip Types</SelectItem>
                  {tripTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(searchQuery || yearFilter !== "all" || tripTypeFilter !== "all") && (
                <Button variant="ghost" size="sm" onClick={resetFilters} className="h-9">
                  <X size={14} className="mr-1" /> Clear
                </Button>
              )}
            </div>
          </div>

          {/* Active filters display */}
          {(searchQuery || yearFilter !== "all" || tripTypeFilter !== "all") && (
            <div className="flex flex-wrap gap-2 mt-4">
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <X size={14} className="cursor-pointer ml-1" onClick={() => setSearchQuery("")} />
                </Badge>
              )}
              {yearFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Year: {yearFilter}
                  <X size={14} className="cursor-pointer ml-1" onClick={() => setYearFilter("all")} />
                </Badge>
              )}
              {tripTypeFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Trip Type: {tripTypeFilter}
                  <X size={14} className="cursor-pointer ml-1" onClick={() => setTripTypeFilter("all")} />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* View toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500">
            Showing {filteredPhotos.length} of {photos.length} photos
          </div>
          <Tabs defaultValue="grid" onValueChange={(value) => setCurrentView(value as "grid" | "masonry")}>
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="masonry">Masonry View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Featured photos section (only show if not filtered) */}
        {searchQuery === "" && yearFilter === "all" && tripTypeFilter === "all" && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Featured Photos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {photos
                .filter((photo) => photo.featured)
                .slice(0, 3)
                .map((photo) => (
                  <div
                    key={photo.id}
                    className="relative overflow-hidden rounded-lg cursor-pointer group"
                    onClick={() => {
                      setSelectedPhoto(photo)
                      setLightboxOpen(true)
                    }}
                  >
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={photo.image || "/placeholder.svg"}
                        alt={photo.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h4 className="text-white font-semibold">{photo.title}</h4>
                      <div className="flex items-center text-white/80 text-sm">
                        <MapPin size={14} className="mr-1" />
                        {photo.location}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <Separator className="my-8" />
          </div>
        )}

        {/* No results message */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No photos found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
            <Button variant="outline" onClick={resetFilters}>
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Photo grid */}
        {filteredPhotos.length > 0 && currentView === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="relative overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => {
                  setSelectedPhoto(photo)
                  setLightboxOpen(true)
                }}
              >
                <div className="aspect-square relative">
                  <Image
                    src={photo.image || "/placeholder.svg"}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h4 className="text-white font-semibold">{photo.title}</h4>
                  <div className="flex items-center text-white/80 text-sm">
                    <MapPin size={14} className="mr-1" />
                    {photo.location}
                  </div>
                </div>
                {photo.featured && <Badge className="absolute top-2 right-2 bg-emerald-600">Featured</Badge>}
              </div>
            ))}
          </div>
        )}

        {/* Masonry layout */}
        {filteredPhotos.length > 0 && currentView === "masonry" && (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="relative overflow-hidden rounded-lg cursor-pointer group break-inside-avoid mb-4"
                onClick={() => {
                  setSelectedPhoto(photo)
                  setLightboxOpen(true)
                }}
              >
                <Image
                  src={photo.image || "/placeholder.svg"}
                  alt={photo.title}
                  width={800}
                  height={600}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h4 className="text-white font-semibold">{photo.title}</h4>
                  <div className="flex items-center text-white/80 text-sm">
                    <MapPin size={14} className="mr-1" />
                    {photo.location}
                  </div>
                </div>
                {photo.featured && <Badge className="absolute top-2 right-2 bg-emerald-600">Featured</Badge>}
              </div>
            ))}
          </div>
        )}

        {/* Photo lightbox */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent
            className={cn(
              "max-w-6xl p-0 overflow-hidden bg-black/95",
              fullscreen ? "fixed inset-0 w-screen h-screen max-h-screen rounded-none" : "",
            )}
          >
            {selectedPhoto && (
              <div className="relative">
                {/* Navigation buttons */}
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigatePhoto(-1)
                  }}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigatePhoto(1)
                  }}
                >
                  <ChevronRight size={24} />
                </button>

                {/* Top controls */}
                <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
                  <button
                    className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white"
                    onClick={() => setFullscreen(!fullscreen)}
                  >
                    {fullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                  </button>
                  <DialogClose className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white">
                    <X size={20} />
                  </DialogClose>
                </div>

                {/* Main image */}
                <div className={cn("flex items-center justify-center", fullscreen ? "h-screen" : "h-[70vh]")}>
                  <Image
                    src={selectedPhoto.image || "/placeholder.svg"}
                    alt={selectedPhoto.title}
                    width={1200}
                    height={800}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Photo details */}
                <div className="bg-black text-white p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{selectedPhoto.title}</h3>
                      <p className="text-gray-300 mb-2">{selectedPhoto.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-1" />
                          {selectedPhoto.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          {selectedPhoto.date}
                        </div>
                        <Badge variant="outline" className="text-white border-gray-600">
                          {selectedPhoto.tripType}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" className="text-white border-gray-600 hover:bg-gray-800">
                        <Heart size={16} />
                      </Button>
                      <Button variant="outline" size="icon" className="text-white border-gray-600 hover:bg-gray-800">
                        <Share2 size={16} />
                      </Button>
                      <Button variant="outline" size="icon" className="text-white border-gray-600 hover:bg-gray-800">
                        <Download size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedPhoto.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-gray-800 hover:bg-gray-700 cursor-pointer">
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default PictureGallery
