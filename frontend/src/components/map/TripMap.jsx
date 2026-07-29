import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";


delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


function TripMap({ lat, lon, destination }) {

  if (!lat || !lon) return null;


  return (

    <div className="w-full h-[450px] rounded-3xl overflow-hidden shadow-xl">

      <MapContainer
        center={[lat, lon]}
        zoom={12}
        scrollWheelZoom={true}
        style={{
          height: "100%",
          width: "100%",
        }}
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        <Marker position={[lat, lon]}>

          <Popup>
            📍 {destination}
          </Popup>

        </Marker>


      </MapContainer>

    </div>

  );
}


export default TripMap;