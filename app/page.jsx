'use client';
import { Button, Table } from 'antd';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlusOutlined } from '@ant-design/icons';
import { signIn, useSession } from 'next-auth/react';

import { Navbar } from '../app/components';

/* eslint-disable @next/next/no-img-element */
export default function Home() {
  const router = useRouter();

  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus !== 'authenticated') {
      router.replace('/auth/sign-in');
    }
  }, [sessionStatus]);
  const dataSource = [
    {
      key: '1',
      strain: 'Blue Dream',
      date: '2023-12-01',
      quantity: '10',
      price: '$150',
      pictures: 'Link to Picture 1',
      videos: 'Link to Video 1',
      onOff: 'On',
    },
    {
      key: '2',
      strain: 'OG Kush',
      date: '2023-11-25',
      quantity: '8',
      price: '$200',
      pictures: 'Link to Picture 2',
      videos: 'Link to Video 2',
      onOff: 'Off',
    },
    {
      key: '3',
      strain: 'Girl Scout Cookies',
      date: '2023-12-05',
      quantity: '12',
      price: '$180',
      pictures: 'Link to Picture 3',
      videos: 'Link to Video 3',
      onOff: 'On',
    },
  ];

  const columns = [
    {
      title: 'Product / Strain',
      dataIndex: 'strain',
      key: 'strain',
    },
    {
      title: 'Harvest Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Quantity (LBS)',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Asking Price (xLBS)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Pictures',
      dataIndex: 'pictures',
      key: 'pictures',
    },
    {
      title: 'Videos',
      dataIndex: 'videos',
      key: 'videos',
    },
    {
      title: 'On/Off',
      dataIndex: 'videos',
      key: 'videos',
    },
  ];

  return (
    <div className='container mx-auto'>
      <Navbar />
      <main className='my-12'>
        <h1 className='text-center mb-12 text-3xl font-bold'>Inventory</h1>
        <Table dataSource={dataSource} columns={columns} />
      </main>
    </div>
  );
}
