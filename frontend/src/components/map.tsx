"use client";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { env } from "../utils/env";

interface Props {
  storeLocations: {
    id: number;
    name: string;
    lat: number;
    lng: number;
    description: string;
    width: number;
    height: number;
  }[];
  selectedSpace: {
    id: string;
    name: string;
    lat: number;
    lng: number;
    description: string;
    width: number;
    height: number;
  } | null;
  setSelectedSpace: (space: any) => void;
}

export function Map({
  storeLocations = [],
  selectedSpace,
  setSelectedSpace,
}: Props) {
  // Load the Google Maps script with the provided API key
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: env.GOOGLE_MAPS_KEY,
    region: "KH", // Cambodia
  });

  const [selectedStore, setSelectedStore] = useState<any>(null); // Track the selected store

  useEffect(() => {
    if (selectedSpace) {
      setSelectedStore(selectedSpace);
      setSelectedSpace(null);
    }
  }, [selectedSpace]);

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
          onClick={() => {
            setSelectedStore(store);
          }} // Set the clicked store to state
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
              src={
                "https://t3.ftcdn.net/jpg/14/67/86/34/360_F_1467863416_IROBxeMYwzwxokQBViJI5y5fMjQWxAcs.jpg"
              }
              alt={"Store Banner"}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
              }}
            />

            <h3 className="my-2 font-bold">{selectedStore.name}</h3>
            {selectedStore.width && selectedStore.height && (
              <p className="text-sm text-gray-600">
                {selectedStore.width} x {selectedStore.height} m
              </p>
            )}
            <p>{selectedStore.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
