function Destinations() {
  const destinations = [
    {
      name: "Goa",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
      description: "Beautiful beaches and nightlife."
    },
    {
      name: "Manali",
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
      description: "Snowy mountains and adventure."
    },
    {
      name: "Bali",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      description: "Tropical paradise."
    },
    {
      name: "Paris",
      image:
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
      description: "Romantic city of lights."
    }
  ];

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-blue-700">
          Popular Destinations
        </h2>

        <div className="grid md:grid-cols-4 gap-8 mt-12">

          {destinations.map((place, index) => (

            <div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 duration-300"
            >

              <img
                src={place.image}
                alt={place.name}
                className="h-60 w-full object-cover"
              />

              <div className="p-5">

                <h3 className="text-2xl font-bold">
                  {place.name}
                </h3>

                <p className="text-gray-600 mt-2">
                  {place.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Destinations;