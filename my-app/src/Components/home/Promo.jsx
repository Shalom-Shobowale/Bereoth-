import { House } from "lucide-react";
const Promo = () => {
  const promoImages = [
    "promo1.jpg",
    "promo2.jpg",
    "promo3.jpg",
    "promo4.jpg",
    "promo5.jpg",
    "promo6.jpg",
    "promo7.jpg",
    "promo8.jpg",
    "promo9.jpg",
    "promo10.jpg",
    "promo11.jpg",
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mt-10 mb-4">
        Ember Special Promo Sales
      </h1>
      <p className="text-xl text-gray-600  mb-8 flex items-center gap-4 justify-center">
        <p className="md:flex hidden">
          {" "}
          <House />
        </p>
        <p className="text-center">
          {" "}
          Get Your Land at an Affordable Price Today!
        </p>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promoImages.map((image, index) => (
          <img
            data-aos="zoom-in-up" data-aos-delay={index * 100}
            key={index}
            src={image}
            alt={`Promo ${index + 1}`}
            className="w-full h-auto"
          />
        ))}
      </div>
    </div>
  );
};

export default Promo;
