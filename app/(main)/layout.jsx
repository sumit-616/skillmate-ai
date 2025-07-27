import React from 'react'
import AppHeader from "@components/custom/AppHeader";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <AppHeader />
      <div className='p-10 mt-20 md:px-12 lg:px-20 xl:px-36 2xl:px-52'>
        {children}
      </div>
    </div>
  )
}


export default DashboardLayout;
