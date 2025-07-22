import GlocalNavigation from "@/components/glocal-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function AwardsPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <GlocalNavigation />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gold-500 mb-6">Awards & Recognition</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-black/70 border border-gold-700 text-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-2xl font-bold text-gold-500">Best Travel Agency of the Year</CardTitle>
                            <Star className="h-8 w-8 text-gold-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-300 mb-2">Awarded by Global Travel Excellence Forum</p>
                            <p className="text-lg">
                                Recognized for outstanding service, customer satisfaction, and innovative travel solutions in 2023.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/70 border border-gold-700 text-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-2xl font-bold text-gold-500">Excellence in Hajj & Umrah Services</CardTitle>
                            <Star className="h-8 w-8 text-gold-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-300 mb-2">Awarded by Islamic Tourism Council</p>
                            <p className="text-lg">
                                Acknowledged for our meticulous planning, spiritual guidance, and exceptional support for pilgrims in
                                2022.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/70 border border-gold-700 text-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-2xl font-bold text-gold-500">Customer Choice Award</CardTitle>
                            <Star className="h-8 w-8 text-gold-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-300 mb-2">Voted by our valued customers on TravelAdvisor</p>
                            <p className="text-lg">
                                A testament to our commitment to customer satisfaction, based on thousands of positive reviews in 2021.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/70 border border-gold-700 text-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-2xl font-bold text-gold-500">Sustainable Tourism Leader</CardTitle>
                            <Star className="h-8 w-8 text-gold-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-300 mb-2">Recognized by Green Travel Alliance</p>
                            <p className="text-lg">
                                For our efforts in promoting eco-friendly travel practices and supporting local communities in 2020.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
