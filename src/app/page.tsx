"use client";

import Orb from "@/components/ui/orb";
import RotatingText from "@/components/ui/rotatingText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEmailSubscription } from "@/hooks/useEmailSubscription";
import { useNewsletterContent, NewsletterContent } from "@/hooks/useNewsletterContent";
import { FormEvent, useRef, useEffect, useState } from "react";
import confetti from 'canvas-confetti';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const themes = {
  blue: {
    name: 'Blue Ocean',
    orbHue: 200,
    heroGradient: 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800',
    titleColor: 'text-slate-900 dark:text-white',
    subtitleColor: 'text-slate-700 dark:text-slate-300',
    bodyTextColor: 'text-slate-600 dark:text-slate-400',
    rotatingTextBg: 'bg-blue-500 text-white',
    primaryButton: 'bg-blue-600 hover:bg-blue-700 text-white',
    formBg: 'bg-white dark:bg-slate-800',
    formTextColor: 'text-slate-900 dark:text-white',
    sectionBg: 'bg-white dark:bg-slate-900',
    cardBg: 'bg-slate-50 dark:bg-slate-800/50',
    cardBorder: 'border-slate-200 dark:border-slate-700',
    dateColor: 'text-blue-600 dark:text-blue-400',
    ctaButton: 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100',
    footerBg: 'bg-slate-900 dark:bg-slate-950',
    footerText: 'text-slate-400',
    footerLinkHover: 'hover:text-slate-300'
  },
  warm: {
    name: 'Sunset Warm',
    orbHue: 30,
    heroGradient: 'bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900 dark:to-red-900',
    titleColor: 'text-orange-900 dark:text-orange-100',
    subtitleColor: 'text-orange-800 dark:text-orange-200',
    bodyTextColor: 'text-orange-700 dark:text-orange-300',
    rotatingTextBg: 'bg-red-500 text-white',
    primaryButton: 'bg-orange-600 hover:bg-red-600 text-white',
    formBg: 'bg-white dark:bg-orange-900',
    formTextColor: 'text-orange-900 dark:text-orange-100',
    sectionBg: 'bg-amber-50 dark:bg-orange-950',
    cardBg: 'bg-orange-50 dark:bg-orange-900/50',
    cardBorder: 'border-orange-200 dark:border-orange-700',
    dateColor: 'text-red-600 dark:text-red-400',
    ctaButton: 'bg-orange-900 hover:bg-red-800 text-white dark:bg-orange-100 dark:text-orange-900 dark:hover:bg-orange-200',
    footerBg: 'bg-orange-950 dark:bg-red-950',
    footerText: 'text-orange-400',
    footerLinkHover: 'hover:text-orange-300'
  },
  nature: {
    name: 'Forest Nature',
    orbHue: 140,
    heroGradient: 'bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900 dark:to-teal-900',
    titleColor: 'text-emerald-900 dark:text-emerald-100',
    subtitleColor: 'text-emerald-800 dark:text-emerald-200',
    bodyTextColor: 'text-emerald-700 dark:text-emerald-300',
    rotatingTextBg: 'bg-teal-500 text-white',
    primaryButton: 'bg-emerald-600 hover:bg-teal-600 text-white',
    formBg: 'bg-white dark:bg-emerald-900',
    formTextColor: 'text-emerald-900 dark:text-emerald-100',
    sectionBg: 'bg-teal-50 dark:bg-emerald-950',
    cardBg: 'bg-emerald-50 dark:bg-emerald-900/50',
    cardBorder: 'border-emerald-200 dark:border-emerald-700',
    dateColor: 'text-teal-600 dark:text-teal-400',
    ctaButton: 'bg-emerald-900 hover:bg-teal-800 text-white dark:bg-emerald-100 dark:text-emerald-900 dark:hover:bg-emerald-200',
    footerBg: 'bg-emerald-950 dark:bg-teal-950',
    footerText: 'text-emerald-400',
    footerLinkHover: 'hover:text-emerald-300'
  },
  luxury: {
    name: 'Royal Purple',
    orbHue: 280,
    heroGradient: 'bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900 dark:to-violet-900',
    titleColor: 'text-purple-900 dark:text-purple-100',
    subtitleColor: 'text-purple-800 dark:text-purple-200',
    bodyTextColor: 'text-purple-700 dark:text-purple-300',
    rotatingTextBg: 'bg-violet-500 text-white',
    primaryButton: 'bg-purple-600 hover:bg-violet-600 text-white',
    formBg: 'bg-white dark:bg-purple-900',
    formTextColor: 'text-purple-900 dark:text-purple-100',
    sectionBg: 'bg-violet-50 dark:bg-purple-950',
    cardBg: 'bg-purple-50 dark:bg-purple-900/50',
    cardBorder: 'border-purple-200 dark:border-purple-700',
    dateColor: 'text-violet-600 dark:text-violet-400',
    ctaButton: 'bg-purple-900 hover:bg-violet-800 text-white dark:bg-purple-100 dark:text-purple-900 dark:hover:bg-purple-200',
    footerBg: 'bg-purple-950 dark:bg-violet-950',
    footerText: 'text-purple-400',
    footerLinkHover: 'hover:text-purple-300'
  }
};

