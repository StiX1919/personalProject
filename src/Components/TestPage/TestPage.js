import React, { Component } from 'react'
import axios from 'axios'

import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { userInfo, closeMenu } from '../../ducks/reducer'

import PostCards from '../PostCards/PostCards'
import Header from '../Header/Header'


import './TestPage.css'

class TestPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: {},
            openJobs: {},
            acceptedJobs: {},
            dropdown: false
        }
        this.runnerRow = this.runnerRow.bind(this)
        this.acceptedRow = this.acceptedRow.bind(this)
    }

    componentDidMount(){
        this.props.userInfo()
        axios.get('/api/posts').then(response => {
            console.log('response', response)
            this.setState({posts: response.data}) 
        })
        axios.get('/api/openJobs').then(response => {
            this.setState({openJobs: response.data})
        })
        axios.get('/api/acceptedJobs').then(response => {
            this.setState({acceptedJobs: response.data})
        })
    }

    handleLogin(){
        window.location.href= 'http://localhost:3001/login'
    }

    handleLogout(){
        window.location.href='https://stix1919.auth0.com/v2/logout?returnTo=http://localhost:3000'
        axios.get('/logout')
    }


    runnerRow(){

    }

    acceptedRow(){

    }
    
    
    


    render(){
        return (
            <div id='wholePage'>
                <div id='headerwrap'>
                    <div className='logoCircle'>
                        <img src='http://logo.pizza/img/stick-runner/stick-runner.png' id='logo'/>
                    </div>
                    <h1 className='mainTitle'>RUNNER</h1>
                    {!this.props.authID &&
                        <button id='login' onClick={this.handleLogin}>Login/Register today</button>
                    }
                    {this.props.authID &&
                    <ul id='links'>
                    
                        <li className='headerLink'>Home</li>
                        <li className='headerLink'>Profile</li>
                        <li className='headerLink'>View your jobs</li>
                        <li className='headerLink'>Create job request</li>
                        {this.props.runner === 1 &&
                            <li className='headerLink'>Open Jobs</li>
                        }
                        {this.props.runner === 1 &&
                            <li className='headerLink'>Accepted Jobs</li>
                        }

                    </ul>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps, { userInfo, closeMenu })(TestPage));