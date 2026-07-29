import axios from "axios";

const API_URL = "http://localhost:5000";

export async function generateTrip(data) {
  try {
    const response = await axios.post(
      `${API_URL}/generate-trip`,
      data
    );

    return response.data.trip;
  } catch (error) {
    console.error("Frontend Error:", error);

    if (error.response) {
      throw new Error(
        error.response.data.error || "Failed to generate AI trip."
      );
    }

    throw new Error("Backend server is not running.");
  }
}