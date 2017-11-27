import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

import { idPost, postUser, closeMenu } from '../../ducks/reducer'

import './PostCards.css'

class PostCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hidden: false
        }
        this.postEdit = this.postEdit.bind(this)
        this.deletePost = this.deletePost.bind(this)
        this.acceptJob = this.acceptJob.bind(this)
    }



    postEdit(){
        this.props.idPost(this.props.PID)
        this.props.postUser(this.props.UID)
        this.props.closeMenu()
    }

    deletePost(){
        this.setState({hidden: true})
        axios.delete(`/api/deletePost/${this.props.PID}`).then(res=> {
            console.log('deleted')
            return res.data})
    }

    acceptJob(){
        axios.post(`/api/acceptJob/${this.props.PID}`).then(response => {
            return response
        })
    }
    

    render() {
        return (
            <div id='main'>
            {!this.props.runnerRow && !this.props.acceptedRow &&
            <div id='cardBody'>
            {this.state.hidden === false &&
                <div id='cardBody'>
                {!this.props.runnerid &&
                    <div id='card'>
                        <div id='postInfo'>
                            <div id='title'>
                                <h3>Title:</h3>
                                <h5>{this.props.title}</h5>
                        
                            </div>
                            <div id='sub'>
                                <h4>Sub Title:</h4>
                                <h5>{this.props.sub}</h5>
                            </div>
                        </div>
                        <div className='buttons'>
                            <Link to='/postEdit'><button className='button' onClick={this.postEdit}>Edit Post</button></Link>
                        
                            <button className='button' onClick={this.deletePost}>Delete Post</button>
                        </div>
                    </div>
                }
                {this.props.runnerid &&
                    <div id='acceptedCard'>
                        <div id='postInfo'>
                            <h2>Job Accepted</h2>
                            <div id='title'>
                                <h3>Title:</h3>
                                <h5>{this.props.title}</h5>
                        
                            </div>
                            <div id='sub'>
                                <h4>Sub Title:</h4>
                                <h5>{this.props.sub}</h5>
                            </div>
                        </div>
                        <div className='buttons'>
                            <Link to='/viewPost'><button className='button' onClick={this.postEdit}>View Post</button></Link>
                        
                            <button className='button' onClick={this.deletePost}>Delete Post</button>
                        </div>
                    </div>
                }
                </div>
            
            
            
            }
            </div>
            }

            {this.props.runnerRow &&
            <div id='cardBody'>
            {this.state.hidden === false &&
                <div id='card'>
            
                <div id='postInfo'>
                    <div id='sub'>
                        <h3>Username:</h3>
                        <h5>{this.props.user}</h5>
                    </div>
                    <div id='title'>
                        <h3>Title:</h3>
                        <h5>{this.props.title}</h5>
                        
                    </div>
                    </div>
                    <div className='buttons'>
                        <button className='button' onClick={this.acceptJob}>Accept Job</button>
                        <Link to='/viewPost'><button className='button' onClick={this.postEdit}>View Post</button></Link>
                    </div>
                </div>
            
            
            
            }
            </div>
            }

            {this.props.acceptedRow &&
            <div id='cardBody'>
            {this.state.hidden === false &&
                <div id='acceptedCard'>
            
                <div id='postInfo'>
                    <div id='sub'>
                        <h3>Username:</h3>
                        <h5>{this.props.user}</h5>
                    </div>
                    <div id='title'>
                        <h3>Title:</h3>
                        <h5>{this.props.title}</h5>
                        
                    </div>
                    </div>
                    <div className='buttons'>
                        <Link to='/viewPost'><button className='button' onClick={this.postEdit}>View Post</button></Link>
                    </div>
                </div>
            
            
            
            }
            </div>
            }
            </div>
        )
    }
}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps, { idPost, postUser, closeMenu })(PostCards));