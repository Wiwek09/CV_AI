import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

const Header = () => {
  return (
    <div>
      <Card className='flex justify-between  items-center h-14 p-3'>
        <div>
          <Image
            className='object-cover h-10 w-12 rounded-3xl '
            src={'/assets/8008657.jpg'}
            alt='Logo'
            height={50}
            width={50}
          />
        </div>
        <div>test@gmail.com</div>
      </Card>
    </div>
  );
};

export default Header;
