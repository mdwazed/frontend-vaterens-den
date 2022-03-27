import React from 'react'


const Button = props => {
    return (
        <button className={`btn btn-${props.color}`} type={props.type} onClick={props.onClick} {...props}>
            {props.content}
        </button>
    )
}

export default Button