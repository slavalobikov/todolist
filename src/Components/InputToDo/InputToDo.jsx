import React, {useState} from 'react';
import cn from 'classnames'

import s from "./InputToDo.module.css";


const InputToDo = (props) => {


    const [value, setValue] = useState('');
    let IdNewMessage;

    if (!props.text[0]) {
          IdNewMessage = 1;
    } else {
          IdNewMessage = props.text[props.text.length - 1].id + 1;
    }

    const addToDo = () => {

        if (!value) {
            return
        }

        props.AddZ(value, IdNewMessage, IdNewMessage );
        setValue('')
    }

    return (
        <div>
            {!props.isFetching
                ? <div  className={cn(s.addField, {
                    [s.MainBlockHiden]: !!props.isUpdate

                })}>
                    <input type="text"
                           value={value}
                           onChange={(e) => {setValue(e.currentTarget.value)}}
                           placeholder={'Введите свою задачу'}

                    />
                    <button onClick={addToDo} className={s.addBtn}>+</button>
                </div>
                : <div></div> }

        </div>
    );
};

export default InputToDo;