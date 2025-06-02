import mongoose, { Document, Schema } from 'mongoose';

const RentalSpaceSchema = new Schema(
  {
    spaceId: { type: String, required: true },
    monthlyPrice: { type: Number, required: true },
    yearlyPrice: { type: Number, required: true },
    visitorIds: [{ type: String, required: false }],
    customerId: { type: String, required: false },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export type IRentalSpaceStatus =
  | 'INACTIVE'
  | 'UNDER_RENT_MARKET'
  | 'UNDER_RENT_NEGOTATION'
  | 'RENTED'
  | 'EXPIRED';

export interface IRentalSpace extends Document {
  _id: string;
  spaceId: string;
  monthlyPrice: number;
  yearlyPrice: number;
  visitorIds: string[];
  customerId: string;
  status: IRentalSpaceStatus;
  createdAt: Date;
  updatedAt: Date;
}

const RentalSpaceModel = mongoose.model<IRentalSpace>(
  'RentalSpace',
  RentalSpaceSchema
);

export default RentalSpaceModel;
