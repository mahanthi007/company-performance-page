
import React from 'react';
import { ExternalLink, Clock } from 'lucide-react';

interface NewsItem {
  title: string;
  source: string;
  timestamp: string;
  url: string;
  thumbnail?: string;
  summary: string;
}

interface NewsSectionProps {
  news: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  return (
    <div className="bg-card border rounded-xl animate-fade-in-delayed opacity-0" style={{ '--index': 2 } as React.CSSProperties}>
      <div className="p-5 border-b">
        <h2 className="text-lg font-medium">Latest News & Updates</h2>
      </div>
      <div className="p-5 max-h-[400px] overflow-y-auto">
        {news.map((item, index) => (
          <div 
            key={index} 
            className="news-item"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex gap-4">
              {item.thumbnail && (
                <div className="hidden md:block flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-cover" 
                    loading="lazy" 
                  />
                </div>
              )}
              <div className="flex-1">
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <h3 className="text-base font-medium mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                    <ExternalLink size={14} className="inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                </a>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-1.5">{item.summary}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.source}</span>
                  <div className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
