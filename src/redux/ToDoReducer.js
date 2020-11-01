import * as axios from "axios";
const ADD_Z = 'ADD_Z';
const TOOGGLE_TODO_IS_DONE = 'TOOGGLE_TODO_IS_DONE';
const DELETE_TODO = 'DELETE_TODO';
const EDIT_TODO = 'EDIT_TODO';
const SET_CURT_LIST = 'SET_CURT_LIST';
const SET_TODO_ITEM = 'SET_TODO_ITEM';

let order = 1;

let initialState = {
        z : [
            /*{
                id:id++,
                isCheck: false,
                text:'Дороу',
                isDone: false,
                isEdit:false,
                order: order++,

            },
            {
                id:id++,
                isCheck: true,
                text: 'выучил',
                isDone: true,
                isEdit:false,
                order: order++,
            }*/
        ]
};

const ToDoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_Z:

            let Text = {
                id:action.id,
                isCheck: false,
                text:action.text,
                isDone: false,
                isEdit:false,
                order: order++,

            };

            return {
                ...state,
                z: [...state.z, Text]
            };
        case TOOGGLE_TODO_IS_DONE:
            return {
                ...state,
               z: state.z.map(u => {
                   if (u.id === action.id) {
                      return {...u, isDone:!action.isDone}
                   } else {
                       return  {...u}
                   }
               })
            };
        case DELETE_TODO:

            return {
                ...state,
                z: state.z.filter(item => item.id !== action.id)
        };
        case EDIT_TODO:
            return  {
                ...state,
                z: state.z.map(u => {
                    if (u.id === action.id) {
                        return {...u, text:action.text, isEdit: !action.edit}
                    } else {
                        return  {...u}
                    }
                })
            };
        case SET_TODO_ITEM:
            return {
                ...state,
                z: action.item
            };

/*
        case SET_CURT_LIST:
            return {
                ...state,
                z: state.z.map(c => {
                    if (c.id === action.id) {
                        return {
                            ...c, order: action.currentCart
                        }
                    }
                    if (c.id === action.currentCart) {
                        return {
                            ...c, order: action.currentCart
                        }
                    }
                    return { ...c}
                })
            }
*/
        default:
            return state
    }


};


export const AddZ = (text, id) => ({type: ADD_Z, text, id});
export const TooggleIsDoneTrue = (id, isDone) => ({type: TOOGGLE_TODO_IS_DONE, id,isDone});
export const DeleteToDO = (id, ) => ({type: DELETE_TODO, id});
export const EditToDO = (id, text, edit) => ({type: EDIT_TODO, id, text, edit});
export const SetCurrentList = (id, currentCart) => ({type: SET_CURT_LIST, id,currentCart});
export const SetToDoItem = (item) => ({type: SET_TODO_ITEM, item});

export const SetTODOThunk = () => {
    return async (dispatch) => {
        let response = await axios.get('http://localhost:3000/z').then(response => {
                return response
        });
        if (response.status === 200) {
            dispatch(SetToDoItem(response.data))

        }
    }
};

export const PostToDOThunk = (text) => {
    return async  (dispatch) => {
/*
        for (let i = 0;  )
*/
        let response = await axios.delete('http://localhost:3000/z/2', ).then(response => {
            return response
        })
        if (response.status >= 200 && response.status < 300) {
            dispatch(SetTODOThunk());
            alert('успех')
        } else {
            alert('ошибка')
        }
    }
/*
        let response = await axios.post('http://localhost:3000/z', {z:text} ).then(response => {
            return response
        });
        if (response.status >= 200 && response.status < 300) {
            dispatch(SetTODOThunk());
            alert('успех')
        } else {
            alert('ошибка')
        }
    }*/
};




export default ToDoReducer;