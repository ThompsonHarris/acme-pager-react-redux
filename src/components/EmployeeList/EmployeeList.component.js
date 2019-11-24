import React from 'react'
import './EmployeeList.styles.scss'

//redux
import {connect} from 'react-redux'
import {fetchEmployeesStartAsync,DeleteEmployeesStartAsync,selectEmployeesAsync} from '../../redux/employees/employee.actions'



class EmployeeList extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchEmployeesStartAsync(Number(this.props.id.pageID)) 
    }

    componentWillReceiveProps(nextProps){
        if(Number(nextProps.id.pageID)===Number(this.props.id.pageID)){
            null
        } else {
            this.props.fetchEmployeesStartAsync(Number(nextProps.id.pageID)) 
        }
    }

    selectForUpdate=(e)=>{
        let selected = e.target.parentNode.id   
        this.props.selectEmployeesAsync(selected)
    }

    render(){
        
        return(
            <div class="employeelist">
            <ul>
            {
                this.props.employees.map(({id,firstName,lastName,email,title})=>{
                    return(
                       <li key={id} id={id}>
                            <span>{firstName}</span> 
                            <span>{lastName}</span> 
                            <span>{email}</span> 
                            <span>{title}</span> 
                            <span class='clickable delete' onClick={()=>{
                                this.props.DeleteEmployeesStartAsync(id,Number(this.props.id.pageID))
                            }}>delete</span>
                            <span class='clickable update' onClick={(e)=>{
                                this.selectForUpdate(e)
                            }}>
                            select
                            </span>
                        </li>
                    )
                })
            }
            </ul>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchEmployeesStartAsync: data => dispatch(fetchEmployeesStartAsync(data)),   
    DeleteEmployeesStartAsync: (id,page) => dispatch(DeleteEmployeesStartAsync(id,page)),
    selectEmployeesAsync: id => dispatch(selectEmployeesAsync(id))  
})

const mapStateToProps = (state) => ({
    employees: state.employeeDir.employees
})

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeList)