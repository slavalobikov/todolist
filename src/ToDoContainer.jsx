import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {
    AddZ, DeleteAll,
    DeleteToDO,
    EditToDO, FinalCopyThunk,
    PostToDOThunk,
    SetCurrentList, SetResponseThunk,
    SetTODOThunk,
    TooggleIsDoneTrue, UpdateWithoutNew
} from "./redux/ToDoReducer";
import ToDo from "./Components/ToDoElements/ToDo";


class ToDoContainer extends React.Component {

    componentDidMount() {
        this.props.SetTODOThunk();
        this.props.SetResponseThunk();
    }



    /*
        componentDidUpdate(prevProps, prevState, snapshot) {
            if (this.props.isAuth != prevProps.isAuth ) {
                alert('hello');
            }
        }
    */

    render() {
        return (
            <div>
                <ToDo {...this.props}  />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        text: state.ToDoReducer.z,
        response: state.ToDoReducer.response,
        isFetching: state.ToDoReducer.isFetching,
    }
};

export default compose(
    connect(mapStateToProps, {
        AddZ,
        TooggleIsDoneTrue,
        DeleteToDO,
        EditToDO,
        SetCurrentList,
        SetTODOThunk,
        PostToDOThunk,
        DeleteAll,
        UpdateWithoutNew,
        FinalCopyThunk,
        SetResponseThunk,
    }),
)(ToDoContainer)