'use client';
import { Upload } from '../components';
import { Navbar } from '../components/Navbar';
import { ImageUpload } from '../components/ImageUpload';
import { Button, Form, Input, InputNumber, DatePicker } from 'antd';

const UploadInventory = () => {
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
                {/* <Upload /> */}
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
              </Form.Item>
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
            </div>
          </div>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UploadInventory;
