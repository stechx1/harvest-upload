import { v2 as cloudnary } from "cloudinary";

const cloudnaryConnect =()=>{

    cloudnary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret:process.env.NEXT_PUBLIC_API_SECRET,
      });
}

export default cloudnaryConnect