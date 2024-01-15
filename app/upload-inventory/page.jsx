'use client';
// import { Upload } from '../components';
import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Upload } from 'antd';
import { Button, Form, Input, InputNumber, DatePicker, message } from 'antd';
import { X } from 'lucide-react';
import axios from 'axios';

const UploadInventory = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [imageUrl, setImageUrl] = useState([]);
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);
  const [date, setDate] = useState(null);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    messageApi.open({
      type: 'loading',
      content: 'Uploading... This action may take some time to complete.',
      style: { padding: '30px' },
      duration: 0,
    });
    const getImageObj = imageUrl.map((item) => {
      return item.originFileObj;
    });

    const formData = new FormData();
    for (const img of getImageObj) {
      formData.append('pictures[]', img);
    }
    formData.append('video', video);

    formData.append('harvestDate', date);
    formData.append('askingPrice', values.askingPrice);
    formData.append('quantityLBS', values.quantityLBS);
    formData.append('strain', values.strain);
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('response.data ', response.data);
      messageApi.destroy();
      setImageUrl([]);
      setVideo(null);
      setDate(null);
      setLoading(false);
    } catch (error) {
      console.log('error => ', error);
    } finally {
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onDateChange = (date, dateString) => {
    console.log(dateString);
    setDate(dateString);
  };

  const onFormValuesChange = (changedValues, allValues) => {
    // Update form values when the ImageUpload component changes
    console.log('Changed values:', changedValues);
    console.log('All values:', allValues);
  };

  const handleChange = (type, info) => {
    console.log('info ==> ', info);
    if (type == 'picture') {
      const arrayOfImage = Array.from(info.fileList);

      if (arrayOfImage.length > 5) {
        console.log('You are allowed to upload only 5 images.');
      } else {
        // Update the state with the selected files and their previews
        setImageUrl(arrayOfImage);
      }
    } else {
      console.log('video ', info);
      setVideo(info?.file?.originFileObj);
    }
  };

  const beforeUpload = (type, file) => {
    if (type == 'picture') {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');

        return isJpgOrPng && isLt2M;
      }
    }
  };

  const uploadButton = (
    <div>
      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div className='container mx-auto'>
      <Navbar />
      <div className=' container mx-auto my-12'>
        <h1 className='text-center mb-12 text-3xl font-bold'>
          Upload Inventory
        </h1>
        {contextHolder}
        <Form
          layout='vertical'
          name='basic'
          wrapperCol={{
            span: 16,
          }}
          style={{
            paddingTop: '20px',
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <div className='flex justify-between'>
            <div className='flex flex-col space-y-6'>
              <Form.Item
                label='Product / Strain'
                style={{
                  maxWidth: '100%',
                }}
                name='strain'
                rules={[
                  {
                    required: true,
                    message: 'Please input your strain/product!',
                  },
                ]}
              >
                <Input placeholder='Product / Strain' />
              </Form.Item>

              <Form.Item
                label='Quantity (LBS)'
                style={{
                  maxWidth: '100%',
                }}
                name='quantityLBS'
                rules={[
                  {
                    required: true,
                    message: 'Please input your quantity!',
                  },
                ]}
              >
                <InputNumber placeholder='1' />
              </Form.Item>

              <Form.Item
                label='Pictures (5 Max)'
                style={{
                  maxWidth: '100%',
                }}
                name='pictures'
                rules={[
                  {
                    required: true,
                    message: 'Please input your quantity!',
                  },
                ]}
              >
                <Upload
                  name='avatar'
                  listType='picture-card'
                  className='avatar-uploader'
                  showUploadList={false}
                  multiple={true}
                  maxCount={5}
                  accept='image/*'
                  beforeUpload={(e) => beforeUpload('picture', e)}
                  onChange={(e) => handleChange('picture', e)}
                >
                  {uploadButton}
                </Upload>
                {imageUrl.length > 0 &&
                  imageUrl.map((item, index) => (
                    <div
                      key={index}
                      className='w-full  h-12 mb-2 flex items-center justify-between border border-slate-200 rounded p-1'
                    >
                      <img
                        src={URL.createObjectURL(item && item.originFileObj)}
                        alt='avatar'
                        className='w-9 h-full'
                      />
                      <div
                        className='cursor-pointer'
                        onClick={() =>
                          setImageUrl((pre) => pre.filter((img) => img != item))
                        }
                      >
                        <X />
                      </div>
                    </div>
                  ))}
              </Form.Item>

              {/* <Form.Item
                label='Quantity (LBS)'
                style={{
                  maxWidth: '100%',
                }}
                name='quantity'
                rules={[
                  {
                    required: true,
                    message: 'Please input your quantity!',
                  },
                ]}
              >
                <ImageUpload
                  type='image'
                  value={form.fields?.value.map((image) => image.url)}
                  onChange={(url) =>
                    fields.onChange([...fields.value, { url }])
                  }
                  onRemove={(url) =>
                    fields.onChange([
                      ...fields.value.filter((current) => current.url !== url),
                    ])
                  }
                />
              </Form.Item> */}
            </div>

            <div className='flex flex-col space-y-6'>
              <Form.Item
                label='Harvest Date'
                style={{
                  maxWidth: '100%',
                }}
                name='harvestDate'
                rules={[
                  {
                    required: true,
                    message: 'Please input your harvest date!',
                  },
                ]}
              >
                <DatePicker onChange={onDateChange} />
              </Form.Item>

              <Form.Item
                label='Asking Pirce (xLBS)'
                style={{
                  maxWidth: '100%',
                }}
                name='askingPrice'
                rules={[
                  {
                    required: true,
                    message: 'Please input your asking price!',
                  },
                ]}
              >
                <InputNumber placeholder='$ 10' />
              </Form.Item>

              <Form.Item
                label='Video (1 Max)'
                style={{
                  maxWidth: '100%',
                }}
                name='video'
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please input your quantity!',
                //   },
                // ]}
              >
                <Upload
                  name='avatar'
                  listType='picture-card'
                  className='avatar-uploader'
                  showUploadList={false}
                  // beforeUpload={beforeUpload}
                  accept='video/*'
                  onChange={(e) => handleChange('video', e)}
                >
                  {uploadButton}
                </Upload>
                {video && (
                  <div className='w-full h-24 flex relative'>
                    <video controls className='h-full w-full'>
                      <source
                        src={URL.createObjectURL(video)}
                        type='video/mp4'
                      />
                    </video>
                    <div
                      className='cursor-pointer absolute -top-5 -right-3'
                      onClick={() => setVideo(null)}
                    >
                      <X />
                    </div>
                  </div>
                )}
              </Form.Item>
            </div>
          </div>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              loading={loading}
              className='mt-12'
              type='primary'
              disabled={loading ? true : false}
              htmlType='submit'
            >
              {loading ? 'Submitting' : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UploadInventory;
