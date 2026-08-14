export async function getNearbyAttractions(destination = "") {
  const key = destination.trim().toLowerCase();

  const attractions = {
    manali: [
      {
        name: "Hadimba Temple",
        rating: "4.8 ⭐",
        type: "Temple",
      },
      {
        name: "Solang Valley",
        rating: "4.7 ⭐",
        type: "Adventure",
      },
      {
        name: "Rohtang Pass",
        rating: "4.9 ⭐",
        type: "Mountain",
      },
      {
        name: "Mall Road",
        rating: "4.5 ⭐",
        type: "Shopping",
      },
    ],

    goa: [
      {
        name: "Baga Beach",
        rating: "4.8 ⭐",
        type: "Beach",
      },
      {
        name: "Fort Aguada",
        rating: "4.7 ⭐",
        type: "Historic",
      },
      {
        name: "Dudhsagar Falls",
        rating: "4.9 ⭐",
        type: "Waterfall",
      },
      {
        name: "Calangute Beach",
        rating: "4.6 ⭐",
        type: "Beach",
      },
    ],

    paris: [
      {
        name: "Eiffel Tower",
        rating: "4.9 ⭐",
        type: "Landmark",
      },
      {
        name: "Louvre Museum",
        rating: "4.8 ⭐",
        type: "Museum",
      },
      {
        name: "Arc de Triomphe",
        rating: "4.7 ⭐",
        type: "Historic",
      },
      {
        name: "Seine River",
        rating: "4.8 ⭐",
        type: "Cruise",
      },
    ],

    jaipur: [
      {
        name: "Amber Fort",
        rating: "4.8 ⭐",
        type: "Historic",
      },
      {
        name: "Hawa Mahal",
        rating: "4.7 ⭐",
        type: "Landmark",
      },
      {
        name: "City Palace",
        rating: "4.6 ⭐",
        type: "Palace",
      },
      {
        name: "Jal Mahal",
        rating: "4.6 ⭐",
        type: "Landmark",
      },
    ],

    bali: [
      {
        name: "Uluwatu Temple",
        rating: "4.8 ⭐",
        type: "Temple",
      },
      {
        name: "Tegallalang Rice Terrace",
        rating: "4.7 ⭐",
        type: "Nature",
      },
      {
        name: "Seminyak Beach",
        rating: "4.6 ⭐",
        type: "Beach",
      },
      {
        name: "Sacred Monkey Forest",
        rating: "4.5 ⭐",
        type: "Nature",
      },
    ],

    kashmir: [
      {
        name: "Dal Lake",
        rating: "4.8 ⭐",
        type: "Lake",
      },
      {
        name: "Gulmarg",
        rating: "4.8 ⭐",
        type: "Mountain",
      },
      {
        name: "Pahalgam",
        rating: "4.7 ⭐",
        type: "Nature",
      },
      {
        name: "Sonamarg",
        rating: "4.7 ⭐",
        type: "Valley",
      },
    ],

    dubai: [
      {
        name: "Burj Khalifa",
        rating: "4.9 ⭐",
        type: "Landmark",
      },
      {
        name: "Dubai Mall",
        rating: "4.8 ⭐",
        type: "Shopping",
      },
      {
        name: "Palm Jumeirah",
        rating: "4.7 ⭐",
        type: "Landmark",
      },
      {
        name: "Dubai Marina",
        rating: "4.7 ⭐",
        type: "Waterfront",
      },
    ],

    london: [
      {
        name: "Big Ben",
        rating: "4.8 ⭐",
        type: "Landmark",
      },
      {
        name: "Tower Bridge",
        rating: "4.8 ⭐",
        type: "Historic",
      },
      {
        name: "Buckingham Palace",
        rating: "4.7 ⭐",
        type: "Palace",
      },
      {
        name: "London Eye",
        rating: "4.6 ⭐",
        type: "Attraction",
      },
    ],

    mumbai: [
      {
        name: "Gateway of India",
        rating: "4.7 ⭐",
        type: "Landmark",
      },
      {
        name: "Marine Drive",
        rating: "4.7 ⭐",
        type: "Waterfront",
      },
      {
        name: "Elephanta Caves",
        rating: "4.5 ⭐",
        type: "Historic",
      },
      {
        name: "Colaba Causeway",
        rating: "4.4 ⭐",
        type: "Shopping",
      },
    ],

    delhi: [
      {
        name: "India Gate",
        rating: "4.7 ⭐",
        type: "Landmark",
      },
      {
        name: "Red Fort",
        rating: "4.6 ⭐",
        type: "Historic",
      },
      {
        name: "Qutub Minar",
        rating: "4.7 ⭐",
        type: "Historic",
      },
      {
        name: "Lotus Temple",
        rating: "4.6 ⭐",
        type: "Temple",
      },
    ],

    kerala: [
      {
        name: "Alleppey Backwaters",
        rating: "4.8 ⭐",
        type: "Nature",
      },
      {
        name: "Munnar",
        rating: "4.8 ⭐",
        type: "Hill Station",
      },
      {
        name: "Varkala Beach",
        rating: "4.7 ⭐",
        type: "Beach",
      },
      {
        name: "Thekkady",
        rating: "4.6 ⭐",
        type: "Wildlife",
      },
    ],

    rajasthan: [
      {
        name: "Mehrangarh Fort",
        rating: "4.8 ⭐",
        type: "Historic",
      },
      {
        name: "City Palace",
        rating: "4.7 ⭐",
        type: "Palace",
      },
      {
        name: "Lake Pichola",
        rating: "4.7 ⭐",
        type: "Lake",
      },
      {
        name: "Jaisalmer Fort",
        rating: "4.8 ⭐",
        type: "Historic",
      },
    ],

    singapore: [
      {
        name: "Gardens by the Bay",
        rating: "4.8 ⭐",
        type: "Nature",
      },
      {
        name: "Marina Bay Sands",
        rating: "4.7 ⭐",
        type: "Landmark",
      },
      {
        name: "Sentosa Island",
        rating: "4.6 ⭐",
        type: "Entertainment",
      },
      {
        name: "Merlion Park",
        rating: "4.6 ⭐",
        type: "Landmark",
      },
    ],

    tokyo: [
      {
        name: "Tokyo Skytree",
        rating: "4.7 ⭐",
        type: "Landmark",
      },
      {
        name: "Shibuya Crossing",
        rating: "4.6 ⭐",
        type: "City Attraction",
      },
      {
        name: "Senso-ji Temple",
        rating: "4.7 ⭐",
        type: "Temple",
      },
      {
        name: "Meiji Shrine",
        rating: "4.7 ⭐",
        type: "Shrine",
      },
    ],

    switzerland: [
      {
        name: "Lake Geneva",
        rating: "4.8 ⭐",
        type: "Lake",
      },
      {
        name: "Jungfraujoch",
        rating: "4.9 ⭐",
        type: "Mountain",
      },
      {
        name: "Interlaken",
        rating: "4.8 ⭐",
        type: "Nature",
      },
      {
        name: "Lucerne",
        rating: "4.7 ⭐",
        type: "City",
      },
    ],
  };

  // Exact destination
  if (attractions[key]) {
    return attractions[key];
  }

  // Handles inputs like "Jaipur, India" or "Paris France"
  const matchedDestination = Object.keys(attractions).find(
    (place) => key.includes(place) || place.includes(key)
  );

  if (matchedDestination) {
    return attractions[matchedDestination];
  }

  // Generic fallback so the section doesn't disappear
  return [
    {
      name: `Explore ${destination}`,
      rating: "4.7 ⭐",
      type: "Popular Attraction",
    },
    {
      name: `${destination} City Center`,
      rating: "4.6 ⭐",
      type: "Local Experience",
    },
    {
      name: `Local Market`,
      rating: "4.5 ⭐",
      type: "Shopping",
    },
    {
      name: `Scenic Viewpoint`,
      rating: "4.6 ⭐",
      type: "Nature",
    },
  ];
}