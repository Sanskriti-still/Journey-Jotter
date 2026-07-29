import axios from "axios";

const UNSPLASH_ACCESS_KEY = "9mLeiIwmzd3T448EOe1MthptL1gxJ_YYjqYusSHeNbY";

export async function getDestinationImage(destination) {
  try {
    const response = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query: destination,
          per_page: 1,
        },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    return response.data.results[0]?.urls?.regular || null;

  } catch (error) {
    console.log("Image fetch error:", error);
    return null;
  }
}