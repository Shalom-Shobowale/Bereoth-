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
  Award,
  Users,
  TrendingUp,
  Clock,
  ChevronDown,
} from "lucide-react";
import HeroSection2 from "../home/HeroSection2";

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
      image: "md.jpg",
      bio: "15+ years experience in real estate development and investment",
    },
    {
      name: "ADEBAYO MOHAMMED",
      role: "Financial Administrator",
      image: "man1.jpeg",
      bio: "Property law specialist ensuring secure transactions",
    },
    {
      name: "IKECHI EMMANUEL",
      role: "Chief Operating Officer",
      image: "man2.jpeg",
      bio: "Strategic investment advisor with proven track record",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection2
        title="About Bereoth"
        description="At Bereoth, we don't just sell land, we build people, wealth, and legacies."
        image="/you.png"
        py="py-28"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="mb-4">
                <span className="text-primary font-semibold text-sm tracking-wider">
                  OUR STORY
                </span>
                <div className="w-12 h-0.5 bg-primary mt-2"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                From One Estate to Eleven
              </h2>

              <div
                className={`transition-all duration-500 relative ${
                  showFullContent ? "h-auto" : "max-h-96 overflow-hidden"
                }`}
              >
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    Bereoth Property & Investments Ltd is more than a real
                    estate company — we are a movement transforming lives
                    through property, investment, and empowerment.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    From the very beginning, our vision has been clear: to make
                    land ownership simple, transparent, and rewarding for
                    Nigerians everywhere. We believe land is not just about
                    building houses, but about building wealth, security, and
                    legacies.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    In 2018, we took our first bold step with Focus Park Estate,
                    Mowe Ofada. What started as a single project has now
                    expanded into{" "}
                    <span className="font-semibold text-primary">
                      11 thriving estates
                    </span>{" "}
                    across Lagos, Ogun, and Enugu States.
                  </p>
                  {showFullContent && (
                    <>
                      <p className="text-gray-600 leading-relaxed">
                        But Bereoth is more than estates — we solve problems. We
                        address housing needs by providing affordable and
                        accessible plots. We fight poverty and unemployment by
                        creating job opportunities through our projects and
                        engaging consultants.
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        Over 6 years of steady growth, our reputation has been
                        built on trust, transparency, and results. We have
                        provided secure titles, flexible payment plans, and a
                        stress-free process.
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        Today, Bereoth is more than a company — it is a
                        community of dreamers, investors, and achievers. ✨ At
                        Bereoth, we don't just sell land, we build people,
                        wealth, and legacies.
                      </p>
                    </>
                  )}
                </div>

                {/* Gradient overlay for collapsed state */}
                {!showFullContent && (
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                )}
              </div>

              <button
                onClick={() => setShowFullContent((prev) => !prev)}
                className="inline-flex items-center gap-2 text-primary font-semibold mt-4 hover:gap-3 transition-all"
              >
                {showFullContent ? "Read Less" : "Read More"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${showFullContent ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {/* Video Side - Enhanced */}
            <div className="relative rounded-xl overflow-hidden shadow-xl group">
              <video
                ref={videoRef}
                src="/ab-vid.mp4"
                autoPlay
                muted
                playsInline
                loop
                className="w-full h-auto"
              />

              {/* Play/Pause Overlay */}
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  {isPlaying ? (
                    <Pause size={32} className="text-white" />
                  ) : (
                    <Play size={32} className="text-white" />
                  )}
                </div>
              </button>

              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                To empower people at all social strata with reliable properties,
                investment, and wealth solutions that are effective and
                affordable.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                To provide affordable properties that transcend generations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Stamp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Our Mandate
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                We are developing 10,000 Homes across the country by 2031.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Stamp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Our Core Value
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                <span className="font-bold">CORE VALUES : PATI </span><br />
                <li className="list-none">Professionalism </li>
                <li className="list-none">Affordability</li>
                <li className="list-none">Transparency</li>
                <li className="list-none">Integrity</li>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm tracking-wider">
              WHAT WE BELIEVE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-3">
              Our Core Values
            </h2>
            <div className="w-16 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-gray-50 rounded-xl p-6 text-center hover:bg-primary/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm tracking-wider">
              LEADERSHIP
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-3">
              Meet Our Team
            </h2>
            <div className="w-16 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs">{member.bio}</p>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary/70 font-semibold text-sm mb-3">
                    {member.role}
                  </p>
                  <div className="w-8 h-0.5 bg-primary/20 mx-auto rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm tracking-wider">
              OUR ACHIEVEMENTS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-3">
              Our Track Record
            </h2>
            <div className="w-16 h-0.5 bg-primary/30 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4">
              Numbers that speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-primary/5 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                500+
              </div>
              <div className="text-gray-600 text-sm">Happy Clients</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-primary/5 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                ₦50B+
              </div>
              <div className="text-gray-600 text-sm">Property Value Sold</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-primary/5 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                11
              </div>
              <div className="text-gray-600 text-sm">Prime Locations</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-primary/5 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                6+
              </div>
              <div className="text-gray-600 text-sm">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
