'use client';
// import { Upload } from '../components';
import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { ImageUpload } from '../components/ImageUpload';
import { message, Upload } from 'antd';
import { Button, Form, Input, InputNumber, DatePicker } from 'antd';

const UploadInventory = () => {
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onFormValuesChange = (changedValues, allValues) => {
    // Update form values when the ImageUpload component changes
    console.log('Changed values:', changedValues);
    console.log('All values:', allValues);
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
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
                name='quantity'
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
                name='quantity'
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
                action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt='avatar'
                    style={{
                      width: '100%',
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
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
                name='date'
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
                name='price'
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
                name='quantity'
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
                action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt='avatar'
                    style={{
                      width: '100%',
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
              </Form.Item>
            </div>
          </div>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button className='mt-12' type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UploadInventory;
