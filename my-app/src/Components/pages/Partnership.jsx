import {
  GraduationCap,
  Send,
  HandCoins,
  LaptopMinimal,
  BriefcaseBusiness,
  House,
} from "lucide-react";

const Partnership = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className=" bg-no-repeat bg-cover bg-center text-accent py-28"
        style={{ backgroundImage: "url(you.png)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-5xl font-bold mb-6">
              Partner With Bereoth
            </h1>
            <p className="text-xl text-accent max-w-3xl mx-auto">
              Where vision meets opportunity, and collaboration births success.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-primary">
              Why Partner with Us
            </h2>
            <p className="text-lg">
              At Bereoth Property & Investments Ltd, we believe in the power of
              shared growth, because wealth becomes more meaningful when it
              impacts lives.
            </p>
            <p className="mt-4">
              Our Partnership Network is a bridge between ambition and
              opportunity. Designed for professionals, entrepreneurs, investors,
              and enthusiasts — to build sustainable wealth, expand influence,
              and make a lasting impact.
            </p>
          </div>
          <img
            src="/pics5.jpeg"
            alt="Partner with Bereoth"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl text-primary font-bold mb-8">
            Exclusive Partner Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "Structured Income & Rewards",
                desc: "Earn from successful collaborations and referrals.",
                icon: <HandCoins />,
              },
              {
                title: "Training & Mentorship",
                desc: "Grow with expert-led training and proven systems.",
                icon: <GraduationCap />,
              },
              {
                title: "Recognition & Travel",
                desc: "Enjoy travel, recognition, and personal growth with us.",
                icon: <Send />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <div className="text-5xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl text-primary font-bold mb-6">
            Who Can Join?
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "9–5 Professionals", icon: <GraduationCap /> },
              { label: "Entrepreneurs", icon: <LaptopMinimal /> },
              { label: "Investors", icon: <BriefcaseBusiness /> },
              { label: "Real Estate Enthusiasts", icon: <House /> },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center bg-gray-100 p-4 rounded w-[90%] md:w-52 shadow-sm"
              >
                <div className="text-5xl mb-2">{item.icon}</div>
                <p className="text-base font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className=" w-[80%] mx-auto mb-16 text-center text-primary flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">
            Ready to Build Wealth and Impact Lives?
          </h2>
          <p className="mb-6">
            Join a family that’s passionate about excellence, integrity, and
            building lasting legacies.
          </p>
        </div>
        <div>
          <a
            href="https://docs.google.com/forms/d/1AwzasW-xIHaajm1EPOyJwxKFncmyelYxSkLjP2scHfE/viewform"
            className="bg-primary hover:bg-transparent font-bold text-white hover:text-primary hover:border-2 hover:border-primary px-6 py-3 rounded transition"
          >
            Become a Bereoth Partner
          </a>
        </div>
      </section>
    </>
  );
};

export default Partnership;
