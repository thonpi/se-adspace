import { env } from "../utils/env";

export enum AdSpaceStatusEnum {
  INACTIVE = "INACTIVE",
  AVAILABLE = "AVAILABLE",
  UNDER_RENT_MARKET = "UNDER_RENT_MARKET",
  UNDER_RENT_NEGOTATION = "UNDER_RENT_NEGOTATION",
  RENTED = "RENTED",
}

// Type derived from enum values
export type AdSpaceStatus = `${AdSpaceStatusEnum}`;

export interface IAdvertisementSpace {
  _id: string;
  ownerId: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  width: number;
  height: number;
  imagePaths: string[];
  status: AdSpaceStatus;
  createdAt: Date;
  updatedAt: Date;
}

const BASE_URL = `${env.API_URL}/advertisement-spaces`;
const BASE_URL_ALL = `${env.API_URL}/get-all-advertisement-spaces`;

// Create
export const createAdSpace = async (
  data: Partial<IAdvertisementSpace>,
  token: string
) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Read all
export const getAdSpaces = async () => {
  const res = await fetch(BASE_URL_ALL);
  return res.json();
};

// Delete
export const deleteAdSpace = async (id: string, token: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
