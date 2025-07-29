import { useAppContext } from "@/context/AppContext";
import type { AdvertisementSpace } from "./interfaces";
import { deleteAdSpace } from "@/api-services/advertisement-space";

interface Props {
  space: AdvertisementSpace;
  userId?: string;
  onViewOnMap?: (space: AdvertisementSpace) => void;
  onEdit: (space: AdvertisementSpace) => void;
  onDeleteSuccess: (id: string) => void;
}

export function AdvertisementSpaceCard({
  space,
  userId = "",
  onViewOnMap,
  onDeleteSuccess,
  onEdit,
}: Props) {
  const { setErrorMsg, setSuccessMsg, token } = useAppContext();

  const handleEditClick = (space: AdvertisementSpace) => {
    if (onEdit) {
      onEdit(space);
    }
  };  

  const handleDeleteClick = async () => {
    if (!confirm("Are you sure you want to delete this advertisement space?"))
      return;

    try {
      const res = await deleteAdSpace(space._id, token);
      if (res.code === 500) {
        setErrorMsg(res.message || "Failed to delete advertisement space");
        return;
      }
      onDeleteSuccess(space._id);
      setSuccessMsg("Advertisement space deleted successfully");
    } catch (error: any) {
      setErrorMsg(
        "Failed to delete advertisement space. Please try again later."
      );
    }
  };

  return (
    <div className="w-full max-h-[160px] shadow-lg mb-2 p-4 bg-white border border-black dark:bg-gray-800">
      {/* Card Header */}
      <h3 className="text-xl text-left font-semibold text-gray-800 dark:text-white truncate">
        {space.name}{" "}
        <span
          className={`text-white text-xs px-3 py-1 rounded-full ${
            space.status === "AVAILABLE" ? "bg-green-600" : "bg-yellow-600"
          }`}
        >
          {space.status}
        </span>
      </h3>
      <p className="text-left text-gray-600 dark:text-gray-300 mt-2 text-sm">
        {space.description}
      </p>

      <div className="flex justify-end mt-4">
        {space.ownerId === userId && (
          <>
            <button
              className="text-black dark:text-white p-2 hover:bg-gray-600 underline transition"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
            <button
              className="text-black dark:text-white p-2 hover:bg-gray-600 underline transition"
              onClick={() => handleEditClick(space)}
            >
              edit
            </button>
          </>
        )}
        <button
          className="text-black dark:text-white p-2 hover:bg-gray-600 underline transition"
          onClick={() => {
            setErrorMsg("Open Discussion Functionality is COMING SOON !!!");
          }}
        >
          Open Discussion
        </button>
        <button
          className="text-black dark:text-white ml-2 p-2 hover:bg-gray-600 border transition"
          onClick={() => {
            if (onViewOnMap) {
              onViewOnMap(space);
            }
          }}
        >
          View on Map
        </button>
      </div>
    </div>
  );
}
