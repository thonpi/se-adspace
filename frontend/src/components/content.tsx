"use client";

import { useEffect, useState } from "react";
import type { AdvertisementSpace } from "./advertisement-space/interfaces";
import { AdvertisementSpaceCard } from "./advertisement-space/card";
import { useAppContext } from "@/context/AppContext";
import CreateAdvertisementModal from "./advertisement-space/create-modal";
import { getAdSpaces } from "@/api-services/advertisement-space";

export function Content({
  setStoreLocations,
}: {
  setStoreLocations: (locations: any[]) => void;
}) {
  const { user, token, setErrorMsg } = useAppContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [advertisementSpaces, setAdvertisementSpaces] = useState<
    AdvertisementSpace[]
  >([]);

  const fetchAdvertisementSpaces = async () => {
    try {
      const response = await getAdSpaces();
      if (!response.code || response.code !== 200) {
        throw new Error("Failed to fetch advertisement spaces");
      }
      setAdvertisementSpaces(response.data.advertisementSpaces || []);
      setStoreLocations(
        response.data.advertisementSpaces.map((space: AdvertisementSpace) => ({
          id: space._id,
          name: space.name,
          lat: space.latitude,
          lng: space.longitude,
          description: space.description,
        }))
      );
    } catch (error) {
      setErrorMsg(
        "Failed to fetch advertisement spaces. Please try again later."
      );
    }
  };

  useEffect(() => {
    // Fetch advertisement spaces from the API
    fetchAdvertisementSpaces();
  }, []);

  return (
    <div className="h-full max-h-full text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <div>
        <h1 className="text-2xl font-bold mb-4">Advertisement Spaces</h1>
        <p className="mb-4">
          Explore available advertisement spaces or create your own.
        </p>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          if (!user) {
            alert("Please log in to create an advertisement space.");
            return;
          }
          setIsAddModalOpen(!isAddModalOpen);
          // Open create modal logic here
        }}
      >
        Add+
      </button>
      <CreateAdvertisementModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        userId={user?._id}
        token={token}
        onSuccess={fetchAdvertisementSpaces} // Callback to refresh spaces after creation
        onError={(error) => setErrorMsg(error)}
      />

      <div className="h-full flex flex-col gap-2 mb-2">
        {/* Map through advertisement spaces and render cards */}
        {advertisementSpaces.map((space) => (
          <AdvertisementSpaceCard
            key={space._id}
            space={space}
            userId={user?._id}
            onDeleteSuccess={(id) => {
              setAdvertisementSpaces((prev) =>
                prev.filter((s) => s._id !== id)
              );
              setStoreLocations(
                advertisementSpaces
                  .filter((s) => s._id !== id)
                  .map((space: AdvertisementSpace) => ({
                    id: space._id,
                    name: space.name,
                    lat: space.latitude,
                    lng: space.longitude,
                    description: space.description,
                  }))
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
