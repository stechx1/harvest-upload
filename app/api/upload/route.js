import connect from '../../../lib/db';
import Strain from '../../../models/Strain';

export const POST = async (request) => {
  await connect();
  const {
    strain,
    harvestDate,
    quantityLBS,
    askingPrice,
    pictures,
    video,
    onOff,
  } = await request.json();

  const newStrainItem = new Strain({
    strain,
    harvestDate,
    quantityLBS,
    askingPrice,
    pictures,
    video,
    onOff,
  });

  try {
    await newStrainItem.save();
    return new Response('Created Product Item', { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
};

export const GET = async () => {
  await connect();
  try {
    const strainItems = await Strain.find();
    return new Response(JSON.stringify(strainItems), { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
};

export const PUT = async (request) => {
  await connect();
  const {
    id,
    strain,
    harvestDate,
    quantityLBS,
    askingPrice,
    pictures,
    video,
    onOff,
  } = await request.json();

  if (!id) {
    return new Response.json({ message: 'Id required' });
  }

  // Assuming you pass an ID in the request
  const strainId = id;

  console.log(strainId);

  try {
    await Strain.findByIdAndUpdate(strainId, {
      strain,
      harvestDate,
      quantityLBS,
      askingPrice,
      pictures,
      video,
      onOff,
    });
    return new Response('Updated Product Item', { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
};

export const DELETE = async (request) => {
  await connect();
  const { id } = await request.json();

  try {
    await Strain.findByIdAndDelete(id);
    return new Response('Deleted Product Item', { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
};
