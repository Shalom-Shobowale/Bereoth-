import React, { useEffect, useState } from "react";
import { Calendar, User, Clock, ArrowRight, MapPin, ChevronRight, Mail, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import HeroSection2 from "../home/HeroSection2";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("articles");
  const [activeEventTab, setActiveEventTab] = useState("upcoming");
  const [categories] = useState(["All", "Investment", "Tips", "Legal"]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/mockPosts.json")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to load posts:", err));

    fetch("/mockEvents.json")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to load events:", err));
  }, []);

  const today = new Date();
  const upcomingEvents = events.filter(
    (event) => new Date(event.date) >= today,
  );
  const pastEvents = events.filter((event) => new Date(event.date) < today);

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection2
        title="Real Estate Blog & Events"
        description="Insights, guides, and events to help you make smart real estate decisions."
        image="/you.png" 
        py="py-28"
      />

      {/* Tabs - Clean Design */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => setActiveTab("articles")}
              className={`py-4 px-2 font-semibold text-base transition-all duration-300 relative ${
                activeTab === "articles"
                  ? "text-primary"
                  : "text-gray-500 hover:text-primary"
              }`}
            >
              Articles
              {activeTab === "articles" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`py-4 px-2 font-semibold text-base transition-all duration-300 relative ${
                activeTab === "events"
                  ? "text-primary"
                  : "text-gray-500 hover:text-primary"
              }`}
            >
              Events
              {activeTab === "events" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Articles Tab */}
      {activeTab === "articles" && (
        <>
          {/* Categories Filter - Clean Chips */}
          <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-primary text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Blog Posts Grid - Clean Cards */}
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  Latest Articles
                </h2>
                <div className="w-12 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
              </div>

              {filteredPosts.length === 0 ? (
                <p className="text-center text-gray-500 py-12">No posts available for this category.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <article
                      key={post.id}
                      className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
                    >
                      {/* Image */}
                      <Link to={`/blog/${post.id}`} className="block overflow-hidden">
                        {post.image?.endsWith(".mp4") ? (
                          <video
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                            muted
                            preload="metadata"
                          >
                            <source src={post.image} type="video/mp4" />
                          </video>
                        ) : (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </Link>

                      <div className="p-5">
                        {/* Meta info */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">
                            {post.category}
                          </span>
                          <div className="flex items-center text-gray-400 text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          <Link to={`/blog/${post.id}`}>{post.title}</Link>
                        </h3>
                        
                        {/* Excerpt */}
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* Author & Date */}
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{post.date}</span>
                          </div>
                        </div>

                        {/* Read More Link */}
                        <Link
                          to={`/blog/${post.id}`}
                          className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
                        >
                          Read More
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* Events Tab - Clean Design */}
      {activeTab === "events" && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Event Tabs */}
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Events
              </h2>
              <div className="inline-flex rounded-lg bg-white p-1 shadow-sm border border-gray-100">
                <button
                  onClick={() => setActiveEventTab("upcoming")}
                  className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                    activeEventTab === "upcoming"
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveEventTab("past")}
                  className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                    activeEventTab === "past"
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Past Events
                </button>
              </div>
            </div>

            {(activeEventTab === "upcoming" && upcomingEvents.length === 0) ||
            (activeEventTab === "past" && pastEvents.length === 0) ? (
              <p className="text-center text-gray-500 py-12">No events available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeEventTab === "upcoming"
                  ? upcomingEvents
                  : pastEvents
                ).map((event) => (
                  <article
                    key={event.id}
                    className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-5">
                      {/* Date & Location */}
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
                      >
                        View Details
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Newsletter Signup - Clean Design */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
            <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Stay Updated
            </h2>
            
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Get the latest real estate insights, market updates, and event invites delivered to your inbox.
            </p>

            <form
              action="https://YOUR_MAILCHIMP_URL"
              method="post"
              target="_blank"
              noValidate
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  name="EMAIL"
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Subscribe
              </button>
            </form>

            <p className="text-gray-400 text-xs mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;