"use client";

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
      <Header />
      <div className="min-h-[750px] max-h-screen grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="h-[300px] md:h-full max-h-[750px] col-span-1 md:col-span-8 border border-green-700">
          <Map storeLocations={storeLocations} />
        </div>
        <div className="h-full max-h-[calc(100vh-400px)] md:max-h-[calc(100vh-85px)] col-span-1 md:col-span-4 overflow-y-auto">
          <Content setStoreLocations={setStoreLocations} />
        </div>
      </div>
    </main>
  );
}
