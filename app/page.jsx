'use client';
import { Switch, Table, Button, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';

import { Navbar } from '../app/components';

/* eslint-disable @next/next/no-img-element */
export default function Home() {
  const router = useRouter();
  const [dataSource, setDataSource] = useState([]);

  const { data: session, status: sessionStatus } = useSession();
  console.log("data ",session)
  console.log("session status ",sessionStatus)
  useEffect(() => {
    if (sessionStatus !== 'authenticated') {
      router.replace('/auth/sign-in');
    }
  }, [sessionStatus]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/upload'); // replace with your API endpoint
      console.log("result ",result)
      setDataSource(result.data.strainItems);
    };

    console.log(dataSource);
    fetchData();
  }, []);

  const handleDelete = async (record) => {
    try {
      await axios.request({
        method: 'delete',
        url: '/api/upload',
        data: {
          id: record._id,
        },
      });
      const newDataSource = dataSource.filter(
        (item) => item._id !== record._id
      );

      setDataSource(newDataSource);
      console.log(`Record with key ${record.key} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete record with key ${record.key}: ${error}`);
    }
  };

  // const handleSwitchChange = (checked, key) => {
  //   // Update your data here based on the new switch value and the row key
  //   console.log(key);
  //   console.log(`Switch for key ${key} is now ${checked ? 'On' : 'Off'}`);
  // };

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
      render: (videoLink) => (
        <a target='_blank' href={videoLink}>
          Link to Video
        </a>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title={`Delete the strain ${record.strain}`}
          description={`Are you sure you want to delete the strain ${record.strain}`}
          onConfirm={() => handleDelete(record)}
          okText='Yes'
          cancelText='No'
        >
          <Button danger shape='circle' icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
    // {
    //   title: 'On/Off',
    //   dataIndex: 'onOff',
    //   key: 'onOff',
    //   render: (onOff, record) => (
    //     <Switch
    //       checked={onOff}
    //       onChange={(checked) => handleSwitchChange(checked, record)}
    //     />
    //   ),
    // },
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
