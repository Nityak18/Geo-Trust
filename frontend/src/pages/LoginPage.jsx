import React, { useState, useEffect } from 'react'
import { Eye, EyeOff, ArrowLeft, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

// The 5 images provided by the user — place them as:
// frontend/public/slides/slide1.jpg ... slide5.jpg
// OR use any hosted URL. For now referencing public folder paths:
const SLIDES = [
  {
    src: '/slides/slide1.jpg',
    caption: 'Digital Deed Verification',
    sub: 'Instantly verify property ownership through cryptographic blockchain records.'
  },
  {
    src: '/slides/slide2.jpg',
    caption: 'Trusted Property Transfers',
    sub: 'Secure, transparent ownership transfers backed by smart contract consensus.'
  },
  {
    src: '/slides/slide3.jpg',
    caption: 'Mortgage & Registry Approval',
    sub: 'Streamlined registration approvals — from deed to title in minutes.'
  },
  {
    src: '/slides/slide4.jpg',
    caption: 'Geo-Precise Land Mapping',
    sub: 'Pin-point exact plot boundaries with GPS accuracy on the blockchain.'
  },
  {
    src: '/slides/slide5.jpg',
    caption: 'Geo-Trust Land Registry',
    sub: 'Secure Land Records. Trusted Ownership. Powered by decentralized tech.'
  },
]

const SLIDE_INTERVAL = 4000 // 4 seconds

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const GOOGLE_CLIENT_ID = "898787770826-9rk04tv1apqcffcj7bns486a6cu6qsug.apps.googleusercontent.com"

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentSlide(prev => (prev + 1) % SLIDES.length)
    }, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse
      })
      google.accounts.id.renderButton(
        document.getElementById("googleSignInBtn"),
        { theme: "outline", size: "large", shape: "pill", width: 400, text: "continue_with" }
      )
    }
  }, [])

  const handleGoogleResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential)
    login('google', { name: 'Google User', email: 'authenticated@gmail.com' })
    navigate('/')
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password) {
      login('password', { name: 'Node Operator', email: formData.email || 'admin@registry.gov' })
      navigate('/')
    }
  }

  const goToSlide = (idx) => {
    setDirection(idx > currentSlide ? 1 : -1)
    setCurrentSlide(idx)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length)
  }

  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide(prev => (prev + 1) % SLIDES.length)
  }

  // Slide animation variants
  const variants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <div className="h-screen w-screen bg-black flex overflow-hidden">
      
      {/* ─── LEFT PANEL: Image Slideshow ─── */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-black">
        
        {/* Back button */}
        <div className="absolute top-6 left-6 z-20">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/60 transition-all border border-white/10"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Slides */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 }
            }}
            className="absolute inset-0"
          >
            <img
              src={SLIDES[currentSlide].src}
              alt={SLIDES[currentSlide].caption}
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Caption overlay — slides in from bottom */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`caption-${currentSlide}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute bottom-0 left-0 right-0 p-10 z-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-8 h-8 text-white drop-shadow" />
              <h2 className="text-2xl font-serif font-bold text-white tracking-tight drop-shadow-lg">
                Geo-Trust
              </h2>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 drop-shadow">
              {SLIDES[currentSlide].caption}
            </h3>
            <p className="text-white/80 text-sm max-w-sm font-medium leading-relaxed">
              {SLIDES[currentSlide].sub}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentSlide
                  ? 'w-6 h-2 bg-white'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ─── RIGHT PANEL: Login Form ─── */}
      <div className="flex-1 flex items-center justify-center bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-10">
        <div className="w-full max-w-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-serif">Node Access</h1>
            <p className="text-gray-600">Welcome to the Secure Terminal. Access the global registry.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Terminal Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@geo-trust.gov.in"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50/50"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Node Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="********"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot credentials?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"
            >
              Unlock Registry
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400 font-bold uppercase tracking-tight">Secure OAuth</span>
              </div>
            </div>

            {/* Google Auth */}
            <div className="flex flex-col gap-4 items-center">
              <div id="googleSignInBtn" className="w-full flex justify-center scale-105 overflow-hidden rounded-xl" />
              <p className="text-[10px] text-gray-400 text-center px-4">
                Your identity is verified against the global decentralized authority. OAuth sessions are cryptographically bound to the node instance.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
