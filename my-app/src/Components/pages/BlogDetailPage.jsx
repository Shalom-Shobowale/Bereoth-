import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  BookOpen,
  Tag,
  ChevronLeft,
} from "lucide-react";
import ShareButtons from "../ShareButtons";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("/mockPosts.json");
        if (!res.ok) throw new Error("Failed to load blog post");
        const data = await res.json();
        const foundPost = data.find((p) => p.id === parseInt(id));
        setPost(foundPost || null);
      } catch (err) {
        setError(err.message || "Error loading post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Function to render HTML content safely
  const renderContent = (htmlString) => {
    return { __html: htmlString };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">
            {error || "Post not found"}
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors group"
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Blog</span>
          </Link>
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
            <Tag className="h-3 w-3" />
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-lg text-gray-600 border-l-4 border-primary pl-4 py-1 mb-6 italic">
          {post.excerpt}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary/60" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary/60" />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-primary/60" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-primary/60" />
            <span>Featured Article</span>
          </div>
        </div>

        {/* Featured Image/Video */}
        <div className="rounded-xl overflow-hidden mb-10 shadow-lg bg-white">
          {post.image?.endsWith(".mp4") ? (
            <video
              className="w-full"
              controls
              muted
              preload="metadata"
              poster="/video-placeholder.jpg"
            >
              <source src={post.image} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={post.image}
              alt={post.title}
              className="w-full object-cover"
            />
          )}
        </div>

        {/* Blog Content - Fixed HTML rendering */}
        <article className="prose prose-lg max-w-none mb-12">
          <div
            className="text-gray-700 leading-relaxed space-y-4 blog-content"
            dangerouslySetInnerHTML={renderContent(post.body)}
          />
        </article>

        {/* Share Section */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Share this article
              </h3>
              <p className="text-sm text-gray-500">
                Help others discover this content
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ShareButtons />
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 px-6 py-2.5 rounded-lg font-medium transition-all duration-300 group"
            >
              <span>Browse More Articles</span>
              <ArrowLeft className="h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Add custom CSS for blog content styling */}
      <style jsx>{`
        .blog-content strong {
          font-weight: 700;
          color: #001d3d;
        }
        .blog-content em {
          font-style: italic;
          color: #4b5563;
        }
        .blog-content p {
          margin-bottom: 1rem;
          line-height: 1.75;
        }
        .blog-content br {
          display: block;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default BlogDetailPage;
