"use client";

import { useState } from "react";
import type { AdvertisementSpace } from "./advertisement-space/interfaces";
import { AdvertisementSpaceCard } from "./advertisement-space/card";
import { useAppContext } from "@/context/AppContext";

export function Content() {
  const { user } = useAppContext();

  const categories = [
    {
      key: "ADVERTISEMENT_SPACES",
      value: "Advertisement Spaces",
    },
    {
      key: "DESIGN_JOBS",
      value: "Design Jobs",
    },
  ];
  const [active, setActive] = useState(categories[0].key);

  const advertisementSpaces: AdvertisementSpace[] = [
    {
      _id: "1",
      ownerId: "user1",
      name: "Downtown Billboard",
      description: "A prime billboard located in the heart of the city center.",
      latitude: 40.7128,
      longitude: -74.006,
      width: 10,
      height: 5,
      imagePaths: ["image1.jpg", "image2.jpg"],
      status: "AVAILABLE",
      createdAt: new Date("2025-01-01T12:00:00Z"),
      updatedAt: new Date("2025-01-01T12:00:00Z"),
    },
    {
      _id: "2",
      ownerId: "user2",
      name: "Airport Display",
      description: "Digital display board inside the airport terminal.",
      latitude: 34.0522,
      longitude: -118.2437,
      width: 15,
      height: 8,
      imagePaths: ["airport1.jpg", "airport2.jpg"],
      status: "RENTED",
      createdAt: new Date("2024-05-15T08:00:00Z"),
      updatedAt: new Date("2024-06-10T09:00:00Z"),
    },
    {
      _id: "3",
      ownerId: "user3",
      name: "Highway Billboard",
      description: "A massive billboard by the highway for high visibility.",
      latitude: 37.7749,
      longitude: -122.4194,
      width: 20,
      height: 10,
      imagePaths: ["highway1.jpg", "highway2.jpg"],
      status: "UNDER_RENT_MARKET",
      createdAt: new Date("2023-08-01T14:00:00Z"),
      updatedAt: new Date("2025-02-01T10:30:00Z"),
    },
    {
      _id: "4",
      ownerId: "user4",
      name: "Mall Advertisement Screen",
      description: "Large screen in the mall showcasing ads to shoppers.",
      latitude: 51.5074,
      longitude: -0.1278,
      width: 8,
      height: 4,
      imagePaths: ["mall1.jpg", "mall2.jpg"],
      status: "INACTIVE",
      createdAt: new Date("2024-07-20T15:00:00Z"),
      updatedAt: new Date("2024-07-20T15:00:00Z"),
    },
    {
      _id: "5",
      ownerId: "user5",
      name: "Train Station Billboard",
      description: "A large digital board inside the train station.",
      latitude: 40.7306,
      longitude: -73.9352,
      width: 12,
      height: 6,
      imagePaths: ["trainstation1.jpg", "trainstation2.jpg"],
      status: "AVAILABLE",
      createdAt: new Date("2024-11-10T17:00:00Z"),
      updatedAt: new Date("2024-11-10T17:00:00Z"),
    },
    {
      _id: "6",
      ownerId: "user1",
      name: "Downtown Billboard",
      description: "A prime billboard located in the heart of the city center.",
      latitude: 40.7128,
      longitude: -74.006,
      width: 10,
      height: 5,
      imagePaths: ["image1.jpg", "image2.jpg"],
      status: "AVAILABLE",
      createdAt: new Date("2025-01-01T12:00:00Z"),
      updatedAt: new Date("2025-01-01T12:00:00Z"),
    },
    {
      _id: "7",
      ownerId: "user2",
      name: "Airport Display",
      description: "Digital display board inside the airport terminal.",
      latitude: 34.0522,
      longitude: -118.2437,
      width: 15,
      height: 8,
      imagePaths: ["airport1.jpg", "airport2.jpg"],
      status: "RENTED",
      createdAt: new Date("2024-05-15T08:00:00Z"),
      updatedAt: new Date("2024-06-10T09:00:00Z"),
    },
    {
      _id: "8",
      ownerId: "user3",
      name: "Highway Billboard",
      description: "A massive billboard by the highway for high visibility.",
      latitude: 37.7749,
      longitude: -122.4194,
      width: 20,
      height: 10,
      imagePaths: ["highway1.jpg", "highway2.jpg"],
      status: "UNDER_RENT_MARKET",
      createdAt: new Date("2023-08-01T14:00:00Z"),
      updatedAt: new Date("2025-02-01T10:30:00Z"),
    },
    {
      _id: "9",
      ownerId: "user4",
      name: "Mall Advertisement Screen",
      description: "Large screen in the mall showcasing ads to shoppers.",
      latitude: 51.5074,
      longitude: -0.1278,
      width: 8,
      height: 4,
      imagePaths: ["mall1.jpg", "mall2.jpg"],
      status: "INACTIVE",
      createdAt: new Date("2024-07-20T15:00:00Z"),
      updatedAt: new Date("2024-07-20T15:00:00Z"),
    },
    {
      _id: "10",
      ownerId: "user5",
      name: "Train Station Billboard",
      description: "A large digital board inside the train station.",
      latitude: 40.7306,
      longitude: -73.9352,
      width: 12,
      height: 6,
      imagePaths: ["trainstation1.jpg", "trainstation2.jpg"],
      status: "AVAILABLE",
      createdAt: new Date("2024-11-10T17:00:00Z"),
      updatedAt: new Date("2024-11-10T17:00:00Z"),
    },
  ];

  return (
    <div className="h-full max-h-full text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="mb-2 flex flex-wrap">
        {categories.map((category) => (
          <li className="me-2" key={category.key}>
            <p
              onClick={() => setActive(category.key)}
              className={
                active === category.key
                  ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
            >
              {category.value}
            </p>
          </li>
        ))}
      </ul>

      {active === "ADVERTISEMENT_SPACES" && (
        <div className="h-full flex flex-wrap justify-center mb-2">
          {/* {(user ? advertisementSpaces : []).map((space) => (
            <AdvertisementSpaceCard key={space._id} {...space} />
          ))} */}
          {advertisementSpaces.map((space) => (
            <AdvertisementSpaceCard key={space._id} {...space} />
          ))}
        </div>
      )}

      {active === "DESIGN_JOBS" && (
        <div className="h-full mt-4 md:mt-20">
          <div>Comming Soon!</div>
        </div>
      )}
    </div>
  );
}
