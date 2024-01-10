import { CldUploadWidget,getCldImageUrl } from 'next-cloudinary';
import { Button } from 'antd';

export const Upload = () => {
  
  return (
    <CldUploadWidget uploadPreset='ganjaland' htmlType='button'>
      {({ open }) => {
        return (
          <Button htmlType='button' onClick={() => open()}>
            Upload images (5 Max) 
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};
