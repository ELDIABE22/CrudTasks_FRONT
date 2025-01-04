import React from 'react';
import Navbar from '@/components/Navbar';

type LayoutTaskProps = {
  children: React.ReactNode;
};

const LayoutTask: React.FC<LayoutTaskProps> = ({ children }) => {
  return (
    <section className='container mx-auto min-w-full md:px-20 py-5 space-y-10'>
      <Navbar />
      <main>{children}</main>
    </section>
  );
};

export default LayoutTask;
