import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import ShareButtons from "../ShareButtons";

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/mockEvents.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((e) => e.id === parseInt(id, 10));
        setEvent(found || null);
      })
      .catch((err) => console.error("Failed to load event:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center py-20">Loading event...</p>;
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Event Not Found</h1>
        <Link to="/blog" className="text-blue-600 underline mt-4 block">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          to="/blog"
          className="flex items-center text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Blog
        </Link>

        <img
          src={event.image}
          alt={event.title}
          className="w-full h-80 object-cover rounded-xl shadow-lg mb-8"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>

        <div className="flex items-center space-x-6 text-gray-600 mb-6">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          {event.description}
        </p>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          Register for Event
        </button>
        <ShareButtons />
      </div>
    </div>
  );
};

export default EventDetailPage;
