import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();


console.log(
  "Loaded OpenRouter API Key:",
  process.env.OPENROUTER_API_KEY ? "YES" : "NO"
);

console.log("Current Directory:", process.cwd());


const app = express();


app.use(cors({
  origin: "*"
}));

app.use(express.json());


const PORT = process.env.PORT || 5000;



app.get("/", (req, res) => {

  res.send("🚀 Journey Jotter Backend Running");

});




app.post("/generate-trip", async (req, res) => {


  try {


    const {
      destination,
      days,
      budget,
      style,
      travelType
    } = req.body;



    const prompt = `

You are an expert AI Travel Planner.

Generate a detailed and realistic ${days}-day travel itinerary.

Trip Details:

- Destination: ${destination}
- Duration: ${days} days
- Budget: ₹${budget}
- Travel Style: ${style}
- Travel Type: ${travelType}


Return the itinerary in Markdown format.


# 🌍 Destination Overview

Write 3-4 lines introducing the destination.


For each day:


## 📅 Day 1

🌅 Morning

☀️ Afternoon

🌇 Evening

🌙 Night

🍽️ Food to Try

🚕 Transport

💵 Estimated Cost


Repeat until Day ${days}.


Finally include:


# 🏨 Best Hotels

- Hotel Name
- Approximate Price
- Rating


# 🍴 Best Restaurants

Recommend 5 famous restaurants.


# 📍 Top 10 Attractions


# 💰 Budget Breakdown

Accommodation:

Food:

Transport:

Activities:

Shopping:

Miscellaneous:

Total:


# 🎒 Packing Checklist

10-15 items.


# ⚠️ Travel Tips

At least 10 useful travel tips.


End with:

✨ Have a wonderful trip!

`;




    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {

        model: "openai/gpt-4o-mini",

        messages: [

          {
            role: "user",
            content: prompt
          }

        ],

        temperature: 0.8

      },


      {

        headers: {

          "Content-Type": "application/json",

          Authorization:
          `Bearer ${process.env.OPENROUTER_API_KEY}`

        }

      }

    );




    const trip =
      response.data.choices?.[0]?.message?.content ||
      "No itinerary generated.";



    res.json({

      success: true,

      trip

    });



  } catch(error) {


    console.error(
      "========== OPENROUTER ERROR =========="
    );


    if(error.response){

      console.log(error.response.data);

    }

    else{

      console.log(error.message);

    }



    res.status(500).json({

      success:false,

      message:"Failed to generate itinerary."

    });


  }


});





app.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );

});