export default function Home() {
  // Fixed theme set to 'nature' (green)
  const theme = themes.nature;
  
  // Email subscription hook
  const { isLoading, message, messageType, subscribe, clearMessage } = useEmailSubscription();
  
  // Newsletter content hook
  const { newsletters, isLoading: newslettersLoading, error: newslettersError } = useNewsletterContent();
  
  // Newsletter detail view state
  const [selectedNewsletter, setSelectedNewsletter] = useState<NewsletterContent | null>(null);
  
  // Form refs
  const mainFormRef = useRef<HTMLFormElement>(null);
  const bottomFormRef = useRef<HTMLFormElement>(null);
  
  // Form submission handlers
  const handleMainFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    await subscribe(email, 'main');
  };
  
  const handleBottomFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    await subscribe(email, 'bottom');
  };

  useEffect(() => {
    if (messageType === 'success') {
      // Fire multiple confetti bursts for a more dramatic effect
      const duration = 3000; // 3 seconds
      const animationEnd = Date.now() + duration;
      
      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 150 * (timeLeft / duration);
        
        // Launch confetti from multiple positions
        confetti({
          particleCount: Math.floor(particleCount),
          startVelocity: 30,
          spread: 360,
          scalar: 1.2, // Larger confetti pieces
          ticks: 200, // How long particles stay visible
          origin: {
            x: randomInRange(0.1, 0.3),
            y: Math.random() - 0.2
          }
        });
        
        confetti({
          particleCount: Math.floor(particleCount),
          startVelocity: 30,
          spread: 360,
          scalar: 1.2,
          ticks: 200,
          origin: {
            x: randomInRange(0.7, 0.9),
            y: Math.random() - 0.2
          }
        });
      }, 250);
    }
  }, [messageType]);

  // Newsletter Detail View Component
  const NewsletterDetailView = ({ newsletter }: { newsletter: NewsletterContent }) => {
    const dateObj = new Date(newsletter.published_date);
    const formattedDate = dateObj.toLocaleDateString('tr-TR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    return (
      <div className={`min-h-screen ${theme.sectionBg}`}>
        {/* Header with back button */}
        <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setSelectedNewsletter(null)}
                className="flex items-center gap-2"
                id="back-button"
              >
                ← Geri Dön
              </Button>
              <div>
                <h1 className={`text-lg font-semibold ${theme.titleColor}`}>FinGist</h1>
                <p className={`text-sm ${theme.bodyTextColor}`}>Finansal AI Bülteni</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <article className={`${theme.cardBg} rounded-xl p-8 shadow-lg`}>
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <time className={`text-sm font-medium ${theme.dateColor}`}>
                  {formattedDate}
                </time>
                <div className="flex flex-wrap gap-2">
                  {newsletter.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className={`px-2 py-1 text-xs rounded-full bg-emerald-100 dark:bg-emerald-900/30 ${theme.bodyTextColor}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h1 className={`text-3xl sm:text-4xl font-bold ${theme.titleColor} mb-4`}>
                {newsletter.title}
              </h1>
              {newsletter.excerpt && (
                <p className={`text-lg ${theme.subtitleColor} leading-relaxed`}>
                  {newsletter.excerpt}
                </p>
              )}
            </header>

            {/* Article Content */}
            <div className={`prose prose-lg max-w-none ${theme.bodyTextColor}`}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({ className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const isInline = !match;
                    
                    return !isInline ? (
                      <SyntaxHighlighter
                        style={tomorrow as any}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={`${className} bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-sm`} {...props}>
                        {children}
                      </code>
                    );
                  },
                  h1: ({ children }) => (
                    <h1 className={`text-2xl font-bold ${theme.titleColor} mt-8 mb-4`}>
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className={`text-xl font-semibold ${theme.titleColor} mt-6 mb-3`}>
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className={`text-lg font-semibold ${theme.titleColor} mt-4 mb-2`}>
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className={`${theme.bodyTextColor} mb-4 leading-relaxed`}>
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className={`${theme.bodyTextColor} mb-4 ml-6 list-disc space-y-1`}>
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className={`${theme.bodyTextColor} mb-4 ml-6 list-decimal space-y-1`}>
                      {children}
                    </ol>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className={`border-l-4 border-emerald-500 pl-4 py-2 ${theme.cardBg} rounded-r-lg my-4`}>
                      {children}
                    </blockquote>
                  ),
                  a: ({ children, href }) => (
                    <a 
                      href={href} 
                      className={`${theme.dateColor} hover:underline`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {newsletter.content}
              </ReactMarkdown>
            </div>
          </article>

          {/* Newsletter subscription CTA at bottom */}
          <div className={`${theme.formBg} rounded-2xl shadow-xl p-8 max-w-md mx-auto backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 mt-12`}>
            <h3 className={`text-xl font-semibold mb-2 ${theme.formTextColor}`}>
              Böyle İçerikleri Kaçırmayın
            </h3>
            <p className={`text-sm ${theme.bodyTextColor} mb-6`}>
              Her gün e-postanızda benzer analizler
            </p>
            <form 
              className="space-y-4" 
              id="detail-newsletter-signup"
              ref={bottomFormRef}
              onSubmit={handleBottomFormSubmit}
            >
              <Input
                type="email" 
                name="email"
                placeholder="E-posta adresinizi girin"
                className="w-full text-center text-lg h-12"
                id="detail-email-input"
                required
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                className={`w-full h-12 text-lg font-semibold ${theme.primaryButton}`}
                id="detail-subscribe-button"
                disabled={isLoading}
              >
                {isLoading ? "Kaydediliyor..." : "Ücretsiz Başla"}
              </Button>
            </form>
            
            {/* Success/Error Message */}
            {message && (
              <div className={`mt-4 p-3 rounded-lg text-sm text-center ${
                messageType === 'success' 
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              }`}>
                {message}
              </div>
            )}
            
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className={`text-sm ${theme.bodyTextColor}`}>
                AI • Günlük • Ücretsiz
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // If a newsletter is selected, show the detail view
  if (selectedNewsletter) {
    return <NewsletterDetailView newsletter={selectedNewsletter} />;
  }

  return (
    <>
      <div className={`min-h-screen ${theme.heroGradient}`}>
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          {/* Background Orb */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div style={{ width: '800px', height: '800px', position: 'relative' }}>
              <Orb
                hoverIntensity={0.3}
                rotateOnHover={false}
                hue={theme.orbHue}
                forceHoverState={false}
              />
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-full border border-white/30 dark:border-white/20">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" id="ai-status-indicator"></div>
                <span className={`text-sm font-medium ${theme.subtitleColor}`}>Finansal AI Bülteni</span>
              </div>
            </div>

            <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 ${theme.titleColor}`}>
              FinGist
            </h1>
            
            <div className={`text-xl sm:text-2xl lg:text-3xl mb-8 ${theme.subtitleColor}`}>
              Günlük{" "}
              <RotatingText
                texts={[
                  'piyasa özetiniz',
                  'finansal analiziniz', 
                  'yatırım rehberiniz',
                  'ekonomi bülteniniz'
                ]}
                mainClassName={`inline-block px-3 py-1 ${theme.rotatingTextBg} rounded-lg font-semibold`}
                staggerFrom="first"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                staggerDuration={0.02}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                rotationInterval={3000}
              />
              {" "}hazır
            </div>

            <p className={`text-lg sm:text-xl mb-8 ${theme.bodyTextColor} max-w-2xl mx-auto leading-relaxed`}>
              Binlerce finansal kaynağı takip ediyoruz, sizin için önemli olanları seçip günlük bültene dönüştürüyoruz. Gürültü yok, sadece önemli bilgiler.
            </p>

            {/* AI Features */}
            <div className="grid md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
              <div className="bg-white/80 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-white/10" id="ai-feature-comprehensive">
                <div className="text-2xl mb-2">📚</div>
                <h3 className={`font-semibold ${theme.titleColor} mb-1`}>Kapsamlı Takip</h3>
                <p className={`text-sm ${theme.bodyTextColor}`}>Yüzlerce kaynaktan önemli özetleri okuyun</p>
              </div>
              <div className="bg-white/80 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-white/10" id="ai-feature-curated">
                <div className="text-2xl mb-2">✨</div>
                <h3 className={`font-semibold ${theme.titleColor} mb-1`}>Özenle Seçilmiş</h3>
                <p className={`text-sm ${theme.bodyTextColor}`}>Gereksiz bilgi kirliliği olmadan bilgilenin</p>
              </div>
              <div className="bg-white/80 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-white/10" id="ai-feature-daily">
                <div className="text-2xl mb-2">⏰</div>
                <h3 className={`font-semibold ${theme.titleColor} mb-1`}>Her Gün</h3>
                <p className={`text-sm ${theme.bodyTextColor}`}>Düzenli olarak her gün haberdar olun</p>
              </div>
            </div>

            {/* Email Subscription Form */}
            <div className={`${theme.formBg} rounded-2xl shadow-xl p-8 max-w-md mx-auto backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80`}>
              <h3 className={`text-xl font-semibold mb-2 ${theme.formTextColor}`}>
                12.000+ Akıllı Yatırımcıya Katılın
              </h3>
              <p className={`text-sm ${theme.bodyTextColor} mb-6`}>
                Her gün e-postanızda finansal özet
              </p>
              <form 
                className="space-y-4" 
                id="newsletter-signup"
                ref={mainFormRef}
                onSubmit={handleMainFormSubmit}
              >
                <Input
                  type="email" 
                  name="email"
                  placeholder="E-posta adresinizi girin"
                  className="w-full text-center text-lg h-12"
                  id="email-input"
                  required
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  className={`w-full h-12 text-lg font-semibold ${theme.primaryButton}`}
                  id="subscribe-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Kaydediliyor..." : "Ücretsiz Başla"}
                </Button>
              </form>
              
              {/* Success/Error Message */}
              {message && (
                <div className={`mt-4 p-3 rounded-lg text-sm text-center ${
                  messageType === 'success' 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {message}
                </div>
              )}
              
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className={`text-sm ${theme.bodyTextColor}`}>
                  AI • Günlük • Ücretsiz
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Capabilities Section */}
        <section className={`relative z-10 py-20 px-4 sm:px-6 lg:px-8 ${theme.sectionBg}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-4 ${theme.titleColor}`}>
              Nasıl Çalışıyor
            </h2>
            <p className={`text-center ${theme.bodyTextColor} mb-16 max-w-2xl mx-auto`}>
              Finansal piyasaları sürekli takip ediyor, önemli gelişmeleri sağlayarak günlük bülteninizi hazırlıyoruz. Saatlerce zaman kazanın.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center" id="ai-step-1">
                <div className={`w-16 h-16 ${theme.rotatingTextBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className={`font-semibold ${theme.titleColor} mb-2`}>Veri Toplama</h3>
                <p className={`text-sm ${theme.bodyTextColor}`}>
                  Yüzlerce finansal kaynağı tarayarak en önemli haberleri ve gelişmeleri belirliyoruz
                </p>
              </div>
              <div className="text-center" id="ai-step-2">
                <div className={`w-16 h-16 ${theme.rotatingTextBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className={`font-semibold ${theme.titleColor} mb-2`}>İçerik Seçimi</h3>
                <p className={`text-sm ${theme.bodyTextColor}`}>
                  Piyasa için gerçekten önemli olan haberleri ayıklayarak gürültüyü filtreliyoruz
                </p>
              </div>
              <div className="text-center" id="ai-step-4">
                <div className={`w-16 h-16 ${theme.rotatingTextBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className={`font-semibold ${theme.titleColor} mb-2`}>Düzenli Teslimat</h3>
                <p className={`text-sm ${theme.bodyTextColor}`}>
                  Her sabah aynı saatte, düzenli olarak hazırlanmış bülteninizi teslim ediyoruz
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Past Issues Section */}
        <section className={`relative z-10 py-20 px-4 sm:px-6 lg:px-8 ${theme.heroGradient}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-4 ${theme.titleColor}`}>
              Geçmiş Bültenler
            </h2>
            <p className={`text-center ${theme.bodyTextColor} mb-16`}>
              Her gün böyle bir özet e-postanızda olacak.
            </p>
            
            <div className="grid gap-6 md:gap-8">
              {/* Loading State */}
              {newslettersLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
                  <p className={`mt-2 ${theme.bodyTextColor}`}>Bültenler yükleniyor...</p>
                </div>
              )}

              {/* Error State */}
              {newslettersError && (
                <div className="text-center py-8">
                  <p className={`text-red-600 dark:text-red-400`}>
                    Bültenler yüklenirken bir hata oluştu: {newslettersError}
                  </p>
                </div>
              )}

              {/* Newsletter Content */}
              {!newslettersLoading && !newslettersError && newsletters.slice(0, 3).map((newsletter, index) => {
                const dateObj = new Date(newsletter.published_date);
                const formattedDate = dateObj.toLocaleDateString('tr-TR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                });
                
                return (
                  <article 
                    key={newsletter.id}
                    className={`${theme.cardBorder} ${theme.cardBg} border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:scale-[1.02] transform transition-transform`}
                    id={`newsletter-${newsletter.id}`}
                    onClick={() => setSelectedNewsletter(newsletter)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <time className={`text-sm font-medium ${theme.dateColor}`}>
                        {formattedDate}
                      </time>
                      <div className="flex items-center gap-2 mt-1 sm:mt-0">
                        <span className={`text-xs ${theme.bodyTextColor}`}>
                          Sayı #{newsletters.length - index}
                        </span>
                      </div>
                    </div>
                    <h3 className={`text-xl font-semibold mb-3 ${theme.titleColor}`}>
                      {newsletter.title}
                    </h3>
                    <p className={`${theme.bodyTextColor} leading-relaxed mb-4`}>
                      {newsletter.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {newsletter.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className={`px-2 py-1 text-xs rounded-full bg-emerald-100 dark:bg-emerald-900/30 ${theme.bodyTextColor}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${theme.dateColor} hover:underline`}>
                        Devamını oku →
                      </span>
                      <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <span className="text-emerald-600 dark:text-emerald-400 text-sm">→</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className={`${theme.formBg} rounded-2xl shadow-xl p-8 max-w-md mx-auto backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 mt-12`}>
              <h3 className={`text-xl font-semibold mb-2 ${theme.formTextColor}`}>
                Her Gün Böyle Bir Özet Alın
              </h3>
              <p className={`text-sm ${theme.bodyTextColor} mb-6`}>
                Binlerce akıllı yatırımcıya katılın
              </p>
              <form 
                className="space-y-4" 
                id="bottom-newsletter-signup"
                ref={bottomFormRef}
                onSubmit={handleBottomFormSubmit}
              >
                <Input
                  type="email" 
                  name="email"
                  placeholder="E-posta adresinizi girin"
                  className="w-full text-center text-lg h-12"
                  id="bottom-email-input"
                  required
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  className={`w-full h-12 text-lg font-semibold ${theme.primaryButton}`}
                  id="bottom-subscribe-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Kaydediliyor..." : "Ücretsiz Başla"}
                </Button>
              </form>
              
              {/* Success/Error Message */}
              {message && (
                <div className={`mt-4 p-3 rounded-lg text-sm text-center ${
                  messageType === 'success' 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {message}
                </div>
              )}
              
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className={`text-sm ${theme.bodyTextColor}`}>
                  AI • Günlük • Ücretsiz
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-12 px-4 sm:px-6 lg:px-8 ${theme.footerBg}`}>
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">FinGist</h3>
            <p className={`${theme.footerText} mb-6`}>
              Finansal AI bülteni. Akıllı yatırımı herkese ulaştırıyoruz.
            </p>
            <div className={`flex justify-center space-x-6 text-sm ${theme.footerText}`}>
              <a href="#" className={`transition-colors ${theme.footerLinkHover}`} id="privacy-link">Gizlilik</a>
              <a href="#" className={`transition-colors ${theme.footerLinkHover}`} id="terms-link">Şartlar</a>
              <a href="#" className={`transition-colors ${theme.footerLinkHover}`} id="ai-ethics-link">Etik İlkeler</a>
              <a href="#" className={`transition-colors ${theme.footerLinkHover}`} id="contact-link">İletişim</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
