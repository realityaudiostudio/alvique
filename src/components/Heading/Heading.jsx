import React from 'react';
import './heading.css';

function Heading({headVal}) {
  return (
    <div>
        <div className="head1">
            <p className='qto-bold'>{headVal}</p>
        </div>
    </div>
  )
}

export default Heading