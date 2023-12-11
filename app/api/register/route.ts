import User from "../../../models/User";
import connect from "../../../lib/db";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  const { farmName, licenseNo, state, name, phoneNo, password } = await request.json();

  await connect();

  const existingUser = await User.findOne({farmName})

  if(existingUser){
    return new Response("Email is already in use", {status: 400})
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    farmName,
    password: hashedPassword,
    licenseNo,
    state,
    name, 
    phoneNo
  })

  try{
    await newUser.save();
    return new Response("User is required", {status: 200})
  } catch (err){
    return new Response(err, {
      status: 500,
    })
  }
}