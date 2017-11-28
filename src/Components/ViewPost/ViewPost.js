import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { handleTitle, handleSub, handlePost, closeMenu, handleComment } from '../../ducks/reducer'

import CommentCards from '../CommentCards/CommentCards'
import Header from '../Header/Header'
import './ViewPost.css'



class ViewPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            sub: '',
            post: '',
            comments: {}
        }
        this.handleLogout = this.handleLogout.bind(this)
        this.postComment = this.postComment.bind(this)
    }
    
    componentWillMount(){
        if(this.props.postID){
            axios.get(`/api/editPost/${this.props.postID}`).then(response => {
                return this.setState({title: response.data[0].post_title, sub: response.data[0].post_sub, post: response.data[0].post, userID: response.data[0].userid, runnerID: response.data[0].runnerid, PID: response.data[0].id})
            })
            axios.get(`/api/poster/${this.props.postUser}`).then(response => {
                console.log('state', this.state)
                return this.setState({username: response.data[0].username, city: response.data[0].city, profilePic: response.data[0].profilepic})
            })
            axios.get(`/api/getComments/${this.props.postID}`).then(response => {
                console.log('comments', response)
                return this.setState({comments: response.data})
            })
            
        }
    }

    handleLogout(){
        window.location.href='https://stix1919.auth0.com/v2/logout?returnTo=http://localhost:3000'
        axios.get('/logout')
    }

    postComment(){
        axios.post(`/api/addComment/${this.state.PID}`, this.props).then(res=> {
           return res.data})
       
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
                            {this.state.userID === this.props.userID && 
                                <button>Runner Completed Job</button>
                            }
                            {this.state.runnerID === this.props.userID &&
                                <button>Job has been Completed</button>
                            }
                            {this.state.userID === this.props.userID && this.state.runnerID &&
                                <button>Remove runner</button>
                            }
                        </div>
                    </div>
                    <div className='description'>
                        <h3 className='input-field'>{this.state.post}</h3>
                    </div>
                    <div className='commentInput'>
                        <h4>Leave a comment</h4>
                        <textarea onChange={this.props.handleComment} className='comment-field' rows="10" cols="170" placeholder='Thoughts?'></textarea>
                        {console.log('view props', this.props, 'view state', this.state)}
                        {this.props.comment.length < 1 &&
                            <button>Post Comment</button>
                        }
                        {this.props.comment.length > 0 &&
                        <button onClick={this.postComment}>Post Comment</button>
                        }

                        <h5>Comments</h5>
                        {this.state.comments.length > 0 &&
                            this.state.comments.map( comment => <CommentCards username={comment.username} commentpic={comment.profilepic} usercomment={comment.comment} runner={comment.runner}/>)
                        }
                    </div>
                </div>
                
            </div>
            
            </div>
        )
    }
}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps, { handleTitle, handleSub, handlePost, closeMenu, handleComment })(ViewPost));