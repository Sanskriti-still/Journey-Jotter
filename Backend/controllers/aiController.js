import axios from "axios";

export const generateTrip = async (req, res) => {
  try {
    const { destination, days, budget, travelStyle } = req.body;

    const prompt = `
    Create a detailed travel itinerary.

    Destination: ${destination}
    Days: ${days}
    Budget: ${budget}
    Travel Style: ${travelStyle}

    Include:
    1. Day-wise plan
    2. Places to visit
    3. Food recommendations
    4. Approximate expenses
    5. Travel tips
    `;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      itinerary: response.data.choices[0].message.content,
    });

  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      message: "AI generation failed",
    });
  }
};