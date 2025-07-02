import React from 'react'
import AICTE from '../../images/Aicte.png'
import NBA from '../../images/NBA.png'
import '../../styles/AboutUsStyles/Accerditations.css'

const Accerditations = () => {
  return (
    <div className='Accerditations'>
      <h1 className='AccerditationsTitle'>Accerditations</h1>
      <div className='AccerditationsDiv'>
        <div className='AccerditationsImg'>
          <img className='AccerditationsLogo' src={AICTE} alt="Aicte Logo" />
          <p className='Title'>AITCE</p>
        </div>
        <div className='AccerditationsImg'>
          <img className='AccerditationsLogo' src={NBA} alt="Aicte Logo" />
          <p className='Title1'>NBA</p>
        </div>
      </div>
    </div>
  )
}

export default Accerditations