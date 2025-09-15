import React from "react";
import { Share2 } from "lucide-react";
import { toast } from "react-toastify";

const ShareButton = ({ title, text }) => {
  const handleShare = () => {
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({
        title,
        text,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.info("Link copied to clipboard!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors"
    >
      <Share2 className="h-4 w-4" />
      Share
    </button>
  );
};

export default ShareButton;
