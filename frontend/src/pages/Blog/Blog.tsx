import React, { useState, useEffect } from "react";
import api from "../../services/api";

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  createdAt: string;
  featuredImage?: string;
  readTime: number;
}

const OurBlog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      console.log('📝 Fetching blog posts...');
      
      // Fallback to mock data if API fails
      setBlogPosts([
        {
          _id: '1',
          title: "Celebrating 20th Anniversary Of Soho Hotel",
          content: "Join us as we celebrate two decades of exceptional service at Mediquick Stays. Our journey began with a simple vision: to provide healthcare travelers with comfortable, healing-focused accommodations. Over the years, we've expanded our services, improved our facilities, and most importantly, helped thousands of patients and their families during their medical journeys.\n\nOur commitment to excellence has earned us numerous awards and, more importantly, the trust of medical professionals and patients alike. We continue to innovate and improve, ensuring that every stay with us contributes positively to your healing process.",
          author: "Dr. Sarah Johnson",
          createdAt: new Date().toISOString(),
          readTime: 3
        },
        {
          _id: '2',
          title: "Our New York Hotel Has Been Newly Renovated!",
          content: "We're excited to announce the completion of our major renovation at the New York Mediquick Stays location! The entire facility has been upgraded with state-of-the-art medical support features and enhanced comfort amenities.\n\n**New Features Include:**\n- Soundproof rooms for better rest\n- Advanced air purification systems\n- Ergonomic furniture for patient comfort\n- Expanded common areas for family gatherings\n- Enhanced accessibility features\n- Private consultation rooms\n\nThe renovation was designed with input from healthcare professionals and former patients to create the optimal healing environment. Every detail has been carefully considered to support your recovery journey.",
          author: "Michael Chen",
          createdAt: new Date().toISOString(),
          readTime: 4
        },
        {
          _id: '3',
          title: "All Rooms Now Equipped With High Speed Wifi",
          content: "Staying connected is more important than ever, especially during medical treatments. That's why we've invested in upgrading all our rooms with enterprise-grade high-speed WiFi.\n\n**Benefits of Our New WiFi System:**\n- **Medical Consultations:** Seamless video calls with your healthcare providers\n- **Entertainment:** Stream movies, music, and shows without interruption\n- **Work & Communication:** Stay connected with family and work\n- **Research:** Access medical information and resources easily\n\nOur network provides reliable connectivity throughout the entire facility, including common areas and gardens. We understand that communication and entertainment play vital roles in the healing process, and we're committed to providing the best possible experience for our guests.",
          author: "IT Department",
          createdAt: new Date().toISOString(),
          readTime: 2
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  const handleReadMore = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
    // Restore body scroll
    document.body.style.overflow = 'auto';
  };

  // Format content with line breaks and basic markdown
  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <p key={index} className="font-semibold text-gray-800 my-2 text-sm">
            {paragraph.slice(2, -2)}
          </p>
        );
      }
      if (paragraph.startsWith('- ')) {
        return (
          <li key={index} className="flex items-start my-1 text-sm">
            <span className="text-indigo-500 mr-2 mt-1">•</span>
            <span>{paragraph.slice(2)}</span>
          </li>
        );
      }
      if (paragraph.trim() === '') {
        return <br key={index} />;
      }
      return (
        <p key={index} className="my-2 leading-relaxed text-sm">
          {paragraph}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">Our Blog</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              Stay updated with the latest news, tips, and stories from Mediquick Stays
            </p>
          </div>
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-gray-600 text-sm">Loading blog posts...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Our Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Stay updated with the latest news, tips, and stories from Mediquick Stays
          </p>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-yellow-400">⚠</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-xs font-medium text-yellow-800">
                    Connection Issue
                  </h3>
                  <div className="mt-1 text-xs text-yellow-700">
                    <p>{error}. Showing demo content.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {blogPosts.length === 0 ? (
          <div className="text-center py-8">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">No Blog Posts Yet</h3>
              <p className="text-gray-600 mb-3 text-sm">Check back later for updates and news from Mediquick Stays.</p>
              <button 
                onClick={fetchBlogPosts}
                className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
              >
                Refresh
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {blogPosts.map((post) => (
              <article key={post._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Blog Image */}
                <div className="h-40 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center relative overflow-hidden">
                  {post.featuredImage ? (
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="text-white text-3xl">📖</div>
                  )}
                  <div className="absolute top-3 right-3 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {post.readTime} min read
                  </div>
                </div>
                
                <div className="p-4">
                  <h2 className="text-base font-bold text-gray-800 mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-3 line-clamp-3 text-sm">
                    {post.excerpt || getExcerpt(post.content)}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span>{formatDate(post.createdAt)}</span>
                    <span className="font-medium">By {post.author}</span>
                  </div>
                  
                  <button 
                    onClick={() => handleReadMore(post)}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center group text-sm"
                  >
                    Read More
                    <svg 
                      className="w-3 h-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Refresh button at the bottom */}
        <div className="text-center mt-8">
          <button 
            onClick={fetchBlogPosts}
            className="bg-gray-200 text-gray-700 px-4 py-1 rounded-lg hover:bg-gray-300 transition-colors font-semibold flex items-center mx-auto text-sm"
          >
            <span className="mr-1">🔄</span>
            Refresh Blog Posts
          </button>
        </div>
      </div>

      {/* Blog Detail Modal */}
      {isModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div 
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-xl">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-gray-800 pr-4">
                  {selectedBlog.title}
                </h2>
                <button
                  onClick={closeModal}
                  title="Close"
                  aria-label="Close"
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                <span className="flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  By {selectedBlog.author}
                </span>
                <span className="flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(selectedBlog.createdAt)}
                </span>
                <span className="flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {selectedBlog.readTime} min read
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              {selectedBlog.featuredImage && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={selectedBlog.featuredImage} 
                    alt={selectedBlog.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              
              <div className="prose prose-sm max-w-none text-gray-700">
                {formatContent(selectedBlog.content)}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-b-xl">
              <div className="flex justify-between items-center">
                <button
                  onClick={closeModal}
                  className="bg-gray-200 text-gray-700 px-4 py-1 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-sm"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Add share functionality here
                    if (navigator.share) {
                      navigator.share({
                        title: selectedBlog.title,
                        text: selectedBlog.excerpt || getExcerpt(selectedBlog.content, 100),
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Blog link copied to clipboard!');
                    }
                  }}
                  className="bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center text-sm"
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add custom animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OurBlog;