import { useEffect, useRef } from "react";

const agrivestData = [
  {
    id: "maize",
    name: "MAIZE INVESTMENT",
    icon: "🌽",
    investments: [
      100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000,
    ],
    returns: [
      180000, 365000, 552000, 744000, 950000, 1170000, 1385000, 1500000,
    ],
  },
  {
    id: "pepper",
    name: "PEPPER INVESTMENT",
    icon: "🌶️",
    investments: [
      100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000,
    ],
    returns: [
      180000, 365000, 552000, 744000, 950000, 1170000, 1385000, 1500000,
    ],
  },
  {
    id: "cassava",
    name: "CASSAVA INVESTMENT",
    icon: "🌱",
    investments: [100000, 200000, 300000, 400000, 500000, 600000],
    returns: [160000, 325000, 490000, 655000, 820000, 1000000],
  },
];

const InvestmentCard = ({ item, index }) => {
  return (
    <div
      className={`bg-[#001d3d] rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-700 hover:scale-105 hover:shadow-3xl animate-on-scroll ${
        index % 2 === 0 ? "animate-fadeInLeft" : "animate-fadeInRight"
      }`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Card Header */}
      <div className="bg-[#001d3d] backdrop-blur-sm p-6 border-b border-[#001d3d]">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{item.icon}</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {item.name}
          </h2>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-blue-300 mb-4 pb-2 border-b border-[#001d3d]">
              INVESTMENT (₦)
            </h3>
            <div className="space-y-3">
              {item.investments.map((amount, i) => (
                <div
                  key={i}
                  className="text-white font-medium hover:text-blue-300 transition-colors duration-300 investment-row"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {amount.toLocaleString()}
                </div>
              ))}
            </div>
          </div>

          {/* Returns Column */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-blue-300 mb-4 pb-2 border-b border-[#001d3d]">
              RETURNS (₦)
            </h3>
            <div className="space-y-3">
              {item.returns.map((amount, i) => (
                <div
                  key={i}
                  className="text-white font-medium hover:text-blue-300 transition-colors duration-300 returns-row"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {amount.toLocaleString()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Agrivest2() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");

            // Also animate individual rows when card comes into view
            const rows = entry.target.querySelectorAll(
              ".investment-row, .returns-row",
            );
            rows.forEach((row, index) => {
              setTimeout(() => {
                row.classList.add("row-animate");
              }, index * 50);
            });
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-8 mt-12 bg-gradient-to-b from-blue-100 to-white overflow-hidden relative"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#001d3d] rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#001d3d] rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="w-[98%] mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 animate-on-scroll animate-slideDown">
          <h1 className="relative inline-block text-3xl md:text-4xl font-bold text-[#001d3d] pb-4">
            BEREOTH AGRIVEST
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-blue-700 to-[#001d3d] rounded-full animate-expandWidth"></span>
          </h1>
          <p className="text-xl text-[#001d3d] mt-6 max-w-2xl mx-auto">
            Secure your future by investing in BEREOTH Agrivest & Farmland
          </p>
        </div>

        {/* Investment Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          {agrivestData.map((item, index) => (
            <InvestmentCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 8rem;
            opacity: 1;
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRow {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-on-scroll {
          opacity: 0;
        }

        .animate-in.animate-slideDown {
          animation: slideDown 0.8s ease-out forwards;
        }

        .animate-in.animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-in.animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-expandWidth {
          animation: expandWidth 0.8s ease-out 0.3s forwards;
          width: 0;
        }

        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }

        .investment-row,
        .returns-row {
          opacity: 0;
        }

        .row-animate {
          animation: fadeInRow 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

export default Agrivest2;
