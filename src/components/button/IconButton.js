import React from 'react'

import './button.css'

const IconButton = props => {
    return (
        <button className={`btn-sm btn-${props.type}`} onClick={props.onClick}>
            <i className={`bx ${props.icon_class}`}></i>
        </button>
    )
}

export default IconButton