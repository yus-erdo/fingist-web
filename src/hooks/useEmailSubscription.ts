import { useState } from 'react'
import { emailRepository } from '@/lib/emailRepository'

interface UseEmailSubscriptionResult {
  isLoading: boolean
  message: string
  messageType: 'success' | 'error' | ''
  subscribe: (email: string, source?: 'main' | 'bottom' | 'newsletter') => Promise<void>
  clearMessage: () => void
}

export const useEmailSubscription = (): UseEmailSubscriptionResult => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const subscribe = async (email: string, source: 'main' | 'bottom' | 'newsletter' = 'main') => {
    setIsLoading(true)
    setMessage('')
    setMessageType('')

    try {
      // Validate email format
      if (!email.trim()) {
        setMessage('Lütfen e-posta adresinizi girin.')
        setMessageType('error')
        return
      }

      if (!validateEmail(email.trim())) {
        setMessage('Lütfen geçerli bir e-posta adresi girin.')
        setMessageType('error')
        return
      }

      // Submit to database
      const result = await emailRepository.subscribe(email, source)
      
      setMessage(result.message)
      setMessageType(result.success ? 'success' : 'error')

      // Clear form on success
      if (result.success) {
        let formId = 'newsletter-signup'
        if (source === 'bottom') {
          formId = 'bottom-newsletter-signup'
        } else if (source === 'newsletter') {
          formId = 'newsletter-signup-form'
        }
        const form = document.getElementById(formId) as HTMLFormElement
        if (form) {
          form.reset()
        }
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setMessage('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  const clearMessage = () => {
    setMessage('')
    setMessageType('')
  }

  return {
    isLoading,
    message,
    messageType,
    subscribe,
    clearMessage
  }
} 