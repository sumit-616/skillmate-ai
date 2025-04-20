import React from 'react'
import FeatureAssitants from './_components/FeatureAssistants';
import History from './_components/History';
import Feedback from './_components/Feedback';

const Dashboard = () => {
  return (
    <div>
      <FeatureAssitants/>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-20'>
        <History/>
        <Feedback/>
      </div>
    </div>
  )
}

export default Dashboard;
