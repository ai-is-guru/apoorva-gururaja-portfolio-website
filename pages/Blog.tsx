
import React, { useState } from 'react';
import Window from '../components/Window';
import { Newspaper, ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const formatDate = (dateString: string) => {
    return dateString;
  };

  if (selectedPost) {
    return (
      <Window 
        title="Blogs" 
        icon={<Newspaper size={12} className="text-orange-500" />}
        maxWidth="max-w-5xl"
      >
        <div className="bg-white dark:bg-slate-950 min-h-full">
          {/* Header with back button */}
          <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-6 sm:px-8 md:px-12 py-5">
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>

          {/* Post Content */}
          <article className="px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 max-w-4xl mx-auto">
            {/* Post Header */}
            <header className="mb-12 sm:mb-16">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 text-xs font-semibold tracking-wide uppercase">
                  <Tag size={11} />
                  {selectedPost.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm font-medium">
                  <Calendar size={13} />
                  {formatDate(selectedPost.date)}
                </span>
                {selectedPost.author && (
                  <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                    by {selectedPost.author}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
                {selectedPost.title}
              </h1>
              
              {selectedPost.image && (
                <div className="w-full h-[280px] sm:h-[360px] md:h-[420px] rounded-xl overflow-hidden mb-10 shadow-xl">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </header>

            {/* Post Body */}
            {selectedPost.content && (
              <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                <div className="text-slate-700 dark:text-slate-300 leading-[1.85] text-base sm:text-lg md:text-xl space-y-8">
                  {selectedPost.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-0 font-light">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {!selectedPost.content && (
              <div className="text-slate-500 dark:text-slate-400 italic text-center py-12">
                Full content coming soon...
              </div>
            )}
          </article>
        </div>
      </Window>
    );
  }

  return (
    <Window title="Blogs" icon={<Newspaper size={12} className="text-orange-500" />}>
      <div className="bg-white dark:bg-slate-950 min-h-full">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-12 sm:py-16">
          {/* Header */}
          <header className="mb-12 sm:mb-16">
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              Thoughts on AI, Program Management, and building products that make an impact.
            </p>
          </header>

          {/* Blog Posts */}
          {BLOG_POSTS.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-50 dark:bg-orange-950/30 rounded-full mb-6">
                <Newspaper size={40} className="text-orange-500" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-4">
                Coming Soon
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                I'm currently writing some thoughts on AI Product Management and Strategy. Check back soon for new articles!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Post Image */}
                    {post.image && (
                      <div className="w-full md:w-80 lg:w-96 h-64 md:h-auto overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Post Content */}
                    <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 text-xs font-semibold tracking-wide uppercase">
                            {post.category}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                            {formatDate(post.date)}
                          </span>
                          {post.author && (
                            <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                              by {post.author}
                            </span>
                          )}
                        </div>
                        
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-tight">
                          {post.title}
                        </h2>
                        
                        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                      
                      {post.content && (
                        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-sm font-medium group-hover:gap-3 transition-all">
                          <span>Read article</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </Window>
  );
};

export default Blog;
