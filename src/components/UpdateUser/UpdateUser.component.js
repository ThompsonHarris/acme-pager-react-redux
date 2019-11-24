import React from 'react'
import './UpdateUser.styles.scss'

//REDUX
import {connect} from 'react-redux'
import {UpdateEmployeesStartAsync} from '../../redux/employees/employee.actions'

class UpdateUser extends React.Component{
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
        this.props.UpdateEmployeesStartAsync(this.props.selected.id,this.state,0)
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            title: ''
        })
    }

    render(){
        return(
            <div class='updateuser'>
                <form onSubmit={this.onHandleSubmit}>
                    <label>{
                        this.props.selected.id === ''? 'NO EMPLOYEE SELECTED' : `SELECTED ID:${this.props.selected.id}`
                    }</label>
                    <input name='firstName' type='text' placeholder={this.props.selected.firstName} value={this.state.firstName} onChange={(e)=>{this.onHandleChange(e)}} required></input>
                    <input name='lastName' type='text' placeholder={this.props.selected.lastName} value={this.state.lastName} onChange={(e)=>{this.onHandleChange(e)}} required></input>
                    <input name='email' type='email' placeholder={this.props.selected.email} value={this.state.email} onChange={(e)=>{this.onHandleChange(e)}} required></input>
                    <input name='title' type='text' placeholder={this.props.selected.title} value={this.state.title} onChange={(e)=>{this.onHandleChange(e)}} required></input>
                    <button>SUBMIT UPDATE</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    UpdateEmployeesStartAsync: (id,data,page)=>dispatch(UpdateEmployeesStartAsync(id,data,page))
})

const mapStateToProps = (state) => ({
    selected: state.employeeDir.selectedEmployee
})

export default connect(mapStateToProps,mapDispatchToProps)(UpdateUser)