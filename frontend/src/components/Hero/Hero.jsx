import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">

      <div className="max-w-7xl mx-auto px-8 py-24 flex flex-col items-center text-center">

        <h1 className="text-6xl font-extrabold leading-tight">
          Plan Your Dream Trip
          <br />
          with AI ✈️
        </h1>

        <p className="mt-8 text-xl max-w-3xl">
          Journey Jotter helps you generate personalized travel itineraries,
          manage your budget, discover destinations and explore the world
          effortlessly.
        </p>

        <Link to="/planner">
          <button className="mt-10 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 duration-300 shadow-lg">
            🚀 Start Planning
          </button>
        </Link>

      </div>

    </section>
  );
}

export default Hero;