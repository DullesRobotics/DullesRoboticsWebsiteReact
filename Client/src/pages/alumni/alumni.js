import React from 'react'
import Spacer from '../components/spacer'
import Button from '../components/button'
import SectionDivider from '../components/sectiondivider'

const documentList = [
  {
    "name": "Safety Manual",
    "description": "The safety manual outlines the rules and expectations for all team members of 7494 and includes all measures taken by the team to ensure safety.",
    "file_size": "1.75 MB",
    "output_file_name": "safety_manual.pdf",
    "url": "%public%/safety_manual.pdf",
    "is_local": true
  }
]

function Alumni(props) {


  return (
    <div>
      <Spacer className="bg-gray-1" />
      <div className="pt-6 pb-5 bg-gray-4">
        <p className="col-span-2 text-center text-white text-5xl font-bold">Alumni</p>
      </div>
      <div className="pt-4 pb-5 md:grid md:grid-cols-6 lg:grid-cols-4 bg-gray-3">
        <div className="col-span-1" />
        <div className={`col-span-4 lg:col-span-2 divide-y divide-white text-left text-white text-5xl font-bold`}>

          <div />
        </div>
        <div className="col-span-1" />
      </div>
      <div className="bg-gray-3" style={{ 'min-height': '58vh' }}></div>
    </div>
  );
}

export default Alumni;