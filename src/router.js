import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import { connect } from 'react-redux'

import { userInfo } from '../src/ducks/reducer'

import HomePage from './Components/HomePage/HomePage'
import BuildProfile from './Components/BuildProfile/BuildProfile'
import CustomerHome from './Components/UserHomes/CustomerHome/CustomerHome'
import RunnerHome from './Components/UserHomes/RunnerHome/RunnerHome'



class Router extends Component{
    constructor(props){
        super(props)
    }
 render(){
     console.log('customer', this.props)
    return (
        <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/editProfile' component={BuildProfile}/>
            <Route path="/chome" component={CustomerHome}/>
            <Route path='/rhome' component={RunnerHome}/>
        </Switch>

            // <div>
            //     {this.state.runner === 0 &&
            //         <Switch>
            //             <Route exact path='/' component={HomePage}/>
            //             <Route path='/editProfile' component={BuildProfile}/>
            //             <Route path="/home" component={CustomerHome}/>
            //             {console.log('customer', this.state)}
            //         </Switch>
            //         }
                
            //         {this.state.runner === 1 &&
            //         <Switch>
            //             <Route exact path='/' component={HomePage}/>
            //             <Route path='/editProfile' component={BuildProfile}/>
            //             <Route path='/home' component={RunnerHome}/>
            //             {console.log('runner', this.state)}
            //         </Switch>    
            //         }
                
            // </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { userInfo })(Router)