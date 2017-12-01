import axios from "axios";

//Action Constants

const REQ_USER = 'REQ_USER'
const USER_INFO = 'USER_INFO'
const CHANGE_NAME = 'CHANGE_NAME'
const CHANGE_CITY = 'CHANGE_CITY'
const CHANGE_STATE = 'CHANGE_STATE'
const CHANGE_AGE = 'CHANGE_AGE'
const CHANGE_PIC = 'CHANGE_PIC'
const IS_RUNNER = 'IS_RUNNER'
const NOT_RUNNER = 'NOT_RUNNER'

const CHANGE_TITLE = 'CHANGE_TITLE'
const CHANGE_SUB = 'CHANGE_SUB'
const CHANGE_POST = 'CHANGE_POST'

const CHANGE_COMMENT = 'CHANGE_COMMENT'

const POST_ID = 'POST_ID'
const POST_USER = 'POST_USER'
const EDIT_POST = 'EDIT_POST'
const POST_POP_UP = 'POST_POP_UP'
const CLOSE_POST = 'CLOSE_POST'

const OPENMENU = 'OPENMENU'
const CLOSE_MENU = 'CLOSE_MENU'

const SET_POST = 'SET_POST'
const GET_COMMENTS = 'GET_COMMENTS'

const LOGOUT_WIPE = 'LOGOUT_WIPE'

const REMOVE_JOB = 'REMOVE_JOB'
const GET_USER_POSTS = 'GET_USER_POSTS'
const POST_NEW_JOB = 'POST_NEW_JOB'
const EMPTY_POST = 'EMPTY_POST'

const GET_OPEN_JOBS = 'GET_OPEN_JOBS'

const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT'
const EMPTY_COMMENT = 'EMPTY_COMMENT'



//Initial State

const initialState = {
        authID: null,
        runner: 0,
        username: '',
        city: '',
        state: '',
        age: 0,
        profilePic: '',
        id: 0,
        postTitle: '',
        subTitle: '',
        post: '',
        postID: null,
        dropdown: false,
        comment: '',
        initialLoad: false,
        isLoading: true,
        postComments: [],
        userPosts: []
    
}


//Action Creators

export function getOpenJobs(){
    return {
        type: GET_OPEN_JOBS,
        payload: axios.get('/api/openJobs').then(res => {
            return res.data
        })
    }
}

export function emptyPost(){
    return {
        type: EMPTY_POST,
        payload: ''
    }
}

export function emptyComment(){
    return {
        type: EMPTY_COMMENT,
        payload: ''
    }
}

export function addNewComment(PID, COMMENT, UID, PID2){
    return {
        type: ADD_NEW_COMMENT,
        payload: axios.post(`/api/addComment`, {PID, COMMENT, UID, PID2}).then( res => {
            // console.log('comment response', res)
            return res.data
        })
    }
}

export function postNewJob(title, sub, content, ID, UN, ID2){
    return {
        type: POST_NEW_JOB,
        payload: axios.post('/api/addJob', {title, sub, content, ID, UN, ID2}).then(res => {
            // console.log('job post response', res.data)
            return res.data
        })
    }
}

export function getUserPosts(){
    return {
        type: GET_USER_POSTS,
        payload: axios.get('/api/posts').then(res => {
            console.log('userPosts', res.data)
            
            return res.data
        })
    }
}

export function removeJob(postid, UID){
    return {
        type: REMOVE_JOB,
        payload:  axios.delete(`/api/deletePost/${postid}/${UID}`).then(res=> {
            console.log('deleted')
            return res.data})
    }
}

export function logoutWipe(){
    return {
        type: LOGOUT_WIPE,
        payload: initialState
    }
}

export function requestUser(){
    console.log('HIT');
    return{
        type: REQ_USER,
        payload: axios.get('/api/user').then(response => {
            return response.data
        }).catch(console.log)
    }
}

export function userInfo(){
    return{
        type: USER_INFO,
        payload: axios.get('/api/info').then(response => {
            console.log('info reducer', response)
            return response.data
        }).catch(console.log)
    }
}

export function handleUserName(e){

    return {
        type: CHANGE_NAME,
        payload: e.target.value
    }
}

export function handleCity(e){
    return {
        type: CHANGE_CITY,
        payload: e.target.value
    }
}

export function handleState(e){
    return {
        type: CHANGE_STATE,
        payload: e.target.value
    }
}

export function handleAge(e){
    return {
        type: CHANGE_AGE,
        payload: e.target.value
    }
}

export function handlePic(e){
    return {
        type: CHANGE_PIC,
        payload: e.target.value
    }
}

export function isRunner(){
        return {
            type: IS_RUNNER,
            payload: 1
        
    }

}

export function notRunner(){
    return {
        type: NOT_RUNNER,
        payload: 0
    }
}

//post functions

export function handleTitle(e){
    return {
        type: CHANGE_TITLE,
        payload: e.target.value
    }
}

export function handleSub(e){
    return {
        type: CHANGE_SUB,
        payload: e.target.value
    }
}

export function handlePost(e){
    return {
        type: CHANGE_POST,
        payload: e.target.value
    }
}

export function handleComment(e){
    return {
        type: CHANGE_COMMENT,
        payload: e.target.value
    }
}

//edit post functions

export function idPost(e){
    return {
        type: POST_ID,
        payload: e
    }
}

export function postUser(e){
    return {
        type: POST_USER,
        payload: e
    }
}

export function openMenu(){
    return {
        type: OPENMENU,
        payload: true
    }
}

