import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { handleTitle, handleSub, handlePost, setPost } from '../../ducks/reducer'

import Header from '../Header/Header'



class PostEdit extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            sub: '',
            post: ''
        }
        
        this.handleLogout = this.handleLogout.bind(this)
        this.editJob = this.editJob.bind(this)
    }
    
    componentDidMount(){
        if(this.props.postID){
            axios.get(`/api/editPost/${this.props.postID}`).then(response => {
                this.props.setPost(response.data[0].post_title, response.data[0].post_sub, response.data[0].post)
                return this.setState({title: response.data[0].post_title, sub: response.data[0].post_sub, post: response.data[0].post})
            })
        }
    }

    editJob(){
        axios.post(`/api/editJob/${this.props.postID}`, this.props).then(res=> {
           return res.data})
       
   }

   handleLogout(){
    window.location.href='https://stix1919.auth0.com/v2/logout?returnTo=http://localhost:3000'
    axios.get('/logout')
}

    render(){
        return (
            <div>
            <Header page='Post Editer'/>
            {this.props.dropdown === true &&
                <div id='dropdownMenu'>
                    <Link to='/Home'><button>Home</button></Link>
                    <Link to='/editProfile'><button>Profile</button></Link>
                    <Link to='/createReq'><button>Create New Request</button></Link>
                    <button id='logout' onClick={this.handleLogout}>Logout</button>
                </div>
            }
            <div className='body'>
                <div className='input-box'>
                    <div className='input-header'>
                        
                        <div className='profile'>
                            <img src={this.props.profilePic}/>
                            <div id='profInfo'>
                                <h4>{this.props.username}</h4>
                            </div>

                        </div>
                        <div className='title'>
                            <h3>Job Title</h3>
                            <input type='text' onChange={this.props.handleTitle} placeholder={this.state.title}/>
                            <h3>Subtitle</h3>
                            <input type='text' onChange={this.props.handleSub} placeholder={this.state.sub}/>
                            <h3></h3>
                            <Link to='/Home'><button onClick={this.editJob}>Edit Job</button></Link>
                            <Link to='/Home'><button onClick={this.props.closeMenu}>Home</button></Link>
                        </div>
                    </div>
                    <div className='field-box'>
                        <textarea onChange={this.props.handlePost} className='input-field' rows="10" cols="190" placeholder={this.state.post}></textarea>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps, { handleTitle, handleSub, handlePost, setPost })(PostEdit));