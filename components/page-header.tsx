"use client"

import { Music } from "lucide-react"
import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  description?: string
  image?: string
}

export default function PageHeader({ title, description, image }: PageHeaderProps) {
  const titleWords = title.split(" ")

  return (
    <div className="page-header">
      <div
        className="page-header-bg"
        style={image ? { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
      />
      <div className="page-header-pattern" />

      {/* Animated music notes */}
      <Music className="music-note text-4xl top-1/4 left-1/4" style={{ animationDelay: "0s" }} />
      <Music className="music-note text-5xl top-1/3 left-2/3" style={{ animationDelay: "2s" }} />
      <Music className="music-note text-3xl top-1/2 left-1/3" style={{ animationDelay: "4s" }} />
      <Music className="music-note text-4xl top-2/3 left-3/4" style={{ animationDelay: "6s" }} />
      <Music className="music-note text-5xl top-3/4 left-1/5" style={{ animationDelay: "8s" }} />

      <div className="page-header-content">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 flex flex-wrap justify-center gap-x-3">
          {titleWords.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1 * index,
                type: "spring",
                stiffness: 100,
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto"
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  )
}

