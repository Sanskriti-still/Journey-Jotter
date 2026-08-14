import axios from "axios";

const UNSPLASH_ACCESS_KEY = "YOUR_UNSPLASH_ACCESS_KEY";

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
    console.log(error);
    return null;
  }
}

export async function getDestinationGallery(destination) {
  try {
    const response = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query: destination,
          per_page: 4,
        },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    return response.data.results.map((img) => img.urls.regular);

  } catch (error) {
    console.log(error);
    return [];
  }
}