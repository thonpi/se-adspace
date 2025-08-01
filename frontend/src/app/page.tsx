"use client";

import { AdvertisementSpace } from "@/components/advertisement-space/interfaces";
import { Content } from "@/components/content";
import { Header } from "@/components/header";
import { Map } from "@/components/map";
import NetworkStatus from "@/components/network-status";
import Toast from "@/components/toast";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";

export default function Home() {
  const { errorMsg, setErrorMsg, successMsg, setSuccessMsg } = useAppContext();
  const [storeLocations, setStoreLocations] = useState<any[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<AdvertisementSpace | null>(
    null
  );
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const handleToastClose = () => {
    setErrorMsg("");
    setSuccessMsg("");
  };

  return (
    <main className="w-full h-screen max-h-screen px-4 container mx-auto">
      {(errorMsg || successMsg) && (
        <Toast
          errorMsg={errorMsg || ""}
          successMsg={successMsg || ""}
          onClose={() => handleToastClose()}
        />
      )}
      <NetworkStatus />
      <Header activeFilters={activeFilters} toggleFilter={toggleFilter} />
      <div className="min-h-[750px] max-h-screen grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="h-[300px] md:h-full max-h-[750px] col-span-1 md:col-span-8 border border-green-700">
          <Map
            storeLocations={storeLocations}
            setSelectedSpace={setSelectedSpace}
            selectedSpace={
              selectedSpace
                ? {
                    id: selectedSpace._id,
                    name: selectedSpace.name,
                    lat: selectedSpace.latitude,
                    lng: selectedSpace.longitude,
                    description: selectedSpace.description,
                    width: selectedSpace.width,
                    height: selectedSpace.height,
                  }
                : null
            }
          />
        </div>
        <div className="h-full max-h-[calc(100vh-400px)] md:max-h-[calc(100vh-85px)] col-span-1 md:col-span-4 overflow-y-auto">
          <Content
            setActiveFilters={setActiveFilters}
            activeFilters={activeFilters}
            setStoreLocations={setStoreLocations}
            onViewOnMap={(space) => setSelectedSpace(space)}
          />
        </div>
      </div>
    </main>
  );
}
