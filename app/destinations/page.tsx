import GlocalNavigation from "@/components/glocal-navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export default function DestinationsPage() {
  const regions = [
    { name: "Asia", href: "/destinations/asia", description: "Explore the diverse cultures and landscapes of Asia." },
    {
      name: "Middle East",
      href: "/destinations/middle-east",
      description: "Discover ancient history and vibrant traditions.",
    },
    { name: "Europe", href: "/destinations/europe", description: "Experience rich history, art, and modern cities." },
    {
      name: "Africa",
      href: "/destinations/africa",
      description: "Embark on thrilling safaris and cultural adventures.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <GlocalNavigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gold-500 mb-6">Our Destinations</h1>
        <p className="text-lg mb-8 text-gray-300">
          Embark on an unforgettable journey with Glocal Travel. Explore our curated list of regions and discover your
          next adventure.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((region) => (
            <Link key={region.name} href={region.href}>
              <Card className="bg-black/70 border border-gold-700 text-white hover:bg-black/80 transition-colors duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-2xl font-bold text-gold-500 group-hover:text-gold-400 transition-colors">
                    {region.name}
                  </CardTitle>
                  <MapPin className="h-8 w-8 text-gold-500 group-hover:scale-110 transition-transform" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">{region.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
