import GlocalNavigation from "@/components/glocal-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrganizationPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <GlocalNavigation />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gold-500 mb-6">Our Organization</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-black/70 border border-gold-700 text-white">
                        <CardHeader>
                            <CardTitle className="text-gold-500">Board of Directors</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-2">
                                <li>[Director Name 1] - Chairman</li>
                                <li>[Director Name 2] - Vice Chairman</li>
                                <li>[Director Name 3] - Member</li>
                                <li>[Director Name 4] - Member</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/70 border border-gold-700 text-white">
                        <CardHeader>
                            <CardTitle className="text-gold-500">Executive Leadership</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-2">
                                <li>[CEO Name] - Chief Executive Officer</li>
                                <li>[COO Name] - Chief Operating Officer</li>
                                <li>[CFO Name] - Chief Financial Officer</li>
                                <li>[CMO Name] - Chief Marketing Officer</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/70 border border-gold-700 text-white">
                        <CardHeader>
                            <CardTitle className="text-gold-500">Departments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Operations & Logistics</li>
                                <li>Sales & Marketing</li>
                                <li>Customer Relations</li>
                                <li>Finance & Administration</li>
                                <li>IT & Digital Transformation</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/70 border border-gold-700 text-white">
                        <CardHeader>
                            <CardTitle className="text-gold-500">Our Team</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Our team comprises experienced travel consultants, spiritual guides, and support staff dedicated to
                                making your journey seamless and memorable. We pride ourselves on our diverse talent and commitment to
                                excellence.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
