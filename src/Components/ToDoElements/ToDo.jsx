import React, {useState} from 'react';
import cn from 'classnames'
import {DeleteOutlined, FormOutlined, SaveOutlined} from '@ant-design/icons';

import s from './ToDo.module.css'
import preloaader from './../../assest/img/preloader.svg'


const ToDo = ({text, isDone, ...props}) => {
    const [isEditValue, setIsEdit] = useState('');
    const [currentCard ,setCurrentCard] = useState(null);



    const editToDoMessage = (id, isEditValueF, isEditF, td) => {
                if (!isEditValue && td === '' ) {
                    return
                }

               props.EditToDO(id, isEditValueF, isEditF);
               setIsEdit('');



           };
    const sortCards = (a, b) => {
        if (a.order > b.order) {
            return 1;
        } else {
            return -1;
        }
    };
/*    const dragStartHandler = (e, todo) => {
        setCurrentCard(todo)

    };
    const dragEndHandler = (e) => {
        e.target.style.background = '#fafafa';

    };
    const dragOverHandler = (e) => {
        e.preventDefault();
        e.target.style.background = 'green';
    };
    const dropHandler = (e, todo) => {
        e.preventDefault();
        props.SetCurrentList(todo.id, currentCard );
        e.target.style.background = '#fafafa';
        setCurrentCard(null)
    };
    onDragStart={(e) => {dragStartHandler(e, td)}}
    onDragLeave={(e) => {dragEndHandler(e)}}
    onDragOver={(e) => {dragOverHandler(e)}}
    onDragEnd={(e) => {dragEndHandler(e)}}
    onDrop={(e) => {dropHandler(e, td)}}
    draggable={true}
    */

    let ToDoElements = text.map(td => (

        <div
            key={td.id}>
            <div

                className={s.item}>
                {td.isDone
                    ? <button onClick={() => {props.TooggleIsDoneTrue(td.id, td.isDone)}} className={s.radioTrue} ></button>
                    : <button onClick={() => {props.TooggleIsDoneTrue(td.id, td.isDone)}} className={s.radioFalse}></button>}
                <span className={cn({
                    [s.textFalse]: td.isDone === true
                })}>
                    {td.isEdit
                    && <input type="text"
                              onChange={(e) => {setIsEdit(e.currentTarget.value)}}
                              value={isEditValue || td.text} />}
                    {!td.isEdit && td.text}

                </span>
                <span onClick={() => {props.DeleteToDO(td.id)}} className={s.delete}>{/*<CloseOutlined  />*/}<DeleteOutlined /></span>
                <span onClick={() => { editToDoMessage(td.id, isEditValue, td.isEdit, td.text)} } className={s.delete}>{/*<CloseOutlined  />*/}<FormOutlined /></span>
            </div>
        </div>
    ));

    const [isSave, setIsSave] = useState(true);

    const Save = (text) => {
            props.PostToDOThunk(text);
        setIsSave(!isSave);
    };

    const Izm = (text) => {
        props.FinalCopyThunk(text)
        setIsSave(!isSave);
    };
    console.log('response', props.response)
    return <div >
        {!!props.isFetching
            ? <div className={s.PreloaderBlock}>
                <img className={s.preloader} src={preloaader} alt="preloader"/>
              </div>
            : <div className={s.MainBlock}>
            {ToDoElements}
            {!!text[0] &&
            <button onClick={() => Save(text)}>Загрузить данные</button>}
            {!!text[0] &&
            <div>
                <button onClick={() => Izm(text)}>Изменить</button>
            </div>}


            {!!text[0] && <DeleteOutlined className={s.DeleteAll} onClick={() => props.DeleteAll(text)} />}
            <SaveOutlined className={s.SaveAll} />
        </div>}
    </div>
};

export default ToDo;