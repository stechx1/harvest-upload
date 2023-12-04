/* eslint-disable @next/next/no-img-element */
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const Navbar = () => {
  return (
    <nav className='flex justify-between py-6'>
      <div className='flex gap-2'>
        <img src='' alt='' />
        <h2 className='text-2xl'>Ganjaland</h2>
      </div>
      <ul className='flex gap-6 items-center'>
        <li>Home</li>
        <li>Inventory</li>
        <Button type='primary' icon={<PlusOutlined />}>
          Upload Inventory
        </Button>
      </ul>
    </nav>
  );
};
