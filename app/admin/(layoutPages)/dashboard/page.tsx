import BentoGrid from '@/components/admin/bentoGrid';
import Hero from '@/components/admin/hero';
import Navbar from '@/components/admin/sidebar';
import React from 'react';

const Page = () => {
    return (
        <div className='bg-[#F1F5F9]  md:min-h-screen'>
            <Hero/>
            <BentoGrid/>
        </div>
    );
}

export default Page;                                        
