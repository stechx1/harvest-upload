'use client';
import { Button, Form, Input, Select } from 'antd';
import InputMask from 'react-input-mask';
import { states } from '../../../data/states';

import React from 'react';
import Link from 'next/link';

const Register = () => {
  const onStateChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onStateSearch = (value) => {
    console.log('search:', value);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <div className=' container mx-auto h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center space-y-10'>
        <h1 className='text-4xl font-bold text-white'>Ganjaland</h1>
        <div className='rounded-2xl bg-white max-w-lg min-h-[515px] px-20 pt-12 pb-3'>
          <h2 className='font-bold text-lg'>Sign Up to create an account</h2>
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
              style={{
                maxWidth: '100%',
              }}
              name='License No'
              rules={[
                {
                  required: true,
                  message: 'Please input your license no!',
                },
              ]}
            >
              <Input placeholder='License No' />
            </Form.Item>

            <Form.Item
              style={{
                maxWidth: '100%',
              }}
              name='State'
              rules={[
                {
                  required: true,
                  message: 'Please input your license no!',
                },
              ]}
            >
              <Select
                showSearch
                placeholder='Select State'
                optionFilterProp='children'
                onChange={onStateChange}
                onSearch={onStateSearch}
                filterOption={filterOption}
                options={states}
              />
            </Form.Item>

            <Form.Item
              style={{
                maxWidth: '100%',
              }}
              name='Name Contact'
              rules={[
                {
                  required: true,
                  message: 'Please input your name contact!',
                },
              ]}
            >
              <Input placeholder='Name Contact' />
            </Form.Item>

            <Form.Item
              style={{
                maxWidth: '100%',
              }}
              name='Phone Contact'
              rules={[
                {
                  required: true,
                  message: 'Please input your name contact!',
                },
              ]}
            >
              <InputMask
                mask='(999) 999-9999'
                maskChar=' '
                placeholder='Enter phone number'
              >
                {(inputProps) => <Input {...inputProps} />}
              </InputMask>
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
                Submit
              </Button>
            </Form.Item>
          </Form>

          <Link className='text-xs text-primary font-bold' href={"/auth/sign-in"}>Already have an Ganjaland account? Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
