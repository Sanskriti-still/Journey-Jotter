function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

      <div className="bg-blue-500 text-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold">Upcoming Trips</h2>
        <p className="text-4xl font-bold mt-3">3</p>
      </div>

      <div className="bg-green-500 text-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold">Budget Left</h2>
        <p className="text-4xl font-bold mt-3">₹25,000</p>
      </div>

      <div className="bg-orange-500 text-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold">Saved Places</h2>
        <p className="text-4xl font-bold mt-3">12</p>
      </div>

    </div>
  );
}

export default DashboardCards;