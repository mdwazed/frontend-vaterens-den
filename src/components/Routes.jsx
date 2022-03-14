import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Users from '../pages/users/Users'
import CreateUser from "../pages/users/CreateUser";
import UpdateUser from "../pages/users/UpdateUser";
import UserDetail from '../pages/users/UserDetail'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/users' exact component={Users}/>
            <Route path='/users/create' component={CreateUser}/>
            <Route path='/users/:id/update' exact component={UpdateUser}/>
            <Route path='/users/:id/profile' exact component={UserDetail}/>
        </Switch>
    )
}

export default Routes
