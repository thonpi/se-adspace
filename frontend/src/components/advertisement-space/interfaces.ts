export type IAdvertisementSpaceStatus =
  | "INACTIVE"
  | "AVAILABLE"
  | "UNDER_RENT_MARKET"
  | "RENTED";

export interface AdvertisementSpace {
  _id: string;
  ownerId: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  width: number;
  height: number;
  imagePaths: string[];
  status: IAdvertisementSpaceStatus;
  createdAt: Date;
  updatedAt: Date;
}
