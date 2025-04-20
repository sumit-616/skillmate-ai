"use client";
import { Button } from '@/components/ui/button';
import { CoachingOptions } from '@/services/Options';
import { useUser } from '@stackframe/stack';
import Image from 'next/image';
import React from 'react'

const FeatureAssistants = () => {
  const user = useUser();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='font-medium text-gray-500'>My Workspace</h2>
          <h2 className='text-3xl font-bold'>Welcome back, {user?.displayName}</h2>
        </div>
        <Button>Profile</Button>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-10 mt-10'>
        {CoachingOptions.map((option,index)=>(
          <div key={index} className='p-3 bg-secondary rounded-3xl flex flex-col justify-center items-center'>
            <Image src={option.icon} alt={option.name}
              width={150}
              height={150}
              className='h-[70px] w-[70px] hover:rotate-12 cursor-pointer tarnsition-all'
            />
            <h2 className='mt-2'>{option.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureAssistants;
