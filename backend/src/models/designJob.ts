import mongoose, { Document, Schema } from 'mongoose';

const DesignJobSchema = new Schema(
  {
    rentalSpaceId: { type: String, required: true },
    budget: { type: Number, required: true },
    requirement: { type: String, required: true },
    visitorIds: [{ type: String, required: false }],
    designerId: { type: String, required: false },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export type IDesignJobStatus =
  | 'INACTIVE'
  | 'UNDER_JOB_MARKET'
  | 'UNDER_JOB_NEGOTATION'
  | 'HIRED'
  | 'FINISHED';

export interface IDesignJob extends Document {
  _id: string;
  rentalSpaceId: string;
  budget: number;
  requirement: string;
  visitorIds: string[];
  designerId: string;
  status: IDesignJobStatus;
  createdAt: Date;
  updatedAt: Date;
}

const DesignJobModel = mongoose.model<IDesignJob>(
  'DesignJob',
  DesignJobSchema
);

export default DesignJobModel;
