"use client";

import { useState } from "react";
import Orb from "@/components/ui/orb";
import RotatingText from "@/components/ui/rotatingText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ColorTheme = 'blue' | 'warm' | 'nature' | 'luxury';

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
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>('nature');
  const theme = themes[currentTheme];

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
              <form className="space-y-4" id="newsletter-signup">
                <Input
                  type="email" 
                  placeholder="E-posta adresinizi girin"
                  className="w-full text-center text-lg h-12"
                  id="email-input"
                  required
                />
                <Button 
                  type="submit" 
                  className={`w-full h-12 text-lg font-semibold ${theme.primaryButton}`}
                  id="subscribe-button"
                >
                  Ücretsiz Başla
                </Button>
              </form>
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
              {/* Sample Past Issues */}
              {[
                {
                  date: "15 Ocak 2024",
                  title: "Fed Politikası ve Teknoloji Hisselerindeki Etkileri",
                  summary: "Fed'in faiz açıklamalarının teknoloji sektörü üzerindeki etkilerini analiz ettik. Apple, Microsoft ve Google'ın son haftalardaki performansları ve önümüzdeki dönem beklentileri.",
                  tags: ["Fed Politikası", "Teknoloji", "Faiz"]
                },
                {
                  date: "14 Ocak 2024", 
                  title: "Döviz Piyasalarında Dikkat Çeken Hareketler",
                  summary: "Merkez bankalarının son açıklamalarının ardından döviz kurlarında yaşanan değişimler. EUR/USD, USD/TRY ve GBP/USD paritelerindeki gelişmeler ve anlamları.",
                  tags: ["Döviz", "Merkez Bankaları", "Pariteler"]
                },
                {
                  date: "13 Ocak 2024",
                  title: "Enerji Sektöründe Hareketlilik ve Emtia Fiyatları",
                  summary: "Petrol fiyatlarındaki dalgalanmaların enerji şirketleri üzerindeki etkileri. Shell, Exxon ve yerel enerji şirketlerinin durumu ve sektör görünümü.",
                  tags: ["Enerji", "Emtia", "Petrol"]
                }
              ].map((issue, index) => (
                <article 
                  key={index}
                  className={`${theme.cardBorder} ${theme.cardBg} border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300`}
                  id={`ai-issue-${index + 1}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <time className={`text-sm font-medium ${theme.dateColor}`}>
                      {issue.date}
                    </time>
                    <div className="flex items-center gap-2 mt-1 sm:mt-0">
                      <span className={`text-xs ${theme.bodyTextColor}`}>
                        Sayı #{3 - index}
                      </span>
                    </div>
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${theme.titleColor}`}>
                    {issue.title}
                  </h3>
                  <p className={`${theme.bodyTextColor} leading-relaxed mb-4`}>
                    {issue.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {issue.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className={`px-2 py-1 text-xs rounded-full bg-emerald-100 dark:bg-emerald-900/30 ${theme.bodyTextColor}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className={`${theme.formBg} rounded-2xl shadow-xl p-8 max-w-md mx-auto backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 mt-12`}>
              <h3 className={`text-xl font-semibold mb-2 ${theme.formTextColor}`}>
                Her Gün Böyle Bir Özet Alın
              </h3>
              <p className={`text-sm ${theme.bodyTextColor} mb-6`}>
                Binlerce akıllı yatırımcıya katılın
              </p>
              <form className="space-y-4" id="bottom-newsletter-signup">
                <Input
                  type="email" 
                  placeholder="E-posta adresinizi girin"
                  className="w-full text-center text-lg h-12"
                  id="bottom-email-input"
                  required
                />
                <Button 
                  type="submit" 
                  className={`w-full h-12 text-lg font-semibold ${theme.primaryButton}`}
                  id="bottom-subscribe-button"
                >
                  Ücretsiz Başla
                </Button>
              </form>
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
