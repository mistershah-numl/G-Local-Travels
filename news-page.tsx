"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TestimonialsCarousel from "./news-testimonials"
import PictureGallery from "./picture-gallery"

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState("testimonials")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Media</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Explore testimonials from our pilgrims and browse our gallery of memorable moments
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="testimonials" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="gallery">Picture Gallery</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="testimonials" className="mt-0">
            <TestimonialsCarousel />
          </TabsContent>

          <TabsContent value="gallery" className="mt-0">
            <PictureGallery />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
