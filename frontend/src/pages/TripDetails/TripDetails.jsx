import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import TripMap from "../../components/Map/TripMap";

function TripDetails() {

  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50">
        <h1 className="text-4xl font-bold text-red-600">
          Trip Not Found
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const { trip } = state;

  return (
    <section className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-6xl mx-auto px-6">

        <button
          onClick={() => navigate(-1)}
          className="mb-8 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {trip.image && (
            <img
              src={trip.image}
              alt={trip.destination}
              className="w-full h-96 object-cover"
            />
          )}

          <div className="p-8">

            <h1 className="text-5xl font-bold text-blue-700">
              📍 {trip.destination}
            </h1>

            <div className="grid md:grid-cols-4 gap-6 mt-8">

              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="font-bold">Days</h3>
                <p>{trip.days}</p>
              </div>

              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="font-bold">Budget</h3>
                <p>₹{trip.budget}</p>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-6">
                <h3 className="font-bold">Style</h3>
                <p>{trip.style}</p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6">
                <h3 className="font-bold">Travel Type</h3>
                <p>{trip.travelType}</p>
              </div>

            </div>

            {trip.weather && (

              <div className="mt-10">

                <h2 className="text-3xl font-bold text-blue-700 mb-6">
                  🌤 Weather
                </h2>

                <div className="grid md:grid-cols-4 gap-5">

                  <div className="bg-white shadow rounded-xl p-5">
                    <h3>Temperature</h3>
                    <p>{trip.weather.temperature}°C</p>
                  </div>

                  <div className="bg-white shadow rounded-xl p-5">
                    <h3>Condition</h3>
                    <p>{trip.weather.description}</p>
                  </div>

                  <div className="bg-white shadow rounded-xl p-5">
                    <h3>Humidity</h3>
                    <p>{trip.weather.humidity}%</p>
                  </div>

                  <div className="bg-white shadow rounded-xl p-5">
                    <h3>Wind</h3>
                    <p>{trip.weather.wind} m/s</p>
                  </div>

                </div>

              </div>

            )}

            {trip.weather && trip.weather.lat && (

              <div className="mt-10">

                <h2 className="text-3xl font-bold mb-6">
                  🗺 Destination Map
                </h2>

                <TripMap
                  lat={trip.weather.lat}
                  lon={trip.weather.lon}
                  destination={trip.destination}
                />

              </div>

            )}

            <div className="mt-10">

              <h2 className="text-3xl font-bold text-blue-700 mb-6">
                ✈ AI Itinerary
              </h2>

              <div className="bg-gray-50 rounded-2xl p-8 prose max-w-none">

                <ReactMarkdown>
                  {trip.itinerary}
                </ReactMarkdown>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );

}

export default TripDetails;