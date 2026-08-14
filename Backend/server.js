import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;

// =====================================================
// HOME
// =====================================================

app.get("/", (req, res) => {
  res.send("🚀 Journey Jotter Backend Running");
});

// =====================================================
// GENERATE TRIP
// =====================================================

app.post("/generate-trip", async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);

    const {
      destination,
      days,
      budget,
      style,
      travelType,
    } = req.body || {};

    if (!destination) {
      return res.status(400).json({
        success: false,
        message: "Destination is required",
      });
    }

    const prompt = `
You are Journey Jotter AI, an intelligent travel planning assistant.

Create a detailed and practical travel itinerary.

DESTINATION:
${destination}

NUMBER OF DAYS:
${days}

BUDGET:
${budget || "Flexible"}

TRAVEL STYLE:
${style || "General"}

TRAVEL TYPE:
${travelType || "Solo"}

Create a personalized itinerary.

Include:

🌍 DESTINATION OVERVIEW

📅 DAY-WISE ITINERARY

For every day include:
- Morning activities
- Afternoon activities
- Evening activities
- Night activities
- Approximate travel time
- Approximate activity cost

🍽️ FOOD RECOMMENDATIONS

Include:
- Local dishes
- Popular food experiences
- Restaurants or food areas

🚕 TRANSPORTATION

Explain:
- Best local transport
- Approximate transport costs
- Useful travel tips

💰 BUDGET BREAKDOWN

Give an approximate breakdown for:
- Accommodation
- Transportation
- Food
- Activities
- Shopping
- Miscellaneous

Use this table:

| Category | Estimated Cost |

🏨 RECOMMENDED HOTELS

Use this table:

| Hotel | Category | Approximate Price | Rating |

📍 ATTRACTIONS

Include:
- Famous attractions
- Nature spots
- Photo spots
- Local experiences

💎 HIDDEN GEMS

Suggest some lesser-known experiences or places.

🎒 PACKING CHECKLIST

Create a useful checklist according to:
- Destination
- Weather
- Travel style
- Number of days

⚠️ TRAVEL TIPS

Include useful practical tips.

📱 EMERGENCY INFORMATION

Include general emergency and safety information.

IMPORTANT:
- Return Markdown only.
- Do NOT return JSON.
- Make the itinerary easy to read.
- Do not use code blocks.

End with:

✨ Have a safe and memorable journey with Journey Jotter!
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
        temperature: 0.8,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );

    const trip =
      response.data?.choices?.[0]?.message?.content;

    if (!trip) {
      throw new Error("No itinerary received from OpenRouter");
    }

    console.log("✅ Trip generated successfully");

    res.json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error(
      "OPENROUTER ERROR:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message:
        error.response?.data?.error?.message ||
        error.message ||
        "AI generation failed",
    });
  }
});

// =====================================================
// SERVER
// =====================================================

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});