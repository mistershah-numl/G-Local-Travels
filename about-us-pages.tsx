"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  Play,
  Award,
  Target,
  Heart,
  Users,
  Building,
  ChevronDown,
  ChevronUp,
  Star,
  Trophy,
  Medal,
  Crown,
  Calendar,
  Handshake,
  Globe,
  User,
  Mail,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

// Breadcrumb Component
function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link href="/" className="hover:text-emerald-600">
        Home
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4" />
          {item.href ? (
            <Link href={item.href} className="hover:text-emerald-600">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

// Page Banner Component
function PageBanner({ title, subtitle, image }: { title: string; subtitle: string; image: string }) {
  return (
    <div className="relative h-64 md:h-80 bg-gradient-to-r from-emerald-600 to-emerald-800 overflow-hidden">
      <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover opacity-20" />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-emerald-100 max-w-2xl">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}

// CEO Speech Page
function CEOSpeechPage() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <PageBanner
        title="CEO Speech"
        subtitle="A message from our leadership about our commitment to exceptional pilgrimage services"
        image="/placeholder.svg?height=400&width=1200"
      />

      <div className="container mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: "About Us", href: "/about" }, { label: "CEO Speech" }]} />

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=400"
                alt="CEO Dato' Ahmad Rahman"
                width={400}
                height={500}
                className="rounded-lg shadow-lg"
              />
              <Dialog open={showVideo} onOpenChange={setShowVideo}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    <Play className="mr-2 h-6 w-6" />
                    Watch Video Message
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <Play className="w-16 h-16 mx-auto mb-4" />
                      <p>Video Player Placeholder</p>
                      <p className="text-sm text-gray-300">CEO Video Message would play here</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Dato' Ahmad Rahman</h2>
              <p className="text-lg text-emerald-600 mb-4">Chief Executive Officer & Founder</p>
              <div className="space-y-4 text-gray-600">
                <p>
                  "Assalamualaikum and welcome to Glocal Travel. For over 15 years, we have been honored to guide
                  thousands of pilgrims on their sacred journey to the Holy Land."
                </p>
                <p>
                  "Our commitment to excellence stems from our deep understanding that Hajj and Umrah are not just
                  travels, but spiritual transformations that deserve the utmost care and attention."
                </p>
                <p>
                  "We believe that every pilgrim deserves a journey that is not only comfortable and well-organized but
                  also spiritually enriching and memorable."
                </p>
              </div>
            </div>
          </div>

          <Card className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Full Message</h3>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
              <p>
                When I founded Glocal Travel in 2010, my vision was simple yet profound: to create a travel company that
                would serve the Muslim community with integrity, excellence, and genuine care. Having completed my own
                Hajj pilgrimage in 2008, I experienced firsthand the challenges that pilgrims face and the importance of
                having reliable, knowledgeable guides.
              </p>
              <p>
                Today, I am proud to say that we have facilitated over 5,000 successful pilgrimages, each one a
                testament to our team's dedication and expertise. Our success is measured not just in numbers, but in
                the countless testimonials from pilgrims whose lives have been transformed by their journey.
              </p>
              <p>
                We understand that choosing a travel partner for your Hajj or Umrah is a decision that requires trust.
                That's why we have built our reputation on transparency, reliability, and exceptional service. Every
                member of our team is committed to ensuring that your spiritual journey is everything you hoped it would
                be.
              </p>
              <p>
                As we look to the future, we remain committed to our founding principles while embracing innovation and
                technology to better serve our pilgrims. We are constantly improving our services, expanding our
                partnerships, and training our staff to provide the highest level of care.
              </p>
              <p>
                I invite you to join the thousands of satisfied pilgrims who have trusted us with their sacred journey.
                May Allah accept your pilgrimage and grant you a safe and blessed trip.
              </p>
              <p className="font-semibold">Barakallahu feeki,</p>
              <p className="font-semibold">Dato' Ahmad Rahman</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Vision & Mission Page
function VisionMissionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageBanner
        title="Vision & Mission"
        subtitle="Our guiding principles and commitment to serving the Muslim community"
        image="/placeholder.svg?height=400&width=1200"
      />

      <div className="container mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: "About Us", href: "/about" }, { label: "Vision & Mission" }]} />

        <div className="max-w-6xl mx-auto">
          {/* Vision & Mission Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To be the leading Islamic travel company in Southeast Asia, providing exceptional pilgrimage experiences
                that strengthen faith, create lasting spiritual connections, and serve as a bridge between cultures.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To facilitate meaningful spiritual journeys through comprehensive pilgrimage services, expert guidance,
                unwavering commitment to customer satisfaction, and adherence to Islamic values and principles.
              </p>
            </Card>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every aspect of our service, from planning to execution.
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Integrity</h3>
                <p className="text-gray-600">
                  Honesty and transparency guide all our interactions with pilgrims and partners.
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Care</h3>
                <p className="text-gray-600">
                  We treat every pilgrim with the care and respect they deserve on their sacred journey.
                </p>
              </Card>
            </div>
          </div>

          {/* Our Commitment */}
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Commitment</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-emerald-600">To Our Pilgrims</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Provide safe, comfortable, and spiritually enriching pilgrimage experiences
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Offer transparent pricing with no hidden costs
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Maintain 24/7 support throughout the journey
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Respect individual needs and preferences
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-emerald-600">To Our Community</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Contribute to the development of Islamic tourism
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Support local communities in pilgrimage destinations
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Promote cultural understanding and exchange
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Maintain ethical business practices
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Organization Chart Page
function OrganizationPage() {
  const [expandedNodes, setExpandedNodes] = useState<string[]>(["ceo"])

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => (prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]))
  }

  const orgData = {
    ceo: {
      name: "Dato' Ahmad Rahman",
      position: "Chief Executive Officer",
      image: "/placeholder.svg?height=100&width=100",
      children: ["operations", "finance", "marketing", "hr"],
    },
    operations: {
      name: "Hajjah Siti Aminah",
      position: "Operations Director",
      image: "/placeholder.svg?height=100&width=100",
      children: ["packages", "logistics", "guides"],
    },
    finance: {
      name: "Ahmad Zaki",
      position: "Finance Director",
      image: "/placeholder.svg?height=100&width=100",
      children: ["accounting", "payments"],
    },
    marketing: {
      name: "Nurul Huda",
      position: "Marketing Director",
      image: "/placeholder.svg?height=100&width=100",
      children: ["digital", "partnerships"],
    },
    hr: {
      name: "Muhammad Farid",
      position: "HR Director",
      image: "/placeholder.svg?height=100&width=100",
      children: ["recruitment", "training"],
    },
    packages: {
      name: "Fatimah Ali",
      position: "Package Manager",
      image: "/placeholder.svg?height=100&width=100",
      children: [],
    },
    logistics: {
      name: "Omar Hassan",
      position: "Logistics Manager",
      image: "/placeholder.svg?height=100&width=100",
      children: [],
    },
    guides: {
      name: "Ustaz Abdullah",
      position: "Guide Coordinator",
      image: "/placeholder.svg?height=100&width=100",
      children: [],
    },
    accounting: {
      name: "Aisha Rahman",
      position: "Chief Accountant",
      image: "/placeholder.svg?height=100&width=100",
      children: [],
    },
    payments: {
      name: "Yusuf Ibrahim",
      position: "Payment Specialist",
      image: "/placeholder.svg?height=100&width=100",
      children: [],
    },
    digital: {
      name: "Sarah Ahmad",
      position: "Digital Marketing Manager",
      image: "/placeholder.svg?height=100&width=100",
      children: [],
    },
    partnerships: {
      name: "Hassan Ali",
      position: "Partnership Manager",
      image: "/placeholder.svg?height=100&width=100",
      children: [],
    },
    recruitment: {
      name: "Zainab Omar",
      position: "Recruitment Specialist",
      image: "/placeholder.svg?height=100&width=100",
      children: [],
    },
    training: {
      name: "Khalid Yusuf",
      position: "Training Coordinator",
      image: "/placeholder.svg?height=100&width=100",
      children: [],
    },
  }

  const OrgNode = ({ nodeId, level = 0 }: { nodeId: string; level?: number }) => {
    const node = orgData[nodeId as keyof typeof orgData]
    const isExpanded = expandedNodes.includes(nodeId)
    const hasChildren = node.children.length > 0

    return (
      <div className="flex flex-col items-center">
        <Card className="p-4 max-w-xs hover:shadow-lg transition-shadow">
          <div className="text-center">
            <Image
              src={node.image || "/placeholder.svg"}
              alt={node.name}
              width={80}
              height={80}
              className="rounded-full mx-auto mb-3"
            />
            <h3 className="font-semibold text-gray-900">{node.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{node.position}</p>
            {hasChildren && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleNode(nodeId)}
                className="flex items-center space-x-1"
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                <span>{isExpanded ? "Collapse" : "Expand"}</span>
              </Button>
            )}
          </div>
        </Card>

        {hasChildren && isExpanded && (
          <div className="mt-8">
            <div className="w-px h-8 bg-gray-300 mx-auto"></div>
            <div className="flex justify-center space-x-8">
              {node.children.map((childId, index) => (
                <div key={childId} className="relative">
                  {index > 0 && <div className="absolute -left-4 top-0 w-8 h-px bg-gray-300"></div>}
                  <OrgNode nodeId={childId} level={level + 1} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageBanner
        title="Organization Structure"
        subtitle="Meet our dedicated team committed to serving your pilgrimage needs"
        image="/placeholder.svg?height=400&width=1200"
      />

      <div className="container mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: "About Us", href: "/about" }, { label: "Organization Structure" }]} />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Click on any position to expand and see the team structure. Our experienced professionals are dedicated to
              ensuring your pilgrimage experience is exceptional.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-max p-8">
              <OrgNode nodeId="ceo" />
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-emerald-600">Leadership Experience</h3>
              <p className="text-gray-600">
                Our leadership team brings over 50 years of combined experience in Islamic tourism, hospitality, and
                pilgrimage services.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-emerald-600">Professional Development</h3>
              <p className="text-gray-600">
                We invest in continuous training and development to ensure our team stays updated with the latest
                industry standards and Islamic guidelines.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-emerald-600">Customer Focus</h3>
              <p className="text-gray-600">
                Every team member is trained to prioritize customer satisfaction and provide personalized service to
                meet individual pilgrim needs.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Latest Projects Page
function LatestProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Digital Transformation Initiative",
      description:
        "Comprehensive upgrade of our booking system and customer portal to provide seamless digital experience.",
      image: "/placeholder.svg?height=300&width=400",
      status: "Completed",
      date: "December 2024",
      category: "Technology",
      highlights: [
        "New mobile-responsive booking platform",
        "Real-time availability tracking",
        "Integrated payment gateway",
        "Customer dashboard with document management",
      ],
    },
    {
      id: 2,
      title: "Sustainable Pilgrimage Program",
      description:
        "Environmental initiative to reduce carbon footprint and promote sustainable practices in pilgrimage travel.",
      image: "/placeholder.svg?height=300&width=400",
      status: "Ongoing",
      date: "January 2025",
      category: "Sustainability",
      highlights: [
        "Carbon offset programs for flights",
        "Eco-friendly accommodation partnerships",
        "Waste reduction initiatives",
        "Local community support programs",
      ],
    },
    {
      id: 3,
      title: "Umrah Education Center",
      description:
        "Establishment of comprehensive education centers to prepare pilgrims with proper knowledge and guidance.",
      image: "/placeholder.svg?height=300&width=400",
      status: "Planning",
      date: "March 2025",
      category: "Education",
      highlights: [
        "Interactive learning modules",
        "Virtual reality Hajj/Umrah simulation",
        "Multilingual course materials",
        "Certified instructor training program",
      ],
    },
    {
      id: 4,
      title: "Agent Network Expansion",
      description: "Strategic expansion of our agent network across Southeast Asia to better serve Muslim communities.",
      image: "/placeholder.svg?height=300&width=400",
      status: "Ongoing",
      date: "February 2025",
      category: "Business Development",
      highlights: [
        "50+ new agent partnerships",
        "Comprehensive training programs",
        "Digital tools for agents",
        "Performance tracking systems",
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Ongoing":
        return "bg-blue-100 text-blue-800"
      case "Planning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageBanner
        title="Latest Projects"
        subtitle="Discover our ongoing initiatives to enhance pilgrimage experiences and serve our community better"
        image="/placeholder.svg?height=400&width=1200"
      />

      <div className="container mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: "About Us", href: "/about" }, { label: "Latest Projects" }]} />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Innovation & Growth</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We continuously invest in projects that improve our services, embrace technology, and create positive
              impact for our pilgrims and communities.
            </p>
          </div>

          <div className="grid gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    <Badge className={`absolute top-4 left-4 ${getStatusColor(project.status)}`}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="md:col-span-2 p-8">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline">{project.category}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {project.date}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h3>
                    <p className="text-gray-600 mb-6">{project.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Highlights:</h4>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-600">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="p-8 bg-emerald-50 border-emerald-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Have a Project Idea?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We're always looking for innovative ways to improve our services. If you have suggestions or ideas for
                projects that could benefit the pilgrimage community, we'd love to hear from you.
              </p>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Mail className="mr-2 h-4 w-4" />
                Share Your Ideas
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Collaborations Page
function CollaborationsPage() {
  const collaborations = [
    {
      id: 1,
      partner: "Saudi Tourism Authority",
      type: "Government Partnership",
      description:
        "Official partnership to promote sustainable tourism and enhance pilgrim experiences in Saudi Arabia.",
      image: "/placeholder.svg?height=200&width=300",
      year: "2023",
      status: "Active",
      benefits: [
        "Streamlined visa processing",
        "Priority accommodation booking",
        "Official guide certification",
        "Emergency support services",
      ],
    },
    {
      id: 2,
      partner: "Hilton Hotels & Resorts",
      type: "Hospitality Partnership",
      description:
        "Strategic alliance to provide premium accommodation options near holy sites with special rates for pilgrims.",
      image: "/placeholder.svg?height=200&width=300",
      year: "2022",
      status: "Active",
      benefits: [
        "Exclusive pilgrim rates",
        "Priority room allocation",
        "Halal dining options",
        "24/7 concierge support",
      ],
    },
    {
      id: 3,
      partner: "Malaysia Airlines",
      type: "Aviation Partnership",
      description:
        "Preferred airline partnership offering competitive rates and enhanced services for pilgrimage flights.",
      image: "/placeholder.svg?height=200&width=300",
      year: "2021",
      status: "Active",
      benefits: ["Group booking discounts", "Extra baggage allowance", "Priority check-in", "Halal meal guarantees"],
    },
    {
      id: 4,
      partner: "Islamic Society of North America",
      type: "Community Partnership",
      description:
        "Collaboration to provide educational resources and support for Muslim communities in pilgrimage preparation.",
      image: "/placeholder.svg?height=200&width=300",
      year: "2024",
      status: "New",
      benefits: [
        "Educational workshops",
        "Community outreach programs",
        "Scholarship opportunities",
        "Cultural exchange initiatives",
      ],
    },
    {
      id: 5,
      partner: "Zam Zam Bank",
      type: "Financial Partnership",
      description: "Islamic banking partnership offering Shariah-compliant financing options for pilgrimage packages.",
      image: "/placeholder.svg?height=200&width=300",
      year: "2023",
      status: "Active",
      benefits: [
        "Interest-free payment plans",
        "Flexible financing options",
        "Travel insurance packages",
        "Currency exchange services",
      ],
    },
    {
      id: 6,
      partner: "Al-Azhar University",
      type: "Educational Partnership",
      description: "Academic collaboration for developing comprehensive Islamic education programs for pilgrims.",
      image: "/placeholder.svg?height=200&width=300",
      year: "2024",
      status: "New",
      benefits: [
        "Certified course materials",
        "Expert instructor training",
        "Research collaboration",
        "Academic accreditation",
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "New":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageBanner
        title="Collaborations"
        subtitle="Strategic partnerships that enhance our services and create value for our pilgrims"
        image="/placeholder.svg?height=400&width=1200"
      />

      <div className="container mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: "About Us", href: "/about" }, { label: "Collaborations" }]} />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Strategic Partners</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We collaborate with leading organizations worldwide to provide comprehensive, high-quality pilgrimage
              services and create meaningful experiences for our pilgrims.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {collaborations.map((collab) => (
              <Card key={collab.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={collab.image || "/placeholder.svg"}
                    alt={collab.partner}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className={`absolute top-4 right-4 ${getStatusColor(collab.status)}`}>{collab.status}</Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{collab.partner}</CardTitle>
                    <Badge variant="outline">{collab.type}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    Partnership since {collab.year}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{collab.description}</p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Partnership Benefits:</h4>
                    <ul className="space-y-2">
                      {collab.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <Handshake className="w-4 h-4 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16">
            <Card className="p-8 bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Partnership Opportunities</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  We're always open to forming new partnerships that can enhance our services and benefit the pilgrimage
                  community. If you represent an organization interested in collaboration, we'd love to explore
                  opportunities together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Handshake className="mr-2 h-4 w-4" />
                    Explore Partnership
                  </Button>
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Us
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Awards Page
function AwardsPage() {
  const awards = [
    {
      id: 1,
      title: "Best Islamic Travel Company",
      organization: "Malaysia Tourism Awards",
      year: "2024",
      category: "Excellence",
      description: "Recognized for outstanding service in Islamic tourism and pilgrimage management.",
      icon: Trophy,
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      id: 2,
      title: "Customer Service Excellence",
      organization: "Southeast Asia Travel Awards",
      year: "2023",
      category: "Service",
      description: "Awarded for exceptional customer satisfaction and service quality.",
      icon: Star,
      color: "text-blue-600 bg-blue-100",
    },
    {
      id: 3,
      title: "Innovation in Digital Services",
      organization: "Travel Technology Awards",
      year: "2023",
      category: "Technology",
      description: "Recognition for innovative digital platform and booking system.",
      icon: Award,
      color: "text-purple-600 bg-purple-100",
    },
    {
      id: 4,
      title: "Sustainable Tourism Leader",
      organization: "Green Travel Initiative",
      year: "2024",
      category: "Sustainability",
      description: "Honored for commitment to sustainable and responsible tourism practices.",
      icon: Globe,
      color: "text-green-600 bg-green-100",
    },
    {
      id: 5,
      title: "Community Impact Award",
      organization: "Islamic Chamber of Commerce",
      year: "2022",
      category: "Community",
      description: "Recognized for positive impact on Muslim communities and charitable initiatives.",
      icon: Heart,
      color: "text-red-600 bg-red-100",
    },
    {
      id: 6,
      title: "Safety Excellence Certification",
      organization: "International Travel Safety Board",
      year: "2024",
      category: "Safety",
      description: "Certified for maintaining highest safety standards in pilgrimage travel.",
      icon: Medal,
      color: "text-orange-600 bg-orange-100",
    },
    {
      id: 7,
      title: "Top Hajj Operator",
      organization: "Saudi Ministry of Hajj",
      year: "2023",
      category: "Excellence",
      description: "Official recognition as top-performing Hajj tour operator.",
      icon: Crown,
      color: "text-indigo-600 bg-indigo-100",
    },
    {
      id: 8,
      title: "Business Excellence Award",
      organization: "Malaysia Business Council",
      year: "2022",
      category: "Business",
      description: "Awarded for outstanding business practices and growth.",
      icon: Building,
      color: "text-gray-600 bg-gray-100",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <PageBanner
        title="Awards & Recognition"
        subtitle="Celebrating our achievements and commitment to excellence in Islamic tourism"
        image="/placeholder.svg?height=400&width=1200"
      />

      <div className="container mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: "About Us", href: "/about" }, { label: "Awards" }]} />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recognition & Achievements</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence has been recognized by various organizations and industry bodies. These
              awards reflect our dedication to providing exceptional pilgrimage experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award) => (
              <Card key={award.id} className="p-6 text-center hover:shadow-lg transition-shadow group">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${award.color}`}>
                  <award.icon className="w-10 h-10" />
                </div>
                <Badge variant="outline" className="mb-3">
                  {award.category}
                </Badge>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{award.title}</h3>
                <p className="text-emerald-600 font-medium mb-2">{award.organization}</p>
                <p className="text-gray-500 text-sm mb-4">{award.year}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{award.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">15+</div>
              <div className="text-gray-600">Years of Excellence</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">8</div>
              <div className="text-gray-600">Major Awards</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
              <div className="text-gray-600">Commitment to Quality</div>
            </Card>
          </div>

          <div className="mt-16">
            <Card className="p-8 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
              <div className="text-center">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-emerald-200" />
                <h3 className="text-2xl font-bold mb-4">Our Commitment Continues</h3>
                <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                  These awards motivate us to continue striving for excellence. We remain committed to providing the
                  highest quality pilgrimage services and exceeding our pilgrims' expectations.
                </p>
                <Button className="bg-white text-emerald-600 hover:bg-gray-100">
                  <Star className="mr-2 h-4 w-4" />
                  Experience Excellence
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main About Us Component with Page Router
export default function AboutUsPages() {
  const [currentPage, setCurrentPage] = useState("ceo-speech")

  const pages = {
    "ceo-speech": <CEOSpeechPage />,
    "vision-mission": <VisionMissionPage />,
    organization: <OrganizationPage />,
    projects: <LatestProjectsPage />,
    collaborations: <CollaborationsPage />,
    awards: <AwardsPage />,
  }

  const pageButtons = [
    { id: "ceo-speech", label: "CEO Speech", icon: User },
    { id: "vision-mission", label: "Vision & Mission", icon: Target },
    { id: "organization", label: "Organization", icon: Building },
    { id: "projects", label: "Latest Projects", icon: Star },
    { id: "collaborations", label: "Collaborations", icon: Handshake },
    { id: "awards", label: "Awards", icon: Award },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Navigation */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-1 py-4 overflow-x-auto">
            {pageButtons.map((page) => (
              <Button
                key={page.id}
                variant={currentPage === page.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage(page.id)}
                className={`flex items-center space-x-2 whitespace-nowrap ${
                  currentPage === page.id ? "bg-emerald-600 hover:bg-emerald-700" : ""
                }`}
              >
                <page.icon className="w-4 h-4" />
                <span>{page.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Page Content */}
      {pages[currentPage as keyof typeof pages]}
    </div>
  )
}
