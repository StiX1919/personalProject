import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

import HomePage from '../HomePage/HomePage'
import BuildProfile from '../BuildProfile/BuildProfile'
import Home from '../Home/Home'
import BuildRequest from '../BuildRequest/BuildRequest'
import PostEdit from '../PostEdit/PostEdit'
import ViewPost from '../ViewPost/ViewPost'
import TestPage from '../TestPage/TestPage'

import { userInfo } from '../../ducks/reducer'

import './App.css'


class App extends Component {
  

componentDidMount(){
  if(this.props.authID){
    this.props.userInfo()
  }
}

  render() {
    return (

      <div className="App">
          
            <Switch>
              <Route exact path='/' component={HomePage}/>
              <Route path='/editProfile' component={BuildProfile}/>
              <Route path="/Home" component={Home}/>
              <Route path='/createReq' component={BuildRequest}/>
              <Route path='/postEdit' component={PostEdit}/>
              <Route path='/viewPost' component={ViewPost}/>
              <Route path='/testPage' component={TestPage}/>
            </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps, {userInfo})(App));
