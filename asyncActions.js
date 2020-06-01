const redux = require('redux');

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunk = require('redux-thunk').default;
const axios = require('axios');

const initialState = {   // state object
    loading: false,
    users: [],
    error: " "
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => { // action creator
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {        // action creator
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}
const fetchUsersFailure = error => {        // action creator
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const fetchUsers = () =>{       // action creator
return function(dispatch){           // thunk middleware allows to return function within a action creator 
                                     // this function does not have to be pure,this can dispatch actions since it recieve dispatch as argument 
    dispatch(fetchUsersRequest())             // this will set loading true
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response=>{
// res.data is array of users
const users= response.data
        dispatch(fetchUsersSuccess(users))           // this will give data
    })
    .catch(error=>{
// error.message is error description
dispatch(fetchUsersFailure(error.message))
    })
}                
}                                                       


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ""
            }
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
            default: return{
                state
            }
    }

}

const store = createStore(reducer , applyMiddleware(thunk))
console.log('initial state',store.getState());
const unsubscribe= store.subscribe(()=> console.log(store.getState()));
store.dispatch(fetchUsers());

