import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard() {

  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {

    const savedTrips =
      JSON.parse(localStorage.getItem("journeyTrips")) || [];

    setTrips(savedTrips);

  }, []);



  const updateTrips = (updatedTrips) => {

    setTrips(updatedTrips);

    localStorage.setItem(
      "journeyTrips",
      JSON.stringify(updatedTrips)
    );

  };



  const deleteTrip = (index) => {

    const updatedTrips =
      trips.filter((_, i) => i !== index);

    updateTrips(updatedTrips);

  };



  const clearTrips = () => {

    localStorage.removeItem("journeyTrips");

    setTrips([]);

  };



  const toggleFavorite = (index) => {

    const updatedTrips = [...trips];

    updatedTrips[index].favorite =
      !updatedTrips[index].favorite;

    updateTrips(updatedTrips);

  };



  const filteredTrips = trips.filter((trip) =>
    trip.destination
      .toLowerCase()
      .includes(search.toLowerCase())
  );



  const totalBudget = trips.reduce(
    (sum, trip) => sum + Number(trip.budget || 0),
    0
  );


  const favoriteTrips = trips.filter(
    (trip) => trip.favorite
  ).length;



  return (

<section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100 py-10">

<div className="max-w-7xl mx-auto px-6">


<motion.div
initial={{opacity:0,y:-40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className="flex justify-between items-center flex-wrap gap-4"
>


<div>

<h1 className="text-5xl font-extrabold text-blue-700">
📊 Dashboard
</h1>

<p className="text-gray-500 mt-3 text-lg">
Manage your AI travel plans
</p>

</div>


<Link
to="/planner"
className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 shadow-lg"
>
➕ Plan New Trip
</Link>


</motion.div>




<input

type="text"

placeholder="🔍 Search destination..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="w-full mt-10 border rounded-xl p-4 shadow"

 />





<div className="grid md:grid-cols-3 gap-6 mt-10">


{[
{
title:"Total Trips",
value:trips.length,
color:"text-blue-700",
bg:"bg-blue-50"
},
{
title:"Total Budget",
value:`₹${totalBudget}`,
color:"text-green-600",
bg:"bg-green-50"
},
{
title:"❤️ Favorites",
value:favoriteTrips,
color:"text-red-600",
bg:"bg-red-50"
}

].map((card,index)=>(

<motion.div

key={index}

whileHover={{scale:1.05}}

className={`${card.bg} rounded-3xl shadow-xl p-8 text-center`}

>

<h3 className="text-gray-500">
{card.title}
</h3>


<p className={`text-5xl font-bold mt-5 ${card.color}`}>
{card.value}
</p>


</motion.div>

))}


</div>





{trips.length>0 &&

<button

onClick={clearTrips}

className="mt-8 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700"

>

🗑 Clear All Trips

</button>

}





{filteredTrips.length===0 ?


<div className="bg-white rounded-3xl shadow-xl mt-10 p-12 text-center">

<div className="text-7xl">
✈️
</div>


<h2 className="text-3xl font-bold mt-6">
No Trips Found
</h2>


<p className="text-gray-500 mt-3">
Generate your first AI trip or change your search.
</p>


</div>


:

<div className="grid lg:grid-cols-2 gap-8 mt-10">


{filteredTrips.map((trip)=>{


const originalIndex =
trips.findIndex(
(t)=>
t.date===trip.date &&
t.destination===trip.destination
);



return (

<motion.div

key={trip.date}

initial={{opacity:0,y:40}}

animate={{opacity:1,y:0}}

transition={{duration:0.5}}

whileHover={{y:-5}}

className="bg-white rounded-3xl shadow-xl overflow-hidden"

>


{trip.image &&

<img

src={trip.image}

alt={trip.destination}

className="w-full h-56 object-cover"

/>

}



<div className="p-6">


<h2 className="text-3xl font-bold text-blue-700">
📍 {trip.destination}
</h2>



<div className="mt-5 space-y-2">

<p>📅 {trip.days} Days</p>

<p>💰 ₹{trip.budget}</p>

<p>🎒 {trip.style}</p>

<p>👥 {trip.travelType}</p>

<p className="text-gray-500 text-sm">
{trip.date}
</p>


</div>




<div className="flex flex-wrap gap-3 mt-6">


<button

onClick={()=>
navigate(`/trip/${originalIndex}`,{
state:{trip}
})
}

className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"

>

👀 View Details

</button>




<button

onClick={()=>
toggleFavorite(originalIndex)
}

className="bg-yellow-500 text-white px-5 py-3 rounded-xl"

>

{trip.favorite
?"❤️ Favorited"
:"🤍 Favorite"}

</button>




<button

onClick={()=>
deleteTrip(originalIndex)
}

className="bg-red-600 text-white px-5 py-3 rounded-xl"

>

🗑 Delete

</button>


</div>


</div>


</motion.div>


)


})}


</div>

}


</div>

</section>


  );

}


export default Dashboard;