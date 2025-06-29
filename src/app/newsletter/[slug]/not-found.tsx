import Link from "next/link";
import { Button } from "@/components/ui/button";

const theme = {
  sectionBg: 'bg-teal-50 dark:bg-emerald-950',
  titleColor: 'text-emerald-900 dark:text-emerald-100',
  subtitleColor: 'text-emerald-800 dark:text-emerald-200',
  bodyTextColor: 'text-emerald-700 dark:text-emerald-300',
  primaryButton: 'bg-emerald-600 hover:bg-teal-600 text-white',
};

export default function NewsletterNotFound() {
  return (
    <div className={`min-h-screen ${theme.sectionBg} flex items-center justify-center px-4`}>
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <span className="text-6xl">📰</span>
        </div>
        
        <h1 className={`text-3xl font-bold ${theme.titleColor} mb-4`} id="not-found-title">
          Bülten Bulunamadı
        </h1>
        
        <p className={`${theme.bodyTextColor} mb-8 leading-relaxed`} id="not-found-description">
          Aradığınız bülten bulunamadı. Belki de henüz yayınlanmamış olabilir.
        </p>
        
        <div className="space-y-4">
          <Link href="/">
            <Button className={`${theme.primaryButton} w-full`} id="back-home-button">
              Ana Sayfaya Dön
            </Button>
          </Link>
          
          <p className={`text-sm ${theme.bodyTextColor}`}>
            veya günlük bültenlerimize abone olun
          </p>
        </div>
      </div>
    </div>
  );
} 