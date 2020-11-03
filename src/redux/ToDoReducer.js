import * as axios from "axios";
import _ from 'lodash';
const ADD_Z = 'ADD_Z';
const TOOGGLE_TODO_IS_DONE = 'TOOGGLE_TODO_IS_DONE';
const DELETE_TODO = 'DELETE_TODO';
const EDIT_TODO = 'EDIT_TODO';
const SET_CURT_LIST = 'SET_CURT_LIST';
const SET_TODO_ITEM = 'SET_TODO_ITEM';
const LODASH_FLATTEN = 'LODASH_FLATTEN';
const SET_RESPONSE = 'SET_RESPONSE';
const DELETE_RESPONSE = 'DELETE_RESPONSE';
const IS_FETCHING = 'IS_FETCHING';
const IS_UPDATE_SAVE = 'IS_UPDATE_SAVE';


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
        ],
        response: [],
        isFetching: null,
        isUpdateSave: false,
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
                order: action.order,

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
        case LODASH_FLATTEN:
            let dima = _.flatten(state.z);
            let leha = _.flatten(dima);
            return {
                ...state,
                z:leha
            };
        case SET_RESPONSE:
            return {
                ...state,
                response: action.response
            };
        case DELETE_RESPONSE:
            return {
                ...state,
                response: []
            };
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case IS_UPDATE_SAVE:
            return  {
                ...state,
                isUpdateSave: action.isUpdate
            };
        case SET_CURT_LIST:
            return {
                ...state,
                z: state.z.map(c => {
                    if (c.id === action.id) {
                        return {
                            ...c, order: action.currentTd.order
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
        default:
            return state
    }


};


export const AddZ = (text, id , order = null) => ({type: ADD_Z, text, id, order});
export const TooggleIsDoneTrue = (id, isDone) => ({type: TOOGGLE_TODO_IS_DONE, id,isDone});
export const DeleteToDO = (id, ) => ({type: DELETE_TODO, id});
export const EditToDO = (id, text, edit) => ({type: EDIT_TODO, id, text, edit});
export const SetCurrentList = (id, currentCart, currentTd) => ({type: SET_CURT_LIST, id,currentCart, currentTd});
export const SetToDoItem = (item) => ({type: SET_TODO_ITEM, item});
export const SetResponse = (response) => ({type: SET_RESPONSE, response});
export const DeleteResponse = () => ({type: DELETE_RESPONSE, });
export const IsFething = (isFetching) => ({type: IS_FETCHING, isFetching });
export const IsUpdateSave = (isUpdate) => ({type: IS_UPDATE_SAVE, isUpdate });
export const LodashFlatten = () => ({type: LODASH_FLATTEN, });

export const SetTODOThunk = () => {
    return async (dispatch) => {
        let response = await axios.get('http://localhost:3000/z').then(response => {
                return response
        });
        if (response.status === 200) {
            dispatch(SetToDoItem(response.data));
        }
    }
};

export const SetResponseThunk = () => {
    return async (dispatch) => {
        dispatch(IsFething(true));
        let response = await axios.get('http://localhost:3000/z').then(response => {
            return response
        });
        if (response.status === 200) {
            dispatch(SetResponse(response.data))
        }
        dispatch(IsFething(false))

    }
}
export const DeleteAll = (text) => {
    return async (dispatch) => {
                let responseOne = await axios.get('http://localhost:3000/z').then(response => {
                    return response.data
                });
                for (let i = text[0].id; i< text[0].id + text.length; i++  ) {
                    if (!responseOne[i - 1] && !!text[i - 1]){
                        return dispatch(SetTODOThunk())
                    }
                    dispatch(IsFething(true));
                    let response = await axios.delete(`http://localhost:3000/z/${i}`, ).then(response => {
                        return response
                    });
                    if (response.status >= 200 && response.status < 300) {
/*
                        console.log('Удаление прошло успешно' , [i]);
*/
                        dispatch(SetTODOThunk());
                        dispatch(IsFething(false))
                        dispatch(SetResponse([]))
                    }
                }
        dispatch(SetTODOThunk());
        dispatch(IsFething(false));
        dispatch(DeleteResponse);

    }
};


/*
export const UpdateWithoutNew = (text) => {
    return async (dispatch) => {
        for (let i = 1; i <= text.length; i++) {
            let response = await axios.put(`http://localhost:3000/z/${i}`, text[i - 1]).then(response => {
                console.log('text', text[i]);
                return response
            });
            if (response.status >= 200 && response.status < 300) {
                dispatch(SetTODOThunk());
            } else {
                alert('ошибка', response.status)
            }
        }
    }
}
*/
export const PostToDOThunk = (text) => {
    return async  (dispatch) => {
        dispatch(IsFething(true));
        let responseOne = await axios.get('http://localhost:3000/z').then(response => {
            return response.data
        });
        if (!!responseOne[0]) {
            for (let i = responseOne[0].id; i <= responseOne[0].id + responseOne[responseOne.length - 1].id; i++) {
                if (!responseOne[i - 1]) {
                    return
                } else {
                     await axios.delete(`http://localhost:3000/z/${responseOne[i -1].id}`,).then(response => {
                        return console.log('Удаление с сервера успешно проведено', responseOne[i - 1].id)

                    });
                    dispatch(IsFething(false));

                }
            }
        }
        for (let i = text[0].id; i <=  text[text.length -1].id; i++) {

            console.log('responseOne[i]', responseOne[i]);
            console.log('text[i]', text[i - 1]);
             await axios.post(`http://localhost:3000/z`, text[i - 1]).then(response => {
                return response})
            ;}
        dispatch(IsFething(false));

    }

/*    if (!text[0]) {
            alert('hello')

/!*            for (let i = 1; i <= text[text.length].id; i++) {
                if (!text[i]) {
                    return
                }
                let responseThree = await axios.post(`http://localhost:3000/z`, text[i]).then(response => {
                    return response})
            }*!/
        } else {
            alert('dima')
            console.log('text', text)
            for (let i = text[0].id; i <=  text[text.length -1].id; i++) {

                console.log('responseOne[i]', responseOne[i]);
                console.log('text[i]', text[i - 1]);
                let responseThree = await axios.post(`http://localhost:3000/z`, text[i - 1]).then(response => {
                    return response})
                ;}}
    }*/
};

export const FinalCopyThunk = (text) => {
    return   (dispatch) => {
        setTimeout (dispatch(PostToDOThunk(text)), 0);
        setTimeout(dispatch(PostToDOThunk(text)), 3000)
    }
};





export default ToDoReducer;

/*
{
    "id": 1,
    "isCheck": false,
    "text": "Дороу",
    "isDone": false,
    "isEdit": false,
    "order": 1
},
{
    "id": 2,
    "isCheck": false,
    "text": "Привет",
    "isDone": false,
    "isEdit": false,
    "order": 2
}*/
