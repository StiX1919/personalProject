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
            links: {
                home: true,
                profile: false,
                userReqs: false, 
                openJobs: false, 
                userJobs: false
            }
        }
        this.goHome = this.goHome.bind(this)
        this.goProfile = this.goProfile.bind(this)
        this.goReqs = this.goReqs.bind(this)
        this.goOpen = this.goOpen.bind(this)
        this.goRun = this.goRun.bind(this)
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
    goHome(){
        this.setState({links:{home: true, profile: false, userReqs: false, openJobs: false, userJobs: false}})
    }
    goProfile(){
        this.setState({links:{home: false, profile: true, userReqs: false, openJobs: false, userJobs: false}})
    }
    goReqs(){
        this.setState({links:{home: false, profile: false, userReqs: true, openJobs: false, userJobs: false}})
    }
    goOpen(){
        this.setState({links:{home: false, profile: false, userReqs: false, openJobs: true, userJobs: false}})
    }
    goRun(){
        this.setState({links:{home: false, profile: false, userReqs: false, openJobs: false, userJobs: true}})
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
                    
                        <li className='headerLink' onClick={this.goHome}>Home</li>
                        <li className='headerLink' onClick={this.goProfile}>Profile</li>
                        <li className='headerLink' onClick={this.goReqs}>View your jobs</li>
                        <li className='headerLink'>Create job request</li>
                        {this.props.runner === 1 &&
                            <li className='headerLink' onClick={this.goOpen}>Open Jobs</li>
                        }
                        {this.props.runner === 1 &&
                            <li className='headerLink' onClick={this.goRun}>Accepted Jobs</li>
                        }
                        <li className='headerLink' onClick={this.handleLogout}>Logout</li>

                    </ul>
                    }
                </div>

                {/* view for non-logged in users */}

                {!this.props.authID &&
                <div>
                    <div className='homeView' id='homeimg1'> 
                        <div id='imgbox'>
                        <div className='homeCircle'>
                            <img src='http://logo.pizza/img/stick-runner/stick-runner.png' className='homeLogo'/>
                        </div>
                        <h1 className='homeTitle'>RUNNER</h1>
                        </div>
                        <h1>For those too bored to do their own chores.</h1>
                    </div>
                    <img className='homeView' id='homeimg2' src='https://www.visitcalifornia.com/sites/default/files/styles/welcome_image/public/VC_Questionnaire_AlexHonnold_ED_29790110_1280x640.jpg'/>
                    <div className='homeView' id='hometxt2'>Post Jobs you need done so you can enjoy your vacation or free time</div>
                    <div className='homeView' id='postcircle2'><img src='http://cdn.onlinewebfonts.com/svg/img_420677.png' id='postlogo'/></div>
                    <img className='homeView' id='homeimg3' src='https://s-i.huffpost.com/gen/2349884/images/o-CHORES-FOR-KIDS-facebook.jpg'/>
                    <div className='homeView' id='runcircle3'><img src='http://logo.pizza/img/stick-runner/stick-runner.png' id='runlogo'/></div>
                    <div className='homeView' id='hometxt3'>Become a RUNNER and do jobs for others</div>
                </div>
                }

                {/* home view for logged in users */}
                {this.props.authID && this.state.links.home === true &&
                    <h1>Thanks for logging in {this.props.username}</h1>
                }
                {console.log(this.state)}
            </div>
        )
    }
}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps, { userInfo, closeMenu })(TestPage));