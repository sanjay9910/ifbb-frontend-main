import React, { useState, useEffect } from 'react';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Dummy news data - Replace with your API call
  const dummyNews = [
    {
      id: 1,
      title: "Revolutionary AI Training Method Breaks Records",
      excerpt: "Scientists discover a groundbreaking approach to machine learning that reduces training time by 70% while improving accuracy.",
      content: "In a major breakthrough, researchers have developed a new training methodology...",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      category: "Technology",
      author: "Dr. Sarah Johnson",
      date: "2024-12-10",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Fitness Industry Sees 300% Growth in Digital Training",
      excerpt: "Online fitness coaching and virtual training sessions become the new normal as technology meets wellness.",
      content: "The fitness industry is experiencing unprecedented growth in digital platforms...",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
      category: "Fitness",
      author: "Mike Chen",
      date: "2024-12-09",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Climate Action: 50 Countries Commit to Carbon Neutrality",
      excerpt: "Historic agreement reached at global summit as nations pledge to achieve net-zero emissions by 2040.",
      content: "World leaders gathered to sign the most ambitious climate accord in history...",
      image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&q=80",
      category: "Environment",
      author: "Emma Rodriguez",
      date: "2024-12-08",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Breakthrough in Quantum Computing Achieved",
      excerpt: "Tech giant announces quantum processor that solves complex problems 1000x faster than traditional computers.",
      content: "The new quantum chip represents a massive leap forward in computational power...",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
      category: "Technology",
      author: "Alex Kumar",
      date: "2024-12-07",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "New Study Shows Benefits of High-Intensity Training",
      excerpt: "Research reveals that short, intense workouts can be more effective than long cardio sessions for overall health.",
      content: "A comprehensive study involving 10,000 participants has shown remarkable results...",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
      category: "Fitness",
      author: "James Miller",
      date: "2024-12-06",
      readTime: "5 min read"
    },
    {
      id: 6,
      title: "Space Tourism Takes Off: First Commercial Flight Success",
      excerpt: "Private space company successfully launches its first commercial passenger flight, marking new era in space travel.",
      content: "History was made today as the first paying passengers returned safely from space...",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
      category: "Space",
      author: "Lisa Anderson",
      date: "2024-12-05",
      readTime: "8 min read"
    }
  ];

  // Simulate API call - Replace this with your actual API
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // Replace this with your actual API call:
        // const response = await fetch('YOUR_API_ENDPOINT');
        // const data = await response.json();
        // setNews(data);
        
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNews(dummyNews);
      } catch (error) {
        console.error('Error fetching news:', error);
        setNews(dummyNews); // Fallback to dummy data
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const categories = ['all', ...new Set(news.map(item => item.category))];
  
  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const [expandedNews, setExpandedNews] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            LATEST NEWS
          </h1>
          <p className="text-lg text-gray-300 font-light tracking-wide">
            Stay Updated • Stay Informed • Stay Ahead
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-slate-800/50 rounded-2xl overflow-hidden border border-white/10 animate-pulse">
                <div className="h-48 bg-slate-700"></div>
                <div className="p-6">
                  <div className="h-4 bg-slate-700 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-slate-700 rounded w-full mb-2"></div>
                  <div className="h-3 bg-slate-700 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Featured News (First Item) */}
            {filteredNews.length > 0 && (
              <div className="mb-10">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                  <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative h-64 md:h-auto overflow-hidden">
                        <img
                          src={filteredNews[0].image}
                          alt={filteredNews[0].title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                            FEATURED
                          </span>
                        </div>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-semibold border border-purple-500/30">
                            {filteredNews[0].category}
                          </span>
                          <span className="text-gray-400 text-sm">{filteredNews[0].readTime}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition duration-300">
                          {filteredNews[0].title}
                        </h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          {filteredNews[0].excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                              {filteredNews[0].author.charAt(0)}
                            </div>
                            <div>
                              <p className="text-white text-sm font-semibold">{filteredNews[0].author}</p>
                              <p className="text-gray-400 text-xs">{filteredNews[0].date}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setExpandedNews(expandedNews === filteredNews[0].id ? null : filteredNews[0].id)}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                          >
                            Read More →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.slice(1).map((item) => (
                <div key={item.id} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-3 left-3">
                        <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-400 text-xs">{item.readTime}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 text-xs">{item.date}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition duration-300 line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3 flex-grow">
                        {item.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                            {item.author.charAt(0)}
                          </div>
                          <span className="text-gray-300 text-sm font-medium">{item.author}</span>
                        </div>
                        <button
                          onClick={() => setExpandedNews(expandedNews === item.id ? null : item.id)}
                          className="text-blue-400 hover:text-blue-300 font-semibold text-sm flex items-center gap-1 transition-colors"
                        >
                          Read
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredNews.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No News Found</h3>
                <p className="text-gray-400">Try selecting a different category</p>
              </div>
            )}
          </>
        )}

        {/* Modal for Expanded News */}
        {expandedNews && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
            onClick={() => setExpandedNews(null)}
          >
            <div
              className="relative bg-slate-800/90 backdrop-blur-xl rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setExpandedNews(null)}
                className="sticky top-4 right-4 float-right z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {(() => {
                const newsItem = news.find(n => n.id === expandedNews);
                return (
                  <div className="p-8">
                    <img
                      src={newsItem.image}
                      alt={newsItem.title}
                      className="w-full h-64 object-cover rounded-2xl mb-6"
                    />
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                        {newsItem.category}
                      </span>
                      <span className="text-gray-400 text-sm">{newsItem.date}</span>
                      <span className="text-gray-400 text-sm">• {newsItem.readTime}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">{newsItem.title}</h2>
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                        {newsItem.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{newsItem.author}</p>
                        <p className="text-gray-400 text-sm">Author</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">{newsItem.excerpt}</p>
                    <p className="text-gray-300 leading-relaxed">{newsItem.content}</p>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default News;