import { UserButton } from '@stackframe/stack'
import Image from 'next/image'
import React from 'react'

const AppHeader = () => {
  return (
    <div className='p-3 shadow-sm flex justify-between'>
      <Image src={'/new-logo.svg'} alt={'logo'} width={180} height={200} />
      <UserButton/>
    </div>
  )
}

export default AppHeader
