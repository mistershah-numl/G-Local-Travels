"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { MapPin, Clock, Phone, Mail, Send, MessageSquare, CheckCircle, AlertCircle, ExternalLink, Star, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

const officeLocations = [
  {
    id: "hq",
    name: "Headquarters - Kuala Lumpur",
    address: "Level 15, Menara XYZ, Jalan Sultan Ismail, 50250 Kuala Lumpur, Malaysia",
    phone: "+60 3-2141 6789",
    email: "info@glocal.com.my",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.7711580636774!2d101.70762!3d3.1569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc37d12d669c1f%3A0x9e3afdd17c8a9056!2sKuala%20Lumpur%20City%20Centre!5e0!3m2!1sen!2smy!4v1622021234567!5m2!1sen!2smy",
    whatsapp: "+60123456789",
  },
  {
    id: "penang",
    name: "Penang Branch",
    address: "Unit 5-2, Wisma ABC, Jalan Burma, 10050 Georgetown, Penang, Malaysia",
    phone: "+60 4-2291 4567",
    email: "penang@glocal.com.my",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.0225454233706!2d100.30923!3d5.41991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac3e334c6e2b1%3A0xc4c91a411c1f2e56!2sGeorgetown%2C%20Penang!5e0!3m2!1sen!2smy!4v1622021234567!5m2!1sen!2smy",
    whatsapp: "+60123456790",
  },
  {
    id: "johor",
    name: "Johor Bahru Branch",
    address: "Block D-3-5, Southkey Mosaic, Jalan Bakar Batu, 80150 Johor Bahru, Johor, Malaysia",
    phone: "+60 7-3381 2345",
    email: "johor@glocal.com.my",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.4752756070995!2d103.76382!3d1.46589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da12c6d36b3a27%3A0x8b4c64f2c5cb3a89!2sJohor%20Bahru%2C%20Johor!5e0!3m2!1sen!2smy!4v1622021234567!5m2!1sen!2smy",
    whatsapp: "+60123456791",
  },
]

const faqs = [
  {
    question: "How do I book an Umrah package?",
    answer: "You can book an Umrah package through our website by selecting your preferred package and following the booking wizard. Alternatively, you can visit any of our offices or contact our customer service team for assistance.",
  },
  {
    question: "What documents are required for Umrah?",
    answer: "For Umrah, you'll need a valid passport with at least 6 months validity, passport-sized photographs with white background, vaccination certificates, and a completed application form. Our team will guide you through the entire documentation process.",
  },
  {
    question: "How far in advance should I book my Umrah package?",
    answer: "We recommend booking your Umrah package at least 3-6 months in advance, especially during peak seasons (Ramadan, school holidays). This ensures better availability and potentially lower prices.",
  },
  {
    question: "Do you offer payment plans for Hajj and Umrah packages?",
    answer: "Yes, we offer flexible payment plans for our Hajj and Umrah packages. You can pay in installments with an initial deposit to secure your booking. Please contact our office for specific payment plan options.",
  },
  {
    question: "Can I customize my travel package?",
    answer: "We offer customization options for our travel packages. You can extend your stay, upgrade your accommodation, or add additional destinations to your itinerary. Contact our travel consultants to discuss your specific requirements.",
  },
]

