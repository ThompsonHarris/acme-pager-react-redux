import employeeActionTypes from './employee.types'

const INITIAL_STATE = []

const employeeReducer = (state=INITIAL_STATE,action) => {
    switch(action.type){
        case(employeeActionTypes.SELECT_EMPLOYEE_UPDATE):
        return {
            ...state,
            selectedEmployee:action.payload
        }
        case(employeeActionTypes.FETCH_EMPLOYEES):
        return {
            ...state,
            isFetching:true
        }
        case(employeeActionTypes.FETCH_EMPLOYEES_SUCCESS):
        return {
            ...state,
            isFetching:false,
            employees:action.payload.rows,
            count:action.payload.count
        }
        case(employeeActionTypes.FETCH_EMPLOYEES_FAILURE):
        return {
            ...state,
            isFetching:false,
            errorMessage:action.payload
        }
        default:
            return{
                ...state,
                employees: [], 
                selectedEmployee: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    title: ''
                }
    }
}
}

export default employeeReducer