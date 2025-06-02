import DesignJobModel, { IDesignJob } from '../models/designJob';
import rentalSpaceService from './rentalSpace';

const createDesignJob = async (designJobPayload: IDesignJob) => {
  try {
    const rentalSpace = await rentalSpaceService.findOneOrNotFoundById(
      designJobPayload.rentalSpaceId
    );
    if (rentalSpace.status !== 'RENTED') {
      throw new Error('Rental space is not free to create design job');
    }
    const designJob = await DesignJobModel.create(designJobPayload);
    return { designJob };
  } catch (error: any) {
    throw new Error(`Create design job service error, ${error.message}`);
  }
};

const updateDesignJob = async (
  id: string,
  designJobPayload: Partial<IDesignJob>
) => {
  try {
    const job = await findOneOrNotFoundById(id);

    // TODO: put back the validation to open for status update, add more APIs before release
    // if (job.status !== 'UNDER_JOB_MARKET') {
    //   throw new Error('Design job is not free to update');
    // }
    // if (
    //   designJobPayload.rentalSpaceId &&
    //   job.rentalSpaceId !== designJobPayload.rentalSpaceId
    // ) {
    //   const rentalSpace = await rentalSpaceService.findOneOrNotFoundById(
    //     designJobPayload.rentalSpaceId
    //   );
    //   if (rentalSpace.status !== 'RENTED') {
    //     throw new Error('Rental space is not free to create design job');
    //   }
    // }
    await DesignJobModel.updateOne({ _id: job._id }, designJobPayload);
    const updatedDesignJob = await findOneOrNotFoundById(id);
    return { designJob: updatedDesignJob };
  } catch (error: any) {
    throw new Error(`Update design job service error, ${error.message}`);
  }
};

const deleteDesignJob = async (id: string) => {
  try {
    const job = await findOneOrNotFoundById(id);
    if (job.status !== 'UNDER_JOB_MARKET') {
      throw new Error('Design job is not free to delete');
    }
    await DesignJobModel.updateOne({ _id: job._id }, { status: 'INACTIVE' });
    const deletedDesignJob = await findOneOrNotFoundById(id);
    return { designJob: deletedDesignJob };
  } catch (error: any) {
    throw new Error(`Delete design job service error, ${error.message}`);
  }
};

const getAllDesignJobs = async () => {
  try {
    const designJobs = await DesignJobModel.find();
    return {
      designJobs,
    };
  } catch (error: any) {
    throw new Error(`Get all design jobs service error, ${error.message}`);
  }
};

const designJobPagination = async (params: DesignJobPaginationParams) => {
  try {
    const { page, limit } = params;
    const total = await DesignJobModel.countDocuments();
    const DesignJobs = await DesignJobModel.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return {
      DesignJobs,
      metaData: {
        page,
        limit,
        total,
      },
    };
  } catch (error: any) {
    throw new Error(`Design job pagination service error, ${error.message}`);
  }
};

// Below are helper functions

const findOneById = async (id: string) => {
  return await DesignJobModel.findById(id);
};

const findOneOrNotFoundById = async (id: string) => {
  const space = await DesignJobModel.findById(id);
  if (!space) {
    throw new Error(`Rental space with id ${id} not found`);
  }
  return space;
};

// interfaces

interface DesignJobPaginationParams {
  page: number;
  limit: number;
}

const designJobService = {
  createDesignJob,
  updateDesignJob,
  deleteDesignJob,
  designJobPagination,
  getAllDesignJobs,

  // Helpers
  findOneById,
  findOneOrNotFoundById,
};

export default designJobService;
