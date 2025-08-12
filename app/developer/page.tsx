'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Code, 
  Briefcase, 
  Shield,
  Mail,
  Phone,
  Sparkles,
  Target,
  Rocket,
  Globe,
  Database,
  PaintBucket,
  User,
  MapPin,
  Calendar
} from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'

const developerFormSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  location: z.string().min(1, 'Location is required'),
  experience_years: z.string().min(1, 'Please select your experience level'),
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  preferred_roles: z.array(z.string()).min(1, 'Please select at least one role'),
  remote_preference: z.string().min(1, 'Please select your remote preference'),
  current_status: z.string().min(1, 'Please select your current status'),
})

type DeveloperFormData = z.infer<typeof developerFormSchema>

const skills = [
  { value: 'JavaScript', label: 'JavaScript', icon: Code, color: 'from-yellow-500 to-orange-500' },
  { value: 'Python', label: 'Python', icon: Code, color: 'from-blue-500 to-cyan-500' },
  { value: 'React', label: 'React', icon: Code, color: 'from-cyan-500 to-blue-500' },
  { value: 'Node.js', label: 'Node.js', icon: Database, color: 'from-green-500 to-emerald-500' },
  { value: 'AWS', label: 'AWS', icon: Rocket, color: 'from-orange-500 to-red-500' },
  { value: 'Docker', label: 'Docker', icon: Rocket, color: 'from-blue-500 to-indigo-500' },
  { value: 'TypeScript', label: 'TypeScript', icon: Code, color: 'from-blue-500 to-purple-500' },
  { value: 'SQL', label: 'SQL', icon: Database, color: 'from-purple-500 to-pink-500' },
]

const preferredRoles = [
  { value: 'Frontend Engineer', label: 'Frontend Engineer', icon: Code, color: 'from-blue-500 to-cyan-500' },
  { value: 'Backend Engineer', label: 'Backend Engineer', icon: Database, color: 'from-green-500 to-emerald-500' },
  { value: 'Full Stack Engineer', label: 'Full Stack Engineer', icon: Code, color: 'from-purple-500 to-violet-500' },
  { value: 'DevOps Engineer', label: 'DevOps Engineer', icon: Rocket, color: 'from-orange-500 to-red-500' },
  { value: 'UX/UI Designer', label: 'UX/UI Designer', icon: PaintBucket, color: 'from-pink-500 to-rose-500' },
  { value: 'QA Engineer', label: 'QA Engineer', icon: CheckCircle, color: 'from-indigo-500 to-blue-500' },
  { value: 'Data Scientist', label: 'Data Scientist', icon: Target, color: 'from-red-500 to-pink-500' },
  { value: 'Product Manager', label: 'Product Manager', icon: Briefcase, color: 'from-gray-500 to-blue-500' },
]

const steps = [
  {
    id: 'welcome',
    title: 'Welcome Developer! 👨‍💻',
    subtitle: "Let's find you amazing opportunities",
    emoji: '🚀'
  },
  {
    id: 'personal',
    title: 'Tell us about yourself',
    subtitle: 'Basic information to get started',
    emoji: '👤'
  },
  {
    id: 'experience',
    title: 'Your Experience',
    subtitle: 'Help us understand your background',
    emoji: '📈'
  },
  {
    id: 'skills',
    title: 'Your Skills',
    subtitle: 'What technologies do you work with?',
    emoji: '⚡'
  },
  {
    id: 'preferences',
    title: 'Your Preferences',
    subtitle: 'What kind of roles are you looking for?',
    emoji: '🎯'
  },
  {
    id: 'contact',
    title: 'Contact Information',
    subtitle: 'How should we reach you?',
    emoji: '📞'
  },
  {
    id: 'success',
    title: 'Thank you! 🎉',
    subtitle: "We'll find you amazing opportunities",
    emoji: '✨'
  }
]

