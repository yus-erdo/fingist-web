import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface NewsletterContent {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published_date: string;
  tags: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export function useNewsletterContent() {
  const [newsletters, setNewsletters] = useState<NewsletterContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNewsletters() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('newsletter_content')
          .select('*')
          .eq('status', 'published')
          .order('published_date', { ascending: false });

        if (error) throw error;

        setNewsletters(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchNewsletters();
  }, []);

  return { newsletters, isLoading, error };
} 