import { Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Testimonials = () => {
  const testimonials = [
    {
      name: " Mr. Ibrahim ",
      role: "Business Owner",
      image:
        "/pics4.jpeg",
      rating: 5,
      text: "Buying land felt scary at first, but Bereoth made everything transparent and easy. Today, I’m a proud landowner. ",
    },
    {
      name: "Mrs. Chioma.",
      role: "Healthcare Professional",
      image:
        "/pics3.jpeg",
      rating: 5,
      text: "From inspection to allocation, the process was smooth. The flexible payment plan was a lifesaver.",
    },
    {
      name: "Engineer Tunde",
      role: "Civil Engineer",
      image:
        "/pics1.jpeg",
      rating: 5,
      text: "Bereoth is different, NO HIDDEN FEES, no stories. Just honesty and results. ",
    },
    {
      name: "Mrs. Faith",
      role: "Entrepreneur",
      image:
        "pics2.jpeg",
      rating: 5,
      text: " I started with Bereoth Farmlands in Abeokuta, and today I’m running a small agribusiness. They made my farming dream possible. ",
    },
    {
      name: "Mr. Francis",
      role: "Real Estate Investor",
      image:
        "pics6.jpeg",
      rating: 5,
      text: "I honestly didn’t believe land could be this easy to own. No omo onile wahala, Bereoth handled everything.",
    },
    {
      name: "Mrs. Joy",
      role: "Trader",
      image:
        "/pics5.jpeg",
      rating: 5,
      text: "What gave me peace of mind was the legit land title. I sleep well knowing my property is fully secured and documented.",
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
              <div className="bg-white rounded-xl shadow-lg p-6 h-full w-full max-w-[450px] mx-auto" data-aos="fade-right">
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
          <p className="text-lg text-gray-600 my-6">
            With Bereoth, every client becomes a success story. Ready to join
            our satisfied clients?
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
