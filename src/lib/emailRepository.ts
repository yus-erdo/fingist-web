import { supabase, EmailSubscription } from './supabase'

export class EmailRepository {
  private tableName = 'email_subscriptions'

  /**
   * Subscribe a new email to the newsletter
   */
  async subscribe(email: string, source: 'main' | 'bottom' = 'main'): Promise<{
    success: boolean
    message: string
    data?: EmailSubscription
  }> {
    try {
      // First check if email already exists
      const { data: existingEmail, error: checkError } = await supabase
        .from(this.tableName)
        .select('email, is_active')
        .eq('email', email.toLowerCase().trim())
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 is "no rows returned" which is expected for new emails
        console.error('Error checking existing email:', checkError)
        return {
          success: false,
          message: 'Bir hata oluştu. Lütfen tekrar deneyin.'
        }
      }

      if (existingEmail) {
        if (existingEmail.is_active) {
          return {
            success: false,
            message: 'Bu e-posta adresi zaten kayıtlı.'
          }
        } else {
          // Reactivate existing subscription
          const { data, error: updateError } = await supabase
            .from(this.tableName)
            .update({ is_active: true })
            .eq('email', email.toLowerCase().trim())
            .select()

          if (updateError) {
            console.error('Error reactivating subscription:', updateError)
            return {
              success: false,
              message: 'Bir hata oluştu. Lütfen tekrar deneyin.'
            }
          }

          return {
            success: true,
            message: 'Aboneliğiniz yeniden aktifleştirildi!',
            data: data[0]
          }
        }
      }

      // Insert new subscription
      const { data, error } = await supabase
        .from(this.tableName)
        .insert([
          {
            email: email.toLowerCase().trim(),
            source: source,
            is_active: true
          }
        ])
        .select()

      if (error) {
        console.error('Error inserting email subscription:', error)
        return {
          success: false,
          message: 'Bir hata oluştu. Lütfen tekrar deneyin.'
        }
      }

      return {
        success: true,
        message: 'Başarıyla kaydoldunuz! İlk bülteniniz yakında e-postanızda olacak.',
        data: data[0]
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
   * Get all active subscriptions
   */
  async getActiveSubscriptions(): Promise<EmailSubscription[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching active subscriptions:', error)
      return []
    }

    return data || []
  }

  /**
   * Unsubscribe an email
   */
  async unsubscribe(email: string): Promise<{
    success: boolean
    message: string
  }> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .update({ is_active: false })
        .eq('email', email.toLowerCase().trim())

      if (error) {
        console.error('Error unsubscribing:', error)
        return {
          success: false,
          message: 'Abonelik iptal edilirken bir hata oluştu.'
        }
      }

      return {
        success: true,
        message: 'Aboneliğiniz başarıyla iptal edildi.'
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      return {
        success: false,
        message: 'Beklenmeyen bir hata oluştu.'
      }
    }
  }
}

// Export a singleton instance
export const emailRepository = new EmailRepository() 