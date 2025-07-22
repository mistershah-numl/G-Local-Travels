import GlocalNavigation from "@/components/glocal-navigation"

// This function is a Server Component and can be async
export default async function RegionPage({
  params,
}: {
  params: Promise<{ region: string }>
}) {
  // Next.js 15 params are now asynchronous [^1][^4]
  const { region } = await params

  // Function to get content based on region
  const getRegionContent = (regionSlug: string) => {
    switch (regionSlug) {
      case "asia":
        return {
          title: "Asia: Land of Diversity",
          description:
            "From the bustling markets of Southeast Asia to the serene temples of Japan, Asia offers an unparalleled blend of ancient traditions and modern marvels. Explore vibrant cities, breathtaking landscapes, and rich cultural heritage.",
          highlights: [
            "Tokyo, Japan: Neon-lit skyscrapers, historic temples, and unique pop culture.",
            "Bali, Indonesia: Volcanic mountains, coral reefs, and spiritual retreats.",
            "Bangkok, Thailand: Ornate shrines, vibrant street life, and delicious food.",
            "Himalayas, Nepal: Majestic peaks, spiritual treks, and serene monasteries.",
          ],
          image: "/placeholder.svg?height=400&width=600",
        }
      case "middle-east":
        return {
          title: "Middle East: Cradle of Civilizations",
          description:
            "A region steeped in history, spirituality, and architectural wonders. Discover ancient ruins, modern metropolises, and the profound spiritual significance of its holy sites.",
          highlights: [
            "Dubai, UAE: Futuristic architecture, luxury shopping, and desert adventures.",
            "Petra, Jordan: Ancient Nabataean city carved into rock.",
            "Jerusalem, Israel/Palestine: Holy sites for Judaism, Christianity, and Islam.",
            "Mecca & Medina, Saudi Arabia: Sacred cities for Islamic pilgrimage (Hajj & Umrah).",
          ],
          image: "/placeholder.svg?height=400&width=600",
        }
      case "europe":
        return {
          title: "Europe: A Continent of Charm",
          description:
            "Experience centuries of art, history, and diverse cultures across Europe. From romantic cities to stunning coastlines and majestic mountains, there's something for every traveler.",
          highlights: [
            "Paris, France: Iconic landmarks, art, and culinary delights.",
            "Rome, Italy: Ancient ruins, Vatican City, and vibrant street life.",
            "Santorini, Greece: Whitewashed villages, stunning sunsets, and volcanic beaches.",
            "London, UK: Historic sites, world-class museums, and diverse neighborhoods.",
          ],
          image: "/placeholder.svg?height=400&width=600",
        }
      case "africa":
        return {
          title: "Africa: The Wild Heart",
          description:
            "Embark on an adventure of a lifetime in Africa, home to breathtaking wildlife, diverse landscapes, and rich cultural heritage. From safaris to ancient pyramids, discover the continent's raw beauty.",
          highlights: [
            "Serengeti, Tanzania: Iconic wildlife safaris and the Great Migration.",
            "Cairo, Egypt: Ancient pyramids, Sphinx, and vibrant markets.",
            "Cape Town, South Africa: Table Mountain, stunning coastlines, and diverse culture.",
            "Marrakech, Morocco: Bustling souks, historic palaces, and vibrant squares.",
          ],
          image: "/placeholder.svg?height=400&width=600",
        }
      default:
        return {
          title: "Destination Not Found",
          description:
            "The requested destination could not be found. Please check the URL or navigate from our main destinations page.",
          highlights: [],
          image: "/placeholder.svg?height=400&width=600",
        }
    }
  }

  const content = getRegionContent(region)

  return (
    <div className="min-h-screen bg-black text-white">
      <GlocalNavigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gold-500 mb-6 capitalize">{content.title}</h1>
        <div className="bg-black/70 p-6 rounded-lg shadow-lg border border-gold-700">
          <div className="mb-6">
            <img
              src={content.image || "/placeholder.svg"}
              alt={`Image of ${content.title}`}
              className="w-full h-64 object-cover rounded-lg mb-4 border border-gold-700"
            />
            <p className="text-lg leading-relaxed text-gray-300">{content.description}</p>
          </div>

          {content.highlights.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gold-500 mb-4">Highlights</h2>
              <ul className="list-disc list-inside text-lg leading-relaxed space-y-2">
                {content.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
