import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { requestUser, userInfo, handleAge, handleCity, handlePic, handleState, handleUserName, isRunner, notRunner, closeMenu } from '../../ducks/reducer'

import Header from '../Header/Header'

import "./BuildProfile.css"


class BuildProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            edit: false,
            altImg: 'https://www.multisoft.hu/wp-content/uploads/kiegeszito2100x100.png'
        }
        this.handleEdit = this.handleEdit.bind(this)
        this.handleCancle = this.handleCancle.bind(this)
        this.postUser = this.postUser.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    componentDidMount(){
        this.props.userInfo()
    }



    handleEdit(){
        this.setState({edit: true})
    }
    handleCancle(){
        this.setState({edit: false})
        this.props.userInfo()
    }
    
    postUser(){
        axios.post('/api/addUser', this.props).then(res=> {
           this.setState({edit: false})
           return res.data})
       
   }

   handleLogout(){
    window.location.href='https://stix1919.auth0.com/v2/logout?returnTo=http://localhost:3000'
    axios.get('/logout')
}
   



    render() {
        return (
            <div>
                <Header page='Profile Editor'/>
                {this.props.dropdown === true &&
                        <div id='dropdownMenu'>
                            <Link to='/Home'><button onClick={this.props.closeMenu}>Home</button></Link>
                            <Link to='/createReq'><button onClick={this.props.closeMenu}>Create New Request</button></Link>
                            <button id='logout' onClick={this.handleLogout}>Logout</button>
                        </div>
                    }
                {!this.props.username &&
                <h1>Let's finish your profile!</h1>
                }

                {this.props.authID && this.state.edit === false &&
                <div>
                    <img src={this.props.profilePic}/>
                    <h5>Profile Picture</h5>
                    <div>UserName: {this.props.username}</div>
                    <div>Age: {this.props.age}</div> 
                    <div>City: {this.props.city}</div>
                    <div>State: {this.props.state}</div>
                    {this.props.runner ===1 && 
                    <div>You are Currently a Runner</div>}
                    <button onClick={this.handleEdit}>Edit</button>
                </div> 
                }   

                {this.props.authID && this.state.edit === true &&
                <div>
                    
                    {!this.props.runner &&
                    <div>
                        <h4>Do you want to be a runner?</h4>
                        <button onClick={this.props.isRunner}>Click Here</button>
                    </div>
                    }
                    {this.props.runner === 1 &&
                    <div>
                        <h4>Done running?</h4>
                        <button onClick={this.props.notRunner}>Click Here</button>
                    </div>
                    }

                        {this.props.runner === 1 && 
                            <h1>You're a runner!</h1>
                        }
                    <img src={this.props.profilePic}/>
                    <h5>Profile Picture</h5>
                    <input type='text' placeholder={this.props.profilePic} onChange={this.props.handlePic}/>
                    <h5>Username</h5>
                    <input type='text' placeholder={this.props.username} onChange={this.props.handleUserName}/>
                    <h5>Age</h5>
                    <input type='text' placeholder={this.props.age} maxLength='3' onChange={this.props.handleAge}/>
                    <h5>City</h5>
                    <input type='text' placeholder={this.props.city} onChange={this.props.handleCity}/>
                    <h5>State</h5>
                    <input type='text' placeholder={this.props.state} maxLength='2' onChange={this.props.handleState}/>
                    <button onClick={this.postUser}>Save</button>
                    <button onClick={this.handleCancle}>Cancle</button>
                </div>
                }
                {console.log(this.props)}

                <Link to='/Home'>
                    <button onClick={this.props.closeMenu}>Home</button>
                </Link>
                
                



            </div>
        )
    }
}

const mapStateToProps = state => state


export default connect(mapStateToProps, {requestUser, userInfo, handleAge, handleCity, handlePic, handleState, handleUserName, isRunner, notRunner, closeMenu})(BuildProfile);