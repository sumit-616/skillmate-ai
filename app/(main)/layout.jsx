import React from 'react'
import AppHeader from './_components/AppHeader';

const DashboardLayout = ({children}) => {
  return (
    <div>
      <AppHeader />
      <div className='p-10 mt-10 md:px-15 lg:px-24 xl:px-44 2xl:px-64'>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout;