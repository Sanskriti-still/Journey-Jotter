export async function generateTrip(data) {
  const response = await fetch(
    "http://localhost:5000/generate-trip",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!result.success) {
    throw new Error("Failed to generate trip");
  }

  return result.trip;
}