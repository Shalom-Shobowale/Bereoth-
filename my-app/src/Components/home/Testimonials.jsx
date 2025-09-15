import React from "react";
import { Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Adebayo Johnson",
      role: "Business Owner",
      image:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "PrimeEstate helped me secure a prime plot of land in Lekki at an amazing price. Their professionalism and transparency throughout the process was exceptional. I highly recommend them!",
    },
    {
      name: "Mrs. Sarah Okafor",
      role: "Healthcare Professional",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "Finding my dream home was made so easy by the PrimeEstate team. They understood my requirements perfectly and showed me properties that matched exactly what I was looking for.",
    },
    {
      name: "Engineer Kemi Adisa",
      role: "Civil Engineer",
      image:
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "As an investment, my property purchase through PrimeEstate has already appreciated by 40% in just 2 years. Their market knowledge and advice was spot-on!",
    },
    {
      name: "Mr. Tunde Bakare",
      role: "Entrepreneur",
      image:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "The documentation process was seamless and stress-free. PrimeEstate handled everything professionally, and I got my C of O within the promised timeframe.",
    },
    {
      name: "Grace Akinlade",
      role: "Real Estate Investor",
      image:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "I've worked with several real estate companies, but PrimeEstate stands out for their transparency and attention to detail. Highly recommended.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12 h-fit">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600">
            Don't just take our word for it – hear from our satisfied clients
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={15}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }} // 5 seconds
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl shadow-lg p-6 h-full w-full max-w-[450px] mx-auto">
                <div className="mb-4 text-blue-100">
                  <Quote className="h-8 w-8" />
                </div>

                {/* Rating */}
                <div className="flex space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-base italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Client Info */}
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-6">
            Ready to join our satisfied clients?
          </p>
          <Link
            to="/properties"
            className="bg-blue-800 hover:bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            Start Your Property Journey
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
