import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { handleTitle, handleSub, handlePost, closeMenu } from '../../ducks/reducer'

import Header from '../Header/Header'
import './ViewPost.css'



class ViewPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            sub: '',
            post: ''
        }
        this.handleLogout= this.handleLogout.bind(this)
        
    }
    
    componentWillMount(){
        if(this.props.postID){
            axios.get(`/api/editPost/${this.props.postID}`).then(response => {
                return this.setState({title: response.data[0].post_title, sub: response.data[0].post_sub, post: response.data[0].post, userID: response.data[0].userid, runnerID: response.data[0].runnerid})
            })
            axios.get(`/api/poster/${this.props.postUser}`).then(response => {
                console.log('state', this.state)
                return this.setState({username: response.data[0].username, city: response.data[0].city, profilePic: response.data[0].profilepic})
            })
            
        }
    }

    handleLogout(){
        window.location.href='https://stix1919.auth0.com/v2/logout?returnTo=http://localhost:3000'
        axios.get('/logout')
    }

    render(){
        return (
            <div>
            <Header page='View Post'/>
            {this.props.dropdown === true &&
                <div id='dropdownMenu'>
                    <Link to='/Home'><button onClick={this.props.closeMenu}>Home</button></Link>
                    <Link to='/editProfile'><button onClick={this.props.closeMenu}>Profile</button></Link>
                    <Link to='/createReq'><button onClick={this.props.closeMenu}>Create New Request</button></Link>
                    <button id='logout' onClick={this.handleLogout}>Logout</button>
                </div>
            }
            <div className='body'>
                <div className='jobinfo'>
                    <div className='input-header'>
                        <div className='profile'>
                            <img src={this.state.profilePic}/>
                            <div id='profInfo'>
                                <h4>{this.state.username}</h4>
                                <h5>City: {this.state.city}</h5>
                            </div>

                        </div>
                        <div className='title'>
                            <h1>{this.state.title}</h1>
                            <h2>{this.state.sub}</h2>
                            <Link to='/Home'><button>Home</button></Link>
                            {this.state.userID && this.state.runnerID &&
                                <button>Complete Job</button>
                            }
                            {this.state.userID === this.props.userID && this.state.runnerID &&
                                <button>Remove runner</button>
                            }
                        </div>
                    </div>
                    <div className='description'>
                        <h4 className='input-field'>{this.state.post}</h4>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps, { handleTitle, handleSub, handlePost, closeMenu })(ViewPost));