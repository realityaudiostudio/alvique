import React from 'react';
import './mainbut.css';

const MainBut = ({ButVal}) => {
  return (
    <div>
      <div className='velyabut'>
        <button className='qto-regular'>{ButVal}</button>
      </div>
    </div>
  )
}

export default MainBut
