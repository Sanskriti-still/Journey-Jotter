import { motion } from "framer-motion";

function ItineraryCards({ itinerary, days, destination }) {
  if (!itinerary) return null;

  const text = String(itinerary);

  // Find Day 1, Day 2, Day 3 etc.
  const dayMatches = [
    ...text.matchAll(
      /(?:^|\n)\s*(?:#{1,4}\s*)?(?:Day|DAY)\s*(\d+)\s*:?\s*/gi
    ),
  ];

  let daySections = [];

  if (dayMatches.length > 0) {
    dayMatches.forEach((match, index) => {
      const start = match.index;
      const end =
        index + 1 < dayMatches.length
          ? dayMatches[index + 1].index
          : text.length;

      daySections.push({
        day: Number(match[1]),
        content: text.slice(start + match[0].length, end).trim(),
      });
    });
  }

  // Fallback if AI doesn't use Day headings
  if (daySections.length === 0) {
    daySections = Array.from({ length: Number(days) || 1 }, (_, i) => ({
      day: i + 1,
      content:
        i === 0
          ? "Begin your journey and explore the main attractions of the destination."
          : i === Number(days) - 1
          ? "Enjoy your final experiences and prepare for your journey back."
          : "Explore more attractions, local experiences and beautiful places.",
    }));
  }

  const cleanText = (value) => {
    return value
      .replace(/```[\s\S]*?```/g, "")
      .replace(/\*\*/g, "")
      .replace(/#{1,6}\s*/g, "")
      .trim();
  };

  const splitActivities = (content) => {
    const cleaned = cleanText(content);

    const morning =
      cleaned.match(
        /(?:Morning|🌅 Morning)\s*:?\s*([\s\S]*?)(?=(?:Afternoon|☀️ Afternoon|Evening|🌆 Evening|Night|🌙 Night|$))/i
      )?.[1] || "";

    const afternoon =
      cleaned.match(
        /(?:Afternoon|☀️ Afternoon)\s*:?\s*([\s\S]*?)(?=(?:Evening|🌆 Evening|Night|🌙 Night|$))/i
      )?.[1] || "";

    const evening =
      cleaned.match(
        /(?:Evening|🌆 Evening)\s*:?\s*([\s\S]*?)(?=(?:Night|🌙 Night|$))/i
      )?.[1] || "";

    const night =
      cleaned.match(
        /(?:Night|🌙 Night)\s*:?\s*([\s\S]*?)$/i
      )?.[1] || "";

    return {
      morning,
      afternoon,
      evening,
      night,
    };
  };

  const fallbackActivity = (day, period) => {
    const activities = {
      Morning: `Start Day ${day} with a relaxed breakfast and explore the nearby highlights of ${destination}.`,
      Afternoon: `Spend the afternoon discovering popular attractions, local food and experiences around ${destination}.`,
      Evening: `Enjoy the evening atmosphere, visit a scenic spot and take some memorable photographs.`,
      Night: `Have dinner at a recommended local restaurant and relax before the next day's adventure.`,
    };

    return activities[period];
  };

  const ActivityCard = ({
    icon,
    title,
    text,
    bg,
  }) => (
    <div className={`${bg} rounded-2xl p-5 border border-white/70`}>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
          {icon}
        </div>

        <h4 className="font-bold text-gray-800">
          {title}
        </h4>
      </div>

      <p className="text-gray-600 leading-7 text-sm">
        {text || fallbackActivity(currentDay, title)}
      </p>

    </div>
  );

  let currentDay = 1;

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div>
        <p className="text-blue-600 font-semibold">
          ✨ Your AI-Powered Travel Plan
        </p>

        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-1">
          🗓️ {days}-Day Itinerary
        </h2>

        <p className="text-gray-500 mt-2">
          A personalized journey through {destination}.
        </p>
      </div>

      {/* DAY CARDS */}

      {daySections.slice(0, Number(days) || 1).map(
        (section, index) => {

          currentDay = section.day || index + 1;

          const activities = splitActivities(
            section.content
          );

          return (
            <motion.div
              key={`${section.day}-${index}`}
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100"
            >

              {/* DAY HEADER */}

              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white">

                <div className="flex items-center gap-5">

                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">

                    <span className="text-3xl font-extrabold">
                      {section.day || index + 1}
                    </span>

                  </div>

                  <div>
                    <p className="text-blue-100 text-sm">
                      JOURNEY DAY
                    </p>

                    <h3 className="text-3xl font-extrabold">
                      Day {section.day || index + 1}
                    </h3>

                    <p className="text-blue-100 mt-1">
                      Explore • Experience • Enjoy
                    </p>
                  </div>

                </div>

              </div>

              {/* ACTIVITIES */}

              <div className="p-6">

                <div className="grid md:grid-cols-2 gap-5">

                  <ActivityCard
                    icon="🌅"
                    title="Morning"
                    text={activities.morning}
                    bg="bg-orange-50"
                  />

                  <ActivityCard
                    icon="☀️"
                    title="Afternoon"
                    text={activities.afternoon}
                    bg="bg-blue-50"
                  />

                  <ActivityCard
                    icon="🌆"
                    title="Evening"
                    text={activities.evening}
                    bg="bg-purple-50"
                  />

                  <ActivityCard
                    icon="🌙"
                    title="Night"
                    text={activities.night}
                    bg="bg-indigo-50"
                  />

                </div>

                {/* QUICK INFO */}

                <div className="grid sm:grid-cols-3 gap-4 mt-6 pt-6 border-t">

                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-xs text-gray-400">
                      📍 EXPERIENCE
                    </p>
                    <p className="font-semibold text-gray-700 mt-1">
                      Sightseeing & exploration
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-xs text-gray-400">
                      🍽️ FOOD
                    </p>
                    <p className="font-semibold text-gray-700 mt-1">
                      Local cuisine
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-xs text-gray-400">
                      🚕 TRANSPORT
                    </p>
                    <p className="font-semibold text-gray-700 mt-1">
                      Local transportation
                    </p>
                  </div>

                </div>

                {/* AI DETAILS */}

                <details className="mt-6">

                  <summary className="cursor-pointer text-blue-600 font-semibold">
                    ✨ View AI-generated details
                  </summary>

                  <div className="mt-4 bg-gray-50 rounded-2xl p-5 whitespace-pre-wrap text-sm text-gray-600 leading-7">
                    {cleanText(section.content)}
                  </div>

                </details>

              </div>

            </motion.div>
          );
        }
      )}

    </div>
  );
}

export default ItineraryCards;
