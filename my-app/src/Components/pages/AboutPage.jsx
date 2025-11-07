import { useState, useRef } from "react";
import {
  Shuffle,
  Target,
  Eye,
  Sparkles,
  ScanLine,
  Shield,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Stamp,
} from "lucide-react";
const AboutPage = () => {
  const [showFullContent, setShowFullContent] = useState(false);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We maintain the highest standards of honesty and transparency in all our dealings.",
    },
    {
      icon: Sparkles,
      title: "Simplicity",
      description:
        "We make property ownership simple, clear, and hassle-free for everyone.",
    },
    {
      icon: Shuffle,
      title: "Flexibility",
      description:
        "We offer adaptable solutions tailored to meet the unique needs of every client.",
    },
    {
      icon: ScanLine,
      title: "Transparency",
      description:
        "We operate with honesty and openness, ensuring clear and trustworthy transactions.",
    },
  ];

  const team = [
    {
      name: "IKHAGHU OTHNIEL",
      role: "Managing Director",
      image:
        "md.jpg",
      bio: "15+ years experience in real estate development and investment",
    },
    {
      name: "ADEBAYO MOHAMMED",
      role: "Financial Administrator",
      image:
        "team2.jpeg",
      bio: "Property law specialist ensuring secure transactions",
    },
    {
      name: "IKECHI EMMANUEL",
      role: "Human Resources Manager",
      image:
        "team3.jpeg",
      bio: "Strategic investment advisor with proven track record",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className=" bg-no-repeat bg-cover bg-center text-accent py-28" style={{backgroundImage: 'url(you.png)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Bereoth
          </h1>
          <p className="text-xl text-accent">
            At Bereoth, we don’t just sell land, we build people, wealth, and legacies.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className=" my-12">
        <div className="max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="px-4 sm:px-6 lg:px-8">
              <div
                className={`transition-all duration-500 ${
                  showFullContent
                    ? "overflow-visible h-auto"
                    : "overflow-y-hidden h-[50vh]"
                }`}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Bereoth Property & Investments Ltd is more than a real estate
                  company — we are a movement transforming lives through
                  property, investment, and empowerment.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  From the very beginning, our vision has been clear: to make
                  land ownership simple, transparent, and rewarding for
                  Nigerians everywhere. We believe land is not just about
                  building houses, but about building wealth, security, and
                  legacies.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  In 2018, we took our first bold step with Focus Park Estate,
                  Mowe Ofada. What started as a single project has now expanded
                  into 11 thriving estates across Lagos, Ogun, and Enugu States.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  But Bereoth is more than estates — we solve problems. We
                  address housing needs by providing affordable and accessible
                  plots.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We fight poverty and unemployment by creating job
                  opportunities through our projects and engaging consultants.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Over 6 years of steady growth, our reputation has been built
                  on trust, transparency, and results. We have provided secure
                  titles, flexible payment plans, and a stress-free process.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, Bereoth is more than a company — it is a community of
                  dreamers, investors, and achievers. ✨ At Bereoth, we don’t
                  just sell land, we build people, wealth, and legacies.
                </p>
              </div>

              <button
                onClick={() => setShowFullContent((prev) => !prev)}
                className="bg-primary text-accent py-2 px-4 font-semibold rounded-md my-4"
              >
                {showFullContent ? "Read Less" : "Read More"}
              </button>
            </div>

            <div className="relative w-full max-w-3xl mx-auto md:rounded-2xl overflow-hidden group">
              <video
                ref={videoRef}
                src="/ab-vid.mp4"
                autoPlay
                muted
                playsInline
                loop
                className="w-full h-auto md:rounded-2xl"
              />

              {/* Center Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center text-white text-7xl bg-black bg-opacity-40 hover:bg-opacity-60 transition duration-300 opacity-0 group-hover:opacity-100 rounded-2xl"
              >
                {isPlaying ? <Pause size={72} /> : <Play size={72} />}
              </button>

              {/* Mute/Unmute Button (bottom-right corner) */}
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
              >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Providing Affordable Landed Properties for Interested
                Subscribers at all levels.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To Provide Reliable Shelter For Future Relevance.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Stamp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Our Mandate
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We are developing 10,000 Homes across the country by 2031.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition-colors">
                  <value.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover object-top"
                />
                {/* <div className={`w-full h-48 object-cover bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url(${member.image})` }}></div> */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {member.name}
                  </h3>
                  <p className="text-secondary font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Track Record
            </h2>
            <p className="text-xl text-blue-100">
              Numbers that speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-blue-100">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">₦50B+</div>
              <div className="text-blue-100">Property Value Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">11</div>
              <div className="text-blue-100">Prime Locations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">10+</div>
              <div className="text-blue-100">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
