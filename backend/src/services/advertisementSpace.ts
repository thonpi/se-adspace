import AdvertisementSpaceModel, {
  IAdvertisementSpace,
} from '../models/advertisementSpace';

const createAdvertisementSpace = async (
  advertisementSpacePayload: IAdvertisementSpace
) => {
  try {
    const advertisementSpace = await AdvertisementSpaceModel.create(
      advertisementSpacePayload
    );
    return { advertisementSpace };
  } catch (error: any) {
    throw new Error(
      `Create advertisement space service error, ${error.message}`
    );
  }
};

const updateAdvertisementSpace = async (
  id: string,
  advertisementSpacePayload: Partial<IAdvertisementSpace>
) => {
  try {
    const space = await findOneOrNotFoundById(id);
    // TODO: put back the validation to open for status update, add more APIs before release
    // if (space.status !== 'AVAILABLE') {
    //   throw new Error('Advertisement space is not free to update');
    // }
    await AdvertisementSpaceModel.updateOne(
      { _id: space._id },
      advertisementSpacePayload
    );
    const updatedAdvertisementSpace = await findOneOrNotFoundById(id);
    return { advertisementSpace: updatedAdvertisementSpace };
  } catch (error: any) {
    throw new Error(
      `Update advertisement space service error, ${error.message}`
    );
  }
};

const deleteAdvertisementSpace = async (id: string) => {
  try {
    const space = await findOneOrNotFoundById(id);
    if (space.status !== 'AVAILABLE') {
      throw new Error('Advertisement space is not free to delete');
    }
    await AdvertisementSpaceModel.updateOne(
      { _id: space._id },
      { status: 'INACTIVE' }
    );
    const deletedSpace = await findOneOrNotFoundById(id);
    return { deletedAdvertisementSpace: deletedSpace };
  } catch (error: any) {
    throw new Error(
      `Delete advertisement space service error, ${error.message}`
    );
  }
};

const getAllAdvertisementSpaces = async (
  params: Pick<AdvertisementSpacePaginationParams, 'search'>
) => {
  try {
    const {
      search: { name, description },
    } = params;
    const advertisementSpaces = await AdvertisementSpaceModel.find({
      $and: [
        { name: { $regex: name, $options: 'i' } },
        { description: { $regex: description, $options: 'i' } },
      ],
    });
    return {
      advertisementSpaces,
    };
  } catch (error: any) {
    throw new Error(
      `Get all advertisement spaces service error, ${error.message}`
    );
  }
};

const advertisementSpacePagination = async (
  params: AdvertisementSpacePaginationParams
) => {
  try {
    const {
      page,
      limit,
      search: { name, description },
    } = params;
    const total = await AdvertisementSpaceModel.countDocuments({
      $and: [
        { name: { $regex: name, $options: 'i' } },
        { description: { $regex: description, $options: 'i' } },
      ],
    });
    const advertisementSpaces = await AdvertisementSpaceModel.find({
      $and: [
        { name: { $regex: name, $options: 'i' } },
        { description: { $regex: description, $options: 'i' } },
      ],
    })
      .skip((page - 1) * limit)
      .limit(limit);
    return {
      advertisementSpaces,
      metaData: {
        page,
        limit,
        total,
      },
    };
  } catch (error: any) {
    throw new Error(
      `Advertisement space pagination service error, ${error.message}`
    );
  }
};

// Below are helper functions

const findOneById = async (id: string) => {
  return await AdvertisementSpaceModel.findById(id);
};

const findOneOrNotFoundById = async (id: string) => {
  const space = await AdvertisementSpaceModel.findById(id);
  if (!space) {
    throw new Error(`Advertisement space with id ${id} not found`);
  }
  return space;
};

// interfaces

interface AdvertisementSpacePaginationParams {
  page: number;
  limit: number;
  search: Partial<Pick<IAdvertisementSpace, 'name' | 'description'>>;
}

const advertisementSpaceService = {
  createAdvertisementSpace,
  updateAdvertisementSpace,
  deleteAdvertisementSpace,
  advertisementSpacePagination,
  getAllAdvertisementSpaces,

  // Helpers
  findOneById,
  findOneOrNotFoundById,
};

export default advertisementSpaceService;
