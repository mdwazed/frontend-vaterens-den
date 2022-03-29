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
import Category from "../pages/company/category/Category";
import Company from "../pages/company/company/Company";
import Jobs from "../pages/company/job/Job";
import JobCreate from "../pages/company/job/JobCreate";
import JobUpdate from "../pages/company/job/JobUpdate";
import JobDetail from "../pages/company/job/JobDetail";


const Routes = () => {
    return (
        <Switch>
            <Route path='/users' exact component={Users}/>
            <Route path='/users/create' component={CreateUser}/>
            <Route path='/users/:id/update' exact component={UpdateUser}/>
            <Route path='/users/:id/profile' exact component={UserDetail}/>
            <Route path='/users/profile' exact component={UserDetail}/>
            <Route path='/employer/jobs' exact component={Jobs}/>
            <Route path='/employer/jobs/create' component={JobCreate}/>
            <Route path='/employer/jobs/:id/update' exact component={JobUpdate}/>
            <Route path='/employer/jobs/:id/detail' exact component={JobDetail}/>
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
            <Route path={'/employer/category'} exact component={Category}/>
            <Route path={'/employer/company'} exact component={Company}/>
        </Switch>
    )
}

export default Routes
