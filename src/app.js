import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import './app.styles.css'

//components
import Navigation from './components/Navigation/Navigation.component'
import EmployeeList from './components/EmployeeList/EmployeeList.component'
import AddUser from './components/AddUser/AddUser.component'
import UpdateUser from './components/UpdateUser/UpdateUser.component'

class App extends React.Component{
    
    render(){
        return(
            <div class='container'>
                <Route render={()=><Navigation/>}/>
                <Route render={()=><AddUser/>}/>
                <Route render={()=><UpdateUser/>}/>
                <switch>
                    <Route exact path='/page/:pageID' render={({match})=><EmployeeList id={match.params}/>}/>
                    <Redirect to='/page/0'/>
                </switch>
            </div>
        )
    }
}

export default App