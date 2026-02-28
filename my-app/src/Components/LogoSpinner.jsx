import { useState, useEffect } from "react";

const LogoSpinner = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "BEREOTH";
  const letterDelay = 150; // Delay between each letter in milliseconds

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        // After completing, wait and restart
        setTimeout(() => {
          setDisplayedText("");
          currentIndex = 0;
        }, 1000);
      }
    }, letterDelay);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative flex flex-col items-center justify-center">
        {/* Background glow effects */}
        <div className="absolute w-80 h-80 rounded-full border-4 border-blue-900/10 animate-pulse"></div>
        <div className="absolute w-96 h-96 rounded-full border-2 border-blue-900/5"></div>

        {/* Text container with perspective */}
        <div className="relative z-10 perspective-1000">
          <div className="text-4xl md:text-9xl font-bold tracking-wider">
            {fullText.split("").map((letter, index) => (
              <span
                key={index}
                className={`
                  inline-block
                  ${
                    index < displayedText.length
                      ? "text-blue-900 animate-pop-in"
                      : "text-gray-300"
                  }
                  ${index === 0 || index === 3 || index === 4 || index === 5 || index === 6 ? "text-red-600" : ""}
                  transition-all duration-300
                `}
                style={{
                  animationDelay: `${index * 50}ms`,
                  transform: `translateY(${
                    index < displayedText.length ? "0" : "20px"
                  })`,
                  opacity: index < displayedText.length ? 1 : 0.3,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Loading text with pulsing effect */}
        <p className="mt-12 text-blue-900/80 text-lg font-medium tracking-widest animate-pulse">
          Loading{displayedText.length > 0 ? "." : ""}
          {displayedText.length > 2 ? "." : ""}
          {displayedText.length > 4 ? "." : ""}
        </p>

        {/* Progress indicator dots */}
        <div className="flex space-x-2 mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i * 2 < displayedText.length
                  ? "bg-red-600 scale-125"
                  : "bg-blue-900/20"
              }`}
              style={{
                animationName: i * 2 < displayedText.length ? "pulse" : "none",
                animationDuration: "1.5s",
                animationIterationCount: "infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoSpinner;
