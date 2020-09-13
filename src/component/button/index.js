import React from 'react';
import './button.scss';

const Button = ({ buttonText, emitEvent }) => {
  const submitEvent = () => emitEvent && emitEvent()
  
  return <button onClick={submitEvent} className='button' data-test='buttonComponent'>{buttonText}</button>
}

export default Button
