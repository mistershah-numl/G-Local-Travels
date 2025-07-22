import GlocalNavigation from "@/components/glocal-navigation"

export default function CEOSpeechPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <GlocalNavigation />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gold-500 mb-6">CEO's Speech</h1>
                <div className="bg-black/70 p-6 rounded-lg shadow-lg border border-gold-700">
                    <p className="text-lg leading-relaxed mb-4">
                        "Welcome to Glocal Travel! It is with immense pride and excitement that I address you today. Our journey
                        began with a simple yet profound vision: to connect people with the world's most sacred and breathtaking
                        destinations, fostering experiences that transcend mere travel and touch the soul.
                    </p>
                    <p className="text-lg leading-relaxed mb-4">
                        In a rapidly evolving world, we remain committed to our core values of integrity, excellence, and
                        customer-centricity. We understand that every journey is unique, and our dedicated team works tirelessly to
                        craft personalized experiences that cater to your individual needs and aspirations. From the spiritual
                        serenity of Hajj and Umrah to the vibrant cultures of global destinations, we strive to make every trip
                        memorable, comfortable, and truly transformative.
                    </p>
                    <p className="text-lg leading-relaxed mb-4">
                        The past year has presented its share of challenges, but it has also highlighted the resilience of the human
                        spirit and the enduring desire to explore. We have adapted, innovated, and strengthened our partnerships to
                        ensure that Glocal Travel remains your trusted companion in discovering the wonders of the world.
                    </p>
                    <p className="text-lg leading-relaxed">
                        Thank you for choosing Glocal Travel. We look forward to embarking on many more incredible journeys with
                        you."
                    </p>
                    <p className="text-right text-gold-500 font-semibold mt-6">- [CEO's Name], CEO of Glocal Travel</p>
                </div>
            </main>
        </div>
    )
}
