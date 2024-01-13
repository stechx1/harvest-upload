'use client';
import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';

import { Navbar } from '../app/components';

/* eslint-disable @next/next/no-img-element */
export default function Home() {
  const router = useRouter();
  const [dataSource, setDataSource] = useState([]);

  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus !== 'authenticated') {
      router.replace('/auth/sign-in');
    }
  }, [sessionStatus]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/api/upload'); // replace with your API endpoint
      setDataSource(result.data);
    };

    console.log(dataSource);
    fetchData();
  }, []);

  // const dataSource = [
  //   {
  //     key: '1',
  //     strain: 'Blue Dream',
  //     date: '2023-12-01',
  //     quantity: '10',
  //     price: '$150',
  //     pictures: 'Link to Picture 1',
  //     videos: 'Link to Video 1',
  //     onOff: 'On',
  //   },
  //   {
  //     key: '2',
  //     strain: 'OG Kush',
  //     date: '2023-11-25',
  //     quantity: '8',
  //     price: '$200',
  //     pictures: 'Link to Picture 2',
  //     videos: 'Link to Video 2',
  //     onOff: 'Off',
  //   },
  //   {
  //     key: '3',
  //     strain: 'Girl Scout Cookies',
  //     date: '2023-12-05',
  //     quantity: '12',
  //     price: '$180',
  //     pictures: 'Link to Picture 3',
  //     videos: 'Link to Video 3',
  //     onOff: 'On',
  //   },
  // ];

  const columns = [
    {
      title: 'Product / Strain',
      dataIndex: 'strain',
      key: 'strain',
    },
    {
      title: 'Harvest Date',
      dataIndex: 'harvestDate',
      key: 'harvestDate',
    },
    {
      title: 'Quantity (LBS)',
      dataIndex: 'quantityLBS',
      key: 'quantity',
    },
    {
      title: 'Asking Price (xLBS)',
      dataIndex: 'askingPrice',
      key: 'price',
      render: (text) => `$${text}`,
    },
    {
      title: 'Pictures',
      dataIndex: 'pictures',
      key: 'pictures',
      render: (pictures) => (
        <div>
          {pictures.map((picture, index) => (
            <a
              key={index}
              href={picture}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src={picture}
                alt='preview'
                style={{ width: '60px', height: '60px' }}
              />
            </a>
          ))}
        </div>
      ),
    },
    {
      title: 'Videos',
      dataIndex: 'video',
      key: 'videos',
      render: (videoLink) => <a target='_blank' href={videoLink}>Link to Video</a>
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
