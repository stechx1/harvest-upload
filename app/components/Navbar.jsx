/* eslint-disable @next/next/no-img-element */
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';



export const Navbar = () => {
  const router = useRouter();

  return (
    <nav className='flex justify-between py-6'>
      <div className='flex gap-2'>
        <img src='' alt='' />
        <a className='cursor-pointer' href='/'>
          <h2 className='text-2xl'>Harvest Upload</h2>
        </a>
      </div>
      <ul className='flex gap-6 items-center'>
        <a href='/'>
          <li>Inventory</li>
        </a>
        <Button onClick={() => router.push("/upload-inventory")} type='primary' icon={<PlusOutlined />}>
          Upload Inventory
        </Button>
        <Button onClick={signOut} type='default'>
          Sign Out
        </Button>
      </ul>
    </nav>
  );
};
