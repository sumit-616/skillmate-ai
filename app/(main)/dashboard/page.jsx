import FeatureAssistant from '@components/custom/FeatureAssistant'
import Feedback from '@components/custom/Feedback'
import History from '@components/custom/History'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <FeatureAssistant/>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-20'>
        <History/>
        <Feedback/>
      </div>
    </div>
  )
}

export default Dashboard;
