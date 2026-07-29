function Features() {
  return (
    <section className="py-20 bg-gray-100">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-blue-700">
          Why Choose Journey Jotter?
        </h2>

        <div className="grid md:grid-cols-3 gap-10 mt-16">

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <div className="text-6xl">
              🤖
            </div>

            <h3 className="text-2xl font-bold mt-5">
              AI Itinerary
            </h3>

            <p className="text-gray-600 mt-4">
              Generate intelligent day-wise travel plans in seconds.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <div className="text-6xl">
              💰
            </div>

            <h3 className="text-2xl font-bold mt-5">
              Budget Planning
            </h3>

            <p className="text-gray-600 mt-4">
              Travel smarter with personalized budgets.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <div className="text-6xl">
              🌎
            </div>

            <h3 className="text-2xl font-bold mt-5">
              Explore Anywhere
            </h3>

            <p className="text-gray-600 mt-4">
              Find famous attractions, local food and hidden gems.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Features;