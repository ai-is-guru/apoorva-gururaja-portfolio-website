
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Newspaper, ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const formatDate = (dateString: string) => {
    return dateString;
  };

  if (selectedPost) {
    return (
      <div className="h-full w-full overflow-y-auto thin-scrollbar pb-20 px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="mb-6 sm:mb-8 flex items-center gap-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Blogs</span>
          </button>

          {/* Post Content */}
          <article className="bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 border border-white/30 dark:border-white/10 shadow-xl">
            {/* Post Header */}
            <header className="mb-12 sm:mb-16">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 text-xs font-semibold tracking-wide uppercase">
                  <Tag size={11} />
                  {selectedPost.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-neutral-400 text-sm font-medium">
                  <Calendar size={13} />
                  {formatDate(selectedPost.date)}
                </span>
                {selectedPost.author && (
                  <span className="text-slate-600 dark:text-neutral-400 text-sm font-medium">
                    by {selectedPost.author}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
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
                <div className="text-slate-600 dark:text-neutral-400 leading-[1.85] text-base sm:text-lg md:text-xl space-y-8">
                  {selectedPost.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-0 font-normal tracking-normal">
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
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto thin-scrollbar pb-20 px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 sm:mb-8 flex items-center gap-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        {/* Header */}
        <header className="mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight">
            Blogs
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-neutral-400 leading-relaxed max-w-3xl font-normal tracking-normal">
            Thoughts on AI, Program Management, and building products that make an impact.
          </p>
        </header>

        {/* Blog Posts */}
        {BLOG_POSTS.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-2xl p-12 border border-white/30 dark:border-white/10 shadow-xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-50 dark:bg-orange-950/30 rounded-full mb-6">
              <Newspaper size={40} className="text-orange-500" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 tracking-tight leading-snug">
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
                className="group bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/30 dark:border-white/10 hover:border-white/50 dark:hover:border-white/20 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl"
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
                        <span className="text-slate-500 dark:text-neutral-400 text-sm font-medium">
                          {formatDate(post.date)}
                        </span>
                        {post.author && (
                          <span className="text-slate-600 dark:text-neutral-400 text-sm font-medium">
                            by {post.author}
                          </span>
                        )}
                      </div>
                      
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-tight tracking-tight">
                        {post.title}
                      </h2>
                      
                      <p className="text-slate-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed mb-6 line-clamp-3 font-normal tracking-normal">
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
  );
};

export default Blog;
