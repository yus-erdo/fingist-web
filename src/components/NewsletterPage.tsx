"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEmailSubscription } from "@/hooks/useEmailSubscription";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FormEvent, useRef } from "react";
import React from "react";

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

interface NewsletterPageProps {
  newsletter: NewsletterContent;
}

const theme = {
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
};

export default function NewsletterPage({ newsletter }: NewsletterPageProps) {
  const { isLoading, message, messageType, subscribe } = useEmailSubscription();
  const formRef = useRef<HTMLFormElement>(null);

  const dateObj = new Date(newsletter.published_date);
  const formattedDate = dateObj.toLocaleDateString('tr-TR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    await subscribe(email, 'newsletter');
  };

  return (
    <div className={`min-h-screen ${theme.sectionBg}`}>
      {/* Header with back button */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                id="back-button"
              >
                ← Geri Dön
              </Button>
            </Link>
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
              <time className={`text-sm font-medium ${theme.dateColor}`} id="article-date">
                {formattedDate}
              </time>
              <div className="flex flex-wrap gap-2">
                {newsletter.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className={`px-2 py-1 text-xs rounded-full bg-emerald-100 dark:bg-emerald-900/30 ${theme.bodyTextColor}`}
                    id={`tag-${index}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h1 className={`text-3xl sm:text-4xl font-bold ${theme.titleColor} mb-4`} id="article-title">
              {newsletter.title}
            </h1>
            {newsletter.excerpt && (
              <p className={`text-lg ${theme.subtitleColor} leading-relaxed`} id="article-excerpt">
                {newsletter.excerpt}
              </p>
            )}
          </header>

          {/* Article Content */}
          <div className={`newsletter-content max-w-none ${theme.bodyTextColor} [&>*]:max-w-none`} id="article-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const isInline = !match;
                  
                  return !isInline ? (
                    <SyntaxHighlighter
                      style={tomorrow as Record<string, React.CSSProperties>}
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
                  <h1 className={`text-2xl font-bold ${theme.titleColor} mt-8 mb-4 border-b border-emerald-200 dark:border-emerald-700 pb-2`}>
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className={`text-xl font-semibold ${theme.titleColor} mt-6 mb-3 flex items-center gap-2`}>
                    <span className="text-emerald-500">📊</span>
                    {children}
                  </h2>
                ),
                h3: ({ children }) => {
                  const childrenString = String(children).toLowerCase();
                  const isSourcesSection = childrenString.includes('kaynak');
                  
                  if (isSourcesSection) {
                    return (
                      <div className="mt-8 mb-4">
                        <h3 className={`text-base font-semibold ${theme.titleColor} flex items-center gap-2 mb-3 pb-2 border-b border-emerald-200 dark:border-emerald-700`}>
                          <span className="text-emerald-500 text-sm">🔗</span>
                          {children}
                        </h3>
                      </div>
                    );
                  }
                  
                  return (
                    <h3 className={`text-lg font-semibold ${theme.titleColor} mt-6 mb-3 flex items-center gap-2`}>
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      {children}
                    </h3>
                  );
                },
                p: ({ children }) => {
                  // Convert children to string to check for numbered sources
                  const childrenArray = React.Children.toArray(children);
                  const textContent = childrenArray.map(child => {
                    if (typeof child === 'string') return child;
                    if (React.isValidElement(child)) {
                      const props = child.props as { children?: React.ReactNode };
                      if (props.children) {
                        return String(props.children);
                      }
                    }
                    return '';
                  }).join('');
                  
                  // Check if this paragraph contains multiple numbered sources (like [1] ... [2] ... [3])
                  const numberedSourceMatches = textContent.match(/\[\d+\]/g);
                  const hasMultipleNumberedSources = numberedSourceMatches && numberedSourceMatches.length > 1;
                  
                  if (hasMultipleNumberedSources) {
                    // Split content by numbered sources and create separate lines
                    const parts = [];
                    // Parse numbered sources and split into separate lines
                    
                    // Find all numbered source positions
                    const sourcePattern = /(\[\d+\][^[]*?)(?=\[\d+\]|$)/g;
                    let match;
                    
                    while ((match = sourcePattern.exec(textContent)) !== null) {
                      const sourceText = match[1].trim();
                      if (sourceText) {
                        parts.push(sourceText);
                      }
                    }
                    
                                         return (
                       <div className={`${theme.bodyTextColor} mb-4 space-y-1.5`}>
                         {parts.map((part, index) => (
                           <div 
                             key={index}
                             className="bg-emerald-50 dark:bg-emerald-900/20 p-2.5 rounded-md border-l-3 border-emerald-300 dark:border-emerald-600 leading-snug text-sm"
                           >
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              rehypePlugins={[rehypeRaw]}
                              components={{
                                a: ({ children, href }) => {
                                  const childText = String(children);
                                  const isNumericCitation = /^\[\d+\]$/.test(childText.trim());
                                  
                                                                     if (isNumericCitation) {
                                     return (
                                       <sup className="mx-0.5">
                                         <a 
                                           href={href} 
                                           className={`inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 rounded-full border border-emerald-300 dark:border-emerald-600 transition-all duration-200 hover:scale-110 no-underline shadow-sm`}
                                           target="_blank"
                                           rel="noopener noreferrer"
                                           title={`Kaynak ${children}: ${href}`}
                                         >
                                           {childText.replace(/[\[\]]/g, '')}
                                         </a>
                                       </sup>
                                     );
                                   }
                                  
                                  const isLongUrl = href && href.length > 50;
                                  const displayText = isLongUrl && typeof children === 'string' && children === href 
                                    ? `${children.substring(0, 40)}...` 
                                    : children;
                                  
                                  return (
                                    <a 
                                      href={href} 
                                      className={`${theme.dateColor} hover:underline font-normal transition-colors duration-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 px-0.5 py-0.5 rounded break-words inline-block text-xs`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      title={href}
                                    >
                                      {displayText}
                                    </a>
                                  );
                                },
                                p: ({ children }) => <span>{children}</span>
                              }}
                            >
                              {part}
                            </ReactMarkdown>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  
                  // Check if paragraph contains a single numbered source
                  const hasSingleNumberedSource = /^\[\d+\]/.test(textContent.trim());
                  
                  if (hasSingleNumberedSource) {
                    return (
                      <div className={`${theme.bodyTextColor} mb-2 leading-snug bg-emerald-50 dark:bg-emerald-900/20 p-2.5 rounded-md border-l-3 border-emerald-300 dark:border-emerald-600 text-sm`}>
                        {children}
                      </div>
                    );
                  }
                  
                  return (
                    <p className={`${theme.bodyTextColor} mb-4 leading-relaxed text-justify`}>
                      {children}
                    </p>
                  );
                },
                ul: ({ children }) => (
                  <ul className={`${theme.bodyTextColor} mb-6 ml-4 space-y-2 list-none`}>
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="relative pl-6">
                    <span className="absolute left-0 top-2 w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <div className="leading-relaxed">
                      {children}
                    </div>
                  </li>
                ),
                ol: ({ children }) => (
                  <ol className={`${theme.bodyTextColor} mb-6 ml-6 list-decimal space-y-2`}>
                    {children}
                  </ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className={`border-l-4 border-emerald-500 pl-6 py-4 my-6 ${theme.cardBg} rounded-r-lg bg-emerald-50 dark:bg-emerald-900/20 italic`}>
                    <span className="text-emerald-600 dark:text-emerald-400 text-2xl">&ldquo;</span>
                    {children}
                    <span className="text-emerald-600 dark:text-emerald-400 text-2xl">&rdquo;</span>
                  </blockquote>
                ),
                a: ({ children, href }) => {
                  const childText = String(children);
                  
                  // Enhanced citation formatting for numbered citations like [1], [2], etc.
                  const isNumericCitation = /^\[\d+\]$/.test(childText.trim());
                  
                  if (isNumericCitation) {
                    return (
                      <sup className="mx-1">
                        <a 
                          href={href} 
                          className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 rounded-full border border-emerald-300 dark:border-emerald-600 transition-all duration-200 hover:scale-110 no-underline shadow-sm`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Kaynak ${children}: ${href}`}
                          id={`citation-${children}`}
                        >
                          {childText.replace(/[\[\]]/g, '')}
                        </a>
                      </sup>
                    );
                  }
                  
                  // Check if this is a long URL that should be truncated
                  const isLongUrl = href && href.length > 50;
                  const displayText = isLongUrl && typeof children === 'string' && children === href 
                    ? `${children.substring(0, 40)}...` 
                    : children;
                  
                  // Regular links with improved styling
                  return (
                    <a 
                      href={href} 
                      className={`${theme.dateColor} hover:underline font-medium transition-colors duration-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 px-1 py-0.5 rounded break-words inline-block`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={href}
                    >
                      {displayText}
                    </a>
                  );
                },
                hr: () => (
                  <hr className="my-8 border-emerald-200 dark:border-emerald-700" />
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="min-w-full border border-emerald-200 dark:border-emerald-700 rounded-lg">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/50 border-b border-emerald-200 dark:border-emerald-700 font-semibold text-left">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-2 border-b border-emerald-100 dark:border-emerald-800">
                    {children}
                  </td>
                ),

              }}
            >
              {newsletter.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Newsletter subscription CTA at bottom */}
        <div className={`${theme.formBg} rounded-2xl shadow-xl p-8 max-w-md mx-auto backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 mt-12`}>
          <h3 className={`text-xl font-semibold mb-2 ${theme.formTextColor}`} id="cta-title">
            Böyle İçerikleri Kaçırmayın
          </h3>
          <p className={`text-sm ${theme.bodyTextColor} mb-6`} id="cta-description">
            Her gün e-postanızda benzer analizler
          </p>
          <form 
            className="space-y-4" 
            id="newsletter-signup-form"
            ref={formRef}
            onSubmit={handleFormSubmit}
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
            }`} id="subscription-message">
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
} 