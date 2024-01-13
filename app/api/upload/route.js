import Strain from '../../../models/Strain';
import { v2 as cloudinary } from 'cloudinary';
import cloudinaryConnect from '@/lib/cloudnaryConnect';
import { connect } from '@/lib/db';

import { UploadImage, videoUpload } from '@/lib/uploadimage';
import { NextResponse } from 'next/server';

cloudinaryConnect();
connect();

export async function POST(request) {
  try {
    const data = await request.formData();
    const videoFile = data.get('video');

    const videoUrl = await videoUpload(videoFile);
    if (!videoUrl) {
      return NextResponse.json(
        { message: 'something went wrong' },
        { status: 400 }
      );
    }
    const imageUrls = await UploadImage(data.getAll('pictures[]'));
    console.log('images uri ', data.getAll('pictures'));
    if (!imageUrls) {
      return NextResponse.json(
        { message: 'no image url found ' },
        { status: 400 }
      );
    }
    // Upload the video to Cloudinary and get the URL
    console.log('image urls ', imageUrls);

    // Create a new Strain item with the obtained video URL
    const newStrainItem = new Strain({
      strain: data.get('strain'),
      harvestDate: data.get('harvestDate'),
      quantityLBS: data.get('quantityLBS'),
      askingPrice: data.get('askingPrice'),
      pictures: imageUrls,
      video: videoUrl,
    });

    const savedItem = await newStrainItem.save();
    console.log('Saved Item:', savedItem);

    return NextResponse.json({ data: savedItem }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export const GET = async () => {
  await connect();
  try {
    const strainItems = await Strain.find();
    return new Response(JSON.stringify(strainItems), { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
};

// export const PUT = async (request) => {
//   await connect();
//   const {
//     id,
//     strain,
//     harvestDate,
//     quantityLBS,
//     askingPrice,
//     pictures,
//     video,
//     onOff,
//   } = await request.json();

//   if (!id) {
//     return new Response.json({ message: 'Id required' });
//   }

//   // Assuming you pass an ID in the request
//   const strainId = id;

//   console.log(strainId);

//   try {
//     await Strain.findByIdAndUpdate(strainId, {
//       strain,
//       harvestDate,
//       quantityLBS,
//       askingPrice,
//       pictures,
//       video,
//       onOff,
//     });
//     return new Response('Updated Product Item', { status: 200 });
//   } catch (err) {
//     return new Response(err, { status: 500 });
//   }
// };

// export const DELETE = async (request) => {
//   await connect();
//   const { id } = await request.json();

//   try {
//     await Strain.findByIdAndDelete(id);
//     return new Response('Deleted Product Item', { status: 200 });
//   } catch (err) {
//     return new Response(err, { status: 500 });
//   }
// };
