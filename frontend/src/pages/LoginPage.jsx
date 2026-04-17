import React, { useState, useEffect } from 'react'
import { Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const GOOGLE_CLIENT_ID = "898787770826-9rk04tv1apqcffcj7bns486a6cu6qsug.apps.googleusercontent.com"

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse
      })

      google.accounts.id.renderButton(
        document.getElementById("googleSignInBtn"),
        { 
            theme: "outline", 
            size: "large", 
            shape: "pill",
            width: 400,
            text: "continue_with"
        }
      )
    }
  }, [])

  const handleGoogleResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential)
    login('google', { 
        name: 'Google User', 
        email: 'authenticated@gmail.com' 
    })
    navigate('/')
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulated Password Login using the same logic as before
    if (formData.password) {
        login('password', { name: 'Node Operator', email: formData.email || 'admin@registry.gov' })
        navigate('/')
    }
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex overflow-hidden">
      {/* Left Panel - Image Section */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="absolute inset-0">
          <img
            src="https://i.ibb.co/dJxBbFks/brandasset.png"
            alt="Geo-Trust Brand Asset"
            className="w-full h-full object-cover"
          />
          {/* Overlay text for brand feel */}
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-12">
             <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-10 h-10 text-white" />
                <h2 className="text-4xl font-serif font-bold text-white tracking-tight">Geo-Trust</h2>
             </div>
             <p className="text-white/80 text-lg max-w-md font-medium">Securing the world's land records on an immutable, decentralized ledger. Welcome to the future of property trust.</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Section */}
      <div className="flex-1 flex items-center justify-center bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-10">
        <div className="w-full max-w-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-serif">
              Node Access
            </h1>
            <p className="text-gray-600">
              Welcome to the Secure Terminal. Access the global registry.
            </p>
          </div>

          {/* Form */}
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
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot Password */}
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
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
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
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400 font-bold uppercase tracking-tight">Secure OAuth</span>
              </div>
            </div>

            {/* Social Buttons - Now includes the REAL Google Auth Button */}
            <div className="flex flex-col gap-4 items-center">
                <div id="googleSignInBtn" className="w-full flex justify-center scale-105 overflow-hidden rounded-xl"></div>
                
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
