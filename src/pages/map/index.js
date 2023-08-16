import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { WithAuth } from "@/hooks";

const Index = () => {
  const position = [-9.649849, -35.708949]; // Coordenadas de Maceió, Alagoas

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ width: "100%", height: "500px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Maceió, Alagoas</Popup>
      </Marker>
    </MapContainer>
  );
};

export default WithAuth(Index);