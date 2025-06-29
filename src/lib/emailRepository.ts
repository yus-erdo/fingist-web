import { supabase, EmailSubscription } from './supabase'

export class EmailRepository {
  private tableName = 'email_subscriptions'

  /**
   * Subscribe a new email to the newsletter
   * Secure version that only uses INSERT operations
   */
  async subscribe(email: string, source: 'main' | 'bottom' | 'newsletter' = 'main'): Promise<{
    success: boolean
    message: string
    data?: EmailSubscription
  }> {
    try {
      // Additional client-side validation for security
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(email)) {
        return {
          success: false,
          message: 'Geçerli bir e-posta adresi formatı girin.'
        }
      }

      if (email.length > 320) {
        return {
          success: false,
          message: 'E-posta adresi çok uzun.'
        }
      }

      // Check for obvious spam patterns
      const cleanEmail = email.toLowerCase().trim();
      if (cleanEmail.includes('test@test') || cleanEmail.includes('spam@')) {
        return {
          success: false,
          message: 'Geçersiz e-posta adresi.'
        }
      }

      // Direct insert - let the database handle duplicates and validation
      const { data, error } = await supabase
        .from(this.tableName)
        .insert([
          {
            email: cleanEmail,
            source: source,
            is_active: true
          }
        ])
        .select()

      if (error) {
        console.error('Error inserting email subscription:', error)
        
        // Handle specific error cases
        if (error.code === '23505') {
          // Unique constraint violation - email already exists
          return {
            success: false,
            message: 'Bu e-posta adresi zaten kayıtlı.'
          }
        } else if (error.message?.includes('Rate limit exceeded')) {
          return {
            success: false,
            message: 'Çok sık kayıt denemesi yapıldı. Lütfen bir süre bekleyin.'
          }
        } else if (error.message?.includes('Invalid email')) {
          return {
            success: false,
            message: 'Geçersiz e-posta adresi formatı.'
          }
        } else if (error.code === '42501') {
          return {
            success: false,
            message: 'Güvenlik hatası. Lütfen sayfayı yenileyin ve tekrar deneyin.'
          }
        } else {
          return {
            success: false,
            message: 'Bir hata oluştu. Lütfen tekrar deneyin.'
          }
        }
      }

      return {
        success: true,
        message: 'Başarıyla kaydoldunuz! İlk bülteniniz yakında e-postanızda olacak.',
        data: data?.[0]
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      return {
        success: false,
        message: 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.'
      }
    }
  }

  /**
   * Get all active subscriptions - DEPRECATED for security
   * This method is no longer available for client-side access
   * Admin operations must be handled server-side
   */
  async getActiveSubscriptions(): Promise<EmailSubscription[]> {
    console.warn('getActiveSubscriptions is deprecated for security reasons. Use server-side admin functions.');
    return [];
  }

  /**
   * Unsubscribe an email - DEPRECATED for security  
   * This method is no longer available for client-side access
   * Unsubscribe operations must be handled server-side with proper authentication
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async unsubscribe(_email: string): Promise<{
    success: boolean
    message: string
  }> {
    console.warn('Client-side unsubscribe is deprecated for security reasons. Use server-side unsubscribe with proper token verification.');
    return {
      success: false,
      message: 'Abonelik iptali için lütfen e-postanızdaki linkı kullanın.'
    }
  }
}

// Export a singleton instance
export const emailRepository = new EmailRepository() 