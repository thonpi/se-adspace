import express, { Request, Response } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import isAdmin from '../middlewares/isAdmin';

import userPagination from '../controllers/users/userPagination';
import updateUserProfile from '../controllers/users/updateUserProfile';
import getUserProfile from '../controllers/users/getUserProfile';
import logout from '../controllers/users/logout';
import createAdvertisementSpace from '../controllers/advertisementSpaces/createAdvertisementSpace';
import updateAdvertisementSpace from '../controllers/advertisementSpaces/updateAdvertisementSpace';
import deleteAdvertisementSpace from '../controllers/advertisementSpaces/deleteAdvertisementSpace';
import advertisementSpacePagination from '../controllers/advertisementSpaces/advertisementSpacePagination';
import getAllAdvertisementSpaces from '../controllers/advertisementSpaces/getAllAdvertisementSpaces';
import getAdvertisementSpaceById from '../controllers/advertisementSpaces/getAdvertisementSpaceById';
import createRentalSpace from '../controllers/rentalSpaces/createRentalSpace';
import rentalSpacePagination from '../controllers/rentalSpaces/rentalSpacePagination';
import updateRentalSpace from '../controllers/rentalSpaces/updateRentalSpace';
import deleteRentalSpace from '../controllers/rentalSpaces/deleteRentalSpace';
import getAllRentalSpaces from '../controllers/rentalSpaces/getAllRentalSpaces';
import getRentalSpaceById from '../controllers/rentalSpaces/getRentalSpaceById';
import designJobPagination from '../controllers/designJobs/designJobPagination';
import createDesignJob from '../controllers/designJobs/createDesignJob';
import updateDesignJob from '../controllers/designJobs/updateDesignJob';
import deleteDesignJob from '../controllers/designJobs/deleteDesignJob';
import getDesignJobById from '../controllers/designJobs/getDesignJobById';
import fileService from '../services/file';
import uploadImage from '../controllers/file';
import getAllDesignJobs from '../controllers/designJobs/getAllDesignJobs';

const router = express.Router();
router.use(isAuthenticated as any);

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Advertisement Space!' });
});

// User routes
router.route('/users').get(isAdmin as any, userPagination);
router.route('/user-profile/:id').get(getUserProfile).put(updateUserProfile);
router.route('/auth/logout').post(logout);

// Advertisement space routes
router.route('/get-advertisement-space-by-id').get(getAdvertisementSpaceById);
router
  .route('/advertisement-spaces')
  .get(advertisementSpacePagination)
  .post(createAdvertisementSpace)
  .put(updateAdvertisementSpace)
  .delete(deleteAdvertisementSpace);
router.route('/get-all-advertisement-spaces').get(getAllAdvertisementSpaces);

// Rental space routes
router
  .route('/rental-spaces')
  .get(rentalSpacePagination)
  .post(createRentalSpace)
  .put(updateRentalSpace)
  .delete(deleteRentalSpace);

router.route('/get-all-rental-spaces').get(getAllRentalSpaces);
router.route('/get-rental-space-by-id').get(getRentalSpaceById);

// Design job routes
router
.route('/design-jobs')
.get(designJobPagination)
.post(createDesignJob)
.put(updateDesignJob)
.delete(deleteDesignJob);

router.route('/get-all-design-jobs').get(getAllDesignJobs);
router.route('/get-design-job-by-id').get(getDesignJobById);

// File routes
router
  .route('/files/upload-image')
  .post(fileService.uploadImage.single('file'), uploadImage);

export default router;
