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

const OPENMENU = 'OPENMENU'
const CLOSE_MENU = 'CLOSE_MENU'

const SET_POST = 'SET_POST'



//Initial State

const initialState = {
        authID: 0,
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
        comment: ''
    
}

//Action Creators


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
            return Object.assign({}, state, {postTitle: action.payload.title, subTitle: action.payload.sub, post: action.payload.details})
        }
    
        default:
            return state
    }

}
