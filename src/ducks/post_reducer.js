import axios from 'axios'


//action constants

const USER_INFO = 'USER_INFO'

//initial state

const initialState = {
    userid: 0,
    title: '',
    subtitle: '',
    post: ''
}




//action creators

export function userInfo(){
    console.log('info')
    return{
        type: USER_INFO,
        payload: axios.get('/api/info').then(response => {
            console.log('UserInfo', response.data)
            return response.data
        }).catch(console.log)
    }
}



//reducer
export default function reducer(state=initialState, action) {
    switch(action.type) {
        
        case USER_INFO + '_PENDING': {
            console.log('WOOO')
            return Object.assign({}, state, {isLoading: true})
        }
        case USER_INFO + '_FULFILLED': {
            console.log('action', action.payload)
            return Object.assign({}, state, {
                isLoading: false,
                userID: action.payload.id
            })}
        default:
            return state
    }

}