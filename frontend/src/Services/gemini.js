import axios from "axios";

const API_URL = "https://journey-jotter-keab.onrender.com/generate-trip";

export const generateTrip = async ({
  destination,
  days,
  budget,
  style,
  travelType,
}) => {
  try {
    const response = await axios.post(API_URL, {
      destination,
      days,
      budget,
      style,
      travelType,
    });

    if (!response.data?.success) {
      throw new Error(
        response.data?.message || "Trip generation failed"
      );
    }

    return response.data.trip;
  } catch (error) {
    console.error(
      "generateTrip ERROR:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Request failed"
    );
  }
};