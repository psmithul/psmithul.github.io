'use client'

import { motion } from 'framer-motion'
import { Shield, ArrowLeft, Mail, Phone, Calendar, Users, Lock, Eye, FileText, Database } from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    id: 'information-collection',
    title: 'Information We Collect',
    icon: Database,
    content: [
      {
        subtitle: 'Contact Information',
        description: 'Your full name, email address, and phone number when you sign up to explore opportunities on our platform.'
      },
      {
        subtitle: 'Professional Details',
        description: 'Your résumé/CV, work history, skills, portfolio links, and any other information you choose to share in your profile.'
      },
      {
        subtitle: 'Usage Data',
        description: 'How you interact with our website and services, collected via cookies and similar technologies.'
      }
    ]
  },
  {
    id: 'information-usage',
    title: 'How We Use Your Information',
    icon: Users,
    content: [
      {
        subtitle: 'Match You with Opportunities',
        description: 'Our team leverages your profile to recommend roles that fit your background and goals.'
      },
      {
        subtitle: 'Communicate with You',
        description: 'We send updates on application status, interview schedules, and new job matches via email, SMS, and calls.'
      },
      {
        subtitle: 'Improve Our Service',
        description: 'We analyze usage patterns to refine features and ensure a seamless experience.'
      },
      {
        subtitle: 'Comply with Legal Obligations',
        description: 'We retain data as needed for regulatory requirements.'
      }
    ]
  },
  {
    id: 'cookies-tracking',
    title: 'Cookies & Tracking Technologies',
    icon: Eye,
    content: [
      {
        description: 'We use cookies and similar tools to remember your preferences, track site performance, and personalize content. You can control cookie settings through your browser; disabling cookies may limit certain features.'
      }
    ]
  },
  {
    id: 'data-sharing',
    title: 'Sharing & Disclosure',
    icon: Shield,
    content: [
      {
        subtitle: 'Important Note',
        description: 'We will never sell your personal data. We may share your information with:'
      },
      {
        subtitle: 'Partner Startups',
        description: 'For recruitment purposes only.'
      },
      {
        subtitle: 'Service Providers',
        description: 'Such as hosting and analytics providers, under strict confidentiality agreements.'
      },
      {
        subtitle: 'Legal Authorities',
        description: 'Only if required by law.'
      }
    ]
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    icon: FileText,
    content: [
      {
        description: 'We keep your profile information as long as your account is active or as needed to provide services. If you request deletion, we will remove your data within 30 days unless required to retain it for legal reasons.'
      }
    ]
  },
  {
    id: 'security',
    title: 'Security',
    icon: Lock,
    content: [
      {
        subtitle: 'Industry-Standard Encryption',
        description: 'TLS encryption for data in transit.'
      },
      {
        subtitle: 'Restricted Access',
        description: 'Limited to authorized team members only.'
      },
      {
        subtitle: 'Regular Audits',
        description: 'Systematic review of systems and processes.'
      }
    ]
  }
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-gray-100"
      >
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Form
            </Link>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gradient">Thinkify Labs</h1>
              <p className="text-gray-600 text-sm">Privacy Policy</p>
            </div>
            
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
            <Shield className="w-8 h-8 text-primary-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          
          <div className="flex items-center justify-center text-gray-600 mb-6">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Last updated: May 16, 2025</span>
          </div>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            At Thinkify Labs, we take your privacy seriously. This policy explains how we collect, 
            use, and protect your personal information when you use our services.
          </p>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon
            
            return (
              <motion.section
                key={section.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + (index * 0.1) }}
                className="bg-white rounded-2xl p-8 shadow-card"
              >
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mr-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="pb-4 last:pb-0">
                      {'subtitle' in item && item.subtitle && (
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {item.subtitle}
                        </h3>
                      )}
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )
          })}

          {/* Your Rights Section */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + (sections.length * 0.1) }}
            className="bg-white rounded-2xl p-8 shadow-card"
          >
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-accent-100 rounded-xl mr-4">
                <Users className="w-6 h-6 text-accent-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Your Choices & Rights
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Access & Update</h3>
                <p className="text-sm text-gray-600">View and edit your profile anytime in account settings.</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Opt-out</h3>
                <p className="text-sm text-gray-600">Unsubscribe from marketing emails or SMS anytime.</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Data Deletion</h3>
                <p className="text-sm text-gray-600">Request complete data erasure by contacting us.</p>
              </div>
            </div>
          </motion.section>

          {/* Additional Policies */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + ((sections.length + 1) * 0.1) }}
            className="bg-white rounded-2xl p-8 shadow-card"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Children&apos;s Privacy</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our services are for individuals aged 18 or older. We do not knowingly collect data from minors. 
                  If you believe we have collected information from a minor, please contact us immediately.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Changes to This Policy</h3>
                <p className="text-gray-600 leading-relaxed">
                  We may update this policy for new features or legal requirements. We&apos;ll post revisions here 
                  and notify you via email if changes are significant.
                </p>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 + ((sections.length + 2) * 0.1) }}
          className="mt-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Questions About Our Privacy Policy?</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            If you have any questions about this privacy policy or how we handle your data, 
            we&apos;re here to help. Reach out to us anytime.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="mailto:privacy@thinkifylabs.com"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              privacy@thinkifylabs.com
            </a>
            
            <a
              href="tel:+91XXXXXXXXXX"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              +91 XXXXXXXXXX
            </a>
          </div>
        </motion.div>

        {/* Back to Form Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 + ((sections.length + 3) * 0.1) }}
          className="mt-8 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center px-8 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </Link>
        </motion.div>
      </main>
    </div>
  )
} 