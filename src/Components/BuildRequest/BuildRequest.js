import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { userInfo, handleTitle, handleSub, handlePost } from '../../ducks/reducer'

import Header from '../Header/Header'

import './BuildRequest.css'

class BuildRequest extends Component {
    constructor(props){
        super(props)
        

        this.postJob = this.postJob.bind(this)
    }
    
    componentDidMount(){
        this.props.userInfo()
    }

    postJob(){
        axios.post('/api/addJob', this.props).then(res=> {
           return res.data})
       
   }

    render(){
        return (
            <div>
            <Header page='New Job Request'/>
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

export default withRouter(connect(mapStateToProps, { userInfo, handleTitle, handleSub, handlePost })(BuildRequest));