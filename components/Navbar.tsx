import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';

const Navbar: NextPage = () => {
  return (
    <nav className='nav'>
      <div className='navbar'>
        <Link href='/' className='logo'>
          assistant
        </Link>
        <Link href='/todo'>Todo</Link>
      </div>
    </nav>
  );
};

export default Navbar;
