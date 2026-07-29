import { useState, useEffect } from "react";

function ExpenseSplitter({ budget }) {

  const [people, setPeople] = useState(2);
  const [perPerson, setPerPerson] = useState(0);

  useEffect(() => {

    const total = Number(budget);

    if (total > 0 && people > 0) {
      setPerPerson((total / people).toFixed(2));
    } else {
      setPerPerson(0);
    }

  }, [budget, people]);

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

      <h2 className="text-3xl font-bold text-blue-700">
        💸 Expense Splitter
      </h2>

      <p className="text-gray-500 mt-2">
        Split your travel budget with friends or family.
      </p>

      <div className="mt-8">

        <label className="font-semibold">
          Number of People
        </label>

        <input
          type="number"
          min="1"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          className="w-full border rounded-xl p-4 mt-2"
        />

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div className="bg-blue-50 rounded-2xl p-6">

          <h3 className="text-gray-500">
            Total Budget
          </h3>

          <p className="text-4xl font-bold text-blue-700 mt-2">
            ₹{budget || 0}
          </p>

        </div>

        <div className="bg-green-50 rounded-2xl p-6">

          <h3 className="text-gray-500">
            Per Person
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-2">
            ₹{perPerson}
          </p>

        </div>

      </div>

    </div>

  );

}

export default ExpenseSplitter;