import type React from "react"
import {useNavigate} from 'react-router-dom'
import {
  FiMessageSquare,
  FiShield,
  FiLock,
  FiEye,
  FiDatabase,
  FiGlobe,
  FiCheck,
  FiAlertTriangle,
} from "react-icons/fi"
import { IoChevronBackOutline } from "react-icons/io5";

const TermsAndPrivacy: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white text-slate-700 min-h-screen">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <button onClick={()=>navigate(-1)} className="flex items-center bg-blue-50 hover:bg-blue-100 text-blue-500 hover:text-blue-600 border-2 border-blue-100 pl-2 pr-3 py-1 rounded-md font-poppins transition-all duration-300 cursor-pointer group">
              <IoChevronBackOutline className="w-5 h-5 mr-1" />
              Back
            </button>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
                <FiShield className="w-8 h-8 text-white" />
              </div>
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
                <FiLock className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Terms of Service & Privacy Policy</h1>
            <p className="text-xl text-blue-500 font-medium mb-6">Last updated: January 26, 2025</p>

            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              This document outlines our Terms of Service and Privacy Policy for echooo. By using our platform, you
              agree to these terms and understand how we handle your personal information.
            </p>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* TERMS OF SERVICE SECTION */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-blue-50 rounded-full text-blue-500 font-medium mb-6">
              <FiShield className="w-5 h-5 mr-2" />
              Terms of Service
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Service Agreement</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These terms govern your use of echooo and the services we provide.
            </p>
          </div>

          {/* Terms Section 1 */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Acceptance of Terms</h3>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <p className="text-slate-700 leading-relaxed mb-4">
                By accessing or using echooo ("the Service"), you agree to be bound by these Terms of Service. If you
                disagree with any part of these terms, you may not access the Service.
              </p>
              <p className="text-slate-700 leading-relaxed">
                We reserve the right to update these Terms at any time. Your continued use constitutes acceptance of any
                changes.
              </p>
            </div>
          </section>

          {/* Terms Section 2 */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Service Description</h3>
            </div>

            <div className="space-y-4">
              <p className="text-slate-700 leading-relaxed">
                echooo is a communication platform that enables users to:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center mb-3">
                    <FiMessageSquare className="w-6 h-6 text-blue-500 mr-3" />
                    <h4 className="font-semibold text-slate-900">Messaging</h4>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Send and receive messages in public rooms and private conversations
                  </p>
                </div>

                
              </div>
            </div>
          </section>

          {/* Terms Section 3 */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">User Responsibilities</h3>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Account Requirements</h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start">
                    <FiCheck className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    Provide accurate and complete information
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    Maintain security of your account credentials
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    Must be at least 13 years old to create an account
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Terms Section 4 */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">4</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Prohibited Uses</h3>
            </div>

            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <div className="flex items-center mb-4">
                <FiAlertTriangle className="w-6 h-6 text-red-500 mr-3" />
                <h4 className="text-lg font-semibold text-slate-900">You may not use the Service to:</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Harass, abuse, or harm others
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Share illegal or harmful content
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Spam or send unsolicited messages
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Impersonate others
                  </li>
                </ul>

                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Violate intellectual property rights
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Attempt to hack or disrupt the Service
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Use automated tools or bots
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Share malware or viruses
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Terms Section 5 */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">5</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Content & Intellectual Property</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Your Content</h4>
                <p className="text-slate-700 leading-relaxed text-sm">
                  You retain ownership of content you create. By posting, you grant us a license to use, display, and
                  distribute your content in connection with the Service.
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Our Content</h4>
                <p className="text-slate-700 leading-relaxed text-sm">
                  The Service and its content are owned by echooo and protected by intellectual property laws.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* PRIVACY POLICY SECTION */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-blue-50 rounded-full text-blue-500 font-medium mb-6">
              <FiLock className="w-5 h-5 mr-2" />
              Privacy Policy
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Your Privacy Matters</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Learn how we collect, use, and protect your personal information.
            </p>
          </div>

          {/* Privacy Overview */}
          <section className="mb-12">
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Privacy at a Glance</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FiShield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">End-to-End Encryption</h4>
                  <p className="text-sm text-slate-600">
                    Your private messages are encrypted and only you and the recipient can read them.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FiEye className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">No Data Selling</h4>
                  <p className="text-sm text-slate-600">
                    We never sell your personal data to third parties or advertisers.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FiDatabase className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">Minimal Data Collection</h4>
                  <p className="text-sm text-slate-600">
                    We only collect data necessary to provide and improve our service.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy Section 1 */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Information We Collect</h3>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <FiDatabase className="w-5 h-5 mr-2 text-blue-500" />
                  Information You Provide
                </h4>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <FiCheck className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong>Account Information:</strong> Username, email address, profile picture, and display name
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong>Messages and Content:</strong> Text messages, images, files, and other content you share
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong>Settings:</strong> Notification preferences, privacy settings, and customization choices
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <FiGlobe className="w-5 h-5 mr-2 text-blue-500" />
                  Information We Collect Automatically
                </h4>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <FiCheck className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong>Usage Data:</strong> How you interact with our service, features used, and time spent
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong>Device Information:</strong> Device type, operating system, browser type, and IP address
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong>Log Data:</strong> Server logs, error reports, and performance metrics
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Privacy Section 2 */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">How We Use Your Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Service Provision</h4>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Enable messaging and communication features
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Maintain and improve service performance
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Provide customer support
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Safety and Security</h4>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Detect and prevent fraud and abuse
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Enforce our Terms of Service
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Protect against security threats
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Privacy Section 3 */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Information Sharing</h3>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 mb-6">
              <div className="flex items-center mb-4">
                <FiShield className="w-6 h-6 text-blue-500 mr-3" />
                <h4 className="text-xl font-semibold text-slate-900">We Do Not Sell Your Data</h4>
              </div>
              <p className="text-slate-700 leading-relaxed">
                We never sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2">With Your Consent</h4>
                <p className="text-slate-600 text-sm">
                  When you explicitly agree to share information with third-party services.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2">Service Providers</h4>
                <p className="text-slate-600 text-sm">
                  With trusted partners who help us operate our service (hosting, analytics).
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2">Legal Requirements</h4>
                <p className="text-slate-600 text-sm">When required by law or to protect our rights and safety.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2">Business Transfers</h4>
                <p className="text-slate-600 text-sm">
                  In the event of a merger or acquisition (with user notification).
                </p>
              </div>
            </div>
          </section>

          {/* Privacy Section 4 */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">4</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Data Security</h3>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="text-xl font-semibold text-slate-900 mb-4">Our Security Measures</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-slate-900 mb-3">Technical Safeguards</h5>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li className="flex items-start">
                      <FiCheck className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      End-to-end encryption for private messages
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      TLS encryption for data in transit
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      AES-256 encryption for data at rest
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      Regular security audits
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-slate-900 mb-3">Operational Safeguards</h5>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li className="flex items-start">
                      <FiCheck className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      Access controls and authentication
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      Employee security training
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      Incident response procedures
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      Regular backup and recovery testing
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy Section 5 */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">5</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Your Privacy Rights</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Access and Control</h4>
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li className="flex items-start">
                    <FiCheck className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    Access your personal data
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    Update or correct your information
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    Download your data
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    Delete your account
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Privacy Controls</h4>
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li className="flex items-start">
                    <FiCheck className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    Control who can message you
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    Manage notification preferences
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    Set profile visibility
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    Block or report users
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">6</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Data Retention</h3>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <p className="text-slate-700 leading-relaxed mb-4">
                We retain your personal information only as long as necessary to provide our services.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <h4 className="font-semibold text-slate-900 mb-2">Account Data</h4>
                  <p className="text-slate-600 text-sm">Retained while active and for 30 days after deletion</p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <h4 className="font-semibold text-slate-900 mb-2">Messages</h4>
                  <p className="text-slate-600 text-sm">Stored until you delete them or close your account</p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <h4 className="font-semibold text-slate-900 mb-2">Log Data</h4>
                  <p className="text-slate-600 text-sm">Automatically deleted after 90 days</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

    </div>
  )
}

export default TermsAndPrivacy
