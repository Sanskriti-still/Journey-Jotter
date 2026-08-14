import { motion } from "framer-motion";
import {
  Wallet,
  Hotel,
  Utensils,
  Car,
  Ticket,
  ShoppingBag,
  ShieldAlert,
} from "lucide-react";

function BudgetBreakdown({
  budget = 0,
  days = 1,
}) {
  const totalBudget = Number(budget) || 0;
  const totalDays = Number(days) || 1;

  if (totalBudget <= 0) {
    return null;
  }

  const breakdown = [
    {
      name: "Stay",
      percentage: 36,
      icon: Hotel,
      description: "Hotels & accommodation",
    },
    {
      name: "Food",
      percentage: 18,
      icon: Utensils,
      description: "Meals & drinks",
    },
    {
      name: "Transport",
      percentage: 16,
      icon: Car,
      description: "Local & intercity travel",
    },
    {
      name: "Activities",
      percentage: 15,
      icon: Ticket,
      description: "Tickets & experiences",
    },
    {
      name: "Shopping",
      percentage: 7,
      icon: ShoppingBag,
      description: "Souvenirs & shopping",
    },
    {
      name: "Emergency",
      percentage: 8,
      icon: ShieldAlert,
      description: "Emergency reserve",
    },
  ];

  const formatMoney = (amount) =>
    `₹${Math.round(amount).toLocaleString("en-IN")}`;

  const dailyBudget = totalBudget / totalDays;

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="mt-10"
    >
      {/* HEADER */}

      <div className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
          <Wallet size={16} />
          SMART BUDGET
        </span>

        <h2 className="mt-4 text-3xl font-black text-slate-900">
          Your Budget Breakdown
        </h2>

        <p className="mt-2 text-slate-500">
          A balanced estimate based on your total trip budget.
        </p>
      </div>

      {/* TOTAL BUDGET */}

      <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-white shadow-2xl md:p-8">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>
            <p className="text-sm font-semibold text-slate-400">
              TOTAL TRIP BUDGET
            </p>

            <h3 className="mt-2 text-4xl font-black md:text-5xl">
              {formatMoney(totalBudget)}
            </h3>

            <p className="mt-2 text-slate-400">
              Approximately{" "}
              <span className="font-bold text-cyan-400">
                {formatMoney(dailyBudget)}
              </span>{" "}
              per day
            </p>
          </div>

          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-md">
            <Wallet
              size={36}
              className="text-cyan-400"
            />
          </div>

        </div>

        {/* ALLOCATION BAR */}

        <div className="mt-8">

          <div className="mb-2 flex justify-between text-xs font-semibold text-slate-400">
            <span>Budget allocation</span>
            <span>100%</span>
          </div>

          <div className="flex h-4 overflow-hidden rounded-full bg-white/10">

            {breakdown.map((item) => (
              <div
                key={item.name}
                style={{
                  width: `${item.percentage}%`,
                }}
                title={`${item.name}: ${item.percentage}%`}
                className="border-r border-slate-950/20 last:border-r-0"
              />
            ))}

          </div>

        </div>

      </div>

      {/* BREAKDOWN CARDS */}

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {breakdown.map((item, index) => {

          const Icon = item.icon;

          const amount =
            totalBudget *
            (item.percentage / 100);

          return (
            <motion.div
              key={item.name}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.06,
                duration: 0.4,
              }}
              whileHover={{
                y: -4,
              }}
              className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                  <Icon
                    size={22}
                    className="text-blue-600"
                  />
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                  {item.percentage}%
                </span>

              </div>

              <h3 className="mt-4 text-lg font-black text-slate-900">
                {item.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {item.description}
              </p>

              <div className="mt-4 flex items-end justify-between">

                <p className="text-2xl font-black text-slate-900">
                  {formatMoney(amount)}
                </p>

                <p className="text-xs font-semibold text-slate-400">
                  estimated
                </p>

              </div>

            </motion.div>
          );
        })}

      </div>

      {/* TIP */}

      <div className="mt-5 rounded-3xl border border-amber-100 bg-amber-50 p-5">

        <p className="font-bold text-amber-800">
          💡 Smart Travel Tip
        </p>

        <p className="mt-1 text-sm leading-6 text-amber-700">
          Keep your emergency reserve untouched unless
          something unexpected happens. This gives you
          extra flexibility during your journey.
        </p>

      </div>

    </motion.section>
  );
}

export default BudgetBreakdown;