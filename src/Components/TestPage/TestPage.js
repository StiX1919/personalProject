import React, { Component } from 'react'
import axios from 'axios'

import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { requestUser, userInfo, handleAge, handleCity, handlePic, handleState, handleUserName, isRunner, notRunner, logoutWipe, closePost, handleComment, handleTitle, handleSub, handlePost } from '../../ducks/reducer'

import CommentCards from '../CommentCards/CommentCards'
import PostCards from '../PostCards/PostCards'
import Header from '../Header/Header'


import './css/TestHome.css'
import './css/TestProfile.css'
import './css/TestUserReqs.css'

class TestPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: {},
            openJobs: {},
            acceptedJobs: {},
            edit: false,
            wrapper: true,
            newPost: false,
            links: {
                home: true,
                profile: false,
                userReqs: false, 
                openJobs: false, 
                userJobs: false
            }
        }

        this.handleLogin = this.handleLogin.bind(this)

        this.goHome = this.goHome.bind(this)
        this.goProfile = this.goProfile.bind(this)
        this.goReqs = this.goReqs.bind(this)
        this.goOpen = this.goOpen.bind(this)
        this.goRun = this.goRun.bind(this)

        // profile edit functions
        this.handleEdit = this.handleEdit.bind(this)
        this.handleCancle = this.handleCancle.bind(this)
        this.postUser = this.postUser.bind(this)
        this.handleLogout = this.handleLogout.bind(this)


        this.runnerRow = this.runnerRow.bind(this)
        this.acceptedRow = this.acceptedRow.bind(this)

        this.postComment = this.postComment.bind(this)


        this.closeHeader = this.closeHeader.bind(this)

        this.makeNewPost = this.makeNewPost.bind(this)
        this.closeNewPost = this.closeNewPost.bind(this)

        this.postJob = this.postJob.bind(this)
    }

    componentWillMount(){
        
        axios.get('/api/preLogin').then(response => {
            if (response.data){
                this.props.userInfo()
                console.log('response',response.data)
                axios.get('/api/posts').then(res => {
                    
                    this.setState({posts: res.data}) 
                })
                axios.get('/api/openJobs').then(res => {
                    console.log('openjobs', res.data)
                    this.setState({openJobs: res.data})
                })
                axios.get('/api/acceptedJobs').then(res => {
                    this.setState({acceptedJobs: res.data})
                })
            }
        })
        console.log('logged in?', this.state.loggedin)
        
    }
    
    

    handleLogin(){
        window.location.href= 'http://localhost:3001/login'

    }

    handleLogout(){
        
        window.location.href='https://stix1919.auth0.com/v2/logout?returnTo=http://localhost:3000/testPage'
        axios.get('/logout')
        this.props.logoutWipe()
    }


    // page routing
    goHome(){
        this.closeNewPost()
        this.props.closePost()
        this.setState({links:{home: true, profile: false, userReqs: false, openJobs: false, userJobs: false}})
    }
    goProfile(){
        this.closeNewPost()
        this.props.closePost()
        this.setState({links:{home: false, profile: true, userReqs: false, openJobs: false, userJobs: false}})
    }
    goReqs(){
        this.closeNewPost()
        this.props.closePost()
        this.setState({links:{home: false, profile: false, userReqs: true, openJobs: false, userJobs: false}})
    }
    goOpen(){
        this.closeNewPost()
        this.props.closePost()
        this.setState({links:{home: false, profile: false, userReqs: false, openJobs: true, userJobs: false}})
    }
    goRun(){
        this.closeNewPost()
        this.props.closePost()
        this.setState({links:{home: false, profile: false, userReqs: false, openJobs: false, userJobs: true}})
    }
    

    // profile edit functions
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

    postComment(){
        axios.post(`/api/addComment/${this.props.postID}`, this.props).then(res=> {
        return res.data})
   
    }

    postJob(){
        axios.post('/api/addJob', this.props).then(res=> {
           return res.data})
       
   }

    makeNewPost(){
        this.setState({newPost: true})

        this.props.closePost()
    }

    closeNewPost(){
        this.setState({newPost: false})
    }
    

   runnerRow() {

   }
   acceptedRow(){

   }


   closeHeader(){
        if(this.state.wrapper === true){
            this.setState({wrapper: false})
        }
       else this.setState({wrapper: true})
   }


    render(){
        return (
            <div id='wholePage'>
                <div id={this.state.wrapper ? 'headerwrapOpen' : 'headerwrapClose'}>
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
                        <li className='headerLink' onClick={this.makeNewPost}>Create job request</li>
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
                
                <div className={this.state.wrapper ? 'wrapperControlOpen' : 'wrapperControlClose'} onClick={this.closeHeader}><img id={this.state.wrapper ? 'wrapperImgOpen' : 'wrapperImgClose'} src='http://cdn.onlinewebfonts.com/svg/img_125564.png'/></div>
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

                {this.props.authID && this.state.links.home === true && this.props.isLoading === false &&
                    <h1>Thanks for logging in {this.props.username}</h1>
                }

                {/* Profile view */}

                {this.props.authID && this.state.links.profile === true &&
                    <div id='profileLink'>
                        {!this.props.username &&
                            <h1>Let's finish your profile!</h1>
                        }

                        {this.props.authID && this.state.edit === false &&
                            <div id='testProfile'>
                                <div id='profanduser'>
                                    <div id='profilePicBox'>
                                        <img id='testProfilePic' src={this.props.profilePic}/>
                                        <h4>Profile Picture</h4>
                                    </div>
                                    <div className='username'>
                                        {this.props.runner === 1 &&
                                            <h1>Runner:</h1>
                                        }
                                        {this.props.runner === 0 &&
                                            <h1>Poster:</h1>
                                        }
                                        {this.props.runner === null &&
                                            <h1>Poster:</h1>
                                        }
                                        <h1 className='profuser'>{this.props.username}</h1>
                                    </div>
                                </div>
                                <div id='otherdata'>
                                    <h2>Age: {this.props.age}</h2> 
                                    <h2>City: {this.props.city}</h2>
                                    <h2>State: {this.props.state}</h2>
                                    {this.props.runner ===1 && 
                                        <h3>You are Currently a Runner</h3>
                                    }
                                    <div>
                                        <button onClick={this.handleEdit}>Edit</button>
                                    </div>
                                </div>
                            </div> 
                        }   

                        {this.props.authID && this.state.edit === true &&
                            <div id='testProfile'>

                                <img id='testProfilePic' src={this.props.profilePic}/>
                                
                                <div id='otherdataedit'>
                                    <h2>Profile Picture</h2>
                                    <input type='text' placeholder={this.props.profilePic} onChange={this.props.handlePic}/>
                                    <h2>Username</h2>
                                    <input type='text' placeholder={this.props.username} onChange={this.props.handleUserName}/>
                                    <h2>Age</h2>
                                    <input type='text' placeholder={this.props.age} maxLength='3' onChange={this.props.handleAge}/>
                                    <h2>City</h2>
                                    <input type='text' placeholder={this.props.city} onChange={this.props.handleCity}/>
                                    <h2>State</h2>
                                    <input type='text' placeholder={this.props.state} maxLength='2' onChange={this.props.handleState}/>
                                    {this.props.runner === 1 && 
                                        <h1>You're a runner!</h1>
                                    }
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

                                    <div className='testProfilebuttons'>
                                        <button onClick={this.postUser}>Save</button>
                                        <button onClick={this.handleCancle}>Cancle</button>
                                    </div>
                                    
                                </div>
                            </div>
                        }
                    </div>
                }

                {/* user requests view */}

                {this.props.authID && this.state.links.userReqs === true &&
                    <div id='profileLink'>
                        <div className='testreqsouter'>
                            <h1>Your Open Requests</h1>
                            <div className='testreqsinner'>
                            
                                {this.state.posts.length > 0 &&
                                    this.state.posts.map( post => <PostCards title={post.post_title} sub={post.post_sub} post={post.post} PID={post.id} UID={post.userid} runnerid={post.runnerid}/>)
                                }
                                {this.state.posts.length < 6 && this.props.username &&
                                    <button id='testCreateJob' onClick={this.makeNewPost}>Create New Request</button>
                                }
                                
                            </div>
                        </div>

                    </div>
                }

                {/* All open requests */}

                {this.props.authID && this.state.links.openJobs === true &&
                    <div id='profileLink'>
                        <div className='testreqsouter'>
                            <h1>Available Jobs</h1>
                            <div className='testreqsinnerRunner'>
                                {this.state.openJobs.length > 0 &&
                                    this.state.openJobs.map( post => <PostCards user={post.username} title={post.post_title} sub={post.post_sub} post={post.post} PID={post.id} UID={post.userid} runnerRow={this.runnerRow}/>)
                                }
                        
                            </div>
                        </div>
                    </div>
                }

                {/* Accepted Jobs */}

                {this.props.authID && this.state.links.userJobs === true &&
                    <div id='profileLink'>
                        <div className='testreqsouter'>
                            <h1>Accepted Jobs</h1>
                            <div className='testreqsinnerRunner'>
                                {this.state.acceptedJobs.length > 0 &&
                                    this.state.acceptedJobs.map( post => <PostCards user={post.username} title={post.post_title} sub={post.post_sub} post={post.post} PID={post.id} UID={post.userid} acceptedRow={this.acceptedRow}/>)
                                }
                        
                            </div>
                        </div>
                    </div>
                }

                {/* Post pop up view */}

                {this.props.postPopUp === true &&
                    <div id='testPostView'>
                        <div id='testPost'>
                            <div className='closePost' onClick={this.props.closePost}>X</div>
                            <div id='testPostInfo'>
                                <div id='testPostHeader'>
                                    <img src={this.props.posterPic} />
                                    <h1>{this.props.posterName}</h1>
                                    <div>
                                        <h2>{this.props.postTitle}</h2>
                                        <h4>{this.props.postSubTitle}</h4>
                                    </div>
                                </div>
                                <h4>{this.props.postDetails}</h4>
                            </div>
                            <h2>Comments</h2>
                            <div id='testCommentsContainer'>
                                <div id='testCommentList'>
                                {this.props.postComments.length > 0 &&
                                    this.props.postComments.map( comment => <CommentCards postuser={comment.username} commentpic={comment.profilepic} usercomment={comment.comment} runner={comment.runner}/>)
                                }
                                <h4>Leave a comment</h4>
                                <textarea onChange={this.props.handleComment} className='test-comment-field' rows="10" cols="170" placeholder='Thoughts?'></textarea>
                                
                                {this.props.comment.length < 1 &&
                                    <button>Post Comment</button>
                                }
                                {this.props.comment.length > 0 &&
                                    <button onClick={this.postComment}>Post Comment</button>
                                }
                                </div>
                            </div>
                        </div>
                        
                    </div>
                }

                {/* creating a job request */}

                {this.state.newPost === true &&
                <div id='testPostView'>
                    <div id='testPost'>
                        <div className='closePost' onClick={this.closeNewPost}>X</div>
                        <h1>Create a job for someone else to do</h1>
                        
                        <div id='newJobInfo'>
                            <div id='newJobHeader'>
                                <div className='titleDiv'>
                                <h2>Job Title</h2>
                                <input className="newPostInput" type='text' onChange={this.props.handleTitle}/>
                                </div>
                                <div className='titleDiv'>
                                <h2>Subtitle</h2>
                                <input className="newPostInput" type='text' onChange={this.props.handleSub}/>
                                </div>
                                <h3></h3>
                                <button id='postJobButton' onClick={this.postJob}>Post Job</button>
                            </div>
                            <div className='field-box'>
                                <textarea onChange={this.props.handlePost} className='input-field' rows="10" cols="190" placeholder='Details'></textarea>
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

export default withRouter(connect(mapStateToProps, { requestUser, userInfo, handleAge, handleCity, handlePic, handleState, handleUserName, isRunner, notRunner, logoutWipe, closePost, handleComment, handleTitle, handleSub, handlePost })(TestPage));