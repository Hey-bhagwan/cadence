"use client";

import { motion } from "framer-motion";
import { Brain, Clock, Bell } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] text-[#1A202C] flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 md:px-12 py-4 bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <Link href="/" className="text-2xl font-semibold tracking-tight">
          Cadence
        </Link>
        <nav className="hidden md:flex space-x-8 text-gray-600">
          <Link href="#features" className="hover:text-[#1A202C] transition">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-[#1A202C] transition">
            Pricing
          </Link>
          <Link href="#about" className="hover:text-[#1A202C] transition">
            About
          </Link>
        </nav>
        <Link
          href="/protected/dashboard"
          className="bg-[#4FD1C5] hover:bg-[#38B2AC] text-white font-medium px-5 py-2 rounded-xl shadow-md transition"
        >
          Get Started
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 md:py-32">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Stop Planning, Start Doing.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Cadence is your intelligent partner that turns complex projects into simple, actionable steps.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            href="/protected/dashboard"
            className="bg-[#4FD1C5] hover:bg-[#38B2AC] text-white text-lg px-8 py-3 rounded-2xl shadow-md transition"
          >
            Get Started for Free
          </Link>
        </motion.div>

        {/* Abstract Visual */}
        <motion.div
          className="relative mt-16 w-full max-w-3xl h-64 bg-gradient-to-br from-[#E6FFFA] to-[#F7FAFC] rounded-3xl shadow-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-[#4FD1C5]/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute w-24 h-24 bg-[#F6AD55]/30 rounded-full blur-2xl animate-ping"></div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#1A202C]/70">
            <div className="grid grid-cols-3 gap-6">
              <div className="w-16 h-12 bg-white/60 rounded-xl shadow-sm"></div>
              <div className="w-16 h-12 bg-white/60 rounded-xl shadow-sm"></div>
              <div className="w-16 h-12 bg-white/60 rounded-xl shadow-sm"></div>
            </div>
            <p className="text-sm mt-6 italic">AI-powered productivity at a glance</p>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 md:px-16 py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">Key Features</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Designed to help you plan smarter, work faster, and build better habits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="rounded-2xl shadow-md border-none bg-[#F7FAFC] hover:shadow-lg transition p-8 text-center">
            <Brain className="w-10 h-10 mx-auto mb-4 text-[#4FD1C5]" />
            <h3 className="text-xl font-semibold mb-2">AI Task Chunking</h3>
            <p className="text-gray-600">
              Breaks down your complex projects into achievable micro-tasks automatically.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-2xl shadow-md border-none bg-[#F7FAFC] hover:shadow-lg transition p-8 text-center">
            <Clock className="w-10 h-10 mx-auto mb-4 text-[#4FD1C5]" />
            <h3 className="text-xl font-semibold mb-2">Habit Analysis</h3>
            <p className="text-gray-600">
              Learns from your routines and recommends ways to improve your focus and timing.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-2xl shadow-md border-none bg-[#F7FAFC] hover:shadow-lg transition p-8 text-center">
            <Bell className="w-10 h-10 mx-auto mb-4 text-[#4FD1C5]" />
            <h3 className="text-xl font-semibold mb-2">Smart Notifications</h3>
            <p className="text-gray-600">
              Notifies you intelligently when it’s the best time to act, not just when it’s scheduled.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 border-t border-gray-200 text-sm">
        © {new Date().getFullYear()} Cadence. All rights reserved.
      </footer>
    </div>
  );
}
