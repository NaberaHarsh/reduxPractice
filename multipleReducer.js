const redux = require('redux');
const createStore= redux.createStore;          
const combineReducer = redux.combineReducers   // to cobine multiple reducers into single and call them together

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



// we can do in single reducer also but it will become very big code. So we split in differnt reducers amd state object.


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

const rootReducer = combineReducer({          //  we create rootReducer to comine reducer and pass each reducer using a key
    cake:CakeReducer,
    icecream:IcecreamReducer
})
const store= createStore(rootReducer)    // now we pass rootReducer to our store
console.log('initial state', store.getState())   
const unSubscribe = store.subscribe(()=> console.log('updated state',store.getState())) 
store.dispatch(buyCake());   
store.dispatch(buyCake());   
store.dispatch(buyCake());   
store.dispatch(buyIcecream()); 
store.dispatch(buyIcecream()); 

unSubscribe();               // to unsubscribe