export default function HeroSection2({ description, title, image, py }) {
  return (
    <div>
      <section
        className={` bg-no-repeat bg-cover bg-center text-accent ${py}`}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl text-accent max-w-3xl mx-auto">{description}</p>
        </div>
      </section>
    </div>
  );
}
