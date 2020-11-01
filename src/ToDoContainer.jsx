import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {
    AddZ, DeleteAll,
    DeleteToDO,
    EditToDO,
    PostToDOThunk,
    SetCurrentList,
    SetTODOThunk,
    TooggleIsDoneTrue
} from "./redux/ToDoReducer";
import ToDo from "./Components/ToDoElements/ToDo";


class ToDoContainer extends React.Component {

    componentDidMount() {
        this.props.SetTODOThunk()
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
    }),
)(ToDoContainer)