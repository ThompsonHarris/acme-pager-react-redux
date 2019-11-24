import React from 'react'
import './AddUser.styles.scss'

//redux
import {connect} from 'react-redux'
import {CreateEmployeesStartAsync} from '../../redux/employees/employee.actions'

class AddUser extends React.Component{
    constructor(props){
        super(props)
        this.state={
            firstName: '',
            lastName: '',
            email: '',
            title: ''
        }
    }

    onHandleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
          })
    }

    onHandleSubmit = (e) => {
        e.preventDefault()
        this.props.CreateEmployeesStartAsync(this.state,0)
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            title: ''
        })
    }

    render(){
        return(
            <div class='adduser'>
                <form onSubmit={this.onHandleSubmit}>
                    <label>CREATE NEW EMPLOYEE :</label>
                    <input name='firstName' type='text' placeholder='first name' value={this.state.firstName} onChange={(e)=>{this.onHandleChange(e)}} required></input>
                    <input name='lastName' type='text' placeholder='last name' value={this.state.lastName} onChange={(e)=>{this.onHandleChange(e)}} required></input>
                    <input name='email' type='email' placeholder='email' value={this.state.email} onChange={(e)=>{this.onHandleChange(e)}} required></input>
                    <input name='title' type='text' placeholder='title' value={this.state.title} onChange={(e)=>{this.onHandleChange(e)}} required></input>
                    <button>CREATE</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    CreateEmployeesStartAsync: (data,page) => dispatch(CreateEmployeesStartAsync(data,page))
})

export default connect(null,mapDispatchToProps)(AddUser)