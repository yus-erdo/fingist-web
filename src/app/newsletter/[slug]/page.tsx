import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import NewsletterPage from '@/components/NewsletterPage';
import { Metadata } from 'next';

interface NewsletterContent {
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all published newsletters
export async function generateStaticParams() {
  const { data: newsletters } = await supabase
    .from('newsletter_content')
    .select('slug')
    .eq('status', 'published');

  return newsletters?.map((newsletter) => ({
    slug: newsletter.slug,
  })) || [];
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const { data: newsletter } = await supabase
    .from('newsletter_content')
    .select('title, excerpt, published_date')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!newsletter) {
    return {
      title: 'Newsletter Not Found',
    };
  }

  const publishedDate = new Date(newsletter.published_date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return {
    title: `${newsletter.title} | FinGist`,
    description: newsletter.excerpt || `${publishedDate} tarihli finansal AI bülteni`,
    openGraph: {
      title: newsletter.title,
      description: newsletter.excerpt || `${publishedDate} tarihli finansal AI bülteni`,
      type: 'article',
      publishedTime: newsletter.published_date,
    },
    twitter: {
      card: 'summary_large_image',
      title: newsletter.title,
      description: newsletter.excerpt || `${publishedDate} tarihli finansal AI bülteni`,
    },
  };
}

async function getNewsletter(slug: string): Promise<NewsletterContent | null> {
  const { data: newsletter, error } = await supabase
    .from('newsletter_content')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !newsletter) {
    return null;
  }

  return newsletter;
}

export default async function NewsletterDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const newsletter = await getNewsletter(slug);

  if (!newsletter) {
    notFound();
  }

  return <NewsletterPage newsletter={newsletter} />;
} 