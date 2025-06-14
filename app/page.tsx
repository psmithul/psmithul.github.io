'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Users, 
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
  PaintBucket
} from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'

const formSchema = z.object({
  scale: z.string().min(1, 'Please select an option'),
  remote: z.string().min(1, 'Please select an option'),
  roles: z.array(z.string()).min(1, 'Please select at least one role'),
  contact_info: z.string().min(1, 'Contact information is required'),
  company_name: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const roles = [
  { value: 'Frontend Engineer', label: 'Frontend Engineer', icon: Code, color: 'from-blue-500 to-cyan-500' },
  { value: 'Backend Engineer', label: 'Backend Engineer', icon: Database, color: 'from-green-500 to-emerald-500' },
  { value: 'DevOps Engineer', label: 'DevOps Engineer', icon: Rocket, color: 'from-purple-500 to-violet-500' },
  { value: 'UX/UI Designer', label: 'UX/UI Designer', icon: PaintBucket, color: 'from-pink-500 to-rose-500' },
  { value: 'QA Engineer', label: 'QA Engineer', icon: CheckCircle, color: 'from-orange-500 to-red-500' },
  { value: 'Data Scientist', label: 'Data Scientist', icon: Target, color: 'from-indigo-500 to-blue-500' },
]

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to Thinkify Labs! 👋',
    subtitle: 'Let&apos;s find the perfect tech talent for your team',
    emoji: '🚀'
  },
  {
    id: 'scale',
    title: 'Are you planning to scale your engineering team?',
    subtitle: 'This helps us understand your growth trajectory',
    emoji: '📈'
  },
  {
    id: 'remote',
    title: 'Would you hire remote engineers?',
    subtitle: 'Remote work opens up a global talent pool',
    emoji: '🌍'
  },
  {
    id: 'roles',
    title: 'Which roles are you looking to fill?',
    subtitle: 'Select all that apply to your hiring needs',
    emoji: '👥'
  },
  {
    id: 'contact',
    title: 'How should we reach you?',
    subtitle: 'We&apos;ll send you perfect matches and updates',
    emoji: '📞'
  },
  {
    id: 'company',
    title: 'What&apos;s your company name?',
    subtitle: 'Optional - helps us personalize our service',
    emoji: '🏢'
  },
  {
    id: 'success',
    title: 'Thank you! 🎉',
    subtitle: 'We&apos;ll get back to you with amazing candidates',
    emoji: '✨'
  }
]

