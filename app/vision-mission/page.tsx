import GlocalNavigation from "@/components/glocal-navigation"

export default function VisionMissionPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <GlocalNavigation />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gold-500 mb-6">Vision & Mission</h1>
                <div className="bg-black/70 p-6 rounded-lg shadow-lg border border-gold-700">
                    <h2 className="text-3xl font-semibold text-gold-500 mb-4">Our Vision</h2>
                    <p className="text-lg leading-relaxed mb-8">
                        To be the leading global travel agency, recognized for delivering unparalleled, transformative, and
                        spiritually enriching travel experiences that connect people with diverse cultures and sacred sites
                        worldwide.
                    </p>

                    <h2 className="text-3xl font-semibold text-gold-500 mb-4">Our Mission</h2>
                    <ul className="list-disc list-inside text-lg leading-relaxed space-y-3">
                        <li>
                            **Excellence in Service:** To provide exceptional, personalized, and seamless travel services, ensuring
                            comfort, safety, and satisfaction for every traveler.
                        </li>
                        <li>
                            **Spiritual Enrichment:** To facilitate profound spiritual journeys, particularly for Hajj and Umrah, with
                            meticulous planning and unwavering support.
                        </li>
                        <li>
                            **Global Exploration:** To open doors to diverse global destinations, offering unique cultural immersions
                            and unforgettable adventures.
                        </li>
                        <li>
                            **Integrity and Trust:** To operate with the highest standards of integrity, transparency, and
                            professionalism, building lasting trust with our clients and partners.
                        </li>
                        <li>
                            **Innovation and Adaptability:** To continuously innovate our offerings and adapt to evolving travel
                            needs, leveraging technology to enhance the customer experience.
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    )
}
