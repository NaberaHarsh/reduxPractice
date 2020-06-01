const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore= redux.createStore;          
const combineReducer = redux.combineReducers   
const applyMiddleware = redux.applyMiddleware       // to apply middleware
const logger= reduxLogger.createLogger();   // we have created logger middleware

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";



function buyCake(){                
    return{                       
        type: BUY_CAKE,
        info: "first redux app"
    }
}

function buyIcecream(){
    return{
        type: BUY_ICECREAM
    }
}


const initialCakeState ={
    numOfCakes: 10,
}
const initialIcecreamState ={
    numOfIcecream: 20,
}

const CakeReducer = (state= initialCakeState,action) => {
    switch(action.type){
        case BUY_CAKE: return{
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}
 
const IcecreamReducer = ( state= initialIcecreamState, action) => {
    switch(action.type){
        case BUY_ICECREAM: return{
            numOfIcecream: state.numOfIcecream -1 
        }
        default: return state
    }

}

const rootReducer = combineReducer({          
    cake:CakeReducer,
    icecream:IcecreamReducer
})
const store= createStore(rootReducer ,applyMiddleware(logger) )     // here we pass middleware, we can pass as many middleware as we want
console.log('initial state', store.getState())   
const unSubscribe = store.subscribe(()=> {})        //we remove console as we have logger middleware to print 
store.dispatch(buyCake());   
store.dispatch(buyCake());   
store.dispatch(buyCake());   
store.dispatch(buyIcecream()); 
store.dispatch(buyIcecream()); 

unSubscribe();               // to unsubscribe