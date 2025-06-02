import { Request, Response } from 'express';

const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    // Return file metadata
    const { filename, path: filePath, mimetype, size } = req.file;

    res.status(200).json({
      message: 'File uploaded successfully!',
      file: {
        filename,
        filePath,
        mimetype,
        size,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export default uploadImage;