export function closeMenu(){
    return {
        type: CLOSE_MENU,
        payload: false
    }
}
export function setPost(title, sub, details){
    return {
        type: SET_POST,
        payload: {title, sub, details}
    }
}

export function editPost(postid){
    return {
        type: EDIT_POST,
        payload: axios.get(`/api/editPost/${postid}`).then(response => {
            console.log('edit post', response.data[0])
            return response.data[0]
        })
    }
}

export function getComments(postid){
    return {
        type: GET_COMMENTS,
        payload: axios.get(`/api/getComments/${postid}`).then(response => {
            console.log('comments', response)
            return response.data
        })
    }
}

export function postView(){
    return {
        type: POST_POP_UP
    }
}

export function closePost(){
    return {
        type: CLOSE_POST
    }
}






//Reducer

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case REQ_USER + '_PENDING':
            return Object.assign({}, state, {isLoading: true})
        case REQ_USER + '_FULFILLED':
            return Object.assign({}, state, {
                
                isLoading: false,
                authID: action.payload
            })
        case USER_INFO + '_PENDING': {
            return Object.assign({}, state, {isLoading: true})
        }
        case USER_INFO + '_FULFILLED': {
            return Object.assign({}, state, {
                isLoading: false,
                username: action.payload.username,
                headerUsername: action.payload.username,
                runner: action.payload.runner,
                city: action.payload.city,
                state: action.payload.state,
                age: action.payload.age,
                profilePic: action.payload.profilepic,
                authID: action.payload.authid,
                userID: action.payload.id
            })}
        case CHANGE_NAME: {
            return Object.assign({}, state, {username: action.payload})
        }
        case CHANGE_CITY: {
            return Object.assign({}, state, {city: action.payload})
        }
        case CHANGE_STATE: {
            return Object.assign({}, state, {state: action.payload})
        }
        case CHANGE_AGE: {
            return Object.assign({}, state, {age: action.payload})
        }
        case CHANGE_PIC: {
            return Object.assign({}, state, {profilePic: action.payload})
        }
        case IS_RUNNER: {
            return Object.assign({}, state, {runner: action.payload})
        }
        case NOT_RUNNER: {
            return Object.assign({}, state, {runner: action.payload})
        }
        //post edits
        case CHANGE_TITLE: {
            return Object.assign({}, state, {postTitle: action.payload})
        }
        case CHANGE_SUB: {
            return Object.assign({}, state, {subTitle: action.payload})
        }
        case CHANGE_POST: {
            return Object.assign({}, state, {post: action.payload})
        }
        case CHANGE_COMMENT: {
            return Object.assign({}, state, {comment: action.payload})
        }

        case POST_ID: {
            return Object.assign({}, state, {postID: action.payload})
        }
        case POST_USER: {
            return Object.assign({}, state, {postUser: action.payload})
        }
        
        case OPENMENU: {
            return Object.assign({}, state, {dropdown: action.payload})
        }
        case CLOSE_MENU: {
            return Object.assign({}, state, {dropdown: action.payload})
        }

        case SET_POST: {
            return Object.assign({}, state, {
                postTitle: action.payload.title, 
                subTitle: action.payload.sub, 
                post: action.payload.details})
        }

        case LOGOUT_WIPE: {
            return initialState
        }

        case EDIT_POST + '_PENDING': {
            return Object.assign({}, state, {
                isLoading: true
            })
        }
        case EDIT_POST + '_FULFILLED': {
            return Object.assign({}, state, {
                isLoading: false,
                postTitle: action.payload.post_title, 
                postSubTitle: action.payload.post_sub, 
                postDetails: action.payload.post, 
                posterName: action.payload.username, 
                postRunner: action.payload.runnerid,
                postIsRunner: action.payload.runner,
                posterPic: action.payload.profilepic,
                postID: action.payload.id,
                posterID: action.payload.userid
            })
        }

        case GET_COMMENTS + '_PENDING': {
            return Object.assign({},state, {
                isLoading: true
            })
        }
        case GET_COMMENTS + '_FULFILLED': {
            return Object.assign({}, state, {
                postComments: action.payload,
                isLoading: false
            })
        }

        case POST_POP_UP:  {
            return Object.assign({}, state, {
                postPopUp: true
            })
        }
        case CLOSE_POST: {
            return Object.assign({}, state, {postPopUp: false})
        }

        case REMOVE_JOB + '_PENDING': {
            return Object.assign({}, state, {isLoading: true})
        }
        case REMOVE_JOB + '_FULFILLED': {
            return Object.assign({}, state, {
                userPosts: action.payload,
                isLoading: false
            })
        }

        case GET_USER_POSTS + '_PENDING': {
            return Object.assign({}, state, {isLoading: true})
        }
        case GET_USER_POSTS + '_FULFILLED': {
            return Object.assign({}, state, {
                userPosts: action.payload,
                isLoading: false
            })
        }


        case GET_OPEN_JOBS + '_PENDING': {
            return Object.assign({}, state, {isLoading: true})
        }
        case GET_OPEN_JOBS + '_FULFILLED': {
            return Object.assign({}, state, {
                isLoading: false,
                openJobs: action.payload
            })
        }

        case EMPTY_COMMENT: {
            return Object.assign({}, state, {
                comment: action.payload
            })
        }
        case EMPTY_POST: {
            return Object.assign({}, state, {
                postTitle: action.payload, 
                subTitle: action.payload, 
                post: action.payload
            })
        }

        default:
            return state
    }

}
