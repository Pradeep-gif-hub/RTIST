import React, { useState, useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { TechnicalHeader } from '../components/common/TechnicalHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { apiService } from '../services/api';
import { NewsArticle } from '../types';
import { newsData } from '../data/news';
import { formatDate } from '../utils/cn';

export const News: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>(newsData);

  useEffect(() => {
    apiService.getNews().then((data) => {
      if (data?.length) setNews(data);
    });
  }, []);

  return (
    <PageWrapper
      title="News &amp; Tech Logs"
      description="Official announcements, recruitment updates, tournament debriefs, and engineering logs from RTIST NIT Jalandhar."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechnicalHeader
          label="DISPATCHES // ANNOUNCEMENTS"
          title="CLUB NEWS &amp; ENGINEERING LOGS"
          subtitle="Stay updated on recruitment cycles, competition schedule releases, and workshop activities."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card
              key={item.id}
              tag={item.category.toUpperCase()}
              className="flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="relative h-48 bg-black/40 overflow-hidden">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rtist-card via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="accent">{item.category}</Badge>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 font-mono text-[11px] text-rtist-textMuted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-rtist-accent" />
                      {formatDate(item.publishedAt)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-rtist-cyan" />
                      {item.author}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-rtist-accent transition-colors font-sans line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-rtist-textMuted line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {item.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono bg-rtist-surface text-rtist-textMuted px-1.5 py-0.5 border border-rtist-border"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-rtist-border flex items-center justify-between font-mono text-xs">
                  <span className="text-rtist-textMuted text-[11px] flex items-center gap-1">
                    <Tag className="w-3 h-3 text-rtist-accent" />
                    Official Dispatch
                  </span>
                  <Button
                    to={`/news/${item.slug}`}
                    variant="ghost"
                    size="sm"
                    className="p-0 text-rtist-accent hover:text-white"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    READ ARTICLE
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};
