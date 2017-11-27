import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

import { openMenu, closeMenu } from '../../ducks/reducer'

import './Header.css'

class Header extends Component {
    constructor(props) {
        super(props)
        
    }

    

    handleLogin(){
        window.location.href= 'http://localhost:3001/login'
    }
    
    
    dropdown(){
        if( this.state.dropdown === false){
            this.setState({dropdown: true})
        }
        else if ( this.state.dropdown === true){
            this.setState({dropdown: false})
        }
    }

    render(){
        return (
            <div id='mainHeader'>
            {this.props.authID &&
            <div id='headerContainer'>
                <Link to='/Home'><div id='logo' onClick={this.props.closeMenu}>
                    <img src='http://logo.pizza/img/stick-runner/stick-runner.png' className='logoImg'/>
                    <h1>RUNNER</h1>
                </div></Link>
                <h1 className='pageTitle'>{this.props.page}</h1>
                {!this.props.authID &&
                <button id='login' onClick={this.handleLogin}>Login/Register today</button>
                }
                {this.props.authID &&
                <div id='loginheader'>
                    <img id='loginimg' src={this.props.profilePic} />
                    <h3>{this.props.headerUsername}</h3>
                    {this.props.dropdown === false &&
                        <img id='dropdown' src='https://d30y9cdsu7xlg0.cloudfront.net/png/196765-200.png' onClick={this.props.openMenu}/>
                    }
                    {this.props.dropdown === true &&
                        <img id='dropdown' src='https://d30y9cdsu7xlg0.cloudfront.net/png/196765-200.png' onClick={this.props.closeMenu}/>
                    }
                    
                </div>
                }
                </div>
            }
            {!this.props.authID &&
            <div id='headerContainer'>
                <Link to='/'><div id='logo'>
                    <img src='http://logo.pizza/img/stick-runner/stick-runner.png' className='logoImg'/>
                    <h1>RUNNER</h1>
                </div></Link>
                <h1 className='pageTitle'>{this.props.page}</h1>
                {!this.props.authID &&
                <button id='login' onClick={this.handleLogin}>Login/Register today</button>
                }
                {this.props.authID &&
                <div id='loginheader'>
                    <img id='loginimg' src={this.props.profilepic} />
                    <h3>{this.props.username}</h3>
                    {this.props.dropdown === false &&
                        <img id='dropdown' src='https://d30y9cdsu7xlg0.cloudfront.net/png/196765-200.png' onClick={this.props.openMenu}/>
                    }
                    {this.props.dropdown === true &&
                        <img id='dropdown' src='https://d30y9cdsu7xlg0.cloudfront.net/png/196765-200.png' onClick={this.props.closeMenu}/>
                    }
                    
                </div>
                }
                </div>
            }
            </div>
        )
    }
}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps, { openMenu, closeMenu })(Header));