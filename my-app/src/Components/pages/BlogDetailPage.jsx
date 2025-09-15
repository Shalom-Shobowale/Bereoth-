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
    return <div className="pt-16 flex justify-center">Loading...</div>;
  }

  if (error || !post) {
    return (
      <div className="pt-16 flex justify-center text-secondary">
        {error || "Post not found"}
      </div>
    );
  }

  return (
    <div className="pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link to="/blog" className="flex items-center text-blue-600 mb-6">
        <ArrowLeft className="h-5 w-5 mr-2" /> Back to Blog
      </Link>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

      <div className="flex items-center space-x-4 text-gray-600 mb-6">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
          {post.category}
        </span>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{post.date}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>{post.readTime}</span>
        </div>
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          <span>{post.author}</span>
        </div>
      </div>

      <img
        src={post.image}
        alt={post.title}
        className="w-full h-96 object-cover rounded-xl mb-8"
      />

      {/* <article className="prose prose-lg max-w-none text-gray-800">
        {post.body.split("\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </article> */}

      <div className="prose lg:prose-xl text-gray-700 leading-relaxed">
        <p>{post.body}</p>
      </div>
      <ShareButtons />
    </div>
  );
};

export default BlogDetailPage;
