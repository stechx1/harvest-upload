import { connect, isDbConneted } from '@/lib/db';
import User from '../../../models/User';

connect();
console.log('is db connected ', isDbConneted());
export const POST = async (request) => {
  const { email, farmName, licenseNo, state, name, phoneNo, password } =
    await request.json();

  const existingUser = await User.findOne({ farmName });

  if (existingUser) {
    return new Response('User is already in use', { status: 400 });
  }

  const newUser = new User({
    farmName,
    email,
    password,
    licenseNo,
    state,
    name,
    phoneNo,
  });

  try {
    await newUser.save();
    return new Response('Created User', { status: 200 });
  } catch (err) {
    return new Response(err, {
      status: 500,
    });
  }
};
