// import Redux fron 'redux'    => if it were in react
const redux = require('redux');
const createStore= redux.createStore;     // redux has a method createstore          

const BUY_CAKE = "BUY_CAKE";

// {
//     type: BUY_CAKE,
//     info: "first redux app"            -> action
// }

function buyCake(){                //action creator
    return{                       // return action
        type: BUY_CAKE,
        info: "first redux app"
    }
}

// reducer (prev state, action)=> new state

const initialState = {                // state object
    numOfCakes: 10,
}

const reducer = (state = initialState, action) =>{        //reducer
    switch(action.type) {
        case BUY_CAKE: return{
                ...state,                           // to make copy of object and then change(useful when we have more than one state )
            numOfCakes: state.numOfCakes - 1          // we do not muttate state obj, we r creating new object
        }
        
        default: return state
    }
}
// we can do in single reducer also but it will become very big code. So we split in differnt reducers amd state object.


const store= createStore(reducer)     //redux store hold application state  // now we create a store equal to createstore and it accepts reducer function as paramater, this is required for the store to do state transtitions based on the actions received
console.log('initial state', store.getState())   // return the current state, since no transitions have been performed so it return initial state
const unSubscribe = store.subscribe(()=> console.log('updated state',store.getState())) // listener , get called whenevr updations are made
store.dispatch(buyCake());    // dispatch action
store.dispatch(buyCake());     // when action creator is called it checks that type is buy cake and then matches it with the switch case, if matches then updates, then listener prints the changes
store.dispatch(buyCake());      // we can directly pass action object here but if in future we add other property to the object then this also has to be updated, so simply pass action creator
unSubscribe();               // to unsubscribe