import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
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

  if (loading) {
    return (
      <div className="pt-20 flex justify-center text-gray-500 text-lg">
        Loading post...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-20 flex justify-center text-red-500 text-lg">
        {error || "Post not found"}
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="pt-20 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-primary hover:underline font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-lg text-gray-700 italic mb-6">{post.excerpt}</p>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium text-xs uppercase tracking-wide">
            {post.category}
          </span>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-xl overflow-hidden mb-10 shadow-md">
          {post.image.endsWith(".mp4") ? (
            <video
              className="w-full h-[60vh] object-contain"
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
              className="w-full h-96 object-cover"
            />
          )}
        </div>

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-12 text-justify text-xl">
          {post.body?.split("\n").map((para, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: para.trim() }} />
          ))}
        </article>

        {/* Share Buttons */}
        <div className="border-t pt-6 mt-12">
          <h3 className="text-xl font-bold text-primary mb-4">
            Share this article
          </h3>
          <ShareButtons />
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
