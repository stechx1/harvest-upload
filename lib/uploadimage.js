import {Readable} from 'stream'
import { v2 as cloudinary } from 'cloudinary';

export const UploadImage =async(imageFiles)=>{

    const imageUrls = await Promise.all(
        imageFiles.map(async (imageFile) => {
          const stream = Readable.from(imageFile.stream());
          const bufferChunks = [];
          for await (const chunk of stream) {
            bufferChunks.push(chunk);
          }
          const buffer = Buffer.concat(bufferChunks);
    
          // Upload each image to Cloudinary and get the URL
          return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              {
                folder: 'images',
              },
              (error, result) => {
                if (error) {
                  console.error('Error uploading to Cloudinary:', error);
                  reject(error);
                } else {
                  console.log("images result ",result)
                  resolve(result.secure_url);
                }
              }
            ).end(buffer);
          });
        })
      );
      console.log("image url ",imageUrls)
      return imageUrls
}

export const videoUpload = async (video) => {
    const stream = Readable.from(video.stream());
    const bufferChunks = [];
  
    for await (const chunk of stream) {
      bufferChunks.push(chunk);
    }
  
    const buffer = Buffer.concat(bufferChunks);
  
    try {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: 'video',
            folder: 'video-uploads',
          },
          (error, result) => {
            if (error) {
              console.error('Error uploading to Cloudinary:', error);
              reject(error);
            } else {
             
              resolve(result.secure_url); // Resolve with the uploaded video URL
            }
          }
        ).end(buffer);
      });
  
      return result;
    } catch (error) {
      // Handle any errors that might occur during the upload or promise resolution
      console.error('Error in videoUpload:', error);
      throw error;
    }
  };