export default function HomePage() {
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
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roles: []
    }
  })

  const watchedValues = watch()

  const nextStep = async () => {
    const stepKey = steps[currentStep].id
    let isValid = true

    // Validate current step
    if (stepKey === 'scale') {
      isValid = await trigger('scale')
    } else if (stepKey === 'remote') {
      isValid = await trigger('remote')
    } else if (stepKey === 'roles') {
      isValid = await trigger('roles')
    } else if (stepKey === 'contact') {
      isValid = await trigger('contact_info')
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
    setValue(field as keyof FormData, value)
    setSelectedOptions(prev => ({ ...prev, [field]: value }))
    
    // Auto-advance for single-select fields
    if (field === 'scale' || field === 'remote') {
      setTimeout(() => nextStep(), 500)
    }
  }

  const handleRoleToggle = (roleValue: string) => {
    const currentRoles = getValues('roles') || []
    const newRoles = currentRoles.includes(roleValue)
      ? currentRoles.filter(role => role !== roleValue)
      : [...currentRoles, roleValue]
    
    setValue('roles', newRoles)
    setSelectedOptions(prev => ({ ...prev, roles: newRoles }))
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scale: data.scale,
          remote: data.remote,
          roles: data.roles,
          contact_info: data.contact_info,
          company_name: data.company_name || '',
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsComplete(true)
        setCurrentStep(steps.length - 1)
        toast.success('Your request has been sent successfully!')
      } else {
        throw new Error(result.error || 'Failed to submit form')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('Failed to send your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary-500 to-orange-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
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
                  🚀
                </motion.div>
                
                <h1 className="text-5xl font-bold text-gradient mb-4">
                  Thinkify Labs
                </h1>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                  Let&apos;s find the perfect tech talent for your team.<br />
                  This will only take 2 minutes.
                </p>

                <motion.button
                  onClick={nextStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  <span>Let&apos;s get started</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="scale"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <div className="text-6xl mb-6">📈</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Are you planning to scale your engineering team?
                </h2>
                <p className="text-gray-600 mb-12 text-lg">
                  This helps us understand your growth trajectory
                </p>

                <div className="grid gap-4 max-w-md mx-auto">
                  {['Yes', 'Maybe', 'No'].map((option) => (
                    <motion.button
                      key={option}
                      onClick={() => handleOptionSelect('scale', option)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-2xl border-2 transition-all font-medium text-lg ${
                        selectedOptions.scale === option
                          ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-orange-50 text-primary-700 shadow-glow'
                          : 'border-gray-200 bg-white hover:border-primary-300 text-gray-700 hover:shadow-lg'
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
                {errors.scale && (
                  <p className="text-red-500 text-sm mt-4">{errors.scale.message}</p>
                )}
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="remote"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <div className="text-6xl mb-6">🌍</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Would you hire remote engineers?
                </h2>
                <p className="text-gray-600 mb-12 text-lg">
                  Remote work opens up a global talent pool
                </p>

                <div className="grid gap-4 max-w-md mx-auto">
                  {['Yes', 'Maybe', 'No'].map((option) => (
                    <motion.button
                      key={option}
                      onClick={() => handleOptionSelect('remote', option)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-2xl border-2 transition-all font-medium text-lg ${
                        selectedOptions.remote === option
                          ? 'border-accent-500 bg-gradient-to-r from-accent-50 to-blue-50 text-accent-700 shadow-blue-glow'
                          : 'border-gray-200 bg-white hover:border-accent-300 text-gray-700 hover:shadow-lg'
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
                {errors.remote && (
                  <p className="text-red-500 text-sm mt-4">{errors.remote.message}</p>
                )}
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="roles"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <div className="text-6xl mb-6">👥</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Which roles are you looking to fill?
                </h2>
                <p className="text-gray-600 mb-12 text-lg">
                  Select all that apply to your hiring needs
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                  {roles.map((role) => {
                    const Icon = role.icon
                    const isSelected = selectedOptions.roles?.includes(role.value)
                    
                    return (
                      <motion.button
                        key={role.value}
                        onClick={() => handleRoleToggle(role.value)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-6 rounded-2xl border-2 transition-all relative overflow-hidden ${
                          isSelected
                            ? 'border-primary-500 bg-white shadow-lg'
                            : 'border-gray-200 bg-white hover:border-primary-300'
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-10`}
                          />
                        )}
                        
                        <div className="relative flex items-center">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${role.color} mr-4`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-gray-800">{role.label}</h3>
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-auto"
                            >
                              <CheckCircle className="w-6 h-6 text-primary-600" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
                
                {errors.roles && (
                  <p className="text-red-500 text-sm mt-4">{errors.roles.message}</p>
                )}

                {selectedOptions.roles?.length > 0 && (
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
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <div className="text-6xl mb-6">📞</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  How should we reach you?
                </h2>
                <p className="text-gray-600 mb-12 text-lg">
                  We&apos;ll send you perfect matches and updates
                </p>

                <div className="max-w-md mx-auto">
                  <input
                    {...register('contact_info')}
                    type="text"
                    placeholder="your@email.com or +91 12345 67890"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-lg bg-white shadow-sm hover:shadow-md"
                  />
                  {errors.contact_info && (
                    <p className="text-red-500 text-sm mt-2">{errors.contact_info.message}</p>
                  )}

                  {watchedValues.contact_info && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={nextStep}
                      className="mt-6 btn-secondary"
                    >
                      <span>Continue</span>
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                key="company"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <div className="text-6xl mb-6">🏢</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  What&apos;s your company name?
                </h2>
                <p className="text-gray-600 mb-12 text-lg">
                  Optional - helps us personalize our service
                </p>

                <div className="max-w-md mx-auto">
                  <input
                    {...register('company_name')}
                    type="text"
                    placeholder="Your awesome company"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-lg bg-white shadow-sm hover:shadow-md"
                  />

                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => handleSubmit(onSubmit)()}
                      disabled={isSubmitting}
                      className="flex-1 inline-flex items-center justify-center px-8 py-4 bg-gray-200 text-gray-700 font-semibold rounded-2xl hover:bg-gray-300 transition-all border-2 border-gray-200 hover:border-gray-300"
                    >
                      Skip
                    </button>
                    
                    <button
                      onClick={() => handleSubmit(onSubmit)()}
                      disabled={isSubmitting}
                      className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <Sparkles className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
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
                  We&apos;ve received your request and will get back to you soon with amazing candidates that match your needs.
                </p>

                <div className="card p-6 max-w-md mx-auto mb-8">
                  <h3 className="font-semibold text-gray-800 mb-3">What happens next?</h3>
                  <div className="text-left space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-primary-500 mr-2" />
                      <span>We&apos;ll review your requirements</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                      <span>Match you with top candidates</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
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
                  Submit Another Request
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
                className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 transition-colors"
              >
                <Shield className="w-4 h-4 mr-1" />
                Privacy Policy
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 