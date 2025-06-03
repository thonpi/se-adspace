"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AdSpaceStatusEnum,
  createAdSpace,
} from "@/api-services/advertisement-space";
import { AdvertisementSpace } from "./interfaces";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  userId?: string;
  onSuccess?: () => void; // Optional callback for success
  onError?: (msg: string) => void; // Optional callback for error handling
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  latitude: Yup.number()
    .required("Latitude is required")
    .min(10.407, "Cambodia - Latitude must be greater than 10.407")
    .max(14.69, "Cambodia - Latitude must be less than 14.690"),
  longitude: Yup.number()
    .required("Longitude is required")
    .min(102.348, "Cambodia - Longitude must be greater than 102.348")
    .max(107.627, "Cambodia - Longitude must be less than 106.650"),
  width: Yup.number()
    .required("Width is required")
    .min(0, "Width must be a positive number"),
  height: Yup.number()
    .required("Height is required")
    .min(0, "Height must be a positive number"),
  status: Yup.string()
    .oneOf([
      "INACTIVE",
      "AVAILABLE",
      "UNDER_RENT_MARKET",
      "UNDER_RENT_NEGOTATION",
      "RENTED",
    ])
    .required("Status is required"),
});

export default function CreateAdvertisementModal({
  isOpen,
  onClose,
  token,
  userId = "",
  onSuccess = () => {},
  onError = (msg: string) => {},
}: Props) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      ownerId: userId,
      name: "",
      description: "",
      latitude: 0,
      longitude: 0,
      width: 0,
      height: 0,
      imagePaths: [],
      status: AdSpaceStatusEnum.AVAILABLE,
    } as unknown as AdvertisementSpace,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await createAdSpace({ ...values, ownerId: userId }, token);
        if (res.code === 201) {
          formik.resetForm();
          onClose();
          onSuccess();
        } else {
          onError(res.message || "Failed to create advertisement space");
        }
      } catch (error) {
        onError("Failed to create advertisement space");
      } finally {
        setLoading(false);
      }
    },
  });

  if (!isOpen) return null;

  type AdFormValues = typeof formik.values;
  type Field = Exclude<keyof AdFormValues, "createdAt" | "updatedAt">;

  const fields: [Field, string][] = [
    ["name", "Name"],
    ["description", "Description"],
    ["latitude", "Latitude (Map Coordinate from 10.407 to 14.69)"],
    ["longitude", "Longitude (Map Coordinate from 102.348 to 107.627)"],
    ["width", "Width (meters)"],
    ["height", "Height (meters)"],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-left">Create Space</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {fields.map(([field, label]) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 text-left">
                {label}
              </label>
              <input
                type={
                  ["latitude", "longitude", "width", "height"].includes(field)
                    ? "number"
                    : "text"
                }
                name={field}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field] as string | number}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring focus:ring-indigo-200"
              />
              {formik.touched[field] && formik.errors[field] && (
                <p className="text-sm text-red-500 mt-1 text-right">
                  {formik.errors[field]}
                </p>
              )}
            </div>
          ))}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
