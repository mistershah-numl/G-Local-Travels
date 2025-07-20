"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import {
    Clock,
    Users,
    Star,
    MapPin,
    Plane,
    Building,
    CheckCircle,
    X,
    Heart,
    Share2,
    Download,
    Phone,
    Mail,
    ArrowLeft,
    Plus,
    Minus,
    CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import GlocalNavigation from "@/components/glocal-navigation"

// Package data (in a real app, this would come from an API)
const getPackageData = (id: string) => {
    // Base package data that will be used for all packages for now
    const basePackageData = {
        title: "Premium Umrah Package with 5-Star Hotels",
        price: 17000,
        originalPrice: 18400,
        duration: "14 Days",
        rating: 4.8,
        reviews: 124,
        images: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
        ],
        hotelRating: 5,
        flightIncluded: true,
        cities: ["Makkah", "Madinah"],
        popular: true,
        earlyBird: false,
        type: "umrah",
        category: "umrah-packages",
        features: ["Guided Tours", "Meals Included", "Transport", "Visa Assistance", "Insurance", "24/7 Support"],
        description:
            "Experience the spiritual journey of Umrah with our premium package featuring 5-star accommodations, expert guidance, and comprehensive services designed to make your pilgrimage memorable and comfortable.",
        inclusions: [
            "Return flights from Karachi/Lahore/Islamabad",
            "5-star hotel accommodation in Makkah (7 nights)",
            "5-star hotel accommodation in Madinah (6 nights)",
            "Daily breakfast and dinner",
            "Airport transfers",
            "Ziyarat tours in Makkah and Madinah",
            "Experienced religious guide",
            "Umrah visa processing",
            "Travel insurance",
            "24/7 customer support",
        ],
        exclusions: [
            "Personal expenses",
            "Lunch meals",
            "Optional tours",
            "Laundry services",
            "Tips and gratuities",
            "Additional baggage fees",
        ],
        itinerary: [
            {
                day: 1,
                title: "Departure from Pakistan",
                description: "Departure from Karachi/Lahore/Islamabad. Arrival in Jeddah and transfer to Makkah hotel.",
                activities: ["Airport departure", "Flight to Jeddah", "Transfer to Makkah", "Hotel check-in"],
            },
            {
                day: 2,
                title: "First Umrah",
                description: "Perform your first Umrah with guidance from experienced religious scholars.",
                activities: ["Ihram preparation", "Tawaf", "Sa'i", "Hair cutting/trimming", "Rest and prayers"],
            },
            {
                day: 3,
                title: "Ziyarat in Makkah",
                description: "Visit historical Islamic sites in and around Makkah.",
                activities: ["Cave of Hira", "Jabal-e-Noor", "Jannat-ul-Mualla", "Masjid-e-Aisha", "Shopping time"],
            },
            {
                day: 8,
                title: "Travel to Madinah",
                description: "Check out from Makkah hotel and travel to Madinah.",
                activities: ["Hotel checkout", "Travel to Madinah", "Hotel check-in", "Visit Masjid-e-Nabawi"],
            },
            {
                day: 14,
                title: "Departure",
                description: "Final prayers and departure to Pakistan.",
                activities: ["Final Ziyarat", "Shopping", "Airport transfer", "Flight to Pakistan"],
            },
        ],
        hotels: [
            {
                city: "Makkah",
                name: "Hilton Suites Makkah",
                rating: 5,
                distance: "200m from Haram",
                amenities: ["Free WiFi", "Restaurant", "Room Service", "Air Conditioning", "Prayer Room"],
                image: "/placeholder.svg?height=200&width=300",
            },
            {
                city: "Madinah",
                name: "Pullman Zamzam Madinah",
                rating: 5,
                distance: "150m from Prophet's Mosque",
                amenities: ["Free WiFi", "Restaurant", "Gym", "Room Service", "Prayer Facilities"],
                image: "/placeholder.svg?height=200&width=300",
            },
        ],
        departureDates: [
            {
                id: "jan-15",
                date: "15 Jan 2025",
                duration: "14 Days",
                availableSeats: 12,
                totalSeats: 40,
                price: 17000,
            },
            {
                id: "feb-05",
                date: "5 Feb 2025",
                duration: "14 Days",
                availableSeats: 25,
                totalSeats: 40,
                price: 17000,
            },
            {
                id: "mar-10",
                date: "10 Mar 2025",
                duration: "14 Days",
                availableSeats: 35,
                totalSeats: 40,
                price: 17500,
            },
        ],
        roomTypes: [
            {
                type: "quad",
                name: "Quad Room",
                description: "4 persons per room",
                price: 17000,
                available: 8,
                total: 10,
            },
            {
                type: "triple",
                name: "Triple Room",
                description: "3 persons per room",
                price: 18500,
                available: 6,
                total: 8,
            },
            {
                type: "double",
                name: "Double Room",
                description: "2 persons per room",
                price: 21000,
                available: 4,
                total: 6,
            },
        ],
        reviews: [
            {
                name: "Ahmad Hassan",
                rating: 5,
                date: "Dec 2024",
                comment:
                    "Excellent service and well-organized trip. The hotels were fantastic and the guides were very knowledgeable.",
                verified: true,
            },
            {
                name: "Fatima Khan",
                rating: 5,
                date: "Nov 2024",
                comment: "Amazing experience! Everything was perfectly arranged. Highly recommend this package.",
                verified: true,
            },
            {
                name: "Muhammad Ali",
                rating: 4,
                date: "Oct 2024",
                comment: "Great value for money. The accommodation was excellent and the food was good.",
                verified: true,
            },
        ],
        faqs: [
            {
                question: "What documents do I need for Umrah?",
                answer:
                    "You need a valid passport with at least 6 months validity, passport-size photographs, and completed visa application forms. We will assist you with the visa processing.",
            },
            {
                question: "Are flights included in the package?",
                answer:
                    "Yes, return flights from major Pakistani cities (Karachi, Lahore, Islamabad) are included in the package price.",
            },
            {
                question: "What type of accommodation is provided?",
                answer:
                    "We provide 5-star hotel accommodation in both Makkah and Madinah, located close to the holy mosques for your convenience.",
            },
            {
                question: "Is food included in the package?",
                answer:
                    "Daily breakfast and dinner are included. Lunch is not included to give you flexibility to explore local cuisine.",
            },
            {
                question: "What if I need to cancel my booking?",
                answer:
                    "Cancellation policies vary depending on how close to the departure date you cancel. Please refer to our terms and conditions for detailed information.",
            },
        ],
    }

    // Package variations based on ID
    const packageVariations = {
        "1": {
            ...basePackageData,
            id: "1",
            title: "Premium Umrah Package with 5-Star Hotels",
            price: 17000,
            originalPrice: 18400,
            type: "umrah",
        },
        "2": {
            ...basePackageData,
            id: "2",
            title: "Economy Umrah Package - Great Value",
            price: 11600,
            originalPrice: 13000,
            duration: "10 Days",
            hotelRating: 4,
            type: "umrah",
            earlyBird: true,
            popular: false,
        },
        "3": {
            ...basePackageData,
            id: "3",
            title: "Luxury Umrah Experience with VIP Services",
            price: 24000,
            originalPrice: 27000,
            duration: "16 Days",
            cities: ["Makkah", "Madinah", "Jeddah"],
            type: "umrah",
            popular: false,
        },
        "4": {
            ...basePackageData,
            id: "4",
            title: "Hajj Package 2025 - Complete Pilgrimage",
            price: 37000,
            originalPrice: 40000,
            duration: "21 Days",
            cities: ["Makkah", "Madinah", "Mina", "Arafat"],
            type: "hajj",
            popular: true,
        },
        "5": {
            ...basePackageData,
            id: "5",
            title: "Premium Hajj Package with Luxury Accommodation",
            price: 45000,
            originalPrice: 48000,
            duration: "25 Days",
            cities: ["Makkah", "Madinah", "Mina", "Arafat", "Muzdalifah"],
            type: "hajj",
            earlyBird: true,
            popular: false,
        },
        "6": {
            ...basePackageData,
            id: "6",
            title: "Turkey Islamic Heritage Group Tour",
            price: 15000,
            originalPrice: 16500,
            duration: "12 Days",
            hotelRating: 4,
            cities: ["Istanbul", "Bursa", "Konya"],
            type: "group",
            popular: false,
        },
        "7": {
            ...basePackageData,
            id: "7",
            title: "Egypt Islamic Civilization Group Tour",
            price: 18000,
            originalPrice: 19500,
            duration: "14 Days",
            hotelRating: 4,
            cities: ["Cairo", "Alexandria", "Luxor"],
            type: "group",
            earlyBird: true,
        },
        "8": {
            ...basePackageData,
            id: "8",
            title: "Private Morocco Islamic Tour",
            price: 22000,
            originalPrice: 24000,
            duration: "10 Days",
            cities: ["Casablanca", "Fez", "Marrakech"],
            type: "private",
        },
        "9": {
            ...basePackageData,
            id: "9",
            title: "Family Umrah Package - Kid Friendly",
            price: 14000,
            originalPrice: 15500,
            duration: "12 Days",
            hotelRating: 4,
            type: "family",
            popular: true,
        },
        "10": {
            ...basePackageData,
            id: "10",
            title: "Student Umrah Package - Special Rates",
            price: 9500,
            originalPrice: 11000,
            duration: "8 Days",
            hotelRating: 3,
            type: "student",
            earlyBird: true,
        },
    }

    // Return the specific package variation or default to package 1 if ID not found
    return packageVariations[id as keyof typeof packageVariations] || packageVariations["1"]
}

