import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  MapPin,
  Wallet,
  Utensils,
  Camera,
  X,
  Loader2,
} from "lucide-react";

function TravelAssistant({
  destination = "",
  budget = "",
  days = "",
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const quickQuestions = [
    {
      label: "🍴 Where should I eat?",
      text: "Suggest some good food options.",
    },
    {
      label: "📸 Best places to visit?",
      text: "What are the best places I should visit?",
    },
    {
      label: "💰 Save money",
      text: "How can I save money on this trip?",
    },
    {
      label: "🗺️ Travel tips",
      text: "Give me useful travel tips.",
    },
  ];

  const generateReply = (question) => {
    const text = question.toLowerCase();

    if (
      text.includes("eat") ||
      text.includes("food") ||
      text.includes("restaurant")
    ) {
      return `For ${destination}, try a mix of local restaurants, popular cafés and street-food spots. Keep one meal flexible each day so you can discover something new while exploring. 🍴`;
    }

    if (
      text.includes("visit") ||
      text.includes("place") ||
      text.includes("attraction")
    ) {
      return `For a ${days}-day trip to ${destination}, prioritize the major landmarks first and keep some time for nearby hidden gems. Your itinerary can be adjusted if you find a place you really enjoy. 📸`;
    }

    if (
      text.includes("money") ||
      text.includes("budget") ||
      text.includes("cheap") ||
      text.includes("save")
    ) {
      return `Your planned budget is ₹${Number(
        budget || 0
      ).toLocaleString("en-IN")}. To save money, use local transport, compare accommodation prices and keep a small emergency reserve untouched. 💰`;
    }

    if (
      text.includes("tip") ||
      text.includes("travel")
    ) {
      return `For ${destination}, keep your essentials organized, check the weather before leaving each morning and avoid packing your itinerary too tightly. Give yourself some free time to explore. 🗺️`;
    }

    return `I'd recommend exploring ${destination} at a comfortable pace. You have ${days || "a few"} days planned with a budget of ₹${Number(
      budget || 0
    ).toLocaleString("en-IN")}. Ask me about food, places, budgeting or travel tips! ✨`;
  };

  const sendMessage = (text = message) => {
    const cleanMessage = text.trim();

    if (!cleanMessage) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: cleanMessage,
    };

    const assistantMessage = {
      id: Date.now() + 1,
      sender: "assistant",
      text: generateReply(cleanMessage),
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
      assistantMessage,
    ]);

    setMessage("");
  };

  return (
    <>
      {/* =====================================================
          FLOATING BUTTON
      ===================================================== */}

      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-cyan-400/30 bg-slate-950 px-5 py-4 text-white shadow-2xl shadow-cyan-900/30"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400">
          <Bot size={22} />
        </span>

        <span className="hidden font-bold sm:block">
          Ask Journey Jotter
        </span>
      </motion.button>

      {/* =====================================================
          ASSISTANT PANEL
      ===================================================== */}

      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />

            {/* PANEL */}

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 40,
                scale: 0.96,
              }}
              transition={{
                duration: 0.25,
              }}
              className="fixed bottom-4 right-4 z-[70] flex h-[min(720px,calc(100vh-32px))] w-[calc(100%-32px)] max-w-[440px] flex-col overflow-hidden rounded-[30px] border border-white/10 bg-slate-950 text-white shadow-2xl sm:bottom-6 sm:right-6"
            >
              {/* HEADER */}

              <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 p-5">

                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl" />

                <div className="relative flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-cyan-500/20">
                      <Bot size={25} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">

                        <h2 className="font-black">
                          Journey Jotter AI
                        </h2>

                        <Sparkles
                          size={14}
                          className="text-cyan-300"
                        />

                      </div>

                      <p className="text-xs text-slate-400">
                        Your personal travel companion
                      </p>
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  >
                    <X size={19} />
                  </button>

                </div>

                {/* DESTINATION INFO */}

                {destination && (
                  <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">

                    <MapPin
                      size={18}
                      className="text-cyan-400"
                    />

                    <div className="min-w-0">

                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        CURRENT JOURNEY
                      </p>

                      <p className="truncate text-sm font-bold text-white">
                        {destination}
                      </p>

                    </div>

                  </div>
                )}

              </div>

              {/* CHAT AREA */}

              <div className="flex-1 overflow-y-auto p-5">

                {messages.length === 0 ? (
                  <div className="flex h-full flex-col justify-center">

                    <div className="mb-6 text-center">

                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                        <Sparkles
                          size={28}
                          className="text-cyan-400"
                        />
                      </div>

                      <h3 className="mt-5 text-xl font-black">
                        How can I help?
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Ask anything about your {destination || "trip"}.
                      </p>

                    </div>

                    {/* QUICK QUESTIONS */}

                    <div className="space-y-3">

                      {quickQuestions.map(
                        (question) => (
                          <button
                            key={question.text}
                            type="button"
                            onClick={() =>
                              sendMessage(
                                question.text
                              )
                            }
                            className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-left text-sm font-semibold text-slate-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-white"
                          >

                            <span>
                              {question.label}
                            </span>

                            <Send
                              size={15}
                              className="text-cyan-400"
                            />

                          </button>
                        )
                      )}

                    </div>

                  </div>
                ) : (
                  <div className="space-y-4">

                    {messages.map((item) => (

                      <div
                        key={item.id}
                        className={`flex ${
                          item.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >

                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                            item.sender === "user"
                              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                              : "border border-white/10 bg-white/5 text-slate-300"
                          }`}
                        >
                          {item.sender ===
                            "assistant" && (
                            <div className="mb-2 flex items-center gap-2 text-xs font-bold text-cyan-400">
                              <Bot size={13} />
                              Journey Jotter AI
                            </div>
                          )}

                          {item.text}
                        </div>

                      </div>

                    ))}

                  </div>
                )}

              </div>

              {/* QUICK ACTIONS */}

              {messages.length > 0 && (
                <div className="flex gap-2 overflow-x-auto border-t border-white/5 px-5 py-3">

                  <button
                    type="button"
                    onClick={() =>
                      sendMessage(
                        "Suggest some good food options."
                      )
                    }
                    className="flex shrink-0 items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold text-slate-400 hover:bg-white/10 hover:text-white"
                  >
                    <Utensils size={13} />
                    Food
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      sendMessage(
                        "What are the best places I should visit?"
                      )
                    }
                    className="flex shrink-0 items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold text-slate-400 hover:bg-white/10 hover:text-white"
                  >
                    <Camera size={13} />
                    Places
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      sendMessage(
                        "How can I save money on this trip?"
                      )
                    }
                    className="flex shrink-0 items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold text-slate-400 hover:bg-white/10 hover:text-white"
                  >
                    <Wallet size={13} />
                    Budget
                  </button>

                </div>
              )}

              {/* INPUT */}

              <div className="border-t border-white/10 bg-slate-950 p-4">

                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 focus-within:border-cyan-400/40">

                  <input
                    type="text"
                    value={message}
                    onChange={(event) =>
                      setMessage(event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        sendMessage();
                      }
                    }}
                    placeholder="Ask about your trip..."
                    className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600"
                  />

                  <button
                    type="button"
                    onClick={() => sendMessage()}
                    disabled={!message.trim()}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Send size={17} />
                  </button>

                </div>

                <p className="mt-2 text-center text-[10px] text-slate-600">
                  Journey Jotter AI • Travel assistance
                </p>

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default TravelAssistant;