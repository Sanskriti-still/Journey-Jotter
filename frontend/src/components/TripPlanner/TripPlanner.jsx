import ExpenseSplitter from "../ExpenseSplitter/ExpenseSplitter";
import TravelAssistant from "../TravelAssistant/TravelAssistant";
import TripMap from "../../components/Map/TripMap";
import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { generateTrip } from "../../services/tripApi";
import { getDestinationImage } from "../../services/imageApi";
import { getWeather } from "../../services/weatherApi";
import { downloadTripPDF } from "../../utils/downloadPDF";
import toast from "react-hot-toast";

function TripPlanner() {

  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("3");
  const [budget, setBudget] = useState("");
  const [style, setStyle] = useState("Adventure");
  const [travelType, setTravelType] = useState("Solo");

  const [trip, setTrip] = useState("");
  const [image, setImage] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const tripRef = useRef(null);
  const loadingRef = useRef(null);
  const [lastDestination, setLastDestination] = useState("");

  const handleGenerate = async () => {

    if (!destination || !budget) {
      alert("Please fill all the details.");
      return;
    }


    setLoading(true);
    setTrip("");


    setTimeout(() => {
      loadingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);


    try {

      const response = await generateTrip({
        destination,
        days,
        budget,
        style,
        travelType,
      });


      if (!response) {
        throw new Error("Empty AI response");
      }


      setTrip(response);



      setTimeout(() => {

        tripRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      }, 300);



      const currentDestination =
        destination.trim().toLowerCase();


      let currentImage = image;
      let currentWeather = weather;



      if (currentDestination !== lastDestination) {

        currentImage =
          await getDestinationImage(destination);

        setImage(currentImage);



        currentWeather =
          await getWeather(destination);

        setWeather(currentWeather);



        setLastDestination(currentDestination);

      }




      const savedTrips =
        JSON.parse(localStorage.getItem("journeyTrips")) || [];



      savedTrips.unshift({

        destination,
        days,
        budget,
        style,
        travelType,

        itinerary: response,

        image: currentImage,

        weather: currentWeather,

        favorite:false,

        date:new Date().toLocaleString(),

      });



      localStorage.setItem(
        "journeyTrips",
        JSON.stringify(savedTrips)
      );



    } catch(error) {

      console.error(
        "AI Generation Error:",
        error
      );


      alert(
        "🤖 AI could not generate the trip. Please try again."
      );


    } finally {

      setLoading(false);

    }

  };
  const copyTrip = () => {

    navigator.clipboard.writeText(trip);

    toast.success("Trip copied to clipboard!");

  };

  return (

    <section className="min-h-screen bg-blue-50 py-12">

      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <h1 className="text-5xl font-bold text-center text-blue-700">
            🌍 AI Trip Planner
          </h1>

          <p className="text-center text-gray-500 mt-4">
            Plan your perfect holiday with Journey Jotter AI
          </p>

          <div className="grid lg:grid-cols-3 gap-6 mt-10">

            <input
              disabled={loading}
              placeholder="📍 Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border rounded-xl p-4"
            />

            <select
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="border rounded-xl p-4"
            >
              {[1,2,3,4,5,6,7].map((day)=>(
                <option key={day} value={day}>
                  {day} Day{day>1?"s":""}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="💰 Budget (₹)"
              value={budget}
              onChange={(e)=>setBudget(e.target.value)}
              className="border rounded-xl p-4"
            />

            <select
              value={style}
              onChange={(e)=>setStyle(e.target.value)}
              className="border rounded-xl p-4"
            >
              <option>Adventure</option>
              <option>Luxury</option>
              <option>Nature</option>
              <option>Food</option>
              <option>Family</option>
              <option>Backpacking</option>
            </select>

            <select
              value={travelType}
              onChange={(e)=>setTravelType(e.target.value)}
              className="border rounded-xl p-4"
            >
              <option>Solo</option>
              <option>Friends</option>
              <option>Family</option>
              <option>Couple</option>
            </select>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-blue-600 text-white rounded-xl font-bold p-4 hover:bg-blue-700 transition"
            >
              {loading ? "🤖 Planning..." : "✨ Generate AI Trip"}
            </button>

          </div>

          <ExpenseSplitter budget={budget} />
          <TravelAssistant />

        </div>
              {loading && (

                  <div
                    ref={loadingRef}
                    className="bg-white mt-10 p-10 rounded-3xl text-center"
                  >

                    <div className="animate-spin rounded-full h-20 w-20 border-8 border-blue-500 border-t-transparent mx-auto"></div>

                    <h2 className="text-3xl font-bold mt-6">
                      🤖 AI is creating your journey...
                    </h2>

                  </div>

                )}

        {trip && !loading && (
          <div
            ref={tripRef}
            className="bg-white mt-10 rounded-3xl shadow-2xl overflow-hidden"
          >

            {image && (
              <img
                src={image}
                alt={destination}
                className="w-full h-96 object-cover"
              />
            )}

            {weather && (
              <div className="bg-blue-50 p-6 border-b">

                <h2 className="text-2xl font-bold text-blue-700">
                  🌤️ Current Weather
                </h2>

                <div className="grid md:grid-cols-4 gap-4 mt-4">

                  <div className="bg-white rounded-xl p-4 shadow">
                    <h3 className="font-bold">Temperature</h3>
                    <p className="text-2xl">
                      {weather.temperature}°C
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow">
                    <h3 className="font-bold">Condition</h3>
                    <p className="capitalize">
                      {weather.description}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow">
                    <h3 className="font-bold">Humidity</h3>
                    <p>{weather.humidity}%</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow">
                    <h3 className="font-bold">Wind Speed</h3>
                    <p>{weather.wind} m/s</p>
                  </div>

                </div>

              </div>
            )}

            {weather && (
              <div className="p-8">

                <h2 className="text-3xl font-bold mb-6">
                  🗺️ Destination Map
                </h2>

                <TripMap
                  lat={weather.lat}
                  lon={weather.lon}
                  destination={destination}
                />

              </div>
            )}

            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-8">

              <h2 className="text-4xl font-bold">
                ✈️ Your AI Travel Plan
              </h2>

              <p className="mt-2 opacity-90">
                Generated by Journey Jotter AI
              </p>

            </div>

            <div className="p-8">

              <div className="flex flex-wrap gap-4 mb-8">

                <button
                  onClick={() =>
                    downloadTripPDF(
                      tripRef.current,
                      destination
                    )
                  }
                  className="bg-red-600 text-white px-5 py-3 rounded-xl hover:bg-red-700 transition"
                >
                  📄 Download PDF
                </button>

                <button
                  onClick={copyTrip}
                  className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition"
                >
                  📋 Copy Itinerary
                </button>

                <button
                  onClick={handleGenerate}
                  className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  🔄 Regenerate
                </button>

              </div>

              <div className="bg-gray-50 rounded-2xl p-8 prose prose-lg max-w-none overflow-x-auto">

                <ReactMarkdown>
                  {trip}
                </ReactMarkdown>

              </div>

            </div>

          </div>
        )}

      </div>

    </section>

  );

}

export default TripPlanner;
