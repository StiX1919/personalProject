import React, { Component } from 'react'
import axios from 'axios'

import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { userInfo, closeMenu } from '../../ducks/reducer'

import PostCards from '../PostCards/PostCards'
import Header from '../Header/Header'


import './Home.css'

class Home extends Component {
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
            <div>
                {this.props.runner === 0 &&
                    <div>
                    <Header page='Customer Home'/>
                    {this.props.dropdown === true &&
                        <div id='dropdownMenu'>
                            <Link to='/editProfile'><button onClick={this.props.closeMenu}>Profile</button></Link>
                            <Link to='/createReq'><button onClick={this.props.closeMenu}>Create New Request</button></Link>
                            <button id='logout' onClick={this.handleLogout}>Logout</button>
                        </div>
                    }
                    <div id='body'>
                        <div className='profile'>
                            <img src={this.props.profilePic}/>
                            <div>
                                <h4>{this.props.username}</h4>
                        
                                <h5>Customer</h5>
                        
                                <Link to='/editProfile'><button onClick={closeMenu}>Profile</button></Link>
                            </div>
                        </div>
                        <div className='requests-outer'>
                            <h3>Your Open Requests</h3>
                            <div className='requests-inner'>
                                {this.state.posts.length > 0 &&
                                    this.state.posts.map( post => <PostCards title={post.post_title} sub={post.post_sub} post={post.post} PID={post.id}/>)
                                }
                                {this.state.posts.length < 6 && this.props.username &&
                                    <Link to='/createReq'><button id='createReq' onClick={this.props.closeMenu}>Create New Request</button></Link>
                                }
                                {!this.props.username &&
                                    <Link to='/editProfile'><button id='createReq' onClick={this.props.closeMenu}>Finish Your Profile</button></Link>
                                }
                            </div>
                        </div>

                    </div>
                </div>
                }
                
                {this.props.runner === null &&
                <div>
                    <Header page='Customer Home'/>
                    {this.props.dropdown === true &&
                        <div id='dropdownMenu'>
                            <Link to='/editProfile'><button onClick={this.props.closeMenu}>Profile</button></Link>
                            <Link to='/createReq'><button onClick={this.props.closeMenu}>Create New Request</button></Link>
                            <button id='logout' onClick={this.handleLogout}>Logout</button>
                        </div>
                    }
                    <div id='body'>
                        <div className='requests-outer-runner'>
                        <h3>Your Open Requests</h3>
                        <div className='requests-inner-runner'>
                            {this.state.posts.length > 0 &&
                                this.state.posts.map( post => <PostCards title={post.post_title} sub={post.post_sub} post={post.post} PID={post.id} UID={post.userid} runnerid={post.runnerid}/>)
                            }
                            {this.state.posts.length < 6 && this.props.username &&
                                <Link id='cardBody' to='/createReq'><button id='createReq' onClick={this.props.closeMenu}>Create New Request</button></Link>
                            }
                            {!this.props.username &&
                                    <Link to='/editProfile'><button id='createReq' onClick={this.props.closeMenu}>Finish Your Profile</button></Link>
                                }
                        </div>
                    </div>

                    </div>
                    
                </div>
                }

                
                {this.props.runner === 1 &&
                <div>
                    <Header page='Runner Home'/>
                    {this.props.dropdown === true &&
                        <div id='dropdownMenu'>
                            <Link to='/editProfile'><button>Profile</button></Link>
                            <Link to='/createReq'><button>Create New Request</button></Link>
                            <button id='logout' onClick={this.handleLogout}>Logout</button>
                        </div>
                    }
                
                    <div id='body'>

                    <div className='requests-outer-runner'>
                            <h3>Accepted Jobs</h3>
                            <div className='requests-inner-runner'>
                                {this.state.acceptedJobs.length > 0 &&
                                    this.state.acceptedJobs.map( post => <PostCards user={post.username} title={post.post_title} sub={post.post_sub} post={post.post} PID={post.id} UID={post.userid} acceptedRow={this.acceptedRow}/>)
                                }
                                
                            </div>
                        </div>
                        
                        <div className='requests-outer-runner'>
                            <h3>Your Open Requests</h3>
                            <div className='requests-inner-runner'>
                                {this.state.posts.length > 0 &&
                                    this.state.posts.map( post => <PostCards title={post.post_title} sub={post.post_sub} post={post.post} PID={post.id} UID={post.userid} runnerid={post.runnerid}/>)
                                }
                                {this.state.posts.length < 4 && this.props.username &&
                                    <Link id='cardBody' to='/createReq'><button id='createReq' onClick={this.props.closeMenu}>Create New Request</button></Link>
                                }
                                {!this.props.username &&
                                    <Link to='/editProfile'><button id='createReq' onClick={this.props.closeMenu}>Finish Your Profile</button></Link>
                                }
                            </div>
                        </div>
                        <div className='requests-outer-runner'>
                            <h3>Available Jobs</h3>
                            <div className='requests-inner-runner'>
                                {this.state.openJobs.length > 0 &&
                                    this.state.openJobs.map( post => <PostCards user={post.username} title={post.post_title} sub={post.post_sub} post={post.post} PID={post.id} UID={post.userid} runnerRow={this.runnerRow}/>)
                                }
                                
                            </div>
                        </div>

                    </div>
                </div>
                }
                {console.log('state', this.state, 'props', this.props)}
            </div>
        )
    }
}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps, { userInfo, closeMenu })(Home));