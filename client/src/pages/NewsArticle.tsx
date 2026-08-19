import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ChevronLeft, Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { apiService } from '../services/api';
import { NewsArticle as NewsArticleType } from '../types';
import { newsData } from '../data/news';
import { formatDate } from '../utils/cn';

export const NewsArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsArticleType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    apiService.getNewsBySlug(slug).then((data) => {
      if (data) {
        setArticle(data);
      } else {
        const fallback = newsData.find((n) => n.slug === slug);
        if (fallback) setArticle(fallback);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <PageWrapper title="Loading Article...">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center font-mono text-xs text-rtist-accent">
          RETRIEVING DISPATCH...
        </div>
      </PageWrapper>
    );
  }

  if (!article) {
    return (
      <PageWrapper title="Article Not Found">
        <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
          <div className="text-xl font-mono text-rtist-accent uppercase">
            [ ERROR 404: DISPATCH_NOT_FOUND ]
          </div>
          <p className="text-sm text-rtist-textMuted">
            The requested news article does not exist or has been retracted.
          </p>
          <Button to="/news" variant="primary" icon={<ChevronLeft className="w-4 h-4" />} iconPosition="left">
            BACK TO NEWS ARCHIVES
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title={article.title}
      description={article.excerpt}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 font-mono text-xs text-rtist-textMuted">
          <Link to="/news" className="hover:text-rtist-accent transition-colors flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            NEWS ARCHIVES
          </Link>
          <span>/</span>
          <span className="text-rtist-accent uppercase">{article.category}</span>
          <span>/</span>
          <span className="text-white truncate max-w-xs">{article.title}</span>
        </div>

        {/* Header */}
        <div className="bg-rtist-card border border-rtist-border p-6 sm:p-8 tech-bracket mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="accent">{article.category}</Badge>
            <Badge variant="muted">OFFICIAL DISPATCH</Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white uppercase font-sans leading-tight">
            {article.title}
          </h1>

          <div className="mt-6 pt-4 border-t border-rtist-border flex flex-wrap items-center gap-6 font-mono text-xs text-rtist-textMuted">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-rtist-accent" />
              <span>Published: {formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-rtist-cyan" />
              <span>{article.author}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {article.thumbnailUrl && (
          <div className="mb-8 border border-rtist-border overflow-hidden h-72 sm:h-96 bg-black">
            <img
              src={article.thumbnailUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Body Content */}
        <div className="bg-rtist-card border border-rtist-border p-6 sm:p-10 space-y-6 text-sm text-rtist-text leading-relaxed font-sans">
          {article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-lg font-bold text-white font-sans uppercase pt-4">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            return (
              <p key={idx} className="text-rtist-textMuted leading-relaxed">
                {paragraph}
              </p>
            );
          })}

          {/* Tags */}
          <div className="pt-6 border-t border-rtist-border flex items-center gap-2 flex-wrap font-mono text-xs">
            <Tag className="w-3.5 h-3.5 text-rtist-accent" />
            <span className="text-rtist-textMuted">TAGS:</span>
            {article.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-rtist-surface text-rtist-textMuted border border-rtist-border text-[11px]"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 pt-6 border-t border-rtist-border flex items-center justify-between">
          <Button
            to="/news"
            variant="outline"
            size="md"
            icon={<ChevronLeft className="w-4 h-4" />}
            iconPosition="left"
          >
            BACK TO ALL NEWS
          </Button>

          <Button
            to="/join"
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            APPLY FOR RECRUITMENT
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};
