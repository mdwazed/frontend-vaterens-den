import React from 'react'

import {Link} from 'react-router-dom'

import './sidebar.css'

import sidebar_items from '../../routes/sidebar_routes.json'
import sidebar_employee_menu from '../../routes/sidebar_employee.json'
import sidebar_employer_menu from '../../routes/sidebar_employer.json'

const get_route_list = (pathname) => {
    if (pathname.includes('employee') || pathname.includes('profile')) return  sidebar_employee_menu
    if (pathname.includes('employer') || pathname.includes('company')) return  sidebar_employer_menu
    else return sidebar_items
}

const SidebarItem = props => {

    const active = props.active ? 'active' : ''

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon} />
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const Sidebar = props => {
    const route_list = get_route_list(props.location.pathname)
    const activeItem = route_list.findIndex(item => item.route === props.location.pathname)
    return (
        <div className='sidebar'>
            <Link to={'/'}>
                <div className="sidebar__logo">
                   <h3 className={'text-primary'}>Veterans Dens</h3>
                </div>
            </Link>
            {
                route_list.map((item, index) => (
                    <Link to={item.route} key={index}>
                        <SidebarItem
                            title={item.display_name}
                            icon={item.icon}
                            active={index === activeItem}
                        />
                    </Link>
                ))
            }
        </div>
    )
}

export default Sidebar
