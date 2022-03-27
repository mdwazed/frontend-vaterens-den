import React from 'react'


const IconButton = props => {
    return (
        <button className={`btn-sm btn-${props.type}`} onClick={props.onClick}>
            <i className={`bx ${props.icon_class}`}/>
        </button>
    )
}

export default IconButton