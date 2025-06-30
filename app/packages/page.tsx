import PackageListing from "@/package-listing"
import NavigationHeader from "@/navigation-header"

export default function PackagesPage() {
  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Travel Packages</h1>
          <p className="text-xl text-gray-600">
            Discover our complete range of spiritual and cultural travel experiences.
          </p>
        </div>
        <PackageListing />
      </div>
    </div>
  )
}
