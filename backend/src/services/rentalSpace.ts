import RentalSpaceModel, { IRentalSpace } from '../models/rentalSpace';
import advertisementSpaceService from './advertisementSpace';

const createRentalSpace = async (rentalSpacePayload: IRentalSpace) => {
  try {
    const space = await advertisementSpaceService.findOneOrNotFoundById(
      rentalSpacePayload.spaceId
    );
    if (space.status !== 'AVAILABLE') {
      throw new Error('Advertisement space is not free to create rental space');
    }
    const rentalSpace = await RentalSpaceModel.create(rentalSpacePayload);
    await advertisementSpaceService.updateAdvertisementSpace(
      rentalSpacePayload.spaceId,
      { status: 'UNDER_RENT_MARKET' }
    );
    return { rentalSpace };
  } catch (error: any) {
    throw new Error(`Create rental space service error, ${error.message}`);
  }
};

const updateRentalSpace = async (
  id: string,
  rentalSpacePayload: Partial<IRentalSpace>
) => {
  try {
    const space = await findOneOrNotFoundById(id);

    // TODO: put back the validation to open for status update, add more APIs before release
    // if (space.status !== 'UNDER_RENT_MARKET') {
    //   throw new Error('Rental space is not free to update');
    // }
    // if (
    //   rentalSpacePayload.spaceId &&
    //   space.spaceId !== rentalSpacePayload.spaceId
    // ) {
    //   const space = await advertisementSpaceService.findOneOrNotFoundById(
    //     rentalSpacePayload.spaceId
    //   );
    //   if (space.status !== 'AVAILABLE') {
    //     throw new Error(
    //       'Advertisement space is not free to create rental space'
    //     );
    //   }
    // }
    await RentalSpaceModel.updateOne({ _id: space._id }, rentalSpacePayload);
    const updatedRentalSpace = await findOneOrNotFoundById(id);
    return { rentalSpace: updatedRentalSpace };
  } catch (error: any) {
    throw new Error(`Update rental space service error, ${error.message}`);
  }
};

const deleteRentalSpace = async (id: string) => {
  try {
    const space = await findOneOrNotFoundById(id);
    if (space.status !== 'UNDER_RENT_MARKET') {
      throw new Error('Rental space is not free to delete');
    }
    await RentalSpaceModel.updateOne(
      { _id: space._id },
      { status: 'INACTIVE' }
    );
    const deletedSpace = await findOneOrNotFoundById(id);
    return { deletedRentalSpace: deletedSpace };
  } catch (error: any) {
    throw new Error(`Delete rental space service error, ${error.message}`);
  }
};

const getAllRentalSpaces = async () => {
  try {
    const rentalSpaces = await RentalSpaceModel.find();
    return {
      rentalSpaces,
    };
  } catch (error: any) {
    throw new Error(`Get all rental spaces service error, ${error.message}`);
  }
};

const rentalSpacePagination = async (params: RentalSpacePaginationParams) => {
  try {
    const { page, limit } = params;
    const total = await RentalSpaceModel.countDocuments();
    const rentalSpaces = await RentalSpaceModel.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return {
      rentalSpaces,
      metaData: {
        page,
        limit,
        total,
      },
    };
  } catch (error: any) {
    throw new Error(`Rental space pagination service error, ${error.message}`);
  }
};

// Below are helper functions

const findOneById = async (id: string) => {
  return await RentalSpaceModel.findById(id);
};

const findOneOrNotFoundById = async (id: string) => {
  const space = await RentalSpaceModel.findById(id);
  if (!space) {
    throw new Error(`Rental space with id ${id} not found`);
  }
  return space;
};

// interfaces

interface RentalSpacePaginationParams {
  page: number;
  limit: number;
}

const rentalSpaceService = {
  createRentalSpace,
  updateRentalSpace,
  deleteRentalSpace,
  rentalSpacePagination,
  getAllRentalSpaces,

  // Helpers
  findOneById,
  findOneOrNotFoundById,
};

export default rentalSpaceService;
