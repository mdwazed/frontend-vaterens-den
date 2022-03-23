import React from 'react'

import {Route, Switch} from 'react-router-dom'

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
import Experience from "../pages/employee/experience/Experience";
import ExperienceCreate from "../pages/employee/experience/ExperienceCreate";
import ExperienceUpdate from "../pages/employee/experience/ExperienceUpdate";
import Skill from "../pages/employee/skill/Skill";
import SkillCreate from "../pages/employee/skill/SkillCreate";
import SkillUpdate from "../pages/employee/skill/SkillUpdate";
import Training from "../pages/employee/training/Training";
import TrainingCreate from "../pages/employee/training/TrainingCreate";
import TrainingUpdate from "../pages/employee/training/TrainingUpdate";
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
            <Route path='/employee/cv/create' exact component={CvCreate}/>
            <Route path='/employee/cv/:id/update' exact component={CvUpdate}/>
            <Route path='/employee/cv/:id/detail' exact component={CvDetail}/>
            {/* Education */}
            <Route path='/employee/education' exact component={Education}/>
            <Route path='/employee/education/create' exact component={EducationCreate}/>
            <Route path='/employee/education/:id/update' exact component={EducationUpdate}/>
            {/*  Experience  */}
            <Route path='/employee/experience' exact component={Experience}/>
            <Route path='/employee/experience/create' exact component={ExperienceCreate}/>
            <Route path='/employee/experience/:id/update' exact component={ExperienceUpdate}/>
            {/*  Skill  */}
            <Route path='/employee/skill' exact component={Skill}/>
            <Route path='/employee/skill/create' exact component={SkillCreate}/>
            <Route path='/employee/skill/:id/update' exact component={SkillUpdate}/>
            {/*  Training  */}
            <Route path='/employee/training' exact component={Training}/>
            <Route path='/employee/training/create' exact component={TrainingCreate}/>
            <Route path='/employee/training/:id/update' exact component={TrainingUpdate}/>
            {/* Award */}
            <Route path={'/employee/award'} exact component={Award}/>
            <Route path={'/employee/arm-service'} exact component={ArmService}/>
        </Switch>
    )
}

export default Routes
