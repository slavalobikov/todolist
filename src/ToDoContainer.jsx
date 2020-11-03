import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {
    AddZ, DeleteAll,
    DeleteToDO,
    EditToDO, FinalCopyThunk, IsUpdateSave,
    PostToDOThunk,
    SetCurrentList, SetResponse, SetResponseThunk,
    SetTODOThunk,
    TooggleIsDoneTrue,
} from "./redux/ToDoReducer";
import ToDo from "./Components/ToDoElements/ToDo";


class ToDoContainer extends React.Component {

    componentDidMount() {
        this.props.SetTODOThunk();
        this.props.SetResponseThunk();
    }

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
        isUpdate: state.ToDoReducer.isUpdateSave,
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
        FinalCopyThunk,
        SetResponseThunk,
        SetResponse,
        IsUpdateSave,
    }),
)(ToDoContainer)