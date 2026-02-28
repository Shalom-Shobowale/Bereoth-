import React, { useEffect, useState } from "react";
import { Calendar, User, Clock, ArrowRight, MapPin } from "lucide-react";
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
    // Load blog posts
    fetch("/mockPosts.json")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to load posts:", err));

    // Load events
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
        image="/you.png" py="py-28"
      />

      {/* Tabs */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => setActiveTab("articles")}
              className={`py-4 px-6 font-semibold border-b-2 transition-colors ${
                activeTab === "articles"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`py-4 px-6 font-semibold border-b-2 transition-colors ${
                activeTab === "events"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
            >
              Events
            </button>
          </div>
        </div>
      </section>

      {/* Articles Tab */}
      {activeTab === "articles" && (
        <>
          {/* Categories Filter */}
          <section className="py-8 bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full border transition-colors ${
                      activeCategory === category
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Latest Articles
              </h2>

              {filteredPosts.length === 0 ? (
                <p className="text-center text-gray-600">
                  No posts available for this category.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post, index) => (
                    <article
                      data-aos="zoom-in-down"
                      data-aos-delay={index * 100}
                      key={post.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      {post.image.endsWith(".mp4") ? (
                        <video
                          className="w-full h-56 object-cover "
                          controls
                          muted
                          preload="metadata"
                        >
                          <source src={post.image} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                      )}

                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold">
                            {post.category}
                          </span>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-600">
                            <User className="h-4 w-4 mr-1" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{post.date}</span>
                          </div>
                        </div>

                        <Link
                          to={`/blog/${post.id}`}
                          className="w-full mt-4 inline-flex items-center justify-center space-x-2 bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
                        >
                          <span>Read More</span>
                          <ArrowRight className="h-4 w-4" />
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

      {/* Events Tab */}
      {activeTab === "events" && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Events</h2>
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  onClick={() => setActiveEventTab("upcoming")}
                  className={`px-4 py-2 text-sm font-medium border border-gray-300 rounded-l-md ${
                    activeEventTab === "upcoming"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Upcoming Events
                </button>
                <button
                  onClick={() => setActiveEventTab("past")}
                  className={`px-4 py-2 text-sm font-medium border border-gray-300 rounded-r-md ${
                    activeEventTab === "past"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Past Events
                </button>
              </div>
            </div>

            {(activeEventTab === "upcoming" && upcomingEvents.length === 0) ||
            (activeEventTab === "past" && pastEvents.length === 0) ? (
              <p className="text-center text-gray-600">No events available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(activeEventTab === "upcoming"
                  ? upcomingEvents
                  : pastEvents
                ).map((event) => (
                  <article
                    key={event.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    data-aos="zoom-in-down"
                    data-aos-delay={event.id * 100}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{event.date}</span>
                        <MapPin className="h-4 w-4 ml-4 mr-1" />
                        <span>{event.location}</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 whitespace-pre-line">
                        {event.description}
                      </p>

                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full mt-4 inline-flex items-center justify-center space-x-2 bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
                      >
                        <span>View Details</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest real estate insights, market updates, and event
            invites delivered to your inbox.
          </p>

          <form
            action="https://YOUR_MAILCHIMP_URL"
            method="post"
            target="_blank"
            noValidate
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              name="EMAIL"
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="border-white border hover:bg-accent hover:text-primary text-accent px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>

          <p className="text-blue-200 text-sm mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
