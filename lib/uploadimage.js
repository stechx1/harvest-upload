import { Readable } from 'stream';
import { v2 as cloudinary } from 'cloudinary';

export const UploadImage = async (imageFiles) => {
  try {
    const imageUrls = await Promise.all(
      imageFiles.map(async (imageFile) => {
        const stream = Readable.from(imageFile.stream());
        const bufferChunks = [];
        for await (const chunk of stream) {
          bufferChunks.push(chunk);
        }
        const buffer = Buffer.concat(bufferChunks);

        // Convert buffer to base64
        const base64Image = `data:image/jpeg;base64,${buffer.toString(
          'base64'
        )}`;

        // Upload each image to Cloudinary and get the URL
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload(
            base64Image,
            {
              folder: 'images',
            },
            (error, result) => {
              if (error) {
                console.error('Error uploading to Cloudinary:', error);
                reject(error);
              } else {
                console.log('images result ', result);
                resolve(result.secure_url);
              }
            }
          );
        });
      })
    );
    console.log('image url ', imageUrls);
    return imageUrls;
  } catch (error) {
    console.error('Error in UploadImage:', error);
    throw error;
  }
};

export const videoUpload = async (video) => {
  try {
    const stream = Readable.from(video.stream());
    const bufferChunks = [];

    for await (const chunk of stream) {
      bufferChunks.push(chunk);
    }

    const buffer = Buffer.concat(bufferChunks);

    // Convert buffer to base64
    const base64Video = `data:video/mp4;base64,${buffer.toString('base64')}`;

    // Upload the video to Cloudinary and get the URL
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        base64Video,
        {
          resource_type: 'video',
          folder: 'videos',
        },
        (error, result) => {
          if (error) {
            console.error('Error uploading to Cloudinary:', error);
            reject(error);
          } else {
            console.log('video result ', result);
            resolve(result.secure_url);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error in uploading video:', error);
    throw error;
  }
};
