import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { WithAuth } from '@/hooks';

function App() {
  const startPoint = [-9.6615, -35.7025]; // Praia de Ponta Verde, Maceió
  const endPoint = [-9.6677, -35.7143];   // Praia de Jatiúca, Maceió

  const [route, setRoute] = useState([]);

  useEffect(() => {
    async function fetchRoute() {
      const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=YOUR_API_KEY&start=${startPoint[1]},${startPoint[0]}&end=${endPoint[1]},${endPoint[0]}`);
      const data = await response.json();
      const coordinates = data.features[0].geometry.coordinates;
      setRoute(coordinates);
    }

    fetchRoute();
  }, []);

  const routeCoordinates = route.map(coord => [coord[1], coord[0]]);

  return (
    <MapContainer center={startPoint} zoom={14} style={{ width: '100%', height: '500px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={routeCoordinates} color="blue" />
      <Marker position={startPoint}>
        <Popup>
          Praia de Ponta Verde
        </Popup>
      </Marker>
      <Marker position={endPoint}>
        <Popup>
          Praia de Jatiúca
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default WithAuth(App);
