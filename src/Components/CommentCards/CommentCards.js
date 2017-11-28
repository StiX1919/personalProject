import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

import { idPost, postUser, closeMenu } from '../../ducks/reducer'

import './CommentCards.css'

class CommentCards extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        
    }



    
    

    render() {
        return (
            <div id='commentCard'>
                <div id='commentuser'>
                <img className='commentPic' src={this.props.commentpic}/>
                <h4>{this.props.username}</h4>
                </div>
                <h4>{this.props.usercomment}</h4>

            </div>
        )
    }
}

const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps, { idPost, postUser, closeMenu })(CommentCards));