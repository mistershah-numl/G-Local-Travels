"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { MapPin, Clock, Phone, Mail, Send, MessageSquare, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"

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
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.7711580636774!2d101.70762!3d3.1569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc37d12d669c1f%3A0x9e3afdd17c8a9056!2sKuala%20Lumpur%20City%20Centre!5e0!3m2!1sen!2smy!4v1622021234567!5m2!1sen!2smy",
    whatsapp: "+60123456789",
  },
  {
    id: "penang",
    name: "Penang Branch",
    address: "Unit 5-2, Wisma ABC, Jalan Burma, 10050 Georgetown, Penang, Malaysia",
    phone: "+60 4-2291 4567",
    email: "penang@glocal.com.my",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.0225454233706!2d100.30923!3d5.41991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac3e334c6e2b1%3A0xc4c91a411c1f2e56!2sGeorgetown%2C%20Penang!5e0!3m2!1sen!2smy!4v1622021234567!5m2!1sen!2smy",
    whatsapp: "+60123456790",
  },
  {
    id: "johor",
    name: "Johor Bahru Branch",
    address: "Block D-3-5, Southkey Mosaic, Jalan Bakar Batu, 80150 Johor Bahru, Johor, Malaysia",
    phone: "+60 7-3381 2345",
    email: "johor@glocal.com.my",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.4752756070995!2d103.76382!3d1.46589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da12c6d36b3a27%3A0x8b4c64f2c5cb3a89!2sJohor%20Bahru%2C%20Johor!5e0!3m2!1sen!2smy!4v1622021234567!5m2!1sen!2smy",
    whatsapp: "+60123456791",
  },
]

const faqs = [
  {
    question: "How do I book an Umrah package?",
    answer:
      "You can book an Umrah package through our website by selecting your preferred package and following the booking wizard. Alternatively, you can visit any of our offices or contact our customer service team for assistance.",
  },
  {
    question: "What documents are required for Umrah?",
    answer:
      "For Umrah, you'll need a valid passport with at least 6 months validity, passport-sized photographs with white background, vaccination certificates, and a completed application form. Our team will guide you through the entire documentation process.",
  },
  {
    question: "How far in advance should I book my Umrah package?",
    answer:
      "We recommend booking your Umrah package at least 3-6 months in advance, especially during peak seasons (Ramadan, school holidays). This ensures better availability and potentially lower prices.",
  },
  {
    question: "Do you offer payment plans for Hajj and Umrah packages?",
    answer:
      "Yes, we offer flexible payment plans for our Hajj and Umrah packages. You can pay in installments with an initial deposit to secure your booking. Please contact our office for specific payment plan options.",
  },
  {
    question: "Can I customize my travel package?",
    answer:
      "We offer customization options for our travel packages. You can extend your stay, upgrade your accommodation, or add additional destinations to your itinerary. Contact our travel consultants to discuss your specific requirements.",
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

    // Simulate form submission
    setTimeout(() => {
      console.log(values)
      setFormStatus("success")
      form.reset()

      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus("idle")
      }, 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl opacity-90">
              We're here to help with your travel needs. Reach out to our team for assistance with bookings, inquiries,
              or feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and our team will get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {formStatus === "success" && (
                    <Alert className="mb-6 bg-green-50 border-green-200">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <AlertTitle className="text-green-800">Message Sent Successfully!</AlertTitle>
                      <AlertDescription className="text-green-700">
                        Thank you for contacting us. Our team will respond to your inquiry shortly.
                      </AlertDescription>
                    </Alert>
                  )}

                  {formStatus === "error" && (
                    <Alert className="mb-6 bg-red-50 border-red-200">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <AlertTitle className="text-red-800">Something went wrong!</AlertTitle>
                      <AlertDescription className="text-red-700">
                        There was an error sending your message. Please try again or contact us directly.
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
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="your.email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
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
                              <FormLabel>Phone Number (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="+60 12 345 6789" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="How can we help you?" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please provide details about your inquiry..."
                                className="min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                        disabled={formStatus === "submitting"}
                      >
                        {formStatus === "submitting" ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span> Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" /> Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* FAQs Section */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Office Locations */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Our Offices</CardTitle>
                  <CardDescription>Visit us at any of our locations</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs
                    defaultValue={activeOffice.id}
                    onValueChange={(value) =>
                      setActiveOffice(officeLocations.find((o) => o.id === value) || officeLocations[0])
                    }
                  >
                    <TabsList className="w-full grid grid-cols-3">
                      {officeLocations.map((office) => (
                        <TabsTrigger key={office.id} value={office.id} className="text-xs sm:text-sm">
                          {office.name.split(" - ")[1] || office.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {officeLocations.map((office) => (
                      <TabsContent key={office.id} value={office.id} className="p-4">
                        <div className="space-y-4">
                          {/* Map */}
                          <div className="w-full h-[200px] rounded-md overflow-hidden border border-gray-200">
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
                            <h3 className="font-semibold text-lg">{office.name}</h3>

                            <div className="flex items-start space-x-3">
                              <MapPin className="h-5 w-5 text-emerald-600 mt-0.5" />
                              <p className="text-sm text-gray-600">{office.address}</p>
                            </div>

                            <div className="flex items-start space-x-3">
                              <Clock className="h-5 w-5 text-emerald-600 mt-0.5" />
                              <p className="text-sm text-gray-600 whitespace-pre-line">{office.hours}</p>
                            </div>

                            <Separator />

                            {/* Quick Contact Options */}
                            <div className="pt-2 space-y-3">
                              <Button variant="outline" className="w-full justify-start" asChild>
                                <a href={`tel:${office.phone.replace(/\s+/g, "")}`}>
                                  <Phone className="mr-2 h-4 w-4 text-emerald-600" />
                                  {office.phone}
                                </a>
                              </Button>

                              <Button variant="outline" className="w-full justify-start" asChild>
                                <a href={`mailto:${office.email}`}>
                                  <Mail className="mr-2 h-4 w-4 text-emerald-600" />
                                  {office.email}
                                </a>
                              </Button>

                              <Button className="w-full bg-green-500 hover:bg-green-600" asChild>
                                <a href={`https://wa.me/${office.whatsapp}`} target="_blank" rel="noopener noreferrer">
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  WhatsApp Us
                                </a>
                              </Button>

                              <Button variant="outline" className="w-full" asChild>
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
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-xl">Need Immediate Assistance?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                    <a href="tel:+60123456789">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Customer Service
                    </a>
                  </Button>

                  <Button className="w-full bg-green-500 hover:bg-green-600" asChild>
                    <a href="https://wa.me/60123456789" target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      WhatsApp Support
                    </a>
                  </Button>

                  <Button variant="outline" className="w-full" asChild>
                    <a href="mailto:support@glocal.com.my">
                      <Mail className="mr-2 h-4 w-4" />
                      Email Support Team
                    </a>
                  </Button>
                </CardContent>
                <CardFooter className="text-sm text-gray-500 border-t pt-4">
                  <p>Our customer service team is available Monday to Friday, 9AM - 6PM MYT</p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-50 py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Plan Your Journey?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our packages and start planning your next spiritual journey with Glocal Travel.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-emerald-600 hover:bg-emerald-700" size="lg" asChild>
              <Link href="/packages">Browse Packages</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/agent-enrollment">Become an Agent</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
