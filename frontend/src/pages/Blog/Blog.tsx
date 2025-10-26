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
      
    //   const response = await api.get('/api/blogs');
      
    //   if (response.data && Array.isArray(response.data)) {
    //     setBlogPosts(response.data);
    //     console.log('✅ Blog posts loaded:', response.data.length);
    //   } else {
    //     throw new Error('Invalid response format');
    //   }
    // } catch (error: any) {
    //   console.error('❌ Failed to fetch blog posts:', error);
    //   setError(error.response?.data?.error || error.message || 'Failed to load blog posts');
      
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
          <p key={index} className="font-semibold text-gray-800 my-3">
            {paragraph.slice(2, -2)}
          </p>
        );
      }
      if (paragraph.startsWith('- ')) {
        return (
          <li key={index} className="flex items-start my-2">
            <span className="text-indigo-500 mr-2 mt-1">•</span>
            <span>{paragraph.slice(2)}</span>
          </li>
        );
      }
      if (paragraph.trim() === '') {
        return <br key={index} />;
      }
      return (
        <p key={index} className="my-3 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news, tips, and stories from Mediquick Stays
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <span className="ml-4 text-gray-600">Loading blog posts...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, tips, and stories from Mediquick Stays
          </p>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-yellow-400">⚠</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Connection Issue
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>{error}. Showing demo content.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Blog Posts Yet</h3>
              <p className="text-gray-600 mb-4">Check back later for updates and news from Mediquick Stays.</p>
              <button 
                onClick={fetchBlogPosts}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post) => (
              <article key={post._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Blog Image */}
                <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center relative overflow-hidden">
                  {post.featuredImage ? (
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="text-white text-4xl">📖</div>
                  )}
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {post.readTime} min read
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt || getExcerpt(post.content)}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{formatDate(post.createdAt)}</span>
                    <span className="font-medium">By {post.author}</span>
                  </div>
                  
                  <button 
                    onClick={() => handleReadMore(post)}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center group"
                  >
                    Read More
                    <svg 
                      className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
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
        <div className="text-center mt-12">
          <button 
            onClick={fetchBlogPosts}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold flex items-center mx-auto"
          >
            <span className="mr-2">🔄</span>
            Refresh Blog Posts
          </button>
        </div>
      </div>

      {/* Blog Detail Modal */}
      {isModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-800 pr-4">
                  {selectedBlog.title}
                </h2>
                <button
                  onClick={closeModal}
                  title="Close"
                  aria-label="Close"
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  By {selectedBlog.author}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(selectedBlog.createdAt)}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {selectedBlog.readTime} min read
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {selectedBlog.featuredImage && (
                <div className="mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={selectedBlog.featuredImage} 
                    alt={selectedBlog.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}
              
              <div className="prose prose-lg max-w-none text-gray-700">
                {formatContent(selectedBlog.content)}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
              <div className="flex justify-between items-center">
                <button
                  onClick={closeModal}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
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
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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