export default function DeveloperPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>({})

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    trigger
  } = useForm<DeveloperFormData>({
    resolver: zodResolver(developerFormSchema),
    defaultValues: {
      skills: [],
      preferred_roles: []
    }
  })

  const watchedValues = watch()

  const nextStep = async () => {
    const stepKey = steps[currentStep].id
    let isValid = true

    // Validate current step
    if (stepKey === 'personal') {
      isValid = await trigger(['full_name', 'email', 'phone', 'location'])
    } else if (stepKey === 'experience') {
      isValid = await trigger(['experience_years', 'current_status'])
    } else if (stepKey === 'skills') {
      isValid = await trigger('skills')
    } else if (stepKey === 'preferences') {
      isValid = await trigger(['preferred_roles', 'remote_preference'])
    } else if (stepKey === 'contact') {
      isValid = await trigger(['email', 'phone'])
    }

    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleOptionSelect = (field: string, value: any) => {
    setValue(field as keyof DeveloperFormData, value)
    setSelectedOptions(prev => ({ ...prev, [field]: value }))
    
    // Auto-advance for single-select fields
    if (field === 'experience_years' || field === 'current_status' || field === 'remote_preference') {
      setTimeout(() => nextStep(), 500)
    }
  }

  const handleSkillToggle = (skillValue: string) => {
    const currentSkills = getValues('skills') || []
    const newSkills = currentSkills.includes(skillValue)
      ? currentSkills.filter(skill => skill !== skillValue)
      : [...currentSkills, skillValue]
    
    setValue('skills', newSkills)
    setSelectedOptions(prev => ({ ...prev, skills: newSkills }))
  }

  const handleRoleToggle = (roleValue: string) => {
    const currentRoles = getValues('preferred_roles') || []
    const newRoles = currentRoles.includes(roleValue)
      ? currentRoles.filter(role => role !== roleValue)
      : [...currentRoles, roleValue]
    
    setValue('preferred_roles', newRoles)
    setSelectedOptions(prev => ({ ...prev, preferred_roles: newRoles }))
  }

  const onSubmit = async (data: DeveloperFormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/developer-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          user_type: 'developer'
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsComplete(true)
        setCurrentStep(steps.length - 1)
        toast.success('Your profile has been submitted successfully!')
      } else {
        throw new Error(result.error || 'Failed to submit profile')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('Failed to submit your profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link 
              href="/"
              className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Developer Profile</h1>
            <p className="text-gray-600">Step {currentStep + 1} of {steps.length}</p>
          </div>

          {/* Form Steps */}
          <div className="card p-8">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-8xl mb-8"
                  >
                    👨‍💻
                  </motion.div>
                  
                  <h1 className="text-5xl font-bold text-gradient mb-4">
                    Developer Profile
                  </h1>
                  <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                    Let's find you amazing opportunities.<br />
                    This will only take 2 minutes.
                  </p>

                  <motion.button
                    onClick={nextStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                  >
                    <span>Let's get started</span>
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-6">👤</div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Tell us about yourself
                  </h2>
                  <p className="text-gray-600 mb-12 text-lg">
                    Basic information to get started
                  </p>

                  <div className="max-w-md mx-auto space-y-6">
                    <div>
                      <input
                        {...register('full_name')}
                        type="text"
                        placeholder="Your full name"
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg bg-white shadow-sm hover:shadow-md"
                      />
                      {errors.full_name && (
                        <p className="text-red-500 text-sm mt-2">{errors.full_name.message}</p>
                      )}
                    </div>

                    <div>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg bg-white shadow-sm hover:shadow-md"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="+1 234 567 8900"
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg bg-white shadow-sm hover:shadow-md"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-2">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <input
                        {...register('location')}
                        type="text"
                        placeholder="City, Country"
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg bg-white shadow-sm hover:shadow-md"
                      />
                      {errors.location && (
                        <p className="text-red-500 text-sm mt-2">{errors.location.message}</p>
                      )}
                    </div>

                    {watchedValues.full_name && watchedValues.email && watchedValues.phone && watchedValues.location && (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={nextStep}
                        className="mt-6 btn-primary"
                      >
                        <span>Continue</span>
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-6">📈</div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Your Experience
                  </h2>
                  <p className="text-gray-600 mb-12 text-lg">
                    Help us understand your background
                  </p>

                  <div className="max-w-md mx-auto space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Years of Experience</h3>
                      <div className="grid gap-3">
                        {['0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years'].map((option) => (
                          <motion.button
                            key={option}
                            onClick={() => handleOptionSelect('experience_years', option)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 rounded-xl border-2 transition-all font-medium ${
                              selectedOptions.experience_years === option
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 bg-white hover:border-blue-300 text-gray-700'
                            }`}
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                      {errors.experience_years && (
                        <p className="text-red-500 text-sm mt-2">{errors.experience_years.message}</p>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Current Status</h3>
                      <div className="grid gap-3">
                        {['Actively looking', 'Open to opportunities', 'Not actively looking', 'Student/Recent graduate'].map((option) => (
                          <motion.button
                            key={option}
                            onClick={() => handleOptionSelect('current_status', option)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 rounded-xl border-2 transition-all font-medium ${
                              selectedOptions.current_status === option
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 bg-white hover:border-blue-300 text-gray-700'
                            }`}
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                      {errors.current_status && (
                        <p className="text-red-500 text-sm mt-2">{errors.current_status.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-6">⚡</div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Your Skills
                  </h2>
                  <p className="text-gray-600 mb-12 text-lg">
                    What technologies do you work with?
                  </p>

                  <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {skills.map((skill) => (
                      <motion.button
                        key={skill.value}
                        onClick={() => handleSkillToggle(skill.value)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 transition-all font-medium ${
                          selectedOptions.skills?.includes(skill.value)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white hover:border-blue-300 text-gray-700'
                        }`}
                      >
                        {skill.label}
                      </motion.button>
                    ))}
                  </div>
                  
                  {errors.skills && (
                    <p className="text-red-500 text-sm mt-4">{errors.skills.message}</p>
                  )}

                  {selectedOptions.skills?.length > 0 && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={nextStep}
                      className="mt-8 btn-primary"
                    >
                      <span>Continue</span>
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </motion.button>
                  )}
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-6">🎯</div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Your Preferences
                  </h2>
                  <p className="text-gray-600 mb-12 text-lg">
                    What kind of roles are you looking for?
                  </p>

                  <div className="max-w-2xl mx-auto space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Preferred Roles</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {preferredRoles.map((role) => (
                          <motion.button
                            key={role.value}
                            onClick={() => handleRoleToggle(role.value)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 rounded-xl border-2 transition-all font-medium ${
                              selectedOptions.preferred_roles?.includes(role.value)
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 bg-white hover:border-blue-300 text-gray-700'
                            }`}
                          >
                            {role.label}
                          </motion.button>
                        ))}
                      </div>
                      {errors.preferred_roles && (
                        <p className="text-red-500 text-sm mt-2">{errors.preferred_roles.message}</p>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Remote Work Preference</h3>
                      <div className="grid gap-3 max-w-md mx-auto">
                        {['Remote only', 'Hybrid', 'On-site', 'No preference'].map((option) => (
                          <motion.button
                            key={option}
                            onClick={() => handleOptionSelect('remote_preference', option)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 rounded-xl border-2 transition-all font-medium ${
                              selectedOptions.remote_preference === option
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 bg-white hover:border-blue-300 text-gray-700'
                            }`}
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                      {errors.remote_preference && (
                        <p className="text-red-500 text-sm mt-2">{errors.remote_preference.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-6">📞</div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Contact Information
                  </h2>
                  <p className="text-gray-600 mb-12 text-lg">
                    How should we reach you?
                  </p>

                  <div className="max-w-md mx-auto space-y-6">
                    <div>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg bg-white shadow-sm hover:shadow-md"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="+1 234 567 8900"
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg bg-white shadow-sm hover:shadow-md"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-2">{errors.phone.message}</p>
                      )}
                    </div>

                    {watchedValues.email && watchedValues.phone && (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => handleSubmit(onSubmit)()}
                        disabled={isSubmitting}
                        className="mt-6 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Profile</span>
                            <Sparkles className="ml-2 w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 6 && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-8xl mb-8"
                  >
                    🎉
                  </motion.div>
                  
                  <h2 className="text-4xl font-bold text-gradient mb-4">
                    Thank you!
                  </h2>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    We&apos;ve received your profile and will match you with amazing opportunities that fit your skills and preferences.
                  </p>

                  <div className="card p-6 max-w-md mx-auto mb-8">
                    <h3 className="font-semibold text-gray-800 mb-3">What happens next?</h3>
                    <div className="text-left space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                        <span>We'll review your profile</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-indigo-500 mr-2" />
                        <span>Match you with relevant opportunities</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                        <span>Contact you within 24 hours</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentStep(0)
                      setIsComplete(false)
                      setSelectedOptions({})
                    }}
                    className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-300 transition-all border border-gray-300 hover:border-gray-400"
                  >
                    Submit Another Profile
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-between items-center mt-12"
              >
                <button
                  onClick={prevStep}
                  className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </button>

                <div className="text-sm text-gray-500">
                  {currentStep} of {steps.length - 2}
                </div>
              </motion.div>
            )}

            {/* Privacy Policy Link */}
            {currentStep < steps.length - 1 && (
              <div className="mt-8 text-center">
                <Link 
                  href="/privacy-policy" 
                  className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Shield className="w-4 h-4 mr-1" />
                  Privacy Policy
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 