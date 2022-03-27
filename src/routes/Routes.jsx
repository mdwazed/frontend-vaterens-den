import React from 'react'

import {Route, Switch} from 'react-router-dom'

import Users from '../pages/users/Users'
import CreateUser from "../pages/users/CreateUser";
import UpdateUser from "../pages/users/UpdateUser";
import UserDetail from '../pages/users/UserDetail'
import CV from "../pages/employee/cv/CV";
import Education from "../pages/employee/education/Education";
import Experience from "../pages/employee/experience/Experience";
import Skill from "../pages/employee/skill/Skill";
import Training from "../pages/employee/training/Training";
import Award from "../pages/employee/award/Award";
import ArmService from "../pages/employee/arm-service/ArmService";


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
            {/* Education */}
            <Route path='/employee/education' exact component={Education}/>
            {/*  Experience  */}
            <Route path='/employee/experience' exact component={Experience}/>
            {/*  Skill  */}
            <Route path='/employee/skill' exact component={Skill}/>
            {/*  Training  */}
            <Route path='/employee/training' exact component={Training}/>
            {/* Award */}
            <Route path={'/employee/award'} exact component={Award}/>
            <Route path={'/employee/arm-service'} exact component={ArmService}/>
        </Switch>
    )
}

export default Routes
