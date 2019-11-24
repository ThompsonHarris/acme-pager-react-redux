import React from 'react'
import {Route,Redirect,Link} from 'react-router-dom'
import './Navigation.styles.scss'

//REDUX
import {connect} from 'react-redux'

class Navigation extends React.Component {

    render(){
        let navArray = []
        for(let i=0;i<[this.props.count/50];i++){
            navArray.push(i)
        }
        return(
            <div class="navigation">
                <ul>
                    <li><Link to={`/page/0`}>PREV</Link></li>
                    {
                        navArray.map(page=>{
                            return(
                                <li>
                                <Link to={`/page/${page}`}>
                                {page}
                                </Link>
                                </li>
                            )
                        })
                    }
                    <Link to={`/page/6`}>NEXT</Link>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    count: state.employeeDir.count
})

export default connect(mapStateToProps)(Navigation)