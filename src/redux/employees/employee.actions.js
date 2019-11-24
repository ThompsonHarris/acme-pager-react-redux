import employeeActionTypes from './employee.types'
import axios from 'axios'

export const fetchEmployees = () => ({
    type: employeeActionTypes.FETCH_EMPLOYEES
})

export const fetchEmployeesSuccess = (employees) => ({
    type: employeeActionTypes.FETCH_EMPLOYEES_SUCCESS,
    payload: employees
})

export const fetchEmployeesFailure = (errorMessage) => ({
    type: employeeActionTypes.FETCH_EMPLOYEES_FAILURE,
    payload: errorMessage
})

export const fetchEmployeesStartAsync = (page) => {
    return dispatch => {
        dispatch(fetchEmployees())
        axios.get(`/api/employees/${page}`)
        .then(res=>dispatch(fetchEmployeesSuccess(res.data)))
        .catch(error => dispatch(fetchEmployeesFailure(error.message)))
    }
  }

export const DeleteEmployeesStartAsync = (id,page) => {
    return dispatch => {
        axios.delete(`/api/employees/${id}`)
        .then(() => dispatch(fetchEmployeesStartAsync(page)))
    }
}

export const CreateEmployeesStartAsync = (data,page) => {
    return dispatch => {
        axios.post(`/api/employees`,data)
        .then(() => dispatch(fetchEmployeesStartAsync(page)))
    }
}

export const UpdateEmployeesStartAsync = (id,data,page) => {
    return dispatch => {
        axios.put(`/api/employees/${id}`,data)
        .then(() => dispatch(fetchEmployeesStartAsync(page)))
    }
}

export const selectEmployeesSuccess = (employee) => ({
    type: employeeActionTypes.SELECT_EMPLOYEE_UPDATE,
    payload: employee
})

export const selectEmployeesAsync = (id) => {
    return dispatch => {
        axios.get(`/api/${id}`)
        .then(res=>dispatch(selectEmployeesSuccess(res.data)))
    }
}
