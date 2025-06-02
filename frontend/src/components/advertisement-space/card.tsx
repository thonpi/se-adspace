import type { AdvertisementSpace } from "./interfaces";

export function AdvertisementSpaceCard(props: AdvertisementSpace) {
  return (
    <div className="w-full shadow-lg mb-2 p-4 bg-white border border-black dark:bg-gray-800">
      {/* Card Header */}
      <h3 className="text-xl text-left font-semibold text-gray-800 dark:text-white truncate">
        {props.name}{" "}
        <span
          className={`text-white text-xs px-3 py-1 rounded-full ${
            props.status === "AVAILABLE" ? "bg-green-600" : "bg-yellow-600"
          }`}
        >
          {props.status}
        </span>
      </h3>
      <p className="text-left text-gray-600 dark:text-gray-300 mt-2 text-sm">
        {props.description}
      </p>

      <div className="flex justify-end mt-4">
        <button className="text-black dark:text-white p-2 hover:bg-gray-600 underline transition">
          Open Discussion
        </button>
        <button className="text-black dark:text-white ml-2 p-2 hover:bg-gray-600 border transition">
          View on Map
        </button>
      </div>
    </div>
  );
}
