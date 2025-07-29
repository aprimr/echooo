"use client";

import type React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiMessageSquare,
  FiLock,
  FiUsers,
  FiMenu,
  FiX,
  FiCheck,
  FiArrowRight,
  FiPlay,
  FiShield,
  FiZap,
  FiHeart,
  FiSmartphone,
  FiStar,
} from "react-icons/fi";
import { FaAngleUp } from "react-icons/fa";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import useAuthStore from "../../store/auth";

type FAQProps = {
  openFaq: number | null;
  toggleFaq: (index: number) => void;
};

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const navigate = useNavigate();
  const { user } = useAuthStore();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white text-slate-700 min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-blue-100/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <span
                onClick={() => navigate("/")}
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-500 bg-clip-text cursor-pointer text-transparent"
              >
                echooo
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#about"
                className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#features"
                className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              {!user ? (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:via-blue-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg cursor-pointer"
                >
                  Get Started
                </button>
              ) : (
                <button
                  onClick={() => navigate("/app/home")}
                  className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:via-blue-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg cursor-pointer"
                >
                  Continue To Echooo
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 p-2"
              >
                {isMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-blue-100/50 bg-white/95 backdrop-blur-xl">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="#"
                  className="block px-3 py-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="block px-3 py-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#features"
                  className="block px-3 py-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
                {!user ? (
                  <button
                    className="block mx-3 mt-4 w-[calc(100%-1.5rem)] bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold text-center hover:shadow-lg transition-all duration-200"
                    onClick={() => navigate("/login")}
                  >
                    Get Started
                  </button>
                ) : (
                  <button
                    className="block mx-3 mt-4 w-[calc(100%-1.5rem)] bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold text-center hover:shadow-lg transition-all duration-200"
                    onClick={() => navigate("/app/home")}
                  >
                    Continue To Echooo
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <FAQ openFaq={openFaq} toggleFaq={toggleFaq} />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;

const Hero: React.FC = () => {
  return (
    <section id="#" className="relative overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
              <FiZap className="w-4 h-4 mr-2" />
              Now with AI-powered features
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6">
              Connect.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                Chat.
              </span>{" "}
              Enjoy.
            </h1>

            <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
              Chat freely and securely with echooo — where real conversations
              happen in a clean, safe space.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <NavLink
                to="/login"
                className="group bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
              >
                Start Chatting Now
                <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </NavLink>
              <a
                href="#about"
                className="group border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 flex items-center justify-center"
              >
                <FiPlay className="mr-2 w-5 h-5 transition-all duration-500" />
                Explore
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 text-center lg:text-left cursor-default">
              {[
                { data: "1K+", text: "Active Users" },
                { data: "500+", text: "Groups" },
                { data: "20K+", text: "Messages Daily" },
              ].map((item) => (
                <div key={item.data} className="group">
                  <div className="text-3xl sm:text-4xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                    {item.data}
                  </div>
                  <div className="text-sm text-slate-600 font-poppins">
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Box */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-3xl blur-3xl opacity-30 transform rotate-6 scale-105"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl px-8 pb-8 pt-4 max-w-md border border-white/20">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-slate-500 font-poppins font-medium">
                      echooo
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 rounded-full"></div>
                      <div>
                        <div className="h-3 bg-slate-200 rounded w-20"></div>
                        <div className="h-2 bg-slate-200/50 rounded w-16 mt-1"></div>
                      </div>
                    </div>
                    <div className="bg-slate-200 text-slate-700 p-3 rounded-2xl rounded-bl-sm font-poppins w-fit">
                      Hey! Welcome to echooo... 👋
                    </div>
                    <div className="flex items-center justify-end space-x-3">
                      <div>
                        <div className="h-3 bg-slate-200 rounded w-24"></div>
                        <div className="h-2 bg-slate-200/50 rounded w-20 mt-1"></div>
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 via-emerald-400 to-emerald-300 rounded-full"></div>
                    </div>
                    <div className="bg-blue-500 text-white py-3 px-4 rounded-2xl rounded-br-sm w-fit font-poppins ml-auto">
                      Yooo! This chat app is fun 😍
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 rounded-full"></div>
                      <div>
                        <div className="h-3 bg-slate-200 rounded w-20"></div>
                        <div className="h-2 bg-slate-200/50 rounded w-16 mt-1"></div>
                      </div>
                    </div>
                    <div className="bg-slate-200 text-slate-700 p-3 rounded-2xl rounded-bl-sm font-poppins w-fit">
                      Haha I knew you'd love it! 🚀
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent ">
              echooo
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto lg:mx-0">
            echooo is a modern chat app designed to help you connect instantly
            with friends, family, and communities — all while prioritizing your
            privacy and ease of use.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Features */}
          <div className="space-y-10">
            <div className="flex items-start space-x-4">
              <div className="p-4 bg-blue-100 rounded-xl text-blue-600">
                <FiZap className="w-7 h-7" />
              </div>
              <div className="">
                <h3 className="text-2xl font-semibold text-left text-slate-900 mb-2">
                  Instant Sign-In
                </h3>
                <p className="text-slate-600 text-left leading-relaxed">
                  Start chatting immediately by signing in quickly with Google —
                  no hassle, no waiting.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-4 bg-purple-100 rounded-xl text-purple-600">
                <FiUsers className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-left text-slate-900 mb-2">
                  Groups & Private Chats
                </h3>
                <p className="text-slate-600 text-left leading-relaxed">
                  Create or join public rooms, private groups with friends, or
                  direct message individuals — all in one place.
                </p>
              </div>
            </div>
          </div>

          {/* Right Features */}
          <div className="space-y-10">
            <div className="flex items-start space-x-4">
              <div className="p-4 bg-green-100 rounded-xl text-green-600">
                <FiShield className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-left text-slate-900 mb-2">
                  Privacy & Security
                </h3>
                <p className="text-slate-600 text-left leading-relaxed">
                  Your messages are encrypted and your data stays yours. We
                  never share or sell your information.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-4 bg-orange-100 rounded-xl text-orange-600">
                <FiHeart className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-left text-slate-900 mb-2">
                  Minimal & Intuitive UI
                </h3>
                <p className="text-slate-600 text-left leading-relaxed">
                  A clean, easy-to-use interface designed to keep your
                  conversations flowing smoothly without distractions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="py-20 sm:py-28 bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full text-yellow-700 text-sm font-medium mb-6">
            <FiStar className="w-4 h-4 mr-2" />
            Powerful Features
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Everything you need for{" "}
            <span className="bg-gradient-to-r from-yellow-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              seamless communication
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            echooo delivers secure, fun, and intelligent chat experiences —
            public groups, private encrypted messages, and a built-in AI
            assistant.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Public Chat Rooms */}
          <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FiMessageSquare className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Public Chat Rooms
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Join echooo group where you can meet new people, share ideas, and
              have real-time conversations.
            </p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center">
                <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                Unlimited participants & topics
              </li>
              <li className="flex items-center">
                <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                Only text messages
              </li>
              <li className="flex items-center">
                <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                Instant message updates
              </li>
            </ul>
          </div>

          {/* Private Messages */}
          <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100">
            <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FiLock className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Private Direct Messages
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Chat securely with your friends or colleagues — all messages are
              encrypted for your privacy.
            </p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center">
                <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                Messages encryption
              </li>
              <li className="flex items-center">
                <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                Read receipts & typing indicators
              </li>
              <li className="flex items-center">
                <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                Message delete & edit options
              </li>
            </ul>
          </div>

          {/* Custom Rooms */}
          <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FiUsers className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Custom Private Rooms
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Build private spaces for your teams, friends, or communities with
              full control over access and moderation.
            </p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center">
                <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                Easy members invite
              </li>
              <li className="flex items-center">
                <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                Private chats
              </li>
            </ul>
          </div>

          {/* AI Assistant */}
          <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100">
            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FiZap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              AI Chat Assistant
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Stuck or curious? Just mention{" "}
              <span className="font-semibold text-blue-500">@ai</span> in the
              chat — get instant answers and smart support.
            </p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center">
                <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                Real-time translations
              </li>
              <li className="flex items-center">
                <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                Smart reply suggestions
              </li>
            </ul>
          </div>

          {/* Cross-Platform */}
          <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100">
            <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FiSmartphone className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              All-Devices Support
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Chat seamlessly on any device with just your browser — no
              installs, no hassles. Echooo is always just a tab away.
            </p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center">
                <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                Works on all browsers
              </li>
              <li className="flex items-center">
                <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                Optimized for mobile, tablet, and desktop
              </li>
              <li className="flex items-center">
                <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                Access your chats anywhere, anytime
              </li>
            </ul>
          </div>

          {/* Security */}
          <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100">
            <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FiShield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Simple & Secure
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Your data is safe with us — SOC 2 compliant, GDPR ready, with
              regular audits and strict privacy policies.
            </p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center">
                <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                Encrypted DMs
              </li>
              <li className="flex items-center">
                <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                Regular security checks
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6">
            <FiPlay className="w-4 h-4 mr-2" />
            Simple Process
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Get started in{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              3 easy steps
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join thousands of users who are already enjoying seamless
            conversations on echooo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="text-center group">
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300 transform group-hover:-translate-y-2">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-px h-10 bg-gradient-to-b from-blue-500 to-transparent hidden md:block"></div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Sign Up</h3>
            <p className="text-slate-600 leading-relaxed font-poppins">
              Create your account in seconds with google. No complex setup
              required.
            </p>
          </div>

          <div className="text-center group">
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl group-hover:shadow-green-500/25 transition-all duration-300 transform group-hover:-translate-y-2">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-px h-10 bg-gradient-to-b from-green-500 to-transparent hidden md:block"></div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Join Rooms
            </h3>
            <p className="text-slate-600 leading-relaxed font-poppins">
              Start chatting in a public echooo group, or create private groups.
            </p>
          </div>

          <div className="text-center group">
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-pink-400 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-300 transform group-hover:-translate-y-2">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-px h-10 bg-gradient-to-b from-pink-500 to-transparent hidden md:block"></div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Start Chatting
            </h3>
            <p className="text-slate-600 leading-relaxed font-poppins">
              Chat in the public room, start group chats, or send direct
              messages — all in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ: React.FC<FAQProps> = ({ openFaq, toggleFaq }) => {
  return (
    <section className="py-20 sm:py-28 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-700 text-sm font-medium mb-6">
            <FiMessageSquare className="w-4 h-4 mr-2" />
            FAQ
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              questions
            </span>
          </h2>

          <p className="text-xl text-slate-600">
            Everything you need to know about echooo.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              question: "Is echooo free to use?",
              answer:
                "Yes! echooo is a 100% free web app. Just log in and start chatting—no downloads or credit cards needed.",
            },
            {
              question: "How does the public chat work?",
              answer:
                "When you log in, you’re automatically added to the global echooo public group. You can start chatting right away.",
            },
            {
              question: "Can I create private group chats?",
              answer:
                "Yes. You can easily create private rooms and invite friends to chat together securely.",
            },
            {
              question: "Are direct messages secure?",
              answer:
                "Absolutely. All one-on-one chats are encrypted to keep your conversations private.",
            },
            {
              question: "What can the AI assistant do?",
              answer:
                "Tag @ai in any chat to get smart replies, instant translations, summaries, and more. It’s built into every room.",
            },
            {
              question: "Do I need to install anything?",
              answer:
                "No. echooo runs directly in your browser on any device. You can also use it on mobile with full sync.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-slate-100"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200 rounded-2xl  cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-semibold text-slate-900">
                  {faq.question}
                </span>
                <div
                  className={`transform transition-transform duration-200 ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              {openFaq === index && (
                <div className="px-6 pb-4 cursor-default">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to chat?</h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-5xl mx-auto">
          Join echooo — where you can chat in the public room, connect with
          friends in groups, or send direct messages privately. It’s fast,
          secure, and completely free to start.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <NavLink
            to={"/login"}
            className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-2xl cursor-pointer transform hover:-translate-y-1 flex items-center justify-center"
          >
            Start Chatting Now
            <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </NavLink>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 text-slate-700 border-t border-slate-200 py-3 flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
        {/* Logo  */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl flex items-center justify-center">
            <HiOutlineChatBubbleLeftRight className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-blue-500">echooo</span>
        </div>

        {/* Scroll to top */}
        <a
          href="#"
          className="p-3 bg-blue-500 rounded-md text-white hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
        >
          <FaAngleUp className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
};
