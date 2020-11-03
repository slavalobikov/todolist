import React, {useState} from 'react';
import cn from 'classnames'
import {DeleteOutlined, FormOutlined, SaveOutlined} from '@ant-design/icons';


import s from './ToDo.module.css'
import preloaader from './../../assest/img/preloader.svg'


const ToDo = ({text, isDone, ...props}) => {

    const [isEditValue, setIsEdit] = useState('');
/*
    const [currentCard ,setCurrentCard] = useState(null);
*/
    const editToDoMessage = (id, isEditValueF, isEditF, td) => {
                if (!isEditValue && td === '' ) {
                    return
                }

               props.EditToDO(id, isEditValueF, isEditF);
               setIsEdit(td);



           };
/*    const sortCards = (a, b) => {
        if (a.order > b.order) {
            return 1;
        } else {
            return -1;
        }
    };*/
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


    const [currentTd, setCurrentTd] = useState(null);

    const dragStartHandler = (e, td) => {
/*        console.log('drag', td);
        console.log('dragStartHandler')*/
        setCurrentTd(td);
    };
    const dragLeave = (e) => {
        e.target.style.background = '#fafafa'
/*
        console.log('dragLeave')
*/

    };
    const dragEnd = (e) => {
        e.target.style.background = '#fafafa'

/*
        console.log('dragEnd')
*/

    };
    const dragOver = (e) => {
        e.preventDefault();
        e.target.style.background = 'green'
/*
        console.log('dragOver')
*/
    };
    const ddrop = (e, td) => {
        e.preventDefault();
        props.SetCurrentList(td.id, td.order, currentTd)
        e.target.style.background = '#fafafa'
/*
        console.log('drop', td)
*/


    };
    const sortCards = (a, b) => {
        if (a.oredr > b.order) {
            return 1;
        } else {
            return -1;
        }
    }

    let ToDoElements = text/*.sort(sortCards)*/.map(td => (
        <div
            onDragStart={(e) => dragStartHandler(e, td) }
            onDragLeave={(e) => dragLeave(e)}
            onDragEnd={(e) => dragEnd(e)}
            onDragOver={(e) => dragOver(e)}
            onDrop={(e) => ddrop(e, td)}
            draggable={"true"}
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
                              onBlur={() => { editToDoMessage(td.id, isEditValue, td.isEdit, td.text)}}
                              onChange={(e) => {setIsEdit(e.currentTarget.value)}}
                              value={td.text || isEditValue} autoFocus={true} />}
                    {!td.isEdit && td.text}

                </span>
                <span onClick={() => { props.DeleteToDO(td.id)}} className={s.delete}>{/*<CloseOutlined  />*/}<DeleteOutlined /></span>
                <span onClick={() => { editToDoMessage(td.id, isEditValue, td.isEdit, td.text)} } className={s.delete}>{/*<CloseOutlined  />*/}<FormOutlined /></span>
            </div>
        </div>
    ));


    const Save = (text) => {
            props.PostToDOThunk(text);
            props.SetResponse(text);
    };

    const UpdateSave = () => {
        props.PostToDOThunk(text);
        props.IsUpdateSave(!props.isUpdate);
    };

    return <div >
        {!!props.isUpdate && !props.isFetching && <div className={s.mainPopup}>
            <div className={s.popup}>
                <div>
                    <span className={s.info}>Идет синхранизация с сервером, подтвердите действие</span>
                    <div>
                        <SaveOutlined className={s.UpdateAll} onClick={() => UpdateSave(text)} />
                    </div>
                </div>
            </div>
        </div>}
        {!!props.isFetching
            ? <div className={s.PreloaderBlock}>
                <img className={s.preloader} src={preloaader} alt="preloader"/>
              </div>
            : <div className={cn(s.MainBlock, {
                [s.MainBlockHiden]: !!props.isUpdate,
            })}>
            {ToDoElements}
            {!!text[0] && <DeleteOutlined className={s.DeleteAll} onClick={() => props.DeleteAll(text)} />}
                {!!text[0] && !props.response[0] && <SaveOutlined className={s.SaveAll} onClick={() => Save(text)} />}

                {!!text[0] && !!props.response[0] && <SaveOutlined className={s.SaveAll} onClick={() => UpdateSave(text)} />}
        </div>}
    </div>
};

export default ToDo;