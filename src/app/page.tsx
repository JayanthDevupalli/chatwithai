// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { motion } from "framer-motion"
// import { Button } from "@nextui-org/react"
// import { Input } from "@nextui-org/react"

// export default function Home() {
//   const [url, setUrl] = useState("")
//   const router = useRouter()

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!url.trim()) return
//     router.push(`/${encodeURIComponent(url)}`)
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-black text-white">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md p-8 space-y-8"
//       >
//         <motion.h1
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//           className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
//         >
//           Enter URL
//         </motion.h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//           >
//             <Input
//               type="text"
//               placeholder="Enter URL..."
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
//             />
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.6, duration: 0.5 }}
//           >
//             <Button
//               type="submit"
//               className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
//             >
//               Send
//             </Button>
//           </motion.div>
//         </form>
//       </motion.div>
//     </div>
//   )
// }

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@nextui-org/react"
import { Input } from "@nextui-org/react"

export default function Home() {
  const [url, setUrl] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return
    router.push(`/${encodeURIComponent(url)}`)
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white relative">
      {/* Floating Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="fixed top-5 left-1.2 transform -translate-x-1/2 bg-gray-900 bg-opacity-90 backdrop-blur-lg shadow-lg px-8 py-4 rounded-full flex items-center space-x-8 z-50"
      >
        <span className="text-lg font-bold text-purple-400">MyApp</span>
        <button onClick={() => scrollToSection('home')} className="text-white hover:text-purple-400 transition font-medium">Home</button>
        <button onClick={() => scrollToSection('about')} className="text-white hover:text-purple-400 transition font-medium">About</button>
      </motion.nav>

      {/* Main Content */}
      <motion.div
        id="home"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 mt-32"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
        >
          Enter URL
        </motion.h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Input
              type="text"
              placeholder="Enter URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              Send
            </Button>
          </motion.div>
        </form>
      </motion.div>

      {/* About Section */}
      <section id="about" className="mt-32 text-center max-w-md p-6">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">About This App</h2>
        <p className="text-gray-400 mt-2">This application allows users to enter a URL and navigate quickly to the desired page with ease. Once a URL is submitted, a chatbot is initiated to assist users in their queries. Built with Next.js, Tailwind CSS, and Framer Motion.</p>
      </section>
    </div>
  )
}
