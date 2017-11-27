import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { userInfo, handleTitle, handleSub, handlePost, closeMenu } from '../../ducks/reducer'

import Header from '../Header/Header'

import './BuildRequest.css'

class BuildRequest extends Component {
    constructor(props){
        super(props)
        
        this.handleLogout = this.handleLogout.bind(this)
        this.postJob = this.postJob.bind(this)
    }
    
    componentDidMount(){
        this.props.userInfo()
    }

    postJob(){
        axios.post('/api/addJob', this.props).then(res=> {
           return res.data})
       
   }

   handleLogout(){
    window.location.href='https://stix1919.auth0.com/v2/logout?returnTo=http://localhost:3000'
    axios.get('/logout')
    }

    render(){
        return (
            <div>
            <Header page='New Job Request'/>
            {this.props.dropdown === true &&
                <div id='dropdownMenu'>
                    <Link to='/Home'><button onClick={this.props.closeMenu}>Home</button></Link>
                    <Link to='/editProfile'><button onClick={this.props.closeMenu}>Profile</button></Link>
                    <button id='logout' onClick={this.handleLogout}>Logout</button>
                </div>
            }
            <div className='body'>
                <div className='input-box'>
                    <div className='input-header'>
                        <div className='profile'>
                            <img src={this.props.profilePic}/>
                            <h4>{this.props.username}</h4>

                        </div>
                        <div className='title'>
                            <h3>Job Title</h3>
                            <input type='text' onChange={this.props.handleTitle}/>
                            <h3>Subtitle</h3>
                            <input type='text' onChange={this.props.handleSub}/>
                            <h3></h3>
                            <Link to='/home'><button onClick={this.postJob}>Post Job</button></Link>
                        </div>
                    </div>
                    <div className='field-box'>
                        <textarea onChange={this.props.handlePost} className='input-field' rows="10" cols="190" placeholder='Details'></textarea>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps, { userInfo, handleTitle, handleSub, handlePost, closeMenu })(BuildRequest));