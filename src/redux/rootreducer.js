import {combineReducers} from 'redux'
//reducer
import employeeReducer from './employees/employee.reducer'

const rootReducer = combineReducers({
    employeeDir: employeeReducer
})

export default rootReducer