export default function PackageDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const [packageData, setPackageData] = useState<any>(null)
    const [selectedImage, setSelectedImage] = useState(0)
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedRoom, setSelectedRoom] = useState("")
    const [travelers, setTravelers] = useState(1)
    const [isFavorite, setIsFavorite] = useState(false)
    const [showBookingForm, setShowBookingForm] = useState(false)
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

    useEffect(() => {
        const data = getPackageData(params.id as string)
        if (data) {
            setPackageData(data)
            setSelectedDate(data.departureDates[0]?.id || "")
            setSelectedRoom(data.roomTypes[0]?.type || "")
        }
    }, [params.id])

    if (!packageData) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="text-yellow-400 text-xl mb-4">Package not found</div>
                    <Button
                        onClick={() => router.push("/packages")}
                        className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600"
                    >
                        Back to Packages
                    </Button>
                </div>
            </div>
        )
    }

    const selectedDateData = packageData.departureDates.find((d: any) => d.id === selectedDate)
    const selectedRoomData = packageData.roomTypes.find((r: any) => r.type === selectedRoom)
    const totalPrice = selectedRoomData ? selectedRoomData.price * travelers : packageData.price * travelers
    const savings = packageData.originalPrice - packageData.price

    return (
        <div className="min-h-screen bg-black">
            <GlocalNavigation />

            {/* Back Button */}
            <div className="container mx-auto px-4 py-4">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Packages
                </Button>
            </div>

            {/* Hero Section */}
            <div className="container mx-auto px-4 pb-8">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative">
                            <Image
                                src={packageData.images[selectedImage] || "/placeholder.svg"}
                                alt={packageData.title}
                                width={600}
                                height={400}
                                className="w-full h-96 object-cover rounded-lg"
                            />
                            <div className="absolute top-4 left-4 flex space-x-2">
                                {packageData.popular && <Badge className="bg-red-600 text-white">Most Popular</Badge>}
                                {packageData.earlyBird && <Badge className="bg-blue-600 text-white">Early Bird</Badge>}
                                {savings > 0 && <Badge className="bg-green-600 text-white">Save Rs {savings.toLocaleString()}</Badge>}
                            </div>
                            <div className="absolute top-4 right-4 flex space-x-2">
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className="bg-white/90 backdrop-blur-sm hover:bg-white"
                                >
                                    <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                                </Button>
                                <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                                    <Share2 className="w-4 h-4 text-gray-600" />
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {packageData.images.map((image: string, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative rounded-lg overflow-hidden ${selectedImage === index ? "ring-2 ring-yellow-400" : ""
                                        }`}
                                >
                                    <Image
                                        src={image || "/placeholder.svg"}
                                        alt={`${packageData.title} ${index + 1}`}
                                        width={150}
                                        height={100}
                                        className="w-full h-20 object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Package Info & Booking */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{packageData.title}</h1>
                            <div className="flex items-center space-x-4 text-gray-400 mb-4">
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {packageData.duration}
                                </div>
                                <div className="flex items-center">
                                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                                    {packageData.rating} ({packageData.reviews.length} reviews)
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {packageData.cities.join(", ")}
                                </div>
                            </div>
                            <p className="text-gray-300 mb-6">{packageData.description}</p>
                        </div>

                        {/* Pricing */}
                        <Card className="bg-gray-900/50 border-yellow-500/20">
                            <CardHeader>
                                <CardTitle className="text-yellow-400">Package Pricing</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-white">Starting from:</span>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                                            Rs {packageData.price.toLocaleString()}
                                        </div>
                                        {packageData.originalPrice > packageData.price && (
                                            <div className="text-sm text-gray-500 line-through">
                                                Rs {packageData.originalPrice.toLocaleString()}
                                            </div>
                                        )}
                                        <div className="text-xs text-gray-400">per person</div>
                                    </div>
                                </div>

                                <Separator className="bg-yellow-500/20" />

                                {/* Departure Date Selection */}
                                <div>
                                    <Label className="text-yellow-400 mb-2 block">Select Departure Date</Label>
                                    <Select value={selectedDate} onValueChange={setSelectedDate}>
                                        <SelectTrigger className="bg-gray-800 border-yellow-500/30 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 border-yellow-500/30">
                                            {packageData.departureDates.map((date: any) => (
                                                <SelectItem key={date.id} value={date.id} className="text-white hover:bg-yellow-500/10">
                                                    {date.date} - {date.availableSeats} seats left
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Room Type Selection */}
                                <div>
                                    <Label className="text-yellow-400 mb-2 block">Select Room Type</Label>
                                    <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                                        <SelectTrigger className="bg-gray-800 border-yellow-500/30 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 border-yellow-500/30">
                                            {packageData.roomTypes.map((room: any) => (
                                                <SelectItem key={room.type} value={room.type} className="text-white hover:bg-yellow-500/10">
                                                    {room.name} - Rs {room.price.toLocaleString()} ({room.available} available)
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Travelers */}
                                <div>
                                    <Label className="text-yellow-400 mb-2 block">Number of Travelers</Label>
                                    <div className="flex items-center space-x-3">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setTravelers(Math.max(1, travelers - 1))}
                                            className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <span className="text-white font-medium w-8 text-center">{travelers}</span>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setTravelers(travelers + 1)}
                                            className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <Separator className="bg-yellow-500/20" />

                                {/* Total Price */}
                                <div className="flex items-center justify-between text-lg font-semibold">
                                    <span className="text-white">Total Price:</span>
                                    <span className="text-yellow-400">Rs {totalPrice.toLocaleString()}</span>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
                                        <DialogTrigger asChild>
                                            <Button className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600 font-semibold">
                                                <CreditCard className="w-4 h-4 mr-2" />
                                                Book Now - Rs {totalPrice.toLocaleString()}
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-md bg-gray-900 border-yellow-500/20 text-white">
                                            <DialogHeader>
                                                <DialogTitle className="text-yellow-400">Book Your Package</DialogTitle>
                                                <DialogDescription className="text-gray-300">
                                                    Fill in your details to proceed with booking
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="name" className="text-yellow-400">
                                                        Full Name
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        placeholder="Enter your full name"
                                                        className="bg-gray-800 border-yellow-500/30 text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="email" className="text-yellow-400">
                                                        Email
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        className="bg-gray-800 border-yellow-500/30 text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="phone" className="text-yellow-400">
                                                        Phone Number
                                                    </Label>
                                                    <Input
                                                        id="phone"
                                                        placeholder="Enter your phone number"
                                                        className="bg-gray-800 border-yellow-500/30 text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="message" className="text-yellow-400">
                                                        Special Requests
                                                    </Label>
                                                    <Textarea
                                                        id="message"
                                                        placeholder="Any special requirements or requests"
                                                        className="bg-gray-800 border-yellow-500/30 text-white"
                                                    />
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Button className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600">
                                                        Confirm Booking
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => setShowBookingForm(false)}
                                                        className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    <div className="grid grid-cols-2 gap-2">
                                        <Button
                                            variant="outline"
                                            className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
                                        >
                                            <Phone className="w-4 h-4 mr-2" />
                                            Call Us
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Brochure
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Detailed Information Tabs */}
            <div className="container mx-auto px-4 pb-8">
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-6 bg-gray-900 border-yellow-500/20">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="itinerary" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                            Itinerary
                        </TabsTrigger>
                        <TabsTrigger value="hotels" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                            Hotels
                        </TabsTrigger>
                        <TabsTrigger
                            value="inclusions"
                            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
                        >
                            Inclusions
                        </TabsTrigger>
                        <TabsTrigger value="reviews" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                            Reviews
                        </TabsTrigger>
                        <TabsTrigger value="faq" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                            FAQ
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="bg-gray-900/50 border-yellow-500/20">
                                <CardHeader>
                                    <CardTitle className="text-yellow-400">Package Highlights</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {packageData.features.map((feature: string, index: number) => (
                                        <div key={index} className="flex items-center text-white">
                                            <CheckCircle className="w-5 h-5 mr-3 text-yellow-400" />
                                            {feature}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-900/50 border-yellow-500/20">
                                <CardHeader>
                                    <CardTitle className="text-yellow-400">Quick Facts</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-gray-300">
                                            <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                                            Duration
                                        </div>
                                        <span className="text-white font-medium">{packageData.duration}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-gray-300">
                                            <Building className="w-5 h-5 mr-2 text-yellow-400" />
                                            Hotel Rating
                                        </div>
                                        <span className="text-white font-medium">{packageData.hotelRating} Stars</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-gray-300">
                                            <Plane className="w-5 h-5 mr-2 text-yellow-400" />
                                            Flights
                                        </div>
                                        <span className="text-white font-medium">
                                            {packageData.flightIncluded ? "Included" : "Not Included"}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-gray-300">
                                            <Users className="w-5 h-5 mr-2 text-yellow-400" />
                                            Group Size
                                        </div>
                                        <span className="text-white font-medium">Max 40 people</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="itinerary" className="mt-6">
                        <Card className="bg-gray-900/50 border-yellow-500/20">
                            <CardHeader>
                                <CardTitle className="text-yellow-400">Day-by-Day Itinerary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {packageData.itinerary.map((day: any, index: number) => (
                                        <div key={index} className="border-l-2 border-yellow-500/30 pl-6 relative">
                                            <div className="absolute -left-2 top-0 w-4 h-4 bg-yellow-500 rounded-full"></div>
                                            <div className="mb-2">
                                                <h3 className="text-lg font-semibold text-white">
                                                    Day {day.day}: {day.title}
                                                </h3>
                                                <p className="text-gray-300 mb-3">{day.description}</p>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                    {day.activities.map((activity: string, actIndex: number) => (
                                                        <Badge
                                                            key={actIndex}
                                                            variant="outline"
                                                            className="text-xs border-yellow-500/30 text-yellow-400"
                                                        >
                                                            {activity}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="hotels" className="mt-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {packageData.hotels.map((hotel: any, index: number) => (
                                <Card key={index} className="bg-gray-900/50 border-yellow-500/20">
                                    <CardHeader>
                                        <CardTitle className="text-yellow-400">{hotel.city}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <Image
                                                src={hotel.image || "/placeholder.svg"}
                                                alt={hotel.name}
                                                width={300}
                                                height={200}
                                                className="w-full h-40 object-cover rounded-lg"
                                            />
                                            <div>
                                                <h3 className="text-lg font-semibold text-white mb-1">{hotel.name}</h3>
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <div className="flex">
                                                        {[...Array(hotel.rating)].map((_, i) => (
                                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                        ))}
                                                    </div>
                                                    <span className="text-gray-400 text-sm">{hotel.distance}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {hotel.amenities.map((amenity: string, amenityIndex: number) => (
                                                        <Badge
                                                            key={amenityIndex}
                                                            variant="outline"
                                                            className="text-xs border-yellow-500/30 text-yellow-400"
                                                        >
                                                            {amenity}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="inclusions" className="mt-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="bg-gray-900/50 border-yellow-500/20">
                                <CardHeader>
                                    <CardTitle className="text-green-400 flex items-center">
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                        What's Included
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {packageData.inclusions.map((item: string, index: number) => (
                                            <li key={index} className="flex items-start text-white">
                                                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-900/50 border-yellow-500/20">
                                <CardHeader>
                                    <CardTitle className="text-red-400 flex items-center">
                                        <X className="w-5 h-5 mr-2" />
                                        What's Not Included
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {packageData.exclusions.map((item: string, index: number) => (
                                            <li key={index} className="flex items-start text-white">
                                                <X className="w-4 h-4 mr-2 mt-0.5 text-red-400 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-6">
                        <Card className="bg-gray-900/50 border-yellow-500/20">
                            <CardHeader>
                                <CardTitle className="text-yellow-400">Customer Reviews</CardTitle>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        <span className="text-white font-semibold ml-1">{packageData.rating}</span>
                                    </div>
                                    <span className="text-gray-400">Based on {packageData.reviews.length} reviews</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {packageData.reviews.map((review: any, index: number) => (
                                        <div key={index} className="border-b border-yellow-500/20 pb-4 last:border-b-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-semibold text-white">{review.name}</span>
                                                    {review.verified && <Badge className="bg-green-600 text-white text-xs">Verified</Badge>}
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex">
                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                        ))}
                                                    </div>
                                                    <span className="text-gray-400 text-sm">{review.date}</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-300">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="faq" className="mt-6">
                        <Card className="bg-gray-900/50 border-yellow-500/20">
                            <CardHeader>
                                <CardTitle className="text-yellow-400">Frequently Asked Questions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    {packageData.faqs.map((faq: any, index: number) => (
                                        <AccordionItem key={index} value={`item-${index}`} className="border-yellow-500/20">
                                            <AccordionTrigger className="text-white hover:text-yellow-400">{faq.question}</AccordionTrigger>
                                            <AccordionContent className="text-gray-300">{faq.answer}</AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Need Help with Your Booking?</h2>
                    <p className="text-xl mb-6 opacity-90">
                        Our travel experts are here to assist you with any questions or special requirements
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-black text-yellow-400 hover:bg-gray-900 font-semibold">
                            <Phone className="mr-2 h-5 w-5" />
                            Call +92 21-1234-5678
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-black text-black hover:bg-black hover:text-yellow-400 font-semibold bg-transparent"
                        >
                            <Mail className="mr-2 h-5 w-5" />
                            Email Us
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
