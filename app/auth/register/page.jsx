"use client"
import { Button, Form, Input } from 'antd';

import React from 'react';

const Register = () => {
  return (
    <div className=' container mx-auto h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center space-y-10'>
        <h1 className='text-4xl font-bold text-white'>Ganjaland</h1>
        <div className='rounded-2xl bg-white max-w-lg min-h-[515px] px-20 py-12'>
          <h2 className='font-bold text-lg'>Sign Up to create an account</h2>
          <Form
            name='basic'
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item
              label='Username'
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

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
    </div>
  );
};

export default Register;
