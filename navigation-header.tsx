"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, Mail, MapPin, User, LogIn } from "lucide-react"

export default function NavigationHeader() {
  const [isOpen, setIsOpen] = useState(false)

  const destinations = [
    { name: "Saudi Arabia", href: "/destinations/saudi-arabia", description: "Makkah, Madinah & more" },
    { name: "Turkey", href: "/destinations/turkey", description: "Istanbul, Bursa & Konya" },
    { name: "Egypt", href: "/destinations/egypt", description: "Cairo, Alexandria & Luxor" },
    { name: "Jordan", href: "/destinations/jordan", description: "Amman, Petra & Aqaba" },
    { name: "Morocco", href: "/destinations/morocco", description: "Casablanca, Fez & Marrakech" },
    { name: "Malaysia", href: "/destinations/malaysia", description: "Kuala Lumpur & Penang" },
  ]

  const packages = [
    { name: "Hajj Packages", href: "/hajj-packages", description: "Complete Hajj pilgrimage packages" },
    { name: "Umrah Packages", href: "/umrah-packages", description: "Year-round Umrah packages" },
    { name: "Group Tours", href: "/packages?type=group", description: "Join our group tours" },
    { name: "Private Tours", href: "/packages?type=private", description: "Customized private tours" },
    { name: "Family Packages", href: "/packages?type=family", description: "Family-friendly packages" },
    { name: "Student Tours", href: "/packages?type=student", description: "Special rates for students" },
  ]

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top Bar */}
      <div className="bg-emerald-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@glocaltravel.com</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>New York, NY</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/agent-login" className="flex items-center space-x-1 hover:text-emerald-200">
                <User className="w-4 h-4" />
                <span>Agent Portal</span>
              </Link>
              <Link href="/customer-dashboard" className="flex items-center space-x-1 hover:text-emerald-200">
                <LogIn className="w-4 h-4" />
                <span>Customer Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <div>
              <div className="font-bold text-xl text-gray-900">Glocal Travel</div>
              <div className="text-xs text-gray-500">Your Journey, Our Passion</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium">
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-emerald-600 font-medium">
                  Destinations
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                    {destinations.map((destination) => (
                      <Link
                        key={destination.name}
                        href={destination.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">{destination.name}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {destination.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-emerald-600 font-medium">
                  Packages
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                    {packages.map((pkg) => (
                      <Link
                        key={pkg.name}
                        href={pkg.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">{pkg.name}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{pkg.description}</p>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/news" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium">
                    News
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium">
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/agent-enrollment">
              <Button variant="outline" className="bg-white text-emerald-600 border-emerald-600 hover:bg-emerald-50">
                Become Agent
              </Button>
            </Link>
            <Link href="/booking">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Book Now</Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium hover:text-emerald-600">
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium hover:text-emerald-600"
                >
                  About
                </Link>

                <div className="space-y-2">
                  <div className="text-lg font-medium text-gray-900">Destinations</div>
                  {destinations.map((destination) => (
                    <Link
                      key={destination.name}
                      href={destination.href}
                      onClick={() => setIsOpen(false)}
                      className="block pl-4 text-gray-600 hover:text-emerald-600"
                    >
                      {destination.name}
                    </Link>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="text-lg font-medium text-gray-900">Packages</div>
                  {packages.map((pkg) => (
                    <Link
                      key={pkg.name}
                      href={pkg.href}
                      onClick={() => setIsOpen(false)}
                      className="block pl-4 text-gray-600 hover:text-emerald-600"
                    >
                      {pkg.name}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/news"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium hover:text-emerald-600"
                >
                  News
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium hover:text-emerald-600"
                >
                  Contact
                </Link>

                <div className="pt-4 space-y-3">
                  <Link href="/agent-enrollment" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full bg-white text-emerald-600 border-emerald-600">
                      Become Agent
                    </Button>
                  </Link>
                  <Link href="/booking" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Book Now</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
