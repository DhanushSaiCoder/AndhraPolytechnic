import React from 'react'
import AICTE from '../../images/Aicte.png'
import NBA from '../../images/NBA.png'

const Accerditations = () => {
  return (
    <div className='Accerditations'>
        <div className='AccerditationsDiv'>
            <div className='AccerditationsImg'>
                <img className='AccerditationsLogo' src={AICTE} alt="Aicte Logo" />
            </div>
            <div className='AccerditationsImg'>
                <img className='AccerditationsLogo' src={NBA} alt="Aicte Logo" />
            </div>
        </div>
    </div>
  )
}

export default Accerditations