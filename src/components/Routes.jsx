import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Users from '../pages/users/Users'
import CreateUser from "../pages/users/CreateUser";
import UpdateUser from "../pages/users/UpdateUser";
import UserDetail from '../pages/users/UserDetail'
import CV from "../pages/employee/cv/CV";
import CvCreate from "../pages/employee/cv/CvCreate";
import CvUpdate from "../pages/employee/cv/CvUpdate";
import CvDetail from "../pages/employee/cv/CvDetail";
import Education from "../pages/employee/education/Education";
import EducationCreate from "../pages/employee/education/EducationCreate";
import EducationUpdate from "../pages/employee/education/EducationUpdate";


const Routes = () => {
    return (
        <Switch>
            <Route path='/users' exact component={Users}/>
            <Route path='/users/create' component={CreateUser}/>
            <Route path='/users/create' component={CreateUser}/>
            <Route path='/users/:id/update' exact component={UpdateUser}/>
            <Route path='/users/:id/profile' exact component={UserDetail}/>
            <Route path='/users/profile' exact component={UserDetail}/>
            {/* CV */}
            <Route path='/employee/cv' exact component={CV}/>
            <Route path='/employee/cv/create' exact component={CvCreate}/>
            <Route path='/employee/cv/:id/update' exact component={CvUpdate}/>
            <Route path='/employee/cv/:id/detail' exact component={CvDetail}/>
            {/* Education */}
            <Route path='/employee/education' exact component={Education}/>
            <Route path='/employee/education/create' exact component={EducationCreate}/>
            <Route path='/employee/education/:id/update' exact component={EducationUpdate}/>
        </Switch>
    )
}

export default Routes
