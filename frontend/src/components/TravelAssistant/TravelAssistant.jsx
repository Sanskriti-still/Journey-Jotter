import { useState } from "react";

function TravelAssistant() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const getAnswer = () => {

    const q = question.toLowerCase();

    if (q.includes("pack")) {
      setAnswer(
`🎒 Packing Checklist

• Comfortable clothes
• Power bank
• ID proof
• Water bottle
• Sunscreen
• Sunglasses
• Medicines
• Charger
• Cash + Cards`
      );
    }

    else if (q.includes("safe")) {
      setAnswer(
`🛡️ Safety Tips

• Avoid isolated places at night.
• Keep emergency contacts handy.
• Carry only necessary cash.
• Use trusted transport.
• Keep your phone charged.`
      );
    }

    else if (q.includes("budget")) {
      setAnswer(
`💰 Budget Tips

• Book tickets early.
• Use public transport.
• Eat at local restaurants.
• Compare hotel prices.
• Keep an emergency budget.`
      );
    }

    else if (q.includes("food")) {
      setAnswer(
`🍽️ Food Suggestions

• Try local cuisine.
• Check restaurant ratings.
• Drink safe bottled water.
• Visit popular cafés.
• Don't miss regional specialties.`
      );
    }

    else if (q.includes("weather")) {
      setAnswer(
`🌤️ Weather Advice

• Check the latest forecast.
• Carry suitable clothing.
• Keep an umbrella during monsoon.
• Stay hydrated in summer.`
      );
    }

    else {
      setAnswer(
`🤖 I don't know that yet.

Try asking:
• What should I pack?
• Is it safe?
• Budget tips
• Food recommendations
• Weather advice`
      );
    }

  };

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

      <h2 className="text-3xl font-bold text-blue-700">
        🤖 AI Travel Assistant
      </h2>

      <p className="text-gray-500 mt-2">
        Ask simple travel questions.
      </p>

      <input
        type="text"
        placeholder="Example: What should I pack?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full border rounded-xl p-4 mt-6"
      />

      <button
        onClick={getAnswer}
        className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
      >
        Ask Assistant
      </button>

      {answer && (

        <div className="bg-blue-50 rounded-2xl p-6 mt-8 whitespace-pre-line">

          <h3 className="text-xl font-bold text-blue-700 mb-3">
            Answer
          </h3>

          <p>{answer}</p>

        </div>

      )}

    </div>

  );

}

export default TravelAssistant;