export default function ContactUsPage() {
  const [activeOffice, setActiveOffice] = useState(officeLocations[0])
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormStatus("submitting")
    setTimeout(() => {
      console.log(values)
      setFormStatus("success")
      form.reset()
      setTimeout(() => {
        setFormStatus("idle")
      }, 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
        <Sparkles className="absolute top-1/4 left-1/3 w-4 h-4 text-amber-400 animate-spin" />
        <Star className="absolute bottom-1/4 right-1/4 w-3 h-3 text-yellow-300 animate-pulse" />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-yellow-500/10 to-amber-600/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent animate-pulse">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              We're here to help with your travel needs. Reach out to our team for assistance with bookings, inquiries, or feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-amber-500/30 shadow-2xl shadow-amber-500/20">
                <CardHeader className="border-b border-amber-500/20">
                  <CardTitle className="text-3xl bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                    Send Us a Message
                  </CardTitle>
                  <CardDescription className="text-white/70 text-lg">
                    Fill out the form below and our team will get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {formStatus === "success" && (
                    <Alert className="mb-6 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-400/50">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <AlertTitle className="text-green-300">Message Sent Successfully!</AlertTitle>
                      <AlertDescription className="text-green-200">
                        Thank you for contacting us. Our team will respond to your inquiry shortly.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-medium">Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your name"
                                  {...field}
                                  className="bg-black/50 border-amber-500/30 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400/20"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-medium">Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="your.email@example.com"
                                  {...field}
                                  className="bg-black/50 border-amber-500/30 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400/20"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-medium">Phone Number (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+60 12 345 6789"
                                  {...field}
                                  className="bg-black/50 border-amber-500/30 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400/20"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-medium">Subject</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="How can we help you?"
                                  {...field}
                                  className="bg-black/50 border-amber-500/30 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400/20"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium">Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please provide details about your inquiry..."
                                className="min-h-[150px] bg-black/50 border-amber-500/30 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-black font-bold py-3 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-amber-500/25"
                        disabled={formStatus === "submitting"}
                      >
                        {formStatus === "submitting" ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span> Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" /> Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* FAQs Section */}
              <div className="mt-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-gradient-to-r from-gray-900/80 to-black/80 border border-amber-500/20 rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left text-white hover:text-amber-300 transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/80">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Office Locations */}
            <div>
              <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-amber-500/30 shadow-2xl shadow-amber-500/20">
                <CardHeader className="border-b border-amber-500/20">
                  <CardTitle className="text-2xl bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                    Our Offices
                  </CardTitle>
                  <CardDescription className="text-white/70">Visit us at any of our locations</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs
                    defaultValue={activeOffice.id}
                    onValueChange={(value) =>
                      setActiveOffice(officeLocations.find((o) => o.id === value) || officeLocations[0])
                    }
                  >
                    <TabsList className="w-full grid grid-cols-3 bg-black/50 border-amber-500/20">
                      {officeLocations.map((office) => (
                        <TabsTrigger
                          key={office.id}
                          value={office.id}
                          className="text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-yellow-500 data-[state=active]:text-black text-white/70"
                        >
                          {office.name.split(" - ")[1] || office.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {officeLocations.map((office) => (
                      <TabsContent key={office.id} value={office.id} className="p-6">
                        <div className="space-y-4">
                          {/* Map */}
                          <div className="w-full h-[200px] rounded-md overflow-hidden border border-amber-500/30">
                            <iframe
                              src={office.mapUrl}
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen={false}
                              loading="lazy"
                              title={`Map to ${office.name}`}
                            ></iframe>
                          </div>

                          {/* Office Details */}
                          <div className="space-y-3">
                            <h3 className="font-semibold text-lg text-white">{office.name}</h3>
                            <div className="flex items-start space-x-3">
                              <MapPin className="h-5 w-5 text-amber-400 mt-0.5" />
                              <p className="text-sm text-white/80">{office.address}</p>
                            </div>
                            <div className="flex items-start space-x-3">
                              <Clock className="h-5 w-5 text-amber-400 mt-0.5" />
                              <p className="text-sm text-white/80 whitespace-pre-line">{office.hours}</p>
                            </div>

                            <Separator className="bg-amber-500/20" />

                            {/* Quick Contact Options */}
                            <div className="pt-2 space-y-3">
                              <Button
                                variant="outline"
                                className="w-full justify-start bg-black/50 border-amber-500/30 text-white hover:bg-amber-600/20 hover:border-amber-400"
                                asChild
                              >
                                <a href={`tel:${office.phone.replace(/\s+/g, "")}`}>
                                  <Phone className="mr-2 h-4 w-4 text-amber-400" />
                                  {office.phone}
                                </a>
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full justify-start bg-black/50 border-amber-500/30 text-white hover:bg-amber-600/20 hover:border-amber-400"
                                asChild
                              >
                                <a href={`mailto:${office.email}`}>
                                  <Mail className="mr-2 h-4 w-4 text-amber-400" />
                                  {office.email}
                                </a>
                              </Button>
                              <Button
                                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transform hover:scale-105 transition-all duration-300"
                                asChild
                              >
                                <a href={`https://wa.me/${office.whatsapp}`} target="_blank" rel="noopener noreferrer">
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  WhatsApp Us
                                </a>
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full bg-black/50 border-amber-500/30 text-white hover:bg-amber-600/20 hover:border-amber-400"
                                asChild
                              >
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Get Directions
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>

              {/* Quick Contact Card */}
              <Card className="mt-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-amber-500/30 shadow-2xl shadow-amber-500/20">
                <CardHeader className="border-b border-amber-500/20">
                  <CardTitle className="text-xl bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                    Need Immediate Assistance?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <Button
                    className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-black font-bold transform hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <a href="tel:+60123456789">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Customer Service
                    </a>
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transform hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <a href="https://wa.me/60123456789" target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      WhatsApp Support
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-black/50 border-amber-500/30 text-white hover:bg-amber-600/20 hover:border-amber-400"
                    asChild
                  >
                    <a href="mailto:support@glocal.com.my">
                      <Mail className="mr-2 h-4 w-4" />
                      Email Support Team
                    </a>
                  </Button>
                </CardContent>
                <CardFooter className="text-sm text-white/60 border-t border-amber-500/20 pt-4">
                  <p>Our customer service team is available Monday to Friday, 9AM - 6PM MYT</p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 mt-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-yellow-500/10 to-amber-600/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
            Ready to Plan Your Journey?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Explore our packages and start planning your next spiritual journey with Glocal Travel.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-black font-bold px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-amber-500/25"
              size="lg"
              asChild
            >
              <Link href="/packages">Browse Packages</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-black/50 border-amber-500/30 text-white hover:bg-amber-600/20 hover:border-amber-400 px-8 py-3 transform hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link href="/agent-enrollment">Become an Agent</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
