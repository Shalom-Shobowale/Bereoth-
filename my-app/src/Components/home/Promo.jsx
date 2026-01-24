import { House } from "lucide-react";

const Promo = () => {
  const promoImages = [
    "one.jpg",
    "two.jpg",
    "thre.jpg",
    "three.jpg",
    "five.jpg",
    "six.jpg",
    "seven.jpg",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
        Ember Special Promo Sales
      </h1>

      <div className="text-xl text-gray-600 mb-8 flex items-center justify-center gap-4">
        <div className="hidden md:flex">
          <House />
        </div>
        <p className="text-center">
          Get Your Land at an Affordable Price Today!
        </p>
      </div>

      {/* Fixed aspect ratio container for consistent sizing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promoImages.map((image, index) => (
          <div
            key={index}
            data-aos="zoom-in-up"
            data-aos-delay={index * 100}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Container with fixed aspect ratio (4:3 or choose your preference) */}
            <div className="aspect-[4/4] w-full overflow-hidden">
              <img
                src={image}
                alt={`Promo ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Optional overlay or badge */}
            {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <span className="text-white font-semibold">
                Promo {index + 1}
              </span>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promo;
