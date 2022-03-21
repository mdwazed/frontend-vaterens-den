import React from 'react'

import './button.css'

const Button = props => {
    return (
        <button className={`btn btn-${props.color}`} type={props.type} onClick={props.onClick} {...props}>
            {props.content}
        </button>
    )
}

export default Button