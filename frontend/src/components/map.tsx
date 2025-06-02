'use client';

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { useState } from "react";
import { env } from "../utils/env";

const storeLocations = [
  {
    id: 1,
    name: "AS 1 - Phnom Penh",
    lat: 11.5564,
    lng: 104.9282,
    description: "Capital city of Cambodia.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 2,
    name: "AS 2 - Battambang",
    lat: 13.0955,
    lng: 103.2105,
    description: "Famous for its colonial architecture.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 3,
    name: "AS 3 - Siem Reap",
    lat: 13.3625,
    lng: 103.8596,
    description: "Home to the Angkor Wat temple complex.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 4,
    name: "AS 4 - Sihanoukville",
    lat: 10.6253,
    lng: 103.523,
    description: "A coastal city with beaches and resorts.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 5,
    name: "AS 5 - Kampot",
    lat: 10.613,
    lng: 104.1743,
    description: "Known for its pepper plantations.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 6,
    name: "AS 6 - Kampong Cham",
    lat: 12.2494,
    lng: 105.4533,
    description: "A historic city near the Mekong River.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 7,
    name: "AS 7 - Kratie",
    lat: 12.4807,
    lng: 106.0219,
    description: "Famous for its freshwater Irrawaddy dolphins.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 8,
    name: "AS 8 - Takeo",
    lat: 10.9939,
    lng: 104.7972,
    description: "Known for its ancient temples and traditional culture.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 9,
    name: "AS 9 - Preah Sihanouk",
    lat: 10.6253,
    lng: 103.523,
    description: "A beautiful coastal province.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 10,
    name: "AS 10 - Banteay Meanchey",
    lat: 13.6611,
    lng: 102.9859,
    description: "A province near the Thai border.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 11,
    name: "AS 11 - Pursat",
    lat: 12.5483,
    lng: 103.9193,
    description: "Known for its natural beauty and temples.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 12,
    name: "AS 12 - Svay Rieng",
    lat: 11.1001,
    lng: 105.5795,
    description: "A province known for agriculture.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 13,
    name: "AS 13 - Stung Treng",
    lat: 13.5069,
    lng: 105.9777,
    description: "A province with rivers and natural landscapes.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 14,
    name: "AS 14 - Oddar Meanchey",
    lat: 13.663,
    lng: 103.5701,
    description: "A border province known for its ancient temples.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 15,
    name: "AS 15 - Tbong Khmum",
    lat: 12.9551,
    lng: 105.1053,
    description: "Famous for its cultural and historical significance.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 16,
    name: "AS 16 - Kandal",
    lat: 11.463,
    lng: 104.8364,
    description: "Surrounding Phnom Penh, a major agricultural area.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 17,
    name: "AS 17 - Mondulkiri",
    lat: 12.5133,
    lng: 107.0647,
    description: "Known for its wildlife and mountainous landscapes.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 18,
    name: "AS 18 - Ratanakiri",
    lat: 13.5353,
    lng: 106.9915,
    description: "Famous for its natural reserves and ethnic groups.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
  {
    id: 19,
    name: "AS 19 - Kravanh",
    lat: 11.4512,
    lng: 104.8065,
    description: "A less-visited province with beautiful natural surroundings.",
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/12/27/14/58/owl-9294302_1280.jpg",
  },
];

export function Map() {
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: env.GOOGLE_MAPS_KEY,
    region: "KH", // Cambodia
  });

  const [selectedStore, setSelectedStore] = useState<any>(null); // Track the selected store

  if (loadError) {
    return (
      <div key="placeholder" className="h-full w-full relative">
        <img
          src="/assets/default-map-img.jpeg"
          alt="placeholder"
          className="object-cover object-center aspect-video"
        />
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div key="placeholder" className="h-full w-full relative">
        <img
          src="/assets/default-map-img.jpeg"
          alt="placeholder"
          className="object-cover object-center aspect-video"
        />
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerClassName="h-full w-full z-0"
      options={{
        mapId: env.GOOGLE_MAPS_CLIENT_ID,
        disableDefaultUI: true,
        gestureHandling: "greedy", // allow user to zoom in/out by scrolling
        minZoom: 4,
        maxZoom: 15,
      }}
      zoom={7.5}
      center={{ lat: 12.5657, lng: 104.991 }} // Central Cambodia coordinates
    >
      {/* Add markers for each store */}
      {storeLocations.map((store) => (
        <Marker
          key={store.id}
          position={{ lat: store.lat, lng: store.lng }}
          title={store.name}
          onClick={() => setSelectedStore(store)} // Set the clicked store to state
        />
      ))}

      {/* InfoWindow that shows on marker click */}
      {selectedStore && (
        <InfoWindow
          position={{ lat: selectedStore.lat, lng: selectedStore.lng }}
          onCloseClick={() => setSelectedStore(null)} // Close the info window
        >
          <div
            style={{
              width: "250px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "5px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Top Banner Image */}
            <img
              src={selectedStore.imageSrc}
              alt={selectedStore.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
              }}
            />

            <h3 className="my-2 font-bold">{selectedStore.name}</h3>
            <p>{selectedStore.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
