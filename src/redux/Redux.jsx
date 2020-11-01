import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import ToDoReducer from "./ToDoReducer";


let reducers = combineReducers({
    ToDoReducer,
});

let store =createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;