import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import InputToDo from "../../Components/InputToDo/InputToDo";
import {AddZ, PostToDOThunk} from "../../redux/ToDoReducer";


class InputToDoContainer extends React.Component {

    /*
        componentDidUpdate(prevProps, prevState, snapshot) {
            if (this.props.isAuth != prevProps.isAuth ) {
                alert('hello');
            }
        }
    */

    render() {
        return (
            <InputToDo {...this.props}  />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        text: state.ToDoReducer.z,
        isFetching: state.ToDoReducer.isFetching,
        isUpdate: state.ToDoReducer.isUpdateSave,
    }
};

export default compose(
    connect(mapStateToProps, {
        AddZ,
        PostToDOThunk,
    }),
)(InputToDoContainer)

