"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

import PageHeader from "@/components/page-header"
import AnimatedSection from "@/components/animated-section"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const galleryImages = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    src: `/placeholder.svg?height=800&width=1200&text=Photo+${i + 1}`,
    alt: `Photo de l&#39;Harmonie ${i + 1}`,
    year: 2024 - Math.floor(i / 3),
    event: ["Concert d&#39;été", "Festival des Remparts", "Concert de Noël", "Fête de la musique"][i % 4],
  }))

  const categories = ["Tous", "Concerts", "Répétitions", "Cérémonies", "Événements"]
  const [activeCategory, setActiveCategory] = useState("Tous")

  const filteredImages =
    activeCategory === "Tous" ? galleryImages : galleryImages.filter((img) => img.event.includes(activeCategory))

  return (
    <div className="flex flex-col">
      <PageHeader title="Galerie photos" description="Découvrez nos concerts et événements en images" />

      <section className="py-16 md:py-24">
        <div className="container px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">Nos souvenirs en images</h2>
            <p className="section-subtitle">
              Revivez les moments forts de l&#39;Harmonie de Montreuil-sur-Mer à travers notre galerie photos
            </p>
          </AnimatedSection>

          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    activeCategory === category ? "bg-primary text-white" : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <AnimatedSection key={image.id} delay={0.05 * index} className="card-hover">
                <div
                  className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                  onClick={() => setSelectedImage(image.id)}
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover transition-all duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{image.event}</span>
                      <span className="text-primary">{image.year}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
            <span className="sr-only">Fermer</span>
          </button>

          <div className="max-w-5xl w-full max-h-[80vh]">
            <div className="relative aspect-[4/3]">
              <Image
                src={galleryImages.find((img) => img.id === selectedImage)?.src || ""}
                alt={galleryImages.find((img) => img.id === selectedImage)?.alt || ""}
                fill
                className="object-contain"
              />
            </div>
            <div className="bg-white p-4 rounded-b-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold">{galleryImages.find((img) => img.id === selectedImage)?.event}</span>
                <span className="text-primary">{galleryImages.find((img) => img.id === selectedImage)?.year}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

