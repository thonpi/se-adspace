import mongoose, { Document, Schema } from 'mongoose';

const AdvertisementSpaceSchema = new Schema(
  {
    ownerId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    latitude: {
      type: Number,
      required: true,
      validate: {
        validator: (val: number) => /^-?\d+(\.\d{1,10})?$/.test(val.toString()),
        message: 'Latitude must have up to 10 decimal places',
      },
    },
    longitude: {
      type: Number,
      required: true,
      validate: {
        validator: (val: number) => /^-?\d+(\.\d{1,10})?$/.test(val.toString()),
        message: 'Latitude must have up to 10 decimal places',
      },
    },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    imagePaths: [{ type: String, required: false }],
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export type IAdvertisementSpaceStatus =
  | 'INACTIVE'
  | 'AVAILABLE'
  | 'UNDER_RENT_MARKET'
  | 'RENTED';

export interface IAdvertisementSpace extends Document {
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

const AdvertisementSpaceModel = mongoose.model<IAdvertisementSpace>(
  'AdvertisementSpace',
  AdvertisementSpaceSchema
);

export default AdvertisementSpaceModel;
