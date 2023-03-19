import React from 'react'

import './style.css'

const RadioButton = ({title, notes, selectedValue, handleChange}) => {
  return (
    <div className='radioOptions'>
        <div>
            <input type="radio" 
            checked={selectedValue === 'all'}
            onChange={e => handleChange(e.target)}
            value="all"
            />
            <span>Todos</span>
        </div>
        <div>
            <input type="radio" 
            checked={selectedValue === 'true'}
            onChange={e => handleChange(e.target)}
            value="true"
            />
            <span>Prioridade</span>
        </div>
        <div>
            <input type="radio" 
            checked={selectedValue === 'false'}
            onChange={e => handleChange(e.target)}
            value="false"
            />
            <span>Normal</span>
        </div>
    </div>
  )
}

export default RadioButton