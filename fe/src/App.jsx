import React from 'react'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import SettingsPage from "./pages/SettingsPage"
import { Toaster } from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore'

export default function App() {
  const { theme } = useThemeStore()

  return (
    <div data-theme={theme} className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/settings" element={<SettingsPage/>} />
          <Route path="/about" element={<AboutPage/>} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}