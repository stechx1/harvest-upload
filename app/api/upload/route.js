import Strain from '../../../models/Strain';
import { v2 as cloudinary } from 'cloudinary';
import cloudinaryConnect from '@/lib/cloudnaryConnect';
import { connect, isDbConneted } from '@/lib/db';

import { UploadImage, videoUpload } from '@/lib/uploadimage';
import { NextResponse } from 'next/server';
import {getServerSession,} from 'next-auth'
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


cloudinaryConnect();
connect();
console.log("sDbConneted() ",isDbConneted())


export async function POST(req,res) {
 
  const session = await getServerSession(authOptions);
  
  if(!isDbConneted()){
    return NextResponse.json({message:'Please connect your mongo db instance'},{status:400})
 }
 
  try {
    const data = await req.formData();
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
      user:session?.sub
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
  const session = await getServerSession(authOptions);
  try {
    const strainItems = await Strain.find({user:session?.sub}).populate('user').exec();
    console.log("strain item ",strainItems)
    return NextResponse.json({strainItems}, { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
};

// export const PUT = async (req) => {
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
//   } = await req.json();

//   if (!id) {
//     return new Response.json({ message: 'Id required' });
//   }

//   // Assuming you pass an ID in the req
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

export const DELETE = async (req) => {
  await connect();
  const { id } = await req.json();

  try {
    await Strain.findByIdAndDelete(id);
    return new Response('Deleted Product Item', { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
}
