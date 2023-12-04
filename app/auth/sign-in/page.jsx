'use client';
import { Button, Form, Input, Select } from 'antd';

import React from 'react';
import Link from 'next/link';

const SignIn = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className=' container mx-auto h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center space-y-10'>
        <h1 className='text-4xl font-bold text-white'>Ganjaland</h1>
        <div className='flex flex-col justify-center items-center rounded-2xl bg-white max-w-lg min-h-[315px] px-20 py-8'>
          <h2 className='font-bold text-lg'>Login to your account</h2>
          <Form
            size='large'
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
            <Form.Item
              style={{
                maxWidth: '100%',
              }}
              name='Farm Name'
              rules={[
                {
                  required: true,
                  message: 'Please input your farm name!',
                },
              ]}
            >
              <Input placeholder='Farm Name' />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type='primary' htmlType='submit'>
                Login
              </Button>
            </Form.Item>
          </Form>

          <Link
            className='text-xs text-primary font-bold'
            href={'/auth/register'}
          >
            Can’t login? . Sign up for new user?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
